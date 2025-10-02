import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoalSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userData] = useState(location.state?.userData || {});
  const [isAnimating, setIsAnimating] = useState(false);

  // Core YouMatter Categories as per requirements
  const goalCategories = [
    {
      id: 'health_fitness',
      title: 'Health & Fitness',
      icon: '💪',
      color: 'linear-gradient(135deg, #10b981, #3b82f6)',
      description: 'Transform your physical wellness with AI-powered fitness challenges',
      benefits: ['Personalized workout plans', 'Nutrition tracking', 'Activity challenges', 'Health metrics'],
      gamification: 'Fitness streaks, workout badges, community challenges'
    },
    {
      id: 'mental_wellbeing',
      title: 'Mental Wellbeing',
      icon: '🧠',
      color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      description: 'Boost your mental health with mindfulness and stress management',
      benefits: ['Meditation sessions', 'Stress tracking', 'Mood analytics', 'Sleep optimization'],
      gamification: 'Mindfulness streaks, zen badges, meditation challenges'
    },
    {
      id: 'financial_wellbeing',
      title: 'Financial Wellbeing',
      icon: '💰',
      color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      description: 'Secure your financial future with smart money management',
      benefits: ['Budget tracking', 'Investment goals', 'Savings challenges', 'Financial education'],
      gamification: 'Savings streaks, investment badges, financial milestones'
    },
    {
      id: 'insurance_engagement',
      title: 'Insurance Engagement',
      icon: '🛡️',
      color: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      description: 'Optimize your insurance coverage and maximize benefits',
      benefits: ['Policy management', 'Claims assistance', 'Premium optimization', 'Health assessments'],
      gamification: 'Policy completion badges, health score improvements, savings tracking'
    }
  ];

  const steps = [
    {
      title: 'Choose Your Wellness Journey 🎯',
      subtitle: 'Select the areas you want to focus on (you can choose multiple)',
      type: 'selection'
    },
    {
      title: 'Customize Your Experience ⚡',
      subtitle: 'Tell us more about your preferences for each selected area',
      type: 'customization'
    }
  ];

  const detailedPreferences = {
    health_fitness: [
      { id: 'weight_management', title: 'Weight Management', icon: '⚖️' },
      { id: 'strength_training', title: 'Strength Training', icon: '🏋️‍♀️' },
      { id: 'cardio_endurance', title: 'Cardio & Endurance', icon: '🏃‍♀️' },
      { id: 'flexibility', title: 'Flexibility & Mobility', icon: '🤸‍♀️' },
      { id: 'nutrition', title: 'Nutrition & Diet', icon: '🥗' },
      { id: 'sleep_health', title: 'Sleep Optimization', icon: '😴' }
    ],
    mental_wellbeing: [
      { id: 'stress_management', title: 'Stress Management', icon: '🧘‍♀️' },
      { id: 'anxiety_support', title: 'Anxiety Support', icon: '💙' },
      { id: 'mindfulness', title: 'Mindfulness & Meditation', icon: '🕯️' },
      { id: 'productivity', title: 'Focus & Productivity', icon: '🎯' },
      { id: 'emotional_health', title: 'Emotional Wellness', icon: '❤️' },
      { id: 'work_life_balance', title: 'Work-Life Balance', icon: '⚖️' }
    ],
    financial_wellbeing: [
      { id: 'budgeting', title: 'Budget Management', icon: '📊' },
      { id: 'savings_goals', title: 'Savings Goals', icon: '🏦' },
      { id: 'investment_planning', title: 'Investment Planning', icon: '📈' },
      { id: 'debt_management', title: 'Debt Management', icon: '💳' },
      { id: 'emergency_fund', title: 'Emergency Fund', icon: '🛡️' },
      { id: 'retirement_planning', title: 'Retirement Planning', icon: '🌅' }
    ],
    insurance_engagement: [
      { id: 'health_insurance', title: 'Health Insurance', icon: '🏥' },
      { id: 'life_insurance', title: 'Life Insurance', icon: '👨‍👩‍👧‍👦' },
      { id: 'auto_insurance', title: 'Auto Insurance', icon: '🚗' },
      { id: 'home_insurance', title: 'Home Insurance', icon: '🏠' },
      { id: 'policy_optimization', title: 'Policy Optimization', icon: '⚡' },
      { id: 'claims_support', title: 'Claims Support', icon: '📋' }
    ]
  };

  const [detailedSelections, setDetailedSelections] = useState({});

  const toggleGoal = (goalId) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const toggleDetailedSelection = (category, itemId) => {
    setDetailedSelections(prev => ({
      ...prev,
      [category]: prev[category]?.includes(itemId)
        ? prev[category].filter(id => id !== itemId)
        : [...(prev[category] || []), itemId]
    }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Complete onboarding and go to personalized dashboard
      const userPreferences = {
        ...userData,
        selectedGoals,
        detailedPreferences: detailedSelections,
        onboardingComplete: true
      };
      
      // Store in localStorage for demo purposes
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      
      navigate('/dashboard', { state: { userPreferences } });
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(0);
        setIsAnimating(false);
      }, 300);
    } else {
      navigate('/basic-info');
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return selectedGoals.length > 0;
    } else {
      return selectedGoals.every(goal => 
        detailedSelections[goal] && detailedSelections[goal].length > 0
      );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
        `,
        animation: 'float 8s ease-in-out infinite'
      }} />

      {/* Progress Header */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        padding: '1.5rem 5%',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🌱 YouMatter
          </div>
          
          <div style={{
            color: 'white',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            Step {currentStep + 2} of 3
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          maxWidth: '1000px',
          margin: '1rem auto 0',
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #10b981, #3b82f6)',
            borderRadius: '4px',
            width: `${((currentStep + 2) / 3) * 100}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '3rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '32px',
          padding: '3rem',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
          opacity: isAnimating ? 0 : 1,
          transition: 'all 0.3s ease'
        }}>
          {/* Step Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {steps[currentStep].title}
            </h1>
            <p style={{
              fontSize: '1.15rem',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Step Content */}
          {currentStep === 0 ? (
            // Goal Category Selection
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {goalCategories.map(category => (
                <div
                  key={category.id}
                  onClick={() => toggleGoal(category.id)}
                  style={{
                    background: selectedGoals.includes(category.id) 
                      ? category.color 
                      : 'white',
                    color: selectedGoals.includes(category.id) ? 'white' : '#374151',
                    border: selectedGoals.includes(category.id) 
                      ? '3px solid transparent' 
                      : '3px solid #e5e7eb',
                    borderRadius: '24px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedGoals.includes(category.id)) {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.transform = 'translateY(-8px)';
                      e.target.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedGoals.includes(category.id)) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {/* Selection Indicator */}
                  {selectedGoals.includes(category.id) && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: '700'
                    }}>
                      ✓
                    </div>
                  )}

                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    {category.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {category.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    lineHeight: '1.5',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    {category.description}
                  </p>

                  {/* Benefits */}
                  <div style={{
                    background: selectedGoals.includes(category.id) 
                      ? 'rgba(255,255,255,0.1)' 
                      : '#f9fafb',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      opacity: 0.8
                    }}>
                      Key Features:
                    </h4>
                    <ul style={{
                      fontSize: '0.85rem',
                      opacity: 0.8,
                      lineHeight: '1.4',
                      listStyle: 'none',
                      padding: 0
                    }}>
                      {category.benefits.map((benefit, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                          • {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gamification Preview */}
                  <div style={{
                    background: selectedGoals.includes(category.id) 
                      ? 'rgba(255,255,255,0.1)' 
                      : '#fef3c7',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    border: selectedGoals.includes(category.id) 
                      ? '1px solid rgba(255,255,255,0.2)' 
                      : '1px solid #fbbf24'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      opacity: 0.9,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      🎮 <span>{category.gamification}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Detailed Preferences
            <div style={{ marginBottom: '3rem' }}>
              {selectedGoals.map(goalId => {
                const category = goalCategories.find(cat => cat.id === goalId);
                const preferences = detailedPreferences[goalId] || [];
                
                return (
                  <div key={goalId} style={{ marginBottom: '3rem' }}>
                    <div style={{
                      background: category.color,
                      color: 'white',
                      padding: '1.5rem',
                      borderRadius: '20px',
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                        {category.icon}
                      </div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                      }}>
                        {category.title} Preferences
                      </h3>
                      <p style={{ opacity: 0.9 }}>
                        Choose the specific areas you want to focus on
                      </p>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem'
                    }}>
                      {preferences.map(pref => (
                        <div
                          key={pref.id}
                          onClick={() => toggleDetailedSelection(goalId, pref.id)}
                          style={{
                            background: detailedSelections[goalId]?.includes(pref.id) 
                              ? category.color 
                              : 'white',
                            color: detailedSelections[goalId]?.includes(pref.id) ? 'white' : '#374151',
                            border: detailedSelections[goalId]?.includes(pref.id) 
                              ? '2px solid transparent' 
                              : '2px solid #e5e7eb',
                            borderRadius: '16px',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'center',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            if (!detailedSelections[goalId]?.includes(pref.id)) {
                              e.target.style.borderColor = '#8b5cf6';
                              e.target.style.transform = 'translateY(-4px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!detailedSelections[goalId]?.includes(pref.id)) {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                            {pref.icon}
                          </div>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {pref.title}
                          </h4>
                          {detailedSelections[goalId]?.includes(pref.id) && (
                            <div style={{
                              position: 'absolute',
                              top: '0.5rem',
                              right: '0.5rem',
                              background: 'rgba(255,255,255,0.3)',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem'
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={handleBack}
              style={{
                background: 'rgba(107, 114, 128, 0.1)',
                color: '#374151',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ← Back
            </button>

            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index <= currentStep 
                      ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                      : '#e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              style={{
                background: isStepValid() 
                  ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                  : '#f3f4f6',
                color: isStepValid() ? 'white' : '#9ca3af',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isStepValid() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: isStepValid() ? '0 8px 25px rgba(139, 92, 246, 0.3)' : 'none'
              }}
            >
              {currentStep === steps.length - 1 ? 'Complete Setup →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default GoalSelection;