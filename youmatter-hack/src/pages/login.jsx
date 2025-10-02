import React from 'react'
import { useNavigate } from 'react-router-dom'
import { initUser } from '../utils/gamification'

export default function Login() {
  const nav = useNavigate()
  const handleLogin = (name = 'Harshitha') => {
    initUser({ name })
    nav('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">Welcome to Wellness Quest</h2>
        <p className="text-sm text-gray-600 mb-6">Start your wellness journey today</p>

        <button onClick={() => handleLogin('Harshitha')} className="w-full bg-primary text-white py-3 rounded-md mb-3">
          Continue as Harshitha (Demo)
        </button>

        <button onClick={() => handleLogin('Guest')} className="w-full border border-gray-200 py-3 rounded-md">
          Continue as Guest
        </button>
      </div>
    </div>
  )
}
