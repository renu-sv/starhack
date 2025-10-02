// Master challenge database with categories
export const CHALLENGE_DATABASE = {
  // HEALTH & WELLNESS CHALLENGES
  health: {
    diet: [
      {
        id: 'diet_001',
        title: '🥗 5-A-Day Veggie Challenge',
        description: 'Eat 5 servings of fruits and vegetables daily for 7 days',
        difficulty: 'Easy',
        duration: 7,
        points: 300,
        type: 'daily',
        icon: '🥗',
        color: '#10b981',
        requirements: ['Log daily meals', 'Take photo of colorful plate'],
        tips: ['Mix colors on your plate', 'Try new vegetables', 'Prep veggies in advance']
      },
      {
        id: 'diet_002',
        title: '💧 Hydration Hero',
        description: 'Drink 8 glasses of water daily for 10 days',
        difficulty: 'Easy',
        duration: 10,
        points: 250,
        type: 'daily',
        icon: '💧',
        color: '#06b6d4',
        requirements: ['Track water intake', 'No sugary drinks before 2PM'],
        tips: ['Use a water bottle with measurements', 'Set hourly reminders', 'Add lemon for flavor']
      },
      {
        id: 'diet_003',
        title: '🍳 Meal Prep Master',
        description: 'Prepare healthy meals for the entire week',
        difficulty: 'Medium',
        duration: 7,
        points: 500,
        type: 'weekly',
        icon: '🍳',
        color: '#f59e0b',
        requirements: ['Plan 5 healthy meals', 'Prep on Sunday', 'Include protein & veggies'],
        tips: ['Start with 3 meals', 'Use glass containers', 'Prep ingredients in batches']
      },
      {
        id: 'diet_004',
        title: '🚫 Sugar Detox Week',
        description: 'Eliminate added sugars for 7 consecutive days',
        difficulty: 'Hard',
        duration: 7,
        points: 700,
        type: 'weekly',
        icon: '🚫',
        color: '#ef4444',
        requirements: ['Read all food labels', 'No desserts or candy', 'Track cravings'],
        tips: ['Replace with fruits', 'Find healthy alternatives', 'Stay busy when cravings hit']
      }
    ],
    exercise: [
      {
        id: 'exercise_001',
        title: '👟 10K Steps Daily',
        description: 'Walk 10,000 steps every day for a week',
        difficulty: 'Easy',
        duration: 7,
        points: 400,
        type: 'daily',
        icon: '👟',
        color: '#8b5cf6',
        requirements: ['Use step tracker', 'Walk outdoors when possible'],
        tips: ['Take stairs instead of elevator', 'Park farther away', 'Walk during phone calls']
      },
      {
        id: 'exercise_002',
        title: '💪 Bodyweight Warrior',
        description: 'Do 20 push-ups, 30 squats, 1-minute plank daily',
        difficulty: 'Medium',
        duration: 14,
        points: 600,
        type: 'daily',
        icon: '💪',
        color: '#dc2626',
        requirements: ['Complete all 3 exercises', 'Rest 1 day per week', 'Track form improvements'],
        tips: ['Start with modified versions', 'Focus on proper form', 'Gradually increase reps']
      },
      {
        id: 'exercise_003',
        title: '🏃‍♀️ Couch to 5K',
        description: 'Follow a structured running program for 4 weeks',
        difficulty: 'Hard',
        duration: 28,
        points: 1200,
        type: 'monthly',
        icon: '🏃‍♀️',
        color: '#059669',
        requirements: ['Run 3x per week', 'Follow program schedule', 'Track distance & time'],
        tips: ['Start slow', 'Invest in good shoes', 'Listen to your body']
      }
    ],
    sleep: [
      {
        id: 'sleep_001',
        title: '😴 Sleep Schedule Sync',
        description: 'Go to bed and wake up at the same time for 10 days',
        difficulty: 'Medium',
        duration: 10,
        points: 450,
        type: 'daily',
        icon: '😴',
        color: '#6366f1',
        requirements: ['Consistent bedtime ±30 minutes', '7-9 hours sleep', 'No screens 1 hour before bed'],
        tips: ['Create bedtime routine', 'Use sleep tracking app', 'Keep bedroom cool and dark']
      },
      {
        id: 'sleep_002',
        title: '🌙 Digital Sunset',
        description: 'No screens 1 hour before bedtime for 2 weeks',
        difficulty: 'Hard',
        duration: 14,
        points: 600,
        type: 'daily',
        icon: '🌙',
        color: '#7c3aed',
        requirements: ['No phones/tablets/TV', 'Use blue light filters after sunset', 'Find alternative activities'],
        tips: ['Read a book', 'Try meditation', 'Use analog alarm clock']
      }
    ],
    hydration: [
      {
        id: 'hydration_001',
        title: '🥤 Morning Hydration Boost',
        description: 'Drink 2 glasses of water within 30 minutes of waking',
        difficulty: 'Easy',
        duration: 14,
        points: 300,
        type: 'daily',
        icon: '🥤',
        color: '#0ea5e9',
        requirements: ['Drink before coffee/tea', 'Room temperature or warm water'],
        tips: ['Keep water by bedside', 'Add lemon slice', 'Set phone reminder']
      }
    ]
  },

  // MENTAL WELLNESS CHALLENGES
  mental: {
    meditation: [
      {
        id: 'meditation_001',
        title: '🧘‍♀️ Mindful Minutes',
        description: 'Meditate for 10 minutes daily for 21 days',
        difficulty: 'Easy',
        duration: 21,
        points: 500,
        type: 'daily',
        icon: '🧘‍♀️',
        color: '#ec4899',
        requirements: ['Use guided meditation', 'Same time each day', 'Track mood before/after'],
        tips: ['Start with 5 minutes', 'Use apps like Headspace', 'Focus on breathing']
      },
      {
        id: 'meditation_002',
        title: '🌸 Mindful Walking',
        description: 'Take a 15-minute mindful walk daily focusing on present moment',
        difficulty: 'Easy',
        duration: 14,
        points: 350,
        type: 'daily',
        icon: '🌸',
        color: '#f97316',
        requirements: ['No phones/music', 'Focus on surroundings', 'Notice 5 things each walk'],
        tips: ['Walk slowly', 'Feel your feet on ground', 'Observe nature']
      }
    ],
    journaling: [
      {
        id: 'journaling_001',
        title: '📝 Gratitude Practice',
        description: 'Write 3 things you\'re grateful for daily',
        difficulty: 'Easy',
        duration: 30,
        points: 600,
        type: 'daily',
        icon: '📝',
        color: '#84cc16',
        requirements: ['Write every morning', 'Be specific', 'Read previous entries weekly'],
        tips: ['Keep journal by bed', 'Include small things', 'Explain why you\'re grateful']
      },
      {
        id: 'journaling_002',
        title: '🎯 Goal Reflection',
        description: 'Weekly review of goals and progress for 4 weeks',
        difficulty: 'Medium',
        duration: 28,
        points: 400,
        type: 'weekly',
        icon: '🎯',
        color: '#6366f1',
        requirements: ['Review weekly on same day', 'Write wins and challenges', 'Adjust goals as needed'],
        tips: ['Be honest about progress', 'Celebrate small wins', 'Learn from setbacks']
      }
    ],
    cbt: [
      {
        id: 'cbt_001',
        title: '🧠 Thought Challenge',
        description: 'Practice identifying and challenging negative thoughts daily',
        difficulty: 'Medium',
        duration: 21,
        points: 650,
        type: 'daily',
        icon: '🧠',
        color: '#8b5cf6',
        requirements: ['Identify 1 negative thought', 'Question its validity', 'Reframe positively'],
        tips: ['Use thought record sheets', 'Ask "Is this helpful?"', 'Practice self-compassion']
      }
    ],
    mindfulness: [
      {
        id: 'mindfulness_001',
        title: '🍽️ Mindful Eating',
        description: 'Eat one meal per day mindfully for 10 days',
        difficulty: 'Medium',
        duration: 10,
        points: 400,
        type: 'daily',
        icon: '🍽️',
        color: '#059669',
        requirements: ['No distractions while eating', 'Chew slowly', 'Notice flavors and textures'],
        tips: ['Put fork down between bites', 'Eat in silence', 'Appreciate the food']
      }
    ]
  },

  // FINANCIAL WELLNESS CHALLENGES
  financial: {
    budgeting: [
      {
        id: 'budget_001',
        title: '📊 Expense Tracking Pro',
        description: 'Track every expense for 30 days',
        difficulty: 'Easy',
        duration: 30,
        points: 500,
        type: 'daily',
        icon: '📊',
        color: '#f59e0b',
        requirements: ['Log expenses within 24 hours', 'Categorize spending', 'Weekly review'],
        tips: ['Use expense tracking app', 'Keep receipts', 'Check bank statements']
      },
      {
        id: 'budget_002',
        title: '💰 50/30/20 Budget',
        description: 'Follow the 50/30/20 budgeting rule for 2 months',
        difficulty: 'Medium',
        duration: 60,
        points: 800,
        type: 'monthly',
        icon: '💰',
        color: '#dc2626',
        requirements: ['50% needs, 30% wants, 20% savings', 'Track monthly progress', 'Adjust as needed'],
        tips: ['Automate savings', 'Review monthly', 'Be flexible with categories']
      }
    ],
    investing: [
      {
        id: 'investing_001',
        title: '📈 Investment Education',
        description: 'Learn about investing for 15 minutes daily for 2 weeks',
        difficulty: 'Easy',
        duration: 14,
        points: 400,
        type: 'daily',
        icon: '📈',
        color: '#10b981',
        requirements: ['Read investment articles', 'Watch educational videos', 'Take notes'],
        tips: ['Start with basics', 'Use reputable sources', 'Focus on long-term strategies']
      }
    ],
    insurance: [
      {
        id: 'insurance_001',
        title: '🛡️ Policy Review',
        description: 'Review all insurance policies and compare options',
        difficulty: 'Medium',
        duration: 7,
        points: 600,
        type: 'weekly',
        icon: '🛡️',
        color: '#3b82f6',
        requirements: ['Review health, life, auto insurance', 'Get 2 quotes for each', 'Calculate potential savings'],
        tips: ['Check coverage gaps', 'Compare deductibles', 'Consider bundling discounts']
      }
    ],
    savings: [
      {
        id: 'savings_001',
        title: '🏦 Emergency Fund Builder',
        description: 'Save ₹500 per week for 8 weeks',
        difficulty: 'Medium',
        duration: 56,
        points: 1000,
        type: 'weekly',
        icon: '🏦',
        color: '#059669',
        requirements: ['Automate weekly transfer', 'Separate savings account', 'Don\'t touch the money'],
        tips: ['Start small if needed', 'Cut one expense', 'Celebrate milestones']
      }
    ]
  },

  // LIFESTYLE & PRODUCTIVITY CHALLENGES
  lifestyle: {
    productivity: [
      {
        id: 'productivity_001',
        title: '⚡ Pomodoro Power',
        description: 'Use Pomodoro technique for work/study sessions for 2 weeks',
        difficulty: 'Easy',
        duration: 14,
        points: 350,
        type: 'daily',
        icon: '⚡',
        color: '#f59e0b',
        requirements: ['25-minute focused sessions', '5-minute breaks', 'Track completed pomodoros'],
        tips: ['Eliminate distractions', 'Use timer app', 'Take real breaks']
      }
    ],
    relationships: [
      {
        id: 'relationships_001',
        title: '❤️ Connection Challenge',
        description: 'Reach out to one friend or family member daily for a week',
        difficulty: 'Easy',
        duration: 7,
        points: 300,
        type: 'daily',
        icon: '❤️',
        color: '#ec4899',
        requirements: ['Call, text, or meet in person', 'Meaningful conversation', 'No social media likes'],
        tips: ['Ask open-ended questions', 'Listen actively', 'Share something personal']
      }
    ],
    hobbies: [
      {
        id: 'hobbies_001',
        title: '🎨 Creative Expression',
        description: 'Spend 30 minutes on a creative hobby daily for 2 weeks',
        difficulty: 'Easy',
        duration: 14,
        points: 400,
        type: 'daily',
        icon: '🎨',
        color: '#8b5cf6',
        requirements: ['Choose one creative activity', 'No judgment on output', 'Document progress'],
        tips: ['Drawing, writing, music, crafts', 'Focus on enjoyment', 'Share with others']
      }
    ],
    environment: [
      {
        id: 'environment_001',
        title: '🌱 Eco-Friendly Week',
        description: 'Adopt 5 sustainable practices for a week',
        difficulty: 'Medium',
        duration: 7,
        points: 350,
        type: 'weekly',
        icon: '🌱',
        color: '#10b981',
        requirements: ['Use reusable bags', 'Reduce plastic', 'Walk/bike instead of drive when possible'],
        tips: ['Start with easy swaps', 'Carry reusable water bottle', 'Buy local produce']
      }
    ]
  }
};

