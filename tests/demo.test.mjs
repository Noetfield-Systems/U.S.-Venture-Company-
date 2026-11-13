import {test} from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
const root=path.resolve(import.meta.dirname,"..");
const html=fs.readFileSync(path.join(root,"public/demo.html"),"utf8");
const js=fs.readFileSync(path.join(root,"public/demo.js"),"utf8");
const css=fs.readFileSync(path.join(root,"public/demo.css"),"utf8");
const home=fs.readFileSync(path.join(root,"public/index.html"),"utf8");
const server=fs.readFileSync(path.join(root,"server.mjs"),"utf8");
test("interactive venture sample provides full real category navigation",()=>{
  for(const id of ["overview","formation","founders","documents","tax","operations","growth","funding"])
    assert.ok(html.includes('data-view="'+id+'"'),"Missing view "+id);
  for(const feature of ["Formation","Founders & equity","Documents","EIN & banking","Operations","Market entry","Fundraising"])
    assert.ok(html.includes(feature));
  assert.ok(js.includes("localStorage.setItem"),"Demo should persist user choices locally");
  assert.ok(js.includes("function exportPlan"),"Plan export should be functional");
  assert.ok(js.includes("function docPreview"),"Documents preview should work");
  assert.ok(js.includes("add-prospect"),"Sample pipeline should be editable");
  assert.ok(html.includes("SAMPLE WORKSPACE"),"Sample context should be clear");
});
test("product demo is discoverable from the public landing page",()=>{
  assert.match(home,/href="\/demo"/);
  assert.match(server,/url.pathname==='\/demo'/);
  assert.match(home,/Explore interactive workspace/);
  assert.match(home,/platform-spotlight/);
});
test("demo is responsive and has valid JS",()=>{
  for(const bp of ["@media(max-width:1180px)","@media(max-width:830px)","@media(max-width:590px)"])
    assert.ok(css.includes(bp),"Missing responsive breakpoint "+bp);
  const result=spawnSync(process.execPath,["--check",path.join(root,"public/demo.js")],{encoding:"utf8"});
  assert.equal(result.status,0,result.stderr);
});
