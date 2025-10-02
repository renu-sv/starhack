import React, { useState } from 'react';
import BottomNav from '../components/layout/BottomNav';
import { communityGoals } from '../data/challenges';

const Community = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const leaderboardData = [
    { rank: 1, name: 'Sarah M.', points: 2840, streak: 15, avatar: 'S' },
    { rank: 2, name: 'Mike K.', points: 2650, streak: 12, avatar: 'M' },
    { rank: 3, name: 'You (Vyshu)', points: 2340, streak: 7, avatar: 'V' },
    { rank: 4, name: 'Lisa P.', points: 2180, streak: 9, avatar: 'L' },
    { rank: 5, name: 'John D.', points: 2050, streak: 6, avatar: 'J' }
  ];

  return (
    <div className="screen-container">
      <div className="content-area animate-fadeIn" style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #E91E63 0%, #2196F3 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Community Hub 👥
          </h1>
          <p style={{ opacity: 0.9 }}>
            Connect, compete, and celebrate together!
          </p>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          marginBottom: '24px',
          background: 'white',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {['leaderboard', 'challenges'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab ? '#4CAF50' : 'transparent',
                color: activeTab === tab ? 'white' : '#757575',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab === 'leaderboard' ? '🏆 Leaderboard' : '🎯 Group Challenges'}
            </button>
          ))}
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="card">
            <h3 style={{ fontSize: '18px', marginBottom: '16px', textAlign: 'center' }}>
              🏆 This Week's Champions
            </h3>
            
            {leaderboardData.map((user, index) => (
              <div
                key={user.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  background: user.rank === 3 ? 'linear-gradient(135deg, #E8F5E8, #E3F2FD)' : 'white',
                  border: user.rank === 3 ? '2px solid #4CAF50' : '1px solid #f0f0f0',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  boxShadow: user.rank <= 3 ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                {/* Rank Badge */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: user.rank === 1 ? '#FFD700' : user.rank === 2 ? '#C0C0C0' : user.rank === 3 ? '#CD7F32' : '#4CAF50',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginRight: '16px'
                }}>
                  {user.rank}
                </div>

                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E91E63, #2196F3)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginRight: '16px'
                }}>
                  {user.avatar}
                </div>

                {/* User Info */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    {user.name}
                    {user.rank === 3 && <span style={{ marginLeft: '8px' }}>👑</span>}
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#757575' }}>
                    <span>💎 {user.points.toLocaleString()} pts</span>
                    <span>🔥 {user.streak} days</span>
                  </div>
                </div>

                {/* Trophy for top 3 */}
                {user.rank <= 3 && (
                  <div style={{ fontSize: '24px', marginLeft: '8px' }}>
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Group Challenges Tab */}
        {activeTab === 'challenges' && (
          <div>
            {communityGoals.map(goal => (
              <div key={goal.id} className="card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '24px', marginRight: '12px' }}>{goal.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      {goal.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#757575' }}>
                      {goal.description}
                    </p>
                  </div>
                </div>

                <div className="progress-bar" style={{ marginBottom: '12px' }}>
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(goal.currentProgress / goal.target) * 100}%` }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#757575' }}>
                    {goal.currentProgress.toLocaleString()} / {goal.target.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#4CAF50', fontWeight: '600' }}>
                    👥 {goal.participants} joined
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  marginTop: '12px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  🚀 Join Challenge
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Social Sharing */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px', textAlign: 'center' }}>
            📱 Share Your Progress
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <button style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600'
            }}>
              📱 WhatsApp
            </button>
            <button style={{
              background: '#E4405F',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600'
            }}>
              📸 Instagram
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Community;