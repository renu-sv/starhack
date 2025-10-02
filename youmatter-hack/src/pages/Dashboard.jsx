import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import BottomNav from '../components/layout/BottomNav';
import { challenges, communityGoals } from '../data/challenges';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Vyshu',
    points: 125,
    xp: 340,
    level: 3,
    streak: 7,
    completedToday: 2
  });

  const [todayChallenges, setTodayChallenges] = useState(challenges.slice(0, 3));
  const [showCelebration, setShowCelebration] = useState(false);

  const completeChallenge = (challengeId) => {
    setTodayChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      )
    );

    setUser(prev => ({
      ...prev,
      points: prev.points + 10,
      xp: prev.xp + 25,
      completedToday: prev.completedToday + 1
    }));

    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  return (
    <div className="screen-container">
      <div className="content-area animate-fadeIn" style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Hello, {user.name}! 👋
          </h1>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>
            Ready to boost your wellness score today?
          </p>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-item">
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                {user.points}
              </div>
              <div style={{ fontSize: '12px', color: '#757575' }}>Points</div>
            </div>
            <div className="stat-item">
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                {user.streak} 🔥
              </div>
              <div style={{ fontSize: '12px', color: '#757575' }}>Day Streak</div>
            </div>
            <div className="stat-item">
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                Lv.{user.level}
              </div>
              <div style={{ fontSize: '12px', color: '#757575' }}>Level</div>
            </div>
          </div>
        </div>

        {/* Community Progress */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            🌍 Community Progress
          </h3>
          <div style={{ 
            background: 'linear-gradient(135deg, #E3F2FD, #E8F5E8)', 
            padding: '16px', 
            borderRadius: '8px' 
          }}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>
              Together, we've completed <strong>{communityGoals[0].currentProgress.toLocaleString()}</strong> steps today! 🚶‍♀️
            </p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(communityGoals[0].currentProgress / communityGoals[0].target) * 100}%` }} 
              />
            </div>
            <p style={{ fontSize: '12px', color: '#757575', marginTop: '4px' }}>
              {communityGoals[0].participants} people participating
            </p>
          </div>
        </div>

        {/* Daily Challenges */}
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            🎯 Today's Challenges
            <span style={{ 
              marginLeft: '8px', 
              background: '#E91E63', 
              color: 'white', 
              fontSize: '10px', 
              padding: '2px 6px', 
              borderRadius: '8px' 
            }}>
              {todayChallenges.filter(c => !c.completed).length} Active
            </span>
          </h3>

          {todayChallenges.map(challenge => (
            <div key={challenge.id} className="challenge-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                    {challenge.icon} {challenge.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#757575', marginBottom: '8px' }}>
                    {challenge.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ 
                      background: '#4CAF50', 
                      color: 'white', 
                      fontSize: '12px', 
                      padding: '2px 6px', 
                      borderRadius: '8px' 
                    }}>
                      +{challenge.points} pts
                    </span>
                    <span style={{ fontSize: '12px', color: '#757575' }}>
                      {challenge.estimatedTime}
                    </span>
                  </div>
                </div>

                <button
                  style={{
                    background: challenge.completed ? '#4CAF50' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: challenge.completed ? 'not-allowed' : 'pointer',
                    marginLeft: '16px'
                  }}
                  onClick={() => !challenge.completed && completeChallenge(challenge.id)}
                  disabled={challenge.completed}
                >
                  {challenge.completed ? '✅ Done' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            🤖 Suggested for You
          </h3>
          <div style={{
            background: 'linear-gradient(135deg, #FFF3E0, #E8F5E8)',
            padding: '16px',
            borderRadius: '8px',
            border: '2px dashed #FF9800'
          }}>
            <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>
              🧘‍♀️ 10-min Mindful Breathing
            </h4>
            <p style={{ fontSize: '12px', color: '#757575', marginBottom: '8px' }}>
              Perfect for your stress level today
            </p>
            <Button onClick={() => navigate('/predictive-challenges')}>
              Start Challenge
            </Button>
          </div>
        </div>

        {/* Doctor's Tips */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            👩‍⚕️ Dr. Meera's Tip
          </h3>
          <div style={{
            background: '#E3F2FD',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>
              "Sleep 7-8 hours tonight for better recovery 😴"
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#2196F3', fontWeight: '600' }}>
                +5 points
              </span>
              <button style={{
                background: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                Follow Tip
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>⚡ Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <Button onClick={() => navigate('/predictive-challenges')}>
              🎯 More Challenges
            </Button>
            <Button variant="secondary" onClick={() => navigate('/community')}>
              👥 Join Community
            </Button>
          </div>
        </div>
      </div>

      {/* Celebration Effect */}
      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#4CAF50',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          zIndex: 1000,
          animation: 'fadeIn 0.5s ease-out'
        }}>
          🎉 Challenge Complete! +10 pts
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Dashboard;