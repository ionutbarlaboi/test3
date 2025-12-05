"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectTestPage() {
const router = useRouter();
const [tests, setTests] = useState([]);
const [showEmailBox, setShowEmailBox] = useState(false);

useEffect(() => {
async function fetchTests() {
try {
const res = await fetch("/api/tests");
if (res.ok) {
const data = await res.json();
const sorted = data.sort((a, b) => {
const numA = parseInt(a.replace("test", ""), 10);
const numB = parseInt(b.replace("test", ""), 10);
return numA - numB;
});
setTests(sorted);
} else {
setTests([]);
}
} catch {
setTests([]);
}
}
fetchTests();
}, []);

// Poziții dezordonate dar echilibrate
const randomStyle = () => {
const top = 5 + Math.random() * 90;
const left = 5 + Math.random() * 90;
const rotate = Math.random() * 30 - 15;
const fontSize = 10 + Math.random() * 6;
return {
position: "absolute",
top: top + "%",
left: left + "%",
transform: `rotate(${rotate}deg)`,
fontSize: fontSize + "px",
fontWeight: "100",
color: "rgba(0,0,0,0.05)",
pointerEvents: "none",
userSelect: "none",
whiteSpace: "nowrap",
};
};

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
}}
onClick={() => setShowEmailBox(false)}
>
<div
onClick={(e) => e.stopPropagation()}
style={{
padding: "20px",
borderRadius: 12,
maxWidth: "90vw",
textAlign: "center",
}}
>
<p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
Vrei să ne spui ceva?
</p>
<p style={{ fontWeight: "bold", marginBottom: "20px" }}>
Scrie-ne la xxxx@gmail.ro

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

  <div
    style={{
      minHeight: "100vh",
      overflowY: "auto",      
      backgroundSize: "cover",
      paddingTop: 0,
      marginTop: 0,
      boxSizing: "border-box",
      position: "relative",
    }}
  >


    <div
      style={{
        position: "relative",
        padding: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "2rem",
          marginTop: 0,
          color: "#003366",
          textDecoration: "underline",
        }}
      >
        Alege un test
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {tests.length > 0 ? (
          tests.map((test) => (
            <button
              key={test}
              onClick={() => router.push(`/${test}`)}
              style={{
                width: "30%",
                padding: "8px",
                fontSize: "15px",
                borderRadius: "6px",
                border: "2px solid #003366",
                background: "white",
                color: "#003366",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {`Testul ${test.replace("test", "")}`}
            </button>
          ))
        ) : (
          <p style={{ color: "#000", textShadow: "0 0 6px rgba(0,0,0,0.2)" }}>
            Nu există teste disponibile.
          </p>
        )}
      </div>

      {process.env.NODE_ENV === "development" && (
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button
            onClick={() => router.push("/creare")}
            style={{
              fontSize: "14px",
              marginBottom: "0.5rem",
              padding: "5px 10px",
              border: "1px solid gray",
              borderRadius: "6px",
              cursor: "pointer",
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Creare / modificare teste
          </button>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            fontSize: "14px",
            border: "1px solid #003366",
            background: "white",
            color: "#003366",
            padding: "5px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Înapoi la pagina principală
        </button>
      </div>
    </div>
  </div>
</>


);
}