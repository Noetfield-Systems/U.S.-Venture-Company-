import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

test('intake and private operator lifecycle',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'venture-'));
 const port=32000+Math.floor(Math.random()*1000);
 const token='test-only-secret';
 const child=spawn(process.execPath,['server.mjs'],{env:{...process.env,DATA_DIR:dir,PORT:String(port),ADMIN_TOKEN:token},stdio:'ignore'});
 const base='http://127.0.0.1:'+port;
 try{
   for(let i=0;i<40;i++){try{const r=await fetch(base+'/api/health');if(r.ok)break}catch{}await new Promise(r=>setTimeout(r,100))}
   assert.equal((await (await fetch(base+'/api/status')).json()).legalStatus,'pre-incorporation');
   const body={name:'Example Founder',email:'founder@example.org',country:'Canada',goal:'Validate market for a software MVP',consent:true};
   const r=await fetch(base+'/api/intake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   assert.equal(r.status,201);const saved=await r.json();assert.match(saved.reference,/^VLC-/);
   const unauthorized=await fetch(base+'/api/admin/leads');assert.equal(unauthorized.status,401);
   const headers={Authorization:'Bearer '+token};
   const list=await (await fetch(base+'/api/admin/leads',{headers})).json();
   assert.equal(list.leads.length,1);assert.equal(list.leads[0].email,body.email);
   const patched=await fetch(base+'/api/admin/leads/'+saved.reference,{method:'PATCH',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({status:'qualified',nextAction:'Follow up'})});
   assert.equal(patched.status,200);
   const deleted=await fetch(base+'/api/admin/leads/'+saved.reference,{method:'DELETE',headers});
   assert.equal(deleted.status,200);
   const after=await (await fetch(base+'/api/admin/leads',{headers})).json();assert.equal(after.leads.length,0);
 }finally{child.kill();fs.rmSync(dir,{recursive:true,force:true})}
});
