import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";

const root=path.resolve(import.meta.dirname,"..");
const html=fs.readFileSync(path.join(root,"public/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/styles.css"),"utf8");
const app=fs.readFileSync(path.join(root,"public/app.js"),"utf8");

test("reference hero and landing hierarchy",()=>{
  for(const value of ["Global Founders. U.S. Growth.","Build your U.S.","company. Go beyond","incorporation.","Your U.S. launch","Founder application","Market-entry next steps","From formation plans to first customers."]){
    assert.ok(html.includes(value),value+" missing");
  }
  assert.equal((html.match(/class="feature-card"/g)||[]).length,3);
  assert.equal((html.match(/class="entity-choice/g)||[]).length,3);
  for(const anchor of ["overview","platform","solutions","how-it-works","pricing","assessment","frequently-asked"]){
    assert.match(html,new RegExp('id="'+anchor+'"'));
  }
});

test("founder assessment stays operable and disclosures are accurate",()=>{
  for(const field of ["name","email","country","entityType","goal","consent"]){
    assert.ok(html.includes('name="'+field+'"'),field+" missing");
  }
  assert.match(html,/Official company filing services are not yet available/);
  assert.match(html,/name="heroEntity"/);
  assert.match(app,/api\/intake/);
  assert.match(app,/heroEntity/);
  assert.match(app,/stepSections/);
});

test("responsive theme and javascript syntax",()=>{
  for(const bp of ["@media(max-width:1270px)","@media(max-width:1080px)","@media(max-width:800px)","@media(max-width:600px)","@media(max-width:385px)"]){
    assert.ok(css.includes(bp),bp+" missing");
  }
  const syntax=spawnSync(process.execPath,["--check",path.join(root,"public/app.js")],{encoding:"utf8"});
  assert.equal(syntax.status,0,syntax.stderr);
});
