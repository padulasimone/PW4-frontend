"use client";
import {useState, useEffect} from 'react';
import styles from './page.module.css';

const InventoryTable = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    // Recupera l'utente dal backend utilizzando il valore del cookie di sessione
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/utente', {
                    credentials: 'include',
                });
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Errore durante il recupero dell'utente:", error);
            }
        };
        fetchUser();
    }, []);

    // Recupera i prodotti dal backend solo se l'utente loggato ha il ruolo ADMIN o CLIENTE VERIFICATO
    useEffect(() => {
        if (user && (user.ruolo === 'ADMIN' || user.ruolo === 'CLIENTE VERIFICATO')) {
            const fetchProducts = async () => {
                try {
                    const res = await fetch('http://localhost:8080/prodotto', {
                        credentials: 'include',
                    });
                    const data = await res.json();
                    setProducts(data);
                } catch (error) {
                    console.error("Errore durante il recupero dei prodotti:", error);
                }
            };
            fetchProducts();
        }
    }, [user]);

    // Aggiungi un nuovo prodotto solo se l'utente loggato ha il ruolo ADMIN
    const addProduct = async (newProduct) => {
        try {
            const res = await fetch('https://localhost:8080/prodotto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (res.ok) {
                const data = await res.json();
                setProducts([...products, data]);
            } else {
                const errorData = await res.json();
                console.error("Errore durante l'aggiunta del prodotto:", errorData.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API per aggiungere il prodotto:", error);
        }
    };

// Elimina un prodotto esistente solo se l'utente loggato ha il ruolo ADMIN
    const deleteProduct = async (productId) => {
        try {
            const res = await fetch(`http://localhost:8080/prodotto/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (res.ok) {
                setProducts(products.filter(product => product.id !== productId));
            } else {
                const errorData = await res.json();
                console.error("Errore durante l'eliminazione del prodotto:", errorData.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API per eliminare il prodotto:", error);
        }
    }

    const handleEditClick = (productId) => {
        window.location.href = `/ModificaProdotto/${productId}`;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestione Magazzino</h1>
            <button className={styles.addButton} onClick={() => window.location.href = '/AggiungiProdotto'}>
                Aggiungi Prodotto
            </button>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                <tr>
                    <th className={styles.tableHeader}>Immagine</th>
                    <th className={styles.tableHeader}>Nome</th>
                    <th className={styles.tableHeader}>Descrizione</th>
                    <th className={styles.tableHeader}>Ingredienti</th>
                    <th className={styles.tableHeader}>Prezzo</th>
                    <th className={styles.tableHeader}>Quantità</th>
                    <th className={styles.tableHeader}>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className={styles.tableRow}>
                        <td className={styles.tableCell}><img src={"/immaginiTorte/" + product.foto} alt={product.nome}
                                                              className={styles.img}/></td>
                        <td className={styles.tableCell}>{product.nome}</td>
                        <td className={styles.tableCell}>{product.descrizione}</td>
                        <td className={styles.tableCell}>{product.ingredienti}</td>
                        <td className={styles.tableCell}>{product.prezzo}€</td>
                        <td className={styles.tableCell}>{product.quantita}</td>
                        <td className={styles.tableCell}>
                            <button className={`${styles.edit} ${styles.button}`}
                                    onClick={() => handleEditClick(product.id)}>Modifica
                            </button>
                            <button className={`${styles.delete} ${styles.button}`}
                                    onClick={() => deleteProduct(product.id)}>Elimina
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
