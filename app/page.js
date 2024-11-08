import styles from "./page.module.css";
import Image from "next/image";

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
