import Image from 'next/image';
import classes from './torte-items.module.css';

export default function TorteItems({ nome, descrizione, ingredienti, quantita, prezzo, foto }) {
    return (
        <article className={classes.torta}>
            <header>
                <div className={classes.image}>
                    <Image src={foto} alt={nome} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{nome}</h2>
                    <p className={classes.prezzo}>€{prezzo}</p>

                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.descrizione}>{descrizione}</p>
                <p className={classes.ingredienti}><strong>Ingredienti:</strong> {ingredienti}</p>
                <p className={classes.quantita}><strong>Quantità:</strong> {quantita}</p>
            </div>
        </article>
    );
}
