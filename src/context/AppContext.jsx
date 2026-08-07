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
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Campaigns stay in local storage as they are transient generated AI output
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load live data from Supabase
  useEffect(() => {
    async function fetchLiveDB() {
      setLoading(true);
      
      const { data: prods, error: prodErr } = await supabase.from('products').select('*');
      if (!prodErr && prods) setProducts(prods);

      const { data: custs, error: custErr } = await supabase.from('customers').select('*');
      if (!custErr && custs) setCustomers(custs);
      
      setLoading(false);
    }
    fetchLiveDB();
  }, []);

  // Helper to sync specific customer updates back to live DB
  const updateCustomer = async (token_id, updates) => {
    // Optimistic UI update
    setCustomers(prev => prev.map(c => c.token_id === token_id ? { ...c, ...updates } : c));
    
    const customerToUpdate = customers.find(c => c.token_id === token_id);
    const payload = { ...customerToUpdate, ...updates };
    
    const { error } = await supabase.from('customers').upsert({
      token_id: payload.token_id,
      segments: payload.segments,
      purchase_history: payload.purchase_history,
      consent_flags: payload.consent_flags
    });
    
    if (error) console.error("Failed to sync customer to live DB:", error);
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
