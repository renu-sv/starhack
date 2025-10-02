// Badge system
export const BADGES = {
  // Streak badges
  streak_3: { name: '3-Day Streak', icon: '🔥', description: 'Complete challenges for 3 days in a row', color: '#f59e0b' },
  streak_7: { name: 'Week Warrior', icon: '⚡', description: 'Complete challenges for 7 days in a row', color: '#ef4444' },
  streak_14: { name: 'Fortnight Fighter', icon: '💪', description: 'Complete challenges for 14 days in a row', color: '#8b5cf6' },
  streak_30: { name: 'Monthly Master', icon: '👑', description: 'Complete challenges for 30 days in a row', color: '#6366f1' },
  
  // Points badges
  points_100: { name: 'First Steps', icon: '👶', description: 'Earn your first 100 points', color: '#10b981' },
  points_500: { name: 'Getting Started', icon: '🌱', description: 'Earn 500 points', color: '#10b981' },
  points_1000: { name: 'Rising Star', icon: '⭐', description: 'Earn 1,000 points', color: '#f59e0b' },
  points_2500: { name: 'Achiever', icon: '🏆', description: 'Earn 2,500 points', color: '#ef4444' },
  points_5000: { name: 'Champion', icon: '🥇', description: 'Earn 5,000 points', color: '#8b5cf6' },
  points_10000: { name: 'Legend', icon: '💎', description: 'Earn 10,000 points', color: '#6366f1' },
  
  // Category completion badges
  health_explorer: { name: 'Health Explorer', icon: '🏥', description: 'Complete 5 health challenges', color: '#10b981' },
  mental_guru: { name: 'Mental Wellness Guru', icon: '🧠', description: 'Complete 5 mental wellness challenges', color: '#ec4899' },
  money_master: { name: 'Financial Master', icon: '💰', description: 'Complete 5 financial challenges', color: '#f59e0b' },
  lifestyle_champion: { name: 'Lifestyle Champion', icon: '🌟', description: 'Complete 5 lifestyle challenges', color: '#8b5cf6' },
  
  // Special achievements
  early_bird: { name: 'Early Bird', icon: '🐦', description: 'Complete 5 challenges before 9 AM', color: '#06b6d4' },
  night_owl: { name: 'Night Owl', icon: '🦉', description: 'Complete 5 challenges after 9 PM', color: '#7c3aed' },
  weekend_warrior: { name: 'Weekend Warrior', icon: '🗡️', description: 'Complete challenges on 4 weekends', color: '#dc2626' },
  perfect_week: { name: 'Perfect Week', icon: '✨', description: 'Complete all daily challenges for a week', color: '#fbbf24' },
  
  // Social badges
  helpful_friend: { name: 'Helpful Friend', icon: '🤝', description: 'Help 10 community members', color: '#ec4899' },
  motivator: { name: 'Motivator', icon: '📣', description: 'Get 100 likes on posts', color: '#10b981' },
  
  // Difficulty badges
  easy_master: { name: 'Easy Master', icon: '🎯', description: 'Complete 10 easy challenges', color: '#10b981' },
  medium_conqueror: { name: 'Medium Conqueror', icon: '⚔️', description: 'Complete 10 medium challenges', color: '#f59e0b' },
  hard_hero: { name: 'Hard Hero', icon: '🛡️', description: 'Complete 5 hard challenges', color: '#ef4444' }
};

