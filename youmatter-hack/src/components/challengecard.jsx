import React from 'react'

export default function ChallengeCard({ challenge, onComplete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold text-gray-800">{challenge.title}</div>
        <div className="text-sm text-gray-500">{challenge.description}</div>
        <div className="text-xs text-gray-500 mt-1">{challenge.points} pts</div>
      </div>
      <button
        onClick={() => onComplete(challenge)}
        className="ml-4 bg-primary text-white px-3 py-2 rounded-md hover:opacity-95"
      >
        Mark Done
      </button>
    </div>
  )
}
