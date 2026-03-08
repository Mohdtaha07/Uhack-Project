import { useState, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   SENTINEL-LOOP — MERGED APP (Public Frontend + Teacher Dashboard)
   ═══════════════════════════════════════════════════════════════ */

/* ─── SHARED FONTS ─────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');`;

/* ─── FRONTEND DESIGN TOKENS ───────────────────────────────────── */
const FE = {
  bg: "#0a0d14", surface: "#111827", card: "#141c2e", border: "#1e2d4a",
  accent: "#00d4ff", accentGlow: "#00d4ff33", gold: "#f5c842",
  green: "#00ff88", amber: "#ffb347", red: "#ff4757",
  text: "#e8edf5", muted: "#7a8aaa",
};

/* ─── BACKEND DESIGN TOKENS ────────────────────────────────────── */
const BE = {
  bg: "#07090f", sidebar: "#0c0f1a", surface: "#0f1420", card: "#131927",
  border: "#1c2740", borderLt: "#243050",
  accent: "#3b82f6", accentLt: "rgba(59,130,246,0.12)", accentGl: "rgba(59,130,246,0.25)",
  green: "#10b981", greenLt: "rgba(16,185,129,0.12)",
  amber: "#f59e0b", amberLt: "rgba(245,158,11,0.12)",
  red: "#ef4444", redLt: "rgba(239,68,68,0.12)",
  purple: "#8b5cf6", purpleLt: "rgba(139,92,246,0.12)",
  text: "#e2e8f5", muted: "#64748b", subtle: "#334155",
};

/* ─── GLOBAL STYLES ─────────────────────────────────────────────── */
const globalCss = `
${FONTS}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { width: 100%; height: 100%; min-height: 100%; overflow: hidden; }
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: ${FE.border}; border-radius: 4px; }

/* ── VIEW TRANSITION ── */
.view-enter { animation: fadeSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }
@keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }

/* ═══════════ FRONTEND STYLES ═══════════ */
.fe-root {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: radial-gradient(ellipse at 20% 10%, #0d1f3c 0%, ${FE.bg} 50%),
              radial-gradient(ellipse at 80% 80%, #001a2e 0%, transparent 60%);
  color: ${FE.text};
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 0; left: 0;
}
.fe-grid-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
.fe-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }

/* NAV */
.fe-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0; border-bottom: 1px solid ${FE.border}; margin-bottom: 60px;
}
.fe-nav-logo {
  font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
  background: linear-gradient(135deg, ${FE.accent}, ${FE.green});
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.fe-nav-badge {
  font-family: 'DM Mono', monospace; font-size: 11px; color: ${FE.muted};
  border: 1px solid ${FE.border}; padding: 4px 10px; border-radius: 20px; letter-spacing: 1px;
}
.fe-nav-links { display: flex; gap: 24px; align-items: center; }
.fe-nav-link {
  font-size: 13px; color: ${FE.muted}; cursor: pointer;
  text-decoration: none; letter-spacing: 0.3px; transition: color 0.2s;
}
.fe-nav-link:hover { color: ${FE.accent}; }
.fe-dashboard-btn {
  background: linear-gradient(135deg, ${FE.accent}, #0096cc);
  color: #000; font-weight: 700; padding: 8px 18px; border-radius: 8px;
  border: none; cursor: pointer; font-size: 12px; letter-spacing: 0.3px;
  font-family: 'Syne', sans-serif;
  box-shadow: 0 0 18px ${FE.accentGlow};
  transition: all 0.2s; white-space: nowrap;
}
.fe-dashboard-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 28px ${FE.accentGlow}; }

/* HERO */
.fe-hero { text-align: center; padding: 20px 0 80px; }
.fe-hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px;
  color: ${FE.accent}; border: 1px solid ${FE.accentGlow};
  background: ${FE.accentGlow}; padding: 6px 16px; border-radius: 20px;
  margin-bottom: 28px; text-transform: uppercase;
}
.fe-hero-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: ${FE.accent}; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
.fe-hero-title {
  font-family: 'Syne', sans-serif; font-size: clamp(48px, 8vw, 88px);
  font-weight: 800; line-height: 0.95; letter-spacing: -3px; margin-bottom: 28px;
}
.fe-hero-title-l1 { display: block; color: ${FE.text}; }
.fe-hero-title-l2 {
  display: block;
  background: linear-gradient(135deg, ${FE.accent} 0%, ${FE.green} 60%, ${FE.gold} 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.fe-hero-sub {
  max-width: 600px; margin: 0 auto 48px; line-height: 1.7;
  color: ${FE.muted}; font-size: 16px; font-weight: 300;
}
.fe-hero-cta { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.fe-btn-primary {
  background: linear-gradient(135deg, ${FE.accent}, #0096cc);
  color: #000; font-weight: 600; padding: 14px 32px; border-radius: 8px;
  border: none; cursor: pointer; font-size: 14px;
  transition: all 0.2s; font-family: 'Syne', sans-serif;
  box-shadow: 0 0 24px ${FE.accentGlow};
}
.fe-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 32px ${FE.accentGlow}; }
.fe-btn-ghost {
  background: transparent; color: ${FE.text}; border: 1px solid ${FE.border};
  padding: 14px 32px; border-radius: 8px; cursor: pointer; font-size: 14px;
  transition: all 0.2s; font-family: 'Syne', sans-serif; font-weight: 600;
}
.fe-btn-ghost:hover { border-color: ${FE.accent}; color: ${FE.accent}; }

.fe-stats-bar {
  display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
  margin-top: 64px; padding-top: 40px; border-top: 1px solid ${FE.border};
}
.fe-stat { text-align: center; }
.fe-stat-val {
  font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
  background: linear-gradient(135deg, ${FE.accent}, ${FE.green});
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.fe-stat-label { font-size: 12px; color: ${FE.muted}; margin-top: 4px; letter-spacing: 0.5px; }

/* SECTIONS */
.fe-section { margin-bottom: 80px; }
.fe-section-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 40px; }
.fe-section-num { font-family: 'DM Mono', monospace; font-size: 11px; color: ${FE.accent}; letter-spacing: 2px; opacity: 0.7; }
.fe-section-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
.fe-section-line { flex: 1; height: 1px; background: linear-gradient(90deg, ${FE.border}, transparent); }

/* CARDS */
.fe-grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.fe-card {
  background: ${FE.card}; border: 1px solid ${FE.border}; border-radius: 16px; padding: 28px;
  transition: all 0.3s; position: relative; overflow: hidden;
}
.fe-card::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, ${FE.accentGlow} 0%, transparent 60%);
  opacity: 0; transition: opacity 0.3s;
}
.fe-card:hover { border-color: ${FE.accent}; transform: translateY(-4px); }
.fe-card:hover::before { opacity: 1; }
.fe-card-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
.fe-icon-blue { background: rgba(0,212,255,0.1); }
.fe-icon-green { background: rgba(0,255,136,0.1); }
.fe-icon-gold { background: rgba(245,200,66,0.1); }
.fe-icon-red { background: rgba(255,71,87,0.1); }
.fe-card-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 10px; color: ${FE.text}; }
.fe-card-text { font-size: 13px; color: ${FE.muted}; line-height: 1.65; }

/* PIPELINE */
.fe-pipeline {
  background: ${FE.card}; border: 1px solid ${FE.border}; border-radius: 16px;
  padding: 32px; display: flex; align-items: stretch; gap: 0; overflow-x: auto;
}
.fe-pipeline-step {
  flex: 1; min-width: 140px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  position: relative; padding: 0 12px;
}
.fe-pipeline-step:not(:last-child)::after {
  content: '→'; position: absolute; right: -12px; top: 28px;
  color: ${FE.accent}; font-size: 18px; opacity: 0.5;
}
.fe-pipeline-dot {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 700; border: 2px solid;
  font-family: 'DM Mono', monospace;
}
.fe-dot-blue { border-color: ${FE.accent}; background: rgba(0,212,255,0.1); color: ${FE.accent}; }
.fe-dot-amber { border-color: ${FE.amber}; background: rgba(255,179,71,0.1); color: ${FE.amber}; }
.fe-dot-green { border-color: ${FE.green}; background: rgba(0,255,136,0.1); color: ${FE.green}; }
.fe-dot-gold { border-color: ${FE.gold}; background: rgba(245,200,66,0.1); color: ${FE.gold}; }
.fe-pipeline-label { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: ${FE.text}; text-align: center; line-height: 1.3; }
.fe-pipeline-sub { font-size: 11px; color: ${FE.muted}; text-align: center; line-height: 1.4; }

/* TRACKS */
.fe-tracks { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
.fe-track { padding: 8px 18px; border-radius: 20px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px; }
.fe-track-green { background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.3); color: ${FE.green}; }
.fe-track-amber { background: rgba(255,179,71,0.1); border: 1px solid rgba(255,179,71,0.3); color: ${FE.amber}; }

/* TECH STACK */
.fe-tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.fe-tech-group { background: ${FE.card}; border: 1px solid ${FE.border}; border-radius: 12px; padding: 20px; }
.fe-tech-group-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 2px; color: ${FE.accent}; text-transform: uppercase; margin-bottom: 14px; }
.fe-tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.fe-tech-tag {
  font-size: 11px; padding: 4px 10px; border-radius: 6px;
  background: rgba(255,255,255,0.04); border: 1px solid ${FE.border};
  color: ${FE.muted}; font-family: 'DM Mono', monospace; transition: all 0.2s;
}
.fe-tech-tag:hover { border-color: ${FE.accent}; color: ${FE.accent}; }

/* UPLOAD */
.fe-upload-zone {
  background: ${FE.card}; border: 2px dashed ${FE.border}; border-radius: 20px;
  padding: 60px 40px; text-align: center; cursor: pointer; transition: all 0.3s;
}
.fe-upload-zone:hover, .fe-upload-zone.drag-over { border-color: ${FE.accent}; background: rgba(0,212,255,0.03); }
.fe-upload-zone.has-file { border-style: solid; border-color: ${FE.green}; }
.fe-upload-icon { font-size: 48px; margin-bottom: 16px; }
.fe-upload-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; color: ${FE.text}; }
.fe-upload-sub { font-size: 13px; color: ${FE.muted}; line-height: 1.6; }
.fe-upload-types { display: flex; gap: 8px; justify-content: center; margin-top: 20px; flex-wrap: wrap; }
.fe-upload-type-tag { font-size: 11px; padding: 4px 12px; border-radius: 20px; background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); color: ${FE.accent}; font-family: 'DM Mono', monospace; }
.fe-upload-zone input[type=file], .be-upload-zone input[type=file] { display: none; }
.fe-file-preview {
  display: flex; align-items: center; gap: 16px; text-align: left;
  background: rgba(0,255,136,0.05); border: 1px solid rgba(0,255,136,0.2);
  border-radius: 12px; padding: 16px 20px; margin-top: 16px;
}
.fe-file-name { font-family: 'DM Mono', monospace; font-size: 13px; color: ${FE.text}; }
.fe-file-size { font-size: 11px; color: ${FE.muted}; margin-top: 2px; }
.fe-file-remove {
  margin-left: auto; background: rgba(255,71,87,0.1); border: 1px solid rgba(255,71,87,0.2);
  color: ${FE.red}; width: 28px; height: 28px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px;
  transition: all 0.2s; flex-shrink: 0;
}
.fe-file-remove:hover { background: rgba(255,71,87,0.2); }
.fe-img-preview { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid ${FE.border}; display: inline-block; max-width: 100%; margin-top: 16px; }
.fe-img-preview img { max-width: 100%; max-height: 200px; display: block; }

/* RUBRIC FORM */
.fe-rubric-form { background: ${FE.card}; border: 1px solid ${FE.border}; border-radius: 16px; padding: 32px; }
.fe-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
@media(max-width:600px){ .fe-form-row { grid-template-columns: 1fr; } }
.fe-form-group { display: flex; flex-direction: column; gap: 8px; }
.fe-form-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 1px; color: ${FE.muted}; text-transform: uppercase; }
.fe-form-input, .fe-form-select, .fe-form-textarea {
  background: ${FE.surface}; border: 1px solid ${FE.border}; border-radius: 8px;
  padding: 10px 14px; color: ${FE.text}; font-family: 'Inter', sans-serif; font-size: 14px;
  transition: border-color 0.2s; outline: none;
}
.fe-form-input:focus, .fe-form-select:focus, .fe-form-textarea:focus { border-color: ${FE.accent}; }
.fe-form-textarea { resize: vertical; min-height: 100px; }
.fe-form-select option { background: ${FE.surface}; }

/* BENEFIT CARDS */
.fe-benefit-card {
  background: ${FE.card}; border: 1px solid ${FE.border}; border-radius: 12px;
  padding: 24px; border-left: 3px solid; transition: transform 0.2s;
}
.fe-benefit-card:hover { transform: translateX(4px); }
.fe-bc-blue { border-left-color: ${FE.accent}; }
.fe-bc-green { border-left-color: ${FE.green}; }
.fe-bc-gold { border-left-color: ${FE.gold}; }
.fe-bc-amber { border-left-color: ${FE.amber}; }
.fe-benefit-category { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
.fe-benefit-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.fe-benefit-text { font-size: 13px; color: ${FE.muted}; line-height: 1.6; }

/* COMPARE TABLE */
.fe-table-wrap { background: ${FE.card}; border: 1px solid ${FE.border}; border-radius: 16px; overflow: hidden; overflow-x: auto; }
.fe-compare-table { width: 100%; border-collapse: collapse; }
.fe-compare-table th { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; padding: 14px 16px; text-align: left; background: ${FE.surface}; color: ${FE.muted}; border-bottom: 1px solid ${FE.border}; letter-spacing: 0.5px; }
.fe-compare-table th:last-child { color: ${FE.accent}; }
.fe-compare-table td { padding: 13px 16px; font-size: 13px; border-bottom: 1px solid rgba(30,45,74,0.5); vertical-align: middle; }
.fe-compare-table tr:hover td { background: rgba(0,212,255,0.02); }

/* RESULT BOX */
.fe-result-box {
  background: rgba(0,255,136,0.05); border: 1px solid rgba(0,255,136,0.2);
  border-radius: 16px; padding: 32px; text-align: center; margin-top: 24px;
}
.fe-result-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: ${FE.green}; margin-bottom: 10px; }
.fe-result-text { font-size: 14px; color: ${FE.muted}; line-height: 1.6; }

/* FOOTER */
.fe-footer { text-align: center; padding: 40px 0; border-top: 1px solid ${FE.border}; font-family: 'DM Mono', monospace; font-size: 11px; color: ${FE.muted}; letter-spacing: 1px; }

/* ════════════════════════════════════════
   DASHBOARD STYLES
   ════════════════════════════════════════ */
.be-root { display:flex; width:100vw; height:100vh; overflow:hidden; position:fixed; top:0; left:0; background:${BE.bg}; color:${BE.text}; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; }

/* SIDEBAR */
.be-sidebar { width:240px; min-width:240px; height:100vh; background:${BE.sidebar}; border-right:1px solid ${BE.border}; display:flex; flex-direction:column; overflow-y:auto; overflow-x:hidden; z-index:10; }
.be-sidebar-logo { padding:20px 20px 0; display:flex; align-items:center; gap:10px; margin-bottom:28px; }
.be-logo-mark { width:34px; height:34px; border-radius:8px; background:linear-gradient(135deg,${BE.accent},#1d4ed8); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#fff; font-family:'JetBrains Mono',monospace; flex-shrink:0; box-shadow:0 0 16px ${BE.accentGl}; }
.be-logo-text { font-size:13px; font-weight:700; letter-spacing:-0.3px; line-height:1.3; }
.be-logo-sub { font-size:10px; color:${BE.muted}; font-family:'JetBrains Mono',monospace; letter-spacing:1px; }
.be-nav-section { padding:0 12px; margin-bottom:8px; }
.be-nav-section-label { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:${BE.muted}; padding:0 8px; margin-bottom:4px; font-family:'JetBrains Mono',monospace; }
.be-nav-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:8px; color:${BE.muted}; font-size:13px; font-weight:500; transition:all 0.15s; margin-bottom:1px; cursor:pointer; position:relative; }
.be-nav-item:hover { background:${BE.accentLt}; color:${BE.text}; }
.be-nav-item.active { background:${BE.accentLt}; color:${BE.accent}; font-weight:600; }
.be-nav-item.active::before { content:''; position:absolute; left:0; top:20%; bottom:20%; width:3px; border-radius:0 2px 2px 0; background:${BE.accent}; }
.be-nav-icon { font-size:15px; width:20px; text-align:center; flex-shrink:0; }
.be-nav-badge { margin-left:auto; min-width:18px; height:18px; background:${BE.accent}; color:#fff; border-radius:9px; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 5px; }
.be-nav-badge.amber { background:${BE.amber}; }
.be-sidebar-footer { margin-top:auto; padding:16px; border-top:1px solid ${BE.border}; }
.be-user-pill { display:flex; align-items:center; gap:10px; padding:10px; border-radius:10px; background:${BE.surface}; border:1px solid ${BE.border}; }
.be-user-avatar { width:32px; height:32px; border-radius:8px; background:linear-gradient(135deg,${BE.purple},${BE.accent}); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; flex-shrink:0; }
.be-user-name { font-size:12px; font-weight:600; }
.be-user-role { font-size:10px; color:${BE.muted}; font-family:'JetBrains Mono',monospace; }
.be-user-dot { margin-left:auto; width:8px; height:8px; border-radius:50%; background:${BE.green}; box-shadow:0 0 6px ${BE.green}; flex-shrink:0; }
.be-back-btn { display:flex; align-items:center; gap:8px; padding:9px 10px; border-radius:8px; color:${BE.muted}; font-size:12px; font-weight:500; cursor:pointer; margin:0 12px 8px; transition:all 0.15s; border:1px solid ${BE.border}; }
.be-back-btn:hover { background:rgba(0,212,255,0.06); color:#00d4ff; border-color:#00d4ff40; }

/* MAIN */
.be-main { flex:1; display:flex; flex-direction:column; overflow:hidden; }
.be-topbar { height:58px; min-height:58px; background:${BE.sidebar}; border-bottom:1px solid ${BE.border}; display:flex; align-items:center; gap:16px; padding:0 24px; }
.be-topbar-title { font-size:16px; font-weight:700; letter-spacing:-0.3px; }
.be-topbar-sub { font-size:12px; color:${BE.muted}; margin-left:4px; }
.be-search-box { display:flex; align-items:center; gap:8px; background:${BE.surface}; border:1px solid ${BE.border}; border-radius:8px; padding:7px 12px; width:220px; transition:border-color 0.15s; }
.be-search-box:focus-within { border-color:${BE.accent}; }
.be-search-box input { background:none; border:none; outline:none; color:${BE.text}; font-size:13px; width:100%; }
.be-search-box input::placeholder { color:${BE.muted}; }
.be-topbar-btn { width:36px; height:36px; border-radius:8px; background:${BE.surface}; border:1px solid ${BE.border}; display:flex; align-items:center; justify-content:center; font-size:15px; color:${BE.muted}; transition:all 0.15s; cursor:pointer; }
.be-topbar-btn:hover { border-color:${BE.accent}; color:${BE.accent}; }
.be-notif-dot { position:relative; }
.be-notif-dot::after { content:''; position:absolute; top:7px; right:7px; width:7px; height:7px; border-radius:50%; background:${BE.red}; border:2px solid ${BE.sidebar}; }

/* CONTENT */
.be-content { flex:1; overflow-y:auto; padding:24px; }

/* KPI */
.be-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
.be-kpi { background:${BE.card}; border:1px solid ${BE.border}; border-radius:14px; padding:20px; position:relative; overflow:hidden; transition:transform 0.2s,border-color 0.2s; }
.be-kpi:hover { transform:translateY(-2px); border-color:${BE.borderLt}; }
.be-kpi-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px; }
.be-kpi-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; }
.be-kpi-trend { font-size:11px; padding:3px 8px; border-radius:20px; font-family:'JetBrains Mono',monospace; font-weight:500; }
.be-trend-up { background:${BE.greenLt}; color:${BE.green}; }
.be-trend-dn { background:${BE.redLt}; color:${BE.red}; }
.be-kpi-val { font-size:28px; font-weight:800; letter-spacing:-1px; margin-bottom:4px; }
.be-kpi-label { font-size:12px; color:${BE.muted}; }

/* PANELS */
.be-two-col { display:grid; grid-template-columns:1fr 360px; gap:16px; margin-bottom:16px; }
.be-three-col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:16px; }
.be-panel { background:${BE.card}; border:1px solid ${BE.border}; border-radius:14px; overflow:hidden; }
.be-panel-head { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid ${BE.border}; }
.be-panel-title { font-size:14px; font-weight:700; }
.be-panel-action { font-size:12px; color:${BE.accent}; font-weight:500; cursor:pointer; }
.be-panel-body { padding:16px 20px; }

/* QUEUE TABLE */
.be-queue-table { width:100%; border-collapse:collapse; }
.be-queue-table th { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:${BE.muted}; padding:0 12px 10px; text-align:left; font-family:'JetBrains Mono',monospace; border-bottom:1px solid ${BE.border}; }
.be-queue-table td { padding:12px 12px; font-size:13px; border-bottom:1px solid rgba(28,39,64,0.5); vertical-align:middle; }
.be-queue-table tr:last-child td { border-bottom:none; }
.be-queue-table tr:hover td { background:rgba(59,130,246,0.03); }

/* PILLS */
.be-track-pill { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; font-family:'JetBrains Mono',monospace; }
.be-tp-green { background:${BE.greenLt}; color:${BE.green}; border:1px solid rgba(16,185,129,0.2); }
.be-tp-amber { background:${BE.amberLt}; color:${BE.amber}; border:1px solid rgba(245,158,11,0.2); }
.be-tp-red { background:${BE.redLt}; color:${BE.red}; border:1px solid rgba(239,68,68,0.2); }
.be-tp-blue { background:${BE.accentLt}; color:${BE.accent}; border:1px solid rgba(59,130,246,0.2); }
.be-status { display:inline-block; padding:3px 9px; border-radius:20px; font-size:10px; font-weight:600; font-family:'JetBrains Mono',monospace; }
.be-s-done { background:${BE.greenLt}; color:${BE.green}; }
.be-s-pending { background:${BE.amberLt}; color:${BE.amber}; }
.be-s-review { background:${BE.accentLt}; color:${BE.accent}; }
.be-s-fail { background:${BE.redLt}; color:${BE.red}; }

/* SCORE BAR */
.be-score-bar { display:flex; align-items:center; gap:8px; }
.be-score-track { flex:1; height:5px; border-radius:3px; background:${BE.surface}; overflow:hidden; }
.be-score-fill { height:100%; border-radius:3px; transition:width 0.5s; }
.be-score-num { font-size:12px; font-weight:600; font-family:'JetBrains Mono',monospace; min-width:28px; }

/* ACTION BTNS */
.be-action-btn { padding:5px 12px; border-radius:6px; font-size:11px; font-weight:600; transition:all 0.15s; border:1px solid; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; background:none; }
.be-ab-approve { background:${BE.greenLt}; color:${BE.green}; border-color:rgba(16,185,129,0.25); }
.be-ab-approve:hover { background:rgba(16,185,129,0.2); }
.be-ab-review { background:${BE.amberLt}; color:${BE.amber}; border-color:rgba(245,158,11,0.25); }
.be-ab-review:hover { background:rgba(245,158,11,0.2); }

/* ACTIVITY FEED */
.be-feed-item { display:flex; gap:12px; padding:10px 0; border-bottom:1px solid rgba(28,39,64,0.5); }
.be-feed-item:last-child { border-bottom:none; }
.be-feed-dot { width:8px; height:8px; border-radius:50%; margin-top:5px; flex-shrink:0; }
.be-feed-text { font-size:12px; color:${BE.muted}; line-height:1.5; }
.be-feed-text strong { color:${BE.text}; font-weight:600; }
.be-feed-time { font-size:10px; color:${BE.subtle}; font-family:'JetBrains Mono',monospace; margin-top:2px; }

/* MINI CHART */
.be-mini-bars { display:flex; align-items:flex-end; gap:4px; height:48px; padding:0 20px 16px; }
.be-mini-bar { flex:1; border-radius:3px 3px 0 0; transition:opacity 0.15s; cursor:pointer; }
.be-mini-bar:hover { opacity:0.8; }

/* UPLOAD ZONE (dashboard) */
.be-upload-zone { border:2px dashed ${BE.border}; border-radius:12px; padding:32px 24px; text-align:center; cursor:pointer; transition:all 0.2s; background:${BE.surface}; }
.be-upload-zone:hover, .be-upload-zone.drag { border-color:${BE.accent}; background:${BE.accentLt}; }
.be-upload-zone.filled { border-style:solid; border-color:${BE.green}; }
.be-uz-icon { font-size:36px; margin-bottom:10px; }
.be-uz-title { font-size:14px; font-weight:700; margin-bottom:4px; }
.be-uz-sub { font-size:12px; color:${BE.muted}; }
.be-uz-types { display:flex; gap:6px; justify-content:center; margin-top:12px; flex-wrap:wrap; }
.be-uz-type { font-size:10px; padding:2px 8px; border-radius:4px; background:${BE.accentLt}; border:1px solid rgba(59,130,246,0.2); color:${BE.accent}; font-family:'JetBrains Mono',monospace; }
.be-file-chip { display:flex; align-items:center; gap:10px; background:${BE.greenLt}; border:1px solid rgba(16,185,129,0.2); border-radius:8px; padding:10px 14px; margin-top:10px; text-align:left; }
.be-fc-icon { font-size:22px; flex-shrink:0; }
.be-fc-name { font-size:12px; font-weight:600; font-family:'JetBrains Mono',monospace; }
.be-fc-size { font-size:10px; color:${BE.muted}; }
.be-fc-remove { margin-left:auto; width:24px; height:24px; border-radius:5px; background:${BE.redLt}; border:1px solid rgba(239,68,68,0.2); color:${BE.red}; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; flex-shrink:0; transition:all 0.15s; }
.be-fc-remove:hover { background:rgba(239,68,68,0.2); }
.be-img-thumb { max-width:100%; max-height:140px; border-radius:8px; border:1px solid ${BE.border}; display:block; margin:10px auto 0; }

/* RUBRIC EDITOR */
.be-rubric-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid rgba(28,39,64,0.5); }
.be-rubric-row:last-child { border-bottom:none; }
.be-rubric-criterion { flex:1; background:${BE.surface}; border:1px solid ${BE.border}; border-radius:6px; padding:7px 10px; color:${BE.text}; font-size:13px; outline:none; transition:border-color 0.15s; }
.be-rubric-criterion:focus { border-color:${BE.accent}; }
.be-rubric-weight { width:70px; background:${BE.surface}; border:1px solid ${BE.border}; border-radius:6px; padding:7px 10px; color:${BE.text}; font-size:13px; outline:none; font-family:'JetBrains Mono',monospace; text-align:center; transition:border-color 0.15s; }
.be-rubric-weight:focus { border-color:${BE.accent}; }
.be-rubric-del { width:28px; height:28px; border-radius:6px; background:${BE.redLt}; color:${BE.red}; display:flex; align-items:center; justify-content:center; font-size:13px; cursor:pointer; flex-shrink:0; border:1px solid rgba(239,68,68,0.2); }

/* FORM (dashboard) */
.be-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.be-form-group { display:flex; flex-direction:column; gap:6px; }
.be-form-label { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:${BE.muted}; font-family:'JetBrains Mono',monospace; }
.be-form-input,.be-form-select,.be-form-textarea { background:${BE.surface}; border:1px solid ${BE.border}; border-radius:8px; padding:9px 12px; color:${BE.text}; font-size:13px; outline:none; transition:border-color 0.15s; font-family:'Plus Jakarta Sans',sans-serif; }
.be-form-input:focus,.be-form-select:focus,.be-form-textarea:focus { border-color:${BE.accent}; }
.be-form-textarea { resize:vertical; min-height:80px; }
.be-form-select option { background:${BE.surface}; }

/* BUTTONS (dashboard) */
.be-btn-primary { background:${BE.accent}; color:#fff; padding:10px 20px; border-radius:8px; font-size:13px; font-weight:600; transition:all 0.15s; box-shadow:0 0 16px ${BE.accentGl}; cursor:pointer; border:none; font-family:'Plus Jakarta Sans',sans-serif; }
.be-btn-primary:hover { background:#2563eb; transform:translateY(-1px); }
.be-btn-secondary { background:${BE.surface}; color:${BE.text}; border:1px solid ${BE.border}; padding:10px 20px; border-radius:8px; font-size:13px; font-weight:600; transition:all 0.15s; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; }
.be-btn-secondary:hover { border-color:${BE.accent}; color:${BE.accent}; }
.be-btn-row { display:flex; gap:10px; margin-top:16px; }

/* TABS */
.be-tabs { display:flex; gap:2px; margin-bottom:20px; }
.be-tab { padding:8px 16px; border-radius:8px; font-size:13px; font-weight:600; color:${BE.muted}; transition:all 0.15s; cursor:pointer; }
.be-tab:hover { color:${BE.text}; background:${BE.surface}; }
.be-tab.active { background:${BE.accentLt}; color:${BE.accent}; }

/* LOGIC TRACE */
.be-trace-box { background:${BE.surface}; border:1px solid ${BE.border}; border-radius:10px; padding:16px; margin-top:14px; }
.be-trace-header { display:flex; align-items:center; gap:8px; margin-bottom:12px; }
.be-trace-step { display:flex; gap:10px; padding:8px 0; border-bottom:1px solid rgba(28,39,64,0.5); font-size:12px; }
.be-trace-step:last-child { border-bottom:none; }
.be-trace-num { width:20px; height:20px; border-radius:5px; background:${BE.accentLt}; color:${BE.accent}; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; font-family:'JetBrains Mono',monospace; }
.be-trace-txt { color:${BE.muted}; line-height:1.5; }
.be-trace-txt strong { color:${BE.text}; }

/* GAUGE */
.be-gauge-wrap { display:flex; flex-direction:column; align-items:center; padding:16px 0; }
.be-gauge-ring { width:100px; height:100px; border-radius:50%; background:conic-gradient(var(--c) var(--pct), ${BE.surface} 0); display:flex; align-items:center; justify-content:center; position:relative; margin-bottom:8px; }
.be-gauge-inner { width:76px; height:76px; border-radius:50%; background:${BE.card}; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.be-gauge-val { font-size:20px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.be-gauge-label { font-size:9px; color:${BE.muted}; text-transform:uppercase; letter-spacing:1px; }

/* TOAST */
.be-toast { position:fixed; bottom:24px; right:24px; z-index:999; background:${BE.card}; border:1px solid ${BE.border}; border-radius:12px; padding:14px 18px; display:flex; align-items:flex-start; gap:12px; min-width:280px; max-width:340px; animation:slideIn 0.3s ease; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
@keyframes slideIn { from{transform:translateY(20px);opacity:0} to{transform:none;opacity:1} }
.be-toast-icon { font-size:20px; flex-shrink:0; }
.be-toast-title { font-size:13px; font-weight:700; margin-bottom:3px; }
.be-toast-msg { font-size:12px; color:${BE.muted}; line-height:1.4; }
.be-toast-close { margin-left:auto; font-size:14px; color:${BE.muted}; cursor:pointer; padding:2px; }

/* STD AVATAR */
.be-std-avatar { width:28px; height:28px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0; }

/* MISC */
.be-divider { height:1px; background:${BE.border}; margin:16px 0; }
.be-mono { font-family:'JetBrains Mono',monospace; }
.be-flex { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.be-mt16 { margin-top:16px; }
`;

/* ─── DATA ────────────────────────────────────────────────────── */
const QUEUE = [
  { id:"S001", name:"Aryan Mehta",   subject:"English Lit", assignment:"Climate Essay",    score:82, track:"green", status:"pending",  time:"2m ago"  },
  { id:"S002", name:"Priya Sharma",  subject:"History",     assignment:"WWI Analysis",     score:91, track:"green", status:"pending",  time:"5m ago"  },
  { id:"S003", name:"Rahul Gupta",   subject:"Science",     assignment:"Lab Report",       score:54, track:"amber", status:"review",   time:"8m ago"  },
  { id:"S004", name:"Neha Joshi",    subject:"Math",        assignment:"Algebra Test",     score:76, track:"green", status:"pending",  time:"12m ago" },
  { id:"S005", name:"Kiran Patel",   subject:"English Lit", assignment:"Poetry Response",  score:43, track:"amber", status:"review",   time:"15m ago" },
  { id:"S006", name:"Divya Singh",   subject:"CS",          assignment:"Algorithm HW",     score:95, track:"green", status:"done",     time:"20m ago" },
];
const STUDENTS = [
  { id:"S001", name:"Aryan Mehta",   grade:"G10", avg:78, subs:12, last:"Today",     color:"#3b82f6" },
  { id:"S002", name:"Priya Sharma",  grade:"G11", avg:91, subs:15, last:"Today",     color:"#8b5cf6" },
  { id:"S003", name:"Rahul Gupta",   grade:"G10", avg:54, subs:9,  last:"Yesterday", color:"#f59e0b" },
  { id:"S004", name:"Neha Joshi",    grade:"G9",  avg:83, subs:11, last:"Today",     color:"#10b981" },
  { id:"S005", name:"Kiran Patel",   grade:"G11", avg:67, subs:14, last:"2 days",    color:"#ef4444" },
  { id:"S006", name:"Divya Singh",   grade:"G12", avg:96, subs:18, last:"Today",     color:"#06b6d4" },
];
const ACTIVITY = [
  { color:BE.green,  text:"<strong>Priya Sharma</strong>'s WWI Analysis auto-approved — 91/100",    time:"2m ago"  },
  { color:BE.amber,  text:"<strong>Rahul Gupta</strong>'s Lab Report flagged for manual review",     time:"6m ago"  },
  { color:BE.accent, text:"Logic Trace generated for <strong>Aryan Mehta</strong>'s Climate Essay",  time:"9m ago"  },
  { color:BE.purple, text:"Bias-check overlay processed <strong>6 submissions</strong> anonymously", time:"15m ago" },
  { color:BE.green,  text:"<strong>Divya Singh</strong>'s Algorithm HW graded — 95/100",            time:"22m ago" },
  { color:BE.red,    text:"<strong>Kiran Patel</strong>'s Poetry flagged — low confidence (43%)",    time:"28m ago" },
];
const BARS = [62,78,54,91,83,47,95,72,68,85,90,76];

/* ─── HELPERS ─────────────────────────────────────────────────── */
const fmtSize = b => b < 1024 ? b+"B" : b < 1048576 ? (b/1024).toFixed(1)+"KB" : (b/1048576).toFixed(1)+"MB";
const fileIcon = f => !f ? "📁" : f.type.startsWith("image/") ? "🖼️" : f.type==="application/pdf" ? "📄" : f.type.includes("word") ? "📝" : "📁";
const initials = n => n.split(" ").map(x=>x[0]).join("").toUpperCase();

/* ─── DASHBOARD COMPONENTS ───────────────────────────────────── */
function ScoreBar({ score }) {
  const col = score >= 75 ? BE.green : score >= 50 ? BE.amber : BE.red;
  return (
    <div className="be-score-bar">
      <div className="be-score-track"><div className="be-score-fill" style={{width:score+"%",background:col}} /></div>
      <span className="be-score-num" style={{color:col}}>{score}</span>
    </div>
  );
}

function Gauge({ pct, color }) {
  return (
    <div className="be-gauge-wrap">
      <div className="be-gauge-ring" style={{"--c":color,"--pct":`${pct*3.6}deg`}}>
        <div className="be-gauge-inner">
          <div className="be-gauge-val" style={{color}}>{pct}%</div>
          <div className="be-gauge-label">confidence</div>
        </div>
      </div>
    </div>
  );
}

function BEUploadZone({ label, accept, file, imgSrc, onFile, onRemove }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  const handle = f => { if(f) onFile(f); };
  return (
    <div>
      {label && <div className="be-form-label" style={{marginBottom:8}}>{label}</div>}
      <div
        className={`be-upload-zone${drag?" drag":""}${file?" filled":""}`}
        onClick={()=>ref.current.click()}
        onDragOver={e=>{e.preventDefault();setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{e.preventDefault();setDrag(false);handle(e.dataTransfer.files[0]);}}
      >
        <input ref={ref} type="file" accept={accept} onChange={e=>handle(e.target.files[0])} />
        {!file ? (
          <>
            <div className="be-uz-icon">📂</div>
            <div className="be-uz-title">Drop or click to upload</div>
            <div className="be-uz-sub">Drag & drop files here</div>
            <div className="be-uz-types">
              {(accept||".pdf,.docx,.txt,.jpg,.png").split(",").map(t=>(
                <span key={t} className="be-uz-type">{t.replace(".","").toUpperCase()}</span>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="be-file-chip" onClick={e=>e.stopPropagation()}>
              <div className="be-fc-icon">{fileIcon(file)}</div>
              <div><div className="be-fc-name">{file.name}</div><div className="be-fc-size">{fmtSize(file.size)}</div></div>
              <div className="be-fc-remove" onClick={e=>{e.stopPropagation();onRemove();}}>✕</div>
            </div>
            {imgSrc && <img src={imgSrc} alt="preview" className="be-img-thumb" onClick={e=>e.stopPropagation()} />}
          </>
        )}
      </div>
    </div>
  );
}

function DashboardPage({ setDashPage }) {
  const [liveQueue, setLiveQueue] = useState(QUEUE.slice(0,5));
  const approveRow = id => setLiveQueue(q => q.map(x => x.id===id ? {...x,status:"done",track:"green"} : x));
  return (
    <>
      <div className="be-kpi-row">
        {[
          { icon:"📥", color:BE.accent,  bg:BE.accentLt,  val:"47",  label:"Pending in Queue",  trend:"+12", up:false },
          { icon:"✅", color:BE.green,  bg:BE.greenLt,   val:"182", label:"Approved Today",     trend:"+24", up:true  },
          { icon:"⚠️", color:BE.amber,  bg:BE.amberLt,   val:"11",  label:"Flagged for Review", trend:"-3",  up:true  },
          { icon:"⚡", color:BE.purple, bg:BE.purpleLt,  val:"94%", label:"AI Confidence Avg",  trend:"+2%", up:true  },
        ].map((k,i) => (
          <div className="be-kpi" key={i}>
            <div className="be-kpi-top">
              <div className="be-kpi-icon" style={{background:k.bg}}>{k.icon}</div>
              <div className={`be-kpi-trend ${k.up?"be-trend-up":"be-trend-dn"}`}>{k.trend}</div>
            </div>
            <div className="be-kpi-val" style={{color:k.color}}>{k.val}</div>
            <div className="be-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="be-two-col">
        <div className="be-panel">
          <div className="be-panel-head">
            <span className="be-panel-title">📋 Live Grading Queue</span>
            <span className="be-panel-action" onClick={()=>setDashPage("queue")}>View all →</span>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="be-queue-table">
              <thead><tr><th>Student</th><th>Subject</th><th>Score</th><th>Track</th><th>Action</th></tr></thead>
              <tbody>
                {liveQueue.map(r=>(
                  <tr key={r.id}>
                    <td>
                      <div className="be-flex">
                        <div className="be-std-avatar" style={{background:STUDENTS.find(s=>s.id===r.id)?.color+"22",color:STUDENTS.find(s=>s.id===r.id)?.color}}>{initials(r.name)}</div>
                        <div><div style={{fontWeight:600,fontSize:13}}>{r.name}</div><div style={{fontSize:11,color:BE.muted}}>{r.time}</div></div>
                      </div>
                    </td>
                    <td><div style={{color:BE.muted,fontSize:12}}>{r.subject}<br/><span style={{color:BE.text,fontSize:11}}>{r.assignment}</span></div></td>
                    <td style={{minWidth:100}}><ScoreBar score={r.score} /></td>
                    <td><span className={`be-track-pill ${r.track==="green"?"be-tp-green":r.track==="amber"?"be-tp-amber":"be-tp-red"}`}>●&nbsp;{r.track.charAt(0).toUpperCase()+r.track.slice(1)}</span></td>
                    <td>
                      {r.status==="done"
                        ? <span style={{fontSize:12,color:BE.green}}>✔ Done</span>
                        : r.status==="pending"
                          ? <button className="be-action-btn be-ab-approve" onClick={()=>approveRow(r.id)}>Approve</button>
                          : <button className="be-action-btn be-ab-review">Review</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">🔔 Activity Feed</span></div>
          <div className="be-panel-body">
            {ACTIVITY.map((a,i)=>(
              <div className="be-feed-item" key={i}>
                <div className="be-feed-dot" style={{background:a.color,boxShadow:`0 0 6px ${a.color}`}} />
                <div>
                  <div className="be-feed-text" dangerouslySetInnerHTML={{__html:a.text}} />
                  <div className="be-feed-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="be-three-col">
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">📊 Submission Volume (Today)</span></div>
          <div className="be-mini-bars">
            {BARS.map((v,i)=>(
              <div key={i} className="be-mini-bar" style={{height:(v/100*44)+"px",background:`linear-gradient(0deg,${BE.accent},${BE.purple})`,opacity:i===BARS.length-1?1:0.5+i/BARS.length*0.5}} title={`${v} submissions`} />
            ))}
          </div>
          <div className="be-panel-body" style={{paddingTop:0}}>
            <div className="be-flex" style={{justifyContent:"space-between"}}>
              <span style={{fontSize:11,color:BE.muted}}>8 AM</span>
              <span style={{fontSize:11,color:BE.muted,fontFamily:"'JetBrains Mono',monospace"}}>avg 72/hr</span>
              <span style={{fontSize:11,color:BE.muted}}>8 PM</span>
            </div>
          </div>
        </div>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">🚦 Track Distribution</span></div>
          <div className="be-panel-body">
            {[{label:"Green Track",pct:68,color:BE.green},{label:"Amber Track",pct:24,color:BE.amber},{label:"Red Track",pct:8,color:BE.red}].map(t=>(
              <div key={t.label} style={{marginBottom:14}}>
                <div className="be-flex" style={{justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:12,color:BE.muted}}>{t.label}</span>
                  <span style={{fontSize:12,color:t.color,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{t.pct}%</span>
                </div>
                <div className="be-score-track" style={{height:7}}><div className="be-score-fill" style={{width:t.pct+"%",background:t.color}} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">🎯 AI Confidence</span></div>
          <Gauge pct={87} color={BE.green} />
          <div className="be-panel-body" style={{paddingTop:0}}>
            <div className="be-divider" style={{margin:"8px 0"}} />
            {[{l:"High (>80%)",v:142,c:BE.green},{l:"Medium (50-80%)",v:31,c:BE.amber},{l:"Low (<50%)",v:9,c:BE.red}].map(r=>(
              <div key={r.l} className="be-flex" style={{justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:11,color:BE.muted}}>{r.l}</span>
                <span style={{fontSize:11,color:r.c,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function QueuePage() {
  const [rows, setRows] = useState(QUEUE);
  const [activeTab, setActiveTab] = useState("All");
  const [traceApproved, setTraceApproved] = useState(false);

  const approve = id => setRows(r => r.map(x => x.id===id ? {...x, status:"done", track:"green"} : x));
  const bulkApproveGreen = () => setRows(r => r.map(x => x.track==="green" && x.status!=="done" ? {...x, status:"done"} : x));

  const tabFilter = row => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return row.status === "pending";
    if (activeTab === "Flagged") return row.status === "review";
    if (activeTab === "Approved") return row.status === "done";
    return true;
  };
  const filtered = rows.filter(tabFilter);

  const tabCount = t => t==="All"?rows.length:t==="Pending"?rows.filter(r=>r.status==="pending").length:t==="Flagged"?rows.filter(r=>r.status==="review").length:rows.filter(r=>r.status==="done").length;

  return (
    <>
      <div className="be-tabs">
        {["All","Pending","Flagged","Approved"].map(t=>(
          <div key={t} className={`be-tab${t===activeTab?" active":""}`} onClick={()=>setActiveTab(t)}>
            {t} <span style={{marginLeft:5,fontSize:10,opacity:0.65}}>({tabCount(t)})</span>
          </div>
        ))}
      </div>
      <div className="be-panel">
        <div className="be-panel-head">
          <span className="be-panel-title">📋 Grading Queue — {filtered.length} submission{filtered.length!==1?"s":""}</span>
          <button className="be-btn-primary" style={{fontSize:12,padding:"6px 14px"}} onClick={bulkApproveGreen}>⚡ Bulk Approve Green</button>
        </div>
        {filtered.length === 0 ? (
          <div style={{padding:"40px 24px",textAlign:"center",color:BE.muted}}>
            <div style={{fontSize:28,marginBottom:10}}>✅</div>
            <div style={{fontWeight:600}}>No submissions in this category</div>
          </div>
        ) : (
          <div style={{overflowX:"auto"}}>
            <table className="be-queue-table">
              <thead><tr><th>ID</th><th>Student</th><th>Assignment</th><th>Score</th><th>Track</th><th>Status</th><th>Submitted</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(r=>(
                  <tr key={r.id}>
                    <td><span style={{fontSize:11,color:BE.muted,fontFamily:"'JetBrains Mono',monospace"}}>{r.id}</span></td>
                    <td><div className="be-flex"><div className="be-std-avatar" style={{background:STUDENTS.find(s=>s.id===r.id)?.color+"22",color:STUDENTS.find(s=>s.id===r.id)?.color}}>{initials(r.name)}</div><span style={{fontWeight:600}}>{r.name}</span></div></td>
                    <td><div style={{fontWeight:500}}>{r.assignment}</div><div style={{fontSize:11,color:BE.muted}}>{r.subject}</div></td>
                    <td style={{minWidth:110}}><ScoreBar score={r.score} /></td>
                    <td><span className={`be-track-pill ${r.track==="green"?"be-tp-green":r.track==="amber"?"be-tp-amber":"be-tp-red"}`}>●&nbsp;{r.track.charAt(0).toUpperCase()+r.track.slice(1)}</span></td>
                    <td><span className={`be-status ${r.status==="done"?"be-s-done":r.status==="review"?"be-s-review":"be-s-pending"}`}>{r.status}</span></td>
                    <td><span style={{fontSize:12,color:BE.muted}}>{r.time}</span></td>
                    <td>
                      <div className="be-flex">
                        {r.status!=="done" && <button className="be-action-btn be-ab-approve" onClick={()=>approve(r.id)}>✔ Approve</button>}
                        {r.status==="review" && <button className="be-action-btn be-ab-review">👁 Review</button>}
                        {r.status==="done" && <span style={{fontSize:12,color:BE.green}}>✔ Done</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Logic Trace Panel */}
      <div className="be-panel be-mt16">
        <div className="be-panel-head">
          <span className="be-panel-title">🔍 Logic Trace — Aryan Mehta: Climate Essay</span>
          <span className={`be-track-pill ${traceApproved?"be-tp-green":"be-tp-amber"}`}>{traceApproved?"✔ Approved":"82/100 · Awaiting"}</span>
        </div>
        <div className="be-panel-body">
          <div className="be-trace-box">
            <div className="be-trace-header">
              <span style={{fontSize:13,fontWeight:700}}>AI Grading Rationale</span>
              <span className={`be-status ${traceApproved?"be-s-done":"be-s-review"}`}>{traceApproved?"Approved":"Awaiting Approval"}</span>
            </div>
            {[
              {n:"01",t:"<strong>Structure (22/25):</strong> Introduction clearly states thesis. Body paragraphs have coherent topic sentences. Conclusion partially restates main argument but lacks synthesis."},
              {n:"02",t:"<strong>Grammar & Mechanics (18/20):</strong> 3 comma splice errors detected. Subject-verb agreement consistent. Vocabulary appropriate for G10 level."},
              {n:"03",t:"<strong>Factual Accuracy (28/35):</strong> CO₂ statistics cited correctly. One claim about 2°C threshold lacks citation. Renewable energy claims accurate per latest IPCC data."},
              {n:"04",t:"<strong>Bias Check:</strong> Student identifier stripped. Grade assigned blind. No demographic signals detected that could influence scoring."},
              {n:"05",t:"<strong>Confidence Score: 87%</strong> — Routed to Green Track for quick teacher approval. Override available with one click."},
            ].map(s=>(<div className="be-trace-step" key={s.n}><div className="be-trace-num">{s.n}</div><div className="be-trace-txt" dangerouslySetInnerHTML={{__html:s.t}} /></div>))}
          </div>
          {!traceApproved ? (
            <div className="be-btn-row">
              <button className="be-btn-primary" onClick={()=>{ setTraceApproved(true); approve("S001"); }}>✅ Approve This Grade</button>
              <button className="be-btn-secondary">✏️ Override Score</button>
              <button className="be-btn-secondary">💬 Edit Feedback</button>
            </div>
          ) : (
            <div style={{marginTop:14,padding:"10px 14px",borderRadius:8,background:BE.greenLt,border:`1px solid rgba(16,185,129,0.2)`,fontSize:13,color:BE.green}}>
              ✔ Grade approved and pushed to student record.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function UploadPage({ toast }) {
  const [subFile, setSubFile] = useState(null);
  const [subImg, setSubImg] = useState(null);
  const [rubFile, setRubFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [form, setForm] = useState({name:"",subject:"",assignment:"",grade:"G10",voice:"",notes:""});
  const [rubric, setRubric] = useState([
    {criterion:"Argument & Thesis",weight:"30"},{criterion:"Evidence & Analysis",weight:"30"},
    {criterion:"Structure & Flow",weight:"20"},{criterion:"Grammar & Mechanics",weight:"20"},
  ]);
  const handleSub = f => {
    setSubFile(f);
    if(f?.type.startsWith("image/")){const r=new FileReader();r.onload=e=>setSubImg(e.target.result);r.readAsDataURL(f);}
    else setSubImg(null);
  };
  const handleImg = f => {
    setImgFile(f);
    if(f){const r=new FileReader();r.onload=e=>setImgSrc(e.target.result);r.readAsDataURL(f);}
    else setImgSrc(null);
  };
  const submit = () => {
    if(!subFile){toast("⚠️","No File","Please upload a student submission first.");return;}
    toast("🚀","Submitted!","Entering Sentinel-Loop pipeline. AI First-Pass running…");
  };
  return (
    <>
      <div className="be-two-col">
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="be-panel"><div className="be-panel-head"><span className="be-panel-title">📤 Student Submission Upload</span></div><div className="be-panel-body"><BEUploadZone label="SUBMISSION FILE" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp" file={subFile} imgSrc={subImg} onFile={handleSub} onRemove={()=>{setSubFile(null);setSubImg(null);}}/></div></div>
          <div className="be-panel"><div className="be-panel-head"><span className="be-panel-title">🖼️ Image Upload (Handwritten / Scanned)</span></div><div className="be-panel-body"><BEUploadZone label="UPLOAD IMAGE FOR OCR" accept=".jpg,.jpeg,.png,.webp,.gif,.tiff" file={imgFile} imgSrc={imgSrc} onFile={handleImg} onRemove={()=>{setImgFile(null);setImgSrc(null);}}/>{imgSrc&&<div style={{marginTop:10,fontSize:12,color:BE.muted}}><span style={{color:BE.accent}}>🔍 OCR:</span> OpenCV will extract and analyze handwriting.</div>}</div></div>
          <div className="be-panel"><div className="be-panel-head"><span className="be-panel-title">📋 Rubric File Upload</span></div><div className="be-panel-body"><BEUploadZone label="DIGITAL RUBRIC" accept=".pdf,.xlsx,.csv,.jpg,.png,.docx" file={rubFile} imgSrc={null} onFile={setRubFile} onRemove={()=>setRubFile(null)}/></div></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div className="be-panel">
            <div className="be-panel-head"><span className="be-panel-title">📝 Assignment Details</span></div>
            <div className="be-panel-body">
              <div className="be-form-grid" style={{marginBottom:12}}>
                <div className="be-form-group"><label className="be-form-label">Student Name</label><input className="be-form-input" placeholder="Will be anonymized" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
                <div className="be-form-group"><label className="be-form-label">Subject</label><input className="be-form-input" placeholder="e.g. English Literature" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} /></div>
              </div>
              <div className="be-form-grid" style={{marginBottom:12}}>
                <div className="be-form-group"><label className="be-form-label">Assignment Title</label><input className="be-form-input" placeholder="Essay on Climate Change" value={form.assignment} onChange={e=>setForm(f=>({...f,assignment:e.target.value}))} /></div>
                <div className="be-form-group"><label className="be-form-label">Grade Level</label><select className="be-form-select" value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>{["G6","G7","G8","G9","G10","G11","G12","UG","PG"].map(g=><option key={g}>{g}</option>)}</select></div>
              </div>
              <div className="be-form-group" style={{marginBottom:12}}><label className="be-form-label">Teacher's Pedagogical Voice</label><textarea className="be-form-textarea" placeholder="Describe your feedback tone…" value={form.voice} onChange={e=>setForm(f=>({...f,voice:e.target.value}))} /></div>
              <div className="be-form-group"><label className="be-form-label">Additional Notes for AI</label><textarea className="be-form-textarea" style={{minHeight:60}} placeholder="Special instructions…" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} /></div>
            </div>
          </div>
          <div className="be-panel">
            <div className="be-panel-head"><span className="be-panel-title">⚙️ Inline Rubric Builder</span><button className="be-action-btn be-ab-approve" onClick={()=>setRubric(r=>[...r,{criterion:"",weight:"0"}])}>+ Add Row</button></div>
            <div className="be-panel-body">
              {rubric.map((r,i)=>(
                <div className="be-rubric-row" key={i}>
                  <input className="be-rubric-criterion" placeholder="Criterion name…" value={r.criterion} onChange={e=>setRubric(rb=>rb.map((x,j)=>j===i?{...x,criterion:e.target.value}:x))} />
                  <input className="be-rubric-weight" placeholder="Wt" value={r.weight} onChange={e=>setRubric(rb=>rb.map((x,j)=>j===i?{...x,weight:e.target.value}:x))} />
                  <div className="be-rubric-del" onClick={()=>setRubric(rb=>rb.filter((_,j)=>j!==i))}>✕</div>
                </div>
              ))}
              <div style={{marginTop:12,fontSize:12,color:BE.muted}}>
                Total weight: <span style={{fontFamily:"'JetBrains Mono',monospace",color:rubric.reduce((a,r)=>a+Number(r.weight),0)>100?BE.red:BE.green}}>{rubric.reduce((a,r)=>a+Number(r.weight),0)}%</span>
              </div>
            </div>
          </div>
          <div className="be-btn-row" style={{marginTop:0}}>
            <button className="be-btn-primary" style={{flex:1,padding:"12px"}} onClick={submit}>🚀 Submit to Sentinel-Loop</button>
            <button className="be-btn-secondary" onClick={()=>{setSubFile(null);setImgFile(null);setRubFile(null);setSubImg(null);setImgSrc(null);}}>Clear All</button>
          </div>
        </div>
      </div>
    </>
  );
}

const AVATAR_COLORS = ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#ec4899","#f97316","#14b8a6","#a855f7"];

function StudentsPage() {
  const [students, setStudents] = useState(STUDENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:"", grade:"G10", avg:"75", subs:"0" });
  const [errors, setErrors] = useState({});

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    const avg = Number(form.avg);
    if (isNaN(avg) || avg < 0 || avg > 100) e.avg = "Score must be 0–100";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newId = "S" + String(students.length + 1).padStart(3, "0");
    const color = AVATAR_COLORS[students.length % AVATAR_COLORS.length];
    setStudents(prev => [...prev, {
      id: newId,
      name: form.name.trim(),
      grade: form.grade,
      avg: Number(form.avg),
      subs: Number(form.subs),
      last: "Today",
      color,
    }]);
    setForm({ name:"", grade:"G10", avg:"75", subs:"0" });
    setErrors({});
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <>
      {/* Modal overlay */}
      {showModal && (
        <div
          onClick={e => { if(e.target===e.currentTarget) setShowModal(false); }}
          style={{
            position:"fixed",inset:0,zIndex:500,
            background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}
        >
          <div style={{
            background:BE.card,border:`1px solid ${BE.borderLt}`,borderRadius:16,
            padding:28,width:420,maxWidth:"92vw",
            boxShadow:"0 24px 64px rgba(0,0,0,0.6)",
            animation:"slideIn 0.25s ease",
          }}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:16}}>➕ Add New Student</span>
              <div onClick={()=>{setShowModal(false);setErrors({});}} style={{cursor:"pointer",color:BE.muted,fontSize:18,lineHeight:1}}>✕</div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="be-form-group">
                <label className="be-form-label">Full Name *</label>
                <input
                  className="be-form-input"
                  placeholder="e.g. Riya Desai"
                  value={form.name}
                  onChange={e=>{ setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:undefined})); }}
                  style={errors.name?{borderColor:BE.red}:{}}
                  autoFocus
                />
                {errors.name && <span style={{fontSize:11,color:BE.red}}>{errors.name}</span>}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div className="be-form-group">
                  <label className="be-form-label">Grade Level</label>
                  <select className="be-form-select" value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>
                    {["G6","G7","G8","G9","G10","G11","G12","UG","PG"].map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="be-form-group">
                  <label className="be-form-label">Avg Score (0–100)</label>
                  <input
                    className="be-form-input" type="number" min="0" max="100"
                    placeholder="75"
                    value={form.avg}
                    onChange={e=>{ setForm(f=>({...f,avg:e.target.value})); setErrors(er=>({...er,avg:undefined})); }}
                    style={errors.avg?{borderColor:BE.red}:{}}
                  />
                  {errors.avg && <span style={{fontSize:11,color:BE.red}}>{errors.avg}</span>}
                </div>
              </div>

              <div className="be-form-group">
                <label className="be-form-label">Submissions Count</label>
                <input className="be-form-input" type="number" min="0" placeholder="0"
                  value={form.subs} onChange={e=>setForm(f=>({...f,subs:e.target.value}))} />
              </div>
            </div>

            {/* Preview */}
            <div style={{margin:"18px 0 0",padding:"12px 14px",borderRadius:10,background:BE.surface,border:`1px solid ${BE.border}`,display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:8,background:AVATAR_COLORS[students.length%AVATAR_COLORS.length]+"22",color:AVATAR_COLORS[students.length%AVATAR_COLORS.length],display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13}}>
                {form.name.trim() ? initials(form.name.trim()) : "??"}
              </div>
              <div>
                <div style={{fontWeight:600,fontSize:13,color:BE.text}}>{form.name.trim()||"Student Name"}</div>
                <div style={{fontSize:11,color:BE.muted,fontFamily:"'JetBrains Mono',monospace"}}>
                  {form.grade} · Score: {form.avg}% · {form.subs} submissions
                </div>
              </div>
              <div style={{marginLeft:"auto"}}>
                <span className={`be-status ${Number(form.avg)>=75?"be-s-done":Number(form.avg)>=50?"be-s-pending":"be-s-fail"}`}>
                  {Number(form.avg)>=75?"On Track":Number(form.avg)>=50?"At Risk":"Needs Help"}
                </span>
              </div>
            </div>

            <div className="be-btn-row" style={{marginTop:20}}>
              <button className="be-btn-primary" style={{flex:1}} onClick={handleAdd}>✅ Add Student</button>
              <button className="be-btn-secondary" onClick={()=>{setShowModal(false);setErrors({});}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="be-panel">
        <div className="be-panel-head">
          <span className="be-panel-title">👥 Student Roster — {filtered.length} of {students.length} enrolled</span>
          <div className="be-flex">
            <div className="be-search-box" style={{width:190}}>
              <span>🔍</span>
              <input
                placeholder="Search name, ID, grade…"
                value={search}
                onChange={e=>setSearch(e.target.value)}
              />
              {search && (
                <span onClick={()=>setSearch("")} style={{cursor:"pointer",color:BE.muted,fontSize:12,marginLeft:4}}>✕</span>
              )}
            </div>
            <button className="be-btn-primary" style={{fontSize:12,padding:"6px 14px"}} onClick={()=>setShowModal(true)}>
              + Add Student
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{padding:"48px 24px",textAlign:"center",color:BE.muted}}>
            <div style={{fontSize:32,marginBottom:12}}>🔍</div>
            <div style={{fontWeight:600,marginBottom:4}}>No students found</div>
            <div style={{fontSize:12}}>Try a different search or <span style={{color:BE.accent,cursor:"pointer"}} onClick={()=>setSearch("")}>clear the filter</span></div>
          </div>
        ) : (
          <div style={{overflowX:"auto"}}>
            <table className="be-queue-table">
              <thead><tr><th>Student</th><th>Grade</th><th>Avg Score</th><th>Submissions</th><th>Last Active</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {filtered.map(s=>(
                  <tr key={s.id}>
                    <td>
                      <div className="be-flex">
                        <div className="be-std-avatar" style={{background:s.color+"22",color:s.color,width:32,height:32,borderRadius:8}}>{initials(s.name)}</div>
                        <div><div style={{fontWeight:600}}>{s.name}</div><div style={{fontSize:11,color:BE.muted}}>{s.id}</div></div>
                      </div>
                    </td>
                    <td><span className="be-track-pill be-tp-blue">{s.grade}</span></td>
                    <td><ScoreBar score={s.avg} /></td>
                    <td><span style={{fontFamily:"'JetBrains Mono',monospace",color:BE.muted}}>{s.subs} submissions</span></td>
                    <td><span style={{fontSize:12,color:BE.muted}}>{s.last}</span></td>
                    <td><span className={`be-status ${s.avg>=75?"be-s-done":s.avg>=50?"be-s-pending":"be-s-fail"}`}>{s.avg>=75?"On Track":s.avg>=50?"At Risk":"Needs Help"}</span></td>
                    <td>
                      <div
                        onClick={()=>handleDelete(s.id)}
                        title="Remove student"
                        style={{
                          width:26,height:26,borderRadius:6,cursor:"pointer",
                          background:BE.redLt,border:`1px solid rgba(239,68,68,0.2)`,
                          color:BE.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,
                          transition:"all 0.15s",
                        }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.2)"}
                        onMouseLeave={e=>e.currentTarget.style.background=BE.redLt}
                      >🗑</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function SettingsPage() {
  const [toggles, setToggles] = useState([true,true,true,true,false,true]);
  const [saved, setSaved] = useState("");
  const toggleItem = i => setToggles(t => t.map((v,j) => j===i ? !v : v));
  const handleSave = label => { setSaved(label); setTimeout(()=>setSaved(""),2000); };

  const TOGGLE_LABELS = [
    "FERPA Compliance (US)","GDPR Data Controls (EU)",
    "Blind Grading (Bias-Check Overlay)","Student Name Anonymization",
    "Audit Log Retention (90 days)","AI Logic Trace Storage",
  ];

  return (
    <div className="be-two-col">
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">⚙️ AI Engine Configuration</span></div>
          <div className="be-panel-body">
            <div className="be-form-grid">
              <div className="be-form-group"><label className="be-form-label">Primary LLM</label><select className="be-form-select"><option>GPT-4o</option><option>Claude 3.5 Sonnet</option><option>Llama 3.1</option></select></div>
              <div className="be-form-group"><label className="be-form-label">Confidence Threshold</label><input className="be-form-input" defaultValue="80" type="number" min="50" max="99" /></div>
              <div className="be-form-group"><label className="be-form-label">Green Track Min Score</label><input className="be-form-input" defaultValue="75" type="number" /></div>
              <div className="be-form-group"><label className="be-form-label">Orchestration</label><select className="be-form-select"><option>LangChain</option><option>CrewAI</option><option>LlamaIndex</option></select></div>
            </div>
            <div className="be-btn-row">
              <button className="be-btn-primary" onClick={()=>handleSave("ai")}>Save Config</button>
              {saved==="ai" && <span style={{fontSize:12,color:BE.green}}>✔ Saved!</span>}
            </div>
          </div>
        </div>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">🔗 LTI 1.3 Integration</span></div>
          <div className="be-panel-body">
            <div className="be-form-grid">
              <div className="be-form-group"><label className="be-form-label">Platform</label><select className="be-form-select"><option>Canvas</option><option>Moodle</option><option>Blackboard</option></select></div>
              <div className="be-form-group"><label className="be-form-label">Client ID</label><input className="be-form-input" placeholder="LTI Client ID…" /></div>
            </div>
            <div className="be-form-group" style={{marginTop:12}}><label className="be-form-label">Deployment URL</label><input className="be-form-input" placeholder="https://your-lms.edu/lti/launch" /></div>
            <div className="be-btn-row">
              <button className="be-btn-primary" onClick={()=>handleSave("lti")}>Connect LMS</button>
              {saved==="lti" && <span style={{fontSize:12,color:BE.green}}>✔ Connected!</span>}
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">🔐 Privacy & Compliance</span></div>
          <div className="be-panel-body">
            {TOGGLE_LABELS.map((label,i)=>(
              <div key={i} className="be-flex" style={{justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${BE.border}`,flexWrap:"nowrap"}}>
                <span style={{fontSize:13,flex:1}}>{label}</span>
                <div
                  onClick={()=>toggleItem(i)}
                  style={{width:38,height:20,borderRadius:10,background:toggles[i]?BE.green:BE.surface,border:`1px solid ${toggles[i]?BE.green:BE.border}`,position:"relative",cursor:"pointer",flexShrink:0,transition:"background 0.2s,border-color 0.2s"}}
                >
                  <div style={{position:"absolute",top:2,left:toggles[i]?20:2,width:14,height:14,borderRadius:7,background:toggles[i]?"#fff":BE.muted,transition:"left 0.2s"}} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="be-panel">
          <div className="be-panel-head"><span className="be-panel-title">👤 Teacher Profile</span></div>
          <div className="be-panel-body">
            <div className="be-form-group" style={{marginBottom:12}}><label className="be-form-label">Full Name</label><input className="be-form-input" defaultValue="Dr. Rajesh Kumar" /></div>
            <div className="be-form-group" style={{marginBottom:12}}><label className="be-form-label">Email</label><input className="be-form-input" defaultValue="r.kumar@school.edu" /></div>
            <div className="be-form-group"><label className="be-form-label">Default Feedback Voice</label><textarea className="be-form-textarea" defaultValue="Encouraging and Socratic. Always highlight strengths before improvements. Use formal but warm tone." /></div>
            <div className="be-btn-row">
              <button className="be-btn-primary" onClick={()=>handleSave("profile")}>Save Profile</button>
              {saved==="profile" && <span style={{fontSize:12,color:BE.green}}>✔ Profile saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BE_NAV = [
  { section:"Main", items:[
    {id:"dashboard",icon:"⬡",label:"Dashboard",badge:null},
    {id:"queue",icon:"📋",label:"Grading Queue",badge:"47"},
    {id:"upload",icon:"📤",label:"Upload Submission",badge:null},
  ]},
  { section:"Management", items:[
    {id:"students",icon:"👥",label:"Students",badge:"6"},
    {id:"settings",icon:"⚙️",label:"Settings",badge:null},
  ]},
];
const PAGE_TITLES = { dashboard:"Dashboard", queue:"Grading Queue", upload:"Upload Submission", students:"Students", settings:"Settings" };

/* ─── DASHBOARD ROOT ──────────────────────────────────────────── */
function Dashboard({ onBack }) {
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const showToast = (icon, title, msg) => { setToast({icon,title,msg}); setTimeout(()=>setToast(null),4000); };
  return (
    <>
      <div className="be-root view-enter">
        <aside className="be-sidebar">
          <div className="be-sidebar-logo">
            <div className="be-logo-mark">SL</div>
            <div><div className="be-logo-text">Sentinel-Loop</div><div className="be-logo-sub">ADMIN PANEL</div></div>
          </div>
          {BE_NAV.map(section=>(
            <div className="be-nav-section" key={section.section}>
              <div className="be-nav-section-label">{section.section}</div>
              {section.items.map(item=>(
                <div key={item.id} className={`be-nav-item${page===item.id?" active":""}`} onClick={()=>setPage(item.id)}>
                  <span className="be-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className={`be-nav-badge${item.id==="queue"?" amber":""}`}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
          <div style={{flex:1}} />
          <div style={{padding:"0 12px 8px"}}>
            <div className="be-back-btn" onClick={onBack}>
              <span>←</span>
              <span>Back to Public Site</span>
            </div>
          </div>
          <div className="be-sidebar-footer">
            <div className="be-user-pill">
              <div className="be-user-avatar">RK</div>
              <div><div className="be-user-name">Dr. R. Kumar</div><div className="be-user-role">TEACHER · G10–12</div></div>
              <div className="be-user-dot" />
            </div>
          </div>
        </aside>
        <div className="be-main">
          <header className="be-topbar">
            <div>
              <span className="be-topbar-title">{PAGE_TITLES[page]}</span>
              <span className="be-topbar-sub">· Sentinel-Loop AI Grading System</span>
            </div>
            <div style={{flex:1}} />
            <div className="be-search-box">
              <span style={{color:BE.muted}}>🔍</span>
              <input placeholder="Search submissions, students…" />
            </div>
            <button className="be-topbar-btn be-notif-dot" title="Notifications">🔔</button>
            <button className="be-topbar-btn" title="Help">❓</button>
          </header>
          <div className="be-content">
            {page==="dashboard" && <DashboardPage setDashPage={setPage} />}
            {page==="queue"     && <QueuePage />}
            {page==="upload"    && <UploadPage toast={showToast} />}
            {page==="students"  && <StudentsPage />}
            {page==="settings"  && <SettingsPage />}
          </div>
        </div>
      </div>
      {toast && (
        <div className="be-toast">
          <div className="be-toast-icon">{toast.icon}</div>
          <div><div className="be-toast-title">{toast.title}</div><div className="be-toast-msg">{toast.msg}</div></div>
          <div className="be-toast-close" onClick={()=>setToast(null)}>✕</div>
        </div>
      )}
    </>
  );
}

/* ─── FRONTEND ROOT ───────────────────────────────────────────── */
function Frontend({ onDashboard }) {
  const [dragging, setDragging] = useState(false);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [rubricFile, setRubricFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ studentName:"", subject:"", assignment:"", grade:"G10", teacherVoice:"" });
  const submissionRef = useRef();
  const rubricRef = useRef();

  const handleFile = (file, setter, imgSetter) => {
    if (!file) return;
    setter(file);
    if (imgSetter && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => imgSetter(e.target.result);
      reader.readAsDataURL(file);
    } else { imgSetter && imgSetter(null); }
  };
  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, setSubmissionFile, setImgPreview);
  };
  const handleSubmit = () => {
    if (!submissionFile) { alert("Please upload a student submission first."); return; }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="fe-root view-enter">
      <div className="fe-grid-bg" />
      <div className="fe-content">
        {/* NAV */}
        <nav className="fe-nav">
          <div className="fe-nav-logo">SENTINEL-LOOP</div>
          <div className="fe-nav-links">
            <span className="fe-nav-link" onClick={()=>document.getElementById("solution")?.scrollIntoView({behavior:"smooth"})}>Solution</span>
            <span className="fe-nav-link" onClick={()=>document.getElementById("tech")?.scrollIntoView({behavior:"smooth"})}>Tech</span>
            <span className="fe-nav-link" onClick={()=>document.getElementById("upload")?.scrollIntoView({behavior:"smooth"})}>Upload</span>
            <span className="fe-nav-link" onClick={()=>document.getElementById("impact")?.scrollIntoView({behavior:"smooth"})}>Impact</span>
            <button className="fe-dashboard-btn" onClick={onDashboard}>🎓 Teacher Dashboard →</button>
          </div>
          <div className="fe-nav-badge">TEAM UHK04320</div>
        </nav>

        {/* HERO */}
        <section className="fe-hero">
          <div className="fe-hero-tag">
            <div className="fe-hero-tag-dot" />
            D10-S04 · AI-Driven Grading & Feedback
          </div>
          <h1 className="fe-hero-title">
            <span className="fe-hero-title-l1">Grading Reimagined</span>
            <span className="fe-hero-title-l2">By AI. For Humans.</span>
          </h1>
          <p className="fe-hero-sub">
            A hybrid Generative AI grading engine that handles cognitive drudgery while empowering teachers as the final Quality Assurance editors — with full Logic Trace transparency.
          </p>
          <div className="fe-hero-cta">
            <button className="fe-btn-primary" onClick={()=>document.getElementById("upload")?.scrollIntoView({behavior:"smooth"})}>
              Submit for Grading →
            </button>
            <button className="fe-btn-ghost" onClick={onDashboard}>
              Open Teacher Dashboard
            </button>
          </div>
          <div className="fe-stats-bar">
            <div className="fe-stat"><div className="fe-stat-val">15+</div><div className="fe-stat-label">hrs/week saved per teacher</div></div>
            <div className="fe-stat"><div className="fe-stat-val">50%</div><div className="fe-stat-label">reduction in grading time</div></div>
            <div className="fe-stat"><div className="fe-stat-val">₹50</div><div className="fe-stat-label">per student annually</div></div>
            <div className="fe-stat"><div className="fe-stat-val">0</div><div className="fe-stat-label">bias in blind grading</div></div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="fe-section">
          <div className="fe-section-header">
            <span className="fe-section-num">01</span>
            <h2 className="fe-section-title">Proposed Solution</h2>
            <div className="fe-section-line" />
          </div>
          <div className="fe-grid2">
            <div className="fe-card">
              <div className="fe-card-icon fe-icon-blue">🧠</div>
              <div className="fe-card-title">First-Pass Engine</div>
              <div className="fe-card-text">AI instantly scans submissions against a digital rubric, providing objective scoring across grammar, structure, and factual accuracy — in seconds.</div>
            </div>
            <div className="fe-card">
              <div className="fe-card-icon fe-icon-gold">🔀</div>
              <div className="fe-card-title">Confidence-Based Routing</div>
              <div className="fe-card-text">High-confidence grades are auto-queued for quick teacher approval (Green Track). Ambiguous responses are flagged for human review (Amber Track).</div>
              <div className="fe-tracks">
                <div className="fe-track fe-track-green">● Green Track</div>
                <div className="fe-track fe-track-amber">● Amber Track</div>
              </div>
            </div>
            <div className="fe-card">
              <div className="fe-card-icon fe-icon-green">🎭</div>
              <div className="fe-card-title">Persona-Driven Feedback</div>
              <div className="fe-card-text">AI drafts personalized comments using the teacher's unique pedagogical voice — maintaining the student-teacher bond even at scale.</div>
            </div>
            <div className="fe-card">
              <div className="fe-card-icon fe-icon-red">🛡️</div>
              <div className="fe-card-title">Bias-Check Overlay</div>
              <div className="fe-card-text">A secondary AI layer strips student names and identifiers during grading, ensuring total grading equity regardless of background or identity.</div>
            </div>
          </div>
          <div style={{marginTop:32}}>
            <div className="fe-pipeline">
              {[
                {dot:"fe-dot-blue",icon:"📥",label:"Student Submission",sub:"Upload essay or scan"},
                {dot:"fe-dot-blue",icon:"🤖",label:"AI First-Pass",sub:"Grammar, structure, accuracy"},
                {dot:"fe-dot-amber",icon:"⚖️",label:"Bias-Check Overlay",sub:"Anonymous processing"},
                {dot:"fe-dot-amber",icon:"🔍",label:"Confidence Routing",sub:"Green / Amber track"},
                {dot:"fe-dot-green",icon:"👩‍🏫",label:"Teacher QA",sub:"Review & override"},
                {dot:"fe-dot-gold",icon:"✅",label:"Final Grade",sub:"Personalized feedback"},
              ].map((step,i)=>(
                <div className="fe-pipeline-step" key={i}>
                  <div className={`fe-pipeline-dot ${step.dot}`}>{step.icon}</div>
                  <div className="fe-pipeline-label">{step.label}</div>
                  <div className="fe-pipeline-sub">{step.sub}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,padding:"20px 28px",background:"rgba(245,200,66,0.05)",border:`1px solid rgba(245,200,66,0.2)`,borderRadius:12}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:FE.gold,marginBottom:6,fontSize:14}}>⚡ The Unique Hook: Logic Trace</div>
              <div style={{fontSize:13,color:FE.muted,lineHeight:1.65}}>
                Unlike "Black Box" AI, Sentinel-Loop provides a <strong style={{color:FE.text}}>Logic Trace</strong> — it explains exactly why it suggested a specific score, allowing teachers to override or refine with a single click.
              </div>
            </div>
          </div>
        </section>

        {/* UPLOAD */}
        <section id="upload" className="fe-section">
          <div className="fe-section-header">
            <span className="fe-section-num">02</span>
            <h2 className="fe-section-title">Submit for Grading</h2>
            <div className="fe-section-line" />
          </div>
          <div className="fe-rubric-form" style={{marginBottom:24}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:20,color:FE.text}}>Assignment Details</div>
            <div className="fe-form-row">
              <div className="fe-form-group">
                <label className="fe-form-label">Student Name (optional)</label>
                <input className="fe-form-input" placeholder="Will be anonymized during grading" value={form.studentName} onChange={e=>setForm(f=>({...f,studentName:e.target.value}))} />
              </div>
              <div className="fe-form-group">
                <label className="fe-form-label">Subject</label>
                <input className="fe-form-input" placeholder="e.g. English Literature" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} />
              </div>
            </div>
            <div className="fe-form-row">
              <div className="fe-form-group">
                <label className="fe-form-label">Assignment Title</label>
                <input className="fe-form-input" placeholder="e.g. Essay on Climate Change" value={form.assignment} onChange={e=>setForm(f=>({...f,assignment:e.target.value}))} />
              </div>
              <div className="fe-form-group">
                <label className="fe-form-label">Grade Level</label>
                <select className="fe-form-select" value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>
                  {["G6","G7","G8","G9","G10","G11","G12","UG","PG"].map(g=><option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="fe-form-group">
              <label className="fe-form-label">Teacher's Pedagogical Voice</label>
              <textarea className="fe-form-textarea" placeholder="Describe your feedback style…" value={form.teacherVoice} onChange={e=>setForm(f=>({...f,teacherVoice:e.target.value}))} />
            </div>
          </div>

          <div style={{marginBottom:20}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"1px",color:FE.muted,textTransform:"uppercase",marginBottom:10}}>Student Submission</div>
            <div
              className={`fe-upload-zone ${dragging?"drag-over":""} ${submissionFile?"has-file":""}`}
              onClick={()=>submissionRef.current.click()}
              onDragOver={e=>{e.preventDefault();setDragging(true);}}
              onDragLeave={()=>setDragging(false)}
              onDrop={handleDrop}
            >
              <input ref={submissionRef} type="file" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
                onChange={e=>handleFile(e.target.files[0],setSubmissionFile,setImgPreview)} />
              {!submissionFile ? (
                <>
                  <div className="fe-upload-icon">📤</div>
                  <div className="fe-upload-title">Drop submission here or click to browse</div>
                  <div className="fe-upload-sub">Supports essays, answer sheets, and scanned handwritten work</div>
                  <div className="fe-upload-types">
                    {["PDF","DOCX","TXT","JPG","PNG"].map(t=><span key={t} className="fe-upload-type-tag">{t}</span>)}
                  </div>
                </>
              ) : (
                <>
                  <div className="fe-upload-icon">✅</div>
                  <div className="fe-upload-title" style={{color:FE.green}}>Submission Ready</div>
                  <div className="fe-file-preview" onClick={e=>e.stopPropagation()}>
                    <div style={{fontSize:32}}>{fileIcon(submissionFile)}</div>
                    <div><div className="fe-file-name">{submissionFile.name}</div><div className="fe-file-size">{fmtSize(submissionFile.size)}</div></div>
                    <div className="fe-file-remove" onClick={e=>{e.stopPropagation();setSubmissionFile(null);setImgPreview(null);}}>✕</div>
                  </div>
                  {imgPreview && (<div className="fe-img-preview" onClick={e=>e.stopPropagation()}><img src={imgPreview} alt="preview" /></div>)}
                </>
              )}
            </div>
          </div>

          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"1px",color:FE.muted,textTransform:"uppercase",marginBottom:10}}>Rubric / Grading Criteria (optional)</div>
            <div className={`fe-upload-zone ${rubricFile?"has-file":""}`} style={{padding:"32px"}} onClick={()=>rubricRef.current.click()}>
              <input ref={rubricRef} type="file" accept=".pdf,.doc,.docx,.xlsx,.csv,.jpg,.png"
                onChange={e=>handleFile(e.target.files[0],setRubricFile,null)} />
              {!rubricFile ? (
                <>
                  <div style={{fontSize:32,marginBottom:10}}>📋</div>
                  <div className="fe-upload-title" style={{fontSize:16}}>Upload Rubric or Scoring Criteria</div>
                  <div className="fe-upload-sub">PDF, DOCX, Excel, or image of rubric</div>
                </>
              ) : (
                <div className="fe-file-preview" onClick={e=>e.stopPropagation()}>
                  <div style={{fontSize:32}}>{fileIcon(rubricFile)}</div>
                  <div><div className="fe-file-name">{rubricFile.name}</div><div className="fe-file-size">{fmtSize(rubricFile.size)}</div></div>
                  <div className="fe-file-remove" onClick={e=>{e.stopPropagation();setRubricFile(null);}}>✕</div>
                </div>
              )}
            </div>
          </div>

          <button className="fe-btn-primary" style={{width:"100%",padding:"18px"}} onClick={handleSubmit}>
            🚀 Submit to Sentinel-Loop for AI Grading
          </button>
          {submitted && (
            <div className="fe-result-box">
              <div style={{fontSize:48,marginBottom:16}}>🎯</div>
              <div className="fe-result-title">Submission Received!</div>
              <div className="fe-result-text">
                Your submission has entered the Sentinel-Loop pipeline.<br/>
                The AI First-Pass Engine is analyzing structure, grammar, and content accuracy.<br/>
                A Logic Trace report will be ready for your review shortly.
              </div>
            </div>
          )}
        </section>

        {/* TECH STACK */}
        <section id="tech" className="fe-section">
          <div className="fe-section-header">
            <span className="fe-section-num">03</span>
            <h2 className="fe-section-title">Technology Stack</h2>
            <div className="fe-section-line" />
          </div>
          <div className="fe-tech-grid">
            {[
              {label:"Frontend",tags:["React","TypeScript","Next.js","Redux","Tailwind","Framer Motion"]},
              {label:"Backend",tags:["Node.js","FastAPI","Express.js","REST API","Socket.IO","MongoDB"]},
              {label:"AI / LLMs",tags:["GPT-4o","Claude 3.5 Sonnet","Llama 3.1","LangChain","CrewAI","LlamaIndex"]},
              {label:"Database",tags:["PostgreSQL","Elasticsearch","Redis","Pinecone","OpenCV"]},
              {label:"APIs",tags:["REST + gRPC","OAuth2 / JWT","LTI 1.3","Canvas","Moodle","Blackboard"]},
              {label:"Deployment",tags:["Docker","Kubernetes","GKE","EKS","AWS","PyTorch"]},
            ].map(group=>(
              <div className="fe-tech-group" key={group.label}>
                <div className="fe-tech-group-label">{group.label}</div>
                <div className="fe-tech-tags">
                  {group.tags.map(t=><span key={t} className="fe-tech-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IMPACT */}
        <section id="impact" className="fe-section">
          <div className="fe-section-header">
            <span className="fe-section-num">04</span>
            <h2 className="fe-section-title">Impact & Benefits</h2>
            <div className="fe-section-line" />
          </div>
          <div className="fe-grid2">
            {[
              {cls:"fe-bc-blue",cat:"Social",catColor:FE.accent,title:"Educational Equity",text:"Blind grading ensures a student's name, gender, or background never influences their grade. Every student is evaluated purely on merit."},
              {cls:"fe-bc-green",cat:"Pedagogical",catColor:FE.green,title:"The 2-Sigma Shift",text:"Moves the classroom toward a Mastery Learning model where students submit drafts, receive AI coaching, and improve before the final grade is locked."},
              {cls:"fe-bc-gold",cat:"Economical",catColor:FE.gold,title:"Institutional Efficiency",text:"Reclaiming 15+ hours per week per teacher is equivalent to a massive increase in staff capacity — without the cost of new hires."},
              {cls:"fe-bc-amber",cat:"Environmental",catColor:FE.amber,title:"Paperless Ecosystem",text:"Digitizing the rubric-to-feedback cycle eliminates thousands of tons of paper waste, reducing schools' carbon footprint significantly."},
              {cls:"fe-bc-blue",cat:"For Students",catColor:FE.accent,title:"End of Feedback Lag",text:"Traditional systems deliver feedback 7–10 days later. Sentinel-Loop delivers it while concepts are still fresh, drastically increasing retention."},
              {cls:"fe-bc-green",cat:"For Teachers",catColor:FE.green,title:"Cognitive Offloading",text:"By handling routine grading, teachers reclaim mental energy for high-order mentorship, creative instruction, and student relationship-building."},
            ].map((b,i)=>(
              <div key={i} className={`fe-benefit-card ${b.cls}`}>
                <div className="fe-benefit-category" style={{color:b.catColor}}>{b.cat}</div>
                <div className="fe-benefit-title">{b.title}</div>
                <div className="fe-benefit-text">{b.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARE */}
        <section className="fe-section">
          <div className="fe-section-header">
            <span className="fe-section-num">05</span>
            <h2 className="fe-section-title">Competitive Comparison</h2>
            <div className="fe-section-line" />
          </div>
          <div className="fe-table-wrap">
            <table className="fe-compare-table">
              <thead>
                <tr><th>Feature</th><th>Manual Grading</th><th>Basic LMS Tools</th><th>AI-Assisted (Others)</th><th>Sentinel-Loop ✦</th></tr>
              </thead>
              <tbody>
                {[
                  ["Grading Method","Human, time-intensive","Auto MCQ only","60–80% workload reduction","Hybrid AI + Teacher"],
                  ["Efficiency","✗","✗","✗","✔"],
                  ["Personalized Feedback","✗","✗","✗","✔"],
                  ["Bias Detection","✗","Low","None","✔"],
                  ["Logic Trace","✗","✗","✗","✔"],
                  ["LTI Integration","✗","✗","✗","✔"],
                  ["Cost-Effectiveness","High labor costs","✗","API costs","✔ LTI plug-in"],
                ].map(([feat,m,b,ai,sl])=>(
                  <tr key={feat}>
                    <td style={{fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:13}}>{feat}</td>
                    <td style={{color:FE.muted}}>{m}</td>
                    <td style={{color:FE.muted}}>{b}</td>
                    <td style={{color:FE.muted}}>{ai}</td>
                    <td>{sl==="✔"?<span style={{color:FE.green,fontSize:16}}>✔</span>:<span style={{color:FE.accent,fontWeight:600,fontSize:12}}>{sl}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DASHBOARD CTA BANNER */}
        <section className="fe-section">
          <div style={{background:"linear-gradient(135deg,rgba(0,212,255,0.06),rgba(0,255,136,0.04))",border:`1px solid ${FE.accentGlow}`,borderRadius:20,padding:"48px 40px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08), transparent 70%)`,pointerEvents:"none"}} />
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"2px",color:FE.accent,textTransform:"uppercase",marginBottom:16}}>For Educators</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-1px",marginBottom:16,color:FE.text}}>
              Ready to transform your <span style={{color:FE.accent}}>grading workflow?</span>
            </div>
            <div style={{fontSize:14,color:FE.muted,marginBottom:32,maxWidth:500,margin:"0 auto 32px"}}>
              Access the full Teacher Dashboard with live queue management, Logic Trace review, student analytics, and LMS integration.
            </div>
            <button className="fe-dashboard-btn" style={{fontSize:14,padding:"14px 36px"}} onClick={onDashboard}>
              🎓 Open Teacher Dashboard →
            </button>
          </div>
        </section>

        <footer className="fe-footer">
          SENTINEL-LOOP AI GRADING SYSTEM · TEAM CODING WIZARDS · UHK04320 · D10-S04 · UHACK 4.0
        </footer>
      </div>
    </div>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────────── */
export default function App() {
  const [view, setView] = useState("frontend"); // "frontend" | "dashboard"
  return (
    <>
      <style>{globalCss}</style>
      {view === "frontend"
        ? <Frontend onDashboard={() => setView("dashboard")} />
        : <Dashboard onBack={() => setView("frontend")} />
      }
    </>
  );
}
