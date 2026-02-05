import { useState, useEffect } from 'react';
import './PlayerSearch.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function PlayerSearch({ onNavigate, searchData }) {
  const [searchType, setSearchType] = useState('player');
  const [searchTag, setSearchTag] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTypeChange = (type) => {
    setSearchType(type);
    setSearchResult(null);
    setError('');
  };

  const performSearch = async (tag, type) => {
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const cleanTag = tag.replace('#', '').trim();
      const response = await axios.get(`${API_URL}/brawlstars/${type}/${cleanTag}`);
      setSearchResult(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Search failed';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTag.trim()) return;
    performSearch(searchTag, searchType);
  };

  useEffect(() => {
    if (searchData && searchData.tag) {
      setSearchTag(searchData.tag);
      setSearchType(searchData.type || 'player');
      performSearch(searchData.tag, searchData.type || 'player');
    }
  }, [searchData]);

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
            onClick={() => handleTypeChange('player')}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Player
          </button>
          <button
            className={`tab ${searchType === 'club' ? 'active' : ''}`}
            onClick={() => handleTypeChange('club')}
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

      {searchResult && !loading && (
        <div className="search-results fade-in">
          {searchType === 'player' ? (
            <>
              <div className="player-header glass-card">
                <div className="player-avatar">
                  <div className="avatar-circle">
                    {searchResult.icon && (
                      <img src={`https://media.brawltime.ninja/avatars/${searchResult.icon.id}.png?size=400`} alt="icon" className="avatar-icon"/>
                    )}
                  </div>
                </div>
                <div className="player-info">
                  <h2 className="player-name">{searchResult.name}</h2>
                  <p className="player-tag">#{searchResult.tag}</p>
                  <div className="player-club">
                    {searchResult.club ? (
                      <>
                        <svg className="icon" viewBox="0 0 24 24">
                          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                        </svg>
                        <span>{searchResult.club.name}</span>
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
                  <div className="stat-value">{searchResult.trophies.toLocaleString()}</div>
                  <div className="stat-label">Trophies</div>
                </div>

                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <div className="stat-value">{searchResult.highestTrophies.toLocaleString()}</div>
                  <div className="stat-label">Highest Trophies</div>
                </div>

                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  <div className="stat-value">{searchResult['3vs3Victories'].toLocaleString()}</div>
                  <div className="stat-label">3v3 Victories</div>
                </div>

                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                  <div className="stat-value">{searchResult.soloVictories.toLocaleString()}</div>
                  <div className="stat-label">Solo Victories</div>
                </div>

                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                  <div className="stat-value">{searchResult.duoVictories.toLocaleString()}</div>
                  <div className="stat-label">Duo Victories</div>
                </div>

                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                  <div className="stat-value">{searchResult.brawlers?.length || 0}</div>
                  <div className="stat-label">Brawlers</div>
                </div>
              </div>

              {searchResult.brawlers && searchResult.brawlers.length > 0 && (
                <div className="brawlers-section glass-card">
                  <h3 className="section-title">Brawlers</h3>
                  <div className="brawlers-grid">
                    {searchResult.brawlers.map((brawler, index) => (
                      <div key={index} className="brawler-card">
                        <div className="brawler-header">
                          <div className="brawler-info">
                            <div className="brawler-name">{brawler.name}</div>
                            <div className="brawler-power">Power {brawler.power}</div>
                          </div>
                          <img className="brawler-icon" src={`https://media.brawltime.ninja/brawlers/${brawler.name.toLowerCase().replace(/[.\s&]/g, '_')}/avatar.png?size=160`} alt={brawler.name} />
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
            </>
          ) : (
            <>
              <div className="club-header glass-card">
                <div className="club-info">
                  <h2 className="club-name">{searchResult.name}</h2>
                  <p className="club-tag">#{searchResult.tag}</p>
                  <p className="club-description">{searchResult.description}</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                  <div className="stat-value">{searchResult.trophies.toLocaleString()}</div>
                  <div className="stat-label">Total Trophies</div>
                </div>
                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="stat-value">{searchResult.members?.length || 0} / 30</div>
                  <div className="stat-label">Members</div>
                </div>
                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div className="stat-value">{searchResult.requiredTrophies.toLocaleString()}</div>
                  <div className="stat-label">Required Trophies</div>
                </div>
                <div className="stat-card glass-card">
                  <svg className="stat-icon" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <div className="stat-value" style={{ textTransform: 'capitalize' }}>{searchResult.type}</div>
                  <div className="stat-label">Club Type</div>
                </div>
              </div>

              {searchResult.members && searchResult.members.length > 0 && (
                <div className="members-section glass-card">
                  <h3 className="section-title">Members</h3>
                  <div className="members-list">
                    {searchResult.members.map((member, index) => (
                      <div key={index} className="member-item">
                        <div className="member-rank">#{index + 1}</div>
                        <div className="member-name">{member.name}</div>
                        <div className="member-role">{member.role.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="member-trophies">
                          <img src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9wcjFDdm5aTTRQS3dtUmtKVkRUUi5wbmcifQ:supercell:0GeZ96BpVtULTS3Y9IqCpCbvcughkEaPZb_AqZjT92s?width=2400" alt="trophy" style={{ width: '20px', height: '15px' }} />
                          {member.trophies.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerSearch;
