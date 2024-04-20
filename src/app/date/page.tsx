"use client";

import { useState, useEffect } from 'react';

export default function CurrDate() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const setDateFromServer = async () => {
            const data = await getServerDate();
            setDate(data.servertime);
        }
        setDateFromServer();
    }, []);

    const handleServerDate = async () => {
        try {
            const data = await getServerDate();
            setDate(data.servertime);
        } catch (error) {
            console.error('Error Calling Server', error);
        }
    };

    const getServerDate = async () => {
        try {
            const response =  await fetch('http://localhost:4000/time', {
                method: 'GET'
            });
            if (!response.ok)
                throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    return (
        <main>
            <div style={{marginTop: '10px'}}>
                <span>{date}</span>
            </div>
            <div style={{marginTop: '10px'}}>
                <button onClick={handleServerDate}>Get Server Date</button>
            </div>
        </main>
    )
}