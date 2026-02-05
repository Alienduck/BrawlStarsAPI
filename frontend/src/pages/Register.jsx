import { useState } from 'react';
import './Auth.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function Register({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/user/register`, {
        email,
        password,
        playerTags: [],
        clubTags: []
      });

      setSuccess(true);
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Registration failed';
      setError(errorMessage);
      console.error('Registration error:', err);
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join the Brawl Stats community</p>
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

            {success && (
              <div className="success-message">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Account created! Redirecting to login...
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading || success}
            >
              {loading ? (
                <div className="loading">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              ) : success ? (
                'Success!'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <button 
              className="btn btn-ghost"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
          </div>
        </div>

        <div className="auth-visual">
          <div className="feature-preview glass-card">
            <h3 className="preview-title">What you'll get:</h3>
            <div className="preview-list">
              <div className="preview-item">
                <svg className="preview-icon" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Track unlimited players</span>
              </div>
              <div className="preview-item">
                <svg className="preview-icon" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Save favorite tags</span>
              </div>
              <div className="preview-item">
                <svg className="preview-icon" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Real-time statistics</span>
              </div>
              <div className="preview-item">
                <svg className="preview-icon" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Club analytics</span>
              </div>
              <div className="preview-item">
                <svg className="preview-icon" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Performance insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
