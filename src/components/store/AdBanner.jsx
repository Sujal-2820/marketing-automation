import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldAlert, Sparkles } from 'lucide-react';

export default function AdBanner({ activeCustomer }) {
  const { campaigns } = useAppContext();
  
  // Consent flag check
  const hasHistoryConsent = activeCustomer?.consent_flags?.purchase_history !== false;
  const customerSegments = activeCustomer?.segments || ['Gym Freak'];

  // Detect cross-category multi-segment shopper
  const isMultiCategory = customerSegments.length > 1;
  const primarySegment = customerSegments[0];
  const secondarySegment = customerSegments[1] || 'Gym Freak';

  // Find matching campaign prioritizing customer's primary segment first among APPROVED campaigns
  let matchedCampaign = null;
  const approvedCampaigns = (campaigns || []).filter(c => c.isApproved === true);
  
  if (hasHistoryConsent && approvedCampaigns.length > 0) {
    for (const seg of customerSegments) {
      const found = approvedCampaigns.find(c => c.target === seg);
      if (found) {
        matchedCampaign = found;
        break;
      }
    }
    if (!matchedCampaign) matchedCampaign = approvedCampaigns[0];
  }

  // Fallback banner if privacy consent is turned off
  if (!hasHistoryConsent) {
    return (
      <div 
        className="glass-panel animate-fade-in"
        style={{ 
          marginBottom: '2.5rem', 
          borderRadius: '24px', 
          padding: '3rem 2.5rem',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 30px -10px rgba(30, 27, 75, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', width: 'max-content', marginBottom: '1.25rem' }}>
          <ShieldAlert size={14} /> Personalisation Off
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.75rem 0', letterSpacing: '-0.5px' }}>
          Diwali Dhamaka Sale is Live!
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 1.75rem 0', maxWidth: '600px' }}>
          Generic store-wide offers are showing. Turn on Shopping History in your Privacy Vault to see deals picked just for you.
        </p>
        <button style={{ background: 'white', color: '#1e1b4b', border: 'none', padding: '0.85rem 2.25rem', borderRadius: '30px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}>
          Explore Storewide Deals
        </button>
      </div>
    );
  }

  // Default fallback if no campaigns generated yet
  if (!matchedCampaign) {
    matchedCampaign = {
      title: "Gym Freak Ho? Bhaag ke aao, naya activewear collection is here. Flat 30% off!",
      subtitle: "Ultra-lightweight mesh gear engineered for peak performance.",
      cta: "Shop Now",
      target: primarySegment,
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      textPosition: "flex-start"
    };
  }

  let { title, subtitle, cta, imageUrl, textPosition } = matchedCampaign;

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{ 
        marginBottom: '2.5rem', 
        borderRadius: '24px', 
        height: '340px',
        position: 'relative',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: textPosition || 'center',
        padding: '3rem',
        color: 'white'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1, borderRadius: '24px' }}></div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: textPosition === 'center' ? 'center' : textPosition === 'flex-start' ? 'left' : 'right', maxWidth: '75%' }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {title}
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.95)', margin: '0 0 1.75rem 0', lineHeight: '1.5', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          {subtitle}
        </p>
        <button style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '0.85rem 2.25rem', borderRadius: '30px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)' }}>
          {cta || 'Shop Now'}
        </button>
      </div>
    </div>
  );
}
