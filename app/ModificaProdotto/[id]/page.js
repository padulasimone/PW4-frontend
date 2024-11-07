"use client";

import {useState, useEffect} from 'react';
import styles from './page.module.css';

const ModificaProdotto = () => {
    const idProdotto = window.location.pathname.split('/').pop();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch user data from the backend using the session cookie
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

    // Fetch product data from the backend using the product ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:8080/prodotto/${idProdotto}`, {
                    credentials: 'include',
                });
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Errore durante il recupero del prodotto:", error);
            }
        };
        fetchProduct();
    }, [idProdotto]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user && user.ruolo === 'ADMIN') {
            try {
                const res = await fetch(`http://localhost:8080/prodotto/${idProdotto}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(product),
                });
                if (res.ok) {
                    alert('Prodotto aggiornato con successo');
                    window.location.href = '/GestioneMagazzino';
                } else {
                    const errorData = await res.json();
                    console.error("Errore durante l'aggiornamento del prodotto:", errorData.message);
                }
            } catch (error) {
                console.error("Errore durante la chiamata API per aggiornare il prodotto:", error);
            }
        } else {
            alert('Non sei autorizzato a modificare questo prodotto');
        }
    };

    if (!product) return <div>Caricamento...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Modifica Prodotto</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={product.nome} onChange={handleInputChange}/>
                </label>
                <label>
                    Descrizione:
                    <input type="text" name="descrizione" value={product.descrizione} onChange={handleInputChange}/>
                </label>
                <label>
                    Ingredienti:
                    <input type="text" name="ingredienti" value={product.ingredienti} onChange={handleInputChange}/>
                </label>
                <label>
                    Prezzo:
                    <input type="number" name="prezzo" value={product.prezzo} onChange={handleInputChange}/>
                </label>
                <label>
                    Quantità:
                    <input type="number" name="quantita" value={product.quantita} onChange={handleInputChange}/>
                </label>
                <label>
                    Foto:
                    <input type="text" name="foto" value={product.foto} onChange={handleInputChange}/>
                </label>
                <button type="submit">Salva</button>
            </form>
        </div>
    );
};

export default ModificaProdotto;