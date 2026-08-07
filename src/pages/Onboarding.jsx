import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, Store, Database } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');

  const nextStep = () => {
    if (step === 3) {
      navigate('/dashboard/command-center');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '3.5rem', position: 'relative' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: 'var(--border-color)', zIndex: 0, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, width: step === 1 ? '0%' : step === 2 ? '50%' : '100%', height: '4px', background: 'var(--accent-primary)', zIndex: 0, transform: 'translateY(-50%)', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          
          {[1, 2, 3].map(num => (
            <div key={num} style={{ width: '36px', height: '36px', borderRadius: '50%', background: step >= num ? 'var(--accent-primary)' : 'white', border: `2px solid ${step >= num ? 'var(--accent-primary)' : 'var(--border-color)'}`, color: step >= num ? 'white' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 1, transition: 'all 0.3s' }}>
              {num}
            </div>
          ))}
        </div>

        {/* Step 1: Brand */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
              <Store size={32} />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Define Your Brand</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Let the AI know who you are to generate perfect copy.</p>
            <input type="text" placeholder="Brand Name (e.g. Nexus Retail)" value={brandName} onChange={e => setBrandName(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', marginBottom: '1.5rem', outline: 'none' }} />
            <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', marginBottom: '2.5rem', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }}>
              <option value="">Select Brand Tone...</option>
              <option value="luxury">Luxury & Exclusive</option>
              <option value="playful">Playful & Energetic</option>
              <option value="urgent">Urgent & Promotional</option>
            </select>
            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Continue to Data Sync</button>
          </div>
        )}

        {/* Step 2: Data */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-vibrant)' }}>
              <Database size={32} />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Sync Data Source</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Upload your customer & catalog data for the AI to ingest.</p>
            
            <div style={{ border: '2px dashed var(--accent-primary)', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center', marginBottom: '2.5rem', cursor: 'pointer', background: 'rgba(79, 70, 229, 0.02)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.05)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.02)'}>
              <UploadCloud size={56} style={{ color: 'var(--accent-primary)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Drag & Drop JSON files</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Upload customers.json and products.json</p>
            </div>

            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Simulate Upload & Continue</button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={80} style={{ color: 'var(--success)', margin: '0 auto 2rem auto' }} />
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem' }}>Agents Activated</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>The Zero-Trust vault is sealed. AI is analyzing your data.</p>
            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Launch OS Command Center</button>
          </div>
        )}
      </div>
    </div>
  );
}