// Level system
export const LEVELS = {
  1: { name: 'Beginner', minPoints: 0, maxPoints: 499, color: '#10b981', perks: ['Basic challenges unlocked'] },
  2: { name: 'Novice', minPoints: 500, maxPoints: 999, color: '#06b6d4', perks: ['Medium challenges unlocked', '+10% bonus points'] },
  3: { name: 'Apprentice', minPoints: 1000, maxPoints: 1999, color: '#8b5cf6', perks: ['Hard challenges unlocked', '+20% bonus points'] },
  4: { name: 'Practitioner', minPoints: 2000, maxPoints: 3499, color: '#ec4899', perks: ['Expert challenges unlocked', '+30% bonus points'] },
  5: { name: 'Expert', minPoints: 3500, maxPoints: 4999, color: '#f59e0b', perks: ['Custom challenges', '+40% bonus points'] },
  6: { name: 'Master', minPoints: 5000, maxPoints: 7499, color: '#ef4444', perks: ['Mentor others', '+50% bonus points'] },
  7: { name: 'Grandmaster', minPoints: 7500, maxPoints: 9999, color: '#7c3aed', perks: ['Create challenges', '+60% bonus points'] },
  8: { name: 'Legend', minPoints: 10000, maxPoints: 14999, color: '#dc2626', perks: ['VIP access', '+70% bonus points'] },
  9: { name: 'Mythic', minPoints: 15000, maxPoints: 24999, color: '#6366f1', perks: ['Exclusive content', '+80% bonus points'] },
  10: { name: 'Transcendent', minPoints: 25000, maxPoints: 999999, color: '#fbbf24', perks: ['Hall of Fame', '+100% bonus points'] }
};

// Calculate user level based on points
export const calculateLevel = (points) => {
  for (let level = 10; level >= 1; level--) {
    if (points >= LEVELS[level].minPoints) {
      return level;
    }
  }
  return 1;
};

// Get level info
export const getLevelInfo = (points) => {
  const currentLevel = calculateLevel(points);
  const currentLevelData = LEVELS[currentLevel];
  const nextLevel = currentLevel < 10 ? currentLevel + 1 : 10;
  const nextLevelData = LEVELS[nextLevel];
  
  const progressInCurrentLevel = points - currentLevelData.minPoints;
  const pointsNeededInLevel = currentLevelData.maxPoints - currentLevelData.minPoints;
  const progressPercentage = (progressInCurrentLevel / pointsNeededInLevel) * 100;
  
  return {
    currentLevel,
    currentLevelData,
    nextLevel,
    nextLevelData,
    progressPercentage: Math.min(100, progressPercentage),
    pointsToNextLevel: nextLevel > currentLevel ? nextLevelData.minPoints - points : 0
  };
};

// Check for new badges earned
export const checkForNewBadges = (userStats, previousStats = {}) => {
  const newBadges = [];
  
  // Streak badges
  if (userStats.currentStreak >= 3 && (previousStats.currentStreak || 0) < 3) {
    newBadges.push('streak_3');
  }
  if (userStats.currentStreak >= 7 && (previousStats.currentStreak || 0) < 7) {
    newBadges.push('streak_7');
  }
  if (userStats.currentStreak >= 14 && (previousStats.currentStreak || 0) < 14) {
    newBadges.push('streak_14');
  }
  if (userStats.currentStreak >= 30 && (previousStats.currentStreak || 0) < 30) {
    newBadges.push('streak_30');
  }
  
  // Points badges
  const pointsThresholds = [100, 500, 1000, 2500, 5000, 10000];
  pointsThresholds.forEach(threshold => {
    if (userStats.totalPoints >= threshold && (previousStats.totalPoints || 0) < threshold) {
      newBadges.push(`points_${threshold}`);
    }
  });
  
  // Category completion badges
  const categoryBadges = {
    health: 'health_explorer',
    mental: 'mental_guru',
    financial: 'money_master',
    lifestyle: 'lifestyle_champion'
  };
  
  Object.entries(categoryBadges).forEach(([category, badgeId]) => {
    const currentCount = userStats.completedByCategory?.[category] || 0;
    const previousCount = previousStats.completedByCategory?.[category] || 0;
    
    if (currentCount >= 5 && previousCount < 5) {
      newBadges.push(badgeId);
    }
  });
  
  // Difficulty badges
  const difficultyBadges = {
    easy: { threshold: 10, badge: 'easy_master' },
    medium: { threshold: 10, badge: 'medium_conqueror' },
    hard: { threshold: 5, badge: 'hard_hero' }
  };
  
  Object.entries(difficultyBadges).forEach(([difficulty, config]) => {
    const currentCount = userStats.completedByDifficulty?.[difficulty] || 0;
    const previousCount = previousStats.completedByDifficulty?.[difficulty] || 0;
    
    if (currentCount >= config.threshold && previousCount < config.threshold) {
      newBadges.push(config.badge);
    }
  });
  
  return newBadges;
};

