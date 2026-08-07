import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function ConsentToggle() {
  const { customers, setCustomers } = useAppContext();
  const customer = customers[0];

  if (!customer) return null;

  const toggleConsent = (key) => {
    const updated = [...customers];
    updated[0].consent_flags[key] = !updated[0].consent_flags[key];
    setCustomers(updated);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Zero Trust Consent Manager</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Toggle permissions below. If 'Purchase History' is denied, the AI Engine will immediately drop all historical data before sending to the LLM.
      </p>
      
      {Object.entries(customer.consent_flags).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--glass-border)' }}>
          <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{key.replace('_', ' ')}</span>
          <button 
            onClick={() => toggleConsent(key)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px', 
              border: 'none', 
              background: value ? 'var(--success)' : 'var(--danger)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '120px',
              transition: 'all 0.2s'
            }}
          >
            {value ? 'ALLOWED' : 'DENIED'}
          </button>
        </div>
      ))}
    </div>
  );
}
