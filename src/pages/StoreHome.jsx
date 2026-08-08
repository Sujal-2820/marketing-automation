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

  // Active Customer Object from global state
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
    const currentValue = currentFlags[flagKey] !== false; // Default to true if undefined
    const newFlags = { ...currentFlags, [flagKey]: !currentValue };
    
    updateCustomer(currentCustomer.token_id, { consent_flags: newFlags });
  };

  // Purchase Toast handler
  const handlePurchaseSuccess = (product, mutated, newSegment) => {
    if (mutated) {
      setShowSmsToast(true);
    }
    setPurchaseToast({
      title: `Purchase Recorded: ${product.name}`,
      message: mutated ? `Behavioral profile updated to [${newSegment}] → Re-ranking live ads...` : `Added to order history. Re-ranking recommendations...`
    });

    setTimeout(() => {
      setPurchaseToast(null);
    }, 4500);
  };

  // Matched Campaign for SMS Simulator & Top Toast (Prioritizing primary segment first)
  const custSegs = currentCustomer.segments || ['Gym Freak'];
  let matchedCampaign = null;
  if (campaigns && campaigns.length > 0) {
    for (const seg of custSegs) {
      const found = campaigns.find(c => c.target === seg);
      if (found) {
        matchedCampaign = found;
        break;
      }
    }
    if (!matchedCampaign) matchedCampaign = campaigns[0];
  } else {
    matchedCampaign = {
      target: 'Gym Freak',
      smsCopy: 'Bhai gym apparel ka naya stock aagaya hai! Surprize flat 30% discount sirf aaj ke liye valid hai. Abhi claim karo: apexsports.store/gym'
    };
  }

  // Subtle Cross-Category SMS Copy Adaptation
  let activeSmsCopy = matchedCampaign?.smsCopy;
  if (custSegs.length > 1) {
    const primary = custSegs[0];
    const secondary = custSegs[1];
    if (primary === 'Gamer' && custSegs.includes('Gym Freak')) {
      activeSmsCopy = "Bhai long gaming stream aur workout dono sorted! ANC headphones & activewear pe flat 25% combo discount active hai: store.com/deal";
    } else if (primary === 'Decor' && custSegs.includes('Gym Freak')) {
      activeSmsCopy = "Heavy workout ke baad relaxing home vibes! Warm LED Nordic lamps now at 25% off for active members: homevibe.store/decor";
    } else if (primary === 'Snack Lover' && custSegs.includes('Gym Freak')) {
      activeSmsCopy = "Gym protein & crunchy snacks bundle! 20g protein bars & organic almond milk ab combo price pe available hain: freshmart.store/deal";
    } else if (primary === 'Gym Freak' && custSegs.includes('Gamer')) {
      activeSmsCopy = "Workout beats & extreme gaming! ANC noise-cancelling headphones & runners now on special bundle discount: apexsports.store/deal";
    } else {
      activeSmsCopy = `Special ${primary} & ${secondary} combo offer unlocked! Check out exclusive deals tailored for your updated buying pattern: store.com/deal`;
    }
  }

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

  const isPurchaseHistoryAllowed = currentCustomer.consent_flags?.purchase_history !== false;
  const isLocationAllowed = currentCustomer.consent_flags?.location !== false;
  const isSmsAllowed = currentCustomer.consent_flags?.age !== false;

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
            {activeSmsCopy}
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
            <span>Turning off Shopping History will switch your ads to generic offers immediately.</span>
          </div>

          {/* Toggle Switches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Toggle 1: Purchase History */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>Shopping History</strong>
                  <span style={{ fontSize: '0.72rem', background: isPurchaseHistoryAllowed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: isPurchaseHistoryAllowed ? '#047857' : '#dc2626', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '700' }}>
                    {isPurchaseHistoryAllowed ? 'ALLOWED' : 'DENIED'}
                  </span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Lets us recommend products and deals based on what you buy.
                </span>
              </div>

              {/* Interactive Switch */}
              <button 
                type="button"
                onClick={() => handleToggleConsent('purchase_history')}
                style={{ 
                  width: '54px', 
                  height: '28px', 
                  borderRadius: '14px', 
                  background: isPurchaseHistoryAllowed ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#cbd5e1', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  outline: 'none',
                  boxShadow: isPurchaseHistoryAllowed ? '0 4px 10px rgba(79, 70, 229, 0.3)' : 'none'
                }}
              >
                <div style={{ 
                  width: '22px', 
                  height: '22px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  position: 'absolute', 
                  top: '3px', 
                  left: isPurchaseHistoryAllowed ? '29px' : '3px', 
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
                }} />
              </button>
            </div>

            {/* Toggle 2: Location */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>Precise Location</strong>
                  <span style={{ fontSize: '0.72rem', background: isLocationAllowed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: isLocationAllowed ? '#047857' : '#dc2626', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '700' }}>
                    {isLocationAllowed ? 'ALLOWED' : 'DENIED'}
                  </span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Helps us show nearby store deals and delivery estimates.
                </span>
              </div>

              {/* Interactive Switch */}
              <button 
                type="button"
                onClick={() => handleToggleConsent('location')}
                style={{ 
                  width: '54px', 
                  height: '28px', 
                  borderRadius: '14px', 
                  background: isLocationAllowed ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#cbd5e1', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  outline: 'none',
                  boxShadow: isLocationAllowed ? '0 4px 10px rgba(79, 70, 229, 0.3)' : 'none'
                }}
              >
                <div style={{ 
                  width: '22px', 
                  height: '22px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  position: 'absolute', 
                  top: '3px', 
                  left: isLocationAllowed ? '29px' : '3px', 
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
                }} />
              </button>
            </div>

            {/* Toggle 3: Hinglish SMS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>SMS Notifications</strong>
                  <span style={{ fontSize: '0.72rem', background: isSmsAllowed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: isSmsAllowed ? '#047857' : '#dc2626', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '700' }}>
                    {isSmsAllowed ? 'ALLOWED' : 'DENIED'}
                  </span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Get personalised text messages about deals you'd like.
                </span>
              </div>

              {/* Interactive Switch */}
              <button 
                type="button"
                onClick={() => handleToggleConsent('age')}
                style={{ 
                  width: '54px', 
                  height: '28px', 
                  borderRadius: '14px', 
                  background: isSmsAllowed ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#cbd5e1', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  outline: 'none',
                  boxShadow: isSmsAllowed ? '0 4px 10px rgba(79, 70, 229, 0.3)' : 'none'
                }}
              >
                <div style={{ 
                  width: '22px', 
                  height: '22px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  position: 'absolute', 
                  top: '3px', 
                  left: isSmsAllowed ? '29px' : '3px', 
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
                }} />
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
            {activeSmsCopy}
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
