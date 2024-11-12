"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(10); // 10: novembre (0-based)
    const [selectedDay, setSelectedDay] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const unavailableDays = {
        10: [5, 10, 15], // Novembre
        11: [3, 12, 22], // Dicembre
        0: [15, 10, 19]   // Gennaio
    };
    const occupiedTimes = ["14:00", "15:30"];
    const weekdays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

    const months = [
        { name: "Novembre", number: 10 },
        { name: "Dicembre", number: 11 },
        { name: "Gennaio", number: 0 }
    ];

    // Funzione per ottenere il numero di giorni del mese selezionato
    const getDaysInMonth = (month) => {
        const year = 2024; // Anno fisso per semplificazione
        return new Date(year, month + 1, 0).getDate();
    };

    // Funzione per generare fasce orarie
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

    // Funzione per gestire la selezione del giorno
    const handleDayClick = (day) => {
        if (isWeekend(day) || unavailableDays[selectedMonth]?.includes(day)) return;
        setSelectedDay(day);
        setSelectedTime(null);
        generateAvailableTimes();
    };

    // Funzione per gestire la selezione dell'orario
    const handleTimeClick = (time) => {
        if (occupiedTimes.includes(time)) return;
        setSelectedTime(time);
    };

    // Funzione per verificare se un giorno è nel weekend
    const isWeekend = (day) => {
        const date = new Date(2024, selectedMonth, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Domenica, 6 = Sabato
    };

    // Funzione per determinare la classe CSS di un giorno
    const getDayClass = (day) => {
        if (isWeekend(day)) return styles.weekend;
        if (unavailableDays[selectedMonth]?.includes(day)) return styles.unavailable;
        if (day === selectedDay) return styles.selected;
        return styles.day;
    };

    // Funzione per determinare la classe CSS di un orario
    const getTimeClass = (time) => {
        if (occupiedTimes.includes(time)) return styles.occupiedTime;
        if (time === selectedTime) return styles.selectedTime;
        return styles.timeButton;
    };

    return (
        <div className={styles.calendarPage}>
            <h1 className={styles.fase}>Fase 2 - Data e Ora Ritiro</h1>

            {/* Selettore del mese */}
            <div className={styles.monthSelector}>
                {months.map((month) => (
                    <button
                        key={month.number}
                        className={selectedMonth === month.number ? styles.selectedMonth : styles.monthButton}
                        onClick={() => {
                            setSelectedMonth(month.number);
                            setSelectedDay(null); // Reset del giorno e dell'orario quando cambia mese
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
                        {[...Array(getDaysInMonth(selectedMonth))].map((_, index) => (
                            <div
                                key={index + 1}
                                className={getDayClass(index + 1)}
                                onClick={() => handleDayClick(index + 1)}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {selectedDay && (
                    <div className={styles.timeSelection}>
                        <h2>Orari disponibili per il {selectedDay} {months.find(m => m.number === selectedMonth)?.name}</h2>
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
                    <Link href="/PrenotaDataOra">
                        <button className={styles.nextButton}>Successivo</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
