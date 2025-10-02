import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { challenges } from '../data/challenges';

const PredictiveChallenges = () => {
  const navigate = useNavigate();
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const aiSuggestions = [
    {
      ...challenges[1], // Breathing exercise
      aiReason: "Based on your stress levels today",
      confidence: 95,
      personalizedTitle: "🧘‍♀️ Personalized Breathing Session"
    },
    {
      ...challenges[3], // Mindful eating
      aiReason: "Perfect timing for your lunch break",
      confidence: 87,
      personalizedTitle: "🥗 Mindful Lunch Experience"
    },
    {
      ...challenges[0], // Walk
      aiReason: "Weather is perfect outside today",
      confidence: 92,
      personalizedTitle: "🌤️ Sunshine Walk Challenge"
    }
  ];

  const startChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setTimeout(() => {
      navigate('/challenge-completion', { state: { challenge } });
    }, 1000);
  };

  return (
    <div className="screen-container">
      <div className="content-area animate-fadeIn">
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #9C27B0 0%, #3F51B5 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            🤖 AI Recommendations
          </h1>
          <p style={{ opacity: 0.9 }}>
            Personalized challenges just for you
          </p>
        </div>

        {/* Main AI Suggestion */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #FFF3E0, #E8F5E8)',
          border: '2px solid #FF9800',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{
              background: '#FF9800',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              marginRight: '12px'
            }}>
              🎯 TOP PICK
            </div>
            <div style={{ fontSize: '12px', color: '#4CAF50', fontWeight: '600' }}>
              {aiSuggestions[0].confidence}% Match
            </div>
          </div>

          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
            {aiSuggestions[0].personalizedTitle}
          </h3>
          <p style={{ fontSize: '14px', color: '#757575', marginBottom: '12px' }}>
            {aiSuggestions[0].description}
          </p>

          <div style={{
            background: 'rgba(255, 152, 0, 0.1)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '12px', color: '#FF9800', fontWeight: '600', marginBottom: '4px' }}>
              🤖 AI Insight:
            </div>
            <p style={{ fontSize: '12px', color: '#757575' }}>
              {aiSuggestions[0].aiReason}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{
              background: '#4CAF50',
              color: 'white',
              fontSize: '12px',
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              +{aiSuggestions[0].points} pts
            </span>
            <span style={{ fontSize: '12px', color: '#757575' }}>
              {aiSuggestions[0].estimatedTime}
            </span>
            <span style={{ fontSize: '12px', color: '#757575' }}>
              {aiSuggestions[0].difficulty}
            </span>
          </div>

          <Button onClick={() => startChallenge(aiSuggestions[0])}>
            🚀 Start Challenge
          </Button>
        </div>

        {/* Other Suggestions */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>
            🎲 More Personalized Options
          </h3>

          {aiSuggestions.slice(1).map((suggestion, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>
                    {suggestion.personalizedTitle}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#757575', marginBottom: '8px' }}>
                    {suggestion.description}
                  </p>
                  
                  <div style={{ fontSize: '11px', color: '#9C27B0', fontWeight: '600' }}>
                    💡 {suggestion.aiReason}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#4CAF50', fontWeight: '600' }}>
                      +{suggestion.points} pts
                    </span>
                    <span style={{ fontSize: '11px', color: '#757575' }}>
                      {suggestion.estimatedTime}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => startChallenge(suggestion)}
                  style={{
                    background: '#9C27B0',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginLeft: '16px'
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Badge Preview */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>
            🏅 Badge Progress Preview
          </h3>
          <div style={{
            background: 'linear-gradient(135deg, #E3F2FD, #E8F5E8)',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>
                  🧘‍♂️ Calm Mind Badge
                </h4>
                <p style={{ fontSize: '12px', color: '#757575' }}>
                  Complete 1 more mindful challenge
                </p>
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4CAF50, #2196F3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px'
              }}>
                🧘‍♂️
              </div>
            </div>
            
            <div style={{ marginTop: '12px' }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '66%' }} />
              </div>
              <p style={{ fontSize: '11px', color: '#757575', marginTop: '4px' }}>
                2/3 challenges completed
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '24px' }}>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Challenge Starting Effect */}
      {selectedChallenge && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '24px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Starting Challenge...</h3>
          <p style={{ color: '#757575' }}>{selectedChallenge.title}</p>
        </div>
      )}
    </div>
  );
};

export default PredictiveChallenges;