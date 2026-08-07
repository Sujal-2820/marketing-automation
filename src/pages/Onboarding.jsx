import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, Store, Database, FileJson } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setCustomers } = useAppContext();
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const nextStep = () => {
    if (step === 3) {
      navigate('/dashboard/command-center');
    } else {
      setStep(step + 1);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          // If the uploaded file is an array of customers, update context (which syncs to DB)
          if (Array.isArray(json)) {
            setCustomers(json);
          } else {
             // single customer
             setCustomers([json]);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
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
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Store Profile</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Tell us a bit about your store.</p>
            <input type="text" placeholder="Brand Name (e.g. Nexus Retail)" value={brandName} onChange={e => setBrandName(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', marginBottom: '1.5rem', outline: 'none' }} />
            <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', marginBottom: '2.5rem', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }}>
              <option value="">Select Brand Tone...</option>
              <option value="luxury">Luxury & Exclusive</option>
              <option value="playful">Playful & Energetic</option>
              <option value="urgent">Urgent & Promotional</option>
            </select>
            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Continue to Data Import</button>
          </div>
        )}

        {/* Step 2: Data */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-vibrant)' }}>
              <Database size={32} />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Import Customer Data</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Upload your customer records and product catalog.</p>
            
            <label style={{ display: 'block', border: '2px dashed var(--accent-primary)', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center', marginBottom: '2.5rem', cursor: 'pointer', background: uploadedFileName ? 'rgba(16, 185, 129, 0.05)' : 'rgba(79, 70, 229, 0.02)', transition: 'background 0.2s', borderColor: uploadedFileName ? 'var(--success)' : 'var(--accent-primary)' }}>
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
              {uploadedFileName ? (
                <>
                  <FileJson size={56} style={{ color: 'var(--success)', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--success)' }}>File Ready!</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{uploadedFileName} has been uploaded.</p>
                </>
              ) : (
                <>
                  <UploadCloud size={56} style={{ color: 'var(--accent-primary)', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Click to Upload Data</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Select a .json file from your computer</p>
                </>
              )}
            </label>

            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Upload & Continue</button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={80} style={{ color: 'var(--success)', margin: '0 auto 2rem auto' }} />
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem' }}>Setup Complete</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>Your data is processed and your dashboard is ready.</p>
            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
