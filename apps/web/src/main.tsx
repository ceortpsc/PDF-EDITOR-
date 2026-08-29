import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Module = { id:string; name:string; description:string; actions:string[] };
const modules: Module[] = [
 {id:'workspace',name:'Workspace',description:'Unified document canvas with commands, history, collaboration and export.',actions:['New document','Upload','Compare','Export','Print']},
 {id:'documents',name:'Documents',description:'Document library, versions, folders, metadata and retention.',actions:['Import','Version','Move','Share','Archive']},
 {id:'forms',name:'Forms',description:'Fillable field designer with validation and deterministic tab order.',actions:['Text field','Checkbox','Radio','Dropdown','Date','Signature','Tab order']},
 {id:'ocr',name:'OCR',description:'Scanned-document text extraction and review workflows.',actions:['Start OCR','Review confidence','Replace text layer','Export searchable PDF']},
 {id:'pages',name:'Pages',description:'Insert, delete, reorder, rotate, extract, split and merge pages.',actions:['Insert','Delete','Reorder','Rotate','Extract','Split','Merge']},
 {id:'review',name:'Review',description:'Comments, highlights, drawing tools, compare and shared review.',actions:['Comment','Highlight','Draw','Stamp','Compare','Resolve']},
 {id:'accessibility',name:'Accessibility',description:'Tags, reading order, alt text and validation tooling.',actions:['Inspect tags','Reading order','Alt text','Validate']},
 {id:'security',name:'Security',description:'Redaction, metadata controls, permissions and audit records.',actions:['Redact','Sanitize metadata','Permissions','Audit']},
 {id:'conversions',name:'Conversions',description:'Universal document conversion and optimization workflows.',actions:['PDF→Word','PDF→Excel','PDF→PPT','PDF→HTML','PDF/A','DOCX→PDF','Image→PDF']},
 {id:'automations',name:'Automations',description:'Batch actions, schedules, retries and governed workflow execution.',actions:['Create action','Run batch','Schedule','Retry']},
 {id:'templates',name:'Templates',description:'150 seeded templates across business, operations and administrative workflows.',actions:['Browse','Create from template','Favorite']},
 {id:'account',name:'Account',description:'Profile, organizations, security and session management.',actions:['Profile','Security','Sessions','Organizations']},
 {id:'billing',name:'Billing',description:'Trial, subscriptions, usage, invoices and customer self-service.',actions:['Plans','Checkout','Invoices','Manage subscription']},
 {id:'admin',name:'Admin',description:'Platform administration, feature flags, users, tenants and observability.',actions:['Users','Tenants','Feature flags','Audit','Health']},
 {id:'ai',name:'ANDREAA CHAN\'NEL AI Assist',description:'AI navigation, document reasoning, workflow planning and governed tool routing.',actions:['Ask AI','Explain','Navigate','Plan workflow','Run approved action']}
];
const templateCategories=['Business','HR','Finance','Operations','Legal/Admin','Sales','Marketing','Education','Tax','Real Estate','Healthcare','Client Services'];
const templateNames=['Engagement Letter','Invoice','Estimate','Meeting Agenda','Project Brief','SOP','Policy Memo','Offer Letter','Onboarding Checklist','Expense Report','Purchase Order','Client Intake','Service Agreement','Change Order','Progress Report','Audit Checklist','Cover Letter','Status Report','Request Form','Training Plan'];

