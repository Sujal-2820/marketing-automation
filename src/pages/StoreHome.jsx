import React from 'react';
import AdBanner from '../components/store/AdBanner';
import ProductGrid from '../components/store/ProductGrid';
import SalePopup from '../components/store/SalePopup';
import { useAppContext } from '../context/AppContext';

export default function StoreHome() {
  const { customers, secureVault } = useAppContext();
  // Simulating the secure vault retrieval purely for UI display
  const customerName = secureVault[customers[0]?.token_id]?.name || "Guest";

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--accent-primary)', letterSpacing: '-1px' }}>Aura E-Commerce</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: '500' }}>Welcome, {customerName}</span>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }} />
        </div>
      </header>
      
      <AdBanner />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Recommended for You</h2>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Based on recent activity</span>
      </div>
      
      <ProductGrid />
      <SalePopup />
    </div>
  );
}
