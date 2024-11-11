import classes from "./page.module.css";

export default function AreaPersonale() {
  return (
    <div className={classes.dashboard}>
      <h1 className={classes.title}>Stato degli ordini</h1>

      <section className={classes.section}>
        <h2>Ordini Correnti</h2>
        <div className={classes.orderList}>
          <div className={classes.orderItem}>
            <p className={classes.orderName}>Torta di compleanno</p>
            <p className={`${classes.status} ${classes.inProgress}`}>In preparazione</p>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2>Storico Ordini</h2>
        <div className={classes.orderList}>
          <div className={classes.orderItem}>
            <p className={classes.orderName}>Millefoglie</p>
            <p className={`${classes.status} ${classes.delivered}`}>Consegnato</p>
          </div>
          <div className={classes.orderItem}>
            <p className={classes.orderName}>Torta al cioccolato</p>
            <p className={`${classes.status} ${classes.delivered}`}>Consegnato</p>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2>Commenti per il Pasticciere</h2>
        <div className={classes.commentSection}>
          <textarea
            className={classes.commentBox}
            placeholder="Lascia un commento per il pasticciere..."
          ></textarea>
          <button className={classes.submitButton}>Invia</button>
        </div>
      </section>
    </div>
  );
}
