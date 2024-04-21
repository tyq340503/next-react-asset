"use client";
import { useState, useEffect } from 'react';

interface FileDto {
    fileId: number;
    fileName: string;
    fileContent: string;
}

export default function Query() {
    const [fileDto, setFileDto] = useState<FileDto[]>([]);
    const [formData, setFormData] = useState<FileDto>({fileId: 0, fileName: '', fileContent: ''});

    useEffect(() => {
        const fetchFileDtoUrl = async () => {
            const response = await fetch('http://localhost:4000/sql/all', {method: 'GET'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFileDto(data);
        };

        fetchFileDtoUrl();
    }, [fileDto]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleCreate = async (event: any) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:4000/sql/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                window.alert(res.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <main>
            <section>
                {fileDto.map((file) => (
                    <div style={{display: 'flex'}} key={file.fileId}>
                        <p>{file.fileId}</p>
                        <p style={{marginLeft: '10px', width: '100px'}}>{file.fileName}</p>
                        <p>{file.fileContent}</p>
                    </div>))
                }
            </section>
            <section>
            <form onSubmit={handleCreate}>
                <div>
                    <p>fileId: </p><input type="text" name="fileId" value={formData.fileId || 0} onChange={handleInputChange} />
                </div>
                <div>
                    <p>fileName: </p>
                    <input type="text" name="fileName" value={formData.fileName || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <p>fileContent: </p>
                    <input type="text" name="fileContent" value={formData.fileContent || ''} onChange={handleInputChange} />
                </div>
                <button style={{marginTop: '10px', width: '100px'}} type="submit">Submit</button>
            </form>
            </section>
        </main>
    )
}