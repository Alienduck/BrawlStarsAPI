import { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function Profile({ user, onNavigate, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [playerTags, setPlayerTags] = useState([]);
  const [clubTags, setClubTags] = useState([]);
  const [newPlayerTag, setNewPlayerTag] = useState('');
  const [newClubTag, setNewClubTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = user?._id;
      
      if (!userId) {
        return;
      }

      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      setUserData(data);
      setPlayerTags(data.playerTags || []);
      setClubTags(data.clubTags || []);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setMessage({ type: 'error', text: 'Failed to load user data' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayerTag = () => {
    if (!newPlayerTag.trim()) return;
    
    const cleanTag = newPlayerTag.trim().toUpperCase();
    if (!playerTags.includes(cleanTag)) {
      setPlayerTags([...playerTags, cleanTag]);
      setNewPlayerTag('');
    }
  };

  const handleRemovePlayerTag = (tag) => {
    setPlayerTags(playerTags.filter(t => t !== tag));
  };

  const handleAddClubTag = () => {
    if (!newClubTag.trim()) return;
    
    const cleanTag = newClubTag.trim().toUpperCase();
    if (!clubTags.includes(cleanTag)) {
      setClubTags([...clubTags, cleanTag]);
      setNewClubTag('');
    }
  };

  const handleRemoveClubTag = (tag) => {
    setClubTags(clubTags.filter(t => t !== tag));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const userId = user?._id;

      await axios.put(`${API_URL}/user/${userId}`, {
        playerTags,
        clubTags
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      const errorMsg = err.response?.data?.message || 'Connection error';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile">
        <div className="loading-container">
          <div className="loading">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-header fade-in">
        <div>
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your account and saved tags</p>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type === 'success' ? 'success-message' : 'error-message'} fade-in`}>
          <svg className="icon" viewBox="0 0 24 24">
            {message.type === 'success' ? (
              <>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </>
            )}
          </svg>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-section glass-card slide-in-left">
          <div className="section-header">
            <svg className="section-icon" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <div>
              <h2 className="section-title">Account Information</h2>
              <p className="section-description">Your account details</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Email</label>
              <div className="info-value">{user?.email || 'N/A'}</div>
            </div>
            <div className="info-item">
              <label className="info-label">Account Created</label>
              <div className="info-value">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section glass-card slide-in-left" style={{ animationDelay: '0.1s' }}>
          <div className="section-header">
            <svg className="section-icon" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <div>
              <h2 className="section-title">Player Tags</h2>
              <p className="section-description">Track your favorite players</p>
            </div>
          </div>

          <div className="tags-input-group">
            <input
              type="text"
              className="tag-input"
              placeholder="Enter player tag (e.g., #2PP)"
              value={newPlayerTag}
              onChange={(e) => setNewPlayerTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayerTag()}
            />
            <button className="btn btn-secondary" onClick={handleAddPlayerTag}>
              <svg className="icon" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
          </div>

          <div className="tags-list">
            {playerTags.length === 0 ? (
              <p className="empty-text">No player tags added yet</p>
            ) : (
              playerTags.map((tag, index) => (
                <div key={index} className="tag-item">
                  <span className="tag-text">{tag}</span>
                  <button 
                    className="tag-remove"
                    onClick={() => handleRemovePlayerTag(tag)}
                  >
                    <svg className="icon" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="profile-section glass-card slide-in-left" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <svg className="section-icon" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div>
              <h2 className="section-title">Club Tags</h2>
              <p className="section-description">Track your favorite clubs</p>
            </div>
          </div>

          <div className="tags-input-group">
            <input
              type="text"
              className="tag-input"
              placeholder="Enter club tag (e.g., #2PP)"
              value={newClubTag}
              onChange={(e) => setNewClubTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddClubTag()}
            />
            <button className="btn btn-secondary" onClick={handleAddClubTag}>
              <svg className="icon" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
          </div>

          <div className="tags-list">
            {clubTags.length === 0 ? (
              <p className="empty-text">No club tags added yet</p>
            ) : (
              clubTags.map((tag, index) => (
                <div key={index} className="tag-item">
                  <span className="tag-text">{tag}</span>
                  <button 
                    className="tag-remove"
                    onClick={() => handleRemoveClubTag(tag)}
                  >
                    <svg className="icon" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="profile-actions fade-in" style={{ animationDelay: '0.3s' }}>
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          className="btn btn-ghost btn-lg"
          onClick={() => onNavigate('dashboard')}
        >
          Cancel
        </button>
      </div>

      <div className="danger-zone glass-card fade-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="danger-title">Danger Zone</h3>
        <p className="danger-description">Irreversible actions for your account</p>
        <button className="btn btn-danger" onClick={onLogout}>
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
