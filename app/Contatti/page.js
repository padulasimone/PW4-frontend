"use client";

import { useState } from "react";
import classes from "./page.module.css";
import Image from "next/image";

export default function Contatti() {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Simuliamo un invio con un setTimeout
    setTimeout(() => {
      // Qui puoi gestire i dati del modulo
      console.log("Dati inviati:", Object.fromEntries(formData.entries()));

      // Imposta un messaggio di conferma
      setFeedbackMessage("Messaggio inviato con successo!");
      // Pulisci il modulo se necessario
      event.target.reset();
    }, 1000); // Simula un invio che richiede 1 secondo
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.introduction}>
          <h2>La nostra pasticceria artigianale ti aspetta!</h2>
          <p>
            C'est la Vie è una pasticceria in stile francese con una boutique in
            via Carlo Croce, 4 a Varese. La nostra pasticceria artigianale offre
            una vasta gamma di prodotti dolciari, tra cui: macarons, torte
            tradizionali e moderne, biscotti artigianali, pasticceria mignon,
            confetture e marmellate. Inoltre, su prenotazione, realizziamo torte
            personalizzabili per eventi e wedding cake. È possibile recarsi nel
            laboratorio di Via Garibaldi, 5 sia per gli ordini che per i ritiri.
            Il laboratorio è aperto dal martedì al sabato dalle 7.30 alle 13.00
            e dalle 14.30 alle 17.00 e la domenica dalle 8.00 alle 12.30.
          </p>
          <p>
            Per effettuare un ordine o richiedere informazioni, è possibile
            compilare il modulo di contatto presente in questa pagina.
          </p>
        </div>

        <div className={classes.formContainer}>
          <form className={classes.contactForm} onSubmit={handleSubmit}>
            <h2>Compila il form per informazioni</h2>

            <div className={classes.formGroup}>
              <label htmlFor="firstName">* Nome:</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="lastName">* Cognome:</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="email">* E-mail:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="phone">Telefono:</label>
              <input type="tel" id="phone" name="phone" />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="message">* Messaggio:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
              ></textarea>
            </div>

            <div className={classes.checkboxGroup}>
              <input type="checkbox" id="privacy" name="privacy" required />
              <label htmlFor="privacy">
                Ho letto l’informativa e autorizzo il trattamento dei miei dati
                personali per le finalità ivi indicate.
              </label>
            </div>

            <div className={classes.checkboxGroup}>
              <input type="checkbox" id="offers" name="offers" />
              <label htmlFor="offers">
                Ricevi offerte speciali e promozioni dedicate.
              </label>
            </div>

            <button type="submit" className={classes.submitButton}>
              Invia Messaggio
            </button>
          </form>

          <Image
            className={classes.image}
            src="/immagini/pasticceriaContatti.jpg"
            alt="Pasticceria"
            width={800}
            height={800}
          />
        </div>

        <div className={classes.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.113829823622!2d8.814900615454175!3d45.8254222791139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4787bc052f6cbe01%3A0x150e08f24f407365!2sVia%20Carlo%20Croce%2C%204%2C%2021100%20Varese%20VA!5e0!3m2!1sit!2sit!4v1692451534094!5m2!1sit!2sit"
            width="600"
            height="350"
            className={classes.map}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          <div className={classes.socialCard}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Facebook</h3>
              <p>Seguici su Facebook per le ultime novità!</p>
            </a>
          </div>

          <div className={classes.socialCard}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Instagram</h3>
              <p>Seguici su Instagram per ispirazioni dolci!</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
