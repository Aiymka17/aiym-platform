"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const modules = [
    { icon:"📋", title:"ҚМЖ жасау", desc:"130-бұйрыққа сай жоспар", href:"/kmzh", active:true, color:"#2563eb" },
    { icon:"📝", title:"БЖБ / ТЖБ", desc:"Жиынтық бағалау", href:"/bjb", active:true, color:"#7c3aed" },
    { icon:"🎯", title:"Дескриптор", desc:"Критерийлер мен рубрика", href:"/deskr", active:true, color:"#0891b2" },
    { icon:"🗣️", title:"Айтылым / Оқылым", desc:"Тіл дағдысы тапсырмалары", href:"/skill", active:true, color:"#059669" },
    { icon:"🏫", title:"Сынып жетекші", desc:"Жоспар, хаттама, мінездеме", href:"/classt", active:true, color:"#d97706" },
    { icon:"♿", title:"Инклюзия", desc:"ЕБҚ оқушыларға материал", href:"/inclus", active:true, color:"#db2777" },
    { icon:"💬", title:"AI Чат", desc:"Педагогикалық кеңесші", href:"/chat", active:true, color:"#4f46e5" },
    { icon:"🛠️", title:"ЖИ Құралдар", desc:"5 арнайы AI құрал", href:"/tools", active:true, color:"#0f766e" },
  ];

  const faqs = [
    { q:"AIYM AI қалай жұмыс істейді?", a:"Claude AI негізінде жасалған. 130-бұйрық талаптарына сай 30–60 секундта кәсіби педагогикалық құжат жасайды." },
    { q:"API key қайдан аламын?", a:"console.anthropic.com сайтынан тіркеліп API key жасауға болады. Жаңа тіркелгіге тегін $5 кредит беріледі." },
    { q:"Барлық модульдер жұмыс істей ме?", a:"Иә! ҚМЖ, БЖБ/ТЖБ, Дескриптор, Айтылым, Сынып жетекші, Инклюзия, AI Чат және 5 ЖИ Құрал — барлығы толық жұмыс істейді." },
    { q:"Жасалған құжаттарды жүктеуге болады ма?", a:"Иә, PDF форматында баспаға жіберуге немесе мәтінді тікелей көшіруге болады." },
  ];

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", minHeight:"100vh", background:"white" }}>
      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 2rem", background: scrolled?"rgba(255,255,255,.95)":"transparent", backdropFilter: scrolled?"blur(20px)":"none", borderBottom: scrolled?"1px solid #f1f5f9":"none", transition:"all .3s" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#2563eb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:12 }}>AI</div>
          <span style={{ fontWeight:800, fontSize:17, color:"#0f172a" }}>AIYM <span style={{ color:"#2563eb" }}>AI</span></span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Link href="/kmzh" style={{ padding:"9px 20px", borderRadius:99, background:"linear-gradient(135deg,#2563eb,#4f46e5)", color:"white", fontWeight:700, fontSize:14, textDecoration:"none" }}>
            Тегін бастау →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 35%,#1d4ed8 65%,#4f46e5 85%,#7c3aed 100%)", minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:64 }}>
        <div style={{ position:"absolute", top:-160, right:-100, width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(96,165,250,.2),transparent 70%)", filter:"blur(60px)" }}/>
        <div style={{ position:"absolute", bottom:-120, left:-80, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,.2),transparent 70%)", filter:"blur(60px)" }}/>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"72px 2rem", width:"100%", position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", borderRadius:99, padding:"6px 16px", color:"rgba(255,255,255,.9)", fontSize:12, fontWeight:500, marginBottom:24 }}>
            <span style={{ width:8, height:8, background:"#34d399", borderRadius:"50%", display:"inline-block" }}/>
            Қазақстан мұғалімдері үшін · 8 AI модуль
          </div>
          <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:900, color:"white", lineHeight:1.1, letterSpacing:"-1.5px", marginBottom:20, maxWidth:700 }}>
            Мұғалімнің{" "}
            <span style={{ background:"linear-gradient(90deg,#93c5fd,#c4b5fd)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              интеллектуалды
            </span>{" "}
            көмекшісі
          </h1>
          <p style={{ color:"rgba(255,255,255,.72)", fontSize:18, lineHeight:1.75, marginBottom:36, maxWidth:520 }}>
            ҚМЖ, БЖБ/ТЖБ, дескриптор, айтылым, сынып жетекші, инклюзия — бәрін AI секундтарда дайындайды.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:56 }}>
            <Link href="/kmzh" style={{ padding:"15px 32px", borderRadius:99, background:"white", color:"#1d4ed8", fontWeight:700, fontSize:15, textDecoration:"none", boxShadow:"0 6px 28px rgba(0,0,0,.22)" }}>
              🚀 ҚМЖ жасап көру
            </Link>
            <Link href="/tools" style={{ padding:"15px 32px", borderRadius:99, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.25)", color:"white", fontWeight:600, fontSize:15, textDecoration:"none" }}>
              🛠️ ЖИ Құралдар
            </Link>
          </div>
          <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
            {[{v:"500+",l:"Мұғалім"},{v:"10К+",l:"Құжат"},{v:"8",l:"AI модуль"},{v:"4.9★",l:"Баға"}].map((s,i)=>(
              <div key={i}>
                <div style={{ fontSize:26, fontWeight:900, color:"white", lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section style={{ padding:"80px 2rem", background:"#f8fafc" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#0f172a", letterSpacing:-1, marginBottom:12 }}>
              Барлық AI мүмкіндіктер
            </h2>
            <p style={{ color:"#64748b", fontSize:16, maxWidth:480, margin:"0 auto" }}>
              8 толық жұмыс істейтін AI модуль — тіркелу қажет емес
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
            {modules.map((m,i)=>(
              <Link key={i} href={m.href} style={{ textDecoration:"none" }}>
                <div style={{ background:"white", borderRadius:18, padding:22, border:"1px solid #f1f5f9", boxShadow:"0 2px 8px rgba(0,0,0,.05)", transition:"all .25s", cursor:"pointer" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 12px 36px rgba(0,0,0,.1)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="none";(e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 8px rgba(0,0,0,.05)";}}>
                  <div style={{ width:48, height:48, borderRadius:13, background:m.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>{m.icon}</div>
                  <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:6 }}>{m.title}</div>
                  <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6, marginBottom:12 }}>{m.desc}</div>
                  <div style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:99, background:"#f0fdf4", color:"#16a34a", display:"inline-block" }}>✓ Жұмыс істейді</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding:"60px 2rem", background:"white" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
          {[{i:"👨‍🏫",v:"500+",l:"Белсенді мұғалім"},{i:"📄",v:"10,000+",l:"Жасалған құжат"},{i:"🛠️",v:"8",l:"AI мүмкіндік"},{i:"📋",v:"130",l:"Бұйрыққа сай"}].map((s,j)=>(
            <div key={j} style={{ background:"#f8fafc", borderRadius:18, padding:"28px 20px", textAlign:"center" }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{s.i}</div>
              <div style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:6 }}>{s.v}</div>
              <div style={{ fontSize:13, color:"#94a3b8" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:"80px 2rem", background:"#f8fafc" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#0f172a", letterSpacing:-1, textAlign:"center", marginBottom:48 }}>
            Жиі қойылатын сұрақтар
          </h2>
          {faqs.map((faq,i)=>(
            <div key={i} style={{ borderBottom:"1px solid #e2e8f0" }}>
              <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} style={{ width:"100%", textAlign:"left", padding:"18px 0", display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", fontSize:15, fontWeight:600, color:"#1e293b", fontFamily:"inherit" }}>
                <span>{faq.q}</span>
                <span style={{ fontSize:18, color:"#94a3b8", transform:faqOpen===i?"rotate(180deg)":"none", transition:".3s", flexShrink:0 }}>▾</span>
              </button>
              {faqOpen===i&&<div style={{ paddingBottom:18, fontSize:14, color:"#64748b", lineHeight:1.75 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"80px 2rem", background:"linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)", textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, color:"white", letterSpacing:-1, marginBottom:14 }}>Бүгін бастаңыз — тегін</h2>
        <p style={{ color:"rgba(255,255,255,.75)", fontSize:17, marginBottom:36 }}>500+ мұғалімге қосылыңыз.</p>
        <Link href="/kmzh" style={{ padding:"15px 40px", borderRadius:99, background:"white", color:"#1d4ed8", fontWeight:700, fontSize:15, textDecoration:"none", boxShadow:"0 6px 28px rgba(0,0,0,.2)" }}>
          🚀 Бастау
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0f172a", color:"white", padding:"48px 2rem 28px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:20, paddingBottom:32, borderBottom:"1px solid rgba(255,255,255,.08)" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,#2563eb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:12 }}>AI</div>
              <span style={{ fontWeight:800, fontSize:16 }}>AIYM AI</span>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.4)", maxWidth:260, lineHeight:1.7 }}>Мұғалімнің интеллектуалды көмекшісі.</p>
          </div>
          <div style={{ display:"flex", gap:40 }}>
            {[{t:"Модульдер",l:["ҚМЖ жасау","БЖБ/ТЖБ","Дескриптор","Инклюзия"]},{t:"ЖИ Құралдар",l:["Мәтін қысқарту","Сұрақ жасаушы","Хат жазушы","Сабақ идеялары"]}].map(col=>(
              <div key={col.t}>
                <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:"rgba(255,255,255,.3)", marginBottom:14 }}>{col.t}</div>
                {col.l.map(l=><div key={l} style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:10 }}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth:1100, margin:"24px auto 0", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,.25)" }}>© 2025 AIYM AI. Барлық құқықтар қорғалған.</span>
          <span style={{ fontSize:12, color:"rgba(255,255,255,.25)" }}>Қазақстанда жасалған ♥ мұғалімдер үшін</span>
        </div>
      </footer>
    </div>
  );
}
