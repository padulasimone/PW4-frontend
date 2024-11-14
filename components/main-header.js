"use client";

import { useRouter, usePathname } from "next/navigation"; // Aggiunto usePathname
import { useEffect, useState } from "react";
import Link from "next/link";
import classes from "@/components/main-header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per il menu dropdown
  const router = useRouter();
  const pathname = usePathname(); // Ottieni il percorso corrente

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
        return null;
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
        router.push("/");
      } else {
        console.error("Errore durante il logout:", res.statusText);
      }
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // Funzione per aprire/chiudere il menu dropdown
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={classes.header}>
      <button className={classes.dropdown} onClick={toggleMenu}>
        ☰
      </button>
      <div className={classes.container}>
        <div className={classes.navCenter}>
          <ul
            className={`${classes.navList} ${
              isMenuOpen ? classes.showMenu : ""
            }`}
          >
            {/* Voci comuni a tutti gli utenti */}
            <li>
              <Link
                href="/"
                className={`${classes.link} ${
                  pathname === "/" && classes.activeLink
                }`}
              >
                Home page
              </Link>
            </li>

            {/* Mostra "Contatti" solo se l'utente è non loggato o CLIENTE VERIFICATO */}
            {(role === null || role === "CLIENTE VERIFICATO") && (
              <li>
                <Link
                  href="/Contatti"
                  className={`${classes.link} ${
                    pathname === "/Contatti" && classes.activeLink
                  }`}
                >
                  Contatti
                </Link>
              </li>
            )}

            {/* Voci specifiche per CLIENTE VERIFICATO */}
            {role === "CLIENTE VERIFICATO" && (
              <>
                <li>
                  <Link
                    href="/Prenota"
                    className={`${classes.link} ${
                      pathname === "/Prenota" && classes.activeLink
                    }`}
                  >
                    Prenota
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Torte"
                    className={`${classes.link} ${
                      pathname === "/Torte" && classes.activeLink
                    }`}
                  >
                    Torte
                  </Link>
                </li>
                <li>
                  <Link
                    href="/AreaPersonale"
                    className={`${classes.link} ${
                      pathname === "/AreaPersonale" && classes.activeLink
                    }`}
                  >
                    Area personale
                  </Link>
                </li>
              </>
            )}

            {/* Voci specifiche per ADMIN */}
            {role === "ADMIN" && (
              <>
                <li>
                  <Link
                    href="/GestioneMagazzino"
                    className={`${classes.link} ${
                      pathname === "/GestioneMagazzino" && classes.activeLink
                    }`}
                  >
                    Gestione magazzino
                  </Link>
                </li>
                <li>
                  <Link
                    href="/GestioneOrdini"
                    className={`${classes.link} ${
                      pathname === "/GestioneOrdini" && classes.activeLink
                    }`}
                  >
                    Gestione ordini
                  </Link>
                </li>
                <li>
                  <Link
                    href="/GestioneUtenti"
                    className={`${classes.link} ${
                      pathname === "/GestioneUtenti" && classes.activeLink
                    }`}
                  >
                    Gestione utenti
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={classes.navRight}>
          <ul
            className={`${classes.navList} ${
              isMenuOpen ? classes.showMenu : ""
            }`}
          >
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
                <Link
                  href="/Login"
                  className={`${classes.link} ${
                    pathname === "/Login" && classes.activeLink
                  }`}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Pulsante per aprire/chiudere il menu dropdown */}
      </div>
    </header>
  );
}
