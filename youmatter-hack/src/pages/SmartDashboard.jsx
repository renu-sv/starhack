import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Import game components
import GameCenter from '../components/games/GameCenter';

const SmartDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  
  // NEW: Game Center state
  const [showGameCenter, setShowGameCenter] = useState(false);
  const [selectedGameCategory, setSelectedGameCategory] = useState(null);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 12,
    totalScore: 1580,
    streakDays: 5,
    favoriteCategory: 'health'
  });
  
  // Get user preferences from goal selection - KEEPING YOUR WORKING LOGIC
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

  // KEEPING YOUR WORKING PERSONALIZATION LOGIC
  const getPersonalizedProgress = () => {
    const selectedGoals = userPreferences.selectedGoals || [];
    const detailedPrefs = userPreferences.detailedPreferences || {};
    
    let progress = {};
    
    // Add challenges based on selected goals
    if (selectedGoals.includes('health_fitness')) {
      progress.steps = { current: 7234, target: 10000, points: 15 };
      progress.workout = { current: 45, target: 60, points: 30 };
      
      // Add specific fitness preferences
      if (detailedPrefs.health_fitness?.includes('weight_management')) {
        progress.calories = { current: 1800, target: 2000, points: 20 };
      }
      if (detailedPrefs.health_fitness?.includes('hydration')) {
        progress.water = { current: 6, target: 8, points: 10 };
      }
    }
    
    if (selectedGoals.includes('mental_wellbeing')) {
      progress.meditation = { current: 15, target: 20, points: 20 };
      
      if (detailedPrefs.mental_wellbeing?.includes('stress_management')) {
        progress.breathing = { current: 2, target: 3, points: 15 };
      }
      if (detailedPrefs.mental_wellbeing?.includes('sleep_optimization')) {
        progress.sleep_hours = { current: 7.2, target: 8, points: 25 };
      }
    }
    
    if (selectedGoals.includes('financial_wellbeing')) {
      progress.savings = { current: 1500, target: 2000, points: 40 };
      
      if (detailedPrefs.financial_wellbeing?.includes('budget_tracking')) {
        progress.budget_check = { current: 0, target: 1, points: 30 };
      }
    }
    
    if (selectedGoals.includes('insurance_engagement')) {
      progress.insurance_check = { current: 0, target: 1, points: 25 };
      
      if (detailedPrefs.insurance_engagement?.includes('policy_review')) {
        progress.policy_review = { current: 0, target: 1, points: 35 };
      }
    }
    
    return progress;
  };

  const [todayProgress] = useState(getPersonalizedProgress());

  // KEEPING YOUR WORKING AI RECOMMENDATIONS LOGIC
  const getPersonalizedRecommendations = () => {
    const selectedGoals = userPreferences.selectedGoals || [];
    const recommendations = [];
    
    if (selectedGoals.includes('mental_wellbeing')) {
      recommendations.push({
        title: '🧘‍♀️ 7-minute Breathing Session',
        description: 'Your stress indicators suggest high cortisol levels today',
        benefit: 'Reduce stress by 23%',
        duration: '7 min',
        action: () => navigate('/predictive-challenges')
      });
    }
    
    if (selectedGoals.includes('health_fitness')) {
      recommendations.push({
        title: '🚶‍♀️ Evening Walk Challenge',
        description: 'You\'re 2,766 steps away from your daily goal',
        benefit: 'Complete daily goal',
        duration: '25 min',
        action: () => navigate('/predictive-challenges')
      });
    }
    
    if (selectedGoals.includes('financial_wellbeing')) {
      recommendations.push({
        title: '💰 Weekly Budget Review',
        description: 'Review your spending patterns this week',
        benefit: 'Save 15% more',
        duration: '10 min',
        action: () => navigate('/predictive-challenges')
      });
    }
    
    if (selectedGoals.includes('insurance_engagement')) {
      recommendations.push({
        title: '🛡️ Insurance Health Check',
        description: 'Review your coverage and update beneficiaries',
        benefit: 'Optimize coverage',
        duration: '15 min',
        action: () => navigate('/predictive-challenges')
      });
    }
    
    return recommendations.slice(0, 2); // Show top 2 recommendations
  };

  const [aiRecommendations] = useState(getPersonalizedRecommendations());

  // NEW: Get personalized games based on user's selected goals
  const getPersonalizedGames = () => {
    const selectedGoals = userPreferences.selectedGoals || [];
    const games = [];
    
    // Health & Fitness games
    if (selectedGoals.includes('health_fitness')) {
      games.push({
        category: 'health',
        title: 'Health & Fitness Games',
        icon: '💪',
        color: 'linear-gradient(135deg, #10b981, #3b82f6)',
        games: ['Step Counter Challenge', 'Nutrition Quiz', 'Workout Challenge'],
        description: 'Boost your physical wellness with fun challenges',
        points: '+50 pts/game'
      });
    }
    
    // Mental Wellness games
    if (selectedGoals.includes('mental_wellbeing')) {
      games.push({
        category: 'mental',
        title: 'Mental Wellness Games',
        icon: '🧘‍♀️',
        color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        games: ['Meditation Breathing', 'Mood Tracker', 'Memory Boost'],
        description: 'Enhance your mental clarity and mindfulness',
        points: '+40 pts/game'
      });
    }
    
    // Financial Wellness games
    if (selectedGoals.includes('financial_wellbeing')) {
      games.push({
        category: 'financial',
        title: 'Financial Wellness Games',
        icon: '💰',
        color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        games: ['Budget Planner', 'Investment Simulator', 'Savings Challenge'],
        description: 'Master your money management skills',
        points: '+60 pts/game'
      });
    }
    
    // Insurance Engagement games (map to lifestyle)
    if (selectedGoals.includes('insurance_engagement')) {
      games.push({
        category: 'lifestyle',
        title: 'Insurance & Lifestyle Games',
        icon: '🛡️',
        color: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        games: ['Policy Optimizer', 'Risk Assessment', 'Coverage Calculator'],
        description: 'Optimize your insurance and lifestyle choices',
        points: '+55 pts/game'
      });
    }
    
    return games;
  };

  const personalizedGames = getPersonalizedGames();

  // Handle game completion
  const handleGameComplete = (gameId, score, category) => {
    console.log(`Game ${gameId} completed with score ${score} in category ${category}`);
    
    // Update game stats
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + score
    }));
    
    // Close game center
    setShowGameCenter(false);
    setSelectedGameCategory(null);
    
    // Show success notification
    setNotifications(prev => prev + 1);
  };

  // KEEPING YOUR WORKING WELCOME MESSAGE LOGIC
  const getWelcomeMessage = () => {
    const selectedGoals = userPreferences.selectedGoals || [];
    const goalNames = {
      'health_fitness': 'fitness',
      'mental_wellbeing': 'mental wellness',
      'financial_wellbeing': 'financial health',
      'insurance_engagement': 'insurance optimization'
    };
    
    if (selectedGoals.length > 0) {
      const primaryGoal = goalNames[selectedGoals[0]] || 'wellness';
      return `Your ${primaryGoal} score increased by 5 points this week. You're crushing your goals! 🚀`;
    }
    
    return "Your wellness score increased by 5 points this week. You're crushing your goals! 🚀";
  };

  const completedChallenges = Object.values(todayProgress).filter(
    progress => progress.current >= progress.target
  ).length;

  const totalChallenges = Object.keys(todayProgress).length;

  // KEEPING YOUR WORKING DISPLAY FUNCTIONS
  const getChallengeDisplayName = (key) => {
    const names = {
      steps: 'Daily Steps',
      water: 'Water Intake',
      meditation: 'Meditation Minutes',
      workout: 'Workout Time',
      savings: 'Savings Goal',
      insurance_check: 'Insurance Review',
      breathing: 'Breathing Exercises',
      sleep_hours: 'Sleep Quality',
      calories: 'Calorie Tracking',
      budget_check: 'Budget Review',
      policy_review: 'Policy Review'
    };
    return names[key] || key.replace('_', ' ');
  };

  const getChallengeIcon = (key) => {
    const icons = {
      steps: '🚶‍♀️',
      water: '💧',
      meditation: '🧘‍♀️',
      workout: '💪',
      savings: '💰',
      insurance_check: '🛡️',
      breathing: '🫁',
      sleep_hours: '😴',
      calories: '🍎',
      budget_check: '📊',
      policy_review: '📋'
    };
    return icons[key] || '🎯';
  };

  // UPDATED: New sidebar items as requested
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊', path: '/dashboard' },
    { id: 'community', label: 'Community', icon: '👥', path: '/community' },
    { id: 'challenges', label: 'Challenges', icon: '🎯', path: '/challenges' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', path: '/rewards' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/goal-selection' }
  ];

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
                setActiveTab(item.id);
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
                background: activeTab === item.id ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'transparent',
                color: activeTab === item.id ? 'white' : '#6b7280'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: activeTab === item.id ? '600' : '500'
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

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header */}
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
              Smart Dashboard
            </h1>
            <p style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: 0
            }}>
              Track your wellness journey with AI insights
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Notifications */}
            <div style={{
              position: 'relative',
              cursor: 'pointer'
            }}>
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

        {/* Dashboard Content */}
        <main style={{ padding: '2rem' }}>
          {/* Personalized Welcome Hero */}
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
                  {getWelcomeMessage()}
                </p>
                
                {/* Show user's selected goals */}
                {userPreferences.selectedGoals && userPreferences.selectedGoals.length > 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                      Your Focus Areas:
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {userPreferences.selectedGoals.map(goal => (
                        <span key={goal} style={{
                          background: 'rgba(255,255,255,0.2)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          textTransform: 'capitalize'
                        }}>
                          {goal.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quick Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🔥</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{user.streak}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Day Streak</div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{completedChallenges}/{totalChallenges}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Completed</div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎮</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{gameStats.gamesPlayed}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Games Played</div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⭐</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Lv.{user.level}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Level</div>
                  </div>
                </div>
              </div>
              
              {/* Progress Ring */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    from 0deg,
                    rgba(255,255,255,0.3) 0deg,
                    rgba(255,255,255,0.9) ${(user.xp / user.nextLevelXP) * 360}deg,
                    rgba(255,255,255,0.1) ${(user.xp / user.nextLevelXP) * 360}deg
                  )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📈</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      {Math.round((user.xp / user.nextLevelXP) * 100)}%
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { title: 'Health Score', value: user.healthScore, icon: '💚', color: '#10b981' },
              { title: 'Wellness Score', value: user.wellnessScore, icon: '🧘‍♀️', color: '#8b5cf6' },
              { title: 'Wealth Score', value: user.wealthScore, icon: '💰', color: '#f59e0b' },
              { title: 'Sleep Quality', value: user.sleepQuality, icon: '😴', color: '#3b82f6' }
            ].map(stat => (
              <div
                key={stat.title}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  textAlign: 'center'
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
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: stat.color,
                  margin: '0 0 0.5rem'
                }}>
                  {stat.value}{stat.title === 'Sleep Quality' ? '/10' : '%'}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          {/* NEW: Personalized Games Section */}
          {personalizedGames.length > 0 && (
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
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>
                    🎮 Your Personalized Wellness Games
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Interactive games based on your goals
                  </p>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  🏆 {gameStats.totalScore} pts earned
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {personalizedGames.map((gameCategory, index) => (
                  <div
                    key={gameCategory.category}
                    style={{
                      background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      border: '2px solid #f1f5f9',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => {
                      setSelectedGameCategory(gameCategory.category);
                      setShowGameCenter(true);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                      e.currentTarget.style.borderColor = '#8b5cf6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#f1f5f9';
                    }}
                  >
                    {/* Background Gradient */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: gameCategory.color
                    }} />
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: gameCategory.color,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        {gameCategory.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {gameCategory.title}
                        </h4>
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#6b7280',
                          margin: 0
                        }}>
                          {gameCategory.description}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        {gameCategory.games.length} games available
                      </div>
                      <div style={{
                        background: gameCategory.color,
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {gameCategory.points}
                      </div>
                    </div>

                    <button style={{
                      width: '100%',
                      background: gameCategory.color,
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      🎮 Play Games
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Left Column */}
            <div>
              {/* Personalized Today's Challenges */}
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
                    🎯 Your Personalized Challenges
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

                {Object.keys(todayProgress).length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#6b7280'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      No challenges yet!
                    </h4>
                    <p style={{ marginBottom: '1.5rem' }}>
                      Complete your goal selection to get personalized challenges.
                    </p>
                    <button
                      onClick={() => navigate('/goal-selection')}
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Set Your Goals
                    </button>
                  </div>
                ) : (
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
                              {getChallengeIcon(key)}
                            </span>
                            <span style={{
                              fontWeight: '600',
                              color: '#374151'
                            }}>
                              {getChallengeDisplayName(key)}
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
                              {key.includes('hours') ? ' hrs' : key === 'water' ? ' glasses' : ''}
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
                )}
              </div>

              {/* Personalized AI Recommendations */}
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
                      Personalized recommendations based on your goals
                    </p>
                  </div>
                </div>

                {aiRecommendations.length === 0 ? (
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                      Complete your goal selection to get AI-powered recommendations!
                    </p>
                    <button
                      onClick={() => navigate('/goal-selection')}
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Set Goals Now
                    </button>
                  </div>
                ) : (
                  aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: index < aiRecommendations.length - 1 ? '1rem' : 0
                      }}
                    >
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>
                        {rec.title}
                      </h4>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        marginBottom: '1rem'
                      }}>
                        {rec.description}
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
                            📈 {rec.benefit}
                          </span>
                          <span style={{ color: '#6b7280' }}>
                            ⏱️ {rec.duration}
                          </span>
                        </div>
                        <button
                          onClick={rec.action}
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Start Now
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column - Achievements & Leaderboard */}
            <div>
              {/* Recent Achievements */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  🏆 Recent Achievements
                </h3>
                
                {[
                  { name: '3-Day Streak', icon: '🔥', description: 'Completed challenges for 3 days', date: '2 days ago' },
                  { name: 'Health Explorer', icon: '🏥', description: 'Completed 5 health challenges', date: '1 week ago' },
                  { name: 'Game Master', icon: '🎮', description: 'Played 10 wellness games', date: '2 weeks ago' }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      marginBottom: index < 2 ? '0.75rem' : 0
                    }}
                  >
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
                      {achievement.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 0.25rem'
                      }}>
                        {achievement.name}
                      </h4>
                      <p style={{
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {achievement.description}
                      </p>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af'
                    }}>
                      {achievement.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Community Leaderboard */}
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
                  marginBottom: '1rem'
                }}>
                  🏅 Weekly Leaderboard
                </h3>
                
                {[
                  { name: 'Sarah Chen', points: 2850, avatar: '👩‍🦱', rank: 1 },
                  { name: 'Mike Johnson', points: 2720, avatar: '👨‍💼', rank: 2 },
                  { name: 'You', points: user.totalPoints, avatar: user.avatar, rank: 3, isUser: true },
                  { name: 'Emma Davis', points: 2480, avatar: '👩‍💻', rank: 4 },
                  { name: 'Alex Kumar', points: 2350, avatar: '👨‍🎓', rank: 5 }
                ].map((person, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      background: person.isUser ? 'linear-gradient(135deg, #8b5cf615, #3b82f615)' : '#f9fafb',
                      borderRadius: '12px',
                      marginBottom: index < 4 ? '0.75rem' : 0,
                      border: person.isUser ? '2px solid #8b5cf6' : 'none'
                    }}
                  >
                    <div style={{
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: person.rank <= 3 ? '#f59e0b' : '#6b7280'
                    }}>
                      #{person.rank}
                    </div>
                    <div style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem'
                    }}>
                      {person.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: person.isUser ? '700' : '600',
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {person.name}
                      </h4>
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#8b5cf6'
                    }}>
                      {person.points.toLocaleString()} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Game Center Modal */}
      {showGameCenter && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <GameCenter
            category={selectedGameCategory}
            onGameComplete={handleGameComplete}
            onClose={() => {
              setShowGameCenter(false);
              setSelectedGameCategory(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SmartDashboard;