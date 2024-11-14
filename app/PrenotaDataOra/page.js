"use client";
import {useState, useEffect} from "react";
import Link from "next/link";
import classes from "./page.module.css";
import Cookies from "js-cookie";

export default function CalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(null);
    const [availableTimes, setAvailableTimes] = useState({tueToSat: [], sun: []});
    const [selectedTime, setSelectedTime] = useState(null);
    const [orders, setOrders] = useState(null);
    const [occupiedDays, setOccupiedDays] = useState({});
    const [fullyBookedDays, setFullyBookedDays] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateMedia = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", updateMedia);
        updateMedia();
        return () => window.removeEventListener("resize", updateMedia);
    }, []);

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
        if (availableTimes.tueToSat.length > 0 || availableTimes.sun.length > 0) {
            fetchOrders();
        }
    }, [availableTimes]);

    useEffect(() => {
        if (availableTimes.length > 0) {
            fetchOrders();
        }
    }, [availableTimes]);

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

                const dayOfWeek = new Date(date).getDay();
                const availableTimesForDay = dayOfWeek === 0 ? availableTimes.sun : availableTimes.tueToSat;

                if (tempOccupiedDays[date].length === availableTimesForDay.length) {
                    tempFullyBookedDays.push(date);
                }
            });

            setOccupiedDays(tempOccupiedDays);
            setFullyBookedDays(tempFullyBookedDays);
            console.log('Fully booked days:', tempFullyBookedDays);

        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const weekdays = isMobile
        ? ["lun.", "mar.", "mer.", "gio.", "ven.", "sab.", "dom."]
        : ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

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

    const generateAvailableTimes = () => {
        const tueToSatTimes = [];
        for (let hour = 7; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 10) {
                if ((hour < 13 || (hour === 13 && minute === 0)) && (hour > 7 || (hour === 7 && minute >= 30))) {
                    tueToSatTimes.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
                }
                if ((hour < 17 || (hour === 17 && minute === 0)) && (hour > 14 || (hour === 14 && minute >= 30))) {
                    tueToSatTimes.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
                }
            }
        }

        const sunTimes = [];
        for (let hour = 8; hour <= 12; hour++) {
            for (let minute = 0; minute < 60; minute += 10) {
                if ((hour < 12 || (hour === 12 && minute <= 30)) && hour >= 8) {
                    sunTimes.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
                }
            }
        }

        setAvailableTimes({
            tueToSat: tueToSatTimes,
            sun: sunTimes
        });
    };

    const getAvailableTimesForSelectedDay = () => {
        const dayOfWeek = new Date(new Date().getFullYear(), selectedMonth, selectedDay - 1).getDay();
        if (dayOfWeek === 0) {
            return availableTimes.sun;
        } else if (dayOfWeek >= 2 && dayOfWeek <= 6) {
            return availableTimes.tueToSat;
        }
        return [];
    };

    const getDaysInMonth = (month) => {
        const year = new Date().getFullYear();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month) => {
        const year = new Date().getFullYear();
        return (new Date(year, month, 1).getDay() + 6) % 7;
    };

    const handleDayClick = (day) => {
        const dayClass = getDayClass(day);
        if (dayClass === classes.blockedDay) return;
        setSelectedDay(day);
        setSelectedTime(null);

        if (isMonday(day) || isFullyBooked(day + 1) || isBeforeToday(day) || isClosedNow(day + 1)) return;

        if (selectedDay === day + 1) {
            setSelectedDay(null);
            setSelectedTime(null);
        } else {
            setSelectedDay(day + 1);
            setSelectedTime(null);
            generateAvailableTimes(day);
        }
    };

    const handleTimeClick = (time) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, selectedDay).toISOString().split('T')[0];
        if (occupiedDays[date]?.includes(time) || isBeforeNow(time)) return;
        setSelectedTime(time);
    };

    const isMonday = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day);
        return date.getDay() === 1;
    };

    const isFullyBooked = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day).toISOString().split('T')[0];
        return fullyBookedDays.includes(date);
    }

    const isBeforeToday = (day) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, day);
        return date < new Date;
    }

    const isBeforeNow = (time) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, selectedDay).toISOString().split('T')[0];
        const selectedDate = new Date(`${date}T${time}:00`);
        return selectedDate < new Date;
    }

    const isClosedNow = (date) => {
        // se adesso è domenica e sono passate le 12:30, significa che è chiuso, oppure se è un giorno tra martedì e sabato e sono passate le 17, significa che è chiuso
        const now = new Date();
        // se now e date sono lo stesso giorno dello stesso mese, allora devo controllare l'ora attuale
        if (now.getMonth() === selectedMonth && now.getDate() === date) {
            if (now.getDate() === date) {
                const dayOfWeek = now.getDay();
                const hour = now.getHours();
                const minute = now.getMinutes();
                if (dayOfWeek === 0 && (hour > 12 || (hour === 12 && minute > 30))) return true;
                if (dayOfWeek >= 2 && dayOfWeek <= 6 && (hour > 17 || (hour === 17 && minute > 0))) return true;
            }
        }

        return false;
    }

    const getDayClass = (day) => {
        if (isMonday(day) || isFullyBooked(day + 1) || isBeforeToday(day + 1) || isClosedNow(day)) return classes.blockedDay;
        if (day + 1 === selectedDay) return classes.selected;
        return classes.day;
    };

    const getTimeClass = (time) => {
        const date = new Date(new Date().getFullYear(), selectedMonth, selectedDay).toISOString().split('T')[0];
        if (occupiedDays[date]?.includes(time) || isBeforeNow(time)) return classes.occupiedTime;
        if (time === selectedTime) return classes.selectedTime;
        return classes.timeButton;
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
        <div className={classes.calendarPage}>
            <h1 className={classes.fase}>Fase 2 - Data e Ora Ritiro</h1>

            <div className={classes.monthSelector}>
                {months.map((month) => (
                    <button
                        key={month.number}
                        className={selectedMonth === month.number ? classes.selectedMonth : classes.monthButton}
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

            <div className={classes.columns}>
                <div className={classes.calendarContainer}>
                    <h1 className={classes.h1}>Seleziona un giorno</h1>
                    <div className={classes.calendar}>
                        {weekdays.map((day, index) => (
                            <div key={index} className={classes.weekday}>
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
                                return <div key={`empty-${index}`} className={classes.day}></div>;
                            }
                        })}
                    </div>
                </div>

                {selectedDay && (
                    <div className={classes.timeSelection}>
                        <h2>Orari disponibili per
                            il {selectedDay - 1} {months.find(m => m.number === selectedMonth)?.name}</h2>
                        <div className={classes.times}>
                            {getAvailableTimesForSelectedDay().map((time, index) => (
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
                <div className={classes.buttonContainer}>
                    <Link href="/PrenotaConfermaOrdine">
                        <button onClick={handleNextClick} className={classes.nextButton}>Successivo</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
