import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../CartContext';

const menuCategories = ['All', 'Chaat', 'Snacks'];

export default function FullMenu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setMenuItems(items);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredMenu = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="full-menu" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#3a2c2c] mb-4"
          >
            Our <span className="text-[#ff9933] italic">Menu</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#3a2c2c]/70 max-w-2xl mx-auto"
          >
            Explore our wide range of vegetarian delicacies.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#ff9933] text-white shadow-md'
                  : 'bg-[#fff8f0] text-[#3a2c2c] hover:bg-[#ff9933]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading menu...</div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Menu is currently empty.</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col rounded-3xl bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(255,153,51,0.15)] transition-all duration-300 hover:-translate-y-2 border border-[#3a2c2c]/5"
                >
                  <div className="w-full h-56 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      loading="lazy"
                      referrerPolicy="no-referrer" 
                    />
                    {item.tag && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff9933] to-[#e68a2e] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        {item.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-serif font-bold text-[#3a2c2c] pr-4">{item.name}</h3>
                      <span className="text-xl font-bold text-[#ff9933] whitespace-nowrap bg-[#ff9933]/10 px-3 py-1 rounded-lg">{item.price}</span>
                    </div>
                    <p className="text-[#3a2c2c]/60 text-sm leading-relaxed mb-6 flex-1">{item.desc}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full text-center py-3 rounded-xl font-medium text-[#ff9933] bg-[#ff9933]/10 hover:bg-[#ff9933] hover:text-white transition-colors duration-300"
                    >
                      Add to Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        <div className="mt-16 text-center">
          <a
            href="#order"
            className="inline-flex items-center justify-center px-8 py-4 font-medium text-white bg-[#3a2c2c] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#2a1f1f] hover:shadow-lg hover:-translate-y-1"
          >
            Order Online Now
          </a>
        </div>
      </div>
    </section>
  );
}
