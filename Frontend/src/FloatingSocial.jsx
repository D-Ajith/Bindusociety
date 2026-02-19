import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { SiRazorpay } from "react-icons/si";

export default function FloatingSocial() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const message =
`Hello! 

We are conducting Maghuvotsavam 2026 – International Women's Day Celebration on:

📅 Saturday, March 07, 2026  
⏰ 9 AM – 1 PM  
📍 VMRDA Children's Arena, Siripuram, Visakhapatnam  

🎉 Awards • Games • Saree Parampara • Lucky Dip Prizes  
🍱 Snacks & Lunch Included  

🎟 Registration Fee: ₹599/person  

For more details & registration, please contact us.`;
  const whatsappLink =
    "https://wa.me/917997444649?text=" + encodeURIComponent(message);

  const razorpayLink = "https://rzp.io/rzp/vRIXO9g";

  const mainSize = isMobile ? 48 : 60;
  const subSize = isMobile ? 40 : 50;
  const iconMain = isMobile ? 22 : 28;
  const iconSub = isMobile ? 18 : 22;

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? 25 : 50,
        right: 20,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: 12,
        zIndex: 999
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: mainSize,
          height: mainSize,
          borderRadius: "50%",
          background: open ? "#d90429" : "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: iconMain,
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          cursor: "pointer",
          transition: "0.3s"
        }}
      >
        {open ? <IoClose /> : <FaWhatsapp />}
      </div>

      {open && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: subSize,
            height: subSize,
            borderRadius: "50%",
            background: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: iconSub,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          <FaWhatsapp />
        </a>
      )}

      {open && (
        <a
          href="https://www.instagram.com/bindu.womensociety"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: subSize,
            height: subSize,
            borderRadius: "50%",
            background:
              "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: iconSub,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          <FaInstagram />
        </a>
      )}

      {open && (
        <a
          href={razorpayLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: subSize,
            height: subSize,
            borderRadius: "50%",
            background: "#072654",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: iconSub,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          <SiRazorpay />
        </a>
      )}
    </div>
  );
}
