import React, { useState, useEffect } from 'react';

export const StepCounterGame = ({ onComplete }) => {
  const [steps, setSteps] = useState(0);
  const [target] = useState(10000);
  const [isWalking, setIsWalking] = useState(false);
  const [motivation, setMotivation] = useState("Let's start walking! 🚶‍♀️");

  useEffect(() => {
    let interval;
    if (isWalking) {
      interval = setInterval(() => {
        setSteps(prev => {
          const newSteps = prev + Math.floor(Math.random() * 15) + 5;
          if (newSteps >= target) {
            setIsWalking(false);
            setMotivation("🎉 Goal achieved! Amazing work!");
            onComplete(100);
            return target;
          }
          return newSteps;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isWalking, target, onComplete]);

  const progress = (steps / target) * 100;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🚶‍♀️ Virtual Step Counter</h3>
      
      <div style={{
        fontSize: '3rem',
        fontWeight: '700',
        marginBottom: '0.5rem'
      }}>
        {steps.toLocaleString()}
      </div>
      <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1rem' }}>
        / {target.toLocaleString()} steps
      </div>

      <div style={{
        width: '100%',
        height: '12px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '6px',
        marginBottom: '1.5rem',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '6px',
          width: `${progress}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>

      <p style={{ fontSize: '1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
        {motivation}
      </p>

      <button
        onClick={() => setIsWalking(!isWalking)}
        disabled={steps >= target}
        style={{
          background: isWalking ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
          color: isWalking ? 'white' : '#1f2937',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: steps >= target ? 'not-allowed' : 'pointer',
          opacity: steps >= target ? 0.6 : 1
        }}
      >
        {steps >= target ? '✅ Completed!' : isWalking ? '⏸️ Pause Walk' : '▶️ Start Walking'}
      </button>
    </div>
  );
};

export const NutritionQuizGame = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "Which food is highest in protein?",
      options: ["🥑 Avocado", "🥩 Chicken Breast", "🍌 Banana", "🥕 Carrot"],
      correct: 1,
      explanation: "Chicken breast contains about 31g protein per 100g!"
    },
    {
      question: "How many glasses of water should you drink daily?",
      options: ["💧 4 glasses", "💧 6 glasses", "💧 8 glasses", "💧 10 glasses"],
      correct: 2,
      explanation: "8 glasses (64 oz) is the recommended daily intake!"
    },
    {
      question: "Which vitamin does sunlight help produce?",
      options: ["☀️ Vitamin A", "☀️ Vitamin B", "☀️ Vitamin C", "☀️ Vitamin D"],
      correct: 3,
      explanation: "Vitamin D is synthesized when skin is exposed to sunlight!"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        onComplete((score + (answerIndex === questions[currentQuestion].correct ? 1 : 0)) * 33.33);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🍎 Nutrition Quiz Complete!</h3>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {score >= 2 ? '🏆' : score === 1 ? '👍' : '📚'}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          {score}/3 Correct
        </div>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          {score >= 2 ? 'Excellent nutrition knowledge!' : 
           score === 1 ? 'Good effort! Keep learning!' : 
           'Time to brush up on nutrition basics!'}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>🍎 Nutrition Quiz</h3>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>
          {currentQuestion + 1}/{questions.length}
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          {questions[currentQuestion].question}
        </h4>
        
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              style={{
                background: selectedAnswer === index 
                  ? (index === questions[currentQuestion].correct ? '#10b981' : '#ef4444')
                  : selectedAnswer !== null && index === questions[currentQuestion].correct
                  ? '#10b981'
                  : 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '0.95rem',
                cursor: selectedAnswer !== null ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '0.9rem'
          }}>
            {questions[currentQuestion].explanation}
          </div>
        )}
      </div>
    </div>
  );
};

export const WorkoutChallengeGame = ({ onComplete }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);

  const exercises = [
    { name: "Jumping Jacks", emoji: "🤸‍♀️", duration: 30 },
    { name: "Push-ups", emoji: "💪", duration: 30 },
    { name: "Squats", emoji: "🏋️‍♀️", duration: 30 },
    { name: "Plank Hold", emoji: "🧘‍♀️", duration: 30 }
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      const newCompleted = [...completedExercises, currentExercise];
      setCompletedExercises(newCompleted);
      
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCountdown(30);
        setIsActive(false);
      } else {
        onComplete(100);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, countdown, currentExercise, completedExercises, onComplete]);

  const isCompleted = completedExercises.length === exercises.length;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>💪 Quick Workout Challenge</h3>
      
      {!isCompleted ? (
        <>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {exercises[currentExercise].emoji}
          </div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            {exercises[currentExercise].name}
          </h4>
          
          <div style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: countdown <= 5 ? '#fbbf24' : 'white'
          }}>
            {countdown}s
          </div>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            {exercises.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: completedExercises.includes(index) 
                    ? '#10b981' 
                    : index === currentExercise 
                    ? 'rgba(255,255,255,0.8)' 
                    : 'rgba(255,255,255,0.3)'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsActive(!isActive)}
            style={{
              background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
              color: isActive ? 'white' : '#1f2937',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isActive ? '⏸️ Pause' : '▶️ Start Exercise'}
          </button>
        </>
      ) : (
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            Workout Complete!
          </h4>
          <p style={{ fontSize: '1rem', opacity: 0.9 }}>
            Great job! You've completed all exercises! 💪
          </p>
        </div>
      )}
    </div>
  );
};