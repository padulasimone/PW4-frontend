// pages/GestioneUtenti.js
"use client";
import { useState, useEffect } from 'react';
import classes from './page.module.css';

const UserManagementTable = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Recupera l'utente loggato
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/utente', {
                    credentials: 'include',
                });
                const data = await res.json();
                setCurrentUser(data);
            } catch (error) {
                console.error("Errore durante il recupero dell'utente:", error);
            }
        };
        fetchCurrentUser();
    }, []);

    // Recupera tutti gli utenti se l'utente loggato è ADMIN
    useEffect(() => {
        if (currentUser?.ruolo === 'ADMIN') {
            const fetchUsers = async () => {
                try {
                    const res = await fetch('http://localhost:8080/utente/all', {
                        credentials: 'include',
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
        try {
            const res = await fetch(`http://localhost:8080/utente/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (res.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                console.error("Errore durante l'eliminazione dell'utente");
            }
        } catch (error) {
            console.error("Errore durante la chiamata API per eliminare l'utente:", error);
        }
    };

    if (!currentUser || currentUser.ruolo !== 'ADMIN') {
        return <p>Accesso negato. Solo gli amministratori possono visualizzare questa pagina.</p>;
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
                    {users.map((user) => (
                        <tr key={user.id} className={classes.tableRow}>
                            <td className={classes.tableCell}>{user.id}</td>
                            <td className={classes.tableCell}>{user.nome}</td>
                            <td className={classes.tableCell}>{user.cognome}</td>
                            <td className={classes.tableCell}>{user.email}</td>
                            <td className={classes.tableCell}>{user.telefono || 'N/A'}</td>
                            <td className={classes.tableCell}>{user.ruolo}</td>
                            <td className={classes.tableCell}>
                                <button className={`${classes.edit} ${classes.button}`}
                                        onClick={() => handleEditClick(user.id)}>Modifica
                                </button>
                                <button className={`${classes.delete} ${classes.button}`}
                                        onClick={() => deleteUser(user.id)}>Elimina
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementTable;
