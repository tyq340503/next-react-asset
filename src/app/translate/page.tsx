"use client";

import { useState } from 'react';

export default function Translate() {
    
    const [isSToT, setIsSToT] = useState<boolean>(false);
    const [traditionalText, setTraditionalText] = useState('');
    const [simplifiedText, setSimplifiedText] = useState('');

    const handleTToSConvert = async () => {
        try {
            if(traditionalText.length == 0)
                return;
            const response = await fetch(`http://localhost:4000/trans/ttos?text=${traditionalText}`, {method: 'GET'});
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();
            console.log(res);
            setSimplifiedText(res.text);
        } catch (error: any) {
            throw new Error('Error during covert', error);
        }
    };

    const handleSToTConvert = async () => {
        try {
            if(simplifiedText.length == 0)
                return;
            const response = await fetch(`http://localhost:4000/trans/stot?text=${simplifiedText}`, {method: 'GET'})
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();
            setTraditionalText(res.text);
        } catch (error) {
            throw new Error('Error during covert');
        }
    };

    const handleSwitch = () => {
        setIsSToT(!isSToT);
    }

    return (
        <div>
            <p>切换： </p><button onClick={handleSwitch}>{!isSToT ? '繁体转简体' : '简体转繁体'}</button>
            {
                !isSToT ? (
                    <section>
                        <h1>繁体转简体</h1>
                        <textarea
                            value={traditionalText}
                            onChange={(e) => setTraditionalText(e.target.value)}
                            rows={5}
                            cols={50}
                        />
                        <button onClick={handleTToSConvert}>转换</button>
                        <h2>简体文本：</h2>
                        <textarea
                            value={simplifiedText}
                            readOnly
                            rows={5}
                            cols={50}
                        />
                    </section>
                ) : (
                    <section>
                        <h1>简体转繁体</h1>
                        <textarea
                            value={simplifiedText}
                            onChange={(e) => setSimplifiedText(e.target.value)}
                            rows={5}
                            cols={50}
                        />
                        <button onClick={handleSToTConvert}>转换</button>
                        <h2>繁体文本：</h2>
                        <textarea
                            value={traditionalText}
                            readOnly
                            rows={5}
                            cols={50}
                        />
                    </section>
                )
            }
        </div>
    );
}