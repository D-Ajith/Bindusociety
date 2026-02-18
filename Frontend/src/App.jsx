import { useState, useEffect, useRef } from "react";
import Terms from "./Terms";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
if (!document.getElementById("gf")) {
  const l = document.createElement("link");
  l.id = "gf"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Poppins:wght@300;400;500;600;700;800&family=Great+Vibes&display=swap";
  document.head.appendChild(l);
}

/* ─── Palette ───────────────────────────────────────────────────────────────── */
const C = {
  magenta: "#C0006E",
  deep: "#8B0049",
  pink: "#ffe3e7",
  purple: "#6B0072",
  white: "#FFFFFF",
  off: "#FFF9FC",
  gray: "#F7F0F5",
  gold: "#D4AF37",
  dark: "#2D0A1F",
  mid: "#5a3048",
};

/* ─── useIsMobile ───────────────────────────────────────────────────────────── */
const useIsMobile = () => {
  const [v, set] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => set(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return v;
};

/* ─── Shared helpers ────────────────────────────────────────────────────────── */
const Arrow = () => (
  <svg width="24" height="16" viewBox="0 0 28 20" fill="none" style={{ flexShrink: 0 }}>
    <polygon points="0,10 20,0 20,7 28,7 28,13 20,13 20,20" fill={C.magenta} />
  </svg>
);

const SH = ({ children, center = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, justifyContent: center ? "center" : "flex-start" }}>
    {!center}
    <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(1.1rem,2.8vw,1.7rem)", color: C.dark, margin: 0 }}>{children}</h2>
    {center}
  </div>
);

const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px auto", maxWidth: 220 }}>
    <div style={{ flex: 1, height: 2, background: C.magenta, opacity: 0.3 }} />
    <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.magenta }} />
    <div style={{ flex: 1, height: 2, background: C.magenta, opacity: 0.3 }} />
  </div>
);

