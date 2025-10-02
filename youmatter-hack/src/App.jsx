import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import LandingPage from './pages/LandingPage';
import BasicInfo from './pages/BasicInfo';
import GoalSelection from './pages/GoalSelection';
import SmartDashboard from './pages/SmartDashboard';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Landing & Onboarding */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/basic-info" element={<BasicInfo />} />
        <Route path="/goal-selection" element={<GoalSelection />} />
        
        {/* Main App */}
        <Route path="/dashboard" element={<SmartDashboard />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;