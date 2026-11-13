import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root,'public');
const dataDir = process.env.DATA_DIR || path.join(root,'data');
const leadFile = path.join(dataDir, 'leads.json');
const auditFile = path.join(dataDir,'audit.jsonl');
const port = Number(process.env.PORT || 3000);
const adminToken = process.env.ADMIN_TOKEN || '';
fs.mkdirSync(dataDir,{recursive:true});
if(!fs.existsSync(leadFile)) fs.writeFileSync(leadFile,'[]',{mode:0o600});
const limits=new Map();
const ct={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8'};
function json(res,code,data){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))}
function readLeads(){try{return JSON.parse(fs.readFileSync(leadFile,'utf8'))}catch{return []}}
function saveLeads(items){const tmp=leadFile+'.tmp';fs.writeFileSync(tmp,JSON.stringify(items,null,2),{mode:0o600});fs.renameSync(tmp,leadFile)}
function audit(action,id){fs.appendFileSync(auditFile,JSON.stringify({action,id,at:new Date().toISOString()})+'\n',{mode:0o600})}
function clean(v,n=180){return typeof v==='string'?v.replace(/[\u0000-\u001f]/g,' ').trim().slice(0,n):''}
function auth(req){const a=req.headers.authorization||'';if(!adminToken||!a.startsWith('Bearer '))return false;const b=Buffer.from(a.slice(7));const c=Buffer.from(adminToken);return b.length===c.length&&crypto.timingSafeEqual(b,c)}
function rate(ip){const now=Date.now();const prev=(limits.get(ip)||[]).filter(t=>now-t<3600000);if(prev.length>=6)return false;prev.push(now);limits.set(ip,prev);return true}
async function readBody(req){let size=0;const chunks=[];for await(const c of req){size+=c.length;if(size>30000)throw Error('too_large');chunks.push(c)}try{return JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{throw Error('invalid_json')}}
function serve(res,file){
 const ext=path.extname(file).toLowerCase();const mime=ct[ext]||'application/octet-stream';
 fs.readFile(file,(e,body)=>{if(e)return json(res,404,{error:'not_found'});res.writeHead(200,{'Content-Type':mime,'Cache-Control':ext==='.html'?'no-cache':'public, max-age=1800'});res.end(body)})
}
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
 if(req.method==='GET'&&req.url==='/api/health')return json(res,200,{status:'ok',stage:'founding',storage:!!process.env.DATA_DIR});
 if(req.method==='GET'&&req.url==='/api/status')return json(res,200,{legalStatus:'pre-incorporation',intake:'open',payments:'disabled',operatingModel:'pilot'});
 if(req.method==='POST'&&req.url==='/api/intake'){
   const ip=(req.socket.remoteAddress||'unknown');
   if(!rate(ip))return json(res,429,{error:'rate_limited',message:'Please try again later.'});
   try {
     const b=await readBody(req);if(b.website)return json(res,200,{accepted:true,reference:'RECEIVED'});
     const name=clean(b.name,100),email=clean(b.email,180),country=clean(b.country,80),company=clean(b.company,120),url=clean(b.url,220),
     stage=clean(b.stage,60),goal=clean(b.goal,600),sector=clean(b.sector,90),budget=clean(b.budget,60),timeline=clean(b.timeline,80),source=clean(b.source,80);
     if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!country||!goal||b.consent!==true)
       return json(res,422,{error:'invalid_fields',message:'Please complete the required fields and consent.'});
     const id='VLC-'+crypto.randomBytes(4).toString('hex').toUpperCase();
     const lead={id,name,email,country,company,url,stage,goal,sector,budget,timeline,source,createdAt:new Date().toISOString(),
       consent:{accepted:true,at:new Date().toISOString(),privacyVersion:'2026-11-13'},status:'new',owner:'Founding team',nextAction:'Review founder assessment',nextActionDate:null,notes:''};
     const items=readLeads();items.unshift(lead);saveLeads(items);audit('intake_created',id);
     return json(res,201,{accepted:true,reference:id});
   }catch(e){return json(res,e.message==='too_large'?413:400,{error:e.message==='too_large'?'too_large':'invalid_request'})}
 }
 if(req.url?.startsWith('/api/admin/')){
   if(!auth(req))return json(res,401,{error:'unauthorized'});
   if(req.method==='GET'&&req.url==='/api/admin/leads')return json(res,200,{leads:readLeads()});
   const id=decodeURIComponent(req.url.split('/').pop());
   if(req.method==='PATCH'&&req.url.startsWith('/api/admin/leads/')){
     try{
       const b=await readBody(req);const items=readLeads();const x=items.find(z=>z.id===id);
       if(!x)return json(res,404,{error:'not_found'});
       if(b.status)x.status=['new','qualified','review','contacted','closed','not_fit'].includes(b.status)?b.status:x.status;
       if(b.owner!==undefined)x.owner=clean(b.owner,100);
       if(b.nextAction!==undefined)x.nextAction=clean(b.nextAction,250);
       if(b.nextActionDate!==undefined)x.nextActionDate=clean(b.nextActionDate,40);
       if(b.notes!==undefined)x.notes=clean(b.notes,1200);
       x.updatedAt=new Date().toISOString();saveLeads(items);audit('lead_updated',id);return json(res,200,{lead:x});
     }catch{return json(res,400,{error:'invalid_request'})}
   }
   if(req.method==='DELETE'&&req.url.startsWith('/api/admin/leads/')){
     const items=readLeads();if(!items.some(z=>z.id===id))return json(res,404,{error:'not_found'});
     saveLeads(items.filter(z=>z.id!==id));audit('lead_deleted',id);return json(res,200,{deleted:true});
   }
   return json(res,404,{error:'not_found'});
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{error:'method_not_allowed'});
 let url;try{url=new URL(req.url,'http://localhost')}catch{return json(res,400,{error:'invalid_url'})}
 if(url.pathname==='/operator')return serve(res,path.join(publicDir,'operator.html'));
 if(url.pathname==='/'||['/assessment','/services','/how-it-works','/about','/pricing','/privacy','/terms'].includes(url.pathname))return serve(res,path.join(publicDir,'index.html'));
 const rel=decodeURIComponent(url.pathname);const f=path.resolve(publicDir,'.'+rel);
 if(!f.startsWith(publicDir+path.sep))return json(res,403,{error:'forbidden'});
 return serve(res,f);
});
server.listen(port,'0.0.0.0',()=>console.log('Venture launch listening on '+port));
