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

  // SUBTLE CROSS-CATEGORY ADAPTATION ENGINE
  // If the customer bought an item from a different category, subtly blend the banner copy!
  if (isMultiCategory) {
    if (primarySegment === 'Gamer' && customerSegments.includes('Gym Freak')) {
      title = "Game Hard, Stay Fit, Boss!";
      subtitle = "High-performance gear & activewear for long gaming streams and gym sessions. Flat 25% off.";
      imageUrl = "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop";
    } else if (primarySegment === 'Decor' && customerSegments.includes('Gym Freak')) {
      title = "Post-Workout Relaxed Vibes";
      subtitle = "Aesthetic warm Nordic lamps to unwind and recharge after a heavy workout session.";
      imageUrl = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop";
    } else if (primarySegment === 'Snack Lover' && customerSegments.includes('Gym Freak')) {
      title = "Guilt-Free Healthy Munchies!";
      subtitle = "High protein crunchy snacks & Whey isolate for your workout energy.";
      imageUrl = "https://images.unsplash.com/photo-1622484210800-885100062b08?q=80&w=1200&auto=format&fit=crop";
    } else if (primarySegment === 'Health Conscious' && customerSegments.includes('Gym Freak')) {
      title = "Clean Energy & Organic Fuel";
      subtitle = "Unsweetened plant milk & organic nutrition tailored for your daily fitness routine.";
      imageUrl = "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1200&auto=format&fit=crop";
    } else if (primarySegment === 'Plant Parent' && customerSegments.includes('Gym Freak')) {
      title = "Green Space & Active Mind";
      subtitle = "Air-purifying ceramic potted greens to refresh your recovery environment.";
      imageUrl = "https://images.unsplash.com/photo-1416879598555-220f8bb10864?q=80&w=1200&auto=format&fit=crop";
    } else if (primarySegment === 'Gym Freak' && customerSegments.includes('Gamer')) {
      title = "Gym Freak & Gamer Combo!";
      subtitle = "ANC noise-cancelling audio & activewear engineered for peak focus.";
      imageUrl = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop";
    } else {
      title = `${primarySegment} & ${secondarySegment} Personalised Offer!`;
      subtitle = `Special cross-category deals dynamically tailored for your updated purchase patterns.`;
    }
  }

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
        overflow: 'hidden',
        boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: textPosition || 'flex-start',
        padding: '3rem'
      }}
    >
      {/* Dark subtle gradient overlay for text legibility */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.3) 100%)', zIndex: 1 }}></div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px', textAlign: textPosition === 'center' ? 'center' : textPosition === 'flex-end' ? 'right' : 'left' }}>
        
        {/* Subtle Multi-Interest Tag if cross-category purchase detected */}
        {isMultiCategory && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            padding: '0.25rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: '700',
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={13} style={{ color: '#38bdf8' }} />
            Personalized Combo Offer ({customerSegments.slice(0, 2).join(' + ')})
          </div>
        )}

        <h2 style={{ 
          fontSize: '2.25rem', 
          fontWeight: '800', 
          margin: '0 0 0.75rem 0', 
          color: 'white', 
          lineHeight: '1.2',
          letterSpacing: '-0.5px',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          {title}
        </h2>

        {subtitle && (
          <p style={{ 
            fontSize: '1.05rem', 
            color: 'rgba(255, 255, 255, 0.9)', 
            margin: '0 0 1.75rem 0', 
            lineHeight: '1.5',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
          }}>
            {subtitle}
          </p>
        )}

        <button style={{ 
          background: 'linear-gradient(135deg, #4f46e5, #6366f1)', 
          color: 'white', 
          border: 'none', 
          padding: '0.85rem 2.25rem', 
          borderRadius: '12px', 
          fontWeight: '700', 
          fontSize: '1rem', 
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
          transition: 'all 0.2s ease'
        }}>
          {cta || 'Shop Now'}
        </button>

      </div>
    </div>
  );
}
