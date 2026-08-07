import React from 'react';
import { TrendingUp, Megaphone, Shield } from 'lucide-react';

export default function CommandCenter() {
  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Command Center</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Real-time system health and core metrics.</p>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Campaigns</span>
            <Megaphone size={20} />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>12</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--success)', background: 'rgba(16,185,129,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>+2 this week</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Conversion Rate</span>
            <TrendingUp size={20} />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>4.8%</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--success)', background: 'rgba(16,185,129,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>+0.4% from avg</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Margin Protection</span>
            <Shield size={20} />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>92%</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>Optimal Guardrails</span>
        </div>

      </div>

      <h3 style={{ marginBottom: '1.5rem' }}>Agentic Health</h3>
      
      {/* Agents Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        {/* Agent 1 */}
        <div className="glass-panel" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem' }}>Ingestion Agent</strong>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600', padding: '0.25rem 0.75rem', border: '1px solid var(--success)', borderRadius: '20px' }}>● Online</span>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Operation:</p>
            <p style={{ margin: '0 0 1.5rem 0', fontWeight: '500' }}>Scrubbing PII Data Streams</p>
            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--accent-primary)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Throughput</span>
              <span>85%</span>
            </div>
          </div>
        </div>

        {/* Agent 2 */}
        <div className="glass-panel" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem' }}>Behavioral Agent</strong>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600', padding: '0.25rem 0.75rem', border: '1px solid var(--success)', borderRadius: '20px' }}>● Online</span>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Operation:</p>
            <p style={{ margin: '0 0 1.5rem 0', fontWeight: '500' }}>Detecting Navigational Anomalies</p>
            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'var(--accent-secondary)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Accuracy Confidence</span>
              <span>92%</span>
            </div>
          </div>
        </div>

        {/* Agent 3 */}
        <div className="glass-panel" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem' }}>Promotional Agent</strong>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600', padding: '0.25rem 0.75rem', border: '1px solid var(--success)', borderRadius: '20px' }}>● Online</span>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Operation:</p>
            <p style={{ margin: '0 0 1.5rem 0', fontWeight: '500' }}>Generating Fusion Copy</p>
            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'var(--accent-vibrant)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Queue Capacity</span>
              <span>60%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
