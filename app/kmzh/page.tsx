"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const SYNIP = ["1-сынып","2-сынып","3-сынып","4-сынып","5-сынып","6-сынып","7-сынып","8-сынып","9-сынып","10-сынып","11-сынып"];

const PROMPT = (f: Record<string,string>) => `Сен — Қазақстанның білікті мұғалім-әдіскерісің. 130-бұйрыққа сай толыққанды ҚМЖ жаса.
Пән:${f.pan}|Сынып:${f.synip}|Бөлім:${f.bolim}|Тақырып:${f.takiyrip}|ОМ:${f.om||"автоматты"}|Ресурстар:${f.res||"Оқулық, тақта"}|ҮТ:${f.ut||"Жаттығулар"}|Құндылықтар:${f.qund||"Ынтымақтастық"}
Тек HTML кестесі қайтар (doc, mt, gt, lt, ml, ph class-тарымен):
<div class="doc"><p class="dt">ҚЫСҚА МЕРЗІМДІ ЖОСПАР</p>
<table class="mt"><tbody>
<tr><td class="ml">Мектеп</td><td>________________________</td><td class="ml">Күні</td><td>________________________</td></tr>
<tr><td class="ml">Мұғалім</td><td>________________________</td><td class="ml">Сынып</td><td>${f.synip}</td></tr>
<tr><td class="ml">Пән</td><td>${f.pan}</td><td class="ml">Қатысқандар</td><td>________________________</td></tr>
<tr><td class="ml">Бөлім</td><td colspan="3">${f.bolim}</td></tr>
<tr><td class="ml">Тақырып</td><td colspan="3">${f.takiyrip}</td></tr>
</tbody></table>
<table class="gt"><tbody>
<tr><td class="ml">Оқу мақсаты</td><td>[ОМ КОДЫМЕН НАҚТЫ ЖАЗ]</td></tr>
<tr><td class="ml">Сабақ мақсаты</td><td>[ОҚУШЫЛАР НЕ ЖАСАЙ АЛАДЫ?]</td></tr>
<tr><td class="ml">Бағалау критерийлері</td><td>[НАҚТЫ ТІЗІМ]</td></tr>
<tr><td class="ml">Тілдік мақсаттар</td><td>[ПӘН ЛЕКСИКАСЫ]</td></tr>
<tr><td class="ml">Құндылықтар</td><td>${f.qund||"Ынтымақтастық"}</td></tr>
<tr><td class="ml">Пәнаралық байланыс</td><td>[БАЙЛАНЫСТЫ ЖАЗ]</td></tr>
</tbody></table>
<table class="gt"><tbody><tr><td class="ml">Ресурстар</td><td>${f.res||"Оқулық, тақта"}</td></tr></tbody></table>
<table class="lt"><thead><tr><th style="width:10%">Уақыты</th><th style="width:28%">Мұғалім іс-әрекеті</th><th style="width:28%">Оқушы іс-әрекеті</th><th style="width:18%">Бағалау</th><th style="width:16%">Ресурс</th></tr></thead>
<tbody>
<tr class="ph"><td colspan="5">Сабақтың басы — 10 минут</td></tr>
[3 нақты қатар tr td]
<tr class="ph"><td colspan="5">Сабақтың ортасы — 25 минут</td></tr>
[4 нақты қатар tr td]
<tr class="ph"><td colspan="5">Сабақтың соңы — 10 минут</td></tr>
[2 нақты қатар tr td]
</tbody></table>
<table class="gt"><tbody>
<tr><td class="ml">Саралау</td><td>[3 деңгей: қолдау/орта/дарынды]</td></tr>
<tr><td class="ml">Үй тапсырмасы</td><td>${f.ut||"Тиісті жаттығулар"}</td></tr>
<tr><td class="ml">Рефлексия</td><td>________________________</td></tr>
</tbody></table></div>
Тек HTML. Барлық [ЖАҚШАЛАРДЫ] нақты мазмұнмен толтыр.`;

