import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1601050690597-df056fb04791?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626132646529-500637532537?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589113103503-49675c88835b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596797038558-9da39b925493?q=80&w=800&auto=format&fit=crop',
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#fff8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#3a2c2c] mb-4"
          >
            Follow our <span className="text-[#ff9933] italic">Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#3a2c2c]/70 max-w-2xl mx-auto flex items-center justify-center gap-2"
          >
            <Instagram size={20} className="text-[#ff9933]" />
            <span>@doiwala.andaman</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <Instagram size={32} className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
