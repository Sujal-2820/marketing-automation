import React, { createContext, useContext, useState, useEffect } from 'react';

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
  
  // Persisted state via localStorage (Primary Database simulation)
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('campaigns');
    return saved ? JSON.parse(saved) : [];
  });

  // Load initial mock data if localStorage is empty
  useEffect(() => {
    if (customers.length === 0) {
      import('../data/customers.json').then(data => {
        setCustomers(data.default);
        localStorage.setItem('customers', JSON.stringify(data.default));
      });
    }
    if (products.length === 0) {
      import('../data/products.json').then(data => {
        setProducts(data.default);
        localStorage.setItem('products', JSON.stringify(data.default));
      });
    }
  }, []);

  // Sync to local storage on changes
  useEffect(() => {
    if (customers.length > 0) localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    if (products.length > 0) localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const value = {
    role, setRole,
    customers, setCustomers,
    products, setProducts,
    campaigns, setCampaigns,
    secureVault
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
