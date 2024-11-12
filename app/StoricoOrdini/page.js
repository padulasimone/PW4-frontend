"use client";

import {useState, useEffect} from "react";
import classes from "./page.module.css";

export default function StoricoOrdini() {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const res = await fetch("http://localhost:8080/ordine/utente?storico=true", {
                    credentials: "include",
                });
                const data = await res.json();
                setOrderHistory(data);
            } catch (error) {
                console.error("Errore durante il recupero degli ordini storici:", error);
            }
        };
        fetchOrderHistory();
    }, []);

    return (
        <div className={classes.dashboard}>
            <section className={classes.section}>
                <div className={classes.sectionHeader}>
                    <h1 className={classes.title}>Storico Ordini</h1>
                </div>
                <div className={classes.orderList}>
                    {orderHistory.map((order) => (
                        <div key={order.id} className={classes.orderItem}>
                            <div className={classes.orderDetails}>
                                {order.dettaglio.map((item, index) => (
                                    <div key={index} className={classes.orderDetailItem}>
                                        <p>{item.nome} x{item.quantita}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={classes.orderDetail}>Data di
                                ritiro: {new Date(order.data_ritiro).toLocaleString()}</p>
                            <p className={`${classes.status} ${classes.delivered}`}>{order.stato}</p>
                        </div>
                    ))}
                    {orderHistory.length === 0 && (
                        <p className={classes.noOrders}>Ancora nessun ordine in questa sezione</p>
                    )}
                </div>
            </section>
        </div>
    );
}