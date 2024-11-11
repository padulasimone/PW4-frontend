"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function CalendarPage() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    
    const daysInMonth = 30;
    const unavailableDays = [5, 10, 15];
    const weekdays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    
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
        if (isWeekend(day) || unavailableDays.includes(day)) return;
        setSelectedDay(day);
        generateAvailableTimes();
    };

    // Funzione per verificare se un giorno è un weekend
    const isWeekend = (day) => {
        const dayOfWeek = new Date(2024, 10, day).getDay();
        return dayOfWeek === 3 || dayOfWeek === 4; // Domenica (0) e Sabato (6)
    };

    // Funzione per determinare la classe CSS di un giorno
    const getDayClass = (day) => {
        if (isWeekend(day)) return styles.weekend;
        if (unavailableDays.includes(day)) return styles.unavailable;
        if (day === selectedDay) return styles.selected;
        return styles.day;
    };

    return (
        <div className={styles.calendarPage}>
            <h1 className={styles.fase}>Fase 2 - Data e Ora Ritiro</h1>
            <div className={styles.calendarContainer}>
                <h1 className={styles.h1}>Seleziona un giorno</h1>
                <div className={styles.calendar}>
                    {weekdays.map((day, index) => (
                        <div key={index} className={styles.weekday}>
                            {day}
                        </div>
                    ))}
                    {[...Array(daysInMonth)].map((_, index) => (
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
                    <h2>Orari disponibili per il {selectedDay} Novembre</h2>
                    <div className={styles.times}>
                        {availableTimes.map((time, index) => (
                            <button key={index} className={styles.timeButton}>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
    
}
