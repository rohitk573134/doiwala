import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, ChefHat } from 'lucide-react';

const features = [
  {
    icon: <ChefHat size={32} className="text-[#ff9933]" />,
    title: 'Authentic Kolkata Recipe',
    description: 'Generations-old recipes brought directly from the sweet capital of India.',
  },
  {
    icon: <Sparkles size={32} className="text-[#ff9933]" />,
    title: 'Premium Ingredients',
    description: 'Made with 100% pure desi ghee, rich saffron, and the finest quality nuts.',
  },
  {
    icon: <ShieldCheck size={32} className="text-[#ff9933]" />,
    title: 'Spotless Hygiene',
    description: 'Prepared in a state-of-the-art sanitized kitchen with strict safety standards.',
  },
  {
    icon: <Heart size={32} className="text-[#ff9933]" />,
    title: 'Freshly Made Daily',
    description: 'No preservatives. Just fresh, melt-in-the-mouth goodness made every single morning.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-[#fff8f0] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff9933]/5 rounded-l-full blur-3xl -z-10 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3a2c2c] mb-6 leading-tight">
                The <span className="text-[#ff9933] italic">Doiwala</span> Difference
              </h2>
              <p className="text-lg text-[#3a2c2c]/70 mb-10 font-light leading-relaxed">
                We don't just make sweets; we craft experiences. Every bite is a testament to our commitment to purity, tradition, and uncompromising quality.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col space-y-3 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-[#ff9933]/10 group-hover:bg-[#ff9933] group-hover:text-white transition-colors duration-300">
                      {/* Icon color handled by group-hover in a slightly tricky way, so let's just keep the icon color fixed or use currentColor */}
                      <div className="text-[#ff9933] group-hover:text-white transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#3a2c2c]">{feature.title}</h3>
                    <p className="text-[#3a2c2c]/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white group"
            >
              <img
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop"
                alt="Chef preparing sweets"
                className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-serif text-3xl font-bold mb-2 text-[#ff9933]">Crafted with Love</p>
                  <p className="text-white/90 text-sm font-medium tracking-wider uppercase">Since 2015</p>
                </div>
              </div>
            </motion.div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-[#ff9933]/10 max-w-[220px] z-10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#ff9933]/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-[#ff9933]" />
                </div>
                <div>
                  <p className="text-[#3a2c2c] font-bold text-sm">100% Pure</p>
                  <p className="text-[#3a2c2c]/50 text-xs">Desi Ghee</p>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
