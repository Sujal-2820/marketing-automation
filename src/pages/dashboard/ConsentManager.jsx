import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldAlert, Database, Check } from 'lucide-react';

export default function ConsentManager() {
  const { customers, setCustomers } = useAppContext();
  const customer = customers[0];

  if (!customer) return null;

  const toggleConsent = (key) => {
    const updated = [...customers];
    updated[0].consent_flags[key] = !updated[0].consent_flags[key];
    setCustomers(updated);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Privacy & Consent</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Manage AI access control and real-time data redaction.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        
        {/* Left Side: Toggles */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <Database size={24} /> Raw Data Source
          </h3>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Toggle permissions below. Denied data is instantly stripped before reaching the AI.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {Object.entries(customer.consent_flags).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <strong style={{ textTransform: 'capitalize', fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>{key.replace('_', ' ')}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Used for personalization</span>
                  </div>
                  <button 
                    onClick={() => toggleConsent(key)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      borderRadius: '20px', 
                      border: 'none', 
                      background: value ? 'var(--accent-primary)' : 'var(--bg-main)',
                      color: value ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: '600',
                      width: '120px',
                      transition: 'all 0.2s',
                      boxShadow: value ? '0 4px 6px -1px rgba(79, 70, 229, 0.3)' : 'none'
                    }}
                  >
                    {value ? 'ALLOWED' : 'DENIED'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Redaction */}
        <div>
           <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <ShieldAlert size={24} color="var(--accent-vibrant)" /> Sanitized AI Ingestion
          </h3>
          <div className="glass-panel" style={{ background: '#0f172a', padding: '2rem', color: '#e2e8f0', fontFamily: 'monospace', minHeight: '400px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>// SYSTEM INIT: Context Window Payload<br/>// DATA SANITIZATION: ACTIVE</p>
            
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <span style={{ color: '#c678dd' }}>const</span> tokenized_user = {'{'}
              <div style={{ paddingLeft: '1rem' }}>
                id: <span style={{ color: '#98c379' }}>"usr_91A_xyz"</span>,
              </div>
              {'}'};
            </div>

            {!customer.consent_flags.purchase_history && (
              <div className="animate-fade-in" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', color: '#ef4444' }}>
                /* REDACTED: PURCHASE_HISTORY REVOKED */<br/>
                const purchase_vector = []; 
              </div>
            )}
            
            {customer.consent_flags.purchase_history && (
              <div className="animate-fade-in" style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <span style={{ color: '#c678dd' }}>const</span> purchase_vector = [<span style={{ color: '#d19a66' }}>12, 45</span>];
              </div>
            )}

            <p style={{ color: '#94a3b8', marginTop: '2rem' }}>&gt; AWAITING INFERENCE...</p>
          </div>
        </div>

      </div>
    </div>
  );
}
