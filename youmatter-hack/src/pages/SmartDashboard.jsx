import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SmartDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  
  // Get user preferences from goal selection
  const userPreferences = location.state?.userPreferences || 
    JSON.parse(localStorage.getItem('userPreferences') || '{}');
  
  const [user] = useState({
    name: userPreferences.name || 'User',
    level: 12,
    xp: 2840,
    nextLevelXP: 3000,
    streak: 7,
    avatar: '👩‍💼',
    healthScore: 78,
    wealthScore: 65,
    wellnessScore: 82,
    sleepQuality: 7.2,
    totalPoints: 15420
  });

  const [todayProgress] = useState({
    steps: { current: 7234, target: 10000, points: 15 },
    water: { current: 6, target: 8, points: 10 },
    meditation: { current: 15, target: 20, points: 20 },
    insurance_check: { current: 0, target: 1, points: 25 },
    workout: { current: 45, target: 60, points: 30 },
    savings: { current: 1500, target: 2000, points: 40 }
  });

  const [achievements] = useState([
    { id: 1, title: 'Week Warrior', icon: '🔥', earned: true, rarity: 'common' },
    { id: 2, title: 'Mindful Master', icon: '🧘‍♀️', earned: true, rarity: 'rare' },
    { id: 3, title: 'Money Saver', icon: '💰', earned: false, rarity: 'epic', progress: 80 },
    { id: 4, title: 'Insurance Pro', icon: '🛡️', earned: false, rarity: 'legendary', progress: 45 }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: 'Alex', points: 18500, avatar: '👨‍💻', trend: '+2' },
    { rank: 2, name: 'Sarah', points: 17200, avatar: '👩‍🎨', trend: '0' },
    { rank: 3, name: 'Vyshu', points: 15420, avatar: '👩‍💼', trend: '+1', isUser: true },
    { rank: 4, name: 'Mike', points: 14800, avatar: '👨‍🏫', trend: '-1' },
    { rank: 5, name: 'Emma', points: 13900, avatar: '👩‍🔬', trend: '+3' }
  ]);

  const completedChallenges = todayProgress.steps.current >= todayProgress.steps.target ? 1 : 0 +
    (todayProgress.water.current >= todayProgress.water.target ? 1 : 0) +
    (todayProgress.meditation.current >= todayProgress.meditation.target ? 1 : 0);

  const totalChallenges = Object.keys(todayProgress).length;

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
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
          {[
            { id: 'overview', icon: '📊', label: 'Overview', active: true },
            { id: 'challenges', icon: '🎯', label: 'Challenges' },
            { id: 'achievements', icon: '🏆', label: 'Achievements' },
            { id: 'community', icon: '👥', label: 'Community' },
            { id: 'insurance', icon: '🛡️', label: 'Insurance' },
            { id: 'analytics', icon: '📈', label: 'Analytics' },
            { id: 'settings', icon: '⚙️', label: 'Settings' }
          ].map(item => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                margin: '0.25rem 0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeTab === item.id 
                  ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                  : 'transparent',
                color: activeTab === item.id ? 'white' : '#6b7280'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.background = '#f9fafb';
                  e.target.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
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

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease'
      }}>
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
          zIndex: 40
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
              margin: 0
            }}>
              Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
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

        {/* Dashboard Content */}
        <main style={{ padding: '2rem' }}>
          {/* Welcome Hero */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)'
            }} />
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '2rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  Good morning, {user.name}! ☀️
                </h1>
                <p style={{
                  fontSize: '1.1rem',
                  opacity: 0.9,
                  marginBottom: '1.5rem'
                }}>
                  Your wellness score increased by 5 points this week. You're crushing your goals! 🚀
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      marginBottom: '0.25rem'
                    }}>
                      Level {user.level}
                    </div>
                    <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                      Wellness Explorer
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      marginBottom: '0.25rem'
                    }}>
                      {user.streak} days
                    </div>
                    <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                      Current Streak 🔥
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      marginBottom: '0.25rem'
                    }}>
                      {user.xp} XP
                    </div>
                    <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                      Total Points
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Progress Ring */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #10b981 0%, #10b981 95%, rgba(255,255,255,0.3) 95%, rgba(255,255,255,0.3) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700'
                    }}>
                      95%
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      opacity: 0.8
                    }}>
                      to Level {user.level + 1}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'Health Score', value: user.healthScore, change: '+5', color: '#10b981', icon: '💚' },
              { label: 'Wealth Score', value: user.wealthScore, change: '+3', color: '#f59e0b', icon: '💰' },
              { label: 'Wellness Score', value: user.wellnessScore, change: '+7', color: '#8b5cf6', icon: '✨' },
              { label: 'Sleep Quality', value: user.sleepQuality, change: '-0.3', color: '#3b82f6', icon: '😴' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #f3f4f6',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: stat.color
                }} />
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '2rem' }}>
                    {stat.icon}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                    background: stat.change.startsWith('+') ? '#ecfdf5' : '#fef2f2',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px'
                  }}>
                    {stat.change}
                  </div>
                </div>
                
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {stat.value}
                </div>
                
                <div style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Left Column */}
            <div>
              {/* Today's Challenges */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    🎯 Today's Challenges
                  </h3>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {completedChallenges}/{totalChallenges} Complete
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {Object.entries(todayProgress).map(([key, progress]) => (
                    <div
                      key={key}
                      style={{
                        background: '#f9fafb',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        border: '1px solid #f3f4f6'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          <span style={{ fontSize: '1.25rem' }}>
                            {key === 'steps' ? '🚶‍♀️' : 
                             key === 'water' ? '💧' : 
                             key === 'meditation' ? '🧘‍♀️' : 
                             key === 'workout' ? '💪' :
                             key === 'savings' ? '💰' : '🛡️'}
                          </span>
                          <span style={{
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'capitalize'
                          }}>
                            {key.replace('_', ' ')}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280'
                          }}>
                            {progress.current.toLocaleString()} / {progress.target.toLocaleString()}
                          </span>
                          <span style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            +{progress.points} pts
                          </span>
                        </div>
                      </div>
                      
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: progress.current >= progress.target 
                            ? 'linear-gradient(90deg, #10b981, #3b82f6)'
                            : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                          borderRadius: '4px',
                          width: `${Math.min((progress.current / progress.target) * 100, 100)}%`,
                          transition: 'width 1s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div style={{
                background: 'linear-gradient(135deg, #fef7ff, #f0f9ff)',
                borderRadius: '20px',
                padding: '2rem',
                border: '2px solid #e879f9'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    🤖
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: 0
                    }}>
                      AI Health Coach
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      Personalized recommendations based on your data
                    </p>
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    🧘‍♀️ 7-minute Breathing Session
                  </h4>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    Your stress indicators suggest high cortisol levels today
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.8rem'
                    }}>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>
                        📈 Reduce stress by 23%
                      </span>
                      <span style={{ color: '#6b7280' }}>
                        ⏱️ 7 min
                      </span>
                    </div>
                    <button style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Achievements */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🏆 Achievements
                </h3>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        background: achievement.earned ? '#f0fdf4' : '#f9fafb',
                        borderRadius: '12px',
                        border: `1px solid ${achievement.earned ? '#bbf7d0' : '#f3f4f6'}`
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: achievement.earned 
                          ? 'linear-gradient(135deg, #ffd700, #ff8c00)' 
                          : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem'
                      }}>
                        {achievement.earned ? achievement.icon : '🔒'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: achievement.earned ? '#166534' : '#6b7280',
                          margin: 0
                        }}>
                          {achievement.title}
                        </h4>
                        {!achievement.earned && achievement.progress && (
                          <div style={{
                            width: '100%',
                            height: '4px',
                            background: '#e5e7eb',
                            borderRadius: '2px',
                            marginTop: '0.25rem'
                          }}>
                            <div style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                              borderRadius: '2px',
                              width: `${achievement.progress}%`
                            }} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  👑 Leaderboard
                </h3>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {leaderboard.map(user => (
                    <div
                      key={user.rank}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        background: user.isUser ? '#f0f9ff' : '#f9fafb',
                        borderRadius: '12px',
                        border: user.isUser ? '2px solid #3b82f6' : '1px solid #f3f4f6'
                      }}
                    >
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: user.rank <= 3 
                          ? user.rank === 1 ? '#ffd700' 
                            : user.rank === 2 ? '#c0c0c0' 
                            : '#cd7f32'
                          : '#6b7280',
                        color: user.rank <= 3 ? '#000' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: '700'
                      }}>
                        {user.rank}
                      </div>
                      
                      <div style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem'
                      }}>
                        {user.avatar}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '0.9rem',
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
                          {user.points.toLocaleString()} points
                        </p>
                      </div>
                      
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: user.trend.startsWith('+') ? '#10b981' : 
                               user.trend === '0' ? '#6b7280' : '#ef4444'
                      }}>
                        {user.trend !== '0' && (user.trend.startsWith('+') ? '↗️' : '↘️')}
                        {user.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SmartDashboard;