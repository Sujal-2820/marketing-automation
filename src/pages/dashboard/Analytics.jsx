import React from 'react';
import { TrendingUp, TrendingDown, Users, Target, Activity, IndianRupee, Sparkles, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Analytics() {
  const { customers, campaigns } = useAppContext();

  // Basic derived metrics
  const totalCustomers = customers.length;
  const activeCampaigns = campaigns.length;
  
  // Simulate ROI based on data volume
  const estimatedROI = totalCustomers > 0 ? (totalCustomers * 15.4).toFixed(0) : 0;
  const conversionRate = totalCustomers > 0 ? (Math.min(100, 2.4 + (activeCampaigns * 1.2))).toFixed(1) : 0;

  // Determine top performing campaign
  const topCampaign = campaigns.length > 0 ? campaigns[0] : null;

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Performance & Insights</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>See how your campaigns are doing at a glance.</p>
      
      {/* 1. Textual Guided Insights Section */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0.15) 100%)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)' }}>
            <Sparkles size={32} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#1e1b4b' }}>What's Happening</h3>
            {totalCustomers === 0 ? (
              <p style={{ fontSize: '1.1rem', color: '#312e81', lineHeight: '1.6' }}>
                No data uploaded yet. Head to the <strong>Dashboard</strong> to upload your customer list, then visit <strong>Campaigns</strong> to create your first ads.
              </p>
            ) : campaigns.length === 0 ? (
              <p style={{ fontSize: '1.1rem', color: '#312e81', lineHeight: '1.6' }}>
                You've added <strong>{totalCustomers} customers</strong>. Now go to <strong>Campaigns</strong> and click "Generate" to start reaching them with personalised ads.
              </p>
            ) : (
              <p style={{ fontSize: '1.1rem', color: '#312e81', lineHeight: '1.6' }}>
                Great news! Your campaigns are driving a simulated <strong>{conversionRate}% conversion rate</strong> across your {totalCustomers} uploaded customers. 
                The <strong style={{ color: 'var(--accent-primary)' }}>"{topCampaign.target}"</strong> segment is currently showing the highest engagement. 
                We recommend keeping your localized Hinglish SMS strategy active, as it is contributing heavily to this week's estimated ₹{Number(estimatedROI).toLocaleString('en-IN')} return on ad spend.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Simple KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <KPICard 
          icon={<Users size={24} color="#6366f1" />} 
          title="Tracked Customers" 
          value={totalCustomers.toLocaleString()} 
          trend={totalCustomers > 0 ? "+12%" : "0%"} 
        />
        <KPICard 
          icon={<Target size={24} color="#ec4899" />} 
          title="Active Campaigns" 
          value={activeCampaigns} 
          trend={activeCampaigns > 0 ? "Optimized" : "Pending"} 
          neutral={activeCampaigns === 0}
        />
        <KPICard 
          icon={<IndianRupee size={24} color="#10b981" />} 
          title="Estimated ROI" 
          value={`₹${Number(estimatedROI).toLocaleString('en-IN')}`} 
          trend="+8.4%" 
          neutral={estimatedROI == 0}
        />
        <KPICard 
          icon={<Activity size={24} color="#f59e0b" />} 
          title="Avg. Conversion Rate" 
          value={`${conversionRate}%`} 
          trend="+1.2%" 
          neutral={conversionRate == 0}
        />
      </div>

      {/* 3. Campaign Performance Cards */}
      {campaigns.length > 0 && (
        <>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <MessageSquare size={20} /> Campaign Results
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {campaigns.map((campaign, index) => {
              // Simulate varying performance based on index
              const performanceScore = Math.max(40, 95 - (index * 12)); 
              const isGood = performanceScore >= 70;
              
              return (
                <div key={campaign.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${isGood ? '#10b981' : '#f59e0b'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Target: {campaign.target}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Banner + SMS</p>
                    </div>
                    {isGood ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        <TrendingUp size={16} /> Performing Well
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        <TrendingDown size={16} /> Needs Attention
                      </span>
                    )}
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Engagement Score</span>
                      <span style={{ fontWeight: 'bold' }}>{performanceScore}/100</span>
                    </div>
                    {/* Simple Progress Bar */}
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${performanceScore}%`, height: '100%', background: isGood ? '#10b981' : '#f59e0b', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic' }}>
                    {isGood ? 
                      "This campaign's localized Hinglish copy is resonating strongly with this demographic." : 
                      "Consider tweaking the banner photo in the Live Feed to boost engagement."}
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}

    </div>
  );
}

// Helper component for simple KPI boxes
function KPICard({ icon, title, value, trend, neutral }) {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ background: 'var(--bg-main)', padding: '0.75rem', borderRadius: '12px' }}>
          {icon}
        </div>
        <span style={{ 
          fontSize: '0.85rem', 
          fontWeight: 'bold', 
          color: neutral ? 'var(--text-secondary)' : (trend.startsWith('+') ? '#10b981' : '#ef4444'),
          background: neutral ? 'var(--bg-main)' : (trend.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          {trend}
        </span>
      </div>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{value}</h3>
      </div>
    </div>
  );
}
