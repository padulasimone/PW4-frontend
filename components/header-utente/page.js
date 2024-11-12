import classes from "@/components/main-header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.navCenter}>
          <ul className={classes.navList}>
            <li>
              <Link href="/" className={classes.link}>
                Home page
              </Link>
            </li>
            <li>
              <Link href="/" className={classes.link}>
                Prenota
              </Link>
            </li>
            <li>
              <Link href="/Torte" className={classes.link}>
                Torte
              </Link>
            </li>
            <li>
              <Link href="/DashboardUtenti" className={classes.link}>
                Area Personale
              </Link>
            </li>
            <li>
              <Link href="/Contatti" className={classes.link}>
                Contatti
              </Link>
            </li>
          </ul>
         
        </div>

        <div className={classes.navRight}>
          <ul className={classes.navList}>
            <li>
              <Link href="/Login" className={classes.link}>
                Accedi
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
