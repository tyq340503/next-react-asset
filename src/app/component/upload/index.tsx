"use client";
// import { File, Blob } from 'buffer';
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
            return;
        }
        formData.append('file', file);

        const response = await fetch('/file/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;