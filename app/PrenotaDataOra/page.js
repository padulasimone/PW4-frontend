"use client";
import {useState, useEffect} from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const occupiedTimes = ["14:00", "15:30"];
    const weekdays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

    const months = [
        {name: "Novembre", number: new Date().getMonth()},
        {name: "Dicembre", number: new Date().getMonth() + 1},
        {name: "Gennaio", number: new Date().getMonth() + 2}
    ];

    useEffect(() => {
        generateAvailableTimes();
    }, [selectedDay]);

    const getDaysInMonth = (month) => {
        const year = new Date().getFullYear();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month) => {
        const year = new Date().getFullYear();
        return new Date(year, month, 1).getDay();
    };

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

    const handleDayClick = (day) => {
        if (isWeekend(day)) return;
        setSelectedDay(day);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        if (occupiedTimes.includes(time)) return;
        setSelectedTime(time);
    };

    const isWeekend = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const getDayClass = (day) => {
        if (isWeekend(day)) return styles.weekend;
        if (day === selectedDay) return styles.selected;
        return styles.day;
    };

    const getTimeClass = (time) => {
        if (occupiedTimes.includes(time)) return styles.occupiedTime;
        if (time === selectedTime) return styles.selectedTime;
        return styles.timeButton;
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
                        {[...Array((getFirstDayOfMonth(selectedMonth) + 6) % 7).fill(null), ...Array(getDaysInMonth(selectedMonth))].map((_, index) => {
                            if (index >= (getFirstDayOfMonth(selectedMonth) + 6) % 7) {
                                const day = index - (getFirstDayOfMonth(selectedMonth) + 6) % 7 + 1;
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
                            il {selectedDay} {months.find(m => m.number === selectedMonth)?.name}</h2>
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