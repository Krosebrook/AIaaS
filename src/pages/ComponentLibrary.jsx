import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────
const Ico = {
  Search: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Copy: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
  Check: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M20 6 9 17l-5-5"/></svg>,
  Plus: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12h14"/></svg>,
  X: () => <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Up: () => <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="m18 15-6-6-6 6"/></svg>,
  Down: () => <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="m6 9 6 6 6-6"/></svg>,
  Code: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Eye: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Layers: () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Zap: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Download: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Trash: () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Sparkle: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 3c-1 5-4 8-9 9 5 1 8 4 9 9 1-5 4-8 9-9-5-1-8-4-9-9Z"/></svg>,
};

// ─── Component Library Data ───────────────────────────────────
const COMPONENTS = [
  // ── BUTTONS ──
  {
    id: "btn-primary", category: "Buttons", name: "Primary Button",
    desc: "High-emphasis action with indigo fill and glow shadow",
    preview: () => (
      <button className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 select-none"
        style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.45)" }}>
        Get Started →
      </button>
    ),
    code: `<button
  className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95"
  style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.45)" }}
>
  Get Started →
</button>`,
  },
  {
    id: "btn-glass", category: "Buttons", name: "Glass Button",
    desc: "Frosted glass with luminous border — ideal for dark hero sections",
    preview: () => (
      <button className="px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-200 active:scale-95 select-none"
        style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.18)" }}>
        Explore Docs
      </button>
    ),
    code: `<button
  className="px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-200 active:scale-95"
  style={{
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.18)",
  }}
>
  Explore Docs
</button>`,
  },
  {
    id: "btn-gradient", category: "Buttons", name: "Gradient Button",
    desc: "Violet-to-blue sweep — commands attention without shouting",
    preview: () => (
      <button className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 select-none"
        style={{ background: "linear-gradient(135deg,#8b5cf6 0%,#6366f1 55%,#3b82f6 100%)", boxShadow: "0 4px 20px rgba(139,92,246,0.5)" }}>
        Start Building
      </button>
    ),
    code: `<button
  className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95"
  style={{
    background: "linear-gradient(135deg,#8b5cf6 0%,#6366f1 55%,#3b82f6 100%)",
    boxShadow: "0 4px 20px rgba(139,92,246,0.5)",
  }}
>
  Start Building
</button>`,
  },
  {
    id: "btn-outline", category: "Buttons", name: "Outline Button",
    desc: "Glass-border with indigo stroke — clean secondary action",
    preview: () => (
      <button className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-95 select-none"
        style={{ color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.5)", background: "rgba(99,102,241,0.06)" }}>
        View Plans
      </button>
    ),
    code: `<button
  className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-95"
  style={{
    color: "#a5b4fc",
    border: "1px solid rgba(99,102,241,0.5)",
    background: "rgba(99,102,241,0.06)",
  }}
>
  View Plans
</button>`,
  },
  {
    id: "btn-ghost", category: "Buttons", name: "Ghost Button",
    desc: "No border, no fill — tertiary action that steps back",
    preview: () => (
      <button className="px-5 py-2.5 text-slate-400 text-sm font-medium rounded-lg transition-all duration-200 hover:text-white active:scale-95 select-none"
        style={{ border: "1px solid transparent" }}>
        Learn More
      </button>
    ),
    code: `<button className="px-5 py-2.5 text-slate-400 text-sm font-medium rounded-lg hover:text-white hover:bg-white/8 transition-all duration-200 active:scale-95">
  Learn More
</button>`,
  },
  {
    id: "btn-danger", category: "Buttons", name: "Destructive Button",
    desc: "Red for irreversible actions — unmissable without being aggressive",
    preview: () => (
      <button className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 select-none"
        style={{ background: "rgba(239,68,68,0.85)", boxShadow: "0 0 18px rgba(239,68,68,0.35)" }}>
        Delete Account
      </button>
    ),
    code: `<button
  className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95"
  style={{ background: "rgba(239,68,68,0.85)", boxShadow: "0 0 18px rgba(239,68,68,0.35)" }}
>
  Delete Account
</button>`,
  },
  // ── CARDS ──
  {
    id: "card-feature", category: "Cards", name: "Feature Card",
    desc: "Icon + headline + body — the workhorse of feature grids",
    preview: () => (
      <div className="p-5 rounded-xl w-52" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-indigo-400" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
          <Ico.Zap />
        </div>
        <p className="text-white text-sm font-semibold mb-1">Lightning Fast</p>
        <p className="text-slate-400 text-xs leading-relaxed">Edge-delivered with smart caching. 99.9% uptime SLA.</p>
      </div>
    ),
    code: `<div
  className="p-5 rounded-xl"
  style={{
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
  }}
>
  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
    style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
    {/* Icon */}
  </div>
  <p className="text-white text-sm font-semibold mb-1">Feature Title</p>
  <p className="text-slate-400 text-xs leading-relaxed">Description text here.</p>
</div>`,
  },
  {
    id: "card-stat", category: "Cards", name: "Stat / KPI Card",
    desc: "Metric + trend indicator — dashboard and analytics contexts",
    preview: () => (
      <div className="p-4 rounded-xl w-48" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">MRR</p>
        <p className="text-white text-2xl font-bold mb-1.5">$48,231</p>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ color: "#34d399", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }}>↑ 12.5%</span>
          <span className="text-slate-600 text-xs">vs last month</span>
        </div>
      </div>
    ),
    code: `<div
  className="p-4 rounded-xl"
  style={{
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
  }}
>
  <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">{label}</p>
  <p className="text-white text-2xl font-bold mb-1.5">{value}</p>
  <span className="text-xs font-semibold px-1.5 py-0.5 rounded"
    style={{ color: "#34d399", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }}>
    ↑ {delta}%
  </span>
</div>`,
  },
  {
    id: "card-pricing", category: "Cards", name: "Pricing Card",
    desc: "Tier + price + features — highlighted with gradient glow",
    preview: () => (
      <div className="p-5 rounded-xl w-48 relative overflow-hidden" style={{ background: "linear-gradient(145deg,rgba(99,102,241,0.15),rgba(139,92,246,0.07))", backdropFilter: "blur(12px)", border: "1px solid rgba(99,102,241,0.35)" }}>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30" style={{ background: "radial-gradient(circle,#8b5cf6,transparent)" }} />
        <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Pro</p>
        <p className="text-white text-2xl font-bold">$29<span className="text-slate-400 text-xs font-normal">/mo</span></p>
        <div className="mt-3 space-y-1.5">
          {["Unlimited projects","Priority support","Advanced analytics"].map(f => (
            <div key={f} className="flex items-center gap-2 text-slate-300 text-xs">
              <span style={{ color: "#34d399" }}>✓</span>{f}
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-1.5 text-white text-xs font-semibold rounded-lg" style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>Get Started</button>
      </div>
    ),
    code: `<div
  className="p-5 rounded-xl relative overflow-hidden"
  style={{
    background: "linear-gradient(145deg,rgba(99,102,241,0.15),rgba(139,92,246,0.07))",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(99,102,241,0.35)",
  }}
>
  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Pro</p>
  <p className="text-white text-2xl font-bold">$29<span className="text-slate-400 text-xs font-normal">/mo</span></p>
  <div className="mt-3 space-y-1.5">
    {features.map(f => (
      <div key={f} className="flex items-center gap-2 text-slate-300 text-xs">
        <span style={{ color: "#34d399" }}>✓</span>{f}
      </div>
    ))}
  </div>
  <button className="mt-4 w-full py-2 text-white text-xs font-semibold rounded-lg"
    style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
    Get Started
  </button>
</div>`,
  },
  {
    id: "card-profile", category: "Cards", name: "Profile Card",
    desc: "Avatar + name + role + tags — team roster or author attribution",
    preview: () => (
      <div className="px-4 py-3.5 rounded-xl w-52 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>KR</div>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold">Kyle Rosebrook</p>
          <p className="text-slate-400 text-xs mb-1.5">Staff Engineer</p>
          <div className="flex gap-1 flex-wrap">
            {["AppSec","AI","Platform"].map(t => (
              <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ color: "#a5b4fc", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `<div
  className="px-4 py-3.5 rounded-xl flex items-center gap-3"
  style={{
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
  }}
>
  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
    style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
    {initials}
  </div>
  <div>
    <p className="text-white text-sm font-semibold">{name}</p>
    <p className="text-slate-400 text-xs">{role}</p>
  </div>
</div>`,
  },
  {
    id: "card-alert", category: "Cards", name: "Alert / Toast Card",
    desc: "Success state — also available in warning, error, info variants",
    preview: () => (
      <div className="px-4 py-3 rounded-xl w-60 flex items-start gap-3" style={{ background: "rgba(52,211,153,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(52,211,153,0.25)" }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(52,211,153,0.2)", color: "#34d399" }}>✓</div>
        <div>
          <p className="text-white text-xs font-semibold">Deployment successful</p>
          <p className="text-slate-400 text-xs">v2.4.1 is live. 0 errors detected.</p>
        </div>
      </div>
    ),
    code: `{/* success | warning | error | info — swap rgba values */}
<div
  className="px-4 py-3 rounded-xl flex items-start gap-3"
  style={{
    background: "rgba(52,211,153,0.08)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(52,211,153,0.25)",
  }}
>
  <span className="text-emerald-400 mt-0.5">✓</span>
  <div>
    <p className="text-white text-xs font-semibold">{title}</p>
    <p className="text-slate-400 text-xs">{message}</p>
  </div>
</div>`,
  },
  // ── NAVBARS ──
  {
    id: "nav-glass", category: "Navbars", name: "Glass Navbar",
    desc: "Sticky, frosted — transparent until scrolled, then blurs",
    preview: () => (
      <div className="w-72 px-4 py-2.5 rounded-xl flex items-center justify-between" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }} />
          <span className="text-white text-sm font-bold">Prism</span>
        </div>
        <div className="flex items-center gap-4">
          {["Docs","Pricing"].map(l => (
            <span key={l} className="text-slate-400 text-xs cursor-pointer hover:text-white transition-colors">{l}</span>
          ))}
        </div>
        <button className="px-3 py-1.5 text-white text-xs font-semibold rounded-lg" style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>Sign Up</button>
      </div>
    ),
    code: `<nav
  className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between transition-all"
  style={{
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  }}
>
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-lg" style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }} />
    <span className="text-white font-bold">Brand</span>
  </div>
  <div className="flex items-center gap-6">
    {navLinks.map(l => (
      <a key={l} href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a>
    ))}
  </div>
  <button className="px-4 py-2 text-white text-sm font-semibold rounded-lg"
    style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
    Get Started
  </button>
</nav>`,
  },
  {
    id: "nav-dark", category: "Navbars", name: "Dark Solid Navbar",
    desc: "High-contrast dark with underline active state — dashboard-ready",
    preview: () => (
      <div className="w-72 px-4 py-2.5 rounded-xl flex items-center justify-between bg-slate-900" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-white text-sm font-bold tracking-tight">Nucleus</span>
        <div className="flex items-center gap-4">
          {[["Features",true],["Docs",false]].map(([l,active]) => (
            <span key={l} className={`text-xs cursor-pointer pb-0.5 ${active?"text-white border-b border-indigo-500":"text-slate-400"}`}>{l}</span>
          ))}
        </div>
        <button className="px-3 py-1.5 text-slate-300 text-xs font-medium rounded-lg border border-slate-600 hover:border-slate-400 transition-colors">Login</button>
      </div>
    ),
    code: `<nav className="px-6 py-4 flex items-center justify-between bg-slate-900 border-b border-white/5">
  <span className="text-white font-bold">Brand</span>
  <div className="flex items-center gap-6">
    {links.map(link => (
      <a key={link.href} href={link.href}
        className={\`text-sm pb-0.5 transition-colors \${
          link.active ? "text-white border-b border-indigo-500" : "text-slate-400 hover:text-white"
        }\`}>
        {link.label}
      </a>
    ))}
  </div>
  <button className="px-4 py-2 text-slate-300 text-sm rounded-lg border border-slate-600 hover:border-slate-400 transition-colors">
    Login
  </button>
</nav>`,
  },
  // ── FOOTERS ──
  {
    id: "footer-columns", category: "Footers", name: "Multi-Column Footer",
    desc: "Three-column sitemap with copyright bar — standard SaaS pattern",
    preview: () => (
      <div className="w-72 p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex gap-6 mb-3">
          {[["Product",["Features","Pricing","Changelog"]],["Company",["About","Blog","Careers"]],["Legal",["Privacy","Terms"]]].map(([title,links]) => (
            <div key={title} className="flex-1">
              <p className="text-white text-xs font-semibold mb-2">{title}</p>
              {links.map(l => <p key={l} className="text-slate-600 text-xs mb-1 cursor-pointer hover:text-slate-400">{l}</p>)}
            </div>
          ))}
        </div>
        <div className="pt-2 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-slate-700 text-xs">© 2025 YourCo</span>
          <span className="text-slate-700 text-xs">Built with care</span>
        </div>
      </div>
    ),
    code: `<footer
  className="px-8 py-10"
  style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
>
  <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 mb-8">
    {footerSections.map(section => (
      <div key={section.title}>
        <p className="text-white text-sm font-semibold mb-3">{section.title}</p>
        {section.links.map(link => (
          <a key={link} href="#"
            className="block text-slate-500 text-sm mb-2 hover:text-slate-300 transition-colors">
            {link}
          </a>
        ))}
      </div>
    ))}
  </div>
  <div className="max-w-6xl mx-auto pt-6 flex items-center justify-between"
    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <span className="text-slate-600 text-sm">© 2025 YourCo</span>
    <span className="text-slate-600 text-sm">All rights reserved</span>
  </div>
</footer>`,
  },
  {
    id: "footer-minimal", category: "Footers", name: "Glass Minimal Footer",
    desc: "Frosted bar with copyright + social links — marketing sites",
    preview: () => (
      <div className="w-72 px-4 py-3 rounded-xl flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-slate-600 text-xs">© 2025 YourBrand</span>
        <div className="flex items-center gap-4">
          {["Twitter","GitHub","Discord"].map(s => (
            <span key={s} className="text-slate-600 text-xs cursor-pointer hover:text-slate-300 transition-colors">{s}</span>
          ))}
        </div>
      </div>
    ),
    code: `<footer
  className="px-8 py-4 flex items-center justify-between"
  style={{
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
  }}
>
  <span className="text-slate-500 text-sm">© 2025 YourBrand</span>
  <div className="flex items-center gap-6">
    {socialLinks.map(link => (
      <a key={link} href="#" className="text-slate-500 text-sm hover:text-white transition-colors">{link}</a>
    ))}
  </div>
</footer>`,
  },
  // ── FORMS ──
  {
    id: "form-input", category: "Forms", name: "Glass Input Field",
    desc: "Labeled frosted input with indigo focus ring",
    preview: () => (
      <div className="w-56">
        <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Email address</label>
        <input type="email" placeholder="kyle@intinc.com" readOnly
          className="w-full px-3 py-2 text-white text-sm rounded-lg outline-none placeholder-slate-700"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }} />
      </div>
    ),
    code: `<div>
  <label className="block text-xs font-medium mb-1.5 text-slate-400">
    {label}
  </label>
  <input
    type={type}
    placeholder={placeholder}
    className="w-full px-3 py-2 text-white text-sm rounded-lg outline-none placeholder-slate-700
      focus:ring-2 focus:ring-indigo-500/40 transition-all"
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(8px)",
    }}
  />
</div>`,
  },
  {
    id: "form-subscribe", category: "Forms", name: "Email Subscribe Bar",
    desc: "Inline glass input + gradient CTA — newsletter & waitlist",
    preview: () => (
      <div className="flex gap-2 w-64">
        <input type="email" placeholder="Enter your email" readOnly
          className="flex-1 px-3 py-2 text-white text-xs rounded-lg outline-none placeholder-slate-700"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
        <button className="px-3 py-2 text-white text-xs font-semibold rounded-lg whitespace-nowrap"
          style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
          Join →
        </button>
      </div>
    ),
    code: `<div className="flex gap-2">
  <input type="email" placeholder="Enter your email"
    className="flex-1 px-3 py-2 text-white text-sm rounded-lg outline-none placeholder-slate-700"
    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
  />
  <button className="px-4 py-2 text-white text-sm font-semibold rounded-lg"
    style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
    Subscribe →
  </button>
</div>`,
  },
  // ── BADGES ──
  {
    id: "badge-status", category: "Badges", name: "Status Badges",
    desc: "Semantic pill badges — success, warning, error, info",
    preview: () => (
      <div className="flex flex-wrap gap-2">
        {[["Live","#10b981","rgba(16,185,129,0.12)","rgba(16,185,129,0.28)"],
          ["Beta","#f59e0b","rgba(245,158,11,0.12)","rgba(245,158,11,0.28)"],
          ["Deprecated","#ef4444","rgba(239,68,68,0.12)","rgba(239,68,68,0.28)"],
          ["New","#a78bfa","rgba(139,92,246,0.12)","rgba(139,92,246,0.28)"]].map(([l,c,bg,bo]) => (
          <span key={l} className="px-2.5 py-1 text-xs font-semibold rounded-full"
            style={{ color: c, background: bg, border: `1px solid ${bo}` }}>{l}</span>
        ))}
      </div>
    ),
    code: `{/* Swap color values per variant */}
<span className="px-2.5 py-1 text-xs font-semibold rounded-full"
  style={{ color: "#10b981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)" }}>
  Live
</span>
<span className="px-2.5 py-1 text-xs font-semibold rounded-full"
  style={{ color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.28)" }}>
  Beta
</span>`,
  },
  {
    id: "badge-glow", category: "Badges", name: "Glow Badge",
    desc: "Gradient-text badge with matching glow — premium / featured labels",
    preview: () => (
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 text-xs font-bold rounded-full"
          style={{ color: "#c4b5fd", background: "linear-gradient(135deg,rgba(139,92,246,0.18),rgba(99,102,241,0.12))", border: "1px solid rgba(139,92,246,0.35)", boxShadow: "0 0 12px rgba(139,92,246,0.2)" }}>
          ✦ Featured
        </span>
        <span className="px-3 py-1 text-xs font-bold rounded-full"
          style={{ color: "#fbbf24", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 0 12px rgba(245,158,11,0.15)" }}>
          🔥 Hot
        </span>
      </div>
    ),
    code: `<span
  className="px-3 py-1 text-xs font-bold rounded-full"
  style={{
    color: "#c4b5fd",
    background: "linear-gradient(135deg,rgba(139,92,246,0.18),rgba(99,102,241,0.12))",
    border: "1px solid rgba(139,92,246,0.35)",
    boxShadow: "0 0 12px rgba(139,92,246,0.2)",
  }}
>
  ✦ Featured
</span>`,
  },
];

const CATS = ["All", "Buttons", "Cards", "Navbars", "Footers", "Forms", "Badges"];

export default function ComponentLibrary() {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [canvas, setCanvas] = useState([]);
  const [codeView, setCodeView] = useState({});
  const [copied, setCopied] = useState(null);
  const [exportCopied, setExportCopied] = useState(false);

  const filtered = COMPONENTS.filter(c => {
    const catOk = activeCat === "All" || c.category === activeCat;
    const q = query.toLowerCase();
    const searchOk = !q || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const inCanvas = id => canvas.includes(id);

  const toggleCanvas = id =>
    setCanvas(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const move = (idx, dir) => {
    setCanvas(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const copyCode = id => {
    const c = COMPONENTS.find(x => x.id === id);
    if (!c) return;
    navigator.clipboard.writeText(c.code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const exportAll = () => {
    const out = canvas.map(id => {
      const c = COMPONENTS.find(x => x.id === id);
      return c ? `{/* ── ${c.name} ── */}\n${c.code}` : "";
    }).filter(Boolean).join("\n\n");
    navigator.clipboard.writeText(out).then(() => {
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    });
  };

  const counts = Object.fromEntries(
    CATS.map(cat => [cat, cat === "All" ? COMPONENTS.length : COMPONENTS.filter(c => c.category === cat).length])
  );

  return (
    <div className="flex h-screen overflow-hidden text-white select-none" style={{ fontFamily: "'Inter',system-ui,sans-serif", background: "linear-gradient(145deg,#06060f 0%,#0c0c20 40%,#08082a 100%)" }}>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-80 h-80 rounded-full opacity-[0.08]" style={{ top: "-80px", left: "30%", background: "radial-gradient(circle,#8b5cf6,transparent)", filter: "blur(70px)" }} />
        <div className="absolute w-56 h-56 rounded-full opacity-[0.06]" style={{ bottom: "10%", right: "20%", background: "radial-gradient(circle,#6366f1,transparent)", filter: "blur(60px)" }} />
      </div>

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside className="w-52 flex-shrink-0 flex flex-col p-3 gap-0.5 z-10 relative" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}>
            <Ico.Layers />
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">UI Library</p>
            <p className="text-xs" style={{ color: "#475569" }}>{COMPONENTS.length} components</p>
          </div>
        </div>

        <p className="px-2 mb-1 text-xs uppercase tracking-widest font-medium" style={{ color: "#334155" }}>Categories</p>

        {CATS.map(cat => {
          const active = activeCat === cat;
          return (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className="flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-xs transition-all duration-150 text-left"
              style={active ? {
                background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.28)", color: "#a5b4fc"
              } : {
                border: "1px solid transparent", color: "#64748b"
              }}>
              <span className={active ? "font-medium" : ""}>{cat}</span>
              <span className="text-xs rounded px-1.5 py-0.5" style={{ background: "rgba(255,255,255,0.04)", color: "#334155" }}>{counts[cat]}</span>
            </button>
          );
        })}

        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="px-2.5 py-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-0.5">
              <Ico.Layers />
              <p className="text-xs text-slate-400 font-medium">Canvas</p>
            </div>
            <p className="text-white font-bold text-xl leading-none">{canvas.length}</p>
            <p className="text-xs mt-0.5" style={{ color: "#334155" }}>component{canvas.length !== 1 ? "s" : ""} queued</p>
          </div>
        </div>
      </aside>

      {/* ── MAIN GRID ───────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden z-10 relative">

        <div className="px-4 py-2.5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ color: "#475569" }}><Ico.Search /></span>
            <input type="text" placeholder="Search components…" value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-slate-700" />
            {query && (
              <button onClick={() => setQuery("")} className="text-slate-600 hover:text-slate-400 transition-colors"><Ico.X /></button>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#334155" }}>
            <Ico.Sparkle />
            <span>{filtered.length} shown</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2" style={{ color: "#334155" }}>
              <Ico.Search />
              <p className="text-sm">No components match "{query}"</p>
              <button onClick={() => setQuery("")} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Clear search</button>
            </div>
          ) : (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {filtered.map(comp => {
                const selected = inCanvas(comp.id);
                const showCode = !!codeView[comp.id];
                const isCopied = copied === comp.id;
                return (
                  <div key={comp.id} className="rounded-xl overflow-hidden flex flex-col transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: selected ? "1px solid rgba(99,102,241,0.55)" : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: selected ? "0 0 24px rgba(99,102,241,0.12)" : "none",
                    }}>

                    <div className="relative flex items-center justify-center min-h-32 p-5 overflow-hidden"
                      style={{
                        background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.25) 100%)",
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.25) 100%), radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "100% 100%, 18px 18px",
                      }}>
                      {showCode ? (
                        <div className="w-full h-full overflow-auto">
                          <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#94a3b8", fontFamily: "'Fira Code','Cascadia Code',monospace" }}>
                            {comp.code}
                          </pre>
                        </div>
                      ) : (
                        <comp.preview />
                      )}

                      <button onClick={() => setCodeView(prev => ({ ...prev, [comp.id]: !prev[comp.id] }))}
                        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b" }}>
                        {showCode ? <><Ico.Eye /><span>Preview</span></> : <><Ico.Code /><span>Code</span></>}
                      </button>

                      {selected && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md"
                          style={{ background: "rgba(99,102,241,0.3)", border: "1px solid rgba(99,102,241,0.5)", color: "#a5b4fc" }}>
                          <Ico.Check />
                          <span className="text-xs font-medium">Added</span>
                        </div>
                      )}
                    </div>

                    <div className="px-3 py-2.5 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-semibold truncate">{comp.name}</p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#475569" }}>{comp.desc}</p>
                        </div>
                        <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0" style={{ color: "#334155", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
                          {comp.category}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => toggleCanvas(comp.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                          style={selected ? {
                            background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.4)", color: "#a5b4fc"
                          } : {
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#64748b"
                          }}>
                          {selected ? <><Ico.Check /> In Canvas</> : <><Ico.Plus /> Add to Canvas</>}
                        </button>
                        <button onClick={() => copyCode(comp.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200"
                          style={isCopied ? {
                            background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399"
                          } : {
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569"
                          }}>
                          {isCopied ? <Ico.Check /> : <Ico.Copy />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ── CANVAS PANEL ────────────────────────────────────── */}
      <aside className="w-64 flex-shrink-0 flex flex-col z-10 relative" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>

        <div className="px-3.5 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Ico.Layers />
            Page Builder
          </div>
          {canvas.length > 0 && (
            <button onClick={() => setCanvas([])} className="flex items-center gap-1 text-xs transition-colors" style={{ color: "#334155" }}>
              <Ico.Trash /> Clear
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {canvas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Ico.Layers />
              </div>
              <p className="text-xs font-medium" style={{ color: "#475569" }}>Canvas is empty</p>
              <p className="text-xs" style={{ color: "#1e293b" }}>Add components to build your page stack</p>
            </div>
          ) : (
            canvas.map((id, idx) => {
              const comp = COMPONENTS.find(c => c.id === id);
              if (!comp) return null;
              return (
                <div key={id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg group transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="w-5 h-5 flex-shrink-0 rounded flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{comp.name}</p>
                    <p className="text-xs" style={{ color: "#334155" }}>{comp.category}</p>
                  </div>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => move(idx, -1)} disabled={idx === 0}
                      className="p-1 rounded transition-colors" style={{ color: "#475569" }}>
                      <Ico.Up />
                    </button>
                    <button onClick={() => move(idx, 1)} disabled={idx === canvas.length - 1}
                      className="p-1 rounded transition-colors" style={{ color: "#475569" }}>
                      <Ico.Down />
                    </button>
                    <button onClick={() => toggleCanvas(id)}
                      className="p-1 rounded transition-colors hover:text-red-400" style={{ color: "#475569" }}>
                      <Ico.X />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {canvas.length > 0 && (
          <div className="p-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={exportAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-xs font-semibold transition-all duration-200 active:scale-[0.98]"
              style={exportCopied ? {
                background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399"
              } : {
                background: "linear-gradient(135deg,#8b5cf6,#6366f1)"
              }}>
              {exportCopied ? <><Ico.Check /> Copied to Clipboard!</> : <><Ico.Download /> Export {canvas.length} Component{canvas.length !== 1 ? "s" : ""}</>}
            </button>
            <p className="text-center text-xs mt-1.5" style={{ color: "#1e293b" }}>Copies combined JSX to clipboard</p>
          </div>
        )}
      </aside>
    </div>
  );
}