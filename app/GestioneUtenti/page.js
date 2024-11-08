// pages/GestioneUtenti.js
"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';

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
        <div className={styles.container}>
            <h1 className={styles.title}>Gestione Utenti</h1>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.tableHeader}>ID</th>
                        <th className={styles.tableHeader}>Nome</th>
                        <th className={styles.tableHeader}>Cognome</th>
                        <th className={styles.tableHeader}>Email</th>
                        <th className={styles.tableHeader}>Telefono</th>
                        <th className={styles.tableHeader}>Ruolo</th>
                        <th className={styles.tableHeader}>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className={styles.tableRow}>
                            <td className={styles.tableCell}>{user.id}</td>
                            <td className={styles.tableCell}>{user.nome}</td>
                            <td className={styles.tableCell}>{user.cognome}</td>
                            <td className={styles.tableCell}>{user.email}</td>
                            <td className={styles.tableCell}>{user.telefono || 'N/A'}</td>
                            <td className={styles.tableCell}>{user.ruolo}</td>
                            <td className={styles.tableCell}>
                                <button className={`${styles.edit} ${styles.button}`}
                                        onClick={() => handleEditClick(user.id)}>Modifica
                                </button>
                                <button className={`${styles.delete} ${styles.button}`}
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
