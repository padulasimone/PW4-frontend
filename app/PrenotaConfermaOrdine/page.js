"use client";

import {useState, useEffect} from "react";
import Cookies from "js-cookie";
import classes from "./page.module.css";

export default function PrenotaConfermaOrdine() {
    const [orderDetails, setOrderDetails] = useState(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const orderDetailsFromCookie = Cookies.get('dettaglioOrdineEDataOra');
        if (orderDetailsFromCookie) {
            setOrderDetails(JSON.parse(orderDetailsFromCookie));
        }
    }, []);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    const totale = orderDetails.dettaglio.reduce(
        (acc, ordine) => acc + ordine.quantita * ordine.prezzo_unitario,
        0
    );

    const handleConfirmOrder = async () => {
        const updatedOrderDetails = {
            ...orderDetails,
            commento: comment || undefined
        };

        try {
            const response = await fetch('http://localhost:8080/ordine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedOrderDetails),
                credentials: 'include'
            });

            const result = await response.text();

            if (response.ok) {
                Cookies.remove('dettaglioOrdineEDataOra');
                alert(result);
                window.location.href = '/';
            } else {
                alert(result);
            }
        } catch (error) {
            alert('Errore durante la creazione dell\'ordine. Riprova più tardi.');
        }
    };

    return (
        <div className={classes.orderSummary}>
            <div className={classes.section}>
                <h2 className={classes.title}>Riepilogo Ordine</h2>

                <div className={classes.table}>
                    <div className={classes.tableHeader}>
                        <div className={classes.tableCell}>Torta</div>
                        <div className={classes.tableCell}>Quantità</div>
                        <div className={classes.tableCell}>Prezzo</div>
                    </div>
                    {orderDetails.dettaglio.map((ordine, index) => (
                        <div key={index} className={classes.tableRow}>
                            <div className={classes.tableCell}>{ordine.nome}</div>
                            <div className={classes.tableCell}>{ordine.quantita}</div>
                            <div className={classes.tableCell}>{`€${ordine.prezzo_unitario}`}</div>
                        </div>
                    ))}
                    <div className={classes.tableRow}>
                        <div className={classes.tableCell}>Totale</div>
                        <div className={classes.tableCell}></div>
                        <div className={classes.tableCell}>{`€${totale}`}</div>
                    </div>
                </div>
            </div>

            <div className={classes.section}>
                <div>
                    <h3 className={classes.title}>Data e Ora Ritiro</h3>
                    <p className={classes.dateTime}>{orderDetails.data_ritiro.split('T').join(' alle ')}</p>
                </div>
                <div className={classes.commentSection}>
                    <h3 className={classes.title}>Commento</h3>
                    <textarea
                        className={classes.textarea}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Aggiungi un commento all'ordine"
                    />
                </div>
                <div className={classes.confirmButtonContainer}>
                    <button className={classes.confirmButton} onClick={handleConfirmOrder}>Conferma Ordine</button>
                </div>
            </div>
        </div>
    );
}