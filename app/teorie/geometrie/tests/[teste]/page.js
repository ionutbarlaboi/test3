"use client";

import { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { useParams } from "next/navigation";

function renderWithLatex(text) {
  if (!text) return null;
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) =>
    part.startsWith("$") && part.endsWith("$") ? (
      <span key={index} className="latex-inline-wrapper">
        <InlineMath math={part.slice(1, -1)} />
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export default function TestPage() {
  const { teste } = useParams();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [finished, setFinished] = useState(false);
  const allAnswered = answered.every((a) => a !== null);

  // Încarcă testul din JSON
  useEffect(() => {
    if (!teste) return;

    fetch(`/data/geometrie/${teste}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Testul nu există");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setAnswered(Array(data.length).fill(null));
      })
      .catch((e) => console.error("Eroare la încărcare test:", e));
  }, [teste]);

  if (!questions.length) return <p>Se încarcă testul...</p>;

  const q = questions[index];

  const handleAnswer = (i) => {
    if (selected !== null || answered[index] !== null) return;
    const isCorrect = i === q.correct;
    setSelected(i);
    const updated = [...answered];
    updated[index] = isCorrect;
    setAnswered(updated);
    if (isCorrect) setScore((s) => s + 1);
  };


  const goNext = () => {
  // Caută următoarea întrebare necompletată după indexul curent
  let nextIndex = answered.findIndex((a, i) => a === null && i > index);

  // Dacă nu există, caută de la început până la indexul curent
  if (nextIndex === -1) {
    nextIndex = answered.findIndex((a, i) => a === null && i <= index);
  }

  if (nextIndex !== -1) {
    setIndex(nextIndex);
    setSelected(null);
  } else {
    setFinished(true);
  }
};


  const goPrevious = () => {
    for (let i = index - 1; i >= 0; i--) {
      if (answered[i] === null) {
        setIndex(i);
        setSelected(null);
        return;
      }
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "700px", margin: "auto", textAlign: "center" }}>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "0",
          marginBottom: "1rem",
          background: "linear-gradient(90deg, #0070f3, #00c6ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "pulse 2s infinite",
          textAlign: "center",
          borderBottom: "2px solid #0070f3",
          display: "inline-block",
        }}
      >
        Testul 1
      </h2>

      {finished ? (
        <>
          {/* Rezultatul final */}
          {(() => {
            const percentage = (score / questions.length) * 100;
            let message = "";
            let bgColor = "";
            if (percentage === 100) {
              message = "💪 Perfect! Ești un campion!";
              bgColor = "#d1e7dd";
            } else if (percentage > 80) {
              message = "🎉 Foarte bine! Mai e puțin! ";
              bgColor = "#e0f2ff";
            } else if (percentage > 50) {
              message = "🙂 E bine! Continuă să exersezi!";
              bgColor = "#fff3cd";
            } else {
              message = "⚠️ Nu renunța! Exersează mai mult și vei reuși!";
              bgColor = "#f8d7da";
            }

            return (
              <div
                style={{
                  backgroundColor: bgColor,
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                <p style={{ fontSize: "22px", fontWeight: "bold", color: "black", marginBottom: "0.5rem" }}>
                  {message}
                </p>
                <p style={{ fontSize: "16px", color: "black" }}>
                  Ai răspuns corect la {score} din {questions.length} întrebări.
                </p>
              </div>
            );
          })()}

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              style={{
                padding: "6px 14px",
                border: "1px solid #0070f3",
                background: "white",
                color: "#0070f3",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => (window.location.href = "/")}
            >
              Înapoi la pagina principală
            </button>
            <button
              style={{
                padding: "6px 14px",
                border: "1px solid #0070f3",
                background: "white",
                color: "#0070f3",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => (window.location.href = "/teorie/geometrie")}
            >
              Alege un alt test
            </button>
          </div>

          <div style={{ textAlign: "left", marginTop: "2rem" }}>
            <p style={{ fontWeight: "bold", fontSize: "24px" }}>Iată cum ai răspuns:</p>
            {questions.map((q, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  backgroundColor: answered[i] ? "#d1e7dd" : "#f8d7da",
                }}
              >
                <p>
                  {i + 1}. {renderWithLatex(q.text)}
                </p>
                <p style={{ marginBottom: "0.2rem" }}>
                  <strong>Răspunsul tău:</strong>{" "}
                  <span>{renderWithLatex(q.options[answered[i] ? q.correct : null] || "")}</span>
                </p>
                <p style={{ marginTop: 0 }}>
                  <strong>Răspuns corect:</strong>{" "}
                  <span>{renderWithLatex(q.options[q.correct])}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Întrebarea curentă */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              textAlign: "left",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "left",
                  marginBottom: "0.5rem",
                  textDecoration: "underline",
                }}
              >
                {`Exercițiul ${index + 1}`}
              </p>
              <div style={{ fontSize: "18px", textAlign: "left", whiteSpace: "pre-wrap" }}>
                {renderWithLatex(q.text)}
              </div>
            </div>

            {q.image && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <img src={q.image} alt="Întrebare" style={{ maxWidth: "100%", maxHeight: "300px" }} />
              </div>
            )}

            <div>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null || answered[index] !== null}
                  style={{
                    display: "inline-block",
                    width: "48%",
                    fontSize: "20px",
                    marginBottom: "0.5rem",
                    marginRight: i % 2 === 0 ? "4%" : "0",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    backgroundColor:
                      selected === i ? (i === q.correct ? "#d1e7dd" : "#f8d7da") : "white",
                    cursor: selected === null && answered[index] === null ? "pointer" : "default",
                    textAlign: "center",
                  }}
                >
                  {renderWithLatex(opt)}
                </button>
              ))}
            </div>
          </div>

          {selected !== null && (
            <div
              style={{
                marginTop: "1rem",
                borderRadius: "10px",
                padding: "1rem",
                backgroundColor: selected === q.correct ? "#d1e7dd" : "#f8d7da",
                border: `1px solid ${selected === q.correct ? "#198754" : "#d6336c"}`,
                color: selected === q.correct ? "#198754" : "#d6336c",
                fontWeight: "600",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "0.5rem" }}>
                {selected === q.correct ? "Răspuns corect" : "Răspuns greșit"}
              </div>
              {q.explanation && (
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    fontWeight: "normal",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {renderWithLatex(q.explanation)}
                </div>
              )}
              {q.explanationImage && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <img src={q.explanationImage} alt="Explicație" style={{ maxWidth: "100%", maxHeight: "300px" }} />
                </div>
              )}
            </div>
          )}

          {/* Navigare */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {answered.slice(0, index).some((a) => a === null) && (
              <span onClick={goPrevious} className="button-link">
                ← Înapoi
              </span>
            )}

            <span
              onClick={() => {
                if (selected === null) {
                  goNext();
                } else {
                  const nextIndex = index + 1;
                  if (answered.every((a) => a !== null)) {
                    setFinished(true);
                  } else if (nextIndex < questions.length && answered[nextIndex] === null) {
                    setIndex(nextIndex);
                    setSelected(null);
                  } else {
                    goNext();
                  }
                }
              }}
              className="button-link"
              style={{ marginLeft: "auto" }}
            >
              {allAnswered
                ? "Vezi rezultatul →"
                : selected === null
                ? "Revin mai târziu →"
                : "Întrebarea următoare →"}
            </span>
          </div>

          <p
            style={{
              marginTop: "1rem",
              color: "green",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Răspunsuri corecte {answered.filter(Boolean).length}
          </p>
          <p
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              marginTop: "-0.3rem",
              marginBottom: "1.5rem",
            }}
          >
            Mai sunt {answered.filter((a) => a === null).length} întrebări fără răspuns
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "6px 14px",
                border: "1px solid #0070f3",
                background: "white",
                color: "#0070f3",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                minWidth: "150px",
              }}
            >
              Înapoi la pagina principală
            </button>
            <button
              onClick={() => (window.location.href = "/teorie/geometrie")}
              style={{
                padding: "6px 14px",
                border: "1px solid #0070f3",
                background: "white",
                color: "#0070f3",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                minWidth: "150px",
              }}
            >
              Alege un alt test
            </button>
          </div>
        </>
      )}
    </div>
  );
}
