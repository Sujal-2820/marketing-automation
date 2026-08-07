import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import StoreHome from './pages/StoreHome';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './pages/DashboardLayout';
import CommandCenter from './pages/dashboard/CommandCenter';
import ConsentManager from './pages/dashboard/ConsentManager';
import LiveFeed from './pages/dashboard/LiveFeed';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        {/* Universal Top Nav for jumping between sandbox and OS during pitch */}
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)',
          padding: '1rem 2rem', 
          display: 'flex', 
          alignItems: 'center',
          gap: '2rem', 
          zIndex: 9999, 
          borderBottom: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)'
        }}>
          <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)', letterSpacing: '2px', fontSize: '0.8rem' }}>DEMO NAVIGATION</span>
          <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>🛍️ Customer Sandbox</Link>
          <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>⚙️ Retailer OS Login</Link>
        </div>
        
        <div style={{ paddingTop: '60px' }}>
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
              {/* Dummy route for analytics to prevent crash if clicked */}
              <Route path="analytics" element={<div style={{padding:'2rem'}}>Analytics coming soon</div>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
