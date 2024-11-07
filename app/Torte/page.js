import classes from "./page.module.css";
import TortaGrid from "@/components/torte-grid";
import { getTorte } from "@/lib/torte";

export default async function Torte() {
  const torta = await getTorte();
  console.log(torta);
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

        <TortaGrid prodotto={torta}></TortaGrid>
      </main>
    </>
  );
}
