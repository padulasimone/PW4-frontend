"use client";

import React, { useEffect, useState } from "react";
import classes from "./page.module.css";

export default function VerificaMailPage() {
  const [isVerifying, setVerifying] = useState(true);
  const [isVerified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (!email) {
      setError("E-mail non fornita");
      setVerifying(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/verifica/${email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error:", response.status, errorText);
          throw new Error("Network response was not ok");
        }

        setVerified(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1
          className={`${classes.title} ${
            isVerifying
              ? classes.loading
              : isVerified
              ? classes.success
              : classes.error
          }`}
        >
          {isVerifying
            ? "Verifica in corso..."
            : isVerified
            ? "E-mail verificata"
            : "Errore"}
        </h1>
        {isVerified && <p className={classes.message1}>Ora puoi fare la login</p>}
        {error && <p className={classes.message}>{error}</p>}
      </div>
    </div>
  );
}
