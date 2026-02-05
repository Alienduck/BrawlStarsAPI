import { useEffect, useState } from "react";
import './SmashOrPass.css';
import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';


export default function SmashOrPass() {
    const [brawlers, setBrawlers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        smash: 0,
        pass: 0
    });
    const [animation, setAnimation] = useState('');
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        fetchBrawlers();
    }, []);

    const fetchBrawlers = async () => {
        try {
            const response = await axios.get(`${API_URL}/brawlstars/brawlers`);
            // Shuffle the brawlers array for random order
            const shuffled = response.data.items.sort(() => Math.random() - 0.5);
            setBrawlers(shuffled);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching brawlers:', error);
            setLoading(false);
        }
    };

    const handleVote = (vote) => {
        if (currentIndex >= brawlers.length) return;

        // Trigger animation
        setAnimation(vote === 'smash' ? 'swipe-right' : 'swipe-left');

        // Update stats
        setStats(prev => ({
            ...prev,
            [vote]: prev[vote] + 1
        }));

        // Move to next brawler after animation
        setTimeout(() => {
            setAnimation('');
            if (currentIndex + 1 < brawlers.length) {
                setCurrentIndex(currentIndex + 1);
            }
        }, 300);
    };

    const handleRestart = () => {
        const shuffled = [...brawlers].sort(() => Math.random() - 0.5);
        setBrawlers(shuffled);
        setCurrentIndex(0);
        setStats({ smash: 0, pass: 0 });
        setShowStats(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft') {
            handleVote('pass');
        } else if (e.key === 'ArrowRight') {
            handleVote('smash');
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentIndex, brawlers]);

    if (loading) {
        return (
            <div className="smash-or-pass">
                <div className="loading-container">
                    <div className="loading">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                    </div>
                    <p>Loading Brawlers...</p>
                </div>
            </div>
        );
    }

    const currentBrawler = brawlers[currentIndex];
    const isFinished = currentIndex >= brawlers.length;

    return (
        <div className="smash-or-pass">
            <div className="sop-header fade-in">
                <h1 className="page-title">Smash or Pass</h1>
                <p className="page-subtitle">Rate the Brawlers - Arrow keys or buttons</p>
            </div>
            {!isFinished ? (
                <div className="sop-container slide-in-right">
                    <button
                        className="vote-btn vote-btn-pass glass-card"
                        onClick={() => handleVote('pass')}
                    >
                        <svg className="vote-icon" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span className="vote-label">Pass</span>
                        <div className="vote-hint">
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </div>
                    </button>

                    <div className={`brawler-card-main glass-card ${animation}`}>
                        <div className="brawler-image-container">
                            <img
                                src={`https://media.brawltime.ninja/brawlers/${currentBrawler.name.toLowerCase().replace(/[.\s&]/g, '_')}/model.png?size=400`}
                                alt={currentBrawler.name}
                                className="brawler-image"
                                onError={(e) => {
                                    e.target.src = `https://media.brawltime.ninja/brawlers/${currentBrawler.name.toLowerCase().replace(/[.\s&]/g, '_')}/avatar.png?size=400`;
                                }}
                            />
                            <div className="brawler-overlay">
                                <h2 className="brawler-name-large">{currentBrawler.name}</h2>
                            </div>
                        </div>
                    </div>

                    <button
                        className="vote-btn vote-btn-smash glass-card"
                        onClick={() => handleVote('smash')}
                    >
                        <svg className="vote-icon" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="vote-label">Smash</span>
                        <div className="vote-hint">
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </button>
                </div>
            ) : (
                <div className="results-container glass-card fade-in">
                    <div className="results-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <h2 className="results-title">All Done!</h2>
                    <p className="results-subtitle">You've rated all {brawlers.length} Brawlers</p>

                    <div className="results-stats">
                        <div className="result-stat smash">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <div className="result-stat-value">{stats.smash}</div>
                            <div className="result-stat-label">Smash</div>
                            <div className="result-stat-percent">
                                {Math.round((stats.smash / brawlers.length) * 100)}%
                            </div>
                        </div>

                        <div className="result-stat pass">
                            <svg className="icon" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <div className="result-stat-value">{stats.pass}</div>
                            <div className="result-stat-label">Pass</div>
                            <div className="result-stat-percent">
                                {Math.round((stats.pass / brawlers.length) * 100)}%
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-lg" onClick={handleRestart}>
                        <svg className="icon" viewBox="0 0 24 24">
                            <polyline points="23 4 23 10 17 10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Play Again
                    </button>
                </div>
            )}
            <div className="sop-progress glass-card slide-in-left">
                <div className="progress-info">
                    <span className="progress-text">
                        {currentIndex} / {brawlers.length}
                    </span>
                    <button
                        className="btn-stats"
                        onClick={() => setShowStats(!showStats)}
                    >
                        <svg className="icon" viewBox="0 0 24 24">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        Stats
                    </button>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(currentIndex / brawlers.length) * 100}%` }}
                    />
                </div>

                {showStats && (
                    <div className="stats-popup fade-in">
                        <div className="stat-item-inline smash">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span>Smash: {stats.smash}</span>
                        </div>
                        <div className="stat-item-inline pass">
                            <svg className="icon" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span>Pass: {stats.pass}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}