// pages/ModificaUtente.js
"use client";

import {useState, useEffect} from "react";
import classes from "./page.module.css";

const ModificaUtente = () => {
    const [idUtente, setIdUtente] = useState(null);
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Recupera idUtente lato client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const id = window.location.pathname.split("/").pop();
            setIdUtente(id);
        }
    }, []);

    useEffect(() => {
        // Recupera l'utente autenticato
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/utente", {
                    credentials: "include",
                });
                const data = await res.json();
                setCurrentUser(data);
            } catch (error) {
                console.error("Errore durante il recupero dell'utente:", error);
            }
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        // Recupera i dati dell'utente da modificare
        if (idUtente) {
            const fetchUser = async () => {
                try {
                    const res = await fetch(
                        `http://localhost:8080/utente/${idUtente}`,
                        {credentials: "include"}
                    );
                    const data = await res.json();
                    setUser(data);
                } catch (error) {
                    console.error("Errore durante il recupero dell'utente:", error);
                }
            };
            fetchUser();
        }
    }, [idUtente]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentUser && currentUser.ruolo === "ADMIN") {
            try {
                const res = await fetch(
                    `http://localhost:8080/utente/${idUtente}`,
                    {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        credentials: "include",
                        body: JSON.stringify(user),
                    }
                );
                if (res.ok) {
                    alert("Utente aggiornato con successo");
                    window.location.href = "/GestioneUtenti";
                } else {
                    const errorData = await res.json();
                    console.error(
                        "Errore durante l'aggiornamento dell'utente:",
                        errorData.message
                    );
                }
            } catch (error) {
                console.error(
                    "Errore durante la chiamata API per aggiornare l'utente:",
                    error
                );
            }
        } else {
            alert("Non sei autorizzato a modificare questo utente");
        }
    };

    if (!user) return <div>Caricamento...</div>;

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Modifica Utente</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
                <label className={classes.label}>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={user.nome || ""}
                        onChange={handleInputChange}
                        className={classes.input}
                    />
                </label>
                <label className={classes.label}>
                    Cognome:
                    <input
                        type="text"
                        name="cognome"
                        value={user.cognome || ""}
                        onChange={handleInputChange}
                        className={classes.input}
                    />
                </label>
                <label className={classes.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email || ""}
                        onChange={handleInputChange}
                        className={classes.input}
                    />
                </label>
                <label className={classes.label}>
                    Telefono:
                    <input
                        type="text"
                        name="telefono"
                        value={user.telefono || ""}
                        onChange={handleInputChange}
                        className={classes.input}
                    />
                </label>
                <label className={classes.label}>
                    Ruolo:
                    <select
                        name="ruolo"
                        value={user.ruolo || ""}
                        onChange={handleInputChange}
                        className={classes.input}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="CLIENTE NON VERIFICATO">CLIENTE NON VERIFICATO</option>
                        <option value="CLIENTE VERIFICATO">CLIENTE VERIFICATO</option>
                    </select>
                </label>
                <button type="submit" className={classes.button}>
                    Salva
                </button>
            </form>
        </div>
    );
};

export default ModificaUtente;
