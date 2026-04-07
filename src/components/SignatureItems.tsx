import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../CartContext';

export default function SignatureItems() {
  const [signatureItems, setSignatureItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const q = query(collection(db, 'menuItems'), where('isSignature', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setSignatureItems(items);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching signature items:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading signature items...</p>
        </div>
      </section>
    );
  }

  if (signatureItems.length === 0) {
    return null;
  }

  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#3a2c2c] mb-4"
          >
            Signature <span className="text-[#ff9933] italic">Delights</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#3a2c2c]/70 max-w-2xl mx-auto"
          >
            Experience the authentic taste of Kolkata with our most loved dishes, prepared fresh daily.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#fff8f0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3a2c2c]/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {item.tag && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#ff9933] shadow-sm flex items-center">
                    <Star size={12} className="mr-1 fill-current" />
                    {item.tag}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-[#3a2c2c] group-hover:text-[#ff9933] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-lg font-semibold text-[#ff9933]">{item.price}</span>
                </div>
                <p className="text-[#3a2c2c]/70 text-sm mb-6 line-clamp-2">
                  {item.desc}
                </p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full py-3 rounded-xl border-2 border-[#ff9933] text-[#ff9933] font-medium hover:bg-[#ff9933] hover:text-white transition-colors duration-300"
                >
                  Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
