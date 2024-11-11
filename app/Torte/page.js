"use client";

import classes from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Torte() {
  const [prodotto, setProdotto] = useState([]);
  const [user, setUser] = useState(null);

  // Recupera i prodotti dal backend solo se l'utente loggato ha il ruolo ADMIN o CLIENTE VERIFICATO
  useEffect(() => {
    const fetchProdotto = async () => {
      try {
        const res = await fetch("http://localhost:8080/prodotto", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Errore nel recupero dei prodotti");
        }
        const data = await res.json();
        setProdotto(data);
        console.log("Prodotti caricati:", data);
      } catch (error) {
        console.error("Errore durante il recupero dei prodotti:", error);
      }
    };
    fetchProdotto(); // Chiama fetchProdotto
  }, []);

  // Recupera l'utente dal backend utilizzando il valore del cookie di sessione
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/utente", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Errore nel recupero dell'utente");
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
      }
    };
  }, []);

  return (
    <>
      <main className={classes.main}>
        <p className={classes.paragraph}>
          La nostra pasticceria a Varese propone una raffinata selezione di
          torte classiche e moderne, come la Saint Honoré e la Millefoglie,
          oltre a creazioni più contemporanee con mousse, cremosi e gelatine. Le
          proposte variano secondo la stagionalità delle materie prime e la
          creatività di Giacomo Aceti, sempre alla ricerca di nuove combinazioni
          di sapori. Non sai quale scegliere? Nessun problema! Offriamo anche
          versioni monoporzione, ideali per una degustazione che ti condurrà in
          un viaggio tra gusti unici. Ti aspettiamo nella nostra boutique in Via
          Carlo Croce, 4 per scoprire anche le delizie rustiche come la Lemon
          Tarte, la Paris-Brest e il Bosco Segreto!
          <br />
          <br />
          Le torte moderne sono soggette a disponibilità e stagionalità dei
          prodotti. Contattaci per organizzare il tuo ordine: siamo certi di
          avere il dolce perfetto per te!
        </p>

        <ul className={classes.torta}>
          {prodotto.map((torta) => (
            <li key={torta.id}>
              <article className={classes.torta}>
                <header>
                  <div className={classes.image}>
                    <Image
                      src={"/immaginiTorte/" + torta.foto} // dà errore l'utlizzo di tutti i div
                      alt={torta.nome}
                      fill
                    />
                  </div>
                  <div className={classes.headerText}>
                    <h2>{torta.nome}</h2>
                    <p className={classes.prezzo}>€{torta.prezzo}</p>
                  </div>
                </header>
                <div className={classes.content}>
                  <p className={classes.descrizione}>{torta.descrizione}</p>
                  <p className={classes.ingredienti}>
                    <strong>Ingredienti:</strong> {torta.ingredienti}
                  </p>
                  <p className={classes.quantita}>
                    <strong>Quantità:</strong> {torta.quantita}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
