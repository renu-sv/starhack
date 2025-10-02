import React, { useEffect, useState } from 'react';

const Confetti = ({ show, duration = 3000 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1000,
        color: ['#E91E63', '#2196F3', '#4CAF50', '#FF9800'][Math.floor(Math.random() * 4)]
      }));
      
      setParticles(newParticles);
      
      setTimeout(() => setParticles([]), duration);
    }
  }, [show, duration]);

  if (!show) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 1000 
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}ms`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;