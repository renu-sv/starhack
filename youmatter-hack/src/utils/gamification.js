import { load, save } from './storage'
const KEY = 'youmatter_user_v1'

export function initUser(profile = { name: 'Guest' }) {
  const existing = load(KEY)
  if (existing) return existing
  const user = {
    profile,
    points: 0,
    streak: 0,
    lastCompleted: null,
    badges: [],
    level: 1
  }
  save(KEY, user)
  return user
}

export function getUser() {
  return load(KEY, null)
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function completeChallenge({ id, points }) {
  const user = getUser()
  if (!user) return null

  // add points
  user.points = (user.points || 0) + (points || 0)

  // streak handling
  const today = todayISO()
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  if (user.lastCompleted === today) {
    // already completed today — don't increment streak (still allow points)
  } else if (user.lastCompleted === yesterday) {
    user.streak = (user.streak || 0) + 1
    user.lastCompleted = today
  } else {
    user.streak = 1
    user.lastCompleted = today
  }

  // simple badge rules
  if (user.streak >= 3 && !user.badges.includes('Streak Bronze')) {
    user.badges.push('Streak Bronze')
  }
  if (user.points >= 100 && !user.badges.includes('100 Points')) {
    user.badges.push('100 Points')
  }

  save(KEY, user)
  return user
}
