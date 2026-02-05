import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayerSearch from './pages/PlayerSearch';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [navigationParams, setNavigationParams] = useState(null);

  const handleNavigate = (page, params = null) => {
    setCurrentPage(page);
    setNavigationParams(params);
  };

  useEffect(() => {
    if (token) {
      // Verify token and get user data
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(userData);
    }
  }, [token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    console.log(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleNavigate('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} user={user} />;
      case 'dashboard':
        return <Dashboard user={user} onNavigate={handleNavigate} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'search':
        return <PlayerSearch onNavigate={handleNavigate} searchData={navigationParams} />;
      case 'profile':
        return <Profile user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <div className="stars-background"></div>
      <div className="gradient-orbs"></div>
      <Header 
        user={user} 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
