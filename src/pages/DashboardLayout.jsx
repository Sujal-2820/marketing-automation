import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '-0.5px' }}>Retailer OS</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your privacy-first marketing control panel
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
             
             {/* Quick Storefront Link for Demo Presenter */}
             <Link 
               to="/" 
               target="_blank"
               style={{ 
                 fontSize: '0.9rem', 
                 color: 'white', 
                 fontWeight: '700', 
                 padding: '0.6rem 1.25rem', 
                 background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)', 
                 borderRadius: '20px',
                 textDecoration: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '0.5rem',
                 boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
               }}
             >
               🌐 Open Customer Store <ExternalLink size={14} />
             </Link>

             <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: '600', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               <ShieldCheck size={14} /> Vault Secured
             </span>
          </div>
        </header>
        
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
