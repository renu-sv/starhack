import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/challenges', icon: '🎯', label: 'Challenges' },
    { path: '/community', icon: '👥', label: 'Community' },
    { path: '/rewards', icon: '🏆', label: 'Rewards' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '12px 0',
      display: 'flex',
      justifyContent: 'space-around',
      zIndex: 1000
    }}>
      {navItems.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: location.pathname === item.path ? '#4CAF50' : '#6b7280',
            fontSize: '12px'
          }}
        >
          <span style={{ fontSize: '20px' }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;