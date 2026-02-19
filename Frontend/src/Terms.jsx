import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
    {
        id: 1,
        icon: "🏛️",
        title: "About the Event",
        content: [
            "This Terms & Conditions document governs participation in the Bindu Society International Celebrations & Iconic Award Ceremony organized by Bindu Women Entrepreneur Society at VMRDA Children's Arena, Siripuram, Visakhapatnam, Andhra Pradesh.",
            "The event includes Cultural Performances, Tambola Fun Games, Saree Parampara Showcase, Mega Lucky Dip, and Women Shakthi Iconic Awards.",
            "By registering and attending the event, all participants and attendees agree to be bound by these terms and conditions in full.",
        ],
    },
    {
        id: 2,
        icon: "📋",
        title: "Registration & Eligibility",
        content: [
            "Registration is open to women entrepreneurs, professionals, leaders, and individuals who align with the values and mission of Bindu Women Entrepreneur Society.",
            "Participants must provide accurate personal and professional information at the time of registration. Any false or misleading information may result in disqualification.",
            "Registration is considered confirmed only upon receipt of the registration fee (if applicable) and confirmation from the event organizers.",
            "Participation in award categories is subject to eligibility criteria defined by the organizing committee for each respective award.",
        ],
    },
    {
        id: 3,
        icon: "🏆",
        title: "Women Shakthi Iconic Awards",
        content: [
            "Award categories include: Best Women Entrepreneur, Social Activist, Trainer/Mentor, Outstanding Start-Up Founder, Best Women Leader, Arts & Skills, Homepreneur, Sports, Fitness Trainer, MSME Excellence, Education, Fashion Designer, NGO Leadership, and Young Woman Achiever (Below 30 Years).",
            "Nominees and awardees are selected by the Bindu Society organizing committee and jury panel. Their decisions are final and binding.",
            "Self-nomination and nomination by others are both accepted, subject to submission of the required documentation and meeting the stated eligibility criteria.",
            "Award winners will be honored with a Memento, Certificate, and Special Gift. All participants will receive a Participation Certificate.",
        ],
    },
    {
        id: 4,
        icon: "👗",
        title: "Saree Parampara – Showcase Rules",
        content: [
            "The Saree Parampara event celebrates confidence, individuality, and the artistic richness of Indian traditional wear. All participants must wear traditional Indian sarees.",
            "Award positions include Winner, First Runner-Up, and Second Runner-Up, each receiving a Memento, Certificate, and Special Gift.",
            "Participants agree to conduct themselves with dignity and grace throughout the event. Any behavior deemed inappropriate by the organizing committee may result in disqualification.",
            "The organizing committee reserves the right to modify judging criteria or contest format without prior notice.",
        ],
    },
    {
        id: 5,
        icon: "🎰",
        title: "Tambola, Lucky Dip & Games",
        content: [
            "Tambola Fun Games and Mega Lucky Dip are open to registered participants only. Winners will be determined by draw and chance.",
            "Lucky Dip prizes are pre-determined and non-transferable. Prizes cannot be exchanged for cash or any other item.",
            "The organizing committee's decision regarding winners and prize distribution is final and no correspondence will be entertained.",
            "Participants must be present at the time of the draw to claim their prizes. Prizes unclaimed on the day of the event will be forfeited.",
        ],
    },
    {
        id: 6,
        icon: "📸",
        title: "Photography & Media",
        content: [
            "The event will be photographed and/or videographed for promotional and archival purposes by Bindu Society.",
            "By attending the event, all participants and attendees grant Bindu Women Entrepreneur Society the right to use their photographs, videos, and likenesses in promotional materials, social media, publications, and future event communications.",
            "If you do not wish to be photographed, please notify the event management team prior to the event.",
        ],
    },
    {
        id: 7,
        icon: "🔒",
        title: "Privacy & Data Protection",
        content: [
            "Bindu Women Entrepreneur Society collects personal information for the sole purpose of event registration, communication, and award coordination.",
            "Participant data will not be sold, rented, or shared with third parties without prior consent, except where required by law.",
            "Contact information may be used to share updates about future Bindu Society events, programs, and MSME initiatives unless the participant opts out.",
        ],
    },
    {
        id: 8,
        icon: "❌",
        title: "Cancellation & Refund Policy",
        content: [
            "Registration fees, if applicable, are non-refundable once payment is confirmed.",
            "In the event of cancellation or postponement of the event due to unforeseen circumstances (including natural calamities, governmental restrictions, or force majeure), Bindu Society will notify participants and explore options for rescheduling.",
            "Bindu Society shall not be liable for any travel, accommodation, or other expenses incurred by participants in the event of cancellation or postponement.",
        ],
    },
    {
        id: 9,
        icon: "⚖️",
        title: "Code of Conduct",
        content: [
            "All participants, attendees, and guests are expected to maintain a respectful, inclusive, and professional environment throughout the event.",
            "Discrimination, harassment, or behavior that is disruptive or offensive will result in immediate removal from the event premises.",
            "Participants must comply with all venue rules and regulations at VMRDA Children's Arena, Siripuram, Visakhapatnam.",
            "Bindu Society reserves the right to remove any individual from the event without refund if they violate the code of conduct.",
        ],
    },
    
];

