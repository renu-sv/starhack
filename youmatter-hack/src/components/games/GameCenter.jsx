import React, { useState } from 'react';
import { 
  StepCounterGame, 
  NutritionQuizGame, 
  WorkoutChallengeGame 
} from './HealthGames';
import { 
  MeditationBreathingGame, 
  MoodTrackerGame, 
  MemoryBoostGame 
} from './MentalGames';
import { 
  BudgetPlannerGame, 
  InvestmentSimulatorGame 
} from './FinancialGames';

const GameCenter = ({ category, onGameComplete, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);

  const handleGameComplete = (score) => {
    setCompletedGames(prev => [...prev, selectedGame]);
    onGameComplete(selectedGame, score);
    setTimeout(() => {
      setSelectedGame(null);
    }, 2000);
  };

  const gameCategories = {
    health: [
      {
        id: 'step-counter',
        name: 'Virtual Step Counter',
        description: 'Simulate walking to reach your daily step goal',
        emoji: '🚶‍♀️',
        component: StepCounterGame,
        difficulty: 'Easy',
        duration: '5 min'
      },
      {
        id: 'nutrition-quiz',
        name: 'Nutrition Quiz',
        description: 'Test your knowledge about healthy eating',
        emoji: '🍎',
        component: NutritionQuizGame,
        difficulty: 'Medium',
        duration: '3 min'
      },
      {
        id: 'workout-challenge',
        name: 'Quick Workout',
        description: 'Complete a series of exercises',
        emoji: '💪',
        component: WorkoutChallengeGame,
        difficulty: 'Hard',
        duration: '10 min'
      }
    ],
    mental: [
      {
        id: 'breathing-game',
        name: 'Guided Breathing',
        description: 'Follow breathing patterns for relaxation',
        emoji: '🧘‍♀️',
        component: MeditationBreathingGame,
        difficulty: 'Easy',
        duration: '5 min'
      },
      {
        id: 'mood-tracker',
        name: 'Mood Check-in',
        description: 'Track and reflect on your emotions',
        emoji: '🌈',
        component: MoodTrackerGame,
        difficulty: 'Easy',
        duration: '3 min'
      },
      {
        id: 'memory-game',
        name: 'Memory Challenge',
        description: 'Test and improve your memory skills',
        emoji: '🧠',
        component: MemoryBoostGame,
        difficulty: 'Hard',
        duration: '7 min'
      }
    ],
    financial: [
      {
        id: 'budget-planner',
        name: 'Budget Planner',
        description: 'Create and analyze your monthly budget',
        emoji: '💰',
        component: BudgetPlannerGame,
        difficulty: 'Medium',
        duration: '8 min'
      },
      {
        id: 'investment-sim',
        name: 'Investment Simulator',
        description: 'Learn investing through simulation',
        emoji: '📈',
        component: InvestmentSimulatorGame,
        difficulty: 'Hard',
        duration: '10 min'
      }
    ],
    lifestyle: [
      {
        id: 'productivity-timer',
        name: 'Productivity Timer',
        description: 'Pomodoro technique for better focus',
        emoji: '⏰',
        component: () => <div>Coming Soon!</div>,
        difficulty: 'Easy',
        duration: '25 min'
      },
      {
        id: 'habit-builder',
        name: 'Habit Builder',
        description: 'Build and track daily habits',
        emoji: '🔄',
        component: () => <div>Coming Soon!</div>,
        difficulty: 'Medium',
        duration: '5 min'
      }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryTitle = (cat) => {
    const titles = {
      health: '💪 Health & Fitness',
      mental: '🧠 Mental Wellness',
      financial: '💰 Financial Literacy',
      lifestyle: '🌟 Lifestyle & Habits'
    };
    return titles[cat] || 'Games';
  };

  const games = gameCategories[category] || [];

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    const GameComponent = game?.component;
    
    if (GameComponent) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedGame(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: 0,
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              ✕
            </button>
            <GameComponent onComplete={handleGameComplete} />
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f3f4f6',
            color: '#6b7280',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#e5e7eb';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#f3f4f6';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#1f2937'
        }}>
          {getCategoryTitle(category)}
        </h2>
        
        <p style={{
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Choose a game to play and improve your skills
        </p>

        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              style={{
                background: completedGames.includes(game.id) 
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : '#f9fafb',
                border: completedGames.includes(game.id)
                  ? '2px solid #10b981'
                  : '2px solid #e5e7eb',
                borderRadius: '16px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {completedGames.includes(game.id) && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  ✓ Completed
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  lineHeight: 1
                }}>
                  {game.emoji}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>
                    {game.name}
                  </h3>
                  
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    marginBottom: '0.75rem'
                  }}>
                    {game.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: getDifficultyColor(game.difficulty) + '20',
                      color: getDifficultyColor(game.difficulty)
                    }}>
                      {game.difficulty}
                    </span>
                    
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      ⏱️ {game.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {games.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
            <p>No games available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCenter;