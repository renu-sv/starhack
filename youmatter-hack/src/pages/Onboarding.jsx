import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setPreferences } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPreferences, setSelectedPreferences] = useState({
    health: [],
    mental: [],
    financial: [],
    lifestyle: []
  });

  const preferenceOptions = {
    health: [
      { id: 'diet', name: 'Diet & Nutrition', icon: '🥗', description: 'Healthy eating habits' },
      { id: 'exercise', name: 'Exercise & Fitness', icon: '💪', description: 'Physical activity & workouts' },
      { id: 'sleep', name: 'Sleep & Recovery', icon: '😴', description: 'Better sleep patterns' },
      { id: 'hydration', name: 'Hydration', icon: '💧', description: 'Daily water intake goals' }
    ],
    mental: [
      { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️', description: 'Mindfulness & meditation practice' },
      { id: 'journaling', name: 'Journaling', icon: '📝', description: 'Daily reflection & writing' },
      { id: 'cbt', name: 'CBT Exercises', icon: '🧠', description: 'Cognitive behavioral techniques' },
      { id: 'mindfulness', name: 'Mindfulness', icon: '🌸', description: 'Present moment awareness' }
    ],
    financial: [
      { id: 'budgeting', name: 'Budgeting', icon: '📊', description: 'Track expenses & create budgets' },
      { id: 'investing', name: 'Investing', icon: '📈', description: 'Learn about investments' },
      { id: 'insurance', name: 'Insurance', icon: '🛡️', description: 'Health & life insurance' },
      { id: 'savings', name: 'Savings Goals', icon: '🏦', description: 'Emergency fund & savings' }
    ],
    lifestyle: [
      { id: 'productivity', name: 'Productivity', icon: '⚡', description: 'Time management & efficiency' },
      { id: 'relationships', name: 'Relationships', icon: '❤️', description: 'Social connections' },
      { id: 'hobbies', name: 'Hobbies & Learning', icon: '🎨', description: 'Creative pursuits' },
      { id: 'environment', name: 'Environment', icon: '🌱', description: 'Sustainable living' }
    ]
  };

  const stepTitles = {
    1: 'Health & Wellness Goals',
    2: 'Mental Wellbeing Focus', 
    3: 'Financial Wellness',
    4: 'Lifestyle & Personal Growth'
  };

  const stepCategories = ['health', 'mental', 'financial', 'lifestyle'];

  const togglePreference = (category, preferenceId) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(preferenceId)
        ? prev[category].filter(id => id !== preferenceId)
        : [...prev[category], preferenceId]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setPreferences(selectedPreferences);
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    setPreferences(selectedPreferences);
    navigate('/dashboard');
  };

  const currentCategory = stepCategories[currentStep - 1];
  const currentOptions = preferenceOptions[currentCategory];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              style={{
                flex: 1,
                height: '4px',
                background: step <= currentStep ? '#667eea' : '#e5e7eb',
                borderRadius: '2px',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            🎯 Personalize Your Journey
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '0.5rem'
          }}>
            {stepTitles[currentStep]}
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            margin: 0
          }}>
            Step {currentStep} of 4 • Select what matters most to you
          </p>
        </div>

        {/* Options Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {currentOptions.map(option => {
            const isSelected = selectedPreferences[currentCategory].includes(option.id);
            
            return (
              <div
                key={option.id}
                onClick={() => togglePreference(currentCategory, option.id)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
                  color: isSelected ? 'white' : '#374151',
                  border: isSelected ? 'none' : '2px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isSelected 
                    ? '0 8px 25px rgba(102, 126, 234, 0.3)' 
                    : '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {option.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>
                  {option.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  textAlign: 'center',
                  margin: 0
                }}>
                  {option.description}
                </p>
                
                {isSelected && (
                  <div style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.5rem 1rem'
            }}
          >
            Skip for now
          </button>

          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{
                  background: 'white',
                  border: '2px solid #667eea',
                  color: '#667eea',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Previous
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={selectedPreferences[currentCategory].length === 0}
              style={{
                background: selectedPreferences[currentCategory].length > 0 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : '#e5e7eb',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: selectedPreferences[currentCategory].length > 0 ? 'pointer' : 'not-allowed',
                opacity: selectedPreferences[currentCategory].length > 0 ? 1 : 0.6
              }}
            >
              {currentStep === 4 ? '🚀 Start Your Journey' : 'Next'}
            </button>
          </div>
        </div>

        {/* Selected Count */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.9rem',
          color: '#6b7280'
        }}>
          {selectedPreferences[currentCategory].length > 0 && (
            `${selectedPreferences[currentCategory].length} selected in ${stepTitles[currentStep]}`
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;