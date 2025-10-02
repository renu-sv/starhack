export const load = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.error('storage load err', err)
    return fallback
  }
}

export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('storage save err', err)
  }
}
