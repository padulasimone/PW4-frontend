"use client";

import {useState, useEffect} from "react";
import classes from "./page.module.css";
import {FaRegFileExcel} from "react-icons/fa6";

const OrderManagementTable = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const ordersPerPage = 10;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/utente", {
                    credentials: "include",
                });
                const data = await res.json();
                setUser(data);
            } catch (error) {
                alert("Non sei autorizzato a visualizzare questa pagina.");
                window.location.href = "/";
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user && user.ruolo === "ADMIN") {
                try {
                    const res = await fetch("http://localhost:8080/ordine", {
                        credentials: "include",
                    });
                    const data = await res.json();
                    setOrders(data);

                    // Extract unique dates
                    const dates = [...new Set(data.map(order => order.data_ritiro.split("T")[0]))];
                    setUniqueDates(dates);
                } catch (error) {
                    console.error("Errore durante il recupero degli ordini:", error);
                }
            }
        };
        fetchOrders();
    }, [user]);

    const handleDownloadExcel = async () => {
        if (selectedDate) {
            try {
                const res = await fetch(`http://localhost:8080/ordine/excel/${selectedDate}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    window.URL.revokeObjectURL(url);
                    alert("File Excel scaricato con successo");
                } else {
                    console.error("Errore durante il download del file Excel");
                }
            } catch (error) {
                console.error("Errore durante la chiamata API per il download del file Excel:", error);
            }
        } else {
            alert("Seleziona una data di ritiro");
        }
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const ordersToShow = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
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
                body: JSON.stringify({stato: "IN PREPARAZIONE"}), // Aggiorna lo stato a "IN PREPARAZIONE"
            });

            if (res.ok) {
                alert("Ordine aggiornato con successo! E' stata inviata una notifica all'utente.");
                window.location.reload();
            } else {
                const errorText = await res.text();
                console.error("Errore durante la conferma dell'ordine:", {
                    status: res.status,
                    statusText: res.statusText,
                    errorText: errorText || "Errore sconosciuto",
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
            <div className={classes.header}>
                <h1 className={classes.title}>Gestione Ordini</h1>
                <form className={classes.form}>
                    <label htmlFor="dateSelect">Seleziona Data Ritiro:</label>
                    <select
                        id="dateSelect"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        <option value="">Nessuna data selezionata</option>
                        {uniqueDates.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleDownloadExcel}>
                        Esporta Excel <FaRegFileExcel />
                    </button>
                </form>
            </div>
            <table className={classes.table}>
                <thead className={classes.tableHead}>
                <tr>
                    <th className={classes.tableHeader}>Data</th>
                    <th className={classes.tableHeader}>Email Utente</th>
                    <th className={classes.tableHeader}>Data Ritiro</th>
                    <th className={classes.tableHeader}>Prezzo Totale</th>
                    <th className={classes.tableHeader}>Stato</th>
                    <th className={classes.tableHeader}>Commento</th>
                    <th className={classes.tableHeader}>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {ordersToShow.map((order, index) => (
                    <tr key={order.id || index} className={classes.tableRow}>
                        <td className={classes.tableCell}>
                            {new Date(order.data).toLocaleString()}
                        </td>
                        <td className={classes.tableCell}>{order.email_utente}</td>
                        <td className={classes.tableCell}>
                            {new Date(order.data_ritiro).toLocaleString()}
                        </td>
                        <td className={classes.tableCell}>{order.prezzoTotale}€</td>
                        <td className={classes.tableCell}>{order.stato}</td>
                        <td className={classes.tableCell}>{order.commento}</td>
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
                ))}
                </tbody>
            </table>
            <div className={classes.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Precedente
                </button>
                <span>
          Pagina {currentPage} di {Math.ceil(orders.length / ordersPerPage)}
        </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
                >
                    Successivo
                </button>
            </div>
        </div>
    );
};

export default OrderManagementTable;