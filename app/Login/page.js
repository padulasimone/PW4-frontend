// page.js

"use client";

import { useState, useEffect, useRef } from "react";
import classes from "./page.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Registration failed. Please try again."); // error.message
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
      setErrorMessage("Invalid username, email or passsword"); // error.message
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
              <input type="text" name="nome" placeholder="Nome" required />
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
            <input type="submit" className={classes.btn} value="Sign up" />
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
    </div>
  );
}
