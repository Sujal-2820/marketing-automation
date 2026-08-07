import React, { useState, useEffect } from 'react';
import AdBanner from '../components/store/AdBanner';
import ProductGrid from '../components/store/ProductGrid';
import CustomerLogin from '../components/store/CustomerLogin';
import { useAppContext } from '../context/AppContext';
import { Shield, Bell, User, ChevronLeft, Send, Sparkles, AlertTriangle, RefreshCw, Menu, X, MessageSquare } from 'lucide-react';

export default function StoreHome() {
  const { customers, updateCustomer, campaigns } = useAppContext();
  
  // Active Customer Session State
  const [activePersona, setActivePersona] = useState({
    name: 'Rahul',
    segmentLabel: 'Gym Freak',
    tokenId: 'usr_sports_042',
    storeName: 'APEX SPORTS'
  });
  
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [purchaseToast, setPurchaseToast] = useState(null);
  
  // SMS Notification Toast State (Shown at top in fade-in manner)
  const [showSmsToast, setShowSmsToast] = useState(true);

  // Mobile Navigation Drawer Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Customer Object
  const currentCustomer = customers.find(c => c.token_id === activePersona.tokenId) || {
    token_id: activePersona.tokenId,
    segments: ['Gym Freak', 'Marathon Runner'],
    purchase_history: ['1x Nike ZoomX'],
    consent_flags: { location: true, age: true, purchase_history: true }
  };

  // Re-enable SMS Toast when persona switches
  useEffect(() => {
    setShowSmsToast(true);
  }, [activePersona.tokenId]);

  // Consent Toggles handler
  const handleToggleConsent = (flagKey) => {
    const currentFlags = currentCustomer.consent_flags || { location: true, age: true, purchase_history: true };
    const newFlags = { ...currentFlags, [flagKey]: !currentFlags[flagKey] };
    updateCustomer(currentCustomer.token_id, { consent_flags: newFlags });
  };

  // Purchase Toast handler
  const handlePurchaseSuccess = (product, mutated, newSegment) => {
    setPurchaseToast({
      title: `Purchase Recorded: ${product.name}`,
      message: mutated ? `Behavioral profile updated to [${newSegment}] → Re-ranking live ads...` : `Added to order history. Re-ranking recommendations...`
    });

    setTimeout(() => {
      setPurchaseToast(null);
    }, 4500);
  };

  // Matched Campaign for SMS Simulator & Top Toast
  const matchedCampaign = (campaigns && campaigns.length > 0) ?
    (campaigns.find(c => currentCustomer.segments?.includes(c.target)) || campaigns[0]) :
    {
      target: 'Gym Freak',
      smsCopy: 'Bhai gym apparel ka naya stock aagaya hai! Surprize flat 30% discount sirf aaj ke liye valid hai. Abhi claim karo: apexsports.store/gym'
    };

  if (isLoggedOut) {
    return (
      <CustomerLogin 
        onLoginSuccess={(persona) => {
          setActivePersona(persona);
          setIsLoggedOut(false);
          setShowSmsToast(true);
        }} 
      />
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem 1.5rem 4rem 1.5rem', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
      
      {/* ---------------- 0. TOP FADE-IN SMS NOTIFICATION TOAST ---------------- */}
      {showSmsToast && (
        <div 
          className="animate-fade-in"
          style={{ 
            position: 'fixed', 
            top: '1.5rem', 
            right: '1.5rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
            color: 'white', 
            padding: '1.25rem 1.5rem', 
            borderRadius: '20px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            zIndex: 10000,
            maxWidth: '440px',
            width: 'calc(100vw - 3rem)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Header Row with Title & Top-Right Cross (X) Close Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'rgba(79, 70, 229, 0.3)', padding: '0.4rem', borderRadius: '10px', color: '#38bdf8', display: 'flex', alignItems: 'center' }}>
                <MessageSquare size={16} />
              </div>
              <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#f8fafc', letterSpacing: '0.3px' }}>
                📲 SMS Notification from {activePersona.storeName || 'APEX SPORTS'}
              </span>
            </div>

            {/* Top-Right Cross Button */}
            <button 
              onClick={() => setShowSmsToast(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#cbd5e1',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Close Notification"
            >
              <X size={14} />
            </button>
          </div>

          {/* SMS Body Copy */}
          <div style={{ 
            fontSize: '0.88rem', 
            color: '#e2e8f0', 
            lineHeight: '1.5', 
            background: 'rgba(255,255,255,0.06)', 
            padding: '0.85rem 1rem', 
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {matchedCampaign?.smsCopy}
          </div>
        </div>
      )}

      {/* ---------------- 1. RESPONSIVE TOP NAVBAR (PROPER DESKTOP SPACING & MOBILE HAMBURGER) ---------------- */}
      <header className="store-header">
        
        {/* Left: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.15rem', boxShadow: '0 4px 10px rgba(79,70,229,0.3)' }}>
            ▲
          </div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', letterSpacing: '0.5px', color: '#0f172a' }}>
            {activePersona.storeName || 'APEX SPORTS'}
          </h1>
        </div>

        {/* Center: Desktop Navigation Links (Spaced Out) */}
        <nav className="desktop-nav" style={{ margin: '0 4rem' }}>
          <span style={{ color: 'var(--accent-primary)', cursor: 'pointer', borderBottom: '2.5px solid var(--accent-primary)', paddingBottom: '0.35rem', fontWeight: '700' }}>Shop</span>
          <span style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text-secondary)' }}>Categories</span>
          <span style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text-secondary)' }}>Deals</span>
        </nav>

        {/* Right: Desktop Controls (Aligned to far right) */}
        <div className="desktop-controls">
          
          {/* Active Token Badge */}
          <div style={{ 
            background: 'white', 
            border: '1px solid var(--border-color)', 
            padding: '0.45rem 0.95rem', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontFamily: 'monospace',
            color: 'var(--text-secondary)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            Token: #{currentCustomer.token_id}
          </div>

          {/* Privacy Hub Icon */}
          <button 
            onClick={() => document.getElementById('privacy-vault').scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'white', border: '1px solid var(--border-color)', padding: '0.55rem', borderRadius: '50%', cursor: 'pointer', color: '#475569', boxShadow: '0 2px 5px rgba(0,0,0,0.04)' }}
            title="Privacy Vault"
          >
            <Shield size={18} />
          </button>

          {/* SMS Bell Icon */}
          <button 
            onClick={() => setShowSmsToast(true)}
            style={{ background: 'white', border: '1px solid var(--border-color)', padding: '0.55rem', borderRadius: '50%', cursor: 'pointer', color: '#475569', boxShadow: '0 2px 5px rgba(0,0,0,0.04)' }}
            title="Show SMS Notification Toast"
          >
            <Bell size={18} />
          </button>

          {/* Persona Switcher Button */}
          <button 
            onClick={() => setIsLoggedOut(true)}
            style={{ 
              background: 'linear-gradient(135deg, #ffffff, #f8fafc)', 
              border: '1px solid var(--border-color)', 
              padding: '0.5rem 1.1rem', 
              borderRadius: '20px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}
          >
            <User size={16} /> {activePersona.name} <RefreshCw size={12} style={{ color: 'var(--accent-primary)' }} />
          </button>

        </div>

        {/* Smartphone Mobile Hamburger Icon */}
        <button 
          className="mobile-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'white', border: '1px solid var(--border-color)', padding: '0.55rem', borderRadius: '10px', cursor: 'pointer' }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Smartphone Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="animate-fade-in" style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            background: 'white', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
            borderRadius: '16px', 
            padding: '1.5rem', 
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0f172a' }}>Navigation Menu</div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Shop</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Categories</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Deals</span>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                Active Token: #{currentCustomer.token_id}
              </div>
              <button 
                onClick={() => { setIsLoggedOut(true); setMobileMenuOpen(false); }}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'var(--accent-primary)', color: 'white', border: 'none', fontWeight: 'bold' }}
              >
                Switch Persona ({activePersona.name})
              </button>
            </div>
          </div>
        )}

      </header>

      {/* ---------------- 2. HERO DYNAMIC BANNER ---------------- */}
      <AdBanner activeCustomer={currentCustomer} />

      {/* ---------------- 3. DYNAMIC PRODUCT GRID ---------------- */}
      <ProductGrid 
        activeCustomer={currentCustomer} 
        onPurchaseSuccess={handlePurchaseSuccess} 
      />

      {/* ---------------- 4. BOTTOM SECTION: PRIVACY VAULT & SMS SIMULATOR (RESPONSIVE GRID) ---------------- */}
      <div className="bottom-cards-grid">
        
        {/* Left Card: My Data Privacy & Consent Vault */}
        <div id="privacy-vault" className="glass-panel" style={{ padding: '2rem', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.6rem', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <Shield size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                My Data Privacy & Consent Vault
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                Manage how {activePersona.storeName || 'APEX SPORTS'} personalizes your experience.
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: '500' }}>
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>Warning: Turning off Purchase History will immediately revert ads to generic fallbacks.</span>
          </div>

          {/* Toggle Switches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Toggle 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>Purchase History</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Used to recommend related products and personalized banners.</span>
              </div>
              <button 
                onClick={() => handleToggleConsent('purchase_history')}
                style={{ 
                  width: '48px', 
                  height: '26px', 
                  borderRadius: '13px', 
                  background: currentCustomer.consent_flags?.purchase_history !== false ? 'var(--accent-primary)' : '#cbd5e1', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: currentCustomer.consent_flags?.purchase_history !== false ? '25px' : '3px', transition: 'all 0.2s' }} />
              </button>
            </div>

            {/* Toggle 2 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>Precise Location</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>For hyper-local store offers and express delivery estimates.</span>
              </div>
              <button 
                onClick={() => handleToggleConsent('location')}
                style={{ 
                  width: '48px', 
                  height: '26px', 
                  borderRadius: '13px', 
                  background: currentCustomer.consent_flags?.location ? 'var(--accent-primary)' : '#cbd5e1', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: currentCustomer.consent_flags?.location ? '25px' : '3px', transition: 'all 0.2s' }} />
              </button>
            </div>

            {/* Toggle 3 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>Hinglish SMS Campaigns</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Receive localized, culturally relevant text alerts.</span>
              </div>
              <button 
                onClick={() => handleToggleConsent('age')}
                style={{ 
                  width: '48px', 
                  height: '26px', 
                  borderRadius: '13px', 
                  background: currentCustomer.consent_flags?.age !== false ? 'var(--accent-primary)' : '#cbd5e1', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: currentCustomer.consent_flags?.age !== false ? '25px' : '3px', transition: 'all 0.2s' }} />
              </button>
            </div>

          </div>
        </div>

        {/* Right Card: Smartphone Mobile SMS Simulator */}
        <div id="sms-simulator" className="glass-panel" style={{ 
          padding: '1.25rem', 
          background: 'white', 
          borderRadius: '24px', 
          boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Smartphone Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <ChevronLeft size={20} style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0f172a' }}>{activePersona.storeName || 'APEX SPORTS'}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Verified Store ID</div>
            </div>
            <div style={{ width: '20px' }}></div>
          </div>

          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center', marginBottom: '1rem' }}>Today 10:42 AM</div>

          {/* SMS Message Bubble */}
          <div style={{ 
            background: 'rgba(79, 70, 229, 0.12)', 
            border: '1px solid rgba(79, 70, 229, 0.2)',
            borderRadius: '18px 18px 18px 4px', 
            padding: '1.25rem', 
            fontSize: '0.9rem', 
            color: '#1e1b4b',
            lineHeight: '1.5',
            marginBottom: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {matchedCampaign?.smsCopy}
          </div>

          {/* Dummy Input bar */}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.5rem 0.75rem', borderRadius: '20px' }}>
            <input 
              type="text" 
              placeholder="Text Message" 
              readOnly 
              style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', fontSize: '0.85rem' }} 
            />
            <Send size={16} style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} />
          </div>

        </div>

      </div>

      {/* ---------------- 5. LIVE PURCHASE TOAST NOTIFICATION ---------------- */}
      {purchaseToast && (
        <div 
          className="animate-fade-in"
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            right: '2rem',
            background: '#0f172a', 
            color: 'white', 
            padding: '1.25rem 1.75rem', 
            borderRadius: '16px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            maxWidth: '420px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '0.6rem', borderRadius: '12px', color: 'white', flexShrink: 0 }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#f8fafc', marginBottom: '0.2rem' }}>
              ⚡ {purchaseToast.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
              {purchaseToast.message}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
