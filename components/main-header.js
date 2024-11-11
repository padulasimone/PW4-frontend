'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'; 
import classes from "@/components/main-header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  // Recupera l'utente dal backend utilizzando il valore del cookie di sessione
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/utente", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setRole(data.ruolo);
        }
      } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
      }
    };
    fetchUser();

    // Listen for the custom event "userLoggedIn"
    const handleUserLoggedIn = () => {
      fetchUser();
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);

    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        setRole(null);
        router.push('/');
      } else {
        console.error("Errore durante il logout:", res.statusText);
      }
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.navCenter}>
          <ul className={classes.navList}>
            {/* Voci comuni a tutti gli utenti */}
            <li>
              <Link href="/" className={classes.link}>
                Home page
              </Link>
            </li>

            {/* Mostra "Contatti" solo se l'utente è non loggato o CLIENTE VERIFICATO */}
            {(role === null || role === "CLIENTE VERIFICATO") && (
              <li>
                <Link href="/Contatti" className={classes.link}>
                  Contatti
                </Link>
              </li>
            )}

            {/* Voci specifiche per CLIENTE VERIFICATO */}
            {role === "CLIENTE VERIFICATO" && (
              <>
                <li>
                  <Link href="/Prenota" className={classes.link}>
                    Prenota
                  </Link>
                </li>
                <li>
                  <Link href="/Torte" className={classes.link}>
                    Torte
                  </Link>
                </li>
                <li>
                  <Link href="/AreaPersonale" className={classes.link}>
                    Area personale
                  </Link>
                </li>
              </>
            )}

            {/* Voci specifiche per ADMIN */}
            {role === "ADMIN" && (
              <>
                <li>
                  <Link href="/GestioneMagazzino" className={classes.link}>
                    Gestione magazzino
                  </Link>
                </li>
                <li>
                  <Link href="/GestioneOrdini" className={classes.link}>
                    Gestione ordini
                  </Link>
                </li>
                <li>
                  <Link href="/GestioneUtenti" className={classes.link}>
                    Gestione utenti
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={classes.navRight}>
          <ul className={classes.navList}>
            <li>
              {user ? (
                <>
                  <span className={classes.welcomeMessage}>
                    Ciao, {user.nome}
                  </span>
                  <button
                    onClick={handleLogout}
                    className={classes.logoutButton}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/Login" className={classes.link}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}