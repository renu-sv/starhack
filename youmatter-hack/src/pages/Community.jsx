import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('all');
  
  // Get user preferences
  const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const [user] = useState({
    name: userPreferences.name || 'Vyshu',
    level: 12,
    avatar: '👩‍💼',
    points: 15420,
    followers: 1247,
    following: 892,
    posts: 156
  });

  // Community Groups
  const groups = [
    { id: 'all', name: 'All Communities', icon: '🌟', members: 15420, color: '#8b5cf6' },
    { id: 'fitness', name: 'Fitness Warriors', icon: '💪', members: 5234, color: '#10b981' },
    { id: 'mental', name: 'Mindful Living', icon: '🧘‍♀️', members: 3892, color: '#ec4899' },
    { id: 'finance', name: 'Money Masters', icon: '💰', members: 2156, color: '#f59e0b' },
    { id: 'insurance', name: 'Smart Coverage', icon: '🛡️', members: 1834, color: '#3b82f6' },
    { id: 'beginners', name: 'New Starters', icon: '🌱', members: 4567, color: '#06b6d4' }
  ];

  // Community Feed Data
  const [communityFeed] = useState([
    {
      id: 1,
      user: 'Alex Thompson',
      avatar: '👨‍💻',
      level: 15,
      timestamp: '2 hours ago',
      type: 'achievement',
      content: 'Just completed my 30-day meditation streak! 🧘‍♂️ The journey has been incredible. I feel more focused and peaceful than ever. Who wants to start a group challenge?',
      image: null,
      achievement: { name: 'Mindfulness Master', icon: '🏆', rarity: 'epic' },
      likes: 234,
      comments: 47,
      shares: 23,
      tags: ['meditation', 'mindfulness', 'streak'],
      group: 'mental'
    },
    {
      id: 2,
      user: 'Sarah Chen',
      avatar: '👩‍🎨',
      level: 18,
      timestamp: '4 hours ago',
      type: 'progress',
      content: 'Week 3 of my fitness transformation! Lost 5kg and gained so much confidence. The community support has been amazing! 💪',
      image: '🏃‍♀️',
      progress: { type: 'weight_loss', before: 75, after: 70, unit: 'kg' },
      likes: 567,
      comments: 89,
      shares: 45,
      tags: ['fitness', 'transformation', 'motivation'],
      group: 'fitness'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      avatar: '👨‍🏫',
      level: 12,
      timestamp: '6 hours ago',
      type: 'tip',
      content: 'Pro tip: I automated my savings and it\'s a game changer! Set up automatic transfers of ₹2000 every month. Small steps, big impact! 🚀',
      likes: 189,
      comments: 32,
      shares: 67,
      tags: ['finance', 'saving', 'automation'],
      group: 'finance'
    },
    {
      id: 4,
      user: 'Emma Wilson',
      avatar: '👩‍🔬',
      level: 14,
      timestamp: '8 hours ago',
      type: 'question',
      content: 'Need advice: What\'s the best health insurance plan for a family of 4? Looking for comprehensive coverage with good claim settlement. Any experiences to share?',
      likes: 45,
      comments: 78,
      shares: 12,
      tags: ['insurance', 'family', 'advice'],
      group: 'insurance'
    },
    {
      id: 5,
      user: 'David Kumar',
      avatar: '👨‍⚕️',
      level: 20,
      timestamp: '12 hours ago',
      type: 'challenge',
      content: 'Starting a 7-day hydration challenge! Goal: 3 liters of water daily. Who\'s in? Let\'s make it a group effort! 💧',
      challengeId: 'hydration-week',
      participants: 234,
      likes: 345,
      comments: 123,
      shares: 89,
      tags: ['challenge', 'health', 'hydration'],
      group: 'fitness'
    }
  ]);

  // Trending Topics
  const [trendingTopics] = useState([
    { tag: 'fitness-transformation', posts: 1247, growth: '+15%' },
    { tag: 'mental-health', posts: 892, growth: '+23%' },
    { tag: 'savings-goals', posts: 567, growth: '+8%' },
    { tag: 'insurance-tips', posts: 234, growth: '+45%' },
    { tag: 'wellness-journey', posts: 678, growth: '+12%' }
  ]);

  // Top Contributors
  const [topContributors] = useState([
    { name: 'Alex Thompson', avatar: '👨‍💻', points: 25670, badge: 'Community Leader', posts: 234 },
    { name: 'Sarah Chen', avatar: '👩‍🎨', points: 23450, badge: 'Fitness Guru', posts: 189 },
    { name: 'Mike Johnson', avatar: '👨‍🏫', points: 21890, badge: 'Money Mentor', posts: 156 },
    { name: 'Emma Wilson', avatar: '👩‍🔬', points: 20340, badge: 'Insurance Expert', posts: 134 },
    { name: 'You', avatar: '👩‍💼', points: 15420, badge: 'Rising Star', posts: 156, isUser: true }
  ]);

  const filteredFeed = selectedGroup === 'all' 
    ? communityFeed 
    : communityFeed.filter(post => post.group === selectedGroup);

  const PostCard = ({ post }) => (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      marginBottom: '1.5rem'
    }}>
      {/* Post Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          position: 'relative'
        }}>
          {post.avatar}
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            background: '#10b981',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: '700',
            border: '2px solid white'
          }}>
            {post.level}
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.25rem'
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              {post.user}
            </h4>
            {post.type === 'achievement' && (
              <span style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                🏆 Achievement
              </span>
            )}
          </div>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            margin: 0
          }}>
            {post.timestamp} • {groups.find(g => g.id === post.group)?.name}
          </p>
        </div>

        <button style={{
          background: 'none',
          border: 'none',
          color: '#6b7280',
          cursor: 'pointer',
          fontSize: '1.5rem'
        }}>
          ⋯
        </button>
      </div>

      {/* Post Content */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{
          fontSize: '1rem',
          color: '#374151',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>
          {post.content}
        </p>

        {/* Achievement Display */}
        {post.achievement && (
          <div style={{
            background: 'linear-gradient(135deg, #fef7ff, #f0f9ff)',
            borderRadius: '16px',
            padding: '1rem',
            border: '2px solid #e879f9',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2rem'
              }}>
                {post.achievement.icon}
              </div>
              <div>
                <h5 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#7c3aed',
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>
                  {post.achievement.name}
                </h5>
                <span style={{
                  background: '#ddd6fe',
                  color: '#5b21b6',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {post.achievement.rarity}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Progress Display */}
        {post.progress && (
          <div style={{
            background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
            borderRadius: '16px',
            padding: '1rem',
            border: '2px solid #10b981',
            marginBottom: '1rem'
          }}>
            <h5 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#047857',
              marginBottom: '0.5rem'
            }}>
              📊 Progress Update
            </h5>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#dc2626'
                }}>
                  {post.progress.before}{post.progress.unit}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6b7280'
                }}>
                  Before
                </div>
              </div>
              <div style={{
                fontSize: '2rem',
                color: '#10b981'
              }}>
                →
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  {post.progress.after}{post.progress.unit}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6b7280'
                }}>
                  Current
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenge Display */}
        {post.challengeId && (
          <div style={{
            background: 'linear-gradient(135deg, #fff7ed, #fef3c7)',
            borderRadius: '16px',
            padding: '1rem',
            border: '2px solid #f59e0b',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h5 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '0.25rem'
                }}>
                  🎯 Community Challenge
                </h5>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#92400e',
                  margin: 0
                }}>
                  {post.participants} participants joined
                </p>
              </div>
              <button style={{
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Join Challenge
              </button>
            </div>
          </div>
        )}

        {/* Tags */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          {post.tags?.map(tag => (
            <span
              key={tag}
              style={{
                background: '#f3f4f6',
                color: '#6b7280',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #f3f4f6',
        paddingTop: '1rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '2rem'
        }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            ❤️ {post.likes}
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            💬 {post.comments}
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            🔗 {post.shares}
          </button>
        </div>

        <button style={{
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Reply
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                👥 Community Hub
              </h1>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                margin: 0
              }}>
                Connect, share, and grow together on your wellness journey
              </p>
            </div>

            <button
              onClick={() => setShowCreatePost(true)}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              ✨ Share Your Story
            </button>
          </div>

          {/* User Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'Your Posts', value: user.posts, icon: '📝', color: '#8b5cf6' },
              { label: 'Followers', value: user.followers.toLocaleString(), icon: '👥', color: '#10b981' },
              { label: 'Following', value: user.following.toLocaleString(), icon: '➕', color: '#f59e0b' },
              { label: 'Community Points', value: user.points.toLocaleString(), icon: '⭐', color: '#ef4444' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: stat.color,
                  marginBottom: '0.25rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Community Groups Filter */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}>
            {groups.map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                style={{
                  background: selectedGroup === group.id ? group.color : 'white',
                  color: selectedGroup === group.id ? 'white' : '#6b7280',
                  border: selectedGroup === group.id ? 'none' : '1px solid #e5e7eb',
                  padding: '0.75rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{group.icon}</span>
                <span>{group.name}</span>
                <span style={{
                  background: selectedGroup === group.id 
                    ? 'rgba(255,255,255,0.3)' 
                    : '#f3f4f6',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem'
                }}>
                  {group.members.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem'
        }}>
          {/* Main Feed */}
          <div>
            {filteredFeed.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Sidebar */}
          <div>
            {/* Top Contributors */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                🏆 Top Contributors
              </h3>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {topContributors.map((contributor, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: contributor.isUser ? '#f0f9ff' : '#f9fafb',
                      borderRadius: '12px',
                      border: contributor.isUser ? '2px solid #3b82f6' : '1px solid #f3f4f6'
                    }}
                  >
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: index < 3 
                        ? `linear-gradient(135deg, ${
                            index === 0 ? '#ffd700, #ff8c00' :
                            index === 1 ? '#c0c0c0, #999999' :
                            '#cd7f32, #8b4513'
                          })`
                        : 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: index < 3 ? '#000' : '#fff'
                    }}>
                      {index < 3 ? (index + 1) : contributor.avatar}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {contributor.name}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {contributor.points.toLocaleString()} pts • {contributor.posts} posts
                      </p>
                    </div>
                    
                    <span style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {contributor.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                📈 Trending Topics
              </h3>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f9fafb';
                    }}
                  >
                    <div>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        #{topic.tag}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {topic.posts} posts
                      </p>
                    </div>
                    
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#10b981'
                    }}>
                      {topic.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;