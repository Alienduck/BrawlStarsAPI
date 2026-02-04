import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import brawlStarsRoute from './routes/brawlstars.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/brawlstars')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Brawl Stars API Backend is running...');
});

app.get('/user', userRoute);
app.use('/brawlstars', brawlStarsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
