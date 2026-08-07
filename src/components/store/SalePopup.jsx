import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function SalePopup() {
  const { campaigns, setCampaigns } = useAppContext();
  
  if (!campaigns.popup) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
      <div className="glass-panel animate-fade-in animate-pulse-slow" style={{ padding: '2.5rem', maxWidth: '450px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(245, 158, 11, 0.4))', border: '1px solid var(--warning)' }}>
        <h2 style={{ color: '#fff', margin: '0 0 1rem 0', fontSize: '2.2rem' }}>{campaigns.popup.title}</h2>
        <p style={{ margin: '0 0 2rem 0', fontSize: '1.2rem', lineHeight: 1.5 }}>{campaigns.popup.message}</p>
        <button 
          onClick={() => setCampaigns({ ...campaigns, popup: null })}
          style={{ padding: '0.75rem 2rem', background: '#fff', border: 'none', borderRadius: '8px', color: '#000', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          Claim Fusion Offer
        </button>
      </div>
    </div>
  );
}