export default function KmzhPage() {
  const [f, setF] = useState<Record<string,string>>({});
  const [state, setState] = useState<"idle"|"loading"|"result"|"error">("idle");
  const [html, setHtml] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const rRef = useRef<HTMLDivElement>(null);

  const s = (k: string, v: string) => setF(p => ({...p, [k]: v}));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.pan || !f.synip || !f.bolim || !f.takiyrip) { alert("Міндетті өрістерді толтырыңыз"); return; }
    setState("loading"); setErr("");
    try {
      const res = await fetch("/api/generate", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ prompt: PROMPT(f) }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setHtml(data.html); setState("result");
      setTimeout(() => rRef.current?.scrollIntoView({behavior:"smooth", block:"start"}), 150);
    } catch(e: unknown) { setErr(e instanceof Error ? e.message : "Қате"); setState("error"); }
  }

  async function copy() {
    const d = document.createElement("div"); d.innerHTML = html;
    try { await navigator.clipboard.writeText(d.innerText); setCopied(true); setTimeout(()=>setCopied(false),2500); } catch{}
  }

  const inp = "width:100%;borderRadius:9px;border:1.5px solid #e2e8f0;padding:8px 12px;fontSize:13px;outline:none;fontFamily:inherit;boxSizing:border-box";

  return (
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#f8fafc,#eff6ff 50%,#f5f3ff)"}}>
      <style>{`
        .doc{font-family:'Times New Roman',serif;font-size:11px;color:#000}
        .dt{font-size:12px;font-weight:bold;text-transform:uppercase;text-align:center;letter-spacing:.5px;margin-bottom:8px}
        .doc table{width:100%;border-collapse:collapse;margin-bottom:4px;font-size:10px}
        .doc td,.doc th{border:1px solid #444;padding:4px 6px;vertical-align:top;line-height:1.4}
        .ml{font-weight:bold;background:#eef2ff;width:22%}
        .doc th{background:#dbeafe;font-weight:bold;text-align:center;font-size:9px}
        .ph td{background:#eff6ff;font-weight:bold;color:#1e40af}
        @media print{body *{visibility:hidden}#pz,#pz *{visibility:visible}#pz{position:fixed;top:0;left:0;width:100%;padding:20px}}
      `}</style>

      {/* Header */}
      <header style={{position:"sticky",top:0,zIndex:50,height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 1.5rem",background:"rgba(255,255,255,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid #e2e8f0"}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#2563eb,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:800,fontSize:11}}>AI</div>
          <span style={{fontWeight:800,fontSize:15,color:"#0f172a"}}>AIYM <span style={{color:"#2563eb"}}>AI</span></span>
        </Link>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Link href="/" style={{padding:"6px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",background:"white",fontSize:12,fontWeight:600,color:"#475569",textDecoration:"none"}}>← Басты бет</Link>
          <span style={{padding:"4px 12px",borderRadius:99,background:"#eff6ff",border:"1px solid #dbeafe",fontSize:11,fontWeight:700,color:"#2563eb"}}>📋 ҚМЖ жасау</span>
        </div>
      </header>

      <main style={{maxWidth:1100,margin:"0 auto",padding:"28px 1.5rem"}}>
        <h1 style={{fontSize:28,fontWeight:900,color:"#0f172a",letterSpacing:-1,marginBottom:6}}>
          ҚМЖ жасау <span style={{background:"linear-gradient(135deg,#2563eb,#7c3aed)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>жасанды интеллектпен</span>
        </h1>
        <p style={{color:"#64748b",fontSize:14,marginBottom:28}}>130‑бұйрық талаптарына сай толық форматталған ҚМЖ кестесін жасайды.</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,alignItems:"start"}}>
          {/* FORM */}
          <div style={{background:"white",borderRadius:22,border:"1px solid #e2e8f0",boxShadow:"0 8px 32px rgba(0,0,0,.08)",overflow:"hidden"}}>
            <div style={{padding:"16px 20px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📋</div>
              <div>
                <div style={{color:"white",fontWeight:700,fontSize:14}}>ҚМЖ деректерін енгізіңіз</div>
                <div style={{color:"rgba(255,255,255,.7)",fontSize:11}}>* белгіленген өрістер міндетті</div>
              </div>
            </div>
            <form onSubmit={submit} style={{padding:20}}>
              <div style={{background:"#eff6ff",borderRadius:12,padding:12,border:"1px solid #dbeafe",marginBottom:10}}>
                <div style={{fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Негізгі ақпарат</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  {[{k:"pan",l:"Пән *",ph:"Математика..."},{k:"bolim",l:"Бөлім *",ph:"ҰМЖ бөлімі"},{k:"takiyrip",l:"Тақырып *",ph:"Сабақ тақырыбы"}].map(x=>(
                    <div key={x.k}>
                      <label style={{display:"block",fontSize:11,color:"#64748b",marginBottom:4}}>{x.l}</label>
                      <input style={{width:"100%",borderRadius:9,border:"1.5px solid #e2e8f0",padding:"8px 11px",fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"} as React.CSSProperties} placeholder={x.ph} value={f[x.k]||""} onChange={e=>s(x.k,e.target.value)}/>
                    </div>
                  ))}
                  <div>
                    <label style={{display:"block",fontSize:11,color:"#64748b",marginBottom:4}}>Сынып *</label>
                    <select style={{width:"100%",borderRadius:9,border:"1.5px solid #e2e8f0",padding:"8px 11px",fontSize:13,outline:"none",fontFamily:"inherit",cursor:"pointer",boxSizing:"border-box",background:"white"} as React.CSSProperties} value={f.synip||""} onChange={e=>s("synip",e.target.value)}>
                      <option value="">Таңдаңыз</option>
                      {SYNIP.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div style={{background:"#f8fafc",borderRadius:12,padding:12,border:"1px solid #f1f5f9",marginBottom:10}}>
                <div style={{fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Мақсаттар мен қосымша</div>
                {[{k:"om",l:"Оқу мақсаты",ph:"7.1.2.1 — ..."},{k:"qund",l:"Құндылықтар",ph:"Ынтымақтастық..."},{k:"res",l:"Ресурстар",ph:"Оқулық, тақта..."},{k:"ut",l:"Үй тапсырмасы",ph:"Жаттығулар..."}].map(x=>(
                  <div key={x.k} style={{marginBottom:8}}>
                    <label style={{display:"block",fontSize:11,color:"#64748b",marginBottom:4}}>{x.l}</label>
                    <input style={{width:"100%",borderRadius:9,border:"1.5px solid #e2e8f0",padding:"8px 11px",fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"} as React.CSSProperties} placeholder={x.ph} value={f[x.k]||""} onChange={e=>s(x.k,e.target.value)}/>
                  </div>
                ))}
              </div>
              <button type="submit" disabled={state==="loading"} style={{width:"100%",padding:"13px",borderRadius:13,border:"none",background:state==="loading"?"#e2e8f0":"linear-gradient(135deg,#2563eb,#4f46e5)",color:state==="loading"?"#94a3b8":"white",fontWeight:700,fontSize:14,cursor:state==="loading"?"not-allowed":"pointer",fontFamily:"inherit"}}>
                {state==="loading"?"Жасалуда...":"✦ ҚМЖ жасау"}
              </button>
            </form>
          </div>

          {/* RESULT */}
          <div ref={rRef}>
            {state==="idle"&&(
              <div style={{minHeight:380,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:22,border:"2px dashed #e2e8f0",background:"rgba(255,255,255,.6)",padding:36,textAlign:"center"}}>
                <div style={{fontSize:44,marginBottom:12}}>📄</div>
                <h3 style={{fontSize:16,fontWeight:700,color:"#475569",marginBottom:7}}>Нәтиже осында пайда болады</h3>
                <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.7}}>Форманы толтырып батырманы басыңыз</p>
              </div>
            )}
            {state==="loading"&&(
              <div style={{minHeight:380,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:22,border:"1px solid #dbeafe",background:"linear-gradient(135deg,#eff6ff,#f5f3ff)",padding:36,textAlign:"center"}}>
                <div style={{width:56,height:56,borderRadius:"50%",border:"4px solid #dbeafe",borderTopColor:"#2563eb",animation:"spin 1s linear infinite",marginBottom:16}}/>
                <h3 style={{fontSize:16,fontWeight:700,color:"#1e293b",marginBottom:5}}>Claude AI жасап жатыр...</h3>
                <p style={{fontSize:12,color:"#64748b"}}>15–30 секунд күтіңіз</p>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            )}
            {state==="error"&&(
              <div style={{minHeight:240,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:22,border:"1px solid #fecaca",background:"#fff5f5",padding:36,textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:10}}>⚠️</div>
                <h3 style={{fontSize:15,fontWeight:700,marginBottom:5}}>Қате орын алды</h3>
                <p style={{fontSize:12,color:"#ef4444",marginBottom:14}}>{err}</p>
                <button onClick={()=>setState("idle")} style={{padding:"8px 18px",borderRadius:11,border:"1.5px solid #fecaca",background:"white",fontSize:12,fontWeight:600,color:"#ef4444",cursor:"pointer",fontFamily:"inherit"}}>Қайта</button>
              </div>
            )}
            {state==="result"&&(
              <div style={{background:"white",borderRadius:22,border:"1px solid #e2e8f0",boxShadow:"0 8px 32px rgba(0,0,0,.08)",overflow:"hidden"}}>
                <div style={{padding:"12px 18px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:600,color:"#16a34a"}}>● ҚМЖ дайын</div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={copy} style={{padding:"6px 11px",borderRadius:9,border:"1.5px solid #e2e8f0",background:"white",fontSize:11,fontWeight:600,color:"#475569",cursor:"pointer",fontFamily:"inherit"}}>{copied?"✓ Көшірілді":"⎘ Көшіру"}</button>
                    <button onClick={()=>submit({preventDefault:()=>{}} as React.FormEvent)} style={{padding:"6px 11px",borderRadius:9,border:"1.5px solid #e2e8f0",background:"white",fontSize:11,fontWeight:600,color:"#475569",cursor:"pointer",fontFamily:"inherit"}}>↺ Қайта</button>
                    <button onClick={()=>window.print()} style={{padding:"6px 13px",borderRadius:9,border:"none",background:"linear-gradient(135deg,#2563eb,#4f46e5)",fontSize:11,fontWeight:600,color:"white",cursor:"pointer",fontFamily:"inherit"}}>↓ PDF</button>
                  </div>
                </div>
                <div id="pz" style={{overflowX:"auto",padding:"14px 16px"}}>
                  <div style={{minWidth:500}} dangerouslySetInnerHTML={{__html:html}}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
