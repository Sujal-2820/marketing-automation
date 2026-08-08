import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function ProductGrid({ activeCustomer, onPurchaseSuccess }) {
  const { updateCustomer } = useAppContext();

  // Comprehensive catalog with categories mapped to behavioral segments
  const catalog = [
    // ---------------- PERSONALIZEABLE SEGMENT PRODUCTS (ROWS 1 - 3) ----------------
    // Sports / Gym / Fitness Segment
    { id: 'sp_101', name: 'Aero Glide Runners', category: 'Sports Wear', price: 4999, originalPrice: 6999, discount: '-28%', desc: 'Ultra-lightweight breathable mesh', segment: 'Gym Freak', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_102', name: 'Pure Isolate Pro', category: 'Fitness Nutrition', price: 2975, originalPrice: 3500, discount: '-15%', desc: '28g Pure Whey Protein / Serving', segment: 'Gym Freak', image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_103', name: 'Zen Grip Mat', category: 'Yoga & Wellness', price: 1899, originalPrice: 2499, discount: '-24%', desc: 'Eco-friendly non-slip natural rubber', segment: 'Yoga Lover', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_104', name: 'Summit Trekking Boots', category: 'Outdoor Gear', price: 5499, originalPrice: 7999, discount: '-31%', desc: 'Waterproof rugged trail grips', segment: 'Weekend Warrior', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_105', name: 'Pro Sprint Compression Set', category: 'Sports Wear', price: 2199, originalPrice: 2999, discount: '-26%', desc: 'Moisture-wicking athletic fit', segment: 'Marathon Runner', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop' },
    { id: 'sp_106', name: 'HydraFlask 1L', category: 'Fitness Accessories', price: 999, originalPrice: 1299, discount: '-23%', desc: 'Insulated vacuum stainless steel', segment: 'Gym Freak', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500&auto=format&fit=crop' },

    // Tech / Gaming Segment
    { id: 'tc_201', name: 'RTX 4090 Gaming GPU', category: 'PC Hardware', price: 154999, originalPrice: 169999, discount: '-8%', desc: '24GB GDDR6X extreme performance', segment: 'Gamer', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_202', name: 'Sonic Pro ANC Headphones', category: 'Audio', price: 12999, originalPrice: 16999, discount: '-23%', desc: 'Active noise cancelling with 40h battery', segment: 'Audioophile', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_203', name: 'Aura Ambient Smart Bulbs (Pack of 4)', category: 'Smart Home', price: 2499, originalPrice: 3499, discount: '-28%', desc: '16M RGB colors, Alexa & Google sync', segment: 'Smart Home', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=500&auto=format&fit=crop' },
    { id: 'tc_204', name: 'Mechanix RGB Keyboard', category: 'Gaming Peripherals', price: 4999, originalPrice: 6999, discount: '-28%', desc: 'Tactile mechanical blue switches', segment: 'Gamer', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500&auto=format&fit=crop' },

    // Grocery / Health Segment
    { id: 'gr_301', name: 'Organic Almond Milk 1L (Pack of 3)', category: 'Health Grocery', price: 699, originalPrice: 899, discount: '-22%', desc: 'Unsweetened 100% plant based', segment: 'Health Conscious', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=500&auto=format&fit=crop' },
    { id: 'gr_302', name: 'Crunchy Protein Bar Assortment', category: 'Snacks', price: 849, originalPrice: 1099, discount: '-22%', desc: '20g protein per bar, zero added sugar', segment: 'Snack Lover', image: 'https://images.unsplash.com/photo-1622484210800-885100062b08?q=80&w=500&auto=format&fit=crop' },

    // Home / Decor Segment
    { id: 'hm_401', name: 'Minimalist Nordic Desk Lamp', category: 'Home Decor', price: 1799, originalPrice: 2499, discount: '-28%', desc: 'Warm LED touch dimmable light', segment: 'Decor', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500&auto=format&fit=crop' },
    { id: 'hm_402', name: 'Monstera Deliciosa Plant + Ceramic Pot', category: 'Indoor Plants', price: 899, originalPrice: 1299, discount: '-30%', desc: 'Air purifying easy-care indoor green', segment: 'Plant Parent', image: 'https://images.unsplash.com/photo-1416879598555-220f8bb10864?q=80&w=500&auto=format&fit=crop' },

    // ---------------- GENERAL / RANDOM DISCOVERY PRODUCTS (ROWS 4 - 6) ----------------
    { id: 'gn_501', name: 'Classic Leather Minimalist Wallet', category: 'Accessories', price: 1299, originalPrice: 1799, discount: '-27%', desc: 'RFID blocking genuine leather', segment: 'General', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=500&auto=format&fit=crop' },
    { id: 'gn_502', name: 'Atomic Habits (Hardcover)', category: 'Books', price: 499, originalPrice: 799, discount: '-37%', desc: 'Bestselling self-improvement guide', segment: 'General', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500&auto=format&fit=crop' },
    { id: 'gn_503', name: 'Double Espresso French Press', category: 'Kitchenware', price: 1499, originalPrice: 1999, discount: '-25%', desc: 'Stainless steel mesh filter 800ml', segment: 'General', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=500&auto=format&fit=crop' },
    { id: 'gn_504', name: 'Urban Canvas Travel Backpack', category: 'Travel', price: 2999, originalPrice: 3999, discount: '-25%', desc: 'Water resistant laptop sleeve 30L', segment: 'General', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop' },
    { id: 'gn_505', name: 'Ergonomic Memory Foam Pillow', category: 'Bedding', price: 1899, originalPrice: 2499, discount: '-24%', desc: 'Cervical spine support contour design', segment: 'General', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop' },
    { id: 'gn_506', name: 'Aroma Essential Oil Diffuser', category: 'Wellness', price: 1199, originalPrice: 1599, discount: '-25%', desc: '7 color mood light ultrasonic mist', segment: 'General', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500&auto=format&fit=crop' }
  ];

  // Derive Customer Segments
  const activeSegments = activeCustomer?.segments || ['Gym Freak'];

  // SORTING ALGORITHM:
  // Rows 1 - 3: Targeted recommendations matching customer's active segments
  // Rows 4 - 6: Random / Discovery products from general catalog
  const personalizedProducts = catalog.filter(item => activeSegments.includes(item.segment));
  const generalProducts = catalog.filter(item => !activeSegments.includes(item.segment));

  // If personalized list is small, backfill with top items
  const behavioralRows = [...personalizedProducts, ...generalProducts.slice(0, Math.max(0, 6 - personalizedProducts.length))];
  const discoveryRows = generalProducts.slice(Math.max(0, 6 - personalizedProducts.length));

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