/* tag pill */
const Tag = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.magenta}0F`, border: `1px solid ${C.magenta}22`, borderRadius: 50, padding: "4px 13px", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "0.76rem", color: C.deep }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.magenta, flexShrink: 0, display: "inline-block" }} />{children}
  </span>
);

/* ═══════════════════════════════════════════════════════════════════════════
   NAV — hamburger on mobile, inline links on desktop
   ═══════════════════════════════════════════════════════════════════════════ */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const m = useIsMobile();
  const ref = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  useEffect(() => { document.body.style.overflow = open && m ? "hidden" : ""; }, [open, m]);

  const links = ["About", "Program", "Highlights", "Sponsorship", "Contact"];
  const go = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <>
      <nav style={{
        position: "fixed", inset: "0 0 auto", zIndex: 300,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? `0 2px 20px rgba(192,0,110,0.12)` : "none",
        transition: "background .3s, box-shadow .3s",
        padding: m ? "10px 16px" : "12px clamp(24px,5vw,60px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="https://res.cloudinary.com/dcnwphnzn/image/upload/v1771322963/502984340_17844445962497801_1109855258096356854_n.jpg_zj71e9.jpg" alt="Bindu Logo"
            style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(0.85rem,2vw,1rem)", color: scrolled || open ? C.magenta : C.deep }}>Bindu Society</span>
        </div>

        {/* Desktop links */}
        {!m && (
          <div style={{ display: "flex", gap: "clamp(16px,3vw,32px)" }}>
            {links.map(l => (
              <button key={l} onClick={() => go(l)} style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "0.88rem", color: scrolled ? C.deep : C.dark, background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", padding: "4px 0", opacity: .84, transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = C.magenta; e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderBottomColor = C.magenta; }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? C.deep : C.dark; e.currentTarget.style.opacity = ".84"; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >{l}</button>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {m && (
          <button onClick={() => setOpen(p => !p)} aria-label="Toggle menu"
            style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg,${C.deep},${C.magenta})`, border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: open ? 0 : 5, padding: 0, flexShrink: 0 }}>
            {open
              ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="2" y1="2" x2="14" y2="14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /><line x1="14" y1="2" x2="2" y2="14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></svg>
              : <><span style={{ width: 20, height: 2.5, background: "#fff", borderRadius: 2 }} /><span style={{ width: 14, height: 2.5, background: "#fff", borderRadius: 2, alignSelf: "flex-end", marginRight: 5 }} /><span style={{ width: 20, height: 2.5, background: "#fff", borderRadius: 2 }} /></>}
          </button>
        )}
      </nav>

      {/* Overlay */}
      {m && <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 290, background: "rgba(0,0,0,0.45)", opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition: "opacity .3s" }} />}

      {/* Drawer */}
      {m && (
        <div ref={ref} style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 295, width: "76vw", maxWidth: 300, background: C.white, transform: open ? "translateX(0)" : "translateX(110%)", transition: "transform .35s cubic-bezier(.4,0,.2,1)", boxShadow: open ? "-8px 0 40px rgba(192,0,110,0.18)" : "none", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ background: `linear-gradient(135deg,${C.deep},${C.magenta})`, padding: "56px 22px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <img src="https://res.cloudinary.com/dcnwphnzn/image/upload/v1771322963/502984340_17844445962497801_1109855258096356854_n.jpg_zj71e9.jpg" alt="Logo" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: C.white }}>Bindu Society</span>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.72)", textAlign: "center" }}>International Women's Day Celebrations</span>
          </div>
          <div style={{ flex: 1, padding: "8px 0" }}>
            {links.map((l, i) => (
              <button key={l} onClick={() => go(l)} style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", background: "none", border: "none", padding: "15px 22px", cursor: "pointer", borderBottom: i < links.length - 1 ? `1px solid ${C.magenta}10` : "none", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = `${C.magenta}0C`}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: `linear-gradient(135deg,${C.magenta},${C.purple})`, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "0.95rem", color: C.dark }}>{l}</span>
                <span style={{ marginLeft: "auto", color: C.magenta, fontSize: "1rem" }}>›</span>
              </button>
            ))}
          </div>
          <div style={{ padding: "14px 20px", borderTop: `1px solid ${C.magenta}12`, background: C.gray, textAlign: "center" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "0.7rem", color: C.magenta, margin: "0 0 3px" }}>📅 March 07, 2026 • 9 AM – 1 PM</p>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.65rem", color: C.mid, margin: 0 }}>VMRDA Children's Arena, Visakhapatnam</p>
          </div>
        </div>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */
const Hero = () => {
  const [vis, setVis] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section id="home" style={{ background: `linear-gradient(160deg,${C.off} 0%,#ffe3e7 45%,#f9d0eb 100%)`, minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 25px" }}>

      {/* Top bar */}
      <div style={{ width: "100%", height: 7, background: `linear-gradient(90deg,${C.deep},${C.magenta})` }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: m ? "70px 18px 16px" : "clamp(36px,7vw,60px) clamp(24px,8vw,80px)", width: "100%", maxWidth: 640, boxSizing: "border-box", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(26px)", transition: "opacity .8s,transform .8s" }}>

        {/* Logo img */}
        <img src="https://res.cloudinary.com/dcnwphnzn/image/upload/v1771322963/502984340_17844445962497801_1109855258096356854_n.jpg_zj71e9.jpg" alt="Bindu Society Logo"
          style={{ width: m ? 84 : 110, height: m ? 84 : 110, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px", display: "block" }} />

        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.9rem" : "clamp(1rem,2.6vw,1.25rem)", color: C.dark, margin: "0 0 2px", letterSpacing: 3, textTransform: "uppercase" }}>BINDU SOCIETY</p>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: m ? "0.75rem" : "0.88rem", color: C.mid, margin: "0 0 16px" }}>Presents</p>

        {/* Title card */}
        <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 16, padding: m ? "14px" : "22px 34px", backdropFilter: "blur(8px)", boxShadow: "0 4px 22px rgba(192,0,110,0.11)", border: `1px solid rgba(192,0,110,0.13)`, marginBottom: 16 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: m ? "1.85rem" : "clamp(1.9rem,5.5vw,3rem)", background: `linear-gradient(90deg,${C.deep},${C.magenta})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 2px", lineHeight: 1.1 }}>International</h1>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: m ? "1.85rem" : "clamp(1.9rem,5.5vw,3rem)", background: `linear-gradient(90deg,${C.deep},${C.magenta})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 2px", lineHeight: 1.1 }}>Women's Day</h1>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: m ? "0.72rem" : "clamp(0.78rem,1.8vw,1rem)", color: C.deep, margin: "0 0 14px", letterSpacing: 4, textTransform: "uppercase" }}>CELEBRATIONS</p>
          {/* Maghuvotsavam pill */}
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontStyle: "italic", fontSize: m ? "1.15rem" : "clamp(1.2rem,4vw,2rem)", color: "#AF0062", margin: 0 }}>Maghuvotsavam</h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.48rem" : "0.7rem", color: "#AF0062", margin: 0, letterSpacing: 3, textTransform: "uppercase" }}>ICONIC AWARD CEREMONY</p>

        </div>

        {/* Chief Guest */}
        <p style={{ fontFamily: "'Poppins',sans-serif", fontStyle: "italic", fontSize: m ? "0.74rem" : "0.9rem", color: C.mid, margin: "0 0 10px" }}>In The Presence of</p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, marginBottom: 18 }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7eexWoy0_UFqW7RnnafAU6Up_I_oFkmRE6HVEGtfOCsnqFh7YnMFQeZ1N09e3byc-iDHt1hVY9sEZLv6QgR_o3REao80Z_fFgrAfX2A&s=10" alt="Chief Guest Smt. Vangalapudi Anitha"
            style={{ width: m ? 108 : 144, height: m ? 108 : 144, borderRadius: "50%", objectFit: "cover" }} />

          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 900, fontSize: m ? "0.9rem" : "1.2rem", color: "#a20f40", letterSpacing: 2, textTransform: "uppercase" }}>✦ CHIEF GUEST ✦</span>

          <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: m ? "0.95rem" : "clamp(0.98rem,2.5vw,1.3rem)", color: C.dark, margin: 0 }}>Smt. Vangalapudi Anitha</p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.66rem" : "0.78rem", color: C.mid, margin: "-4px 0 0" }}>(Hon'ble Home Minister, Government of Andhra Pradesh)</p>
        </div>

        {/* Event info */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: m ? 8 : 16, background: C.white, borderRadius: 12, padding: m ? "11px 12px" : "15px 26px", boxShadow: "0 4px 18px rgba(192,0,110,0.11)", marginBottom: 12 }}>
          {[{ t: "SATURDAY" }, { t: "MARCH 07, 2026", sep: true }, { t: "9 AM – 1 PM" }].map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {d.sep && <div style={{ width: 1, height: 26, background: C.pink, marginRight: 4 }} />}
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.67rem" : "0.86rem", color: C.dark }}>{d.t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: `${C.magenta}15`, borderRadius: 10, padding: m ? "9px 13px" : "12px 20px", border: `1px solid ${C.magenta}24` }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.76rem" : "0.94rem", color: C.magenta, margin: 0, textTransform: "uppercase" }}>VMRDA Children's Arena</p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.63rem" : "0.78rem", color: C.mid, margin: "3px 0 0" }}>Siripuram, Visakhapatnam, Andhra Pradesh</p>
        </div>
      </div>

      {/* Wave */}
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════════════════ */
const About = () => {
  const m = useIsMobile();
  return (
    <section id="about" style={{ background: C.white, padding: m ? "36px 16px" : "clamp(44px,7vw,76px) clamp(20px,7vw,76px)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        {/* Society card */}
        <div style={{ background: `linear-gradient(135deg,${C.off},#fff)`, borderRadius: 16, padding: m ? "18px 14px" : "clamp(20px,4vw,36px)", marginBottom: 20, boxShadow: "0 4px 24px rgba(192,0,110,0.07)", border: `1px solid ${C.magenta}13` }}>
          <SH>About Bindu Society</SH>
          <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: m ? 14 : 24, alignItems: "flex-start" }}>
            <img src="https://res.cloudinary.com/dcnwphnzn/image/upload/v1771322963/502984340_17844445962497801_1109855258096356854_n.jpg_zj71e9.jpg" alt="Bindu Society"
              style={{ width: m ? 64 : 90, height: m ? 64 : 90, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: m ? "0.79rem" : "0.92rem", color: C.mid, lineHeight: 1.78, margin: "0 0 14px" }}>
                Bindu Women Entrepreneur Society empowers women through mentoring, MSME support, expos, and networking, with <strong>300+ members</strong> growing businesses via BBH – Building Business Hub.
              </p>


              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["300+ Members", "Mentoring", "MSME Support", "Networking", "BBH Hub"].map(t => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Founder card */}
        <div style={{ background: `linear-gradient(135deg,#fff9fc,#fff0f8)`, borderRadius: 16, padding: m ? "18px 14px" : "clamp(20px,4vw,36px)", boxShadow: "0 4px 24px rgba(192,0,110,0.07)", border: `1px solid ${C.magenta}13` }}>
          <SH>About The Founder – Srmt. Hima Bindu</SH>
          <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: m ? 14 : 24, alignItems: "flex-start" }}>
            <img src="/images/founder.jpg" alt="Srmt. Hima Bindu – Founder"
              style={{ width: m ? 80 : 110, height: m ? 80 : 110, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: m ? "0.79rem" : "0.92rem", color: C.mid, lineHeight: 1.78, margin: "0 0 14px" }}>
                Srmt. Hima Bindu, Managing Director of iQube Business Solutions, has mentored <strong>200+ entrepreneurs</strong> and supports women and first-generation business owners through MSME guidance and business development.              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["M.A.", "200+ Guided", "MSME", "MD – iQube", "Women Advocate"].map(t => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRAM ACTIVITIES
   ═══════════════════════════════════════════════════════════════════════════ */
const Program = () => {
  const m = useIsMobile();

  const activities = [
    { name: "Cultural Performances", img: "https://i.pinimg.com/736x/1b/4e/1b/1b4e1b5dcb82602d8c2f575a21e3a2a9.jpg" },
    { name: "Tambola", img: "https://i.pinimg.com/736x/cb/06/c2/cb06c2a74466ea0f3ca3728fe0733fed.jpg" },
    { name: "Fun Games", img: "https://mbiis.in/storage/website-upload/w58z4sTE16mOyQAQlMh4sbOi9qanEcZqjRZasnsF.jpeg" },
  ];

  return (
    <section id="program" style={{ background: `linear-gradient(160deg,${C.gray} 0%,${C.off} 100%)`, padding: m ? "36px 16px" : "clamp(44px,7vw,76px) clamp(20px,7vw,76px)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <SH>Program Activities</SH>

        {/* 3 activity image cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "1fr 1fr" : "repeat(3,1fr)",
            gap: m ? 12 : "clamp(18px,2.5vw,28px)",
            marginBottom: m ? 24 : 44
          }}
        >
          {activities.map(a => (
            <div
              key={a.name}
              style={{
                background: C.white,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 6px 24px rgba(192,0,110,0.12)",
                border: `1px solid ${C.magenta}14`,
                transition: "transform .25s ease, box-shadow .25s ease",
                cursor: "pointer",

                // same card height
                height: m ? 200 : "clamp(260px,28vw,340px)",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={e => {
                if (!m) {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 36px rgba(192,0,110,0.22)";
                }
              }}
              onMouseLeave={e => {
                if (!m) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(192,0,110,0.12)";
                }
              }}
            >
              {/* IMAGE - takes most space */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: m ? 155 : "clamp(210px,23vw,280px)",
                  overflow: "hidden"
                }}
              >
                <img
                  src={a.img}
                  alt={a.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .4s ease, filter .3s ease"
                  }}

                  // hover zoom
                  onMouseEnter={e => !m && (e.currentTarget.style.transform = "scale(1.12)")}
                  onMouseLeave={e => !m && (e.currentTarget.style.transform = "scale(1)")}

                  // 🔥 click press + flash effect
                  onMouseDown={e => {
                    e.currentTarget.style.transform = "scale(0.95)";
                    e.currentTarget.style.filter = "brightness(1.15)";
                  }}
                  onMouseUp={e => {
                    e.currentTarget.style.transform = "scale(1.12)";
                    e.currentTarget.style.filter = "brightness(1)";
                  }}

                  // mobile tap effect
                  onTouchStart={e => {
                    e.currentTarget.style.transform = "scale(0.96)";
                    e.currentTarget.style.filter = "brightness(1.1)";
                  }}
                  onTouchEnd={e => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                />

                {/* gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05))",
                    pointerEvents: "none"
                  }}
                />
              </div>


              {/* SMALL LABEL */}
              <div
                style={{
                  padding: m ? "6px 6px" : "10px 10px",
                  textAlign: "center",
                  background: C.white
                }}
              >
                <p
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 700,
                    fontSize: m ? "0.72rem" : "0.9rem",
                    color: C.dark,
                    margin: 0,
                    lineHeight: 1.2
                  }}
                >
                  {a.name}
                </p>
              </div>
            </div>
          ))}
        </div>




        {/* Saree Parampara */}
        <div
          style={{
            background: C.white,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 6px 32px rgba(192,0,110,0.12)",
            border: `1px solid ${C.magenta}14`
          }}
        >
          {/* IMAGE SECTION */}
          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",

              // 🔥 important — remove bottom curve
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }}
          >
            <img
              src="https://i.pinimg.com/1200x/69/2f/9f/692f9f29287397edf66cbf626a151eb9.jpg"
              alt="Saree Parampara"
              style={{
                width: "100%",
                height: m ? 240 : "clamp(320px,45vw,520px)",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                transition: "transform .5s ease, filter .4s ease"
              }}

              // 🔥 hover effect
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.filter = "brightness(1.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}

              // 🔥 click press effect
              onMouseDown={e => {
                e.currentTarget.style.transform = "scale(0.97)";
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = "scale(1.06)";
              }}
            />

            {/* overlay gradient */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent,rgba(0,0,0,0.85))",
                padding: m ? "22px 16px 14px" : "36px 32px 20px"
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize: m ? "1.3rem" : "clamp(1.6rem,3vw,2.4rem)",
                  color: C.white,
                  margin: 0,
                  lineHeight: 1.2
                }}
              >
                Saree Parampara
              </h3>

              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontStyle: "italic",
                  fontSize: m ? "0.75rem" : "1rem",
                  color: C.pink,
                  margin: "6px 0 0"
                }}
              >
                A Grand Showcase of Culture & Elegance
              </p>
            </div>
          </div>



          <div style={{ padding: m ? "14px" : "clamp(16px,3.5vw,30px)" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.74rem" : "0.9rem", color: C.mid, lineHeight: 1.72, borderLeft: `3px solid ${C.magenta}`, paddingLeft: 13, margin: "0 0 16px" }}>
              The event celebrates confidence, individuality, and the artistic richness of Indian traditional wear.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 10 : 18 }}>
              {[
                { title: "🏆 Awards & Recognition:", items: ["Winner", "First Runner-Up", "Second Runner-Up"], bg: `${C.magenta}0C`, bd: `${C.magenta}1C` },
                { title: "🎁 Winners Will Be Honoured With:", items: ["Memento", "Certificate", "Special Gift"], bg: `${C.gold}12`, bd: `${C.gold}26` },
              ].map((box, i) => (
                <div key={i} style={{ background: box.bg, borderRadius: 11, padding: m ? "13px" : "18px 20px", border: `1px solid ${box.bd}` }}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.75rem" : "0.9rem", color: C.deep, margin: "0 0 9px" }}>{box.title}</p>
                  {box.items.map((it, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                      <span style={{ color: C.gold, fontWeight: 700, fontSize: m ? "0.82rem" : "0.96rem" }}>★</span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: m ? "0.72rem" : "0.86rem", color: C.dark }}>{it}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, background: `${C.magenta}0A`, borderRadius: 8, padding: m ? "9px 11px" : "11px 16px", border: `1px solid ${C.magenta}16` }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontStyle: "italic", fontSize: m ? "0.67rem" : "0.82rem", color: C.deep, margin: 0 }}>📜All participants will receive a Participation Certificate as recognition
                of their involvement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   EVENT HIGHLIGHTS  (Lucky Dip + Awards)
   ═══════════════════════════════════════════════════════════════════════════ */
const Highlights = () => {
  const m = useIsMobile();

  const prizes = [
    { name: "Sofa Set", img: "https://i.pinimg.com/1200x/b7/b1/dc/b7b1dc666d5ca3facd369e604d4f9708.jpg" },
    { name: "Diamond Ring", img: "https://i.pinimg.com/736x/6e/c5/12/6ec5129e732c3b0885d333ab9bb1fe2c.jpg" },
    { name: "Silver Glass", img: "https://i.pinimg.com/736x/a0/7a/fd/a07afd490d565af24ed929433fd26bfc.jpg" },
    { name: "Wet Grinder", img: "https://i.pinimg.com/1200x/10/32/d8/1032d8e4ca079aa947bb1affdc0e40e2.jpg" },
    { name: "2 Food Coupons", img: "https://media.istockphoto.com/id/1451342089/photo/young-couple-eating-burgers-and-drinking-beer.jpg?s=612x612&w=0&k=20&c=b-fcJI1hdBJtA10f_h9KUYE-TffRnBdNgXZrOXnQ7dE=" },
    { name: "1 Gr Gold Jewellery", img: "https://i.pinimg.com/originals/13/ab/a4/13aba49945ce3ea6deccb3d67ee945ad.jpg" },
  ];

  const cats = [
    "Best Women Entrepreneur", "Social Activist", "Trainer / Mentor",
    "Outstanding Start-Up Founder", "Best Women Leader", "Arts & Skills",
    "Homepreneur", "Sports", "Fitness Trainer", "MSME Excellence",
    "Education", "Fashion Designer", "NGO Leadership",
    "Young Woman Achiever (Below 30 Years)",
  ];

  return (
    <section id="highlights" style={{ background: `linear-gradient(160deg,${C.white} 0%,#fce4f3 100%)`, padding: m ? "36px 16px" : "clamp(44px,7vw,76px) clamp(20px,7vw,76px)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* ── Mega Lucky Dip ── */}
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1.45fr", gap: m ? 18 : 26, marginBottom: m ? 24 : 44 }}>

          {/* Dip hero card */}
          <div>
            <SH>Mega Lucky Dip</SH>
            <div
              style={{
                background: C.white,
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(192,0,110,0.1)",
                border: `1px solid ${C.magenta}15`
              }}
            >
              <img
                src="https://i.pinimg.com/736x/d1/76/70/d17670c58fa9e13a89aa2aa8505225a9.jpg"
                alt="Mega Lucky Dip"
                style={{
                  width: "100%",

                  // 🔥 image occupies more card height
                  height: m ? 170 : "clamp(240px,32vw,340px)",

                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block"
                }}
              />

              <div style={{ padding: m ? "12px 13px" : "18px 20px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: m ? "0.95rem" : "1.2rem",
                    color: C.dark,
                    margin: "0 0 4px"
                  }}
                >
                  Mega Lucky Dip
                </h3>

                <p
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontStyle: "italic",
                    fontSize: m ? "0.67rem" : "0.8rem",
                    color: C.magenta,
                    margin: "0 0 6px"
                  }}
                >
                  Celebration Filled With Grand Surprises
                </p>

                <p
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: m ? "0.71rem" : "0.84rem",
                    color: C.mid,
                    margin: 0,
                    lineHeight: 1.6
                  }}
                >
                  Registered participants get exciting opportunities to win premium prizes.
                </p>
              </div>
            </div>

          </div>

          {/* Prize grid */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div>
                <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: m ? "1rem" : "1.3rem", color: C.dark, margin: 0 }}>Lucky Dip Prizes Include:</h3>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontStyle: "italic", fontSize: m ? "0.7rem" : "0.85rem", color: C.mid, margin: 0 }}>Disclaimer: Images for reference. Prizes may vary</p>
              </div>

            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: m ? "repeat(2,1fr)" : "repeat(3,1fr)",
                gap: m ? 10 : 18
              }}
            >
              {prizes.map(p => (
                <div
                  key={p.name}
                  style={{
                    background: C.white,
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 6px 22px rgba(192,0,110,0.12)",
                    border: `1px solid ${C.magenta}14`,
                    transition: "transform .25s ease, box-shadow .25s ease",
                    cursor: "pointer",

                    // 🔥 taller card
                    height: m ? 150 : 220,
                    display: "flex",
                    flexDirection: "column"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(192,0,110,0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 22px rgba(192,0,110,0.12)";
                  }}
                >
                  {/* IMAGE */}
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        width: "100%",

                        // 🔥 larger image
                        height: m ? 110 : 160,

                        objectFit: "cover",
                        display: "block",
                        transition: "transform .5s ease, filter .5s ease"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "scale(1.12)";
                        e.currentTarget.style.filter = "brightness(1.1)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.filter = "brightness(1)";
                      }}
                    />
                  </div>

                  {/* LABEL */}
                  <div
                    style={{
                      padding: m ? "8px 6px" : "12px 10px",
                      textAlign: "center"
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontWeight: 700,
                        fontSize: m ? "0.7rem" : "0.9rem",
                        color: C.dark,
                        margin: 0,
                        lineHeight: 1.3
                      }}
                    >
                      {p.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Women Shakthi Iconic Awards ── */}
        <div style={{ background: "#ffffff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 36px rgba(192,0,110,0.28)" }}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "minmax(210px,300px) 1fr" }}>

            {/* Trophy / awards image */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m ? "22px 16px 16px" : "40px 28px", borderBottom: m ? "1px solid rgba(255,255,255,0.14)" : "none", borderRight: m ? "none" : "1px solid rgba(255,255,255,0.14)", gap: 14 }}>
              <img
                src="https://wweawards.com/assets/images/experties/img3.jpg"
                alt="Women Shakthi Iconic Awards"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 14,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)"
                }}

              />
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: m ? "1rem" : "clamp(1.05rem,2.5vw,1.5rem)", color: "#A20F40", margin: 0, textAlign: "center" }}>Women Shakthi Iconic Awards</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontStyle: "italic", fontSize: m ? "0.67rem" : "0.8rem", color: "#A20F40", margin: 0, textAlign: "center" }}>Celebrating Excellence, Leadership & Impact</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.69rem" : "0.82rem", color: "#A20F40", lineHeight: 1.65, textAlign: "center", margin: 0 }}>Honouring inspiring women for excellence in entrepreneurship, leadership and service.</p>
            </div>

            {/* Categories */}
            <div style={{ padding: m ? "16px 14px" : "28px 22px" }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.75rem" : "0.9rem", color: "#A20F40", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 6 }}>⭐ Award Categories Include:</p>
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(auto-fill,minmax(160px,1fr))", gap: m ? 6 : 9 }}>
                {cats.map(cat => (
                  <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, background: "#FCF3F8", borderRadius: 7, padding: m ? "6px 8px" : "7px 11px", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <span style={{ color: "#AB2164", fontWeight: 700, fontSize: m ? "0.6rem" : "0.76rem", flexShrink: 0 }}>✦</span>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: m ? "0.6rem" : "0.74rem", color: "#AB2164" }}>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SPONSORSHIP
   ═══════════════════════════════════════════════════════════════════════════ */
// const Sponsorship = () => {
//   const m = useIsMobile();

//   const plans = [
//     { name: "Main Sponsor", price: "Rs. 2,00,000/-", benefits: ["Logo on All Brochures & Poster Promotions", "Brand Promotion (On-Ground & Digital)", "Digital Marketing Promotion", "AV Branding", "Logo on 1st & 2nd Arches", "Logo on Main Event Backdrop", "Advertisement Slot", "Brand Promotion by Event Anchor", "Memento & On-Stage Felicitation", "Dedicated Stall Allotment", "7 Free Tickets"] },
//     { name: "Co-Sponsor", price: "Rs. 1,00,000/-", benefits: ["Logo on All Brochures & Poster Promotions", "Digital Marketing Promotion", "Logo on Event Backdrop", "Brand Promotion by Event Anchor", "Memento", "Stall Allotment", "Advertisements on LED Screen", "Logo on 2nd arch", "5 Free Tickets"] },
//     { name: "Sponsor", price: "Rs. 50,000/-", benefits: ["Logo on All Brochures & Poster Promotions", "Digital Marketing Promotion", "Logo on Event Backdrop", "Brand Promotion by Event Anchor", "Memento", "Stall Allotment", "Running Advertisements During The Event", "4 Free Tickets"] },
//     { name: "Sponsor", price: "Rs. 20,000/-", benefits: ["Stall Allotment", "Logo on BackDrop"] },
//   ];

//   const why = [
//     { icon: "/images/icon-visibility.png", label: "High Brand Visibility" },
//     { icon: "/images/icon-reach.png", label: "Digital & On-Ground Reach" },
//     { icon: "/images/icon-engagement.png", label: "Direct Audience Engagement" },
//     { icon: "/images/icon-recall.png", label: "Strong Brand Recall" },
//   ];

//   return (
//     <section id="sponsorship" style={{ background: C.white, padding: m ? "36px 16px" : "clamp(44px,7vw,76px) clamp(20px,7vw,76px)" }}>
//       <div style={{ maxWidth: 1060, margin: "0 auto" }}>

//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: m ? 22 : 36 }}>
//           <div style={{ display: "inline-block", background: "#ab2164", borderRadius: 50, padding: m ? "8px 22px" : "10px 34px", boxShadow: "0 4px 16px rgba(192,0,110,0.26)", marginBottom: 9 }}>
//             <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: m ? "0.85rem" : "clamp(0.88rem,2.2vw,1.22rem)", color: C.white, letterSpacing: 1, textTransform: "uppercase" }}>SPONSORSHIP OPPORTUNITIES</span>
//           </div>
//           <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: m ? "0.74rem" : "0.9rem", color: C.mid, margin: 0 }}>Partner With Us • Elevate Your Brand</p>
//         </div>

//         {/* Plan cards */}
//         <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4,1fr)", gap: m ? 9 : 16, marginBottom: m ? 22 : 36 }}>
//           {plans.map((p, i) => (
//             <div key={i} style={{  background: "#ab2164", borderRadius: 13, overflow: "hidden", boxShadow: "0 6px 24px rgba(192,0,110,0.2)", transition: "transform .2s,box-shadow .2s", cursor: "default" }}
//               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 32px rgba(192,0,110,0.35)"; }}
//               onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(192,0,110,0.2)"; }}>
//               <div style={{ padding: m ? "11px 9px 9px" : "16px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.16)", textAlign: "center" }}>
//                 <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: m ? "0.67rem" : "0.9rem", color: C.white, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: 1 }}>{p.name}</h3>
//                 <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: m ? "0.77rem" : "1.12rem", color: C.gold }}>{p.price}</div>
//               </div>
//               <div style={{ padding: m ? "9px" : "13px 14px" }}>
//                 {p.benefits.map((b, j) => (
//                   <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 5, marginBottom: 5 }}>
//                     <span style={{ color: C.pink, fontSize: "0.5rem", flexShrink: 0, marginTop: 4 }}>●</span>
//                     <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: m ? "0.58rem" : "0.73rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{b}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Why Sponsor */}
//         <div style={{ background: `linear-gradient(135deg,${C.magenta}0D,${C.purple}0D)`, borderRadius: 13, padding: m ? "18px 14px" : "26px 30px", border: `1px solid ${C.magenta}1C` }}>
//           <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: m ? "0.84rem" : "1.02rem", color: C.deep, margin: "0 0 14px", textAlign: "center", textTransform: "uppercase", letterSpacing: 2 }}>WHY SPONSOR WITH US?</h3>
//           <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4,1fr)", gap: m ? 9 : 14 }}>
//             {why.map((w, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: C.white, borderRadius: 9, padding: m ? "9px 11px" : "13px 14px", boxShadow: "0 2px 9px rgba(192,0,110,0.07)", border: `1px solid ${C.magenta}10` }}>
//                 <img src={w.icon} alt={w.label}
//                   style={{ width: m ? 22 : 28, height: m ? 22 : 28, objectFit: "contain", flexShrink: 0 }}
//                   onError={e => e.target.style.display = "none"} />
//                 <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: m ? "0.64rem" : "0.82rem", color: C.deep }}>{w.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

/* ═══════════════════════════════════════════════════════════════════════════
   THANK YOU  /  CONTACT
   ═══════════════════════════════════════════════════════════════════════════ */
const Contact = () => {
  const m = useIsMobile();

  const sponsors = [
    { logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58e2zC5LpbnRLxU-rOmF4b05Ekd0GE-620Q&s" },
    { logo: "https://ghanmarineproducts.com/assets/logo/gmlogo.png" },
    { logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGRBH0h1sIogQ/company-logo_200_200/company-logo_200_200/0/1630474336323?e=2147483647&v=beta&t=UwSm5lLnYybuxg3vdhdELKFZe9mp5Fhjagy4xxTP-Zg" },
    { logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkmdum5O0MLrH_LxCI94Qxa5-1Aao2r8NDEg&s" },
    { logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAftd1yw25ZzY4Gvrbsxvn2iggWdG-jNaD1w&s" },
    { logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRR9Rddfxlb8Z_tPlV3d-g_6lv32flYYFSg&s" },
  ];


  const contacts = [
    { icon: "/images/icon-phone.png", text: "7997444649" },
    { icon: "/images/icon-web.png", text: "www.bindusociety.in" },
    { icon: "/images/icon-email.png", text: "bindu.womensociety@gmail.com" },
    { icon: "/images/icon-location.png", text: "VMRDA Children's Arena, Siripuram, Visakhapatnam, Andhra Pradesh" },
  ];

  /* fallback: if icon image fails to load, show a tiny colored circle */
  const fallbackIcons = ["📞", "🌐", "✉️", "📍"];

  return (
    <section id="contact" style={{ background: `linear-gradient(160deg,${C.off} 0%,#ffe3e7 100%)`, padding: m ? "36px 16px 52px" : "clamp(44px,7vw,76px) clamp(20px,7vw,76px) 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Logo */}
        <img src="https://res.cloudinary.com/dcnwphnzn/image/upload/v1771322963/502984340_17844445962497801_1109855258096356854_n.jpg_zj71e9.jpg" alt="Bindu Society"
          style={{ width: m ? 70 : 92, height: m ? 70 : 92, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px", display: "block" }} />

        {/* Thank You */}
        <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: m ? "2.8rem" : "clamp(2.8rem,7vw,4.8rem)", color: C.magenta, margin: "0 0 6px", lineHeight: 1 }}>Thank You</h2>

        <Divider />

        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.75rem" : "0.9rem", color: C.mid, lineHeight: 1.78, margin: "0 0 6px" }}>
          Bindu Women Entrepreneur Society sincerely thanks our sponsors, partners, guests, awardees, and participants for supporting this Women's Day celebration and empowering women through recognition, collaboration, and community growth.
        </p>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.77rem" : "0.92rem", color: C.deep, margin: "12px 0 2px" }}>With Gratitude</p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: m ? "0.84rem" : "0.96rem", color: C.dark, margin: "0 0 2px" }}>Bindu Women Entrepreneur Society</p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontStyle: "italic", fontSize: m ? "0.69rem" : "0.82rem", color: C.mid, margin: 0 }}>Empowering Women Through Entrepreneurship, Leadership, and Community Growth</p>
        </div>

        {/* Sponsor logo cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "repeat(3,1fr)" : "repeat(6,1fr)",
            gap: m ? 16 : 26,
            alignItems: "center",
            justifyItems: "center",
            marginBottom: 30
          }}
        >
          {sponsors.map((sp, i) => (
            <div
              key={i}
              style={{
                width: m ? 90 : 130,   // 🔥 same width for all logos
                height: m ? 50 : 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={sp.logo}
                alt="Sponsor logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "transform .25s ease, filter .25s ease"
                }}

                // hover effect
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.filter = "brightness(1.05)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1)";
                }}

                onError={e => { e.target.style.display = "none"; }}
              />
            </div>
          ))}
        </div>
        {/* Contact card */}
        <div style={{ background: C.white, borderRadius: 14, padding: m ? "16px 14px" : "26px 30px", boxShadow: "0 4px 20px rgba(192,0,110,0.09)", border: `1px solid ${C.magenta}12`, marginBottom: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 12 : 16, textAlign: "left" }}>
            {contacts.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                {/* icon image with emoji fallback */}
                <div style={{ width: m ? 30 : 36, height: m ? 30 : 36, borderRadius: "50%", flexShrink: 0, background: "#ab2164", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 2px 8px rgba(192,0,110,0.22)" }}>
                  <img src={c.icon} alt="" style={{ width: "60%", height: "60%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
                    onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = fallbackIcons[i]; }} />
                </div>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.68rem" : "0.82rem", color: C.deep, margin: 0, paddingTop: 5, lineHeight: 1.5 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Noble cause */}
        <div style={{ background: `${C.magenta}0C`, borderRadius: 9, padding: m ? "10px 13px" : "13px 22px", border: `1px solid ${C.magenta}1C` }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontStyle: "italic", fontWeight: 500, fontSize: m ? "0.69rem" : "0.82rem", color: C.deep, margin: 0 }}>"For a noble cause: Funds raised will support Bindu Society's charity initiatives"</p>
        </div>
      </div>
      <section
        style={{
          textAlign: "center",
          padding: "14px 10px",
          fontSize: "0.6rem",
          color: "#8B0049"
        }}
      >
        © 2026 Copyrights belongs to Bindu Society ·{" "}
        <a
          href="/terms"
          style={{
            color: "#6C63FF",
            textDecoration: "none",
            fontWeight: 500
          }}
        >
          Terms & Conditions
        </a>
      </section>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(90deg,${C.deep},${C.magenta})`, height: 7 }} />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ fontFamily: "'Poppins',sans-serif", overflowX: "hidden" }}>
      <BrowserRouter>
        <Routes>

          {/* Main landing page */}
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Hero />
                <Highlights />
                <Program />
                {/* <Sponsorship /> */}
                <About />
                <Contact />
              </>
            }
          />

          {/* Terms page only */}
          <Route path="/terms" element={<Terms />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}