"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const InventoryTable = () => {
    const [products, setProducts] = useState([]);

    // Recupera i prodotti dal backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://your-backend-url.com/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Errore durante il recupero dei prodotti:", error);
            }
        };
        fetchProducts();
    }, []);

    // Aggiungi un nuovo prodotto
    const addProduct = async (newProduct) => {
        try {
            const res = await fetch('https://your-backend-url.com/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            const data = await res.json();
            if (res.ok) {
                setProducts([...products, data]);
            } else {
                console.error("Errore durante l'aggiunta del prodotto:", data.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API per aggiungere il prodotto:", error);
        }
    };

    // Modifica un prodotto esistente
    const updateProduct = async (updatedProduct) => {
        try {
            const res = await fetch(`https://your-backend-url.com/api/products/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (res.ok) {
                setProducts(products.map(product => 
                    product.id === updatedProduct.id ? updatedProduct : product
                ));
            } else {
                const errorData = await res.json();
                console.error("Errore durante l'aggiornamento del prodotto:", errorData.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API per aggiornare il prodotto:", error);
        }
    };

    // Elimina un prodotto
    const deleteProduct = async (productId) => {
        try {
            const res = await fetch(`https://your-backend-url.com/api/products/delete/${productId}`, {
                method: 'DELETE',
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
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestione Magazzino</h1>
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
                            <td className={styles.tableCell}><img src={product.image} alt={product.name} className={styles.img} /></td>
                            <td className={styles.tableCell}>{product.name}</td>
                            <td className={styles.tableCell}>{product.description}</td>
                            <td className={styles.tableCell}>{product.ingredients}</td>
                            <td className={styles.tableCell}>{product.price}€</td>
                            <td className={styles.tableCell}>{product.quantity}</td>
                            <td className={styles.tableCell}>
                                <button className={`${styles.edit} ${styles.button}`} onClick={() => updateProduct(product)}>Modifica</button>
                                <button className={`${styles.delete} ${styles.button}`} onClick={() => deleteProduct(product.id)}>Elimina</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modulo o componenti per aggiungere prodotti */}
        </div>
    );
};

export default InventoryTable;
