"use client";
import { useState, useEffect } from "react";
import { FaRegFileExcel } from "react-icons/fa6";
import classes from "./page.module.css";

const InventoryTable = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/utente", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        alert("Non sei autorizzato a visualizzare questa pagina");
        window.location.href = "/";
      }
    };
    fetchUser();
  }, []);

  // Recupera i prodotti dal backend solo se l'utente loggato ha il ruolo ADMIN
  useEffect(() => {
    if (user && user.ruolo === "ADMIN") {
      const fetchProducts = async () => {
        try {
          const res = await fetch("http://localhost:8080/prodotto", {
            credentials: "include",
          });
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Errore durante il recupero dei prodotti:", error);
        }
      };
      fetchProducts();
    }
  }, [user]);

  // Elimina un prodotto esistente solo se l'utente loggato ha il ruolo ADMIN
  const deleteProduct = async (productId) => {
    const isConfirmed = window.confirm(
      "Sei sicuro di voler eliminare questo prodotto?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/prodotto/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        const errorData = await res.json();
        console.error(
          "Errore durante l'eliminazione del prodotto:",
          errorData.message
        );
      }
    } catch (error) {
      console.error(
        "Errore durante la chiamata API per eliminare il prodotto:",
        error
      );
    }
  };

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const productsToShow = products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleEditClick = (productId) => {
    window.location.href = `/ModificaProdotto/${productId}`;
  };

  const downloadExcel = async () => {
    if (user && user.ruolo === "ADMIN") {
      try {
        const res = await fetch("http://localhost:8080/prodotto/excel", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          window.URL.revokeObjectURL(url);
          alert("File Excel scaricato con successo");
        } else {
          console.error("Errore durante il download del file Excel");
        }
      } catch (error) {
        console.error(
          "Errore durante la chiamata API per il download del file Excel:",
          error
        );
      }
    } else {
      console.error(
        "Accesso negato: solo gli amministratori possono scaricare il file Excel"
      );
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Gestione Magazzino</h1>
      <div className={classes.addProductAndExport}>
        <button
          className={classes.addButton}
          onClick={() => (window.location.href = "/AggiungiProdotto")}
        >
          Aggiungi Prodotto
        </button>
        <button className={classes.exportButton} onClick={downloadExcel}>
          Esporta Excel <FaRegFileExcel />
        </button>
      </div>

      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <th className={classes.tableHeader}>Immagine</th>
            <th className={classes.tableHeader}>Nome</th>
            <th className={classes.tableHeader}>Descrizione</th>
            <th className={classes.tableHeader}>Ingredienti</th>
            <th className={classes.tableHeader}>Prezzo</th>
            <th className={classes.tableHeader}>Quantità</th>
            <th className={classes.tableHeader}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((product) => (
            <tr key={product.id} className={classes.tableRow}>
              <td className={classes.tableCell}>
                <img
                  src={"/immaginiTorte/" + product.foto}
                  alt={product.nome}
                  className={classes.img}
                />
              </td>
              <td className={classes.tableCell}>{product.nome}</td>
              <td className={classes.tableCell}>{product.descrizione}</td>
              <td className={classes.tableCell}>{product.ingredienti}</td>
              <td className={classes.tableCell}>{product.prezzo}€</td>
              <td className={classes.tableCell}>{product.quantita}</td>
              <td className={classes.tableCell}>
                <button
                  className={`${classes.edit} ${classes.button}`}
                  onClick={() => handleEditClick(product.id)}
                >
                  Modifica
                </button>
                <button
                  className={`${classes.delete} ${classes.button}`}
                  onClick={() => deleteProduct(product.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Precedente
        </button>
        <span>
          Pagina {currentPage} di {Math.ceil(products.length / productsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
