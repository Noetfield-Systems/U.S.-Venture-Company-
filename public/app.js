// U.S. Venture Company · reference-faithful page interactions · v3
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const navToggle=$("#menu-toggle");
const navLinks=$("#nav-links");

if(navToggle&&navLinks){
  const closeMenu=()=>{navLinks.classList.remove("open");navToggle.setAttribute("aria-expanded","false");};
  navToggle.addEventListener("click",()=>{
    const isOpen=navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded",String(isOpen));
  });
  $$("a",navLinks).forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();$$(".nav-dropdown.is-open").forEach(x=>{x.classList.remove("is-open");$("button",x)?.setAttribute("aria-expanded","false");});}});
}

$$(".nav-dropdown").forEach(dropdown=>{
  const trigger=$(".dropdown-toggle",dropdown);
  trigger?.addEventListener("click",()=>{
    const open=dropdown.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded",String(open));
    $$(".nav-dropdown").filter(x=>x!==dropdown).forEach(x=>{
      x.classList.remove("is-open");$(".dropdown-toggle",x)?.setAttribute("aria-expanded","false");
    });
  });
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".nav-dropdown"))$$(".nav-dropdown.is-open").forEach(x=>{
    x.classList.remove("is-open");$(".dropdown-toggle",x)?.setAttribute("aria-expanded","false");
  });
});
if($("#year"))$("#year").textContent=String(new Date().getFullYear());

const route=location.pathname;
if(route==="/privacy"||route==="/terms"){
  const isPrivacy=route==="/privacy";
  const main=$("main");
  if(main){
    main.innerHTML='<section class="policy-page"><div class="container"><a href="/" class="policy-back">← Back to home</a><p class="section-label">FOUNDING-STAGE POLICY</p><h1>'+ (isPrivacy?'Privacy Notice':'Terms of Website Use')+'</h1><p class="policy-date">Last updated 13 November 2026</p><div class="policy-body">'+(isPrivacy?
      '<h2>Information we collect</h2><p>When you request a founder assessment, we collect information you provide, including name, email, country, company name, business stage, intended entity type, formation goal, budget/timeline preferences and referral source. We retain essential request metadata, a consent timestamp and internal follow-up status.</p><h2>How information is used</h2><p>To respond to your voluntary inquiry, assess the request, maintain an operator follow-up record and protect the service from abuse. We do not sell the information collected through assessments.</p><h2>Who can access it</h2><p>Authorized operators and contracted technical service providers where necessary for support. Records may be processed in the U.S. or Canada. Access is restricted; we do not publish inquiry information or share it as testimonials without permission.</p><h2>Retention, access and deletion</h2><p>We review inactive requests for deletion, ordinarily within 12 months, subject to relevant legal recordkeeping. You may request access, withdrawal of contact permission or deletion through the correspondence associated with your inquiry; we verify identity before acting.</p><h2>Current stage</h2><p>This is an early-stage inquiry platform for a proposed U.S. venture. This notice does not represent the company as incorporated, nor does assessment submission initiate legal filing or payment.</p>':
      '<h2>Formation planning, not incorporation</h2><p>This website gathers nonbinding expressions of interest in U.S. company formation and ongoing launch services. The proposed U.S. company is not yet incorporated. No official filings, legal representation, tax services, loan placement, securities offering, or bank approval are performed through this website.</p><h2>Assessments are not contracts</h2><p>Submitting a founder assessment creates an inquiry, not a paid order, legal or tax relationship, corporate registration or guarantee of any product availability.</p><h2>Illustrative product preview</h2><p>Workspace UI, checklist statuses, feature descriptions and planned services are illustrative. Checked items or entity preferences on the public page have no legal effect. Any future service requires an identified lawful contracting party and separate terms.</p><h2>No outcome guarantees</h2><p>U.S. incorporation does not guarantee tax benefits, immigration eligibility, banking, customers, venture capital or financing. Banking, filing, legal and financial decisions remain with authorized independent actors.</p><h2>Site availability</h2><p>We aim for accurate information, subject to updates, and maintain reasonable protections for submitted inquiries. We do not guarantee continuous availability, and rights that cannot lawfully be limited remain unaffected.</p>'
    )+'</div></div></section>';
    document.title=(isPrivacy?"Privacy":"Terms")+" | U.S. Venture Company";
    window.scrollTo(0,0);
  }
}

