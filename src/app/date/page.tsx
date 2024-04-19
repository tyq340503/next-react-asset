"use client";

import { useState, useRef } from 'react';

export default function CurrDate() {
    const [date, setDate] = useState(new Date());
    const formattedDate = date.toLocaleString();

    const handleServerDate = async () => {
        try {

            const response = await fetch('http://localhost:4000/time', {
                method: 'GET',
                
            });

            const data = await response.json();
            console.log(data.date);
            setDate(data.date);
        } catch (error) {
            console.error('Error Calling Server', error);
        }
    };

    return (
        <main>
            <span>{formattedDate}</span>
            <button onClick={handleServerDate}>Get Server Date</button>
        </main>
    )
}