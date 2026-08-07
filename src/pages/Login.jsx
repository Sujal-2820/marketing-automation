import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
          <ShieldCheck size={40} />
        </div>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', letterSpacing: '-1px' }}>Retailer OS</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Secure Zero-Trust Gateway</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Retailer ID or Email" required style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="password" placeholder="Password" required style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
            Authenticate & Mount Vault
          </button>
        </form>
      </div>
    </div>
  );
}
