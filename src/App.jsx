import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StoreHome from './pages/StoreHome';
import Dashboard from './pages/Dashboard';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        {/* Persistent Demo Navigation Bar - Light Mode */}
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
          <Link to="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>⚙️ Retailer Dashboard</Link>
        </div>
        
        <div style={{ paddingTop: '80px', paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<StoreHome />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
