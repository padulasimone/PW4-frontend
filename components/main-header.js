"use client";
import { useState, useEffect } from "react";
import classes from "@/components/main-header.module.css";
import Link from "next/link";

export default function Header() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Funzione per aggiornare l'utente e il ruolo dallo storage
        const updateUser = () => {
            const storedUser = localStorage.getItem("user");
            const storedRole = localStorage.getItem("role");
            
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            
            if (storedRole) {
                setRole(storedRole);
            }
        };

        // Esegui updateUser una volta quando il componente si monta
        updateUser();

        // Aggiungi un listener per l'evento "userLoggedIn"
        window.addEventListener("userLoggedIn", updateUser);

        // Pulisci l'event listener quando il componente si smonta
        return () => {
            window.removeEventListener("userLoggedIn", updateUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setUser(null);
        setRole(null);
        window.location.reload();
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
                        {role === 'admin' ? (
                            <li><Link href="/Dashboard" className={classes.link}>Dashboard Admin</Link></li>
                        ) : role === 'user' ? (
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
