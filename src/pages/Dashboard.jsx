import React from 'react';
import ConsentToggle from '../components/dashboard/ConsentToggle';
import CampaignFeed from '../components/dashboard/CampaignFeed';

export default function Dashboard() {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--accent-secondary)', letterSpacing: '-1px' }}>Retailer Control Center</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Monitor Agentic Workflows & Zero Trust Consent</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div>
          <ConsentToggle />
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
             <h3 style={{ margin: '0 0 1rem 0' }}>Multi-Agent Status</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                 <span>Ingestion Agent (Zero Trust)</span> 
                 <strong style={{ color: 'var(--success)' }}>🟢 Online</strong>
               </p>
               <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                 <span>Behavioral Agent (STP Engine)</span> 
                 <strong style={{ color: 'var(--success)' }}>🟢 Online</strong>
               </p>
               <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                 <span>Promotional Agent (RAG Fusion)</span> 
                 <strong style={{ color: 'var(--success)' }}>🟢 Online</strong>
               </p>
             </div>
          </div>
        </div>
        <div>
          <CampaignFeed />
        </div>
      </div>
    </div>
  );
}
