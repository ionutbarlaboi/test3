"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GeometriaPage() {
  const [capitole, setCapitole] = useState([]);

  useEffect(() => {
    fetch("/data/geometrie.json")
      .then(res => res.json())
      .then(data => setCapitole(data.capitole || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0rem" }}>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#000000",
          textDecoration: "underline",
          marginBottom: "0.5rem",
          marginTop: "0rem",
          textAlign: "center",
        }}
      >
        Geometrie
      </h2>

      {capitole.map((c, index) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #0070f3",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "#f9f9f9",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Titlu + subcapitole + teste */}
          <div style={{ flex: 1, textAlign: "left" }}>
            {/* Titlu principal */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "0.3rem",
              }}
            >
              {index + 1}. {c.titlu}
            </div>

            {/* Subcapitole */}
            {c.subtitlu && c.subtitlu.length > 0 && (
              <div style={{ marginLeft: "1rem", marginBottom: "0.4rem" }}>
                {c.subtitlu.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      lineHeight: "1.4",
                      color: "#222",
                    }}
                  >
                    {index + 1}.{subIndex + 1} {sub}
                  </div>
                ))}
              </div>
            )}

            {/* Teste */}
            {c.teste && c.teste.length > 0 && (
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0rem",
                }}
              >
                {c.teste.map((t, idx) => (
                  <Link
                    key={idx}
                    href={`/teorie/geometrie/tests${t}`}
                    style={{
                      display: "inline-block",
                      padding: "5px 10px",
                      border: "1px solid #003366",
                      borderRadius: "6px",
                      background: "#fff",
                      color: "#003366",
                      textDecoration: "none",
                      fontSize: "14px",
                      marginLeft: idx === 11 ? "10px" : "20px",
                    }}
                  >
                    Testul {idx + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Carte din dreapta – neschimbată */}
          <Link
            href={c.link || "#"}
            style={{
              display: "inline-block",
              width: "60px",
              height: "50px",
              cursor: "pointer",
              perspective: "200px",
            }}
          >
            <div
              className="book"
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 0.2s",
              }}
            >
              <div
                className="cover-left"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `url('/carte.png') no-repeat center/cover`,
                  borderRadius: "6px",
                  transformOrigin: "left",
                  zIndex: 2,
                  transition: "transform 0.2s",
                }}
              ></div>
            </div>

            <style jsx>{`
              .book:hover {
                transform: scale(1.2);
              }
              .cover-left:hover {
                transform: rotateY(-12deg);
              }
            `}</style>
          </Link>
        </div>
      ))}

      {/* Butoane dev */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/creare-teste-teorie")
            }
            style={{
              fontSize: "14px",
              padding: "5px 10px",
              border: "1px solid gray",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Creare Teste Teorie
          </button>

          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/creare-teorie")
            }
            style={{
              fontSize: "14px",
              padding: "5px 10px",
              border: "1px solid gray",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Creare Teorie
          </button>
        </div>
      )}

      {/* Înapoi */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "14px",
            border: "1px solid #003366",
            padding: "5px 10px",
            borderRadius: "6px",
            color: "#003366",
            textDecoration: "none",
          }}
        >
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  );
}
