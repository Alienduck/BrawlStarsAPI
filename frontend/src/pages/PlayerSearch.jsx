import { useState } from 'react';
import './PlayerSearch.css';

const API_URL = 'http://localhost:5000';

function PlayerSearch({ onNavigate }) {
  const [searchType, setSearchType] = useState('player');
  const [searchTag, setSearchTag] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTag.trim()) return;

    setLoading(true);
    setError('');
    setPlayerData(null);

    try {
      const cleanTag = searchTag.replace('#', '').trim();
      const response = await fetch(`${API_URL}/brawlstars/player/${cleanTag}`);

      if (response.ok) {
        const data = await response.json();
        setPlayerData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Player not found');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="player-search">
      <div className="search-header fade-in">
        <h1 className="page-title">Player Search</h1>
        <p className="page-subtitle">Search for any Brawl Stars player by their tag</p>
      </div>

      <div className="search-container glass-card slide-in-left">
        <div className="search-type-tabs">
          <button
            className={`tab ${searchType === 'player' ? 'active' : ''}`}
            onClick={() => setSearchType('player')}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Player
          </button>
          <button
            className={`tab ${searchType === 'club' ? 'active' : ''}`}
            onClick={() => setSearchType('club')}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Club
          </button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <svg className="search-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder={`Enter ${searchType} tag (e.g., #2PP)`}
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <svg className="icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      )}

      {playerData && !loading && (
        <div className="player-results fade-in">
          <div className="player-header glass-card">
            <div className="player-avatar">
              <div className="avatar-circle">
                {/* <svg className="avatar-icon" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg> */}
                <img src={`https://media.brawltime.ninja/avatars/${playerData.icon.id}.png?size=400`} alt="icon" className="avatar-icon"/>
              </div>
            </div>
            <div className="player-info">
              <h2 className="player-name">{playerData.name}</h2>
              <p className="player-tag">#{playerData.tag}</p>
              <div className="player-club">
                {playerData.club ? (
                  <>
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                    <span>{playerData.club.name}</span>
                  </>
                ) : (
                  <span className="no-club">No Club</span>
                )}
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card glass-card">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <div className="stat-value">{playerData.trophies.toLocaleString()}</div>
              <div className="stat-label">Trophies</div>
            </div>

            <div className="stat-card glass-card">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <div className="stat-value">{playerData.highestTrophies.toLocaleString()}</div>
              <div className="stat-label">Highest Trophies</div>
            </div>

            <div className="stat-card glass-card">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              <div className="stat-value">{playerData['3vs3Victories'].toLocaleString()}</div>
              <div className="stat-label">3v3 Victories</div>
            </div>

            <div className="stat-card glass-card">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
              <div className="stat-value">{playerData.soloVictories.toLocaleString()}</div>
              <div className="stat-label">Solo Victories</div>
            </div>

            <div className="stat-card glass-card">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              <div className="stat-value">{playerData.duoVictories.toLocaleString()}</div>
              <div className="stat-label">Duo Victories</div>
            </div>

            <div className="stat-card glass-card">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <div className="stat-value">{playerData.brawlers?.length || 0}</div>
              <div className="stat-label">Brawlers</div>
            </div>
          </div>

          {playerData.brawlers && playerData.brawlers.length > 0 && (
            <div className="brawlers-section glass-card">
              <h3 className="section-title">Brawlers</h3>
              <div className="brawlers-grid">
                {playerData.brawlers.map((brawler, index) => (
                  <div key={index} className="brawler-card">
                    <div className="brawler-header">
                      <div className="brawler-info">
                        <div className="brawler-name">{brawler.name}</div>
                        <div className="brawler-power">Power {brawler.power}</div>
                      </div>
                      <img className="brawler-icon" src={`https://media.brawltime.ninja/brawlers/${brawler.name.toLowerCase().replace(/[.\s&]/g
, '_')}/avatar.png?size=160`} alt={brawler.name} />
                    </div>
                    <div className="brawler-stats">
                      <div className="brawler-trophies">
                        <img src={ brawler.trophies < 1000 ? "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9wcjFDdm5aTTRQS3dtUmtKVkRUUi5wbmcifQ:supercell:0GeZ96BpVtULTS3Y9IqCpCbvcughkEaPZb_AqZjT92s?width=2400" : "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9vNVNzWmZUUjJTMlFDQmdKdTI5Mi5wbmcifQ:supercell:NaQzaw_u7GNKiyXclfcUL2wOJj4fRP43pkTc6m8yqak?width=2400"} alt="trophy-icon" style={ { width: "35px", height: "25px" } } />
                        {brawler.trophies}
                      </div>
                      <div className="brawler-rank">Rank {brawler.rank}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerSearch;
