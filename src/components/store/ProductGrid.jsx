import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function ProductGrid({ activeCustomer, onPurchaseSuccess }) {
  const { updateCustomer } = useAppContext();

  // Comprehensive catalog with categories mapped to behavioral segments and domains
  const catalog = [
    // Sports / Gym / Fitness Domain
    { id: 'sp_101', name: 'Aero Glide Runners', category: 'Sports Wear', domain: 'sports', price: 4999, originalPrice: 6999, discount: '-28%', desc: 'Ultra-lightweight breathable mesh', segment: 'Gym Freak', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_102', name: 'Pure Isolate Pro', category: 'Fitness Nutrition', domain: 'sports', price: 2975, originalPrice: 3500, discount: '-15%', desc: '28g Pure Whey Protein / Serving', segment: 'Gym Freak', image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_103', name: 'Zen Grip Mat', category: 'Yoga & Wellness', domain: 'sports', price: 1899, originalPrice: 2499, discount: '-24%', desc: 'Eco-friendly non-slip natural rubber', segment: 'Yoga Lover', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_104', name: 'Summit Trekking Boots', category: 'Outdoor Gear', domain: 'sports', price: 5499, originalPrice: 7999, discount: '-31%', desc: 'Waterproof rugged trail grips', segment: 'Weekend Warrior', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_105', name: 'Pro Sprint Compression Set', category: 'Sports Wear', domain: 'sports', price: 2199, originalPrice: 2999, discount: '-26%', desc: 'Moisture-wicking athletic fit', segment: 'Marathon Runner', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_106', name: 'HydraFlask 1L', category: 'Fitness Accessories', domain: 'sports', price: 999, originalPrice: 1299, discount: '-23%', desc: 'Insulated vacuum stainless steel', segment: 'Gym Freak', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500&auto=format&fit=crop' },

    // Tech / Gaming Domain
    { id: 'tc_201', name: 'RTX 4090 Gaming GPU', category: 'PC Hardware', domain: 'tech', price: 154999, originalPrice: 169999, discount: '-8%', desc: '24GB GDDR6X extreme performance', segment: 'Gamer', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_202', name: 'Sonic Pro ANC Headphones', category: 'Audio', domain: 'tech', price: 12999, originalPrice: 16999, discount: '-23%', desc: 'Active noise cancelling with 40h battery', segment: 'Audioophile', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_203', name: 'Aura Ambient Smart Bulbs (Pack of 4)', category: 'Smart Home', domain: 'tech', price: 2499, originalPrice: 3499, discount: '-28%', desc: '16M RGB colors, Alexa & Google sync', segment: 'Smart Home', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_204', name: 'Mechanix RGB Keyboard', category: 'Gaming Peripherals', domain: 'tech', price: 4999, originalPrice: 6999, discount: '-28%', desc: 'Tactile mechanical blue switches', segment: 'Gamer', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_205', name: 'MagSafe Wireless Charging Pad', category: 'Tech Accessories', domain: 'tech', price: 2999, originalPrice: 3999, discount: '-25%', desc: 'Fast 15W magnetic wireless dock', segment: 'Apple Fanboy', image: 'https://images.unsplash.com/photo-1622445268121-ec11d3266331?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_206', name: 'UltraWide 4K Gaming Monitor', category: 'Displays', domain: 'tech', price: 34999, originalPrice: 42999, discount: '-18%', desc: '144Hz 1ms Curved HDR display', segment: 'Gamer', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500&auto=format&fit=crop' },

    // Grocery / Health Domain
    { id: 'gr_301', name: 'Organic Almond Milk 1L (Pack of 3)', category: 'Health Grocery', domain: 'grocery', price: 699, originalPrice: 899, discount: '-22%', desc: 'Unsweetened 100% plant based', segment: 'Health Conscious', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=500&auto=format&fit=crop' },
    { id: 'gr_302', name: 'Crunchy Protein Bar Assortment', category: 'Snacks', domain: 'grocery', price: 849, originalPrice: 1099, discount: '-22%', desc: '20g protein per bar, zero added sugar', segment: 'Snack Lover', image: 'https://images.unsplash.com/photo-1622484210800-885100062b08?q=80&w=500&auto=format&fit=crop' },
    { id: 'gr_303', name: 'Organic Rolled Oats & Quinoa 2kg', category: 'Health Grocery', domain: 'grocery', price: 549, originalPrice: 749, discount: '-26%', desc: 'High fiber whole grain breakfast', segment: 'Health Conscious', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=500&auto=format&fit=crop' },
    { id: 'gr_304', name: 'Extra Virgin Cold Pressed Olive Oil 1L', category: 'Health Grocery', domain: 'grocery', price: 1299, originalPrice: 1699, discount: '-23%', desc: '100% Mediterranean organic olives', segment: 'Health Conscious', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&auto=format&fit=crop' },
    { id: 'gr_305', name: 'Artisanal French Press Coffee Powder', category: 'Gourmet Beverage', domain: 'grocery', price: 499, originalPrice: 699, discount: '-28%', desc: '100% Arabica dark roast ground beans', segment: 'Bulk Buyer', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=500&auto=format&fit=crop' },
    { id: 'gr_306', name: 'Raw Honey & Iranian Pistachios Combo', category: 'Organic Snacks', domain: 'grocery', price: 999, originalPrice: 1399, discount: '-28%', desc: 'Pure wildflower honey & premium nuts', segment: 'Vegan', image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=500&auto=format&fit=crop' },

    // Home / Decor Domain
    { id: 'hm_401', name: 'Minimalist Nordic Desk Lamp', category: 'Home Decor', domain: 'home', price: 1799, originalPrice: 2499, discount: '-28%', desc: 'Warm LED touch dimmable light', segment: 'Decor', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500&auto=format&fit=crop' },
    { id: 'hm_402', name: 'Monstera Deliciosa Plant + Ceramic Pot', category: 'Indoor Plants', domain: 'home', price: 899, originalPrice: 1299, discount: '-30%', desc: 'Air purifying easy-care indoor green', segment: 'Plant Parent', image: 'https://images.unsplash.com/photo-1416879598555-220f8bb10864?q=80&w=500&auto=format&fit=crop' },
    { id: 'hm_403', name: 'Non-Stick Granite Cookware Combo', category: 'Kitchenware', domain: 'home', price: 3499, originalPrice: 4999, discount: '-30%', desc: '3-piece non-stick induction cookware', segment: 'Kitchen Master', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=500&auto=format&fit=crop' },
    { id: 'hm_404', name: 'Velvet Accent Living Room Chair', category: 'Furniture', domain: 'home', price: 8999, originalPrice: 12999, discount: '-30%', desc: 'Ergonomic plush velvet armchair', segment: 'New Homeowner', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=500&auto=format&fit=crop' },
    { id: 'hm_405', name: 'Aroma Essential Oil Diffuser', category: 'Wellness', domain: 'home', price: 1199, originalPrice: 1599, discount: '-25%', desc: '7 color mood light ultrasonic mist', segment: 'Decor', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500&auto=format&fit=crop' },
    { id: 'hm_406', name: 'Ergonomic Memory Foam Contour Pillow', category: 'Bedding', domain: 'home', price: 1899, originalPrice: 2499, discount: '-24%', desc: 'Cervical spine support contour design', segment: 'New Homeowner', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop' }
  ];

  // Infer Active Customer Domain & Segments
  const activeSegments = activeCustomer?.segments || ['Gym Freak'];
  const customerToken = activeCustomer?.token_id || '';
  const customerDomain = customerToken.split('_')[1] || 'gen';

  // SMART BEHAVIORAL SCORING ALGORITHM
  const scoredProducts = catalog.map(item => {
    let score = 0;
    
    // 1. Direct behavioral segment match (Highest Priority)
    if (activeSegments.includes(item.segment)) {
      score += 100;
    }

    // 2. Domain / Category Vertical Match
    if (item.domain === customerDomain) {
      score += 50;
    }

    // 3. Purchase History Keyword Match
    const historyStr = (activeCustomer?.purchase_history || []).join(' ').toLowerCase();
    if (historyStr) {
      item.name.toLowerCase().split(' ').forEach(word => {
        if (word.length > 3 && historyStr.includes(word)) score += 30;
      });
    }

    // 4. Secondary Domain Affinity
    if (customerDomain === 'grocery' && (item.domain === 'grocery' || item.category.toLowerCase().includes('health') || item.category.toLowerCase().includes('snack'))) {
      score += 25;
    } else if (customerDomain === 'sports' && (item.domain === 'sports' || item.category.toLowerCase().includes('sport') || item.category.toLowerCase().includes('fitness'))) {
      score += 25;
    } else if (customerDomain === 'tech' && (item.domain === 'tech' || item.category.toLowerCase().includes('audio') || item.category.toLowerCase().includes('hardware'))) {
      score += 25;
    } else if (customerDomain === 'home' && (item.domain === 'home' || item.category.toLowerCase().includes('decor') || item.category.toLowerCase().includes('kitchen'))) {
      score += 25;
    }

    return { ...item, score };
  });

  // Sort products descending by relevance score
  scoredProducts.sort((a, b) => b.score - a.score);

  // Trending for You: Top 6 Highest-Scoring Relevant Products
  const behavioralRows = scoredProducts.slice(0, 6);
  
  // Explore More Categories: Remaining catalog items
  const discoveryRows = scoredProducts.slice(6, 12);

  const handleBuyItem = (product) => {
    // 1. Determine if this purchase represents a new behavioral segment
    let newSegments = [...activeSegments];
    let mutated = false;

    if (product.segment && product.segment !== 'General' && !newSegments.includes(product.segment)) {
      newSegments = [product.segment, ...newSegments]; // Prepend new behavior
      mutated = true;
    }

    // 2. Add product to purchase history
    const updatedHistory = [...(activeCustomer?.purchase_history || []), `1x ${product.name}`];

    // 3. Update customer in AppContext + DB
    if (activeCustomer?.token_id) {
      updateCustomer(activeCustomer.token_id, {
        segments: newSegments,
        purchase_history: updatedHistory
      });
    }

    // 4. Trigger purchase toast notification in parent
    if (onPurchaseSuccess) {
      onPurchaseSuccess(product, mutated, product.segment);
    }
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      
      {/* ---------------- SECTION 1: ROWS 1-3 (BEHAVIORAL RECOMMENDATIONS) ---------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.25rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} style={{ color: 'var(--accent-primary)' }} />
            Trending for You
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
            Picked for you based on your interests.
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-primary)', cursor: 'pointer' }}>View All</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3.5rem' }}>
        {behavioralRows.slice(0, 6).map(item => (
          <ProductCard key={item.id} product={item} isPersonalized={true} onBuy={() => handleBuyItem(item)} />
        ))}
      </div>

      {/* ---------------- SECTION 2: ROWS 4-6 (GENERAL DISCOVERY PRODUCTS) ---------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 0.25rem 0', color: '#0f172a' }}>
            Explore More Categories
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.85rem' }}>
            Discover something new across different categories.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
        {discoveryRows.slice(0, 6).map(item => (
          <ProductCard key={item.id} product={item} isPersonalized={false} onBuy={() => handleBuyItem(item)} />
        ))}
      </div>

    </div>
  );
}

// Single Product Card Component
function ProductCard({ product, isPersonalized, onBuy }) {
  return (
    <div 
      className="glass-panel animate-fade-in" 
      style={{ 
        padding: '0', 
        borderRadius: '20px', 
        background: 'white', 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      {/* Product Image Container */}
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden', background: '#f1f5f9' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Discount / Persona Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {product.discount && (
            <span style={{ background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>
              {product.discount}
            </span>
          )}
          {isPersonalized && (
            <span style={{ background: 'rgba(79, 70, 229, 0.9)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>
              Matched
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
          {product.category}
        </div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 0.35rem 0', color: '#0f172a' }}>
          {product.name}
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem 0', flexGrow: 1 }}>
          {product.desc}
        </p>

        {/* Price & Buy Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button 
            onClick={onBuy}
            className="btn-primary"
            style={{ 
              padding: '0.6rem 1.25rem', 
              borderRadius: '10px', 
              fontSize: '0.85rem', 
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)'
            }}
          >
            <ShoppingBag size={14} /> Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}
