import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, Store, Database, FileJson, PackageCheck, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setCustomers, setProductCatalog } = useAppContext();
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [uploadedCustomerFileName, setUploadedCustomerFileName] = useState('');
  const [uploadedProductFileName, setUploadedProductFileName] = useState('');

  const nextStep = () => {
    if (step === 4) {
      navigate('/dashboard/command-center');
    } else {
      setStep(step + 1);
    }
  };

  const handleCustomerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedCustomerFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (Array.isArray(json)) {
            setCustomers(json);
          } else {
            setCustomers([json]);
          }
        } catch (error) {
          console.error("Error parsing Customer JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleProductUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedProductFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (Array.isArray(json)) {
            setProductCatalog(json);
          } else {
            setProductCatalog([json]);
          }
        } catch (error) {
          console.error("Error parsing Product JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const progressPercent = step === 1 ? '0%' : step === 2 ? '33%' : step === 3 ? '66%' : '100%';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '620px', padding: '3.5rem', position: 'relative' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: 'var(--border-color)', zIndex: 0, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, width: progressPercent, height: '4px', background: 'var(--accent-primary)', zIndex: 0, transform: 'translateY(-50%)', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          
          {[1, 2, 3, 4].map(num => (
            <div key={num} style={{ width: '36px', height: '36px', borderRadius: '50%', background: step >= num ? 'var(--accent-primary)' : 'white', border: `2px solid ${step >= num ? 'var(--accent-primary)' : 'var(--border-color)'}`, color: step >= num ? 'white' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 1, transition: 'all 0.3s' }}>
              {num}
            </div>
          ))}
        </div>

        {/* Step 1: Brand Profile */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
              <Store size={32} />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Set Up Your Store</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Let's get your store ready in a few quick steps.</p>
            <input type="text" placeholder="Your store name (e.g. Apex Sports)" value={brandName} onChange={e => setBrandName(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', marginBottom: '1.5rem', outline: 'none' }} />
            <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', marginBottom: '2.5rem', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }}>
              <option value="">Choose your brand style...</option>
              <option value="luxury">Luxury & Exclusive</option>
              <option value="playful">Playful & Energetic</option>
              <option value="urgent">Urgent & Promotional</option>
            </select>
            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Next Step</button>
          </div>
        )}

        {/* Step 2: Customer Data */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--accent-vibrant)' }}>
              <Database size={32} />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Upload Customer Data</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Add your customer list so we can start personalising ads.</p>
            
            <label style={{ display: 'block', border: '2px dashed var(--accent-primary)', borderRadius: '12px', padding: '3.5rem 2rem', textAlign: 'center', marginBottom: '2.5rem', cursor: 'pointer', background: uploadedCustomerFileName ? 'rgba(16, 185, 129, 0.05)' : 'rgba(79, 70, 229, 0.02)', transition: 'background 0.2s', borderColor: uploadedCustomerFileName ? 'var(--success)' : 'var(--accent-primary)' }}>
              <input type="file" accept=".json" onChange={handleCustomerUpload} style={{ display: 'none' }} />
              {uploadedCustomerFileName ? (
                <>
                  <FileJson size={56} style={{ color: 'var(--success)', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--success)' }}>Customer File Ready!</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{uploadedCustomerFileName} has been uploaded.</p>
                </>
              ) : (
                <>
                  <UploadCloud size={56} style={{ color: 'var(--accent-primary)', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Click to Upload Customer Data</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Select customers.json from Retailer Demo Files</p>
                </>
              )}
            </label>

            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Next Step</button>
          </div>
        )}

        {/* Step 3: Product Catalog (Brand Policy Guardrail) */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#0ea5e9' }}>
              <PackageCheck size={32} />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>Upload Product Catalog</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }}>
              Upload brand discount caps & stock rules to prevent misleading AI ad copy.
            </p>
            
            <div style={{ background: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldAlert size={20} style={{ color: '#0ea5e9', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.85rem', color: '#0369a1', lineHeight: '1.4' }}>
                <strong>Brand Guardrail:</strong> If an ad promises a 30% discount but a brand allows max 15%, our ML engine automatically clamps the text to prevent misleading campaigns.
              </div>
            </div>

            <label style={{ display: 'block', border: '2px dashed #0ea5e9', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', marginBottom: '2.5rem', cursor: 'pointer', background: uploadedProductFileName ? 'rgba(16, 185, 129, 0.05)' : 'rgba(14, 165, 233, 0.02)', transition: 'background 0.2s', borderColor: uploadedProductFileName ? 'var(--success)' : '#0ea5e9' }}>
              <input type="file" accept=".json" onChange={handleProductUpload} style={{ display: 'none' }} />
              {uploadedProductFileName ? (
                <>
                  <FileJson size={56} style={{ color: 'var(--success)', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--success)' }}>Catalog File Ready!</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{uploadedProductFileName} loaded successfully.</p>
                </>
              ) : (
                <>
                  <UploadCloud size={56} style={{ color: '#0ea5e9', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Click to Upload Product Catalog</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Select products.json from Retailer Demo Files</p>
                </>
              )}
            </label>

            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Next Step</button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={80} style={{ color: 'var(--success)', margin: '0 auto 2rem auto' }} />
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem' }}>You're All Set!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
              Customer data & product guardrails are loaded. Let me head to your dashboard.
            </p>
            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Open Dashboard</button>
          </div>
        )}

      </div>
    </div>
  );
}
