import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/rewards', icon: '🏆', label: 'Rewards' },
    { path: '/community', icon: '👥', label: 'Community' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ];

  const shouldShowNav = ['/dashboard', '/rewards', '/community', '/profile'].includes(location.pathname);

  if (!shouldShowNav) return null;

  return (
    <div className="bottom-nav">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            style={{ background: 'none', border: 'none' }}
          >
            <div style={{ fontSize: '20px', marginBottom: '2px' }}>{item.icon}</div>
            <div style={{ fontSize: '10px' }}>{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;