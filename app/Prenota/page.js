"use client";
import { useState, useEffect } from "react";
import classes from "./page.module.css";
import Link from "next/link";

const CakeReservation = () => {
  const [cakes, setCakes] = useState([]);
  const [user, setUser] = useState(null);

  // Recupera l'utente dal backend
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

  // Recupera le torte dal backend e inizializza `counter`
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await fetch("http://localhost:8080/prodotto", {
          credentials: "include",
        });
        const data = await res.json();
        const cakesWithCounter = data.map((cake) => ({
          ...cake,
          counter: 0, // Inizializza il contatore a 0 per ciascuna torta
        }));
        setCakes(cakesWithCounter);
      } catch (error) {
        console.error("Errore durante il recupero del prodotto:", error);
      }
    };
    fetchCakes();
  }, []);

  const handleIncrement = (index) => {
    setCakes((prevCakes) =>
      prevCakes.map((cake, i) =>
        i === index && cake.counter < cake.quantita
          ? { ...cake, counter: cake.counter + 1 }
          : cake
      )
    );
  };

  const handleDecrement = (index) => {
    setCakes((prevCakes) =>
      prevCakes.map((cake, i) =>
        i === index && cake.counter > 0 ? { ...cake, counter: cake.counter - 1 } : cake
      )
    );
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Prenota le tue Torte</h1>
      <div className={classes.cakeList}>
        {cakes.map((cake, index) => (
          <div key={cake.id} className={classes.cakeItem}>
            <img src={"/immaginiTorte/" + cake.foto} alt={cake.nome} className={classes.img} />
            <div className={classes.cakeDetails}>
              <h2>{cake.nome}</h2>
              <p className={classes.descrizione}>{cake.descrizione}</p>
              <p className={classes.ingredienti}>Ingredienti: {cake.ingredienti}</p>
              <p className={classes.prezzo}>Prezzo: {cake.prezzo}€</p>
              <p className={classes.quantita}>Disponibilità: {cake.quantita}</p>
              <div className={classes.counter}>
                <button onClick={() => handleDecrement(index)} className={classes.counterButton}>
                  -
                </button>
                <span className={classes.counterValue}>{cake.counter}</span>
                <button onClick={() => handleIncrement(index)} className={classes.counterButton}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <Link href="/PrenotaDataOra">
          <button className={classes.nextButton}>Successivo</button>
        </Link>
      </div>
    </div>
  );
};

export default CakeReservation;
