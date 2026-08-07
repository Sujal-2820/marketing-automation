import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function AdBanner() {
  const { campaigns } = useAppContext();
  
  if (!campaigns.banner) return null;

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' }}>
      <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{campaigns.banner.title}</h2>
      <p style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-secondary)' }}>{campaigns.banner.subtitle}</p>
    </div>
  );
}
