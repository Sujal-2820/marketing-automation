import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldAlert, Database, User, Search, Lock, ShieldCheck, ChevronDown, Bot, EyeOff, Eye, Cpu, CheckCircle2, XCircle, Activity, Layers } from 'lucide-react';
import { analyzeBehavior } from '../../agents/behavioralAgent';

export default function ConsentManager() {
  const { customers } = useAppContext();
  
  // Selection & Search State
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeTab, setActiveTab] = useState('consent'); // 'consent' | 'llm' | 'ml'

  useEffect(() => {
    if (customers.length > 0 && !selectedId) {
      setSelectedId(customers[0].token_id);
    }
  }, [customers, selectedId]);

  // Filter customers by search term
  const filteredCustomers = customers.filter(c => 
    c.token_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.segments && c.segments.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Paginated customers to display
  const displayedCustomers = filteredCustomers.slice(0, visibleCount);
  const selectedCustomer = customers.find(c => c.token_id === selectedId) || customers[0];

  // Run ML Behavioral Analysis Pipeline on selected customer
  const mlAnalysis = selectedCustomer ? analyzeBehavior(selectedCustomer) : null;

  // Counts for summary metrics
  const activeCount = customers.filter(c => c.consent_flags?.purchase_history !== false).length;
  const revokedCount = customers.length - activeCount;

  if (!selectedCustomer) return <div style={{ padding: '2rem' }}>Loading customer consent vault...</div>;

  return (
    <div className="animate-fade-in">
      
      {/* ---------------- 1. PAGE HEADER & METRICS SUMMARY ROW ---------------- */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#0f172a', fontWeight: '800' }}>Privacy & Consent Governance</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
              Customer-governed data vault and real-time LLM/ML vector auditing.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--success)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '0.45rem 1rem', borderRadius: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} /> Customer-Governed Vault Active
          </span>
        </div>

        {/* Summary Metric Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1rem 1.25rem', background: 'white', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.6rem', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <User size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Total Tokens</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>{customers.length} Users</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem 1.25rem', background: 'white', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.6rem', borderRadius: '12px', color: '#10b981' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Consents Granted</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10b981' }}>{activeCount} Tokens</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem 1.25rem', background: 'white', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.6rem', borderRadius: '12px', color: '#ef4444' }}>
              <XCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Consents Revoked</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ef4444' }}>{revokedCount} Tokens</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem 1.25rem', background: 'white', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '0.6rem', borderRadius: '12px', color: '#0ea5e9' }}>
              <Activity size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Scrubbing Speed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0ea5e9' }}>&lt; 0.8 ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 2. MAIN 2-COLUMN LAYOUT ---------------- */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* ---------------- LEFT COLUMN: SEARCH & CUSTOMER DIRECTORY (320px) ---------------- */}
        <div style={{ width: '320px', flexShrink: 0 }}>
          
          <div className="glass-panel" style={{ padding: '1.25rem', background: 'white', borderRadius: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} /> Customer Directory
              </h3>
              <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: 'var(--text-secondary)', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: '600' }}>
                {filteredCustomers.length} Total
              </span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Search Token ID or Segment..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>

            {/* Customer Directory List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {displayedCustomers.map(c => {
                const isSelected = selectedId === c.token_id;
                const isGranted = c.consent_flags?.purchase_history !== false;

                return (
                  <button 
                    key={c.token_id}
                    onClick={() => setSelectedId(c.token_id)}
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      background: isSelected ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#f8fafc',
                      color: isSelected ? 'white' : 'var(--text-primary)',
                      border: isSelected ? 'none' : '1px solid var(--border-color)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 8px 16px rgba(79, 70, 229, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '700' }}>#{c.token_id}</span>
                      
                      {/* Live Dot Indicator */}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', fontWeight: '700', color: isSelected ? 'white' : (isGranted ? '#10b981' : '#ef4444') }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSelected ? 'white' : (isGranted ? '#10b981' : '#ef4444') }}></span>
                        {isGranted ? 'Granted' : 'Revoked'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: isSelected ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Segment: {c.segments ? c.segments[0] : 'General'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Load Next 10 Customers Button */}
            {visibleCount < filteredCustomers.length && (
              <button 
                onClick={() => setVisibleCount(prev => prev + 10)}
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  padding: '0.65rem',
                  background: 'white',
                  border: '1px dashed var(--accent-primary)',
                  color: 'var(--accent-primary)',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                Load Next 10 Customers <ChevronDown size={14} />
              </button>
            )}

          </div>

        </div>

        {/* ---------------- RIGHT COLUMN: INSPECTION PANEL WITH TABS (FLEX 1) ---------------- */}
        <div style={{ flex: 1 }}>
          
          <div className="glass-panel" style={{ padding: '1.75rem', background: 'white', borderRadius: '20px' }}>
            
            {/* Customer Inspector Top Header & Tab Switcher */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>
                  Vault Inspection Target
                </span>
                <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#0f172a', fontWeight: '800', fontFamily: 'monospace' }}>
                  #{selectedCustomer.token_id}
                </h3>
              </div>

              {/* Tab Switcher Pills */}
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', borderRadius: '12px', gap: '0.25rem' }}>
                <button 
                  onClick={() => setActiveTab('consent')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === 'consent' ? 'white' : 'transparent',
                    color: activeTab === 'consent' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === 'consent' ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: activeTab === 'consent' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <ShieldCheck size={16} /> Consent Status
                </button>

                <button 
                  onClick={() => setActiveTab('llm')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === 'llm' ? 'white' : 'transparent',
                    color: activeTab === 'llm' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === 'llm' ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: activeTab === 'llm' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <Bot size={16} /> LLM Vector Payload
                </button>

                <button 
                  onClick={() => setActiveTab('ml')}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === 'ml' ? 'white' : 'transparent',
                    color: activeTab === 'ml' ? 'var(--accent-vibrant)' : 'var(--text-secondary)',
                    fontWeight: activeTab === 'ml' ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: activeTab === 'ml' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <Cpu size={16} /> ML Pipeline Data
                </button>
              </div>

            </div>

            {/* TAB 1: CONSENT GOVERNANCE STATUS */}
            {activeTab === 'consent' && (
              <div className="animate-fade-in">
                
                {/* Security Guarantee Notice */}
                <div style={{ background: 'rgba(79, 70, 229, 0.04)', border: '1px solid rgba(79, 70, 229, 0.12)', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Lock size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.4' }}>
                    <strong style={{ color: '#1e1b4b' }}>Customer-Governed Control:</strong> These permissions are live-controlled by customer <u>#{selectedCustomer.token_id}</u> inside their storefront Data Vault. Retailers cannot override these permissions.
                  </span>
                </div>

                {/* Consent Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Item 1: Purchase History */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>
                        Purchase History & Buying Patterns
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {selectedCustomer.consent_flags?.purchase_history !== false ? 
                          '✅ Customer granted permission to use past purchases for ML & LLM ad targeting.' : 
                          '❌ Customer revoked permission. ML & LLM engine is blocked from reading history.'}
                      </span>
                    </div>

                    <div style={{ flexShrink: 0, marginLeft: '1rem' }}>
                      {selectedCustomer.consent_flags?.purchase_history !== false ? (
                        <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.45rem 1.1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Eye size={15} /> GRANTED
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.45rem 1.1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <EyeOff size={15} /> REVOKED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 2: Precise Location */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>
                        Precise Location Tracking
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {selectedCustomer.consent_flags?.location ? 
                          '✅ Customer granted permission for geo-fenced store offers.' : 
                          '❌ Location access revoked. Geo-targeting is disabled.'}
                      </span>
                    </div>

                    <div style={{ flexShrink: 0, marginLeft: '1rem' }}>
                      {selectedCustomer.consent_flags?.location ? (
                        <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.45rem 1.1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Eye size={15} /> GRANTED
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.45rem 1.1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <EyeOff size={15} /> REVOKED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item 3: Hinglish SMS Messaging */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>
                        Hinglish SMS Messaging
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {selectedCustomer.consent_flags?.age !== false ? 
                          '✅ Customer permits SMS delivery.' : 
                          '❌ SMS notifications blocked by customer.'}
                      </span>
                    </div>

                    <div style={{ flexShrink: 0, marginLeft: '1rem' }}>
                      {selectedCustomer.consent_flags?.age !== false ? (
                        <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.45rem 1.1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Eye size={15} /> GRANTED
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.45rem 1.1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <EyeOff size={15} /> REVOKED
                        </span>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: LLM SCRUBBED PAYLOAD */}
            {activeTab === 'llm' && (
              <div className="animate-fade-in">
                <div style={{ background: '#0f172a', padding: '1.75rem', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.85rem', borderRadius: '16px', border: '1px solid #334155' }}>
                  <div style={{ color: '#94a3b8', marginBottom: '1.25rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>// LLM INGESTION VECTOR PAYLOAD</span>
                    <span style={{ color: '#38bdf8' }}>TARGET TOKEN: #{selectedCustomer.token_id}</span>
                  </div>
                  
                  <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid #334155' }}>
                    <span style={{ color: '#c678dd' }}>const</span> aiPayload = {'{'}
                    <div style={{ paddingLeft: '1.5rem', marginTop: '0.4rem' }}>
                      token_id: <span style={{ color: '#98c379' }}>"{selectedCustomer.token_id}"</span>,
                    </div>
                    {'}'};
                  </div>

                  {/* Purchase History LLM Filter */}
                  {selectedCustomer.consent_flags?.purchase_history === false ? (
                    <div className="animate-fade-in" style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #ef4444', padding: '1.25rem', borderRadius: '12px', color: '#fca5a5', lineHeight: '1.6' }}>
                      <div style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <XCircle size={16} /> LLM ACCESS BLOCKED (CUSTOMER REVOKED)
                      </div>
                      /* PURCHASE_HISTORY REVOKED BY CUSTOMER */<br/>
                      "purchase_vector": <span style={{ color: '#ef4444', fontWeight: 'bold' }}>[REDACTED_BY_ZERO_TRUST_VAULT]</span>
                    </div>
                  ) : (
                    <div className="animate-fade-in" style={{ background: '#1e293b', border: '1px solid #334155', padding: '1.25rem', borderRadius: '12px', color: '#e2e8f0', lineHeight: '1.6' }}>
                      <div style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={16} /> LLM ACCESS ALLOWED
                      </div>
                      "purchase_vector": [<br/>
                      &nbsp;&nbsp;<span style={{ color: '#d19a66' }}>{(selectedCustomer.purchase_history || []).slice(0, 3).map(p => `"${p}"`).join(', ')}</span><br/>
                      ]
                    </div>
                  )}

                  <div style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    ℹ️ The Auto-Pilot campaign engine only receives data vectors that pass active customer consent filters.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ML MODEL DATA ENGINEERING PIPELINE */}
            {activeTab === 'ml' && (
              <div className="animate-fade-in">
                <div style={{ background: '#0f172a', padding: '1.75rem', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.85rem', borderRadius: '16px', border: '1px solid #334155' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
                    <span style={{ color: '#c678dd', fontWeight: 'bold' }}>// ML BEHAVIORAL ANALYSIS PIPELINE</span>
                    <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      ⚡ Process Speed: {mlAnalysis?.mlPipeline?.executionMs || 0.4}ms
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    
                    {/* EDA Metrics */}
                    <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>1. EDA & Feature Extraction</div>
                      <div style={{ marginBottom: '0.25rem' }}>Total Items Analyzed: <span style={{ color: '#e5c07b' }}>{mlAnalysis?.mlPipeline?.eda?.totalItems || 0}</span></div>
                      <div style={{ marginBottom: '0.25rem' }}>Shannon Entropy (H): <span style={{ color: '#e5c07b' }}>{mlAnalysis?.mlPipeline?.eda?.shannonEntropy || 0}</span></div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                        Diversity: {mlAnalysis?.mlPipeline?.eda?.basketDiversity || 'Standard'}
                      </div>
                    </div>

                    {/* Vectorized Density Weights */}
                    <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                      <div style={{ color: '#c678dd', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>2. Vectorized Feature Weights</div>
                      <div style={{ marginBottom: '0.25rem' }}>Fitness Density: <span style={{ color: '#98c379' }}>{mlAnalysis?.mlPipeline?.featureVector?.v_fitness_density * 100 || 0}%</span></div>
                      <div style={{ marginBottom: '0.25rem' }}>Tech Density: <span style={{ color: '#98c379' }}>{mlAnalysis?.mlPipeline?.featureVector?.v_tech_density * 100 || 0}%</span></div>
                      <div style={{ marginBottom: '0.25rem' }}>Grocery Density: <span style={{ color: '#98c379' }}>{mlAnalysis?.mlPipeline?.featureVector?.v_grocery_density * 100 || 0}%</span></div>
                    </div>

                  </div>

                  {/* Classification Prediction */}
                  <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                    <div style={{ color: '#98c379', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>3. Naive Bayes ML Prediction</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        Predicted Segment: <strong style={{ color: '#61afef', fontSize: '1rem' }}>{mlAnalysis?.mlPipeline?.classification?.predictedSegment}</strong>
                      </div>
                      <div style={{ background: 'rgba(97, 175, 239, 0.15)', color: '#61afef', padding: '0.3rem 0.75rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        Model Confidence: {mlAnalysis?.mlPipeline?.classification?.confidenceScore}%
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
