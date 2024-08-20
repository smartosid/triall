// Filename - backend/index.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

// Create an instance of express
const app = express();

// Function to connect to MongoDB using async/await
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/username', {
            dbName: 'username',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to yourDB-name database');
    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
}

// Call the function to connect to MongoDB
connectToDB();

// Define the File schema
const FileSchema = new mongoose.Schema({
    originalName: String,
    path: String,
    size: Number,
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create a model based on the File schema
const File = mongoose.model('File', FileSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Basic route to check if the app is working
app.get("/", (req, resp) => {
    resp.send("App is Working");
});

// Route to handle file uploads
app.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;

        const fileData = files.map(file => ({
            originalName: file.originalname,
            path: file.path,
            size: file.size,
        }));

        await File.insertMany(fileData);

        res.status(200).send('Files uploaded and data saved to MongoDB');
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Error uploading files');
    }
});

// Function to upload files from a local folder
app.post('/upload-folder', async (req, res) => {
    const folderPath = req.body.folderPath;

    fs.readdir(folderPath, async (err, files) => {
        if (err) {
            return res.status(500).send('Unable to read folder');
        }

        try {
            const fileData = files.map(file => {
                const filePath = path.join(folderPath, file);
                const fileStat = fs.statSync(filePath);

                return {
                    originalName: file,
                    path: filePath,
                    size: fileStat.size,
                };
            });

            await File.insertMany(fileData);

            res.status(200).send('Files uploaded and data saved to MongoDB');
        } catch (error) {
            console.error('Error uploading folder files:', error);
            res.status(500).send('Error uploading folder files');
        }
    });
});

// Start the server
app.listen(5000, () => {
    console.log("App listen at port 5000");
});
