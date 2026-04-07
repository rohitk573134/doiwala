import { motion } from 'motion/react';
import { Star, Users, Award, Leaf } from 'lucide-react';

const trustItems = [
  {
    icon: <Star className="w-8 h-8 text-[#ff9933]" fill="currentColor" />,
    value: '4.7⭐',
    label: 'Highly Rated',
    desc: 'Consistently loved by locals and tourists alike.'
  },
  {
    icon: <Users className="w-8 h-8 text-[#ff9933]" />,
    value: '1000+',
    label: 'Happy Customers',
    desc: 'Serving smiles with every bite we deliver.'
  },
  {
    icon: <Award className="w-8 h-8 text-[#ff9933]" />,
    value: 'Authentic',
    label: 'Kolkata Taste',
    desc: 'Traditional recipes passed down through generations.'
  },
  {
    icon: <Leaf className="w-8 h-8 text-[#ff9933]" fill="currentColor" />,
    value: '100%',
    label: 'Pure Veg',
    desc: 'Strictly vegetarian kitchen with premium ingredients.'
  }
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-[#fff8f0] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff9933]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff9933]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_8px_30px_rgba(255,153,51,0.15)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_10px_40px_rgba(255,153,51,0.25)] transition-all duration-300 border border-[#ff9933]/10">
                {item.icon}
              </div>
              <h3 className="text-4xl font-serif font-bold text-[#3a2c2c] mb-2">{item.value}</h3>
              <h4 className="text-lg font-bold text-[#ff9933] uppercase tracking-wider mb-3">{item.label}</h4>
              <p className="text-[#3a2c2c]/70 text-sm leading-relaxed max-w-[200px]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
