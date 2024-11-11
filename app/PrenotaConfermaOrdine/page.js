import classes from "./page.module.css";

export default function PrenotaConfermaOrdine() {
  // Esempio di dati per gli ordini
  const ordini = [
    { torta: "Torta al Cioccolato", quantita: 2, prezzo: 15 },
    { torta: "Torta alla Fragola", quantita: 1, prezzo: 12 },
    { torta: "Torta Nuziale", quantita: 1, prezzo: 30 },
  ];

  // Calcolo del totale
  const totale = ordini.reduce(
    (acc, ordine) => acc + ordine.quantita * ordine.prezzo,
    0
  );

  // Data e ora dell'ordine
  const dataOra = new Date().toLocaleString();

  return (
    <div className={classes.orderSummary}>
      <div className={classes.section}>
        <h2 className={classes.title}>Riepilogo Ordine</h2>

        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <div className={classes.tableCell}>Torta</div>
            <div className={classes.tableCell}>Quantità</div>
            <div className={classes.tableCell}>Prezzo</div>
          </div>
          {ordini.map((ordine, index) => (
            <div key={index} className={classes.tableRow}>
              <div className={classes.tableCell}>{ordine.torta}</div>
              <div className={classes.tableCell}>{ordine.quantita}</div>
              <div className={classes.tableCell}>{`€${ordine.prezzo}`}</div>
            </div>
          ))}
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Totale</div>
            <div className={classes.tableCell}></div>
            <div className={classes.tableCell}>{`€${totale}`}</div>
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <div>
        <h3 className={classes.title}>Data e Ora dell'Ordine</h3>
        <p className={classes.dateTime}>{dataOra}</p>
        </div>
        <div className={classes.confirmButtonContainer}>
          <button className={classes.confirmButton}>Conferma Ordine</button>
        </div>
      </div>
    </div>
  );
}
