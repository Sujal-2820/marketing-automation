import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function CustomerLogin({ onLoginSuccess }) {
  const { customers, setCustomers } = useAppContext();
  
  // Local form state
  const [identityInput, setIdentityInput] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(null);

  // Demo personas corresponding to data files
  const demoPersonas = [
    {
      name: 'Rahul',
      segmentLabel: 'Gym Freak',
      tokenId: 'usr_sports_042',
      segments: ['Gym Freak', 'Marathon Runner'],
      storeType: 'sports',
      storeName: 'APEX SPORTS'
    },
    {
      name: 'Ananya',
      segmentLabel: 'Tech',
      tokenId: 'usr_tech_012',
      segments: ['Gamer', 'Audioophile'],
      storeType: 'tech',
      storeName: 'TECHZONE'
    },
    {
      name: 'Vikram',
      segmentLabel: 'Gourmet Grocery',
      tokenId: 'usr_grocery_008',
      segments: ['Health Conscious', 'Organic Shopper'],
      storeType: 'grocery',
      storeName: 'FRESHMART'
    },
    {
      name: 'Sneha',
      segmentLabel: 'Home Decor',
      tokenId: 'usr_home_021',
      segments: ['Decor Enthusiast', 'Plant Parent'],
      storeType: 'home',
      storeName: 'HOMEVIBE'
    }
  ];

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona);
    setIdentityInput(`${persona.name.toLowerCase()}@nexus.vault`);
  };

  const handleAuthenticate = (e) => {
    e.preventDefault();
    const persona = selectedPersona || demoPersonas[0];
    
    // Ensure active customer exists in state
    let activeCustomer = customers.find(c => c.token_id === persona.tokenId);
    if (!activeCustomer) {
      activeCustomer = {
        token_id: persona.tokenId,
        segments: persona.segments,
        purchase_history: ['1x Nike ZoomX', '2x Whey Protein'],
        consent_flags: { location: true, age: true, purchase_history: true }
      };
      setCustomers([activeCustomer, ...customers]);
    }
    
    // Notify parent
    if (onLoginSuccess) {
      onLoginSuccess(persona);
    }
  };

  return (
    <div style={{ 
      minHeight: '85vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justify: 'center', 
      padding: '2rem 1rem' 
    }}>
      
      {/* Brand Icon */}
      <div style={{ 
        background: 'white', 
        padding: '1.25rem', 
        borderRadius: '24px', 
        boxShadow: '0 12px 30px rgba(79, 70, 229, 0.12)',
        marginBottom: '1.25rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{ 
          width: '42px', 
          height: '42px', 
          borderRadius: '12px', 
          background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)', 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'center', 
          color: 'white',
          fontWeight: '900',
          fontSize: '1.2rem'
        }}>
          ▲
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: '800', letterSpacing: '1px', fontSize: '1rem', color: '#0f172a' }}>
            APEX SPORTS & TECH
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Omnichannel Storefront
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        background: 'rgba(16, 185, 129, 0.12)', 
        color: '#047857', 
        padding: '0.4rem 1.25rem', 
        borderRadius: '20px', 
        fontSize: '0.85rem', 
        fontWeight: '600',
        marginBottom: '2rem',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}>
        <ShieldCheck size={16} />
        Tenant Vault Secured (Tokenized Identity)
      </div>

      {/* Main Login Card */}
      <div className="glass-panel animate-fade-in" style={{ 
        width: '100%', 
        maxWidth: '480px', 
        padding: '2.5rem', 
        background: 'white',
        boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.12)',
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px', color: '#0f172a' }}>
          Welcome Back
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0 0 2rem 0' }}>
          Enter your credentials to access your secure vault.
        </p>

        <form onSubmit={handleAuthenticate}>
          
          <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Customer Email / Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text"
                placeholder="Enter your identity"
                value={identityInput}
                onChange={e => setIdentityInput(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.85rem 1rem 0.85rem 2.75rem', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)', 
                  fontSize: '0.95rem',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
          </div>

          {/* Quick Demo Persona Selector */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Or Select a Demo Persona
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {demoPersonas.map(persona => {
                const isSelected = selectedPersona?.tokenId === persona.tokenId;
                return (
                  <button
                    key={persona.tokenId}
                    type="button"
                    onClick={() => handleSelectPersona(persona)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(79, 70, 229, 0.06)' : 'white',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                      fontWeight: isSelected ? '700' : '500',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justify: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <UserCheck size={16} />
                    {persona.name} - {persona.segmentLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zero-Trust Callout */}
          <div style={{ 
            background: 'rgba(79, 70, 229, 0.04)', 
            border: '1px solid rgba(79, 70, 229, 0.12)', 
            borderRadius: '14px', 
            padding: '1rem', 
            textAlign: 'left',
            display: 'flex',
            gap: '0.85rem',
            alignItems: 'flex-start',
            marginBottom: '1.75rem'
          }}>
            <Lock size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#1e1b4b', marginBottom: '0.2rem' }}>
                Zero-Trust Architecture
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: '1.4' }}>
                Your personal identity is tokenized. The store's ad engine only sees encrypted Token IDs, ensuring complete privacy.
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '12px', 
              fontSize: '1rem', 
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            Authenticate & Enter Store <ArrowRight size={18} />
          </button>

        </form>
      </div>

      <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        🛡️ Protected by Tenant Vault Security Guardrails
      </div>

    </div>
  );
}
