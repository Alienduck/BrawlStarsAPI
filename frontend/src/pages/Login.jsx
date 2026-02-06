import { useState } from 'react';
import './Auth.css';
import api from '../services/axios';

function Login({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post(`/user/login`, { email, password });
      const data = response.data;

      onLogin(data.user, data.token);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container fade-in">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <svg className="auth-icon" viewBox="0 0 24 24">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to access your stats</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? (
                <div className="loading">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account?</p>
            <button 
              className="btn btn-ghost"
              onClick={() => onNavigate('register')}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="auth-visual">
          <div className="stats-preview glass-card">
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <div className="stat-info">
                <div className="stat-value">24,563</div>
                <div className="stat-label">Total Trophies</div>
              </div>
            </div>
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <div className="stat-info">
                <div className="stat-value">67%</div>
                <div className="stat-label">Win Rate</div>
              </div>
            </div>
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              <div className="stat-info">
                <div className="stat-value">1,429</div>
                <div className="stat-label">Battles Won</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
