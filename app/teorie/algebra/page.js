"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AlgebraPage() {
  const [capitole, setCapitole] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/algebra.json")
      .then((res) => res.json())
      .then((data) => setCapitole(data.capitole || []))
      .catch((err) => console.error(err));
  }, []);

  const indexToLetter = (i) => String.fromCharCode(97 + i);

  const normalize = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredCapitole = capitole.filter((c) => {
    const term = normalize(search);
    if (normalize(c.titlu).includes(term)) return true;

    const subtitluri = Object.keys(c)
      .filter((k) => k.startsWith("subtitlu-"))
      .flatMap((k) =>
        c[k].map((s) => (typeof s === "string" ? s : s.titlu))
      );
    if (subtitluri.some((s) => normalize(s).includes(term))) return true;

    const subsubtitluri = Object.keys(c)
      .filter((k) => k.startsWith("sub-subtitlu-"))
      .flatMap((k) => c[k] || []);
    if (subsubtitluri.some((s) => normalize(s).includes(term))) return true;

    return false;
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0rem" }}>
      {/* Titlu + search */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#000000",
            textDecoration: "underline",
            textAlign: "center",
            margin: 0,
          }}
        >
          Algebra
        </h2>

        <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
          <input
            type="text"
            placeholder="Caută..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 30px 6px 10px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #0070f3",
              outline: "none",
              boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
              minWidth: "150px",
            }}
          />
          {search && (
            <span
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
                fontWeight: "bold",
                fontSize: "20px",
                lineHeight: "1",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "#eee",
                transition: "all 0.2s",
                userSelect: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
            >
              ×
            </span>
          )}
        </div>
      </div>

      {/* Lista capitole */}
      {filteredCapitole.map((c, index) => {
        let subIndexGlobal = 0;

        const subtitluriKeys = Object.keys(c)
          .filter((k) => k.startsWith("subtitlu-"))
          .sort((a, b) => parseInt(a.split("-")[1]) - parseInt(b.split("-")[1]));

        return (
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
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1, textAlign: "left" }}>
              {/* Titlu capitol */}
              <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "0.3rem" }}>
                {index + 1}. {c.titlu}
              </div>

              {/* Subcapitole și sub-subcapitole */}
              {subtitluriKeys.map((key) => {
                const num = parseInt(key.split("-")[1]);
                const subArray = c[key] || [];

                return subArray.map((sub, i) => {
                  subIndexGlobal++;
                  const subSubKey = `sub-subtitlu-${num}`;
                  const subsubArray = c[subSubKey] || [];

                  return (
                    <div key={`${key}-${i}`} style={{ marginBottom: "0.1rem" }}>
                      <div style={{ fontSize: "16px",  color: "#222" }}>
                        {index + 1}.{subIndexGlobal} {sub}
                      </div>

                      {subsubArray.length > 0 && (
                        <div style={{ marginLeft: "1.5rem", fontSize: "14px" }}>
                          {subsubArray.map((s, ssIndex) => (
                            <div key={ssIndex}>
                              {indexToLetter(ssIndex)}. {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                });
              })}

              {/* Teste */}
              {c.teste?.length > 0 && (
                <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0rem" }}>
                  {c.teste.map((t, idx) => (
                    <Link
                      key={idx}
                      href={`/teorie/algebra/tests${t}`}
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

            {/* Carte */}
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
        );
      })}

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
