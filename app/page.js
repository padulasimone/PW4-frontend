import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.topBackground}>
        <section className={styles.hero}>
          <div className={styles.heroContent}></div>
        </section>

        <section className={styles.textWithImage}>
          <div className={styles.textBlock}>
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
            {/* <button className={styles.button}>Ordina Ora</button> */}
          </div>
          <div className={styles.imageBlock}>
            <Image
              src="/immagini/bakery.jpg"
              alt="Interno pasticceria"
              width={600}
              height={500}
              className={styles.sideImage}
            />
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.column}>
            <div className={styles.hours}>
              <h3>Orari di apertura</h3>
              <p>Lunedì: Chiuso</p>
              <p>Mar - Ven: 08:00 - 13:00 | 14:30 - 19:00</p>
              <p>Sab - Dom: 14:30 - 19:00</p>
            </div>
            <div className={styles.extraImage}>
              <Image
                src="/immagini/foto6.jpg"
                alt="Immagine orari"
                width={300}
                height={200}
                className={styles.imageRounded}
              />
            </div>
          </div>

          <div className={styles.middleImage}>
            <Image
              src="/immagini/foto4.jpg"
              alt="Vetrina di macarons"
              width={400}
              height={300}
              className={styles.imageRounded}
            />
          </div>

          <div className={styles.column}>
            <div className={styles.extraImage}>
              <Image
                src="/immagini/foto5.jpg"
                alt="Immagine sedi"
                width={300}
                height={200}
                className={styles.imageRounded}
              />
            </div>
            <div className={styles.locations}>
              <h3>Le nostre sedi</h3>
              <p>Laboratorio: Via Garibaldi, 5 - Varese</p>
              <p>Boutique: Via Carlo Croce, 4 - Varese</p>
              <Link href="/Contatti">
                <button className={styles.infoButton}>Scopri di più</button>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.fullWidthImageContainer}>
          <div className={styles.whiteOverlay}></div>{" "}
          {/* Sovrapposizione bianca */}
        </section>
      </div>

      <div className={styles.bottomBackground}>
        <section className={styles.imageWithText}>
          <div className={styles.imageBlock}>
            <Image
              src="/immagini/foto3.jpg"
              alt="Dolci"
              width={600}
              height={400}
              className={styles.sideImage}
            />
          </div>
          <div className={styles.textBlock}>
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
            {/* <button className={styles.button}>Ordina Ora</button> */}
          </div>


        </section>
      </div>
    </main>
  );
}
