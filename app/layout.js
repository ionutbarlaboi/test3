import { Inter } from "next/font/google";
import "./globals.css";
import GoogleTranslate from "./GoogleTranslate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aplicație Matematică",
  description: "Teste grilă pentru gimnaziu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={inter.variable}>
      <head>
        {/* Manifest PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#003366" />
      </head>
      <body>
        <header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "15px 0",
          }}
        >
          <div
            style={{
              width: "60%",
              maxWidth: "500px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              transform: "scale(1.2)",
              transformOrigin: "top center",
            }}
          >
            <GoogleTranslate />
          </div>
        </header>

        {/* Conținutul principal */}
        {children}
      </body>
    </html>
  );
}
