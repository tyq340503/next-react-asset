"use client";
import { useState, useEffect } from 'react';

interface FileData {
    fileName: string;
    fileUrl: string;
}

const FileDownload = () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        const fetchFileUrl = async () => {
            const response = await fetch('http://localhost:4000/file/files', {method: 'GET'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const convertData = convertResponse(data.files);
            setFiles(convertData);
        };

        fetchFileUrl();
    }, [files]);

    const convertResponse = (data: string[]): FileData[] => {
        if(data == null)
            return [];
        return data.map((fileName) => ({
            fileName: fileName,
            fileUrl: `http://localhost:4000/file/download/${fileName}`
        }));
    } 

    const downloadFile = async (fileName: string) => {
        try {
            const response = await fetch(`http://localhost:4000/file/download/${fileName}`, {method: 'GET'});
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.blob();
            console.log(responseData);
            const url = URL.createObjectURL(responseData);
            setDownloadUrl(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return (
        <main>
            {files.map((file, index) => {
                return (
                    <section key={index}>
                        <div style={{marginTop: '10px', display: 'flex'}}>
                            <span style={{width: '300px', marginRight: '10px'}}>{file.fileName}</span>
                            <button onClick={() => downloadFile(file.fileName)}>
                                <a href={file.fileUrl} >
                                    download
                                </a>
                            </button>
                        </div>
                    </section>
                );
            })}
        </main>
    )
}

export default FileDownload;