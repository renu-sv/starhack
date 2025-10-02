import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications] = useState(3);
  
  const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const user = {
    name: userPreferences.name || 'Vyshu',
    level: 12,
    totalPoints: 15420,
    avatar: '👩‍💼'
  };

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview', route: '/dashboard' },
    { id: 'challenges', icon: '🎯', label: 'Challenges', route: '/challenges' },
    { id: 'achievements', icon: '🏆', label: 'Achievements', route: '/achievements' },
    { id: 'community', icon: '👥', label: 'Community', route: '/community' },
    { id: 'insurance', icon: '🛡️', label: 'Insurance', route: '/insurance' },
    { id: 'analytics', icon: '📈', label: 'Analytics', route: '/analytics' },
    { id: 'settings', icon: '⚙️', label: 'Settings', route: '/settings' }
  ];

  const getCurrentRoute = () => {
    return menuItems.find(item => item.route === location.pathname)?.id || 'overview';
  };

  return (
    <>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        boxShadow: '4px 0 20px rgba(0,0,0,0.08)',
        position: 'fixed',
        height: '100vh',
        overflow: 'hidden',
        transition: 'width 0.3s ease',
        zIndex: 50
      }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            🌱
          </div>
          {sidebarOpen && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                YouMatter
              </h2>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                Wellness Platform
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1rem' }}>
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                margin: '0.25rem 0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: getCurrentRoute() === item.id 
                  ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                  : 'transparent',
                color: getCurrentRoute() === item.id ? 'white' : '#6b7280'
              }}
              onMouseEnter={(e) => {
                if (getCurrentRoute() !== item.id) {
                  e.target.style.background = '#f9fafb';
                  e.target.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (getCurrentRoute() !== item.id) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6b7280';
                }
              }}
            >
              <span style={{ fontSize: '1.25rem', minWidth: '20px' }}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <span style={{ fontWeight: '500' }}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
          borderRadius: '16px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            {user.avatar}
          </div>
          {sidebarOpen && (
            <div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>
                {user.name}
              </h4>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                Level {user.level} • {user.totalPoints} pts
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Top Navigation */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ☰
          </button>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            textTransform: 'capitalize'
          }}>
            {menuItems.find(item => item.route === location.pathname)?.label || 'Dashboard'}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '0.5rem 1rem 0.5rem 2.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '0.9rem',
                width: '250px'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '0.75rem',
              color: '#9ca3af',
              fontSize: '1rem'
            }}>
              🔍
            </span>
          </div>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: '#6b7280',
              position: 'relative'
            }}>
              🔔
              {notifications > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;