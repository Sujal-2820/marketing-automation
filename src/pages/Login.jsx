import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Basic Format Validation
    if (!email || !email.includes('@')) {
      setError('❌ Please enter a valid retailer email address (e.g. retailer@apex.com).');
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError('❌ Invalid Credentials: Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    // 2. Try Live Supabase Authentication
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!authError && data?.session) {
        // Authenticated with live Supabase credentials!
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('retailerUser', JSON.stringify({ email }));
        setLoading(false);
        navigate('/onboarding');
        return;
      }
    } catch (e) {
      // Supabase network error handling
    }

    // 3. Demo Retailer Credentials Validation Matrix
    // Known valid retailer credentials or valid domain email + password combination
    const validDemoEmails = [
      'retailer@apex.com', 
      'admin@retailer.com', 
      'demo@store.com', 
      'retailer@nexus.vault', 
      'apex@sports.com',
      'store@admin.com'
    ];

    const isRecognizedEmail = validDemoEmails.includes(email.toLowerCase().trim()) || 
                              email.toLowerCase().endsWith('.com') || 
                              email.toLowerCase().endsWith('.store') ||
                              email.toLowerCase().endsWith('.vault');

    const isValidPassword = password === 'admin123' || password === 'retailer123' || password === 'pass123' || password === 'demo1234' || password === 'password123';

    if (isRecognizedEmail && isValidPassword) {
      // Access Granted
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('retailerUser', JSON.stringify({ email: email.trim() }));
      setLoading(false);
      navigate('/onboarding');
    } else {
      // Access Denied: Block navigation & display warning
      setLoading(false);
      setError('❌ Access Denied: Incorrect email or password. Please verify your retailer credentials.');
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('retailer@apex.com');
    setPassword('admin123');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('retailerUser', JSON.stringify({ email: 'retailer@apex.com' }));
    setError('');
    navigate('/onboarding');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f5f3ff 100%)' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '3rem 2.5rem', textAlign: 'center', background: 'white', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.15)' }}>
        
        <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(79, 70, 229, 0.08)', borderRadius: '20px', marginBottom: '1.25rem', color: 'var(--accent-primary)' }}>
          <ShieldCheck size={36} />
        </div>
        
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', letterSpacing: '-0.5px', color: '#0f172a', fontWeight: '800' }}>Retailer OS</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Sign in to manage your store
        </p>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'left' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Retailer Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', background: '#f8fafc' }} 
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', background: '#f8fafc' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary" 
            style={{ 
              padding: '0.95rem', 
              borderRadius: '12px', 
              fontSize: '1rem', 
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}
          >
            {loading ? "Signing in..." : <>Sign In <ArrowRight size={18} /></>}
          </button>

          {/* Quick Demo Access Button */}
            <button 
              type="button"
              onClick={handleQuickDemoLogin}
              style={{
                padding: '0.85rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                background: '#f8fafc',
                color: 'var(--text-primary)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              ⚡ Quick Demo Access
            </button>

        </form>
      </div>
    </div>
  );
}
