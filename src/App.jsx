import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import StoreHome from './pages/StoreHome';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './pages/DashboardLayout';
import CommandCenter from './pages/dashboard/CommandCenter';
import ConsentManager from './pages/dashboard/ConsentManager';
import LiveFeed from './pages/dashboard/LiveFeed';
import Analytics from './pages/dashboard/Analytics';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Routes>
            {/* Customer Facing */}
            <Route path="/" element={<StoreHome />} />
            
            {/* Retailer Flow */}
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="command-center" replace />} />
              <Route path="command-center" element={<CommandCenter />} />
              <Route path="consent-manager" element={<ConsentManager />} />
              <Route path="live-feed" element={<LiveFeed />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
