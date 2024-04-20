"use client";
import { useState, useRef } from 'react';

interface FileInterface {
    file: Blob | null,
    setFile: (value: Blob) => void,
}  

const FileUpload = () => {
    const input = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<Blob>(new Blob());

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            
            if(file.size == 0) {
                console.log("no file include in upload");
                window.alert("no file include in upload");
                return;
            }
            formData.append('file', file);

            const response = await fetch('http://localhost:4000/file/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok)
                window.alert(data.message);
            else
                throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

  return (
    <div style={{marginBottom:'10px'}}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;