import { Inter } from "next/font/google";
import "./globals.css";
import GoogleTranslate from "./GoogleTranslate";

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
        {/* Manifest PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon & Apple Touch Icon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#003366" />
      </head>

      <body>
        {/* Splash alb rapid la încărcare */}
        <div
          id="preload"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            zIndex: 9999,
            transition: "opacity 0.3s ease",
          }}
        ></div>

        {/* Header cu Google Translate */}
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

        {/* Script pentru estomparea preload */}
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

        {/* Service Worker pentru PWA */}
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
