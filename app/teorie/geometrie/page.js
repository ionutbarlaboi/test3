"use client";

import { useRouter } from "next/navigation";

export default function GeometriePage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          color: "#003366",
        }}
      >
        Pagina în construcție
      </div>

      <button
        onClick={() => router.push("/")}
        style={{
          fontSize: "14px",
          border: "1px solid #003366",
          background: "white",
          color: "#003366",
          padding: "6px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Înapoi la pagina principală
      </button>
    </div>
  );
}