// Product-demo UI, distinctly separate from actual formation cases.
const workspaceNav=$$(".workspace-menu");
const workspacePages={
 overview:["Your U.S. launch","Set up, launch, and grow your business in the United States."],
 company:["Your company","Explore the structure and information your company will need."],
 plan:["Your launch plan","Organize the steps from preparation to active operations."],
 market:["U.S. market entry","Explore positioning, first customers and launch execution."],
 docs:["Your document roadmap","See what official formation and corporate records involve."]
};
workspaceNav.forEach(button=>button.addEventListener("click",()=>{
  workspaceNav.forEach(b=>b.classList.toggle("active",b===button));
  const p=workspacePages[button.dataset.workspace];
  if(p){$("#workspace-heading").textContent=p[0];$("#workspace-description").textContent=p[1];}
}));
$$(".workspace-item").forEach(button=>button.addEventListener("click",()=>{
  const type=button.dataset.item;
  if(type==="structure"||type==="founders")$("#assessment")?.scrollIntoView({behavior:"smooth",block:"start"});
  else $("#how-it-works")?.scrollIntoView({behavior:"smooth",block:"start"});
}));

// Preview selection is real input that carries through to the founder intake.
const entityInputs=$$('input[name="heroEntity"]');
const entitySelect=$('select[name="entityType"]');
function updateEntitySelection(value){
  entityInputs.forEach(input=>{
    input.checked=input.value===value;
    input.closest(".entity-choice")?.classList.toggle("selected",input.checked);
  });
  if(entitySelect)entitySelect.value=value;
}
entityInputs.forEach(input=>input.addEventListener("change",()=>updateEntitySelection(input.value)));
if(entityInputs.length&&entitySelect)updateEntitySelection(entityInputs.find(i=>i.checked)?.value||"Delaware C-Corporation");
entitySelect?.addEventListener("change",()=>updateEntitySelection(entitySelect.value));
const stepSections=$$(".form-step");
const form=$("#assessment-form");
const prev=$("#prev-step"),next=$("#next-step"),submit=$("#send-form");
const error=$("#form-error");
let step=0;
function showStep(){
  stepSections.forEach((part,index)=>part.classList.toggle("active",index===step));
  $$(".form-progress-track span").forEach((bar,index)=>bar.classList.toggle("on",index<=step));
  if($("#form-progress"))$("#form-progress").textContent="Step "+(step+1)+" of "+stepSections.length;
  if(prev)prev.hidden=step===0;
  if(next)next.hidden=step===stepSections.length-1;
  if(submit)submit.hidden=step!==stepSections.length-1;
  if(error)error.textContent="";
}
function validStep(){
  for(const input of $$("input[required], select[required], textarea[required]",stepSections[step])){
    if(!input.checkValidity()){
      input.reportValidity();
      return false;
    }
  }
  return true;
}
if(form){
  next?.addEventListener("click",()=>{
    if(!validStep())return;
    step=Math.min(step+1,stepSections.length-1);
    showStep();
  });
  prev?.addEventListener("click",()=>{
    step=Math.max(0,step-1);
    showStep();
  });
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!validStep())return;
    if(error)error.textContent="";
    submit.disabled=true;
    const original=submit.innerHTML;
    submit.textContent="Submitting…";
    const body=Object.fromEntries(new FormData(form).entries());
    body.consent=form.elements.consent.checked;
    try{
      const response=await fetch("/api/intake",{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)
      });
      const data=await response.json();
      if(!response.ok||data.accepted!==true)throw Error(data.message||"Unable to submit your inquiry. Please try again.");
      form.hidden=true;
      $("#success-panel").hidden=false;
      $("#reference-id").textContent=data.reference;
      $("#success-panel").scrollIntoView({behavior:"smooth",block:"center"});
    }catch(e){
      if(error)error.textContent=e.message||"Submission failed. Please try again.";
    }finally{
      submit.disabled=false;submit.innerHTML=original;
    }
  });
  $("#reset-form")?.addEventListener("click",()=>{
    form.reset();step=0;showStep();form.hidden=false;$("#success-panel").hidden=true;
    updateEntitySelection("Delaware C-Corporation");
  });
  showStep();
}
