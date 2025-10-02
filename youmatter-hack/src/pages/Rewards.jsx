import React, { useState } from 'react';
import BottomNav from '../components/layout/BottomNav';
import { badges } from '../data/badges';

const Rewards = () => {
  const [userBadges] = useState(['early_bird', 'explorer']);
  const [userCoins] = useState(230);
  const [userLevel] = useState({ current: 3, xp: 340, nextLevelXP: 500 });

  const rewardShop = [
    { id: 1, name: 'Coffee Voucher', cost: 100, icon: '☕', category: 'food' },
    { id: 2, name: 'Meditation App Premium', cost: 200, icon: '🧘‍♀️', category: 'wellness' },
    { id: 3, name: 'Fitness Tracker Band', cost: 500, icon: '⌚', category: 'tech' },
    { id: 4, name: 'Healthy Meal Kit', cost: 150, icon: '🥗', category: 'food' }
  ];

  return (
    <div className="screen-container">
      <div className="content-area animate-fadeIn" style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #FF9800 0%, #E91E63 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Your Rewards 🏆
          </h1>
          <p style={{ opacity: 0.9, marginBottom: '16px' }}>
            Celebrate your wellness achievements!
          </p>

          {/* Coins & Level */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>🪙 {userCoins}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Wellness Coins</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Lv.{userLevel.current} 🌟</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Explorer Level</div>
            </div>
          </div>

          {/* Level Progress */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span>Level {userLevel.current}</span>
              <span>{userLevel.xp}/{userLevel.nextLevelXP} XP</span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(userLevel.xp / userLevel.nextLevelXP) * 100}%`,
                height: '100%',
                background: 'white',
                borderRadius: '3px',
                transition: 'width 1s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Earned Badges */}
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            🏅 Your Wellness Badges
            <span style={{
              marginLeft: '8px',
              background: '#4CAF50',
              color: 'white',
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '8px'
            }}>
              {userBadges.length} Earned
            </span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {badges.map(badge => {
              const isEarned = userBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  style={{
                    background: isEarned 
                      ? 'linear-gradient(135deg, #4CAF50, #2196F3)' 
                      : '#f5f5f5',
                    color: isEarned ? 'white' : '#9e9e9e',
                    padding: '16px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    position: 'relative',
                    border: isEarned ? 'none' : '2px dashed #e0e0e0',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {!isEarned && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '16px'
                    }}>🔒</div>
                  )}
                  
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {isEarned ? badge.icon : '⚫'}
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                    {badge.name}
                  </h4>
                  <p style={{ fontSize: '11px', opacity: 0.8 }}>
                    {badge.description}
                  </p>
                  {isEarned && (
                    <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: '600' }}>
                      +{badge.xp} XP
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reward Shop */}
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            🛍️ Wellness Reward Shop
          </h3>

          {rewardShop.map(reward => (
            <div
              key={reward.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div style={{ fontSize: '32px', marginRight: '16px' }}>
                {reward.icon}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {reward.name}
                </h4>
                <div style={{ fontSize: '14px', color: '#FF9800', fontWeight: '600' }}>
                  🪙 {reward.cost} coins
                </div>
              </div>

              <button
                style={{
                  background: userCoins >= reward.cost ? '#4CAF50' : '#e0e0e0',
                  color: userCoins >= reward.cost ? 'white' : '#9e9e9e',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: userCoins >= reward.cost ? 'pointer' : 'not-allowed'
                }}
                disabled={userCoins < reward.cost}
              >
                {userCoins >= reward.cost ? 'Redeem' : 'Need More'}
              </button>
            </div>
          ))}
        </div>

        {/* Achievement Timeline */}
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
            📅 Recent Achievements
          </h3>
          
          <div style={{ borderLeft: '2px solid #4CAF50', paddingLeft: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#4CAF50',
                borderRadius: '50%',
                position: 'relative',
                left: '-20px',
                top: '8px'
              }} />
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                Explorer Badge Earned! 🌍
              </h4>
              <p style={{ fontSize: '12px', color: '#757575' }}>2 days ago</p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#4CAF50',
                borderRadius: '50%',
                position: 'relative',
                left: '-20px',
                top: '8px'
              }} />
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                Early Bird Badge Earned! 🌅
              </h4>
              <p style={{ fontSize: '12px', color: '#757575' }}>1 week ago</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rewards;