"use client";
import {useState, useEffect} from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Cookies from "js-cookie";

export default function CalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [orders, setOrders] = useState(null);
    const [occupiedDays, setOccupiedDays] = useState({});
    const [fullyBookedDays, setFullyBookedDays] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [user, setUser] = useState(null);

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
        generateAvailableTimes();
    }, []);

    useEffect(() => {
        if (availableTimes.length > 0) {
            fetchOrders();
        }
    }, [availableTimes]);

    const generateAvailableTimes = () => {
        const times = [];
        for (let hour = 14; hour <= 18; hour++) {
            for (let minute = 0; minute < 60; minute += 10) {
                if (hour === 18 && minute > 0) break;
                times.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
            }
        }
        setAvailableTimes(times);
    };

    useEffect(() => {
        const orderDetailsFromCookie = Cookies.get('dettaglioOrdine');
        if (orderDetailsFromCookie) {
            setOrderDetails(JSON.parse(orderDetailsFromCookie));
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/ordine', {
                credentials: 'include'
            });
            const data = await response.json();
            setOrders(data);

            const tempOccupiedDays = {};
            const tempFullyBookedDays = [];

            data.forEach(ordine => {
                const date = ordine.data_ritiro.split('T')[0];
                const time = ordine.data_ritiro.split('T')[1].slice(0, 5);

                if (!tempOccupiedDays[date]) {
                    tempOccupiedDays[date] = [];
                }
                tempOccupiedDays[date].push(time);

                if (tempOccupiedDays[date].length === availableTimes.length) {
                    tempFullyBookedDays.push(date);
                }
            });

            setOccupiedDays(tempOccupiedDays);
            setFullyBookedDays(tempFullyBookedDays);

        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const weekdays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const currentMonth = new Date().getMonth();
    const months = [
        {
            name: capitalizeFirstLetter(new Date(new Date().setMonth(currentMonth)).toLocaleString('default', {month: 'long'})),
            number: currentMonth
        },
        {
            name: capitalizeFirstLetter(new Date(new Date().setMonth(currentMonth + 1)).toLocaleString('default', {month: 'long'})),
            number: currentMonth + 1
        },
        {
            name: capitalizeFirstLetter(new Date(new Date().setMonth(currentMonth + 2)).toLocaleString('default', {month: 'long'})),
            number: currentMonth + 2
        }
    ];

    const getDaysInMonth = (month) => {
        const year = new Date().getFullYear();
        return new Date(year, month + 1, 0).getDate();
    };


    const getFirstDayOfMonth = (month) => {
        const year = new Date().getFullYear();
        return (new Date(year, month, 1).getDay() + 6) % 7; // Adjust to start the week on Monday
    };

    const handleDayClick = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day).toISOString().split('T')[0];
        if (isWeekend(day) || isFullyBooked(day + 1)) return;

        if (selectedDay === day + 1) {
            // Se il giorno selezionato è già selezionato, deseleziona il giorno e nascondi gli orari
            setSelectedDay(null);
            setSelectedTime(null);
        } else {
            // Altrimenti, seleziona il giorno e mostra gli orari disponibili
            setSelectedDay(day + 1);
            setSelectedTime(null);
        }
    };

    const handleTimeClick = (time) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, selectedDay).toISOString().split('T')[0];
        if (occupiedDays[date]?.includes(time)) return;
        setSelectedTime(time);
    };

    const isWeekend = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const isFullyBooked = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day).toISOString().split('T')[0];
        return fullyBookedDays.includes(date);
    }

    const isBeforeToday = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day);
        return date < new Date
    }

    const getDayClass = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day).toISOString().split('T')[0];
        if (isWeekend(day) || isFullyBooked(day + 1) || isBeforeToday(day + 1)) return styles.weekend;
        if (day + 1 === selectedDay) return styles.selected;
        return styles.day;
    };

    const getTimeClass = (time) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, selectedDay).toISOString().split('T')[0];
        if (occupiedDays[date]?.includes(time)) return styles.occupiedTime;
        if (time === selectedTime) return styles.selectedTime;
        return styles.timeButton;
    };

    const handleNextClick = () => {
        if (orderDetails && selectedDay && selectedTime) {
            const year = new Date().getFullYear();
            const month = String(selectedMonth + 1).padStart(2, "0");
            const day = String(selectedDay - 1).padStart(2, "0");
            const dataRitiro = `${year}-${month}-${day}T${selectedTime}:00`;

            const newOrderDetails = {
                ...orderDetails,
                data_ritiro: dataRitiro
            };

            Cookies.set('dettaglioOrdineEDataOra', JSON.stringify(newOrderDetails));
            Cookies.remove('dettaglioOrdine');
        }
    };

    return (
        <div className={styles.calendarPage}>
            <h1 className={styles.fase}>Fase 2 - Data e Ora Ritiro</h1>

            <div className={styles.monthSelector}>
                {months.map((month) => (
                    <button
                        key={month.number}
                        className={selectedMonth === month.number ? styles.selectedMonth : styles.monthButton}
                        onClick={() => {
                            setSelectedMonth(month.number);
                            setSelectedDay(null);
                            setSelectedTime(null);
                        }}
                    >
                        {month.name}
                    </button>
                ))}
            </div>

            <div className={styles.columns}>
                <div className={styles.calendarContainer}>
                    <h1 className={styles.h1}>Seleziona un giorno</h1>
                    <div className={styles.calendar}>
                        {weekdays.map((day, index) => (
                            <div key={index} className={styles.weekday}>
                                {day}
                            </div>
                        ))}
                        {[...Array(getFirstDayOfMonth(selectedMonth)).fill(null), ...Array(getDaysInMonth(selectedMonth))].map((_, index) => {
                            if (index >= getFirstDayOfMonth(selectedMonth)) {
                                const day = index - getFirstDayOfMonth(selectedMonth) + 1;
                                return (
                                    <div
                                        key={`${selectedMonth}-${day}`}
                                        className={getDayClass(day)}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        {day}
                                    </div>
                                );
                            } else {
                                return <div key={`empty-${index}`} className={styles.day}></div>;
                            }
                        })}
                    </div>
                </div>

                {selectedDay && (
                    <div className={styles.timeSelection}>
                        <h2>Orari disponibili per
                            il {selectedDay - 1} {months.find(m => m.number === selectedMonth)?.name}</h2>
                        <div className={styles.times}>
                            {availableTimes.map((time, index) => (
                                <button
                                    key={index}
                                    className={getTimeClass(time)}
                                    onClick={() => handleTimeClick(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedTime && (
                <div className={styles.buttonContainer}>
                    <Link href="/PrenotaConfermaOrdine">
                        <button onClick={handleNextClick} className={styles.nextButton}>Successivo</button>
                    </Link>
                </div>
            )}
        </div>
    );
}