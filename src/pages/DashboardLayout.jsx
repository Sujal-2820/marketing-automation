import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '-0.5px' }}>Retailer OS</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '600', padding: '0.5rem 1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '20px' }}>AI Agents Active</span>
             <span style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: '600', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px' }}>Zero Trust Secured</span>
          </div>
        </header>
        
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
