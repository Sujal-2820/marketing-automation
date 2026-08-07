import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Mock secure vault mapping (token to PII) - In Memory only to simulate Zero Trust
  const secureVault = {
    "usr_91A_xyz": {
      name: "Rohan",
      phone: "+91-9876543210"
    }
  };

  // State
  const [role, setRole] = useState('customer'); // 'customer' or 'retailer'
  const [customers, setCustomers] = useState([
    {
      token_id: 'usr_sports_042',
      segments: ['Gym Freak', 'Marathon Runner'],
      purchase_history: ['1x Nike ZoomX', '2x Whey Protein'],
      consent_flags: { location: true, age: true, purchase_history: true }
    },
    {
      token_id: 'usr_tech_012',
      segments: ['Gamer', 'Audioophile'],
      purchase_history: ['1x RTX 4090 GPU'],
      consent_flags: { location: true, age: true, purchase_history: true }
    },
    {
      token_id: 'usr_grocery_008',
      segments: ['Health Conscious', 'Organic Shopper'],
      purchase_history: ['2x Organic Almond Milk'],
      consent_flags: { location: true, age: true, purchase_history: true }
    },
    {
      token_id: 'usr_home_021',
      segments: ['Decor Enthusiast', 'Plant Parent'],
      purchase_history: ['1x Nordic Lamp'],
      consent_flags: { location: true, age: true, purchase_history: true }
    }
  ]);
  
  const [products, setProducts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load live data from Supabase if available
  useEffect(() => {
    async function fetchLiveDB() {
      setLoading(true);
      try {
        const { data: prods, error: prodErr } = await supabase.from('products').select('*');
        if (!prodErr && prods && prods.length > 0) setProducts(prods);

        const { data: custs, error: custErr } = await supabase.from('customers').select('*');
        if (!custErr && custs && custs.length > 0) {
          setCustomers(prev => {
            // Merge DB customers with initial demo personas
            const merged = [...custs];
            prev.forEach(p => {
              if (!merged.some(m => m.token_id === p.token_id)) {
                merged.push(p);
              }
            });
            return merged;
          });
        }
      } catch (err) {
        console.warn("Using local state fallback for AppContext DB");
      }
      setLoading(false);
    }
    fetchLiveDB();
  }, []);

  // Helper to sync specific customer updates back to state & DB
  const updateCustomer = async (token_id, updates) => {
    // Optimistic state update: update or append
    setCustomers(prev => {
      const exists = prev.some(c => c.token_id === token_id);
      if (exists) {
        return prev.map(c => c.token_id === token_id ? { ...c, ...updates } : c);
      } else {
        return [...prev, { token_id, consent_flags: { location: true, age: true, purchase_history: true }, ...updates }];
      }
    });
    
    // Sync to Supabase if connected
    try {
      const customerToUpdate = customers.find(c => c.token_id === token_id) || {};
      const payload = { ...customerToUpdate, ...updates };
      
      await supabase.from('customers').upsert({
        token_id,
        segments: payload.segments || ['Gym Freak'],
        purchase_history: payload.purchase_history || [],
        consent_flags: payload.consent_flags || { location: true, age: true, purchase_history: true }
      });
    } catch (e) {
      console.warn("Supabase upsert sync:", e.message);
    }
  };

  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const value = {
    role, setRole,
    customers, setCustomers, updateCustomer,
    products, setProducts,
    campaigns, setCampaigns,
    secureVault,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
