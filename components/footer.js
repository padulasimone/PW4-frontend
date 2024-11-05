import classes from "@/components/footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>Sede e Contatti</h3>
            <p>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
            <p>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
            <p>Tel: +39 327 7380932</p>
            <p>Email: pasticceriacestlavie@gmail.com</p>
          </div>

          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>Orari Boutique</h3>
            <p>Lunedì chiuso</p>
            <p>Mar - Ven 8:30 - 19:00</p>
            <p>Sabato 9:00 - 19:00</p>
            <p>Domenica 9:00 - 13:00 / 15:00 - 19:00</p>
          </div>

          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>Orari Laboratorio</h3>
            <p>Lunedì chiuso</p>
            <p>Mar - Sab 7:30 - 13:00 / 14:30 - 16:00</p>
            <p>Domenica 8:00 - 12:30</p>
          </div>
        </div>
      </footer>

      <div className={classes.smallFooter}>
        <p>Partita IVA: 03468950120</p>
      </div>
    </>
  );
}
