import { useState, useEffect } from 'react';
import './Header.css';

function Header({ user, onNavigate, currentPage, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => { onNavigate('home'); setMenuOpen(false); }}>
          <svg className="logo-icon" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" 
                  fill="url(#logo-gradient)" />
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9B59B6" />
                <stop offset="100%" stopColor="#E91E63" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">Brawl Stats</span>
        </div>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => { onNavigate('home'); setMenuOpen(false); }}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </button>

          <button 
            className={`nav-link ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => { onNavigate('search'); setMenuOpen(false); }}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>Search</span>
          </button>

          {user ? (
            <>
              <button 
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Dashboard</span>
              </button>

              <button 
                className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={() => { onNavigate('profile'); setMenuOpen(false); }}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Profile</span>
              </button>

              <button className="btn btn-ghost btn-sm" onClick={onLogout}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => { onNavigate('login'); setMenuOpen(false); }}
              >
                Login
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => { onNavigate('register'); setMenuOpen(false); }}
              >
                Sign Up
              </button>
            </>
          )}
        </nav>

        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
