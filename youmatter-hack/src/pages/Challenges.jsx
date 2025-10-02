import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Challenges = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedChallenges, setJoinedChallenges] = useState(['challenge1', 'challenge3']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3);
  
  // Get user preferences - KEEPING YOUR WORKING LOGIC
  const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const userGoals = userPreferences.selectedGoals || [];

  const [user] = useState({
    name: userPreferences.name || 'User',
    level: 12,
    streak: 7,
    totalPoints: 15420,
    completedChallenges: 47,
    avatar: '👩‍💼'
  });

  // Challenge Categories based on user goals
  const getAvailableCategories = () => {
    const allCategories = [
      { id: 'all', name: 'All Challenges', icon: '🎯', color: '#8b5cf6' },
      { id: 'health_fitness', name: 'Health & Fitness', icon: '💪', color: '#10b981' },
      { id: 'mental_wellbeing', name: 'Mental Wellness', icon: '🧠', color: '#ec4899' },
      { id: 'financial_wellbeing', name: 'Financial Health', icon: '💰', color: '#f59e0b' },
      { id: 'insurance_engagement', name: 'Insurance Smart', icon: '🛡️', color: '#3b82f6' }
    ];

    // Show all categories if no goals selected, otherwise filter by user goals
    if (userGoals.length === 0) return allCategories;
    
    return [
      allCategories[0], // Always show "All"
      ...allCategories.filter(cat => userGoals.includes(cat.id))
    ];
  };

  const categories = getAvailableCategories();

  // Personalized challenges based on user goals
  const challenges = {
    daily: [
      {
        id: 'challenge1',
        title: '10K Steps Marathon',
        description: 'Walk 10,000 steps daily for 7 days straight',
        category: 'health_fitness',
        difficulty: 'Medium',
        duration: '7 days',
        participants: 1247,
        reward: 500,
        progress: 65,
        daysLeft: 3,
        icon: '🚶‍♀️',
        tags: ['Popular', 'Trending']
      },
      {
        id: 'challenge2',
        title: 'Mindful Minutes',
        description: 'Meditate for 15 minutes daily this week',
        category: 'mental_wellbeing',
        difficulty: 'Easy',
        duration: '7 days',
        participants: 892,
        reward: 400,
        progress: 0,
        daysLeft: 7,
        icon: '🧘‍♀️',
        tags: ['Beginner Friendly']
      },
      {
        id: 'challenge3',
        title: 'Save Smart Daily',
        description: 'Save ₹100 every day and track your progress',
        category: 'financial_wellbeing',
        difficulty: 'Easy',
        duration: '30 days',
        participants: 567,
        reward: 750,
        progress: 23,
        daysLeft: 23,
        icon: '💰',
        tags: ['Financial Growth']
      },
      {
        id: 'challenge4',
        title: 'Policy Review Quest',
        description: 'Review and update your insurance policies',
        category: 'insurance_engagement',
        difficulty: 'Medium',
        duration: '3 days',
        participants: 234,
        reward: 600,
        progress: 0,
        daysLeft: 3,
        icon: '🛡️',
        tags: ['Important']
      }
    ],
    weekly: [
      {
        id: 'weekly1',
        title: 'Insurance Knowledge Quest',
        description: 'Complete 5 insurance learning modules',
        category: 'insurance_engagement',
        difficulty: 'Medium',
        duration: '1 week',
        participants: 234,
        reward: 1000,
        progress: 0,
        daysLeft: 7,
        icon: '🛡️',
        tags: ['Educational']
      },
      {
        id: 'weekly2',
        title: 'Fitness Champion',
        description: 'Complete 5 workout sessions this week',
        category: 'health_fitness',
        difficulty: 'Hard',
        duration: '1 week',
        participants: 456,
        reward: 1200,
        progress: 0,
        daysLeft: 7,
        icon: '💪',
        tags: ['Intense']
      }
    ],
    monthly: [
      {
        id: 'monthly1',
        title: 'Wellness Transformation',
        description: 'Complete challenges in all your focus areas',
        category: 'all',
        difficulty: 'Expert',
        duration: '30 days',
        participants: 89,
        reward: 5000,
        progress: 0,
        daysLeft: 30,
        icon: '🏆',
        tags: ['Epic Challenge']
      }
    ]
  };

  const joinChallenge = (challengeId) => {
    setJoinedChallenges(prev => [...prev, challengeId]);
  };

  const leaveChallenge = (challengeId) => {
    setJoinedChallenges(prev => prev.filter(id => id !== challengeId));
  };

  // Filter challenges based on user goals
  const getFilteredChallenges = () => {
    let filtered = challenges[activeTab];
    
    // If user has specific goals, prioritize those challenges
    if (userGoals.length > 0 && selectedCategory === 'all') {
      filtered = filtered.filter(c => 
        c.category === 'all' || userGoals.includes(c.category)
      );
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    
    return filtered;
  };

  const filteredChallenges = getFilteredChallenges();

  // Sidebar items - CONSISTENT WITH DASHBOARD
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊', path: '/dashboard' },
    { id: 'community', label: 'Community', icon: '👥', path: '/community' },
    { id: 'challenges', label: 'Challenges', icon: '🎯', path: '/challenges' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', path: '/rewards' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/goal-selection' }
  ];

  const ChallengeCard = ({ challenge }) => {
    const isJoined = joinedChallenges.includes(challenge.id);
    const categoryColor = categories.find(c => c.id === challenge.category)?.color || '#8b5cf6';

    return (
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: isJoined ? '2px solid #10b981' : '1px solid #f3f4f6',
        transition: 'all 0.3s ease'
      }}>
        {/* Challenge Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: `linear-gradient(135deg, ${categoryColor}, #3b82f6)`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {challenge.icon}
            </div>
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0,
                marginBottom: '0.25rem'
              }}>
                {challenge.title}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {challenge.tags?.map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: isJoined ? '#ecfdf5' : '#f3f4f6',
            color: isJoined ? '#047857' : '#6b7280',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            {isJoined ? '✓ Joined' : challenge.difficulty}
          </div>
        </div>

        {/* Challenge Description */}
        <p style={{
          fontSize: '0.95rem',
          color: '#6b7280',
          marginBottom: '1.5rem',
          lineHeight: '1.5'
        }}>
          {challenge.description}
        </p>

        {/* Challenge Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
              {challenge.participants.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Participants</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b' }}>
              {challenge.reward}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Points</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ef4444' }}>
              {challenge.daysLeft}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Days Left</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#8b5cf6' }}>
              {challenge.duration}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Duration</div>
          </div>
        </div>

        {/* Progress Bar for Joined Challenges */}
        {isJoined && challenge.progress !== undefined && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                Your Progress
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#10b981' }}>
                {challenge.progress}%
              </span>
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
                background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                borderRadius: '4px',
                width: `${challenge.progress}%`,
                transition: 'width 1s ease'
              }} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isJoined ? (
            <>
              <button
                onClick={() => leaveChallenge(challenge.id)}
                style={{
                  flex: 1,
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Leave
              </button>
              <button
                style={{
                  flex: 2,
                  background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View Progress
              </button>
            </>
          ) : (
            <button
              onClick={() => joinChallenge(challenge.id)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}
            >
              🚀 Join Challenge
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* CONSISTENT SIDEBAR */}
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
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            🌱
          </div>
          {sidebarOpen && (
            <div>
              <h2 style={{
                fontSize: '1.25rem',
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
                Wellness Dashboard
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1rem 0' }}>
          {sidebarItems.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (item.path) navigate(item.path);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1.5rem',
                margin: '0.25rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: item.id === 'challenges' 
                  ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                  : 'transparent',
                color: item.id === 'challenges' ? 'white' : '#6b7280'
              }}
              onMouseEnter={(e) => {
                if (item.id !== 'challenges') {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (item.id !== 'challenges') {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: item.id === 'challenges' ? '600' : '500'
                }}>
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
          background: '#f9fafb',
          borderRadius: '16px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            {user.avatar}
          </div>
          {sidebarOpen && (
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>
                {user.name}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                Level {user.level} • {user.totalPoints.toLocaleString()} pts
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '-15px',
            width: '30px',
            height: '30px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {sidebarOpen ? '←' : '→'}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header - CONSISTENT WITH DASHBOARD */}
        <header style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #f3f4f6',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>
              🎯 Challenges
            </h1>
            <p style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: 0
            }}>
              Personalized challenges based on your goals
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Notifications */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#f9fafb',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>
                🔔
              </div>
              {notifications > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '20px',
                  height: '20px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {notifications}
                </div>
              )}
            </div>

            {/* Settings */}
            <div 
              onClick={() => navigate('/goal-selection')}
              style={{
                width: '40px',
                height: '40px',
                background: '#f9fafb',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                cursor: 'pointer'
              }}
            >
              ⚙️
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: '2rem' }}>
          {/* User Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'Active Challenges', value: joinedChallenges.length, icon: '🎯', color: '#8b5cf6' },
              { label: 'Total Points', value: user.totalPoints.toLocaleString(), icon: '⭐', color: '#f59e0b' },
              { label: 'Current Streak', value: `${user.streak} days`, icon: '🔥', color: '#ef4444' },
              { label: 'Completed', value: user.completedChallenges, icon: '✅', color: '#10b981' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `${stat.color}15`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  {stat.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: stat.color,
                  margin: '0 0 0.5rem'
                }}>
                  {stat.value}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Show user goals */}
          {userGoals.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #fef7ff, #f0f9ff)',
              borderRadius: '20px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '2px solid #e879f9'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#7c3aed',
                marginBottom: '0.5rem'
              }}>
                🎯 Your Focus Areas
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#6b7280',
                marginBottom: '1rem'
              }}>
                Challenges are personalized based on your selected goals
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {userGoals.map(goal => {
                  const category = categories.find(c => c.id === goal);
                  return category ? (
                    <span
                      key={goal}
                      style={{
                        background: category.color,
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {category.icon} {category.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            background: 'white',
            borderRadius: '16px',
            padding: '0.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            {['daily', 'weekly', 'monthly'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  background: activeTab === tab 
                    ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                    : 'transparent',
                  color: activeTab === tab ? 'white' : '#6b7280',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {tab} Challenges
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: selectedCategory === category.id ? category.color : 'white',
                  color: selectedCategory === category.id ? 'white' : '#6b7280',
                  border: selectedCategory === category.id ? 'none' : '1px solid #e5e7eb',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: selectedCategory === category.id 
                    ? '0 4px 15px rgba(139, 92, 246, 0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Challenges Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>

          {filteredChallenges.length === 0 && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                No challenges found
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                {userGoals.length === 0 
                  ? 'Set your goals to see personalized challenges'
                  : 'Try selecting a different category or time period'
                }
              </p>
              <button
                onClick={() => navigate('/goal-selection')}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {userGoals.length === 0 ? 'Set Your Goals' : 'Update Preferences'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Challenges;