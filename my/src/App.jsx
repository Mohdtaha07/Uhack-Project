import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["Overview", "Solution", "Technology", "Feasibility", "Impact", "Research"];

const techStack = [
  { label: "Frontend", items: ["React + TypeScript", "Redux", "Next.js", "Tailwind CSS", "Framer Motion", "jQuery"] },
  { label: "Backend", items: ["Node.js", "Python (FastAPI)", "Express.js", "REST API", "Socket.IO", "MongoDB", "Firebase"] },
  { label: "AI Brain (LLMs)", items: ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1"] },
  { label: "Orchestration", items: ["LangChain", "CrewAI", "Llama Index"] },
  { label: "Database", items: ["PostgreSQL", "Elasticsearch", "Redis", "OpenCV"] },
  { label: "Deployment", items: ["Docker", "Kubernetes", "GKE / EKS / On-prem"] },
];

const impacts = [
  { icon: "⚖️", color: "#00e5ff", label: "Social", title: "Educational Equity", desc: "Blind grading ensures a student's name, gender, or background never influences their grade." },
  { icon: "📈", color: "#a8ff78", label: "Economical", title: "Institutional Efficiency", desc: "Reclaiming 15+ hours/week per teacher — massive capacity boost without new hires." },
  { icon: "🌿", color: "#38ef7d", label: "Environmental", title: "Paperless Ecosystem", desc: "Digitizing the rubric-to-feedback cycle eliminates thousands of tons of paper waste." },
  { icon: "🎓", color: "#f7971e", label: "Pedagogical", title: "The 2-Sigma Shift", desc: "Moves classrooms toward a Mastery Learning model with iterative AI-coached drafts." },
];

const pipeline = [
  { step: "01", label: "Student Submission", color: "#00e5ff" },
  { step: "02", label: "AI First-Pass Engine", color: "#a78bfa" },
  { step: "03", label: "Bias-Check Overlay", color: "#f43f5e" },
  { step: "04", label: "Confidence Routing", color: "#f7971e" },
  { step: "05", label: "Persona Feedback", color: "#a8ff78" },
  { step: "06", label: "Teacher QA & Approval", color: "#38ef7d" },
  { step: "07", label: "Logic Trace Output", color: "#00e5ff" },
  { step: "08", label: "Final Grade & Feedback", color: "#ffd700" },
];

const feasibility = [
  { icon: "🔧", title: "Technical", desc: "Uses proven tools — OCR, AI, Blockchain. Fully open-source compatible." },
  { icon: "⏱️", title: "ROI on Teacher Time", desc: "Reclaims 15+ hours per week per teacher, freeing them for mentorship." },
  { icon: "☁️", title: "Scalability", desc: "Cloud infrastructure scales from a single classroom to an entire university." },
  { icon: "💰", title: "Affordable", desc: "Pilot cost around ₹50–₹100 per student annually." },
];

const references = [
  { tag: "Academic", title: "Zone of Proximal Development", author: "Vygotsky, 1978", desc: "Leveraging AI for scaffolded feedback meeting students at their current level." },
  { tag: "Industry", title: "Gradescope (Turnitin) Impact Study", author: "UC Berkeley", desc: "50% reduction in grading time across STEM departments with high inter-rater reliability." },
  { tag: "Literature", title: "The Efficacy of AI in Formative Assessment", author: "Journal of Educational Technology, 2023", desc: "LLMs correlate with human graders at high rates in structured rubrics." },
  { tag: "Ethics", title: "Data Privacy Compliance", author: "FERPA / GDPR / India AI Strategy", desc: "Frameworks for data sovereignty and privacy in educational environments." },
];

export default function App() {
  const [active, setActive] = useState("Overview");
  const [scrolled, setScrolled] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={styles.root}>
      {/* Background grid */}
      <div style={styles.gridBg} />
      {/* Glow orbs */}
      <div style={{ ...styles.orb, top: "10%", left: "5%", background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)" }} />
      <div style={{ ...styles.orb, top: "55%", right: "3%", background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)" }} />
      <div style={{ ...styles.orb, top: "80%", left: "30%", background: "radial-gradient(circle, rgba(248,113,113,0.12) 0%, transparent 70%)" }} />

      {/* NAV */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navLogo}>
          <span style={styles.navLogoIcon}>⬡</span>
          <span style={styles.navLogoText}>SENTINEL<span style={{ color: "#00e5ff" }}>-LOOP</span></span>
        </div>
        <div style={styles.navLinks}>
          {NAV_ITEMS.map((n) => (
            <button key={n} onClick={() => scrollTo(n)} style={{ ...styles.navLink, ...(active === n ? styles.navLinkActive : {}) }}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="Overview" style={styles.hero}>
        <div style={{ ...styles.heroContent, opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            UHack 4.0 · Team CODING WIZARDS · UHK04320
          </div>
          <h1 style={styles.heroTitle}>
            Sentinel<span style={{ color: "#00e5ff" }}>-Loop</span>
            <br />
            <span style={styles.heroTitleSub}>AI Grading System</span>
          </h1>
          <p style={styles.heroDesc}>
            A hybrid AI system that handles the cognitive drudgery of grading while empowering teachers as the final Quality Assurance editors.
          </p>
          <div style={styles.heroMeta}>
            <span style={styles.heroPill}>D10-S04</span>
            <span style={styles.heroPill}>Education & Learning Tech</span>
            <span style={styles.heroPill}>Software</span>
          </div>
          <div style={styles.heroStats}>
            {[["15+", "hrs/week saved"], ["₹50-100", "per student/year"], ["50%", "grading time cut"], ["2-Sigma", "learning shift"]].map(([val, lab]) => (
              <div key={lab} style={styles.heroStat}>
                <span style={styles.heroStatVal}>{val}</span>
                <span style={styles.heroStatLab}>{lab}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.heroVisual}>
          <PipelineOrb />
        </div>
      </section>

      {/* SOLUTION */}
      <section id="Solution" style={styles.section}>
        <SectionHeader tag="Proposed Solution" title="How Sentinel-Loop Works" accent="#00e5ff" />
        <div style={styles.solutionGrid}>
          {[
            { icon: "🔍", color: "#00e5ff", title: "First-Pass Engine", desc: "AI instantly scans submissions against a digital rubric — grammar, structure, factual accuracy — providing objective scoring at scale." },
            { icon: "🚦", color: "#a8ff78", title: "Confidence-Based Routing", desc: "Green Track: high-confidence grades auto-queued for teacher approval. Amber Track: ambiguous or creative responses flagged for human review." },
            { icon: "🗣️", color: "#a78bfa", title: "Persona-Driven Feedback", desc: "AI drafts personalized comments using the teacher's unique pedagogical voice, maintaining the critical student-teacher bond." },
            { icon: "🛡️", color: "#f43f5e", title: "Bias-Check Overlay", desc: "A secondary AI layer strips student names and identifiers during grading to ensure complete equity and eliminate unconscious bias." },
            { icon: "🔬", color: "#f7971e", title: "Logic Trace (Unique Hook)", desc: "Unlike black-box AI, every grade comes with a full explanation of why the score was suggested — teachers can override with one click." },
            { icon: "✅", color: "#ffd700", title: "Teacher QA & Approval", desc: "Teachers remain the final authority — AI is a powerful assistant, not a replacement, preserving professional educator judgment." },
          ].map((card) => (
            <SolutionCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* PIPELINE FLOW */}
      <section style={styles.pipelineSection}>
        <SectionHeader tag="Workflow" title="The Grading Pipeline" accent="#a78bfa" />
        <div style={styles.pipelineFlow}>
          {pipeline.map((p, i) => (
            <div key={p.step} style={styles.pipelineItem}>
              <div style={{ ...styles.pipelineCircle, borderColor: p.color, boxShadow: `0 0 18px ${p.color}55` }}>
                <span style={{ ...styles.pipelineStep, color: p.color }}>{p.step}</span>
              </div>
              <span style={styles.pipelineLabel}>{p.label}</span>
              {i < pipeline.length - 1 && <div style={styles.pipelineArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="Technology" style={styles.section}>
        <SectionHeader tag="Tech Stack" title="Technical Architecture" accent="#a78bfa" />
        <div style={styles.techGrid}>
          {techStack.map((t) => (
            <div key={t.label} style={styles.techCard}>
              <div style={styles.techCardHeader}>{t.label}</div>
              <div style={styles.techTags}>
                {t.items.map((item) => (
                  <span key={item} style={styles.techTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEASIBILITY */}
      <section id="Feasibility" style={styles.section}>
        <SectionHeader tag="Feasibility & Viability" title="Built to Last" accent="#38ef7d" />
        <div style={styles.feasGrid}>
          {feasibility.map((f) => (
            <div key={f.title} style={styles.feasCard}>
              <span style={styles.feasIcon}>{f.icon}</span>
              <h3 style={styles.feasTitle}>{f.title}</h3>
              <p style={styles.feasDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={styles.challengeBox}>
          <h3 style={styles.challengeTitle}>⚡ Challenges & Mitigation</h3>
          <div style={styles.challengeGrid}>
            <div style={styles.challengeItem}>
              <span style={styles.challengeLabel}>Poor Handwriting OCR</span>
              <span style={styles.challengeVal}>Continuous model training from Day 1 live data</span>
            </div>
            <div style={styles.challengeItem}>
              <span style={styles.challengeLabel}>API Cost at Scale</span>
              <span style={styles.challengeVal}>CoE Funding via Govt. of India ₹500 Cr AI in Education grant</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="Impact" style={styles.section}>
        <SectionHeader tag="Impact & Benefits" title="Transforming Education" accent="#f7971e" />
        <div style={styles.impactGrid}>
          {impacts.map((imp) => (
            <div key={imp.label} style={styles.impactCard}>
              <div style={{ ...styles.impactIcon, background: `${imp.color}22`, border: `1px solid ${imp.color}55` }}>{imp.icon}</div>
              <span style={{ ...styles.impactTag, color: imp.color }}>{imp.label}</span>
              <h3 style={styles.impactTitle}>{imp.title}</h3>
              <p style={styles.impactDesc}>{imp.desc}</p>
            </div>
          ))}
        </div>
        <div style={styles.audienceRow}>
          <div style={styles.audienceCard}>
            <h3 style={{ color: "#00e5ff", marginBottom: 10 }}>👩‍🏫 For Educators</h3>
            <p style={styles.audienceText}>Cognitive offloading removes the drudgery of checking grammar and basic facts, letting teachers focus on high-order mentorship and critical thinking development.</p>
          </div>
          <div style={styles.audienceCard}>
            <h3 style={{ color: "#a8ff78", marginBottom: 10 }}>📚 For Students</h3>
            <p style={styles.audienceText}>Eliminates "feedback lag." Traditional systems deliver feedback 7–10 days later. Sentinel-Loop provides feedback while concepts are still fresh, drastically boosting retention.</p>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="Research" style={styles.section}>
        <SectionHeader tag="Research & References" title="Evidence-Based Foundation" accent="#ffd700" />
        <div style={styles.refGrid}>
          {references.map((r) => (
            <div key={r.title} style={styles.refCard}>
              <span style={styles.refTag}>{r.tag}</span>
              <h3 style={styles.refTitle}>{r.title}</h3>
              <span style={styles.refAuthor}>{r.author}</span>
              <p style={styles.refDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div style={styles.comparisonNote}>
          <span style={styles.compBadge}>📊</span>
          <p style={styles.compText}>In competitive analysis, Sentinel-Loop outperforms Manual Grading, Basic LMS Tools, and standalone AI orchestration systems across Efficiency, Feedback Quality, Bias Detection, Integration, and Cost-Effectiveness dimensions.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>⬡ SENTINEL-LOOP</div>
        <p style={styles.footerSub}>Team CODING WIZARDS · UHK04320 · UHack 4.0 · Problem D10-S04</p>
        <p style={styles.footerSub2}>AI-driven grading and feedback systems · Education & Learning Technology</p>
      </footer>
    </div>
  );
}

function SectionHeader({ tag, title, accent }) {
  return (
    <div style={styles.sectionHeader}>
      <span style={{ ...styles.sectionTag, color: accent, borderColor: `${accent}44`, background: `${accent}11` }}>{tag}</span>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={{ ...styles.sectionLine, background: accent }} />
    </div>
  );
}

function SolutionCard({ icon, color, title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ ...styles.solCard, ...(hover ? { ...styles.solCardHover, borderColor: color, boxShadow: `0 0 30px ${color}33` } : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ ...styles.solIcon, background: `${color}22`, color }}>{icon}</div>
      <h3 style={{ ...styles.solTitle, color: hover ? color : "#e2e8f0" }}>{title}</h3>
      <p style={styles.solDesc}>{desc}</p>
    </div>
  );
}

function PipelineOrb() {
  return (
    <div style={styles.orbContainer}>
      <div style={styles.orbRing1} />
      <div style={styles.orbRing2} />
      <div style={styles.orbRing3} />
      <div style={styles.orbCore}>
        <span style={styles.orbCoreIcon}>⬡</span>
        <span style={styles.orbCoreText}>AI</span>
      </div>
      {[
        { angle: 0, label: "Scan", icon: "🔍", color: "#00e5ff" },
        { angle: 45, label: "Route", icon: "🚦", color: "#a8ff78" },
        { angle: 90, label: "Bias", icon: "🛡️", color: "#f43f5e" },
        { angle: 135, label: "Voice", icon: "🗣️", color: "#a78bfa" },
        { angle: 180, label: "Trace", icon: "🔬", color: "#f7971e" },
        { angle: 225, label: "QA", icon: "✅", color: "#ffd700" },
        { angle: 270, label: "Grade", icon: "📊", color: "#38ef7d" },
        { angle: 315, label: "Loop", icon: "🔄", color: "#00e5ff" },
      ].map(({ angle, label, icon, color }) => {
        const rad = (angle * Math.PI) / 180;
        const r = 120;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <div key={label} style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${color}22`, border: `1px solid ${color}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: `0 0 10px ${color}44` }}>{icon}</div>
            <span style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: 1 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Syne', 'Space Grotesk', sans-serif",
    background: "#060b14",
    color: "#c8d6e5",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  gridBg: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
    backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  orb: { position: "fixed", width: 500, height: 500, borderRadius: "50%", pointerEvents: "none", zIndex: 0 },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 48px", transition: "all 0.3s ease",
  },
  navScrolled: { background: "rgba(6,11,20,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,229,255,0.1)" },
  navLogo: { display: "flex", alignItems: "center", gap: 10 },
  navLogoIcon: { fontSize: 24, color: "#00e5ff", filter: "drop-shadow(0 0 6px #00e5ff)" },
  navLogoText: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: 3, color: "#e2e8f0" },
  navLinks: { display: "flex", gap: 4 },
  navLink: { background: "none", border: "none", color: "#94a3b8", fontSize: 13, letterSpacing: 1.5, fontWeight: 600, cursor: "pointer", padding: "8px 16px", borderRadius: 6, transition: "all 0.2s", fontFamily: "inherit" },
  navLinkActive: { color: "#00e5ff", background: "rgba(0,229,255,0.08)" },

  hero: {
    position: "relative", zIndex: 1,
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "120px 64px 80px",
    gap: 48,
  },
  heroContent: { flex: 1, maxWidth: 600 },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 100, padding: "6px 16px", fontSize: 11, color: "#00e5ff", letterSpacing: 1.5, fontWeight: 700, marginBottom: 28, textTransform: "uppercase" },
  heroBadgeDot: { width: 6, height: 6, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 8px #00e5ff", animation: "pulse 2s infinite" },
  heroTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05, color: "#f1f5f9", marginBottom: 20, letterSpacing: -1 },
  heroTitleSub: { fontWeight: 400, fontSize: "0.55em", color: "#94a3b8", letterSpacing: 4, textTransform: "uppercase" },
  heroDesc: { fontSize: 17, color: "#94a3b8", lineHeight: 1.7, marginBottom: 32, maxWidth: 520 },
  heroMeta: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 },
  heroPill: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "5px 14px", fontSize: 12, color: "#94a3b8", letterSpacing: 1 },
  heroStats: { display: "flex", gap: 32, flexWrap: "wrap" },
  heroStat: { display: "flex", flexDirection: "column" },
  heroStatVal: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: "#00e5ff", lineHeight: 1 },
  heroStatLab: { fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 },
  heroVisual: { flex: "0 0 300px", display: "flex", alignItems: "center", justifyContent: "center" },

  orbContainer: { position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" },
  orbRing1: { position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(0,229,255,0.15)", animation: "spin 20s linear infinite" },
  orbRing2: { position: "absolute", width: 210, height: 210, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.15)", animation: "spin 15s linear infinite reverse" },
  orbRing3: { position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(248,113,113,0.15)" },
  orbCore: { position: "absolute", width: 64, height: 64, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.3) 0%, rgba(0,229,255,0.05) 70%)", border: "2px solid #00e5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(0,229,255,0.4)" },
  orbCoreIcon: { fontSize: 18, color: "#00e5ff" },
  orbCoreText: { fontSize: 10, fontWeight: 800, color: "#00e5ff", letterSpacing: 2 },

  section: { position: "relative", zIndex: 1, padding: "100px 64px", maxWidth: 1200, margin: "0 auto" },
  sectionHeader: { textAlign: "center", marginBottom: 60 },
  sectionTag: { display: "inline-block", border: "1px solid", borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
  sectionTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3vw, 44px)", color: "#f1f5f9", margin: "0 auto 16px", letterSpacing: -0.5 },
  sectionLine: { width: 48, height: 3, borderRadius: 2, margin: "0 auto" },

  solutionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 },
  solCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px", transition: "all 0.3s ease", cursor: "default" },
  solCardHover: { background: "rgba(255,255,255,0.05)", transform: "translateY(-4px)" },
  solIcon: { width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 },
  solTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 10, transition: "color 0.3s" },
  solDesc: { fontSize: 14, color: "#64748b", lineHeight: 1.7 },

  pipelineSection: { position: "relative", zIndex: 1, padding: "80px 64px", background: "rgba(0,229,255,0.02)", borderTop: "1px solid rgba(0,229,255,0.08)", borderBottom: "1px solid rgba(0,229,255,0.08)" },
  pipelineFlow: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 0, marginTop: 40 },
  pipelineItem: { display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 8px" },
  pipelineCircle: { width: 64, height: 64, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", marginBottom: 8 },
  pipelineStep: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15 },
  pipelineLabel: { fontSize: 11, color: "#64748b", letterSpacing: 0.5, textAlign: "center", maxWidth: 80 },
  pipelineArrow: { position: "absolute", right: -12, top: 20, fontSize: 20, color: "rgba(100,116,139,0.4)", fontWeight: 300 },

  techGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  techCard: { background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 14, padding: "24px 20px" },
  techCardHeader: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#a78bfa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 },
  techTags: { display: "flex", flexWrap: "wrap", gap: 8 },
  techTag: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#94a3b8" },

  feasGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 32 },
  feasCard: { background: "rgba(56,239,125,0.04)", border: "1px solid rgba(56,239,125,0.12)", borderRadius: 14, padding: "24px 20px", textAlign: "center" },
  feasIcon: { fontSize: 32, marginBottom: 12, display: "block" },
  feasTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#38ef7d", marginBottom: 8 },
  feasDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6 },
  challengeBox: { background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)", borderRadius: 14, padding: "28px 32px" },
  challengeTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#f43f5e", marginBottom: 20 },
  challengeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  challengeItem: { display: "flex", flexDirection: "column", gap: 6 },
  challengeLabel: { fontSize: 12, fontWeight: 700, color: "#f43f5e", textTransform: "uppercase", letterSpacing: 1 },
  challengeVal: { fontSize: 14, color: "#94a3b8", lineHeight: 1.6 },

  impactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 32 },
  impactCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 20px" },
  impactIcon: { width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 },
  impactTag: { fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, display: "block" },
  impactTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#e2e8f0", marginBottom: 10 },
  impactDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.7 },
  audienceRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  audienceCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 24px" },
  audienceText: { fontSize: 14, color: "#64748b", lineHeight: 1.7 },

  refGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32 },
  refCard: { background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.12)", borderRadius: 14, padding: "24px 20px" },
  refTag: { display: "inline-block", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 100, padding: "3px 12px", fontSize: 10, color: "#ffd700", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
  refTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#e2e8f0", marginBottom: 6 },
  refAuthor: { fontSize: 12, color: "#ffd700", fontWeight: 600, marginBottom: 10, display: "block" },
  refDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6 },
  comparisonNote: { display: "flex", gap: 16, alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px" },
  compBadge: { fontSize: 28, flexShrink: 0 },
  compText: { fontSize: 14, color: "#94a3b8", lineHeight: 1.7 },

  footer: { position: "relative", zIndex: 1, textAlign: "center", padding: "60px 32px", borderTop: "1px solid rgba(0,229,255,0.08)", background: "rgba(0,229,255,0.02)" },
  footerLogo: { fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: 4, color: "#00e5ff", marginBottom: 12, textShadow: "0 0 20px rgba(0,229,255,0.5)" },
  footerSub: { fontSize: 13, color: "#475569", marginBottom: 4 },
  footerSub2: { fontSize: 12, color: "#334155" },
};

// Inject Google Fonts + keyframes
const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&display=swap');
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #060b14; }
  ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); border-radius: 3px; }
`;
document.head.appendChild(styleEl);
