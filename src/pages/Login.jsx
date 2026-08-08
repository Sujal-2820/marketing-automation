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

    // Try Supabase auth first
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.warn("Supabase auth bypass for demo mode:", authError.message);
      // Fallback for Demo Mode
      setLoading(false);
      navigate('/onboarding');
    } else {
      // Successfully authenticated against live Supabase!
      setLoading(false);
      navigate('/onboarding');
    }
  };

  const handleQuickDemoLogin = () => {
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
