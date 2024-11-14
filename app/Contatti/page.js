"use client";

import { useState } from "react";
import classes from "./page.module.css";
import Image from "next/image";

export default function Contatti() {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setTimeout(() => {
      console.log("Dati inviati:", Object.fromEntries(formData.entries()));

      setFeedbackMessage("Messaggio inviato con successo!");

      event.target.reset();
    }, 1000);
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
              href="https://www.facebook.com/pasticceriacestlavie"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={classes.icon1} // Assicurati di avere una classe per la gestione dello stile dell'icona
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
            </a>
          </div>

          <div className={classes.socialCard}>
            <a
              href="https://www.instagram.com/pasticceriacestlavie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className={classes.icon} // Assicurati di avere una classe per la gestione dello stile dell'icona
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
