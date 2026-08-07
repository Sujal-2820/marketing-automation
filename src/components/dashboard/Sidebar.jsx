import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Radio, Activity, Settings, HelpCircle, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const navStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.25rem',
    borderRadius: '8px',
    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
    background: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s',
    marginBottom: '0.25rem'
  });

  return (
    <div style={{ width: '280px', background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <ShieldCheck color="var(--accent-primary)" /> Retailer OS
        </h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></span> Tenant Vault Secured
        </p>
      </div>

      <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', padding: '0 1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Intelligence</span>
        <NavLink to="/dashboard/command-center" style={navStyle}>
          <LayoutDashboard size={20} /> Command Center
        </NavLink>
        <NavLink to="/dashboard/consent-manager" style={navStyle}>
          <ShieldAlert size={20} /> Privacy & Consent
        </NavLink>
        <NavLink to="/dashboard/live-feed" style={navStyle}>
          <Radio size={20} /> Live AI Feed
        </NavLink>
        <NavLink to="/dashboard/analytics" style={navStyle}>
          <Activity size={20} /> ROI & Analytics
        </NavLink>
      </nav>

      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}>
          <Settings size={20} /> Settings
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}>
          <HelpCircle size={20} /> Support
        </button>
        <button className="btn-primary" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
          Upgrade Security
        </button>
      </div>
    </div>
  );
}
