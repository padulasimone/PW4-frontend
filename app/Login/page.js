// page.js

"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const containerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (containerRef.current) {
            if (isSignUpMode) {
                containerRef.current.classList.add(styles.signUpMode);
            } else {
                containerRef.current.classList.remove(styles.signUpMode);
            }
        }
    }, [isSignUpMode]);

    const handleSignUpClick = () => setSignUpMode(true);
    const handleSignInClick = () => setSignUpMode(false);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            nome: formData.get("nome"),
            cognome: formData.get("cognome"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            const result = await response.json();
            console.log("Registrazione avvenuta con successo:", result);
        } catch (error) {
            console.error("Errore:", error);
            setErrorMessage(error.message);
        }
    };

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            const contentType = response.headers.get("Content-Type");

            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                localStorage.setItem("user", JSON.stringify(result));
                localStorage.setItem("role", result.role);
            } else {
                const text = await response.text();
                console.log("Messaggio del server:", text);

                localStorage.setItem("user", JSON.stringify({ nome: "Utente" }));
                localStorage.setItem("role", "user");
            }

            // Emettiamo l'evento personalizzato "userLoggedIn"
            window.dispatchEvent(new Event("userLoggedIn"));

            router.push("/"); // Redirige alla homepage dopo il login

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.formsContainer}>
                <div className={styles.signinSignup}>
                    <form className={styles.signInForm} onSubmit={handleSignInSubmit}>
                        <h2 className={styles.title}>Sign in</h2>
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <div className={styles.inputField}>
                            <i className="fas fa-user"></i>
                            <input type="text" name="email" placeholder="Telefono / e-mail" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
                    </form>
                    <form className={styles.signUpForm} onSubmit={handleSignUpSubmit}>
                        <h2 className={styles.title}>Sign up</h2>
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <div className={styles.inputField}>
                            <i className="fas fa-user"></i>
                            <input type="text" name="nome" placeholder="Nome" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-user"></i>
                            <input type="text" name="cognome" placeholder="Cognome" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-envelope"></i>
                            <input type="email" name="email" placeholder="Telefono / e-mail" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        <input type="submit" className={styles.btn} value="Sign up" />
                    </form>
                </div>
            </div>
            <div className={styles.panelsContainer}>
                <div className={`${styles.panel} ${styles.leftPanel}`}>
                    <div className={styles.content}>
                        <h3>Nuovo qui?</h3>
                        <p>Unisciti a noi oggi per una grande esperienza!</p>
                        <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignUpClick}>
                            Sign up
                        </button>
                    </div>
                </div>
                <div className={`${styles.panel} ${styles.rightPanel}`}>
                    <div className={styles.content}>
                        <h3>Sei già uno di noi?</h3>
                        <p>Effettua l'accesso e continua la tua avventura!</p>
                        <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignInClick}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
