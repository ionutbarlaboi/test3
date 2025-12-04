"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(30,30,30,0.95)",
        color: "white",
        padding: "15px 20px",
        borderRadius: "12px",
        maxWidth: "95%",
        width: "400px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "14px" }}>
        Folosim cookies pentru a personaliza conținutul și reclamele. Continuând,
        accepți utilizarea lor.
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={rejectCookies}
          style={{
            background: "gray",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Refuz
        </button>

        <button
          onClick={acceptCookies}
          style={{
            background: "#4CAF50",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
