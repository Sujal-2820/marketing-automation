import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function CampaignFeed() {
  const { campaigns } = useAppContext();

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Live AI Generated Campaigns</h3>
      
      {!campaigns.banner && <p style={{ color: 'var(--text-secondary)' }}>No active campaigns. Wait for customer Sandbox Event.</p>}
      
      {campaigns.banner && (
        <div className="animate-fade-in" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-primary)' }}>Hero Banner Output</h4>
          <p style={{ margin: 0, fontSize: '1.1rem' }}><strong>{campaigns.banner.title}</strong></p>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)' }}>{campaigns.banner.subtitle}</p>
        </div>
      )}

      {campaigns.popup && (
        <div className="animate-fade-in" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--warning)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--warning)' }}>Targeted Fusion Popup</h4>
          <p style={{ margin: 0, fontSize: '1.1rem' }}><strong>{campaigns.popup.title}</strong></p>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)' }}>{campaigns.popup.message}</p>
        </div>
      )}

      {campaigns.sms && (
        <div className="animate-fade-in" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--success)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--success)' }}>SMS / WhatsApp Payload</h4>
          <p style={{ margin: 0, fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '4px' }}>"{campaigns.sms}"</p>
        </div>
      )}
    </div>
  );
}
