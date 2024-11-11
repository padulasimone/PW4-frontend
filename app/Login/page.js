// page.js

"use client";

import {useState, useEffect, useRef} from "react";
import classes from "./page.module.css";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showVerificationDialog, setShowVerificationDialog] = useState(false);
    const [registrationData, setRegistrationData] = useState({});
    const containerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (containerRef.current) {
            if (isSignUpMode) {
                containerRef.current.classList.add(classes.signUpMode);
            } else {
                containerRef.current.classList.remove(classes.signUpMode);
            }
        }
    }, [isSignUpMode]);

    const handleSignUpClick = () => setSignUpMode(true);
    const handleSignInClick = () => setSignUpMode(false);

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const identifier = formData.get("email"); // Può essere email o telefono
        const password = formData.get("password");

        // Controlla se l'input è un'email
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        const data = isEmail
            ? {email: identifier, password}
            : {telefono: identifier, password};

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            const result = await response.text();
            alert("Login successful.");
            router.push("/");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            nome: formData.get("nome"),
            cognome: formData.get("cognome"),
            email: formData.get("email"),
            telefono: formData.get("telefono"),
            password: formData.get("password"),
        };

        setRegistrationData(data);

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

            const result = await response.text();
            if (data.email && !data.telefono) {
                alert("E' stata inviata una email di conferma. Controlla la tua casella di posta.");
                router.push("/");
            } else if (data.telefono && !data.email) {
                setShowVerificationDialog(true);
            } else {
                alert("Account creato con successo.");
                router.push("/");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleVerificationSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/auth/verifica/${registrationData.telefono}/${verificationCode}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            alert("Account verified and created successfully.");
            setShowVerificationDialog(false);
            router.push("/");
        } catch (error) {
            console.error("Errore:", error);
            setErrorMessage("Verification failed. Please try again.");
        }
    };

    return (
        <div ref={containerRef} className={classes.container}>
            <div className={classes.formsContainer}>
                <div className={classes.signinSignup}>

                    <form className={classes.signInForm} onSubmit={handleSignInSubmit}>
                        <h2 className={classes.title}>Sign in</h2>

                        <div className={classes.inputField}>
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                name="email"
                                placeholder="Telefono / e-mail"
                                required
                            />
                        </div>
                        <div className={classes.inputField}>
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className={`${classes.btn} ${classes.solid}`}
                        />
                        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                    </form>

                    <form className={classes.signUpForm} onSubmit={handleSignUpSubmit}>
                        <h2 className={classes.title}>Sign up</h2>

                        <div className={classes.inputField}>
                            <i className="fas fa-user"></i>
                            <input type="text" name="nome" placeholder="Nome" required/>
                        </div>
                        <div className={classes.inputField}>
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                name="cognome"
                                placeholder="Cognome"
                                required
                            />
                        </div>
                        <div className={classes.inputField}>
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                            />
                        </div>
                        <div className={classes.inputField}>
                            <i className="fas fa-envelope"></i>
                            <input
                                type="text"
                                name="telefono"
                                placeholder="Telefono"
                            />
                        </div>
                        <div className={classes.inputField}>
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <input type="submit" className={classes.btn} value="Sign up"/>
                        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                    </form>

                </div>
            </div>

            <div className={classes.panelsContainer}>
                <div className={`${classes.panel} ${classes.leftPanel}`}>
                    <div className={classes.content}>
                        <h3>Nuovo qui?</h3>
                        <p>Unisciti a noi oggi per una grande esperienza!</p>
                        <button
                            className={`${classes.btn} ${classes.transparent}`}
                            onClick={handleSignUpClick}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
                <div className={`${classes.panel} ${classes.rightPanel}`}>
                    <div className={classes.content}>
                        <h3>Sei già uno di noi?</h3>
                        <p>Effettua l'accesso e continua la tua avventura!</p>
                        <button
                            className={`${classes.btn} ${classes.transparent}`}
                            onClick={handleSignInClick}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>

            {showVerificationDialog && (
                <div className={classes.verificationDialog}>
                    <h2>Enter Verification Code</h2>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Verification Code"
                    />
                    <button onClick={handleVerificationSubmit}>Verify</button>
                </div>
            )}
        </div>
    );
}