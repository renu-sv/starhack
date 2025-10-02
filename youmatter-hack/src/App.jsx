import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BasicInfo from './pages/BasicInfo';
import GoalSelection from './pages/GoalSelection';
import SmartDashboard from './pages/SmartDashboard';
import PredictiveChallenges from './pages/PredictiveChallenges';
import ChallengeCompletion from './pages/ChallengeCompletion';
import Community from './pages/Community';
import Challenges from './pages/Challenges';
import Rewards from './pages/Rewards';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/basic-info" element={<BasicInfo />} />
            <Route path="/goal-selection" element={<GoalSelection />} />
            {/* Removed /onboarding route */}
            <Route path="/dashboard" element={<SmartDashboard />} />
            <Route path="/predictive-challenges" element={<PredictiveChallenges />} />
            <Route path="/challenge-completion" element={<ChallengeCompletion />} />
            <Route path="/community" element={<Community />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;