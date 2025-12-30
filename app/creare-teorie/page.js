"use client";

import React, { useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function TeorieEditor() {
  const [capitolName, setCapitolName] = useState("Capitol");
  const [sections, setSections] = useState([]);

  /* ================= LaTeX render ================= */

  function renderLatex(text) {
    const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith("$$") && part.endsWith("$$")) {
            return <BlockMath key={index}>{part.slice(2, -2).trim()}</BlockMath>;
          } else if (part.startsWith("$") && part.endsWith("$")) {
            return <InlineMath key={index}>{part.slice(1, -1).trim()}</InlineMath>;
          } else {
            const lines = part.split("\n");
            return lines.map((line, lineIndex) => (
              <span key={`${index}-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </span>
            ));
          }
        })}
      </>
    );
  }

  /* ================= Sections ================= */

  const handleAddSection = () => {
    setSections([...sections, { text: "", image: null }]);
  };

  const handleUpdateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...sections];
      updated[index].image = reader.result;
      setSections(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    const updated = [...sections];
    updated[index].image = null;
    setSections(updated);
  };

  const handleDeleteSection = (index) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  /* ================= Export / Import ================= */

  const handleExport = () => {
    const json = {
      capitol: capitolName,
      continut: sections,
    };

    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${capitolName}.json`;
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = JSON.parse(event.target.result);
        if (content.capitol && Array.isArray(content.continut)) {
          setCapitolName(content.capitol);
          setSections(content.continut);
        } else {
          alert("Fișier JSON invalid pentru teorie.");
        }
      } catch {
        alert("Eroare la citirea fișierului JSON.");
      }
    };
    reader.readAsText(file);
  };

  /* ================= UI ================= */

  return (
    <div style={{ padding: "0rem", maxWidth: "900px", margin: "auto" }}>
      {/* TITLU */}
      <h1 style={{ textAlign: "center" }}>{capitolName}</h1>

      {/* INPUT CENTRAT */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <input
          value={capitolName}
          onChange={(e) => setCapitolName(e.target.value)}
          style={{
            fontSize: "1.2rem",
            width: "50%",
            padding: "6px 10px",
            textAlign: "center",
            borderRadius: "6px",
            border: "1px solid #003366",
          }}
          placeholder="Nume capitol"
        />
      </div>

      {/* IMPORT / EXPORT SUS */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
          Import JSON:
          <input type="file" accept=".json" onChange={handleImport} />
        </label>

        <button onClick={handleExport}>Export JSON</button>
      </div>

      {/* SECTIUNI */}
      {sections.map((s, index) => (
        <div
          key={index}
          style={{
            border: "2px solid #0070f3",
            padding: "1rem",
            marginTop: "1.5rem",
            borderRadius: "8px",
            background: "#f9fafe",
            position: "relative",
          }}
        >
          {/* STERGE */}
          <button
            onClick={() => handleDeleteSection(index)}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "red",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Șterge
          </button>

          <label style={{ fontWeight: "bold" }}>
            Secțiune {index + 1}
          </label>

          <textarea
            value={s.text}
            onChange={(e) =>
              handleUpdateSection(index, "text", e.target.value)
            }
            style={{
              width: "100%",
              border: "1px solid black",
              marginBottom: "0.5rem",
              padding: "6px",
              minHeight: "120px",
            }}
            placeholder="Scrie teoria aici (LaTeX permis)"
          />

          <div style={{ marginBottom: "1rem", whiteSpace: "pre-wrap" }}>
            {renderLatex(s.text)}
          </div>

          <label style={{ fontWeight: "bold" }}>Imagine:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e.target.files[0])}
            style={{ marginBottom: "0.5rem", display: "block" }}
          />

          {s.image && (
            <div style={{ position: "relative", textAlign: "center" }}>
              <img src={s.image} alt="" style={{ maxWidth: "100%" }} />
              <button
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ADAUGA SECTIUNE JOS */}
      <button onClick={handleAddSection} style={{ marginTop: "2rem" }}>
        + Adaugă secțiune
      </button>
    </div>
  );
}
