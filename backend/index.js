const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB database');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Schema for fetching
const UserSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now
    },
    last_modified_date: {
        type: Date,
        required: true
    }
}, { collection: 'files' });

const User = mongoose.model('User', UserSchema);
User.createIndexes();

// For backend and express
const app = express();
app.use(express.json());
app.use(cors());

app.get('/documents', async (req, res) => {
    const { userdate } = req.query;
    console.log(`Received userdate: ${userdate}`);
    try {
        // Parse the date to match MongoDB's format
        const date = new Date(userdate);
        date.setHours(0, 0, 0, 0); // Set time to midnight to match the date only

        const documents = await User.find({
            last_modified_date: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found for the given date' });
        }

        console.log(`Documents found: ${documents.length}`);
        res.json(documents);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(5000, () => {
    console.log("App listening at port 5000");
});