const C = {
    darkPink: "#8B0049",   
    midPink: "#C2185B",   
    accentPink: "#E91E8C",  
    softPink: "#F8BBD9",   
    lightPink: "#FCE4EC",   
    palePink: "#FFF0F6",   
    white: "#FFFFFF",
    deepText: "#4A0028",   
    mutedText: "#8B4060",   
};

export default function Terms() {
    const [openSection, setOpenSection] = useState(null);
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const toggle = (id) => setOpenSection(openSection === id ? null : id);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: `linear-gradient(160deg, ${C.palePink} 0%, ${C.lightPink} 55%, #FDE8F0 100%)`,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: C.deepText,
                overflowX: "hidden",
            }}
        >

            <header
                style={{
                    textAlign: "center",
                    padding: "3rem 1.5rem 2rem",
                    position: "relative",
                    background: `linear-gradient(180deg, rgba(139,0,73,0.05) 0%, transparent 100%)`,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "420px",
                        height: "420px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, rgba(194,24,91,0.09) 0%, transparent 70%)`,
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        display: "inline-block",
                        background: C.white,
                        border: `1.5px solid ${C.darkPink}`,
                        borderRadius: "4px",
                        padding: "0.4rem 1.2rem",
                        fontSize: "0.72rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: C.darkPink,
                        marginBottom: "1.2rem",
                        fontWeight: "700",
                        boxShadow: `0 2px 12px rgba(139,0,73,0.13)`,
                    }}
                >
                    Bindu Women Entrepreneur Society
                </div>

                <h1
                    style={{
                        fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                        fontWeight: "700",
                        background: `linear-gradient(135deg, ${C.darkPink}, ${C.accentPink}, ${C.midPink})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: "0 0 0.5rem",
                        lineHeight: 1.2,
                    }}
                >
                    Terms & Conditions
                </h1>

                <h2
                    style={{
                        fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
                        fontWeight: "400",
                        color: C.mutedText,
                        letterSpacing: "0.08em",
                        margin: "0 0 1.5rem",
                    }}
                >
                    International Celebrations & Iconic Award Ceremony
                </h2>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: C.midPink,
                        fontSize: "0.85rem",
                        fontWeight: "500",
                    }}
                >
                    <span>📍</span>
                    <span>VMRDA Children's Arena, Siripuram, Visakhapatnam</span>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "2rem",
                    }}
                >
                    <div style={{ height: "1px", width: "80px", background: `linear-gradient(90deg, transparent, ${C.darkPink})` }} />
                    <span style={{ color: C.darkPink, fontSize: "1.2rem" }}>✦</span>
                    <div style={{ height: "1px", width: "80px", background: `linear-gradient(90deg, ${C.darkPink}, transparent)` }} />
                </div>
            </header>

            <div style={{ maxWidth: "860px", margin: "0 auto 2.5rem", padding: "0 1.5rem" }}>
                <div
                    style={{
                        background: C.white,
                        border: `1px solid ${C.softPink}`,
                        borderLeft: `4px solid ${C.darkPink}`,
                        borderRadius: "8px",
                        padding: "1.2rem 1.5rem",
                        fontSize: "0.92rem",
                        lineHeight: "1.75",
                        color: C.deepText,
                        boxShadow: `0 2px 16px rgba(139,0,73,0.07)`,
                    }}
                >
                    Please read these Terms and Conditions carefully before participating in or attending the Bindu Society International Celebrations & Iconic Award Ceremony. By registering or attending, you agree to comply with all terms listed herein.
                </div>
            </div>

            <main style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
                {sections.map((section, idx) => (
                    <div
                        key={section.id}
                        style={{
                            marginBottom: "0.75rem",
                            border: `1px solid ${openSection === section.id ? C.midPink : C.softPink}`,
                            borderRadius: "10px",
                            overflow: "hidden",
                            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                            background: openSection === section.id
                                ? `linear-gradient(135deg, rgba(139,0,73,0.04), ${C.white})`
                                : C.white,
                            boxShadow: openSection === section.id
                                ? `0 4px 20px rgba(139,0,73,0.12)`
                                : `0 1px 6px rgba(139,0,73,0.05)`,
                        }}
                    >
                        <button
                            onClick={() => toggle(section.id)}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "1.1rem 1.4rem",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                textAlign: "left",
                                gap: "1rem",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                                <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{section.icon}</span>
                                <span
                                    style={{
                                        fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
                                        fontWeight: "600",
                                        color: openSection === section.id ? C.darkPink : C.deepText,
                                        letterSpacing: "0.02em",
                                        transition: "color 0.3s",
                                    }}
                                >
                                    {idx + 1}. {section.title}
                                </span>
                            </div>
                            <span
                                style={{
                                    flexShrink: 0,
                                    width: "28px",
                                    height: "28px",
                                    border: `1.5px solid ${openSection === section.id ? C.darkPink : C.softPink}`,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: openSection === section.id ? C.darkPink : C.midPink,
                                    fontSize: "1.1rem",
                                    transition: "transform 0.3s ease, border-color 0.3s, color 0.3s, background 0.3s",
                                    transform: openSection === section.id ? "rotate(45deg)" : "rotate(0deg)",
                                    background: openSection === section.id ? C.lightPink : "transparent",
                                }}
                            >
                                +
                            </span>
                        </button>

                        {openSection === section.id && (
                            <div
                                style={{
                                    padding: "0 1.4rem 1.4rem",
                                    borderTop: `1px solid ${C.softPink}`,
                                }}
                            >
                                <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
                                    {section.content.map((point, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                display: "flex",
                                                gap: "0.75rem",
                                                marginBottom: i < section.content.length - 1 ? "0.85rem" : 0,
                                                fontSize: "0.9rem",
                                                lineHeight: "1.75",
                                                color: C.deepText,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: C.darkPink,
                                                    flexShrink: 0,
                                                    marginTop: "0.42rem",
                                                    fontSize: "0.45rem",
                                                }}
                                            >
                                                ◆
                                            </span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}



                <div
                    style={{
                        marginTop: "2rem",
                        textAlign: "center",
                        fontSize: "0.78rem",
                        color: C.mutedText,
                        lineHeight: "1.6",
                    }}
                >
                    <p>For queries, contact Bindu Women Entrepreneur Society</p>
                   
                </div>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginBottom: "20px",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#BB106C",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    ← Back
                </button>
            </main>

           
        </div>
    );
}