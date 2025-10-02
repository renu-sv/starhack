import React, { useState, useEffect } from 'react';

export const MeditationBreathingGame = ({ onComplete }) => {
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalCycles] = useState(5);

  useEffect(() => {
    if (phase === 'ready') return;

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          switch (phase) {
            case 'inhale':
              setPhase('hold');
              return 4;
            case 'hold':
              setPhase('exhale');
              return 4;
            case 'exhale':
              const newCycle = cycle + 1;
              setCycle(newCycle);
              if (newCycle >= totalCycles) {
                onComplete(100);
                return 0;
              }
              setPhase('inhale');
              return 4;
            default:
              return prev - 1;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, cycle, totalCycles, onComplete]);

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return '#3b82f6';
      case 'hold': return '#8b5cf6';
      case 'exhale': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return '🌬️ Breathe In...';
      case 'hold': return '⏸️ Hold...';
      case 'exhale': return '💨 Breathe Out...';
      default: return '🧘‍♀️ Ready to breathe?';
    }
  };

  if (cycle >= totalCycles) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #3b82f6)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘‍♀️</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Breathing Exercise Complete!</h3>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          You've completed {totalCycles} breathing cycles. Feel the calm! ✨
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${getPhaseColor()}, #ec4899)`,
      borderRadius: '20px',
      padding: '2rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🧘‍♀️ Guided Breathing</h3>
      
      <div style={{
        width: '150px',
        height: '150px',
        margin: '0 auto 1rem',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: phase === 'inhale' ? 'breatheIn 4s ease-in-out' : 
                  phase === 'exhale' ? 'breatheOut 4s ease-in-out' : 'none',
        border: '3px solid rgba(255,255,255,0.5)'
      }}>
        <div style={{
          fontSize: '2rem',
          fontWeight: '700'
        }}>
          {phase === 'ready' ? '🫁' : count}
        </div>
      </div>

      <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        {getInstruction()}
      </h4>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        {Array.from({ length: totalCycles }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: index < cycle ? '#10b981' : 'rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {phase === 'ready' && (
        <button
          onClick={() => setPhase('inhale')}
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#1f2937',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🌟 Start Breathing Exercise
        </button>
      )}

      <style jsx>{`
        @keyframes breatheIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
        @keyframes breatheOut {
          0% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export const MoodTrackerGame = ({ onComplete }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const [step, setStep] = useState('mood'); // mood, reflection, complete

  const moods = [
    { emoji: '😄', name: 'Excellent', value: 5, color: '#10b981' },
    { emoji: '😊', name: 'Good', value: 4, color: '#3b82f6' },
    { emoji: '😐', name: 'Okay', value: 3, color: '#f59e0b' },
    { emoji: '😔', name: 'Low', value: 2, color: '#ef4444' },
    { emoji: '😢', name: 'Very Low', value: 1, color: '#7c2d12' }
  ];

  const reflectionPrompts = [
    "What made you feel this way today?",
    "What's one thing you're grateful for?",
    "How can you improve your mood?",
    "What brought you joy today?"
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setStep('reflection');
  };

  const handleComplete = () => {
    setStep('complete');
    onComplete(100);
  };

  if (step === 'complete') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mood Tracked!</h3>
        <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1rem' }}>
          Thank you for checking in with yourself today.
        </p>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {selectedMood.emoji}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '600' }}>
            Feeling {selectedMood.name}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'reflection') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          💭 Quick Reflection
        </h3>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            {reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]}
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Share your thoughts..."
            style={{
              width: '100%',
              minHeight: '80px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              color: 'white',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setStep('mood')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleComplete}
            style={{
              background: 'rgba(255,255,255,0.9)',
              color: '#1f2937',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Complete ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🌈 How are you feeling?</h3>
      <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem' }}>
        Take a moment to check in with yourself
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        gap: '1rem'
      }}>
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '16px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {mood.emoji}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>
              {mood.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export const MemoryBoostGame = ({ onComplete }) => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('start'); // start, showing, playing, success, fail

  const colors = [
    { id: 0, color: '#ef4444', name: 'Red' },
    { id: 1, color: '#3b82f6', name: 'Blue' },
    { id: 2, color: '#10b981', name: 'Green' },
    { id: 3, color: '#f59e0b', name: 'Yellow' }
  ];

  const startGame = () => {
    const newSequence = Array.from({ length: level + 2 }, () => 
      Math.floor(Math.random() * 4)
    );
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('showing');
    showSequence(newSequence);
  };

  const showSequence = (seq) => {
    setIsShowing(true);
    seq.forEach((colorId, index) => {
      setTimeout(() => {
        // Visual feedback would be implemented here
        if (index === seq.length - 1) {
          setTimeout(() => {
            setIsShowing(false);
            setGameState('playing');
          }, 600);
        }
      }, (index + 1) * 800);
    });
  };

  const handleColorClick = (colorId) => {
    if (gameState !== 'playing') return;

    const newPlayerSequence = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameState('fail');
      onComplete(Math.max(20, level * 15));
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      if (level >= 5) {
        setGameState('success');
        onComplete(100);
      } else {
        setLevel(level + 1);
        setTimeout(() => {
          startGame();
        }, 1000);
      }
    }
  };

  if (gameState === 'success') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #3b82f6)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Memory Master!</h3>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          Excellent! You've completed all {level} levels! 🎉
        </p>
      </div>
    );
  }

  if (gameState === 'fail') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Good Try!</h3>
        <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1rem' }}>
          You reached level {level}. Keep practicing!
        </p>
        <button
          onClick={() => {
            setLevel(1);
            setGameState('start');
          }}
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#1f2937',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🧠 Memory Challenge</h3>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Level {level}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          {gameState === 'start' && 'Remember the sequence!'}
          {gameState === 'showing' && 'Watch carefully...'}
          {gameState === 'playing' && `Repeat the sequence (${playerSequence.length}/${sequence.length})`}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorClick(color.id)}
            disabled={gameState !== 'playing'}
            style={{
              background: color.color,
              border: 'none',
              borderRadius: '12px',
              height: '80px',
              cursor: gameState === 'playing' ? 'pointer' : 'not-allowed',
              opacity: gameState === 'playing' ? 1 : 0.7,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (gameState === 'playing') {
                e.target.style.transform = 'scale(0.95)';
              }
            }}
            onMouseLeave={(e) => {
              if (gameState === 'playing') {
                e.target.style.transform = 'scale(1)';
              }
            }}
          />
        ))}
      </div>

      {gameState === 'start' && (
        <button
          onClick={startGame}
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#1f2937',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🎮 Start Game
        </button>
      )}
    </div>
  );
};