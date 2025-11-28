"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
const cartoonWidth = 400;
const cartoonHeight = 200;
const startButtonOffset = 80;
const topButtonsOffset = 60;
const buttonsGap = 20;

const [showEmailBox, setShowEmailBox] = useState(false);

// Generăm poziții mai echilibrate
const randomStyle = () => ({
  position: "absolute",
  top: 5 + Math.random() * 90 + "%",
  left: 5 + Math.random() * 90 + "%",
  transform: "rotate(" + (Math.random() * 30 - 15) + "deg)",
  fontSize: 10 + Math.random() * 6 + "px",
  fontWeight: "100",
  color: "rgba(0,0,0,0.05)",
  pointerEvents: "none",
  userSelect: "none",
  whiteSpace: "nowrap",
});

return (
<>
{showEmailBox && (
<div
style={{
position: "fixed",
top: 0,
left: 0,
width: "100vw",
height: "100vh",
backgroundColor: "rgba(0,0,0,0.5)",
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex: 999,
animation: "fadeIn 0.3s",
}}
onClick={() => setShowEmailBox(false)}
>
<div
onClick={(e) => e.stopPropagation()}
style={{
padding: "20px",
borderRadius: 12,
maxWidth: "90vw",
width: "320px",
backgroundColor: "white",
textAlign: "center",
boxShadow: "0 0 10px rgba(0,0,0,0.3)",
animation: "fadeIn 0.3s",
}}
>
<p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
Vrei să ne spui ceva?
</p>
<p style={{ fontWeight: "bold", marginBottom: "20px" }}>
Scrie-ne la: xxxx@gmail.ro

</p>
<button
onClick={() => setShowEmailBox(false)}
style={{
padding: "10px 20px",
borderRadius: 8,
backgroundColor: "#003366",
color: "white",
border: "none",
cursor: "pointer",
}}
>
Închide
</button>
</div>
</div>
)}

  <main
    style={{
      height: "85vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      textAlign: "center",
      overflow: "hidden",
      position: "relative",
      opacity: 0,
      animation: "fadeIn 1s forwards",
    }}
  >
    {/* Fundal echilibrat */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      {Array.from({ length: 250 }).map((_, i) => (
        <span key={i} style={randomStyle()}>
          Matemat'IBa
        </span>
      ))}
    </div>

    {/* Conținut */}
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `-${topButtonsOffset}px`,
          right: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: `${buttonsGap}px`,
          width: `${cartoonWidth}px`,
          maxWidth: "90vw",
        }}
      >
        <button
          onClick={() => setShowEmailBox(true)}
          style={{
            width: 28,
            height: 28,
            backgroundColor: "transparent",
            border: "1px solid #DB4437",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#DB4437"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M12 12.713l11.985-8.713H0L12 12.713zm0 2.574l-12-8.713V21h24V6.574l-12 8.713z" />
          </svg>
        </button>

        <a
          href="https://www.facebook.com/profile.php?id=61584564381930"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "transparent",
            border: "1px solid #1877F2",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#1877F2"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.725 0 1.325-.6 1.325-1.337V1.337C24 .6 23.4 0 22.675 0z" />
          </svg>
        </a>
      </div>

      <Image
        src="/math-cartoon.jpg"
        alt="Caricatură matematică"
        width={cartoonWidth}
        height={cartoonHeight}
        style={{ maxWidth: "90vw", height: "auto", objectFit: "contain" }}
        priority
      />

      <button
        onClick={() => (window.location.href = "/alege-un-test")}
        style={{
          marginTop: `${startButtonOffset}px`,
          padding: "12px 28px",
          fontSize: "1.1rem",
          border: "3px solid #003366",
          borderRadius: 10,
          backgroundColor: "white",
          color: "#003366",
          cursor: "pointer",
          maxWidth: "280px",
          width: "90%",
        }}
      >
        Hai să începem
      </button>
    </div>
  </main>

  <style jsx>{`
    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }
  `}</style>
</>


);
}