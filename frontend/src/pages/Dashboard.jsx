import { useState, useEffect } from 'react';
import './Dashboard.css';
import api from '../services/axios';

function Dashboard({ user, onNavigate }) {
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [savedClubs, setSavedClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedData();
    }
  }, [user]);

  const fetchSavedData = async () => {
    setLoading(true);
    try {
      // Fetch user data to get saved tags using axios
      const userResponse = await api.get(`/user/${user._id}`);

      const userData = userResponse.data;
        
      // Fetch player data for each saved player tag
      if (userData.playerTags && userData.playerTags.length > 0) {
        const playerPromises = userData.playerTags.map(tag =>
          api.get(`/brawlstars/player/${tag.replace('#', '')}`)
              .then(res => res.data)
              .catch(() => null)
          );
          const players = await Promise.all(playerPromises);
          setSavedPlayers(players.filter(p => p !== null));
        }

        setSavedClubs([]);
    } catch (err) {
      console.error('Error fetching saved data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header fade-in">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Track your favorite players and clubs</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('profile')}>
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Manage Tags
        </button>
      </div>

      {savedPlayers.length === 0 && savedClubs.length === 0 ? (
        <div className="empty-state glass-card slide-in-left">
          <svg className="empty-icon" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <h2 className="empty-title">No Saved Tags Yet</h2>
          <p className="empty-description">
            Add player or club tags in your profile to start tracking stats
          </p>
          <div className="empty-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('profile')}>
              Add Tags
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate('search')}>
              Search Players
            </button>
          </div>
        </div>
      ) : (
        <>
          {savedPlayers.length > 0 && (
            <section className="dashboard-section fade-in">
              <h2 className="section-title">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Saved Players
              </h2>
              <div className="players-grid">
                {savedPlayers.map((player, index) => (
                  <button 
                    key={index} 
                    className="player-quick-card glass-card slide-in-left" 
                    style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }} 
                    onClick={() => onNavigate('search', { 
                      tag: player.tag, 
                      type: 'player' 
                    })}
                  >
                    <div className="quick-card-header">
                      <div className="quick-avatar">
                        <img src={`https://media.brawltime.ninja/avatars/${player.icon.id}.png?size=400`} alt="icon" className="avatar-icon"/>
                      </div>
                      <div className="quick-info">
                        <h3 className="quick-name">{player.name}</h3>
                        <p className="quick-tag">{player.tag}</p>
                      </div>
                    </div>
                    <div className="quick-stats">
                      <div className="quick-stat">
                        <img src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9wcjFDdm5aTTRQS3dtUmtKVkRUUi5wbmcifQ:supercell:0GeZ96BpVtULTS3Y9IqCpCbvcughkEaPZb_AqZjT92s?width=2400" alt="trophies" className="mini-icon" style={ {width: '20px', height: '16px'}}/>
                        <span className="quick-stat-value">{player.trophies.toLocaleString()}</span>
                        <span className="quick-stat-label">Trophies</span>
                      </div>
                      <div className="quick-stat">
                        <svg className="mini-icon" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                        <span className="quick-stat-value">{player['3vs3Victories'].toLocaleString()}</span>
                        <span className="quick-stat-label">3v3 Wins</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {savedClubs.length > 0 && (
            <section className="dashboard-section fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="section-title">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Saved Clubs
              </h2>
              <div className="clubs-grid">
                {/* TODO: Render saved clubs */}
              </div>
            </section>
          )}

          <section className="quick-actions glass-card fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-card" onClick={() => onNavigate('search')}>
                <svg className="action-icon" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span>Search Players</span>
              </button>
              <button className="action-card" onClick={() => onNavigate('profile')}>
                <svg className="action-icon" viewBox="0 0 24 24">
                  <path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Manage Tags</span>
              </button>
              <button className="action-card" onClick={() => onNavigate('profile')}>
                <svg className="action-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Settings</span>
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
