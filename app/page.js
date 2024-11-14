import classes from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.topBackground}>
        <section className={classes.hero}>
          <div className={classes.heroContent}></div>
        </section>

        <section className={classes.textWithImage}>
          <div className={classes.textBlock}>
            <h2>Pasticceria C'est la Vie a Varese</h2>
            <p>
              Mi chiamo Giacomo Aceti e sono il titolare di C'est la Vie. La mia
              pasticceria nasce nel 2018, come una tradizione italiana
              rivisitata e stravolta. Vi aspetto per la vendita diretta in Via
              Carlo Croce 4.
            </p>
            <p>
              Nel laboratorio produciamo tutti i prodotti messi a disposizione
              della nostra boutique, con un obiettivo: fare della pasticceria
              un’arte di alta qualità e creazioni che uniscono tradizione e
              innovazione.
            </p>
      
          </div>
          <div className={classes.imageBlock}>
            <Image
              src="/immagini/bakery.jpg"
              alt="Interno pasticceria"
              width={600}
              height={500}
              className={classes.sideImage}
            />
          </div>
        </section>

        <section className={classes.infoSection}>
          <div className={classes.column}>
            <div className={classes.hours}>
              <h3>Orari di apertura</h3>
              <p>Lunedì: Chiuso</p>
              <p>Mar - Ven: 08:00 - 13:00 | 14:30 - 19:00</p>
              <p>Sab - Dom: 14:30 - 19:00</p>
            </div>
            <div className={classes.extraImage}>
              <Image
                src="/immagini/foto6.jpg"
                alt="Immagine orari"
                width={300}
                height={200}
                className={classes.imageRounded}
              />
            </div>
          </div>

          <div className={classes.middleImage}>
            <Image
              src="/immagini/foto4.jpg"
              alt="Vetrina di macarons"
              width={400}
              height={300}
              className={classes.imageRounded}
            />
          </div>

          <div className={classes.column}>
            <div className={classes.extraImage}>
              <Image
                src="/immagini/foto5.jpg"
                alt="Immagine sedi"
                width={300}
                height={200}
                className={classes.imageRounded}
              />
            </div>
            <div className={classes.locations}>
              <h3>Le nostre sedi</h3>
              <p>Laboratorio: Via Garibaldi, 5 - Varese</p>
              <p>Boutique: Via Carlo Croce, 4 - Varese</p>
              <Link href="/Contatti">
                <button className={classes.infoButton}>Scopri di più</button>
              </Link>
            </div>
          </div>
        </section>

        <section className={classes.fullWidthImageContainer}>
          <div className={classes.whiteOverlay}></div>{" "}
          {/* Sovrapposizione bianca */}
        </section>
      </div>
      

      <div className={classes.bottomBackground}>
        <section className={classes.imageWithText}>
          <div className={classes.imageBlock}>
            <Image
              src="/immagini/foto3.jpg"
              alt="Dolci"
              width={600}
              height={400}
              className={classes.sideImage}
            />
          </div>
          <div className={classes.textBlock}>
            <h2>Pasticceria C'est la Vie a Varese</h2>
            <p>
              Mi chiamo Giacomo Aceti e sono il titolare di C'est la Vie. La mia
              pasticceria nasce nel 2018, come una tradizione italiana
              rivisitata e stravolta. Vi aspetto per la vendita diretta in Via
              Carlo Croce 4.
            </p>
            <p>
              Nel laboratorio produciamo tutti i prodotti messi a disposizione
              della nostra boutique, con un obiettivo: fare della pasticceria
              un’arte di alta qualità e creazioni che uniscono tradizione e
              innovazione.
            </p>
          
          </div>
        </section>
        <section className={classes.ctaSection}>
          <div className={classes.ctaContent}>
            <h2>Ordina e Ritira in Sede!</h2>
            <p>
              Ora puoi effettuare un ordine e ritirarlo direttamente in pasticceria! Assapora le nostre delizie senza attese.
            </p>
            <Link href="/Prenota">
              <button className={classes.ctaButton}>Scopri di più e Ordina Ora</button>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
