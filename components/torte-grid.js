import TorteItems from "@/components/torte-items";
import classes from './torte-grid.module.css';

export default function TortaGrid({ prodotto }) {
  return (
    <>
      <ul className={classes.torta}>
        {prodotto.map((torta) => (
          <li key={torta.id}>
            <TorteItems {...torta}></TorteItems>
          </li>
        ))}
      </ul>
    </>
  );
}
