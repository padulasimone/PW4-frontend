"use client";

import { useState, useEffect } from "react";
import classes from "./page.module.css";

export default function AreaPersonale() {
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/utente", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        alert("Non sei autorizzato a visualizzare questa pagina.");
        window.location.href = "/";
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user.ruolo === "CLIENTE VERIFICATO") {
      const fetchOrderHistory = async () => {
        try {
          const res = await fetch("http://localhost:8080/ordine/utente?storico=true", {
            credentials: "include",
          });
          const data = await res.json();
          console.log(data);
          setOrderHistory(data);
        } catch (error) {
          console.error("Errore durante il recupero degli ordini:", error);
        }
      };
      fetchOrderHistory();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.ruolo === "CLIENTE VERIFICATO") {
      const fetchCurrentOrders = async () => {
        try {
          const res = await fetch("http://localhost:8080/ordine/utente?correnti=true", {
            credentials: "include",
          });
          const data = await res.json();
          console.log(data);
          setCurrentOrders(data);
        } catch (error) {
          console.error("Errore durante il recupero degli ordini:", error);
        }
      };
      fetchCurrentOrders();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() - 1); // Sottrai un'ora
    return date.toLocaleString('it-IT', { timeZone: 'Europe/Rome' });
  };

  return (
    <div className={classes.dashboard}>
      <h1 className={classes.title}>Stato degli ordini</h1>

      <section className={classes.section}>
        <div className={classes.sectionHeader}>
          {currentOrders.length > 3 ? (
            <div className={classes.sectionHeaderWithLink}>
              <h2>Ordini Correnti</h2>
              <a href="/OrdiniCorrenti" className={classes.viewAllLink}>Vedi tutto</a>
            </div>
          ) : (
            <h2>Ordini</h2>
          )}
        </div>
        <div className={classes.orderList}>
          {currentOrders.slice(0, 3).map((order) => (
            <div key={order.id} className={classes.orderItem}>
              <div className={classes.orderDetails}>
                {order.dettaglio.map((item, index) => (
                  <div key={index} className={classes.orderDetailItem}>
                    <p>{item.nome} x{item.quantita}</p>
                  </div>
                ))}
              </div>
              <p className={classes.orderDetail}>Data di ritiro: {formatDate(order.data_ritiro)}</p>
              {order.stato === "IN PREPARAZIONE" ? (
                <p className={`${classes.status} ${classes.inProgress}`}>{order.stato}</p>
              ) : (
                <p className={`${classes.status} ${classes.awaitingConfirmation}`}>{order.stato}</p>
              )}
            </div>
          ))}
          {currentOrders.length === 0 && (
            <p className={classes.noOrders}>Ancora nessun ordine in questa sezione</p>
          )}
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.sectionHeader}>
          {orderHistory.length > 3 ? (
            <div className={classes.sectionHeaderWithLink}>
              <h2>Storico Ordini</h2>
              <a href="/StoricoOrdini" className={classes.viewAllLink}>Vedi tutto</a>
            </div>
          ) : (
            <h2>Storico Ordini</h2>
          )}
        </div>
        <div className={classes.orderList}>
          {orderHistory.slice(0, 3).map((order) => (
            <div key={order.id} className={classes.orderItem}>
              <div className={classes.orderDetails}>
                {order.dettaglio.map((item, index) => (
                  <div key={index} className={classes.orderDetailItem}>
                    <p>{item.nome} x{item.quantita}</p>
                  </div>
                ))}
              </div>
              <p className={classes.orderDetail}>Data di ritiro: {formatDate(order.data_ritiro)}</p>
              <p className={`${classes.status} ${classes.delivered}`}>{order.stato}</p>
            </div>
          ))}
          {orderHistory.length === 0 && (
            <p className={classes.noOrders}>Ancora nessun ordine in questa sezione</p>
          )}
        </div>
      </section>
    </div>
  );
}