// Generate personalized challenges based on user preferences
export const generatePersonalizedChallenges = (userPreferences, userLevel = 1, completedChallenges = []) => {
  const personalizedChallenges = [];
  const completedIds = completedChallenges.map(c => c.id);

  // Helper function to adjust challenge based on user level
  const adjustChallengeForLevel = (challenge) => {
    const levelMultiplier = Math.max(1, Math.floor(userLevel / 3));
    
    return {
      ...challenge,
      points: Math.floor(challenge.points * (1 + (levelMultiplier - 1) * 0.5)),
      difficulty: userLevel <= 2 ? 'Beginner' : 
                 userLevel <= 5 ? challenge.difficulty :
                 userLevel <= 10 ? 'Advanced' : 'Expert'
    };
  };

  // Generate challenges based on user preferences
  Object.entries(userPreferences).forEach(([category, subcategories]) => {
    if (subcategories.length === 0) return;

    subcategories.forEach(subcategory => {
      const categoryData = CHALLENGE_DATABASE[category];
      if (categoryData && categoryData[subcategory]) {
        const challenges = categoryData[subcategory];
        
        challenges.forEach(challenge => {
          // Skip if already completed
          if (completedIds.includes(challenge.id)) return;
          
          personalizedChallenges.push(adjustChallengeForLevel(challenge));
        });
      }
    });
  });

  // Add some random challenges for discovery (20% of total)
  const allChallenges = [];
  Object.values(CHALLENGE_DATABASE).forEach(category => {
    Object.values(category).forEach(subcategory => {
      allChallenges.push(...subcategory);
    });
  });

  const randomChallenges = allChallenges
    .filter(c => !completedIds.includes(c.id))
    .filter(c => !personalizedChallenges.find(pc => pc.id === c.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.max(2, Math.floor(personalizedChallenges.length * 0.2)))
    .map(adjustChallengeForLevel);

  const finalChallenges = [...personalizedChallenges, ...randomChallenges];

  // Sort by preference match, then by difficulty, then by points
  return finalChallenges.sort((a, b) => {
    // Prioritize user preferences
    const aIsPreferred = userPreferences[getChallengeCategory(a.id)]?.includes(getChallengeSubcategory(a.id));
    const bIsPreferred = userPreferences[getChallengeCategory(b.id)]?.includes(getChallengeSubcategory(b.id));
    
    if (aIsPreferred && !bIsPreferred) return -1;
    if (!aIsPreferred && bIsPreferred) return 1;
    
    // Then by difficulty (easier first for beginners)
    if (userLevel <= 3) {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2);
    }
    
    // Then by points (higher first for advanced users)
    return b.points - a.points;
  });
};

