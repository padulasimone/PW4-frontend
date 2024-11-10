"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

const ModificaProdotto = () => {
  const [idProdotto, setIdProdotto] = useState(null);
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  // Recupera idProdotto lato client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/").pop();
      setIdProdotto(id);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/utente", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (idProdotto) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/prodotto/${idProdotto}`,
            { credentials: "include" }
          );
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error("Errore durante il recupero del prodotto:", error);
        }
      };
      fetchProduct();
    }
  }, [idProdotto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.ruolo === "ADMIN") {
      try {
        const res = await fetch(
          `http://localhost:8080/prodotto/${idProdotto}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(product),
          }
        );
        if (res.ok) {
          alert("Prodotto aggiornato con successo");
          window.location.href = "/GestioneMagazzino";
        } else {
          const errorData = await res.json();
          console.error(
            "Errore durante l'aggiornamento del prodotto:",
            errorData.message
          );
        }
      } catch (error) {
        console.error(
          "Errore durante la chiamata API per aggiornare il prodotto:",
          error
        );
      }
    } else {
      alert("Non sei autorizzato a modificare questo prodotto");
    }
  };

  if (!product) return <div>Caricamento...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modifica Prodotto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome:
          <input
            type="text"
            name="nome"
            value={product.nome || ""}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Descrizione:
          <textarea
            name="descrizione"
            value={product.descrizione || ""}
            onChange={handleInputChange}
            className={styles.textarea}
          />
        </label>
        <label className={styles.label}>
          Ingredienti:
          <textarea
            name="ingredienti"
            value={product.ingredienti || ""}
            onChange={handleInputChange}
            className={styles.textarea}
          />
        </label>
        <label className={styles.label}>
          Prezzo:
          <input
            type="number"
            name="prezzo"
            value={product.prezzo || ""}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Quantità:
          <input
            type="number"
            name="quantita"
            value={product.quantita || ""}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Foto:
          <input
            type="text"
            name="foto"
            value={product.foto || ""}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Salva
        </button>
      </form>
    </div>
  );
};

export default ModificaProdotto;
