"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import QRCodeCanvas to avoid SSR issues
const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeCanvas),
  { ssr: false }
);

export default function QRPage() {
  const qrValue = "https://uomo-xi.vercel.app/instructions"; // Replace with your desired QR code value

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
      backgroundColor: "#f9f9f9"
    }}>
      <h1 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "1.5rem",
        textAlign: "center"
      }}>
        Scan the QR Code to Take Your Measurements
      </h1>

      <div style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <QRCodeCanvas
          value={qrValue}
          size={220}
          level="H"
          fgColor="#08106c"
        />
      </div>

      <p style={{
        marginTop: "1.5rem",
        fontSize: "0.9rem",
        color: "#555",
        textAlign: "center"
      }}>
        Powered by Your Measurement App
      </p>
    </div>
  );
}
