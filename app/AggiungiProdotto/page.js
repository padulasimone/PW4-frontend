"use client";

import {useState} from "react";
import styles from "./page.module.css";

const AggiungiProdotto = () => {
    const [product, setProduct] = useState({
        nome: "",
        descrizione: "",
        ingredienti: "",
        prezzo: "",
        quantita: "",
        foto: "",
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "image/jpeg") {
            setFile(file);
        } else {
            alert("Please select a .jpg file");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const fileName = `${product.nome.replace(/\s+/g, "-").toLocaleLowerCase()}.jpg`;
            const updatedProduct = {...product, foto: fileName};

            try {
                const res = await fetch("http://localhost:8080/prodotto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedProduct),
                });
                if (res.ok) {
                    alert("Prodotto aggiunto con successo");
                    window.location.href = "/GestioneMagazzino";
                } else {
                    const errorData = await res.json();
                    console.error(
                        "Errore durante l'aggiunta del prodotto:",
                        errorData.message
                    );
                }
            } catch (error) {
                console.error(
                    "Errore durante la chiamata API per aggiungere il prodotto:",
                    error
                );
            }
        } else {
            alert("Please select a .jpg file");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Aggiungi Prodotto</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={product.nome}
                        onChange={handleInputChange}
                        required
                        placeholder="Nome del prodotto"
                    />
                </label>
                <label>
                    Descrizione:
                    <input
                        type="text"
                        name="descrizione"
                        value={product.descrizione}
                        onChange={handleInputChange}
                        required
                        placeholder="Descrizione del prodotto"
                    />
                </label>
                <label>
                    Ingredienti:
                    <input
                        type="text"
                        name="ingredienti"
                        value={product.ingredienti}
                        onChange={handleInputChange}
                        required
                        placeholder="Ingredienti del prodotto"
                    />
                </label>
                <label>
                    Prezzo:
                    <input
                        type="number"
                        name="prezzo"
                        value={product.prezzo}
                        onChange={handleInputChange}
                        required
                        placeholder="Prezzo del prodotto"
                    />
                </label>
                <label>
                    Quantità:
                    <input
                        type="number"
                        name="quantita"
                        value={product.quantita}
                        onChange={handleInputChange}
                        required
                        placeholder="Quantità disponibile"
                    />
                </label>
                <label>
                    Foto:
                    <input
                        type="file"
                        name="foto"
                        accept=".jpg"
                        onChange={handleFileChange}
                        required
                    />
                </label>
                <button type="submit">Aggiungi</button>
            </form>
        </div>
    );
};

export default AggiungiProdotto;