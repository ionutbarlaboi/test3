"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function CapitolPage() {
  const { capitol } = useParams();
  const [capitolName, setCapitolName] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!capitol) return;

    fetch(`/data/algebra/${capitol}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Nu există fișier JSON");
        return res.json();
      })
      .then((json) => {
        let titlu = json.titlu || json.capitol || "";
        titlu = titlu.replace(/^\d+\./, "");
        titlu = titlu.charAt(0).toUpperCase() + titlu.slice(1);

        setCapitolName(titlu);
        setSections(json.continut || []);
      })
      .catch((err) => {
        console.error(err);
        setCapitolName("Capitol inexistent");
        setSections([]);
      });
  }, [capitol]);

  function renderLatex(text) {
    const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return (
          <BlockMath key={idx} style={{ margin: "0.5rem 0" }}>
            {part.slice(2, -2).trim()}
          </BlockMath>
        );
      } else if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <InlineMath key={idx} style={{ lineHeight: "1.4" }}>
            {part.slice(1, -1).trim()}
          </InlineMath>
        );
      } else {
        // Păstrează spațiile și rândurile exact cum sunt, fără să le spargă
        return part.split("\n").map((line, i) => (
          <span key={`${idx}-${i}`}>
            {line}
            {i < part.split("\n").length - 1 && <br />}
          </span>
        ));
      }
    });
  }

  return (
    <div style={{ padding: "0 2rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #0070f3",
          borderRadius: "10px",
          padding: "1.5rem",
          background: "#f9f9f9",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "0 0 1rem",
            fontSize: "30px",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          {capitolName || "Se încarcă..."}
        </h1>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: "1.5rem" }}>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.4" }}>
              {renderLatex(s.text)}
            </div>

            {s.image && (
              <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                <img
                  src={s.image}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    width: "250px",
                    display: "block",
                    margin: "0.5rem auto",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link
          href="/teorie/algebra"
          style={{
            fontSize: "14px",
            border: "1px solid #0070f3",
            background: "white",
            color: "#0070f3",
            padding: "5px 10px",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Înapoi la cuprins algebra
        </Link>
      </div>
    </div>
  );
}