// Helper functions
const getChallengeCategory = (challengeId) => {
  return challengeId.split('_')[0];
};

const getChallengeSubcategory = (challengeId) => {
  const parts = challengeId.split('_');
  return parts[0]; // This is simplified - you might want more complex logic
};

// Get daily suggested challenge
export const getDailySuggestedChallenge = (userPreferences, completedChallenges = []) => {
  const availableChallenges = generatePersonalizedChallenges(userPreferences, 1, completedChallenges);
  const dailyChallenges = availableChallenges.filter(c => c.type === 'daily');
  
  if (dailyChallenges.length === 0) return null;
  
  // Weighted random selection favoring user preferences
  const preferredChallenges = dailyChallenges.filter(c => {
    const category = getChallengeCategory(c.id);
    const subcategory = getChallengeSubcategory(c.id);
    return userPreferences[category]?.includes(subcategory);
  });
  
  const selectedPool = preferredChallenges.length > 0 ? preferredChallenges : dailyChallenges;
  return selectedPool[Math.floor(Math.random() * selectedPool.length)];
};

// Get challenges by type
export const getChallengesByType = (challenges, type) => {
  return challenges.filter(challenge => challenge.type === type);
};

// Get challenges by difficulty
export const getChallengesByDifficulty = (challenges, difficulty) => {
  return challenges.filter(challenge => challenge.difficulty === difficulty);
};

// Calculate completion percentage for a user
export const calculateCompletionStats = (userPreferences, completedChallenges) => {
  const allUserChallenges = generatePersonalizedChallenges(userPreferences, 1, []);
  const completionRate = (completedChallenges.length / allUserChallenges.length) * 100;
  
  const statsByCategory = {};
  Object.keys(userPreferences).forEach(category => {
    const categoryChallenges = allUserChallenges.filter(c => getChallengeCategory(c.id) === category);
    const completedInCategory = completedChallenges.filter(c => getChallengeCategory(c.id) === category);
    
    statsByCategory[category] = {
      total: categoryChallenges.length,
      completed: completedInCategory.length,
      percentage: categoryChallenges.length > 0 ? (completedInCategory.length / categoryChallenges.length) * 100 : 0
    };
  });
  
  return {
    overall: Math.round(completionRate),
    byCategory: statsByCategory,
    totalChallenges: allUserChallenges.length,
    completedChallenges: completedChallenges.length
  };
};