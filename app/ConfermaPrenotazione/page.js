"use client";

import React, {useEffect, useState} from "react";
import classes from "./page.module.css";

export default function ConfermaPrenotazione() {
    const [isVerifying, setVerifying] = useState(true);
    const [isVerified, setVerified] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        if (!id) {
            setError("Id non fornito");
            setVerifying(false);
            return;
        }

        const confirmOrder = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ordine/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({stato: "IN PREPARAZIONE"}),
                });
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

        confirmOrder();
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
                        ? "Conferma in corso..."
                        : isVerified
                            ? "Ordine confermato, è stata inviata una mail di conferma al cliente"
                            : "Errore"}
                </h1>
                {error && <p className={classes.message}>{error}</p>}
            </div>
        </div>
    );
}
