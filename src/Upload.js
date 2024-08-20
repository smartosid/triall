import { useState } from 'react';

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [files, setFiles] = useState([]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        let result = await fetch('http://localhost:5000/register', {
            method: "POST",
            body: formData
        });
        result = await result.json();
        console.warn(result);

        if (result) {
            alert("Data saved successfully");
            setEmail("");
            setName("");
            setFiles([]);
        }
    };

    return (
        <>
            <h1>This is React WebApp</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default App;
