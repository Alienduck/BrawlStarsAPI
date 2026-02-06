import axios from 'axios';

const URL = 'https://brawlstarsapi-1.onrender.com/';

const keepAlive = async () => {
    try {
        const response = await axios.get(URL);
        console.log(`Keep-alive ping successful: Status ${response.status} at ${new Date().toISOString()}`);
    } catch (error) {
        console.error(`Keep-alive ping failed: ${error.message} at ${new Date().toISOString()}`);
    }
};

// Ping every 14 minutes (Render spins down after 15 minutes of inactivity)
const INTERVAL = 14 * 60 * 1000;

setInterval(keepAlive, INTERVAL);

console.log(`Keep-alive service started for ${URL}`);
