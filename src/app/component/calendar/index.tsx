"use client";

import React, { useState } from 'react'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import styles from './index.module.css';
  
export default function CalendarGfg() { 
    const [value, setValue] = useState(new Date());

    const week = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

    function onChange(val: any) {
        console.log(val);
        console.log(value);
        setValue(val);
    }

    const formatDate = (date: any) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [month, day, year].join('/');
    }

    let currDate = formatDate(new Date());
    let currDay =  week[new Date().getDay()-1];

    return ( 
        <div className={styles.calendar}> 
            <h1>Calendar</h1>
            <p>current date: {currDate} {currDay}</p>
            <Calendar 
                onChange={(val, e) => onChange(val)} 
                value={value} 
            /> 
        </div> 
    ); 
}