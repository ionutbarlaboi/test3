"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const cartoonWidth = 400;
  const cartoonHeight = 200;
  const startButtonOffset = 80;
  const topButtonsOffset = 60;
  const buttonsGap = 20;

  const [showEmailBox, setShowEmailBox] = useState(false);
  const [showDevModal, setShowDevModal] = useState(true);

  const [showNotifModal, setShowNotifModal] = useState(false); // pop-up pentru „Hai să începem”
  const [showNotifModalBottom, setShowNotifModalBottom] = useState(false); // pop-up pentru butonul mic de jos
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // La încărcare verificăm dacă notificările sunt activate
  useEffect(() => {
    const enabled = localStorage.getItem("notificationsEnabled");
    if (enabled === "yes") setNotificationsEnabled(true);

    // Înregistrare SW
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registered"))
        .catch(console.error);
    }
  }, []);

  // Conversie VAPID
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Activare notificări
  async function activateNotifications() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Permisiunea pentru notificări nu a fost acordată.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) await existingSubscription.unsubscribe();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BIraI_5nULdp6DFPsjsXwaASrF-5yR20CLytfqgIJiaHbSVOsaMQFj6Lta5-P_gfydVuDB0LrdKgveQvo--yukw"
        ),
      });

      await fetch("/api/save-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      localStorage.setItem("notificationsEnabled", "yes");

      setNotificationsEnabled(true);      
    } catch (err) {
      console.error("Eroare la abonare:", err);
      alert("Nu s-a putut activa notificarea.");
    }
  }

  // Pop-up „Hai să începem” – DA / NU
  const handleAcceptNotifications = async () => {
    await activateNotifications();
    localStorage.setItem("seenNotifModal", "yes"); // marcam că a văzut modalul
    setShowNotifModal(false);
    router.push("/alege-un-test");
  };

  const handleDeclineNotifications = () => {
    localStorage.setItem("seenNotifModal", "yes"); // marcam că a văzut modalul
    setShowNotifModal(false);
    router.push("/alege-un-test");
  };

  // Pop-up „Primește noutăți” (buton mic jos) – DA / NU
  const handleAcceptNotificationsBottom = async () => {
    await activateNotifications();
    setShowNotifModalBottom(false); // rămâne pe prima pagină
  };

  const handleDeclineNotificationsBottom = () => {
    setShowNotifModalBottom(false); // rămâne pe prima pagină
  };

  const randomStyle = () => ({
    position: "absolute",
    top: 5 + Math.random() * 90 + "%",
    left: 5 + Math.random() * 90 + "%",
    transform: "rotate(" + (Math.random() * 30 - 15) + "deg)",
    fontSize: 10 + Math.random() * 6 + "px",
    fontWeight: "100",
    color: "rgba(0,0,0,0.05)",
    pointerEvents: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
  });

  return (
    <>
      {/* Modal Email */}
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
            zIndex: 1001,
          }}
          onClick={() => setShowEmailBox(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "20px",
              borderRadius: 12,
              maxWidth: "90vw",
              width: "320px",
              backgroundColor: "white",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
              Vrei să ne spui ceva?
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
              Scrie-ne la: xxxx@gmail.ro
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

      {/* Modal IN DEVELOPMENT */}
      {showDevModal && (
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
            zIndex: 1000,
          }}
          onClick={() => setShowDevModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "10px",
              borderRadius: 12,
              maxWidth: "90vw",
              width: "330px",
              backgroundColor: "white",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            }}
          >
            <Image
              src="/in-dev.jpg"
              alt="In Development"
              width={300}
              height={200}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <button
              onClick={() => setShowDevModal(false)}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Pop-up „Hai să începem” */}
      {showNotifModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "360px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Vrei să fii la curent cu toate noutățile din aplicație?
            </h2>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                marginBottom: 10,
              }}
              onClick={handleAcceptNotifications}
            >
              Da
            </button>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                border: "2px solid #003366",
                backgroundColor: "white",
                color: "#003366",
              }}
              onClick={handleDeclineNotifications}
            >
              Nu
            </button>
          </div>
        </div>
      )}

      {/* Pop-up „Vrei să activezi notificările?” – buton jos */}
      {showNotifModalBottom && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "360px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Vrei să activezi notificările?
            </h2>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                marginBottom: 10,
              }}
              onClick={handleAcceptNotificationsBottom}
            >
              Da
            </button>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                border: "2px solid #003366",
                backgroundColor: "white",
                color: "#003366",
              }}
              onClick={handleDeclineNotificationsBottom}
            >
              Nu
            </button>
          </div>
        </div>
      )}

      {/* Pagina principală */}
      <main
        style={{
          height: "85vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",         
          textAlign: "center",
          overflow: "hidden",
          position: "relative",
          opacity: 0,
          animation: "fadeIn 1s forwards",
        }}
      >

        {/* Conținut */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Email + Facebook */}
          <div
            style={{
              position: "absolute",
              top: `-${topButtonsOffset}px`,
              right: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: `${buttonsGap}px`,
              width: `${cartoonWidth}px`,
              maxWidth: "90vw",
            }}
          >
            <button
              onClick={() => setShowEmailBox(true)}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                border: "1px solid #DB4437",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#DB4437"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M12 12.713l11.985-8.713H0L12 12.713zm0 2.574l-12-8.713V21h24V6.574l-12 8.713z" />
              </svg>
            </button>

            <a
              href="https://www.facebook.com/profile.php?id=61584564381930"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                border: "1px solid #1877F2",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#1877F2"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.725 0 1.325-.6 1.325-1.337V1.337C24 .6 23.4 0 22.675 0z" />
              </svg>
            </a>
          </div>

          {/* Imaginea */}
          <Image
            src="/math-cartoon.jpg"
            alt="Caricatură matematică"
            width={cartoonWidth}
            height={cartoonHeight}
            style={{ maxWidth: "90vw", height: "auto", objectFit: "contain" }}
            priority
          />

          {/* HAI SĂ ÎNCEPEM */}
          <button
            onClick={() => {
              const seen = localStorage.getItem("seenNotifModal");
              if (notificationsEnabled || seen === "yes") {
                router.push("/alege-un-test"); // deja a văzut sau notificările sunt active
              } else {
                setShowNotifModal(true); // deschide pop-up
              }
            }}
            style={{
              marginTop: `${startButtonOffset}px`,
              padding: "12px 28px",
              fontSize: "1.1rem",
              border: "3px solid #003366",
              borderRadius: 10,
              backgroundColor: "white",
              color: "#003366",
              cursor: "pointer",
              maxWidth: "280px",
              width: "90%",
            }}
          >
            Hai să începem
          </button>

          {/* BUTON TEXT – Activează notificările (jos) */}
          {!notificationsEnabled && (
            <div
              onClick={() => setShowNotifModalBottom(true)}
              style={{
                marginTop: "15px",
                fontSize: "0.9rem",
                color: "#003366",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Activează notificările
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
