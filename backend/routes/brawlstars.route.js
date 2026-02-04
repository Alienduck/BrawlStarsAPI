import express from 'express';
import axios from 'axios';

const router = express.Router();

const BASE_URL = 'https://api.brawlstars.com/v1';

router.use((req, res, next) => {
    if (!process.env.BRAWL_STARS_API_KEY) {
        return res.status(500).json({ message: 'Clé API Brawl Stars manquante configuration serveur.' });
    }
    next();
});

router.get('/player/:tag', async (req, res) => {
    try {
        const { tag } = req.params;
        const formattedTag = tag.startsWith('#') ? encodeURIComponent(tag) : `%23${tag}`;

        const response = await axios.get(`${BASE_URL}/players/${formattedTag}`, {
            headers: {
                'Authorization': `Bearer ${process.env.BRAWL_STARS_API_KEY}`,
                'Accept': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Erreur Brawl Stars API:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: 'Erreur lors de la récupération des données Brawl Stars',
            details: error.response?.data
        });
    }
});

router.get('/brawlers', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/brawlers`, {
            headers: {
                'Authorization': `Bearer ${process.env.BRAWL_STARS_API_KEY}`,
                'Accept': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Erreur Brawl Stars API (Brawlers):', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: 'Erreur lors de la récupération des personnages Brawl Stars',
            details: error.response?.data
        });
    }
});

export default router;