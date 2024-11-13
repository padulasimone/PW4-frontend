"use client";
import { useState, useEffect } from "react";
import classes from "./page.module.css";

const OrderManagementTable = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/utente", {
                    credentials: "include",
                });
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Errore durante il recupero dell'utente:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user && (user.ruolo === "ADMIN" || user.ruolo === "CLIENTE VERIFICATO")) {
                try {
                    const res = await fetch("http://localhost:8080/ordine", {
                        credentials: "include",
                    });
                    const data = await res.json();
                    console.log("Dati degli ordini:", data); // Verifica la struttura dei dati ricevuti
                    setOrders(data);
                } catch (error) {
                    console.error("Errore durante il recupero degli ordini:", error);
                }
            }
        };
        fetchOrders();
    }, [user]);

    const handleConfirmOrder = async (orderId) => {
        if (!orderId) {
            console.error("L'ID dell'ordine è undefined o non trovato.");
            alert("Errore: ID ordine non trovato.");
            return;
        }
    
        const id = orderId.toString();
    
        try {
            const res = await fetch(`http://localhost:8080/ordine/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ stato: "IN PREPARAZIONE" }), // Aggiorna lo stato a "IN PREPARAZIONE"
            });
    
            if (res.ok) {
                setOrders(orders.map(order =>
                    order.id === id ? { ...order, stato: "IN PREPARAZIONE" } : order // Imposta localmente lo stato a "IN PREPARAZIONE"
                ));
                alert("Ordine aggiornato a 'in preparazione' con successo!");
            } else {
                const errorText = await res.text();
                console.error("Errore durante la conferma dell'ordine:", {
                    status: res.status,
                    statusText: res.statusText,
                    errorText: errorText || "Errore sconosciuto"
                });
                alert(`Errore durante la conferma dell'ordine: ${res.status} ${res.statusText}. Riprova.`);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API per confermare l'ordine:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    };
    
    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Gestione Ordini</h1>
            <table className={classes.table}>
                <thead className={classes.tableHead}>
                    <tr>
                        <th className={classes.tableHeader}>Commento</th>
                        <th className={classes.tableHeader}>Data</th>
                        <th className={classes.tableHeader}>Data Ritiro</th>
                        <th className={classes.tableHeader}>Email Utente</th>
                        <th className={classes.tableHeader}>Prezzo Totale</th>
                        <th className={classes.tableHeader}>Stato</th>
                        <th className={classes.tableHeader}>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        console.log("Struttura dell'ordine:", order); // Verifica l'oggetto ordine

                        return (
                            <tr key={order.id || index} className={classes.tableRow}>
                                <td className={classes.tableCell}>{order.commento}</td>
                                <td className={classes.tableCell}>{new Date(order.data).toLocaleString()}</td>
                                <td className={classes.tableCell}>{new Date(order.data_ritiro).toLocaleString()}</td>
                                <td className={classes.tableCell}>{order.email_utente}</td>
                                <td className={classes.tableCell}>{order.prezzoTotale}€</td>
                                <td className={classes.tableCell}>{order.stato}</td>
                                <td className={classes.tableCell}>
                                    {order.stato === "IN ATTESA DI CONFERMA" && (
                                        <button
                                            className={`${classes.button} ${classes.confirmButton}`}
                                            onClick={() => handleConfirmOrder(order.id)}
                                        >
                                            Conferma
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagementTable;
