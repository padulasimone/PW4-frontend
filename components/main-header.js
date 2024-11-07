"use client";
import {useState, useEffect} from "react";
import classes from "@/components/main-header.module.css";
import Link from "next/link";

export default function Header() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    // Recupera l'utente dal backend utilizzando il valore del cookie di sessione
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/utente", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    setUser(data);
                    setRole(data.ruolo);
                }

            } catch (error) {
                console.error("Errore durante il recupero dell'utente:", error);
            }
        };
        fetchUser();
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
                        <li><Link href="/" className={classes.link}>Home page</Link></li>
                        <li><Link href="/" className={classes.link}>Prenota</Link></li>
                        <li><Link href="/Torte" className={classes.link}>Torte</Link></li>
                        <li><Link href="/Contatti" className={classes.link}>Contatti</Link></li>
                        {role === 'ADMIN' ? (
                            <li><Link href="/Dashboard" className={classes.link}>Dashboard Admin</Link></li>
                        ) : role === 'CLIENTE VERIFICATO' ? (
                            <li><Link href="/DashboardUtenti" className={classes.link}>Dashboard Utente</Link></li>
                        ) : null}
                    </ul>
                </div>

                <div className={classes.navRight}>
                    <ul className={classes.navList}>
                        <li>
                            {user ? (
                                <>
                                    <span className={classes.welcomeMessage}>Ciao, {user.nome}</span>
                                    <button onClick={handleLogout} className={classes.logoutButton}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/Login" className={classes.link}>Accedi</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
