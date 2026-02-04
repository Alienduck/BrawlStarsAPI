import './Home.css';

function Home({ onNavigate, user }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content fade-in">
          <h1 className="hero-title">
            <span className="hero-title-main">Brawl Stats</span>
            <span className="hero-title-sub">Your Ultimate Brawl Stars Companion</span>
          </h1>
          <p className="hero-description">
            Track your stats, analyze your gameplay, and dominate the arena with real-time data from the official Brawl Stars API.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('register')}>
              Get Started
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => onNavigate('search')}>
              <svg className="icon" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Search Players
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <svg className="feature-icon" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <span className="feature-text">Live Stats</span>
          </div>
          <div className="floating-card card-2">
            <svg className="feature-icon" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="feature-text">Performance</span>
          </div>
          <div className="floating-card card-3">
            <svg className="feature-icon" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="feature-text">Clubs</span>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title slide-in-left">Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card glass-card slide-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-large" viewBox="0 0 24 24">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="feature-title">Player Stats</h3>
            <p className="feature-description">
              Track trophies, victories, and brawler performance in real-time. Get detailed insights into your progression.
            </p>
          </div>

          <div className="feature-card glass-card slide-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-large" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </div>
            <h3 className="feature-title">Club Analytics</h3>
            <p className="feature-description">
              Monitor your club's performance, member activity, and compare with other top clubs in the leaderboard.
            </p>
          </div>

          <div className="feature-card glass-card slide-in-left" style={{ animationDelay: '0.3s' }}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-large" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className="feature-title">Brawler Analysis</h3>
            <p className="feature-description">
              Detailed statistics for each brawler including win rates, power levels, and optimal game modes.
            </p>
          </div>

          <div className="feature-card glass-card slide-in-left" style={{ animationDelay: '0.4s' }}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-large" viewBox="0 0 24 24">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
            </div>
            <h3 className="feature-title">Battle History</h3>
            <p className="feature-description">
              Review your recent battles, analyze your performance, and learn from your victories and defeats.
            </p>
          </div>

          <div className="feature-card glass-card slide-in-left" style={{ animationDelay: '0.5s' }}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-large" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className="feature-title">Save Favorites</h3>
            <p className="feature-description">
              Save your favorite player tags and club tags for quick access to their stats anytime.
            </p>
          </div>

          <div className="feature-card glass-card slide-in-left" style={{ animationDelay: '0.6s' }}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-large" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3 className="feature-title">Responsive Design</h3>
            <p className="feature-description">
              Access your stats on any device with our beautiful, mobile-optimized interface.
            </p>
          </div>
        </div>
      </section>

      { !user && <section className="cta">
        <div className="cta-content glass-card fade-in">
          <h2 className="cta-title">Ready to Level Up?</h2>
          <p className="cta-description">
            Join thousands of players tracking their stats and improving their game.
          </p>
          <button className="btn btn-accent btn-lg" onClick={() => onNavigate('register')}>
            Create Free Account
          </button>
        </div>
      </section>}
    </div>
  );
}

export default Home;
