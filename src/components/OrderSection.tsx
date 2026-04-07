import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';

export default function OrderSection() {
  return (
    <section id="order" className="py-24 bg-[#ff9933] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Order <span className="text-[#3a2c2c] italic">Online</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Get your favorite sweets and chaat delivered hot and fresh to your doorstep.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          
          <motion.a
            href="https://www.swiggy.com/search?query=Doiwala"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-4 border-transparent hover:border-white"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-[#fc8019] flex items-center justify-center text-white p-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17.51 11.23c-.1-.13-.23-.23-.38-.28l-3.87-1.3c-.2-.07-.42-.07-.62 0l-3.87 1.3c-.15.05-.28.15-.38.28-.1.13-.15.29-.15.45v4.64c0 .16.05.32.15.45.1.13.23.23.38.28l3.87 1.3c.1.03.2.05.31.05s.21-.02.31-.05l3.87-1.3c.15-.05.28-.15.38-.28.1-.13.15-.29.15-.45v-4.64c0-.16-.05-.32-.15-.45zM12 16.64l-2.45-.82v-2.98l2.45.82 2.45-.82v2.98l-2.45.82zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3a2c2c] mb-1">Swiggy</h3>
            <p className="text-sm text-[#3a2c2c]/60 font-medium group-hover:text-[#fc8019] transition-colors">Order Now &rarr;</p>
          </motion.a>

          <motion.a
            href="https://www.zomato.com/port-blair/restaurants?q=Doiwala"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-4 border-transparent hover:border-white"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-[#e23744] flex items-center justify-center text-white p-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3a2c2c] mb-1">Zomato</h3>
            <p className="text-sm text-[#3a2c2c]/60 font-medium group-hover:text-[#e23744] transition-colors">Order Now &rarr;</p>
          </motion.a>

          <motion.a
            href="tel:08900902929"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-4 border-transparent hover:border-white"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-[#3a2c2c] flex items-center justify-center text-white p-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Phone size={28} />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3a2c2c] mb-1">Call Us</h3>
            <p className="text-sm text-[#3a2c2c]/60 font-medium group-hover:text-[#3a2c2c] transition-colors">089009 02929</p>
          </motion.a>

          <motion.a
            href="https://wa.me/918900902929?text=Hi%20Doiwala!%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-4 border-transparent hover:border-white"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-[#25D366] flex items-center justify-center text-white p-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={32} />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3a2c2c] mb-1">WhatsApp</h3>
            <p className="text-sm text-[#3a2c2c]/60 font-medium group-hover:text-[#25D366] transition-colors">Chat with us</p>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