function App(){
 const [active,setActive]=useState('workspace'); const [query,setQuery]=useState(''); const [dark,setDark]=useState(false); const [files,setFiles]=useState<File[]>([]); const [chat,setChat]=useState(''); const [messages,setMessages]=useState<string[]>(['I\'m ANDREAA CHAN\'NEL AI Assist. Tell me the outcome you need and I\'ll route you to the right Ross PDF workflow.']);
 const visible=useMemo(()=>modules.filter(m=>(m.name+' '+m.description).toLowerCase().includes(query.toLowerCase())),[query]);
 const activeModule=modules.find(m=>m.id===active)??modules[0];
 const chooseFiles=(list:FileList|null)=>list&&setFiles(f=>[...f,...Array.from(list)]);
 const ask=()=>{const q=chat.trim();if(!q)return;setMessages(m=>[...m,'You: '+q,'AI: I classified this as a document-workflow request. Open '+(q.toLowerCase().includes('ocr')?'OCR':q.toLowerCase().includes('convert')?'Conversions':q.toLowerCase().includes('form')?'Forms':'Workspace')+' and confirm before executing any destructive action.']);setChat('')};
 return <div className={dark?'app dark':'app'}>
  <header className="topbar"><div className="brand"><div className="mark">RP</div><div><strong>ROSS PDF</strong><small>UNIVERSAL EDITOR</small></div></div><div className="search"><input placeholder="Search tools, documents, commands…" value={query} onChange={e=>setQuery(e.target.value)}/></div><button onClick={()=>setDark(v=>!v)}>{dark?'Light':'Dark'}</button><button onClick={()=>setActive('account')}>Sign In</button><button className="gold" onClick={()=>setActive('billing')}>Start Free Trial</button></header>
  <div className="layout"><aside className="rail"><div className="railtitle">PRODUCT</div>{visible.map(m=><button className={m.id===active?'nav active':'nav'} onClick={()=>setActive(m.id)} key={m.id}>{m.name}</button>)}</aside>
  <main className="content"><section className="hero"><div><div className="eyebrow">AI POWERED • SECURE • ENTERPRISE</div><h1>Intelligent Document Power.</h1><p>One web-native workspace for editing, conversion, OCR, forms, review, automation and AI-assisted workflows.</p><div className="cta"><button className="gold" onClick={()=>setActive('billing')}>Start Free Trial</button><button onClick={()=>document.getElementById('filepick')?.click()}>Upload Document</button><button onClick={()=>setActive('ai')}>Ask ANDREAA AI</button></div></div></section>
  <section className="drop" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();chooseFiles(e.dataTransfer.files)}}><div className="dropicon">↥</div><h2>Drag & drop local files</h2><p>PDF, DOCX, XLSX, PPTX, images and other supported source files.</p><input id="filepick" type="file" multiple hidden onChange={e=>chooseFiles(e.target.files)}/><button className="primary" onClick={()=>document.getElementById('filepick')?.click()}>Choose Local Files</button>{files.length>0&&<div className="filelist">{files.map((f,i)=><span key={i}>{f.name}</span>)}</div>}</section>
  <section className="sectionhead"><div><div className="eyebrow">WORKSPACE MODULE</div><h2>{activeModule.name}</h2><p>{activeModule.description}</p></div></section>
  <section className="grid">{activeModule.actions.map(a=><div className="card" key={a}><h3>{a}</h3><p>Production action surface with explicit validation, authorization and audit boundaries.</p><button onClick={()=>alert(a+' action selected')}>Open</button></div>)}</section>
  {active==='templates'||activeModule.id==='templates'?<section className="card"><h2>150 Seeded Templates</h2><div className="chips">{templateCategories.flatMap(c=>templateNames.slice(0,12).map(n=><button key={c+'-'+n} onClick={()=>alert('Template: '+c+' / '+n)}>{c} · {n}</button>))}</div></section>:null}
  <section className="card"><div className="row"><div><h2>Plans</h2><p>Luxury SaaS tiers; authoritative pricing comes from the live billing catalog.</p></div></div><div className="pricing"><div><b>Free Trial</b><strong>$0</strong><p>Evaluation workspace</p><button className="primary" onClick={()=>setActive('billing')}>Start Trial</button></div><div className="featured"><b>Professional</b><strong>$149/mo</strong><p>Advanced editing, OCR, conversion and AI assistance</p><button className="primary" onClick={()=>setActive('billing')}>Choose</button></div><div><b>Studio Plus</b><strong>$299/mo</strong><p>High-volume production and automation</p><button className="gold" onClick={()=>setActive('billing')}>Choose</button></div><div><b>Enterprise</b><strong>Custom</strong><p>Governance, SSO and enterprise controls</p><button onClick={()=>setActive('admin')}>Request Access</button></div></div></section>
  </main></div>
  <aside className="assistant"><div className="ahead">ANDREAA CHAN'NEL AI ASSIST <span>AI PERSONA</span></div><div className="messages">{messages.slice(-6).map((m,i)=><div className="msg" key={i}>{m}</div>)}</div><div className="chatbox"><input value={chat} onChange={e=>setChat(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask, navigate, plan…"/><button className="primary" onClick={ask}>Send</button></div></aside>
 </div>
}

createRoot(document.getElementById('root')!).render(<App/>);
