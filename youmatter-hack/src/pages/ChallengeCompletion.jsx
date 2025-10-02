import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import Confetti from '../components/animations/Confetti';

const ChallengeCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const challenge = location.state?.challenge;

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  if (!challenge) {
    navigate('/dashboard');
    return null;
  }

  const achievements = [
    { type: 'points', value: challenge.points, icon: '💎' },
    { type: 'xp', value: challenge.xp, icon: '⭐' },
    { type: 'streak', value: '+1', icon: '🔥' }
  ];

  return (
    <div className="screen-container">
      <Confetti show={showConfetti} />
      
      <div className="content-area animate-fadeIn">
        {/* Success Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
          color: 'white',
          padding: '32px',
          borderRadius: '16px',
          marginBottom: '24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', animation: 'bounce 1s ease-in-out' }}>
            🎉
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
            Challenge Complete!
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>
            You completed: {challenge.title}
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '16px', textAlign: 'center' }}>
            🏆 You Earned
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #FFF3E0, #E8F5E8)',
                  padding: '20px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '2px solid #4CAF50',
                  animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                  {achievement.icon}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '4px' }}>
                  +{achievement.value}
                </div>
                <div style={{ fontSize: '12px', color: '#757575', textTransform: 'uppercase' }}>
                  {achievement.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Progress */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>
            🏅 Badge Progress Update
          </h3>
          
          <div style={{
            background: 'linear-gradient(135deg, #E3F2FD, #E8F5E8)',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #4CAF50'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '24px', marginRight: '12px' }}>🧘‍♂️</div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                  Calm Mind Badge
                </h4>
                <p style={{ fontSize: '12px', color: '#757575' }}>
                  Complete mindfulness challenges
                </p>
              </div>
            </div>
            
            <div className="progress-bar" style={{ marginBottom: '8px' }}>
              <div className="progress-fill" style={{ width: '100%' }} />
            </div>
            
            <div style={{ 
              background: '#4CAF50', 
              color: 'white', 
              padding: '8px', 
              borderRadius: '8px', 
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🎉 BADGE UNLOCKED! +50 XP
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px', textAlign: 'center' }}>
            📱 Share Your Achievement
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <button style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📱 WhatsApp
            </button>
            <button style={{
              background: '#E4405F',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📸 Instagram
            </button>
          </div>
          
          <div style={{
            background: '#f9f9f9',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontStyle: 'italic',
            textAlign: 'center',
            border: '1px dashed #e0e0e0'
          }}>
            "Just completed {challenge.title} on YouMatter! 💪 #WellnessJourney"
          </div>
        </div>

        {/* Next Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
          <Button onClick={() => navigate('/predictive-challenges')}>
            🎯 Next Challenge
          </Button>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            🏠 Dashboard
          </Button>
        </div>

        {/* Motivational Quote */}
        <div style={{
          background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '24px'
        }}>
          <p style={{ fontSize: '16px', fontStyle: 'italic', marginBottom: '8px' }}>
            "Small steps = Big results 🌱"
          </p>
          <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Keep up the amazing work!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCompletion;