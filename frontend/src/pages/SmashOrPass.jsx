import { useEffect, useState } from "react";

const API_URL = 'http://localhost:5000';

export default function SmashOrPass() {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        fetchBrawlers();
    }, []);

    const fetchBrawlers = async () => {
        try {
            const response = await axios.get(`${API_URL}/brawlstars/brawlers`);
            setBrawlers(response.data);
        } catch (error) {
            console.error('Error fetching brawlers:', error);
        }
    };

    return (
    <div className="smash-or-pass-page">
        
    </div>
    );
}