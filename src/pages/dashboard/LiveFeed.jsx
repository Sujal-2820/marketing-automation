import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Edit3, Check, MessageSquare, Send } from 'lucide-react';

export default function LiveFeed() {
  const { campaigns, setCampaigns } = useAppContext();
  const [editingBanner, setEditingBanner] = useState(false);
  const [bannerTitle, setBannerTitle] = useState(campaigns.banner?.title || '');
  const [bannerSub, setBannerSub] = useState(campaigns.banner?.subtitle || '');
  const [promptValue, setPromptValue] = useState('');
  const [isPrompting, setIsPrompting] = useState(false);

  const saveBanner = () => {
    setCampaigns({ ...campaigns, banner: { ...campaigns.banner, title: bannerTitle, subtitle: bannerSub } });
    setEditingBanner(false);
  };

  const handlePrompt = (e) => {
    e.preventDefault();
    if (!promptValue.trim()) return;
    setIsPrompting(true);
    // Simulate AI prompt steerability
    setTimeout(() => {
      setBannerTitle("🔥 " + promptValue + " 🔥");
      setBannerSub("AI instantly applied your feedback.");
      saveBanner();
      setPromptValue('');
      setIsPrompting(false);
    }, 1200);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Live Agentic Feed</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Monitor AI processes and steer generation in real-time.</p>
      
      {!campaigns.banner && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Awaiting Customer Sandbox trigger to generate campaigns...</p>
        </div>
      )}

      {campaigns.banner && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          {/* Left: Console Feed */}
          <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>Generation Console</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid var(--border-color)', paddingLeft: '1rem', marginLeft: '0.5rem' }}>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.6rem', top: '0.2rem', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Retrieving context...</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Analyzing purchase demographics.</span>
              </div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.6rem', top: '0.2rem', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Assembling prompt...</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Synthesizing brand voice guidelines.</span>
              </div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.6rem', top: '0.2rem', width: '16px', height: '16px', borderRadius: '50%', border: '4px solid var(--accent-vibrant)', background: 'white' }}></div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Generating mockups...</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Rendering high-fidelity layouts.</span>
              </div>

            </div>
          </div>

          {/* Right: Asset Editors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="glass-panel animate-fade-in" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Generated Ad Banner</strong>
                <button onClick={() => setEditingBanner(!editingBanner)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  {editingBanner ? <Check size={16} /> : <Edit3 size={16} />} 
                  {editingBanner ? "Save Asset" : "Direct Edit"}
                </button>
              </div>
              
              <div style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(14, 165, 233, 0.1))', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {editingBanner ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                    <input type="text" value={bannerTitle} onChange={e => setBannerTitle(e.target.value)} style={{ padding: '0.75rem', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', borderRadius: '8px', border: '2px dashed var(--accent-primary)' }} />
                    <input type="text" value={bannerSub} onChange={e => setBannerSub(e.target.value)} style={{ padding: '0.75rem', fontSize: '1rem', textAlign: 'center', borderRadius: '8px', border: '2px dashed var(--accent-primary)' }} />
                    <button onClick={saveBanner} className="btn-primary" style={{ marginTop: '0.5rem' }}>Save Changes</button>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'var(--accent-primary)' }}>{campaigns.banner.title}</h2>
                    <p style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-secondary)' }}>{campaigns.banner.subtitle}</p>
                  </>
                )}
              </div>

              {/* AI Prompting Steerability */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
                 <form onSubmit={handlePrompt} style={{ display: 'flex', gap: '1rem' }}>
                   <div style={{ flex: 1, position: 'relative' }}>
                     <MessageSquare size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)' }} />
                     <input type="text" placeholder='Instruct AI (e.g. "Make it sound more urgent")' value={promptValue} onChange={e => setPromptValue(e.target.value)} disabled={isPrompting} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }} />
                   </div>
                   <button type="submit" disabled={isPrompting} className="btn-primary" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     {isPrompting ? 'Thinking...' : <><Send size={18} /> Steer AI</>}
                   </button>
                 </form>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
