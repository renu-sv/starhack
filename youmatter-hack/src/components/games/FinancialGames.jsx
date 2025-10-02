import React, { useState } from 'react';

export const BudgetPlannerGame = ({ onComplete }) => {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState({
    housing: 1500,
    food: 600,
    transportation: 300,
    entertainment: 200,
    savings: 800,
    other: 200
  });
  const [step, setStep] = useState('setup'); // setup, analyze, complete

  const categories = [
    { key: 'housing', name: 'Housing', emoji: '🏠', color: '#ef4444' },
    { key: 'food', name: 'Food & Groceries', emoji: '🍽️', color: '#f59e0b' },
    { key: 'transportation', name: 'Transportation', emoji: '🚗', color: '#3b82f6' },
    { key: 'entertainment', name: 'Entertainment', emoji: '🎬', color: '#8b5cf6' },
    { key: 'savings', name: 'Savings', emoji: '💰', color: '#10b981' },
    { key: 'other', name: 'Other', emoji: '📦', color: '#6b7280' }
  ];

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const remaining = income - totalExpenses;
  const savingsRate = (expenses.savings / income) * 100;

  const updateExpense = (category, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const getRecommendation = () => {
    if (remaining < 0) return { type: 'danger', message: '⚠️ You\'re overspending! Reduce expenses.' };
    if (savingsRate < 10) return { type: 'warning', message: '💡 Try to save at least 10% of income.' };
    if (savingsRate >= 20) return { type: 'excellent', message: '🎉 Excellent! You\'re saving 20%+!' };
    return { type: 'good', message: '👍 Good budget! Consider increasing savings.' };
  };

  if (step === 'complete') {
    const recommendation = getRecommendation();
    return (
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #3b82f6)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Budget Analyzed!</h3>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Monthly Summary
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Income: ${income.toLocaleString()} | Expenses: ${totalExpenses.toLocaleString()} | 
            Remaining: ${remaining.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem' }}>
            Savings Rate: {savingsRate.toFixed(1)}%
          </div>
        </div>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          {recommendation.message}
        </p>
      </div>
    );
  }

  if (step === 'analyze') {
    const recommendation = getRecommendation();
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          📊 Budget Analysis
        </h3>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span>Monthly Income:</span>
            <span style={{ fontWeight: '600' }}>${income.toLocaleString()}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span>Total Expenses:</span>
            <span style={{ fontWeight: '600' }}>${totalExpenses.toLocaleString()}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.2)'
          }}>
            <span>Remaining:</span>
            <span style={{ 
              fontWeight: '700',
              color: remaining >= 0 ? '#10b981' : '#fbbf24'
            }}>
              ${remaining.toLocaleString()}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Savings Rate:</span>
            <span style={{ fontWeight: '600' }}>{savingsRate.toFixed(1)}%</span>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Recommendation
          </div>
          <div style={{ fontSize: '0.9rem' }}>
            {recommendation.message}
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setStep('setup')}
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
            ← Adjust Budget
          </button>
          <button
            onClick={() => {
              setStep('complete');
              onComplete(100);
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
            Complete Analysis ✅
          </button>
        </div>
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
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        💰 Budget Planner Game
      </h3>
      
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          Monthly Income
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem',
            color: 'white',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Monthly Expenses</h4>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {categories.map(category => (
            <div
              key={category.key}
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{category.emoji}</span>
              <span style={{ flex: 1, fontSize: '0.9rem' }}>{category.name}</span>
              <input
                type="number"
                value={expenses[category.key]}
                onChange={(e) => updateExpense(category.key, e.target.value)}
                style={{
                  width: '100px',
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  color: 'white',
                  fontSize: '0.9rem',
                  textAlign: 'right'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: remaining >= 0 ? 'rgba(16,185,129,0.2)' : 'rgba(251,191,36,0.2)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Remaining</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          ${remaining.toLocaleString()}
        </div>
      </div>

      <button
        onClick={() => setStep('analyze')}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.9)',
          color: '#1f2937',
          border: 'none',
          padding: '1rem',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        📊 Analyze Budget
      </button>
    </div>
  );
};

export const InvestmentSimulatorGame = ({ onComplete }) => {
  const [portfolio, setPortfolio] = useState({
    stocks: 0,
    bonds: 0,
    crypto: 0,
    cash: 10000
  });
  const [month, setMonth] = useState(1);
  const [totalMonths] = useState(12);
  const [gameEnded, setGameEnded] = useState(false);

  const investments = [
    { key: 'stocks', name: 'Stocks', emoji: '📈', risk: 'High', expectedReturn: 12 },
    { key: 'bonds', name: 'Bonds', emoji: '🏛️', risk: 'Low', expectedReturn: 4 },
    { key: 'crypto', name: 'Crypto', emoji: '₿', risk: 'Very High', expectedReturn: 25 }
  ];

  const simulateMonth = () => {
    if (month >= totalMonths) {
      setGameEnded(true);
      const totalValue = getTotalValue();
      const returns = ((totalValue - 10000) / 10000) * 100;
      onComplete(Math.min(100, Math.max(20, 50 + returns)));
      return;
    }

    setPortfolio(prev => {
      const newPortfolio = { ...prev };
      
      // Simulate returns with randomness
      newPortfolio.stocks *= 1 + (Math.random() * 0.04 - 0.01); // ±1% monthly
      newPortfolio.bonds *= 1 + (Math.random() * 0.01 + 0.002); // +0.2-1.2% monthly
      newPortfolio.crypto *= 1 + (Math.random() * 0.2 - 0.1); // ±10% monthly
      
      return newPortfolio;
    });

    setMonth(prev => prev + 1);
  };

  const invest = (type, amount) => {
    if (portfolio.cash >= amount) {
      setPortfolio(prev => ({
        ...prev,
        cash: prev.cash - amount,
        [type]: prev[type] + amount
      }));
    }
  };

  const getTotalValue = () => {
    return Object.values(portfolio).reduce((sum, val) => sum + val, 0);
  };

  if (gameEnded) {
    const totalValue = getTotalValue();
    const returns = ((totalValue - 10000) / 10000) * 100;
    
    return (
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #3b82f6)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {returns > 0 ? '📈' : '📉'}
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Investment Year Complete!
        </h3>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Final Portfolio Value
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            ${totalValue.toFixed(0).toLocaleString()}
          </div>
          <div style={{ 
            fontSize: '1rem',
            color: returns >= 0 ? '#10b981' : '#fbbf24'
          }}>
            {returns >= 0 ? '+' : ''}{returns.toFixed(1)}% Returns
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          {returns > 10 ? '🎉 Excellent investment strategy!' :
           returns > 0 ? '👍 Good job! You made a profit!' :
           '📚 Keep learning about investing!'}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>📈 Investment Simulator</h3>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>
          Month {month}/{totalMonths}
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Portfolio Value</div>
        <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          ${getTotalValue().toFixed(0).toLocaleString()}
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          Cash Available: ${portfolio.cash.toFixed(0).toLocaleString()}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Make Investments</h4>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {investments.map(investment => (
            <div
              key={investment.key}
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0.75rem'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{investment.emoji}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    {investment.name}
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  {investment.risk} Risk
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                {[1000, 2500, 5000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => invest(investment.key, amount)}
                    disabled={portfolio.cash < amount}
                    style={{
                      background: portfolio.cash >= amount 
                        ? 'rgba(255,255,255,0.2)' 
                        : 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      cursor: portfolio.cash >= amount ? 'pointer' : 'not-allowed',
                      opacity: portfolio.cash >= amount ? 1 : 0.5,
                      flex: 1
                    }}
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={simulateMonth}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.9)',
          color: '#1f2937',
          border: 'none',
          padding: '1rem',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        ⏭️ Next Month
      </button>
    </div>
  );
};