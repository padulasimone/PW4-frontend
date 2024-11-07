"use client";

import React, {useEffect, useState} from "react";

export default function VerificaMailPage() {
    const [isVerifying, setVerifying] = useState(true);
    const [isVerified, setVerified] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');

        if (!email) {
            setError("Email non fornita");
            setVerifying(false);
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/auth/verifica/${email}`, {
                    method: 'POST', // Change the method to POST
                    headers: {
                        'Content-Type': 'application/json'
                    }
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

        verifyEmail();
    }, []);

    return (
        <div>
            <div>
                <h1>{isVerifying ? "Verifica in corso..." : isVerified ? "Email verificata" : "Errore"}</h1>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}