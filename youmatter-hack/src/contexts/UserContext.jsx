import React, { createContext, useContext, useState, useEffect } from 'react';
import { generatePersonalizedChallenges, getDailySuggestedChallenge } from '../utils/challengeEngine';
import { 
  calculateLevel, 
  getLevelInfo, 
  checkForNewBadges, 
  calculatePointsWithBonus,
  generateUserStats,
  updateStreak,
  getMotivationMessage
} from '../utils/gamification';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [personalizedChallenges, setPersonalizedChallenges] = useState([]);
  const [dailySuggestion, setDailySuggestion] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (user && user.hasCompletedOnboarding) {
      updatePersonalizedContent();
    }
  }, [user?.preferences, user?.completedChallenges]);

  const loadUserData = () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const defaultUser = {
        id: 'user_001',
        name: userData.name || 'New User',
        email: userData.email || '',
        avatar: userData.avatar || '👩‍💼',
        
        // Gamification
        level: userData.level || 1,
        totalPoints: userData.totalPoints || 0,
        currentStreak: userData.currentStreak || 0,
        longestStreak: userData.longestStreak || 0,
        lastCompletionDate: userData.lastCompletionDate || null,
        
        // Personalization
        preferences: userData.preferences || {
          health: [],
          mental: [],
          financial: [],
          lifestyle: []
        },
        
        // Progress tracking
        completedChallenges: userData.completedChallenges || [],
        activeChallenges: userData.activeChallenges || [],
        badges: userData.badges || [],
        
        // Social
        followers: userData.followers || 0,
        following: userData.following || 0,
        communityPoints: userData.communityPoints || 0,
        
        // Onboarding
        hasCompletedOnboarding: userData.hasCompletedOnboarding || false,
        
        // Settings
        notifications: userData.notifications || {
          daily: true,
          achievements: true,
          social: true
        }
      };
      
      setUser(defaultUser);
    } catch (error) {
      console.error('Error loading user data:', error);
      setUser(getDefaultUser());
    }
    setIsLoading(false);
  };

  const getDefaultUser = () => ({
    id: 'user_001',
    name: 'New User',
    email: '',
    avatar: '👩‍💼',
    level: 1,
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletionDate: null,
    preferences: { health: [], mental: [], financial: [], lifestyle: [] },
    completedChallenges: [],
    activeChallenges: [],
    badges: [],
    followers: 0,
    following: 0,
    communityPoints: 0,
    hasCompletedOnboarding: false,
    notifications: { daily: true, achievements: true, social: true }
  });

  const saveUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const updateUser = (updates) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...updates };
      saveUserData(updatedUser);
      return updatedUser;
    });
  };

  const updatePersonalizedContent = () => {
    if (!user?.preferences) return;
    
    // Generate personalized challenges
    const challenges = generatePersonalizedChallenges(
      user.preferences, 
      user.level, 
      user.completedChallenges
    );
    setPersonalizedChallenges(challenges);
    
    // Get daily suggestion
    const suggestion = getDailySuggestedChallenge(user.preferences, user.completedChallenges);
    setDailySuggestion(suggestion);
  };

  const addPoints = (points, source = 'general') => {
    const currentLevel = user.level;
    const bonusPoints = calculatePointsWithBonus(points, currentLevel);
    const newTotalPoints = user.totalPoints + bonusPoints;
    const newLevel = calculateLevel(newTotalPoints);
    
    // Check for new badges
    const previousStats = generateUserStats(user.completedChallenges, user.totalPoints, user.currentStreak);
    const newStats = generateUserStats(user.completedChallenges, newTotalPoints, user.currentStreak);
    const newBadges = checkForNewBadges(newStats, previousStats);
    
    updateUser({
      totalPoints: newTotalPoints,
      level: newLevel,
      badges: [...user.badges, ...newBadges]
    });
    
    return { 
      pointsEarned: bonusPoints, 
      levelUp: newLevel > currentLevel,
      newBadges: newBadges.length > 0 ? newBadges : null
    };
  };

  const completeChallenge = (challengeId, basePoints = 100) => {
    const currentDate = new Date();
    const streakUpdate = updateStreak(user.lastCompletionDate, currentDate);
    
    let newStreak = user.currentStreak;
    if (streakUpdate === 'continue') {
      newStreak = user.currentStreak + 1;
    } else if (streakUpdate === 'reset') {
      newStreak = 1;
    }
    // If 'same_day', streak remains the same
    
    const newLongestStreak = Math.max(user.longestStreak, newStreak);
    
    // Add completed challenge
    const completedChallenge = {
      id: challengeId,
      completedAt: currentDate.toISOString(),
      pointsEarned: basePoints,
      streakDay: newStreak
    };
    
    const newCompletedChallenges = [...user.completedChallenges, completedChallenge];
    
    // Update user data
    updateUser({
      completedChallenges: newCompletedChallenges,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastCompletionDate: currentDate.toISOString()
    });
    
    // Add points and check for rewards
    const pointsResult = addPoints(basePoints, 'challenge_completion');
    
    return {
      streakBonus: streakUpdate === 'continue',
      newStreak,
      ...pointsResult
    };
  };

  const setPreferences = (preferences) => {
    updateUser({ 
      preferences,
      hasCompletedOnboarding: true 
    });
  };

  const joinChallenge = (challengeId) => {
    const newActiveChallenge = {
      id: challengeId,
      joinedAt: new Date().toISOString(),
      progress: 0
    };
    
    updateUser({
      activeChallenges: [...user.activeChallenges, newActiveChallenge]
    });
    
    // Small points reward for joining
    addPoints(25, 'challenge_join');
  };

  const updateChallengeProgress = (challengeId, progress) => {
    const updatedActiveChallenges = user.activeChallenges.map(challenge =>
      challenge.id === challengeId 
        ? { ...challenge, progress, lastUpdated: new Date().toISOString() }
        : challenge
    );
    
    updateUser({ activeChallenges: updatedActiveChallenges });
  };

  const getUserStats = () => {
    return generateUserStats(user.completedChallenges, user.totalPoints, user.currentStreak);
  };

  const getLevelData = () => {
    return getLevelInfo(user.totalPoints);
  };

  const getMotivation = () => {
    const stats = getUserStats();
    const levelInfo = getLevelData();
    return getMotivationMessage(stats, levelInfo);
  };

  const value = {
    // User data
    user,
    isLoading,
    
    // Personalized content
    personalizedChallenges,
    dailySuggestion,
    
    // Actions
    updateUser,
    setPreferences,
    addPoints,
    completeChallenge,
    joinChallenge,
    updateChallengeProgress,
    
    // Computed data
    getUserStats,
    getLevelData,
    getMotivation,
    
    // Utilities
    loadUserData,
    updatePersonalizedContent
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};