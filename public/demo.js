/* U.S. Venture Company — interactive sample workspace
   Browser-only example data. No state filings, equity issuance, bank applications,
   payment transactions or outreach messages occur from this demo. */
const KEY="usvc-workspace-demo-v1";
const SEED={
 company:"Northstar Labs",entity:"Delaware C-Corporation",region:"Delaware",funding:"venture",founderCount:2,
 founderA:"Jordan Lee",founderB:"Taylor Morgan",equityA:65,year:"2027",
 tasks:{structure:true,founders:true,name:false,filing:false,bylaws:false,stock:false,ein:false,bank:false,customers:false},
 docs:{charter:false,incorporator:false,bylaws:false,board:false,stock:false,ip:false,tax83:false,safe:false},
 tax:{responsible:false,irs:false,confirm:false,business:false,treasury:false},
 ops:{agent:true,annual:false,records:true,tax:false,contracts:false},
 fundingTasks:{cap:true,deck:false,safe:false,financials:false,datapack:false},
 market:"B2B AI software",buyer:"US software teams with 10–100 employees",offer:"AI-assisted customer operations",
 prospects:[{name:"Atlas Software",contact:"Research",stage:"Researching"},{name:"Cedar Analytics",contact:"Research",stage:"Qualified"},{name:"Harbor Systems",contact:"Referral",stage:"Discovery"}]
};
const clone=x=>JSON.parse(JSON.stringify(x));
let state=clone(SEED);
try {const saved=JSON.parse(localStorage.getItem(KEY)||"null");if(saved&&typeof saved==="object"){state={...clone(SEED),...saved,tasks:{...SEED.tasks,...saved.tasks},docs:{...SEED.docs,...saved.docs},tax:{...SEED.tax,...saved.tax},ops:{...SEED.ops,...saved.ops},fundingTasks:{...SEED.fundingTasks,...saved.fundingTasks}};}}catch{}
const root=document.querySelector("#view-container");
let current=(location.hash||"#overview").slice(1).toLowerCase();
const valid=["overview","formation","founders","documents","tax","operations","growth","funding"];
if(!valid.includes(current))current="overview";
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const label=id=>({overview:"Overview",formation:"Formation",founders:"Founders & equity",documents:"Documents",tax:"EIN & banking",operations:"Operations",growth:"Market entry",funding:"Fundraising"}[id]||"Overview");
const count=record=>Object.values(record).filter(Boolean).length;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}};
let toastHandle;
const toast=text=>{const target=document.querySelector("#toast");target.textContent=text;target.classList.add("show");clearTimeout(toastHandle);toastHandle=setTimeout(()=>target.classList.remove("show"),3200);};
const head=(eyebrow,title,subtitle,buttons="")=>'<header class="headrow"><div><span class="eyebrow">'+esc(eyebrow)+'</span><h1>'+esc(title)+'</h1><p>'+esc(subtitle)+'</p></div><div class="headbuttons">'+buttons+'</div></header>';
const navButton=(title,to,variant="btn-ghost")=>'<button class="btn '+variant+'" data-goto="'+to+'">'+title+'</button>';
const status=(text,color="")=>'<span class="tag '+color+'">'+esc(text)+'</span>';
const card=(inner,cls="")=>'<section class="card pad '+cls+'">'+inner+'</section>';
function name(){return esc(state.company||"New company")}
function stepChecks(){return [
 ["structure","Select entity", "Identify the legal structure that matches the business."],
 ["founders","Founder information","Add shareholders and agree on responsibilities."],
 ["name","Choose company name","Verify availability with the filing provider."],
 ["filing","Submit formation","Obtain the actual state filing confirmation."],
 ["bylaws","Corporate records","Prepare bylaws and organizational consents."],
 ["stock","Founder equity","Document approved shares and any 83(b) steps."],
 ["ein","Tax identifier","Apply with the actual responsible party."],
 ["bank","Banking setup","Apply and complete provider verification."],
 ["customers","Go-to-market","Define a buyer and start testing demand."]
];}
function progress(){return count(state.tasks);}
const taskList=(limit=9)=>stepChecks().slice(0,limit).map(([key,title,desc])=>'<label class="taskline '+(state.tasks[key]?"done":"")+'"><input type="checkbox" data-task="'+key+'" '+(state.tasks[key]?"checked":"")+' aria-label="Mark '+esc(title)+' done"><span><strong>'+esc(title)+'</strong><br><small>'+esc(desc)+'</small></span>'+status(state.tasks[key]?"Reviewed":"To do",state.tasks[key]?"green":"grey")+'</label>').join("");
function viewOverview(){
const pct=Math.round(progress()/9*100);
return head("VENTURE OVERVIEW","Good morning, founder.","Your U.S. company launch, organized from the first decision to what comes next.",navButton("Export launch plan ↗","export","btn-ghost")+navButton("Continue setup →","formation","btn-primary"))+
'<section class="hero-progress"><div><span class="eyebrow">YOUR COMPANY JOURNEY</span><h2>One place for every step<br>of your U.S. launch.</h2><p>Build your company foundation, track documents and prepare the next operating milestone with a clear, connected workflow.</p>'+navButton("Continue company setup →","formation","btn btn-primary".split(" ").pop())+'</div><div class="journey"><div class="journey-step active"><span>01</span><strong>Plan</strong><small>In progress</small></div><div class="journey-step"><span>02</span><strong>Form</strong><small>Next</small></div><div class="journey-step"><span>03</span><strong>Operate</strong><small>Upcoming</small></div><div class="journey-step"><span>04</span><strong>Grow</strong><small>Future</small></div></div></section>'+
'<div class="grid grid-4"><div class="card stat"><span class="kicker">Formation readiness</span><span class="icon">◈</span><strong>'+pct+'%</strong><small>'+progress()+' of 9 planning milestones</small></div><div class="card stat"><span class="kicker">Founder equity</span><span class="icon">♧</span><strong>'+state.founderCount+' founders</strong><small>Illustrative cap table</small></div><div class="card stat"><span class="kicker">Documents</span><span class="icon">▤</span><strong>'+count(state.docs)+' / 8</strong><small>Reviewed in the demo</small></div><div class="card stat"><span class="kicker">Market pipeline</span><span class="icon">▥</span><strong>'+state.prospects.length+' leads</strong><small>Illustrative opportunities</small></div></div>'+
'<div class="grid grid-2" style="margin-top:18px"><section class="card pad"><div class="panel-top"><h2>Next steps</h2><button data-goto="formation">Open launch plan ↗</button></div>'+taskList(5)+'</section>'+card('<div class="panel-top"><h2>Latest in your workspace</h2><button data-goto="documents">Explore documents ↗</button></div><div class="timeline"><div class="timeline-item"><span class="timeline-indicator">✓</span><div><strong>Company structure explored</strong><p>Delaware C-Corp or LLC pathway</p></div></div><div class="timeline-item"><span class="timeline-indicator">◇</span><div><strong>Founder allocation modeled</strong><p>See cap-table scenarios and vesting notes</p></div></div><div class="timeline-item"><span class="timeline-indicator">▤</span><div><strong>Document workflows available to explore</strong><p>Formation, shareholder records, SAFE and EIN steps</p></div></div></div><div class="divider"></div><div class="notice">Explore the sample freely. The real founder intake is available separately, and changes here stay in your browser.</div>')+'</div>';
}
function viewFormation(){
const corp=state.entity==="Delaware C-Corporation",filing=corp?109:110,platform=499,agent=100,annual=corp?225:300;
return head("COMPANY FORMATION",name()+" — formation planner","Choose the structure, founder configuration and operating location; see a complete indicative cost breakdown.",navButton("Save plan ✓","save","btn-subtle")+navButton("View founder equity →","founders","btn-primary"))+
'<div class="grid grid-2"><section class="card pad"><h2 class="section-title">Your incorporation plan</h2><p class="section-note">Personalize this sample and preview how the filing process is organized.</p><div class="form-grid"><label class="field full-span">Proposed company name<input data-field="company" maxlength="80" value="'+esc(state.company)+'" placeholder="Northstar Labs"></label><label class="field">Entity type<select data-field="entity"><option value="Delaware C-Corporation" '+(corp?"selected":"")+'>Delaware C-Corporation</option><option value="U.S. LLC" '+(!corp?"selected":"")+'>Delaware LLC</option></select></label><label class="field">Formation jurisdiction<select data-field="region"><option '+(state.region==="Delaware"?"selected":"")+'>Delaware</option></select><small>Preview currently models Delaware filings</small></label><label class="field">Number of founders<select data-field="founderCount">'+[1,2,3,4].map(x=>'<option value="'+x+'" '+(state.founderCount===x?"selected":"")+'>'+x+(x===1?" founder":" founders")+'</option>').join("")+'</select></label><label class="field">Funding objective<select data-field="funding"><option value="venture" '+(state.funding==="venture"?"selected":"")+'>Venture / angel backed</option><option value="self" '+(state.funding==="self"?"selected":"")+'>Self-funded</option><option value="unsure" '+(state.funding==="unsure"?"selected":"")+'>Not sure yet</option></select></label><label class="field full-span">Target formation year<select data-field="year">'+["2026","2027","2028"].map(y=>'<option value="'+y+'" '+(state.year===y?"selected":"")+'>'+y+'</option>').join("")+'</select></label></div><div class="form-actions"><button class="btn btn-primary" data-goto="founders">Continue to founders →</button><button class="btn btn-ghost" data-goto="documents">See document flow ↗</button></div></section>'+
'<div class="grid"><section class="card pad cost-panel"><span class="eyebrow">ILLUSTRATIVE FORMATION ESTIMATE</span><div class="price-value">$'+(filing+platform+agent).toLocaleString()+' <span style="font-size:12px;color:#9ba3b4;font-weight:500">USD</span></div><div class="cost-row"><span>Sample platform coordination</span><strong>$'+platform+'</strong></div><div class="cost-row"><span>Example Delaware state filing</span><strong>$'+filing+'</strong></div><div class="cost-row"><span>Example registered agent (year 1)</span><strong>$'+agent+'</strong></div><div class="divider"></div><div class="cost-row"><span>Typical annual state minimum*</span><strong>$'+annual+' / yr</strong></div><p class="micro-copy">*Simplified Delaware example, not a live quote. Tax preparation, varying franchise tax, state nexus and other services are additional. Nothing can be purchased or filed from this demo.</p></section><section class="card pad"><div class="panel-top"><h2>Formation milestones</h2></div>'+[['Structure','Selected'],['Company details','Planning'],['Filing documents','Next'],['Official confirmation','Later']].map(([x,y],i)=>'<div class="stage-row"><span class="stage-icon">'+(i+1)+'</span><div><strong>'+x+'</strong><p>'+["Select C-Corp or LLC","Founders, company name and intended state","Prepare authorized filing documents","Confirm state acceptance and evidence"][i]+'</p></div>'+status(y,i===0?"green":i===1?"":"grey")+'</div>').join("")+'</section></div></div>';
}
function viewFounders(){
const a=Number(state.equityA)||0,b=100-a;
const first=esc(state.founderA),second=esc(state.founderB);
return head("FOUNDERS & EQUITY","Build your founding team","Explore ownership allocations, founder roles and documents in one structured cap-table experience.",navButton("Preview equity memo ↓","equityMemo","btn-subtle")+navButton("Open documents →","documents","btn-primary"))+
'<div class="grid grid-2"><section class="card pad"><h2 class="section-title">Founder ownership</h2><p class="section-note">Adjust the sample split to see the resulting distribution.</p><div class="form-grid"><label class="field">Founder 1<input data-field="founderA" maxlength="80" value="'+first+'"></label><label class="field">Founder 2<input data-field="founderB" maxlength="80" value="'+second+'"></label><label class="field full-span">Founder 1 ownership: <strong>'+a+'%</strong><input data-field="equityA" type="range" min="1" max="99" value="'+a+'" style="width:100%;margin-top:14px;accent-color:#6244ed"></label></div><div class="equity-bar"><div style="width:'+a+'%"></div><div></div></div><div class="legend"><span><b></b>'+first+' · '+a+'%</span><span><b></b>'+second+' · '+b+'%</span></div><div class="divider"></div><div class="notice">This models ownership only. An actual issuance requires authorized corporate action, proper documents, shares and tax treatment.</div></section>'+
'<section class="card pad"><div class="panel-top"><h2>Illustrative cap table</h2>'+status("MODELED","grey")+'</div><div class="table-wrap"><table class="mini-table"><thead><tr><th>Shareholder</th><th>Role</th><th>Shares</th><th>Ownership</th></tr></thead><tbody><tr><td>'+first+'</td><td>Founder</td><td>'+(a*100000).toLocaleString()+'</td><td>'+a+'%</td></tr><tr><td>'+second+'</td><td>Founder</td><td>'+(b*100000).toLocaleString()+'</td><td>'+b+'%</td></tr><tr><td><strong>Total</strong></td><td>—</td><td><strong>10,000,000</strong></td><td><strong>100%</strong></td></tr></tbody></table></div><div class="divider"></div><p class="section-note">Illustrative 10M-share example, not an authorized share issuance.</p><div class="pill-row"><span>Vesting scenarios</span><span>Founders</span><span>Equity documentation</span><span>83(b) reminders</span></div></section></div><div class="grid grid-3" style="margin-top:18px">'+[['Founder stock','Plan founder share purchase agreements and potential vesting.'],['Governance','Record actual directors, officers and authorization.'],['Tax election','Track time-sensitive 83(b) choices if they apply.']].map(([x,y])=>card('<span class="eyebrow">FOUNDATION</span><h3 class="section-title">'+x+'</h3><p class="section-note">'+y+'</p>')).join("")+'</div>';
}
const DOCS=[
 ["charter","Certificate of Incorporation","State filing document; final evidence comes from Delaware."],
 ["incorporator","Action of Incorporator","Records appointment of initial directors."],
 ["bylaws","Corporate Bylaws","Governance rules for the new corporation."],
 ["board","Initial Board Consent","Approvals for officers, initial actions and arrangements."],
 ["stock","Founder Stock Purchase","Shares, consideration, vesting and signatures."],
 ["ip","IP Assignment & Confidentiality","Documents ownership and confidentiality commitments."],
 ["tax83","83(b) Election Workflow","Tax-related election where founder shares qualify."],
 ["safe","SAFE Agreement","Illustrative future fundraising instrument."]
];
function viewDocuments(){
return head("DOCUMENT WORKSPACE","Everything in its place.","Browse the complete founder-document journey, review sample descriptions and track your readiness.",navButton("Download plan ↓","export","btn-subtle")+navButton("Funding readiness →","funding","btn-primary"))+
'<div class="grid grid-3" style="margin-bottom:18px"><div class="card stat"><span class="kicker">Document catalog</span><strong>8 items</strong><small>Formation to fundraise</small></div><div class="card stat"><span class="kicker">Reviewed locally</span><strong>'+count(state.docs)+' items</strong><small>Sample workspace only</small></div><div class="card stat"><span class="kicker">Record status</span><strong>Planning</strong><small>Future official documents tracked here</small></div></div>'+
card('<div class="panel-top"><h2>Company documents</h2>'+status("Preview catalog")+'</div>'+DOCS.map(([id,title,desc])=>'<div class="docrow"><span class="doc-symbol">▤</span><div><strong>'+title+'</strong><small>'+desc+'</small></div>'+status(state.docs[id]?"Reviewed":"Sample",state.docs[id]?"green":"grey")+'<button data-doc="'+id+'">Preview ↗</button><button data-review="'+id+'">'+(state.docs[id]?"Undo":"Review ✓")+'</button></div>').join("")+'<div class="divider"></div><p class="micro-copy">In the future, issued corporate documents would carry signatures, issuer, date, status and source evidence. This library contains no actual filings or legal instruments.</p>');
}
const TAXTASKS=[
 ["responsible","Confirm responsible party","Identify the actual person responsible for the IRS application."],
 ["irs","Prepare EIN information","Gather company details for the IRS process."],
 ["confirm","Track EIN confirmation","Record the official assigned EIN when issued."],
 ["business","Prepare banking profile","Compile records a business banking provider may request."],
 ["treasury","Complete provider application","Bank/treasury approval is provider-controlled."]
];
const taskTiles=(tasks,kind)=>'<div class="checkgrid">'+tasks.map(([key,title,desc])=>'<label class="checktile"><input type="checkbox" data-check="'+kind+':'+key+'" '+(state[kind][key]?"checked":"")+'><span><strong>'+title+'</strong><small>'+desc+'</small></span></label>').join("")+'</div>';
function viewTax(){
return head("EIN & BANKING","Set up the essentials.","Explore how a tax ID and business-banking application fit into the post-incorporation journey.",navButton("Open document library →","documents","btn-subtle"))+
'<div class="grid grid-2"><section class="card pad"><div class="panel-top"><h2>EIN application pathway</h2>'+status("Sample case","grey")+'</div><div class="stage-row"><span class="stage-icon">1</span><div><strong>Company formation verified</strong><p>The legal entity and filing receipt are ready for the next step.</p></div>'+status("Future","grey")+'</div><div class="stage-row"><span class="stage-icon">2</span><div><strong>Responsible-party and IRS details</strong><p>Use actual ownership and responsible-party information.</p></div>'+status("Plan")+'</div><div class="stage-row"><span class="stage-icon">3</span><div><strong>IRS confirmation recorded</strong><p>EIN is recorded only upon official confirmation.</p></div>'+status("Future","grey")+'</div></section><section class="card pad"><h2 class="section-title">Banking preparation</h2><p class="section-note">From legal records to a complete application packet.</p><div class="pill-row"><span>Certificate</span><span>Ownership records</span><span>Founder ID</span><span>EIN status</span></div><div class="divider"></div><div class="notice">A bank provider decides whether to open an account. This screen prepares the steps rather than indicating bank approval.</div><div class="form-actions">'+navButton("Explore costs →","formation","btn-ghost")+'</div></section></div>'+
card('<div class="panel-top"><h2>Setup checklist</h2>'+status(count(state.tax)+" / "+TAXTASKS.length+" planned")+'</div>'+taskTiles(TAXTASKS,"tax"),"") .replace('class="card pad "','"class="card pad " style="margin-top:18px"');
}
function viewOperations(){
const ops=[
 ["agent","Registered agent","Provider contact and annual renewal window"],
 ["annual","Annual state report","Delaware franchise/report tax calendar"],
 ["records","Company records","Signed documents, changes and company resolutions"],
 ["tax","Tax returns","Federal/state filing obligations and specialist support"],
 ["contracts","Contract administration","Vendor and customer execution documents"]
];
return head("ONGOING OPERATIONS","Keep your company in motion.","Bring annual obligations, company records, work requests and upcoming milestones into a single place.",navButton("Download launch summary ↓","export","btn-subtle"))+
'<div class="grid grid-3" style="margin-bottom:18px"><div class="card stat"><span class="kicker">Annual planning</span><strong>12 months</strong><small>Calendar example</small></div><div class="card stat"><span class="kicker">Obligations reviewed</span><strong>'+count(state.ops)+' / 5</strong><small>Browser sample state</small></div><div class="card stat"><span class="kicker">Workspace focus</span><strong>Entity health</strong><small>From formation onward</small></div></div>'+
'<div class="grid grid-2">'+card('<div class="panel-top"><h2>Annual obligations</h2></div>'+taskTiles(ops,"ops")+'<p class="micro-copy">Dates depend on entity, activity, year and provider; always verify the applicable calendar.</p>')+
card('<div class="panel-top"><h2>Illustrative company calendar</h2>'+status("Example","grey")+'</div>'+[['March 1','Delaware C-Corp annual report / franchise tax'],['June 1','Delaware LLC annual tax'],['When applicable','Federal and state tax returns'],['Annual anniversary','Registered agent renewal'],['As triggered','Foreign qualification / amendments']].map(([date,title])=>'<div class="stage-row"><span class="stage-icon">◷</span><div><strong>'+title+'</strong><p>'+date+'</p></div></div>').join('')+'<p class="micro-copy">This is a general reference, not customized deadline advice.</p>')+'</div>';
}
function viewGrowth(){
return head("U.S. MARKET ENTRY","From incorporation to customers.","Turn company setup into a concrete go-to-market plan, prospect research and follow-up workflow.",navButton("Export launch plan ↓","export","btn-subtle")+navButton("Company formation →","formation","btn-primary"))+
'<div class="grid grid-3" style="margin-bottom:18px"><div class="card stat"><span class="kicker">Target market</span><strong>United States</strong><small>Illustrative GTM plan</small></div><div class="card stat"><span class="kicker">Prospects modeled</span><strong>'+state.prospects.length+'</strong><small>Sample pipeline</small></div><div class="card stat"><span class="kicker">Launch objective</span><strong>First buyers</strong><small>Product + outreach</small></div></div>'+
'<div class="grid grid-2"><section class="card pad"><h2 class="section-title">Your go-to-market canvas</h2><div class="form-grid"><label class="field full-span">Industry / category<input maxlength="120" data-field="market" value="'+esc(state.market)+'"></label><label class="field full-span">Ideal customer profile<input maxlength="160" data-field="buyer" value="'+esc(state.buyer)+'"></label><label class="field full-span">Core offer<textarea data-field="offer" maxlength="250">'+esc(state.offer)+'</textarea></label></div><div class="form-actions"><button class="btn btn-primary" data-action="save">Save market plan ✓</button><button class="btn btn-ghost" data-goto="funding">Funding readiness →</button></div></section>'+
card('<div class="panel-top"><h2>Launch channels</h2></div>'+[['01','Ideal customer research','Identify companies and validated buyer triggers.'],['02','Founder-led introductions','Use authentic warm paths and community engagement.'],['03','Outbound sequences','Prepare relevant, consent-aware messages and follow-up.'],['04','Conversion evidence','Track calls, proposals, customers and settled payments.']].map(([n,title,desc])=>'<div class="stage-row"><span class="stage-icon">'+n+'</span><div><strong>'+title+'</strong><p>'+desc+'</p></div></div>').join(''))+'</div>'+
card('<div class="panel-top"><h2>Pipeline preview</h2>'+status("Sample leads","grey")+'</div>'+state.prospects.map((p,i)=>'<div class="pipeline-row"><span class="pipeline-avatar">'+esc((p.name||"N")[0])+'</span><div><strong>'+esc(p.name)+'</strong><small>'+esc(p.contact)+'</small></div>'+status(p.stage,i===2?"green":i===1?"":"grey")+'<button class="inline-link" data-advance="'+i+'">Advance →</button></div>').join('')+'<div class="divider"></div><form id="add-prospect"><div class="form-grid"><label class="field">New sample prospect<input name="prospect" maxlength="80" required placeholder="Example company"></label><label class="field">Source<input name="source" maxlength="70" placeholder="Founder referral"></label></div><div class="form-actions"><button class="btn btn-subtle" type="submit">+ Add sample prospect</button></div></form><p class="micro-copy">Pipeline entries are locally simulated. This workspace does not send messages or contact prospects.</p>').replace('class="card pad "','"class="card pad " style="margin-top:18px"');
}
const FUNDING=[
 ["cap","Clear cap table","Founders, issued shares and option pool records"],
 ["deck","Investor presentation","A coherent market, product and traction story"],
 ["safe","Financing documents","SAFE/convertible documents where suitable"],
 ["financials","Verified financials","Actual receipts, costs, revenue and runway"],
 ["datapack","Diligence room","Company records, customers, IP and contracts"]
];
function viewFunding(){
return head("FUNDRAISING READINESS","Ready for your next chapter.","See how founder documents, ownership and financial evidence become investor-facing materials.",navButton("View cap table →","founders","btn-primary"))+
'<div class="grid grid-2">'+card('<div class="panel-top"><h2>Investor-ready foundations</h2>'+status(count(state.fundingTasks)+" / "+FUNDING.length+" reviewed")+'</div>'+taskTiles(FUNDING,"fundingTasks")+'<div class="divider"></div><div class="notice">Funding eligibility, investor acceptance and capital raised are independent outcomes; this section models the preparation work.</div>')+
card('<div class="panel-top"><h2>Example data room</h2>'+status("Concept","grey")+'</div>'+[['Company records','Charter, bylaws, board consents'],['Ownership','Founder stock and current capitalization'],['Technology','IP chain of title, architecture, product'],['Commercial','Customer contracts and actual revenue'],['Financial','Statements, taxes, operating expenses']].map(([title,desc])=>'<div class="docrow"><span class="doc-symbol">▤</span><div><strong>'+title+'</strong><small>'+desc+'</small></div><button data-action="modal:dataroom">Explore</button></div>').join(''))+'</div><div class="grid grid-3" style="margin-top:18px">'+[['Formation complete','Real Delaware incorporation evidence'],['Ownership organized','Founder equity and governing documents'],['Fundraising materials','Approved SAFE and truthful investor disclosures']].map(([title,desc])=>card('<span class="eyebrow">READINESS</span><h3 class="section-title">'+title+'</h3><p class="section-note">'+desc+'</p>')).join("")+'</div>';
}
function render(){
state.equityA=Math.max(1,Math.min(99,Number(state.equityA)||65));
if(!valid.includes(current))current="overview";
const views={overview:viewOverview,formation:viewFormation,founders:viewFounders,documents:viewDocuments,tax:viewTax,operations:viewOperations,growth:viewGrowth,funding:viewFunding};
root.innerHTML=views[current]();
document.querySelector("#sidebar-company").textContent=state.company||"New company";
document.querySelector("#mobile-view").textContent=label(current);
document.querySelectorAll(".sideitem").forEach(item=>item.classList.toggle("active",item.dataset.view===current));
document.title=label(current)+" | U.S. Venture Company Demo";
}
function go(to){
if(to==="export"){exportPlan();return;}
if(to==="save"){save();toast("Changes saved in this sample workspace.");return;}
if(to==="equityMemo"){exportEquity();return;}
if(!valid.includes(to))return;
current=to;location.hash=to;render();window.scrollTo({top:0,behavior:"smooth"});
document.querySelector("#sidebar").classList.remove("open");
document.querySelector("#navtoggle").setAttribute("aria-expanded","false");
}
function makeFile(name,textContent){
const url=URL.createObjectURL(new Blob([textContent],{type:"text/plain;charset=utf-8"}));
const a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
setTimeout(()=>URL.revokeObjectURL(url),1000);toast("Sample file prepared for download.");
}
function exportPlan(){
makeFile("US-Venture-Company-sample-launch-plan.txt",[
 "U.S. Venture Company — illustrative company launch plan",
 "Sample company: "+state.company,"Entity: "+state.entity,"State: "+state.region,"Number of founders: "+state.founderCount,
 "Ownership model: "+state.founderA+" "+state.equityA+"%; "+state.founderB+" "+(100-state.equityA)+"%",
 "Market: "+state.market,"Ideal buyer: "+state.buyer,"Offer: "+state.offer,
 "Planning tasks reviewed: "+progress()+" of 9",
 "Sample workspace only. Not a state filing, legal document or completed paid service."
 ].join("\n"));
}
function exportEquity(){
makeFile("sample-founder-equity-memo.txt",[
 "Illustrative founder ownership memo — NOT A STOCK CERTIFICATE",
 "Company: "+state.company,"Entity intent: "+state.entity,
 state.founderA+": "+state.equityA+"% / "+(state.equityA*100000).toLocaleString()+" illustrative shares",
 state.founderB+": "+(100-state.equityA)+"% / "+((100-state.equityA)*100000).toLocaleString()+" illustrative shares",
 "Total sample shares: 10,000,000",
 "No ownership is legally issued, transferred, accepted or filed by this document."
 ].join("\n"));
}
function openModal(title,body){
document.querySelector("#modal-title").textContent=title;
document.querySelector("#modal-content").innerHTML=body;
document.querySelector("#modal").hidden=false;
document.querySelector("#modal-close").focus();
}
function docPreview(id){
const doc=DOCS.find(x=>x[0]===id);
if(!doc)return;
openModal(doc[1],'<p>'+esc(doc[2])+'</p><div class="divider"></div><p><strong>Typical steps:</strong> identify authorized parties, prepare appropriate terms, collect signed approvals if needed, attach final version and independently verify the source.</p><div class="notice">This is a document workflow preview, not a completed or valid legal instrument.</div>');
}
root.addEventListener("click",event=>{
const goto=event.target.closest("[data-goto]");if(goto){go(goto.dataset.goto);return;}
const preview=event.target.closest("[data-doc]");if(preview){docPreview(preview.dataset.doc);return;}
const mark=event.target.closest("[data-review]");if(mark){const id=mark.dataset.review;state.docs[id]=!state.docs[id];save();render();toast("Sample document status updated.");return;}
const advance=event.target.closest("[data-advance]");if(advance){const i=Number(advance.dataset.advance);const stages=["Researching","Qualified","Discovery","Proposal","Won"];const prospect=state.prospects[i];if(prospect){prospect.stage=stages[Math.min(stages.indexOf(prospect.stage)+1,4)]||"Qualified";save();render();toast("Sample opportunity stage advanced.");}return;}
const action=event.target.closest("[data-action]");if(action){if(action.dataset.action==="save"){save();toast("Sample market plan saved.");}else if(action.dataset.action==="modal:dataroom"){openModal("Sample data room","<p>A future data room would organize signed corporate records, actual financial results, verified customers, ownership instruments and investor sharing permissions.</p><div class='pill-row'><span>Company records</span><span>Finance</span><span>IP</span><span>Commercial</span></div>");}}
});
root.addEventListener("change",event=>{
const task=event.target.closest("[data-task]");if(task){state.tasks[task.dataset.task]=task.checked;save();render();return;}
const check=event.target.closest("[data-check]");if(check){const [group,key]=check.dataset.check.split(":");if(state[group]&&key in state[group]){state[group][key]=check.checked;save();render();}return;}
const field=event.target.closest("[data-field]");if(field){const key=field.dataset.field;const val=field.type==="number"||field.type==="range"||key==="founderCount"?Number(field.value):field.value;if(key in state){state[key]=val;save();render();}return;}
});
root.addEventListener("submit",event=>{
if(event.target.id!=="add-prospect")return;event.preventDefault();
const form=event.target,fd=new FormData(form),company=String(fd.get("prospect")||"").trim().slice(0,80),source=String(fd.get("source")||"Founder referral").trim().slice(0,70);
if(!company)return;
state.prospects.push({name:company,contact:source||"Founder referral",stage:"Researching"});save();render();toast("Sample prospect added.");
});
document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>go(button.dataset.view)));
document.querySelector("#navtoggle").addEventListener("click",()=>{const sidebar=document.querySelector("#sidebar");sidebar.classList.toggle("open");document.querySelector("#navtoggle").setAttribute("aria-expanded",String(sidebar.classList.contains("open")));});
document.querySelector("#reset").addEventListener("click",()=>{state=clone(SEED);save();go("overview");toast("Example workspace restored.");});
function closeModal(){document.querySelector("#modal").hidden=true;}
document.querySelector("#modal-close").addEventListener("click",closeModal);
document.querySelector("#modal-dismiss").addEventListener("click",closeModal);
document.querySelector("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();document.querySelector("#sidebar").classList.remove("open");document.querySelector("#navtoggle").setAttribute("aria-expanded","false");}});
window.addEventListener("hashchange",()=>{const next=location.hash.slice(1);if(valid.includes(next)){current=next;render();}});
render();