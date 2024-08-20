// App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function App() {
    const [userdate, setUserdate] = useState('');
    const [documents, setDocuments] = useState([]);
    const [message, setMessage] = useState('');

    const handleDateChange = (e) => {
        setUserdate(e.target.value);
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/documents?userdate=${userdate}`);
            if (response.data.length === 0) {
                setMessage('No documents found for the given date');
                setDocuments([]);
            } else {
                setDocuments(response.data);
                setMessage('');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
            setMessage('Error fetching documents. Please try again.');
        }
    };

    const handleDownload = (filePath) => {
        window.open(filePath, '_blank');
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Aircraft log in viewer </h1>
                <div>
                    <input
                        type="date"
                        value={userdate}
                        onChange={handleDateChange}
                    />
                    <button onClick={fetchDocuments}>Search document</button>
                </div>
                {message && <p>{message}</p>}
                <div className="documents">
                    {documents.map((doc) => (
                        <div key={doc._id} className="document-card">
                            <h2>{doc.file_name}</h2>
                            <p>{doc.content}</p>
                            <button onClick={() => handleDownload(doc.file_path)}>Download</button>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
