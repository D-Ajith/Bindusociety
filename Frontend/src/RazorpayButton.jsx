const RazorpayButton = () => {
  const handleClick = () => {
    window.open("https://rzp.io/rzp/vRIXO9g", "_blank");
  };

  return (
    <div className="flex justify-center w-full py-6">
      <button
        onClick={handleClick}
        className="rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #C0006E 0%, #8b0050 100%)",
          color: "#fff",
          padding: "12px 26px",
          fontSize: "0.9rem",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          letterSpacing: 0.5,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(192,0,110,0.25)",
          minWidth: "180px",
        }}
      >
        💳 Book Your Slot
      </button>
    </div>
  );
};

export default RazorpayButton;