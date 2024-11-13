// pages/GestioneUtenti.js
"use client";
import {useState, useEffect} from "react";
import classes from "./page.module.css";

const UserManagementTable = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const userPerPage = 10;

    // Recupera l'utente loggato
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/utente", {
                    credentials: "include",
                });
                const data = await res.json();
                setCurrentUser(data);
            } catch (error) {
                alert("Non sei autorizzato a visualizzare questa pagina.");
                window.location.href = "/";
            }
        };
        fetchCurrentUser();
    }, []);

    // Recupera tutti gli utenti se l'utente loggato è ADMIN
    useEffect(() => {
        if (currentUser?.ruolo === "ADMIN") {
            const fetchUsers = async () => {
                try {
                    const res = await fetch("http://localhost:8080/utente/all", {
                        credentials: "include",
                    });
                    const data = await res.json();
                    setUsers(Array.isArray(data) ? data : [data]); // Garantisce che sia un array
                } catch (error) {
                    console.error("Errore durante il recupero degli utenti:", error);
                }
            };
            fetchUsers();
        }
    }, [currentUser]);

    const handleEditClick = (userId) => {
        window.location.href = `/ModificaUtente/${userId}`;
    };

    const deleteUser = async (userId) => {
        const isConfirmed = window.confirm(
            "Sei sicuro di voler eliminare questo utente?"
        );
        if (isConfirmed) {
            try {
                const res = await fetch(`http://localhost:8080/utente/${userId}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                if (res.ok) {
                    setUsers(users.filter((user) => user.id !== userId));
                } else {
                    const errorData = await res.json();
                    console.error(
                        "Errore durante l'eliminazione dell'utente:",
                        errorData
                    );
                }
            } catch (error) {
                console.error("Errore durante l'eliminazione dell'utente:", error);
            }
        }
    };

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const usersToShow = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(users.length / userPerPage)) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Gestione Utenti</h1>
            <table className={classes.table}>
                <thead className={classes.tableHead}>
                <tr>
                    <th className={classes.tableHeader}>ID</th>
                    <th className={classes.tableHeader}>Nome</th>
                    <th className={classes.tableHeader}>Cognome</th>
                    <th className={classes.tableHeader}>Email</th>
                    <th className={classes.tableHeader}>Telefono</th>
                    <th className={classes.tableHeader}>Ruolo</th>
                    <th className={classes.tableHeader}>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {usersToShow.map((user) => (
                    <tr key={user.id} className={classes.tableRow}>
                        <td className={classes.tableCell}>{user.id}</td>

                        <td className={classes.tableCell}>{user.nome}</td>
                        <td className={classes.tableCell}>{user.cognome}</td>
                        <td className={classes.tableCell}>{user.email}</td>
                        <td className={classes.tableCell}>{user.telefono || "N/A"}</td>
                        <td className={classes.tableCell}>{user.ruolo}</td>
                        <td className={classes.tableCell}>
                            <button
                                className={`${classes.edit} ${classes.button}`}
                                onClick={() => handleEditClick(user.id)}
                            >
                                Modifica
                            </button>
                            <button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={() => deleteUser(user.id)}
                            >
                                Elimina
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={classes.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Precedente</button>
                <span>Pagina {currentPage} di {Math.ceil(users.length / userPerPage)}</span>
                <button onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(users.length / userPerPage)}>Successivo
                </button>
            </div>
        </div>
    );
};

export default UserManagementTable;
