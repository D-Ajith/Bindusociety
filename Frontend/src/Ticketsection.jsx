import { useState, useEffect } from "react";

export default function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 600);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    const m = isMobile;

    return (
        <section
            className={`flex items-start justify-center relative overflow-hidden ${m ? "pt-3 pb-2 px-3" : "pt-5 pb-3 px-5"}`} id="ticket">
            {/* BG blobs */}


            {/* Ticket wrapper */}
            <div className="relative z-10 w-full" style={{ maxWidth: 520 }}>

                {/* ── TICKET CARD ── */}
                <div className="rounded-2xl overflow-hidden" >

                    {/* HEADER */}
                    <div
                        className="relative overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, #C0006E 0%, #8b0050 60%, #5a0033 100%)",
                            padding: m ? "14px 16px 12px" : "20px 28px 16px",

                        }}
                    >
                        {/* Decorative rings */}
                        {[80, 130, 190, 260].map((size, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: size, height: size,
                                    top: -(20 + i * 20), right: -(20 + i * 20),
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            />
                        ))}

                        {/* Badge */}
                        <div className="flex items-center gap-2 relative z-10" style={{ marginBottom: 6 }}>

                        </div>

                        {/* Title */}
                        <h1 className="relative z-10" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: m ? "1.35rem" : "1.9rem", color: "#fff", lineHeight: 1.2, letterSpacing: -0.5, margin: 0 }}>
                            🌸 Maghuvotsavam 2026
                        </h1>
                        <p className="relative z-10" style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.72rem" : "0.85rem", color: "rgba(255,255,255,0.72)", marginTop: 6, marginBottom: 0 }}>
                            ICONIC INTERNATIONAL WOMEN’ S DAY AWARD CEREMONY
                        </p>
                    </div>

                    {/* TEAR LINE */}
                    <div className="relative flex items-center" style={{ height: 0 }}>
                        <div className="absolute rounded-full z-10" style={{ left: -14, width: 28, height: 28, background: "#1a0a12" }} />
                        <div className="absolute rounded-full z-10" style={{ right: -14, width: 28, height: 28, background: "#1a0a12" }} />
                        <div className="w-full" style={{ borderTop: "2px dashed #f0c0d8", marginLeft: 14, marginRight: 14 }} />
                    </div>

                    {/* BODY */}
                    <div style={{ background: "#fff8fc", padding: m ? "14px 14px" : "20px 26px" }}>

                        {/* Registration Kit */}
                        <div
                            className="rounded-xl"
                            style={{ background: "#fff", border: "1px solid #f5d6e8", padding: m ? "12px 14px" : "16px 20px", marginBottom: 18, boxShadow: "0 2px 10px rgba(192,0,110,0.07)" }}
                        >
                            <p
                                className="flex items-center"
                                style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: m ? "0.7rem" : "0.82rem", color: "#1a0a12", textTransform: "uppercase", letterSpacing: 1, gap: 6, margin: "0 0 10px" }}
                            >
                                <span style={{ fontSize: "1rem" }}>🎁</span> Registration Kit Includes
                            </p>
                            <div className="flex flex-wrap" style={{ gap: m ? 8 : 12 }}>
                                {[{ icon: "🍿", label: "Snacks" }, { icon: "🍱", label: "Lunch" }].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center rounded-lg"
                                        style={{ gap: 6, background: "rgba(192,0,110,0.06)", border: "1px solid rgba(192,0,110,0.15)", padding: m ? "6px 12px" : "7px 16px" }}
                                    >
                                        <span style={{ fontSize: m ? "1rem" : "1.1rem" }}>{item.icon}</span>
                                        <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: m ? "0.7rem" : "0.82rem", color: "#C0006E" }}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ borderTop: "1px dashed #f0c0d8", marginBottom: 18 }} />

                        {/* Fee + CTA */}
                        <div
                            className="flex items-center justify-center flex-wrap"
                            style={{
                                gap: 18,
                                textAlign: "center",
                                flexDirection: m ? "column" : "row"
                            }}
                        >
                            <div>
                                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.6rem" : "0.7rem", color: "#7a4060", fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
                                    Registration Fee
                                </p>
                                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "1.5rem" : "2rem", fontWeight: 800, color: "#C0006E", lineHeight: 1, marginTop: 2 }}>
                                    ₹599
                                    <span style={{ fontSize: m ? "0.75rem" : "0.9rem", fontWeight: 500, color: "#7a4060" }}>/person</span>
                                </p>
                            </div>

                            {/* 🔗 Replace href with your Razorpay link */}
                            <a
                                href="https://rzp.io/rzp/vRIXO9g"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center rounded-xl no-underline transition-all duration-150 hover:-translate-y-0.5"
                                style={{
                                    gap: 8,
                                    background: "linear-gradient(135deg, #C0006E 0%, #8b0050 100%)",
                                    color: "#fff",
                                    padding: m ? "12px 22px" : "15px 32px",
                                    fontSize: m ? "0.82rem" : "0.95rem",
                                    fontFamily: "'Poppins',sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: 0.5,
                                    textDecoration: "none",
                                }}
                            >
                                💳 Pay &amp; Register
                            </a>
                        </div>

                    </div>{/* /BODY */}

                    {/* FOOTER STRIP */}
                    <div
                        className="flex items-center justify-between flex-wrap"
                        style={{ background: "linear-gradient(135deg, #2d0a1e 0%, #C0006E 100%)", padding: m ? "10px 16px" : "12px 32px", gap: 6 }}
                    >
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.55rem" : "0.65rem", color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: 1 }}>
                            NON-TRANSFERABLE · ONE-TIME USE
                        </span>
                        <div className="flex" style={{ gap: 4 }}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="rounded-full" style={{ width: 5, height: 5, background: i % 2 === 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)" }} />
                            ))}
                        </div>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: m ? "0.55rem" : "0.65rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                            Secured via Razorpay
                        </span>
                    </div>

                </div>{/* /TICKET CARD */}

                {/* Caption */}
                <p className="text-center mt-2" style={{ fontFamily: "'Poppins',sans-serif", color: "#8B0049", fontSize: m ? "0.6rem" : "0.7rem", letterSpacing: 1 }}>
                    Spots are limited · Register before they're gone
                </p>

            </div>{/* /wrapper */}

            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </section>
    );
}