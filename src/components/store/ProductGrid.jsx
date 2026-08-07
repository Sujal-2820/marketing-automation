import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ingestCustomerData } from '../../agents/ingestionAgent';
import { analyzeBehavior } from '../../agents/behavioralAgent';
import { generateCampaign } from '../../agents/promotionalAgent';

export default function ProductGrid() {
  const { products, customers, setCustomers, setCampaigns, secureVault } = useAppContext();
  const currentCustomer = customers[0]; 

  const handlePurchase = async (product) => {
    try {
      // 1. Ingestion Agent intercepts
      const scrubbedData = ingestCustomerData(currentCustomer, secureVault);
      
      // 2. Behavioral Agent analyzes
      const stpData = analyzeBehavior(scrubbedData, product);
      
      // 3. Promotional Agent generates
      const newCampaigns = await generateCampaign(stpData, secureVault);
      
      // Update State
      setCampaigns(newCampaigns);
      
      // Update Customer history
      const updatedCustomers = [...customers];
      updatedCustomers[0].purchase_history.push(product.id);
      if (stpData.updatedSegments) {
          updatedCustomers[0].segments = stpData.updatedSegments;
      }
      setCustomers(updatedCustomers);
      
    } catch (err) {
      console.error(err);
      alert("Zero Trust Error: " + err.message);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
      {products.map(product => (
        <div key={product.id} className="glass-panel animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', height: '150px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '3rem' }}>{product.category === 'Footwear' ? '👟' : product.category === 'Snacks' ? '🌮' : product.category === 'Electronics' ? '🎧' : '👕'}</span>
          </div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem 0', flexGrow: 1 }}>${product.price}</p>
          <button 
            onClick={() => handlePurchase(product)}
            style={{ padding: '0.75rem', background: 'var(--accent-primary)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Buy Now (Trigger Sandbox Event)
          </button>
        </div>
      ))}
    </div>
  );
}
