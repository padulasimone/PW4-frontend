// app/Login/page.js
"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";

export default function LoginPage() {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const containerRef = useRef(null); // Ref per il container

  useEffect(() => {
    // Controlla se `containerRef.current` esiste prima di accedere
    if (containerRef.current) {
      if (isSignUpMode) {
        containerRef.current.classList.add(styles.signUpMode);
      } else {
        containerRef.current.classList.remove(styles.signUpMode);
      }
    }
  }, [isSignUpMode]); // Esegui l'effetto ogni volta che `isSignUpMode` cambia

  const handleSignUpClick = () => setSignUpMode(true);
  const handleSignInClick = () => setSignUpMode(false);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <form className={styles.signInForm}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Telefono / e-mail" />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
            {/*<p className={styles.socialText}>Or Sign in with social platforms</p>
            <div className={styles.socialMedia}>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>*/}
          </form>

          <form className={styles.signUpForm}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nome" />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Cognome" />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Telefono / e-mail" />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className={styles.btn} value="Sign up" />
            {/*<p className={styles.socialText}>Or Sign up with social platforms</p>
            <div className={styles.socialMedia}>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>*/}
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
          {/*<Image src="/immagini/log.svg" className={styles.image} alt="Log in" width={400} height={400} />*/}
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h3>Sei già uno di noi?</h3>
            <p>Effettua l'accesso e continua la tua avventura!</p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignInClick}>
              Sign in
            </button>
          </div> 
          {/*<Image src="/immagini/register.svg" className={styles.image} alt="Sign up" width={400} height={400} />*/}
        </div>
      </div>
    </div>
  );
}
