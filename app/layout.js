import { Inter } from "next/font/google";
import "./globals.css";
import GoogleTranslate from "./GoogleTranslate";
import CookieConsent from "../components/CookieConsent"; // <-- modul cookies

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Matemat'IBa",
  description: "Teste grilă pentru gimnaziu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json?v=5" />
        <link rel="icon" href="/favicon.ico?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
        <meta name="theme-color" content="#003366" />
      </head>

      <body
        style={{
          background: "transparent",
        }}
      >
        {/* FUNDAL GLOBAL MATEMATIBA */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            pointerEvents: "none",
            backgroundImage: `
             linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
          }}
        >

        </div>

        {/* HEADER Google Translate */}
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

        {/* CONȚINUT PAGINĂ */}
        {children}

        {/* COOKIE CONSENT */}
        <CookieConsent />

        {/* PRELOAD */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                const preload = document.getElementById('preload');
                if(preload) {
                  preload.style.opacity = 0;
                  setTimeout(() => preload.remove(), 350);
                }
              });
            `,
          }}
        />

        {/* SERVICE WORKER */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", () => {
                  navigator.serviceWorker.register("/service-worker.js")
                    .then(() => console.log("Service Worker register OK"))
                    .catch(err => console.error("Service Worker register FAIL:", err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
