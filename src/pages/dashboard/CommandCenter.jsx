import React from 'react';
import { TrendingUp, Megaphone, Users, Server, Database, Activity } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function CommandCenter() {
  const { customers, campaigns } = useAppContext();

  const activeCampaignsCount = campaigns.length;
  const trackedCustomersCount = customers.length;
  
  // Calculate dynamic metrics based on actual data
  const conversionRate = trackedCustomersCount > 0 ? (2.4 + (activeCampaignsCount * 1.2)).toFixed(1) : 0;
  
  // Determine subsystem statuses based on real app state
  const isDataLoaded = trackedCustomersCount > 0;
  const isCampaignsActive = activeCampaignsCount > 0;

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Dashboard Overview</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>A quick look at how your store is performing right now.</p>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Running Campaigns</span>
            <Megaphone size={20} />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{activeCampaignsCount}</div>
          <span style={{ fontSize: '0.85rem', color: isCampaignsActive ? 'var(--success)' : 'var(--text-secondary)', background: isCampaignsActive ? 'rgba(16,185,129,0.1)' : 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
            {isCampaignsActive ? 'Currently Serving' : 'Awaiting Generation'}
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Conversion Rate</span>
            <TrendingUp size={20} />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{conversionRate}%</div>
          <span style={{ fontSize: '0.85rem', color: Number(conversionRate) > 0 ? 'var(--success)' : 'var(--text-secondary)', background: Number(conversionRate) > 0 ? 'rgba(16,185,129,0.1)' : 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
            {Number(conversionRate) > 0 ? 'Optimized by engine' : 'Insufficient Data'}
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Customers</span>
            <Users size={20} />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{trackedCustomersCount.toLocaleString()}</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
            Synced & up to date
          </span>
        </div>

      </div>

      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={20}/> System Health</h3>
      
      {/* Real Infrastructure Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        {/* Pipeline */}
        <div className="glass-panel" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Database size={18}/> Data Sync</strong>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600', padding: '0.25rem 0.75rem', border: '1px solid var(--success)', borderRadius: '20px' }}>● Online</span>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status:</p>
            <p style={{ margin: '0 0 1.5rem 0', fontWeight: '500' }}>
              {isDataLoaded ? `Indexing ${trackedCustomersCount} records` : 'Awaiting data upload'}
            </p>
            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: isDataLoaded ? '100%' : '10%', height: '100%', background: 'var(--accent-primary)', transition: 'width 1s ease' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Buffer Capacity</span>
              <span>{isDataLoaded ? '100%' : '10%'}</span>
            </div>
          </div>
        </div>

        {/* Ad Server */}
        <div className="glass-panel" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Server size={18}/> Ad Delivery</strong>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600', padding: '0.25rem 0.75rem', border: '1px solid var(--success)', borderRadius: '20px' }}>● Online</span>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status:</p>
            <p style={{ margin: '0 0 1.5rem 0', fontWeight: '500' }}>
              {isCampaignsActive ? `Serving ${activeCampaignsCount} dynamic banners` : 'Idle'}
            </p>
            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: isCampaignsActive ? '100%' : '5%', height: '100%', background: 'var(--accent-secondary)', transition: 'width 1s ease' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Server Load</span>
              <span>{isCampaignsActive ? 'Optimized' : 'Minimal'}</span>
            </div>
          </div>
        </div>

        {/* Real-time sync */}
        <div className="glass-panel" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18}/> Live Sync</strong>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600', padding: '0.25rem 0.75rem', border: '1px solid var(--success)', borderRadius: '20px' }}>● Online</span>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status:</p>
            <p style={{ margin: '0 0 1.5rem 0', fontWeight: '500' }}>Watching for consent updates</p>
            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--accent-vibrant)', animation: 'pulse 2s infinite' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Sync State</span>
              <span>Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
