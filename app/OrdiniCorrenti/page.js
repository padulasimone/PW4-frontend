"use client";

import {useState, useEffect} from "react";
import classes from "./page.module.css";

export default function OrdiniCorrenti() {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 15;

    useEffect(() => {
        const fetchCurrentOrders = async () => {
            try {
                const res = await fetch("http://localhost:8080/ordine/utente?correnti=true", {
                    credentials: "include",
                });
                const data = await res.json();
                setCurrentOrders(data);
            } catch (error) {
                console.error("Errore durante il recupero degli ordini:", error);
            }
        };
        fetchCurrentOrders();
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrdersToShow = currentOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(currentOrders.length / ordersPerPage)) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className={classes.dashboard}>
            <section className={classes.section}>
                <div className={classes.sectionHeader}>
                    <h1 className={classes.title}>Ordini Correnti</h1>
                </div>
                <div className={classes.orderList}>
                    {currentOrdersToShow.map((order) => (
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
                            {order.stato === "IN PREPARAZIONE" ? (
                                <p className={`${classes.status} ${classes.inProgress}`}>{order.stato}</p>
                            ) : (
                                <p className={`${classes.status} ${classes.awaitingConfirmation}`}>{order.stato}</p>
                            )}
                        </div>
                    ))}
                    {currentOrders.length === 0 && (
                        <p className={classes.noOrders}>Ancora nessun ordine in questa sezione</p>
                    )}
                </div>
                <div className={classes.pagination}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Precedente</button>
                    <span>Pagina {currentPage} di {Math.ceil(currentOrders.length / ordersPerPage)}</span>
                    <button onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(currentOrders.length / ordersPerPage)}>Successivo
                    </button>
                </div>
            </section>
        </div>
    );
}