// Calculate points with level bonus
export const calculatePointsWithBonus = (basePoints, userLevel) => {
  const levelData = LEVELS[userLevel];
  if (!levelData) return basePoints;
  
  // Extract bonus percentage from perks
  const bonusPerk = levelData.perks.find(perk => perk.includes('bonus points'));
  if (!bonusPerk) return basePoints;
  
  const bonusMatch = bonusPerk.match(/(\d+)%/);
  const bonusPercentage = bonusMatch ? parseInt(bonusMatch[1]) : 0;
  
  return Math.floor(basePoints * (1 + bonusPercentage / 100));
};

// Generate user stats
export const generateUserStats = (completedChallenges, totalPoints, currentStreak) => {
  const stats = {
    totalChallenges: completedChallenges.length,
    totalPoints,
    currentStreak,
    completedByCategory: {},
    completedByDifficulty: {},
    completedByType: {},
    averagePointsPerChallenge: completedChallenges.length > 0 ? Math.round(totalPoints / completedChallenges.length) : 0
  };
  
  // Analyze completed challenges
  completedChallenges.forEach(challenge => {
    // By category (extract from challenge ID)
    const category = challenge.id.split('_')[0];
    stats.completedByCategory[category] = (stats.completedByCategory[category] || 0) + 1;
    
    // By difficulty (if available)
    if (challenge.difficulty) {
      const difficulty = challenge.difficulty.toLowerCase();
      stats.completedByDifficulty[difficulty] = (stats.completedByDifficulty[difficulty] || 0) + 1;
    }
    
    // By type (if available)
    if (challenge.type) {
      stats.completedByType[challenge.type] = (stats.completedByType[challenge.type] || 0) + 1;
    }
  });
  
  return stats;
};

// Streak calculation helpers
export const updateStreak = (lastCompletionDate, currentDate = new Date()) => {
  if (!lastCompletionDate) return 1;
  
  const last = new Date(lastCompletionDate);
  const current = new Date(currentDate);
  
  // Reset time to compare only dates
  last.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
  
  const diffInDays = Math.floor((current - last) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 1) {
    // Consecutive day
    return 'continue';
  } else if (diffInDays === 0) {
    // Same day
    return 'same_day';
  } else {
    // Streak broken
    return 'reset';
  }
};

// Motivation messages based on progress
export const getMotivationMessage = (userStats, levelInfo) => {
  const messages = {
    streak: [
      "🔥 You're on fire! Keep that streak going!",
      "💪 Consistency is key - you're crushing it!",
      "⚡ Your dedication is inspiring!",
      "🌟 Every day counts - great job!",
      "🚀 You're building amazing habits!"
    ],
    level_up: [
      "🎉 Level up! You've unlocked new challenges!",
      "🏆 Congratulations on reaching the next level!",
      "✨ Your progress is amazing - new perks unlocked!",
      "🌟 You're becoming a wellness champion!",
      "🚀 New level, new possibilities!"
    ],
    points: [
      "💎 Great work earning those points!",
      "⭐ Every point brings you closer to your goals!",
      "🏅 Your efforts are paying off!",
      "🎯 Bullseye! Another challenge conquered!",
      "💪 You're unstoppable!"
    ],
    encouragement: [
      "🌱 Small steps lead to big changes!",
      "💝 Be proud of your progress!",
      "🌈 Every challenge makes you stronger!",
      "✨ You've got this!",
      "🦋 Transformation takes time - keep going!"
    ]
  };
  
  // Choose message type based on user status
  if (userStats.currentStreak >= 3) {
    return messages.streak[Math.floor(Math.random() * messages.streak.length)];
  } else if (levelInfo.progressPercentage > 80) {
    return messages.level_up[Math.floor(Math.random() * messages.level_up.length)];
  } else if (userStats.totalPoints > 0) {
    return messages.points[Math.floor(Math.random() * messages.points.length)];
  } else {
    return messages.encouragement[Math.floor(Math.random() * messages.encouragement.length)];
  }
};