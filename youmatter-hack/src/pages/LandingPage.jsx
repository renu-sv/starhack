import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Challenges',
      description: 'AI-powered wellness tasks tailored just for you'
    },
    {
      icon: '🏆',
      title: 'Smart Rewards',
      description: 'Earn points and unlock exclusive health benefits'
    },
    {
      icon: '👥',
      title: 'Community Power',
      description: 'Join thousands on their wellness transformation'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '2M+', label: 'Challenges Completed' },
    { number: '₹1.2Cr', label: 'Insurance Savings' },
    { number: '95%', label: 'Success Rate' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
        `,
        animation: 'float 8s ease-in-out infinite'
      }} />

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 5%',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🌱 YouMatter
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#features" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            opacity: 0.9,
            transition: 'opacity 0.3s ease'
          }}>Features</a>
          <a href="#community" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            opacity: 0.9,
            transition: 'opacity 0.3s ease'
          }}>Community</a>
          <button
            onClick={() => navigate('/basic-info')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '3rem 5%',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '4rem',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Left Content */}
        <div style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s ease'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Transform Your Life,<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFE53B 0%, #FF2525 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              One Step at a Time
            </span>
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.6',
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            Join 50,000+ people using AI-powered wellness challenges to improve their health, 
            wealth, and happiness. Start your transformation today.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <button
              onClick={() => navigate('/basic-info')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
              }}
            >
              🚀 Start Free Journey
            </button>

            <button
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📱 Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#FFD700', fontSize: '1.2rem' }}>⭐</span>
              ))}
            </div>
            <span>4.9/5 from 12,000+ reviews</span>
          </div>
        </div>

        {/* Right - Interactive Wellness Illustration */}
        <div style={{
          position: 'relative',
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s ease 0.3s'
        }}>
          {/* Main Wellness Heart */}
          <div style={{
            width: '500px',
            height: '500px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255,255,255,0.2)',
            position: 'relative',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'heartbeat 3s ease-in-out infinite'
          }}>
            {/* Wellness Icons */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'rotate 20s linear infinite'
            }}>
              {/* Cycling */}
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '3rem',
                animation: 'bounce 2s ease-in-out infinite'
              }}>
                🚴‍♀️
              </div>
              
              {/* Meditation */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '10%',
                transform: 'translateY(-50%)',
                fontSize: '3rem',
                animation: 'bounce 2s ease-in-out infinite 0.5s'
              }}>
                🧘‍♀️
              </div>
              
              {/* Running */}
              <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '3rem',
                animation: 'bounce 2s ease-in-out infinite 1s'
              }}>
                🏃‍♀️
              </div>
              
              {/* Nutrition */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
                fontSize: '3rem',
                animation: 'bounce 2s ease-in-out infinite 1.5s'
              }}>
                🥗
              </div>
            </div>

            {/* Center Content */}
            <div style={{
              textAlign: 'center',
              color: 'white',
              zIndex: 2
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                💚
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Wellness Journey
              </h3>
              <p style={{
                fontSize: '1rem',
                opacity: 0.9
              }}>
                Your path to better health
              </p>
            </div>

            {/* Floating Elements */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              padding: '1rem',
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <span style={{ fontSize: '2rem' }}>⏰</span>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              padding: '1rem',
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite 1s'
            }}>
              <span style={{ fontSize: '2rem' }}>🎯</span>
            </div>
          </div>

          {/* Orbiting Success Metrics */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            pointerEvents: 'none'
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '120px',
                  height: '80px',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transform: `
                    translate(-50%, -50%) 
                    rotate(${index * 90}deg) 
                    translateY(-250px) 
                    rotate(-${index * 90}deg)
                  `,
                  animation: `orbit 12s linear infinite ${index * 3}s`
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '0.25rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#666',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Preview */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        padding: '3rem 5%',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '3rem'
          }}>
            ✨ What awaits you
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: index === currentFeature ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '2rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.5s ease',
                  transform: index === currentFeature ? 'scale(1.05)' : 'scale(1)',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentFeature(index)}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  animation: index === currentFeature ? 'bounce 1s ease-in-out infinite' : 'none'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateY(-250px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateY(-250px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;