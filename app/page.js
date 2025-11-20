"use client";

import Image from "next/image";

export default function HomePage() {
  // 🔧 Setări ajustabile
  const cartoonWidth = 400;
  const cartoonHeight = 200;
  const startButtonOffset = 80; // distanță sub imagine
  const topButtonsOffset = 100; // distanță de sus (poți modifica)
  const buttonsGap = 20;

  return (
    <main
      style={{
        height: "85dvh", // ✅ folosește dynamic viewport height (corect pe mobil)
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        textAlign: "center",
        overflow: "hidden", // ✅ taie orice depășire
        position: "relative",
      }}
    >
      {/* Conținut centrat */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Bara de sus (Facebook + Gmail) */}
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
          {/* Facebook */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#0070f3"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.725 0 1.325-.6 1.325-1.337V1.337C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>

          {/* Gmail */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#DB4437"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 12.713l11.985-8.713H0L12 12.713zm0 2.574l-12-8.713V21h24V6.574l-12 8.713z" />
            </svg>
          </a>
        </div>

        {/* Imaginea */}
        <Image
          src="/math-cartoon.jpg"
          alt="Caricatură matematică"
          width={cartoonWidth}
          height={cartoonHeight}
          style={{
            maxWidth: "90vw",
            height: "auto",
            objectFit: "contain",
          }}
          priority
        />

        {/* Butonul Hai să începem */}
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
  );
}
