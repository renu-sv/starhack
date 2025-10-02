import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicInfo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    activityLevel: '',
    healthConditions: []
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Simplified to just 3 steps
  const steps = [
    {
      title: "Let's get to know you! 👋",
      subtitle: "We'll create a personalized wellness journey just for you",
      fields: ['name', 'age']
    },
    {
      title: "How active are you currently? 🏃‍♀️",
      subtitle: "We'll match challenges to your fitness level",
      fields: ['activityLevel']
    },
    {
      title: "Any health considerations? 🏥",
      subtitle: "Help us create safe, effective challenges for you",
      fields: ['healthConditions']
    }
  ];

  const activityLevels = [
    { id: 'beginner', icon: '🌱', title: 'Just Starting', desc: 'New to wellness routines' },
    { id: 'moderate', icon: '🚶‍♀️', title: 'Moderately Active', desc: 'Some regular activity' },
    { id: 'active', icon: '🏃‍♀️', title: 'Very Active', desc: 'Regular exercise routine' },
    { id: 'athlete', icon: '🏆', title: 'Athletic', desc: 'Intense training regimen' }
  ];

  const healthConditions = [
    { id: 'none', title: 'No health conditions', icon: '✅' },
    { id: 'diabetes', title: 'Diabetes', icon: '🩺' },
    { id: 'hypertension', title: 'High Blood Pressure', icon: '💓' },
    { id: 'arthritis', title: 'Joint Issues', icon: '🦴' },
    { id: 'anxiety', title: 'Anxiety/Stress', icon: '🧠' },
    { id: 'other', title: 'Other conditions', icon: '📋' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Complete basic info and go to goal selection
      navigate('/goal-selection', { state: { userData: formData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    } else {
      navigate('/');
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (Array.isArray(formData[field])) {
        return formData[field].length > 0;
      }
      return formData[field] && formData[field].trim() !== '';
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem'
              }}>
                What's your name? ✨
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem'
              }}>
                How old are you? 🎂
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
                min="13"
                max="100"
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Quick Preview
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '2px solid #0ea5e9',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#0c4a6e',
                marginBottom: '0.5rem'
              }}>
                Quick & Simple Setup
              </h4>
              <p style={{
                fontSize: '0.9rem',
                color: '#0369a1',
                margin: 0
              }}>
                Just 2 more steps and you'll have a personalized wellness plan!
              </p>
            </div> */}
          </div>
        );

      case 1:
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {activityLevels.map(level => (
              <div
                key={level.id}
                onClick={() => updateFormData('activityLevel', level.id)}
                style={{
                  background: formData.activityLevel === level.id 
                    ? 'linear-gradient(135deg, #10b981, #3b82f6)' 
                    : 'white',
                  color: formData.activityLevel === level.id ? 'white' : '#374151',
                  border: formData.activityLevel === level.id 
                    ? '2px solid #10b981' 
                    : '2px solid #e5e7eb',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (formData.activityLevel !== level.id) {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.activityLevel !== level.id) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {level.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {level.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  opacity: 0.8
                }}>
                  {level.desc}
                </p>
                {formData.activityLevel === level.id && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Select all that apply (this helps us create safe challenges for you)
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {healthConditions.map(condition => (
                <div
                  key={condition.id}
                  onClick={() => toggleArrayField('healthConditions', condition.id)}
                  style={{
                    background: formData.healthConditions.includes(condition.id) 
                      ? 'linear-gradient(135deg, #f59e0b, #ef4444)' 
                      : 'white',
                    color: formData.healthConditions.includes(condition.id) ? 'white' : '#374151',
                    border: formData.healthConditions.includes(condition.id) 
                      ? '2px solid #f59e0b' 
                      : '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!formData.healthConditions.includes(condition.id)) {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!formData.healthConditions.includes(condition.id)) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>
                    {condition.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      {condition.title}
                    </h4>
                  </div>
                  {formData.healthConditions.includes(condition.id) && (
                    <div style={{
                      marginLeft: 'auto',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem'
                    }}>
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Completion Preview */}
            <div style={{
              marginTop: '2rem',
              background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '2px solid #10b981',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#065f46',
                marginBottom: '0.5rem'
              }}>
                Almost Ready!
              </h4>
              <p style={{
                fontSize: '0.9rem',
                color: '#047857',
                margin: 0
              }}>
                Next, we'll help you choose your wellness focus areas
              </p>
            </div>
          </div>
        );

      default:
        return null;
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
          maxWidth: '800px',
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
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          maxWidth: '800px',
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
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
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
          <div style={{ marginBottom: '3rem' }}>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={handleBack}
              style={{
                background: currentStep === 0 ? '#f3f4f6' : 'rgba(107, 114, 128, 0.1)',
                color: currentStep === 0 ? '#9ca3af' : '#374151',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ← {currentStep === 0 ? 'Home' : 'Back'}
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
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: isStepValid() ? '0 8px 25px rgba(139, 92, 246, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (isStepValid()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (isStepValid()) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
                }
              }}
            >
              {currentStep === steps.length - 1 ? 'Continue to Goals' : 'Continue'} →
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div style={{
          marginTop: '2rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '1.5rem',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            color: 'white',
            fontSize: '2rem',
            marginBottom: '0.5rem'
          }}>
            ⚡
          </div>
          <h3 style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Quick Setup in Progress
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.95rem'
          }}>
            We're building your personalized wellness journey step by step
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </div>
  );


};

export default BasicInfo;