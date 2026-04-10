import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom Animation and Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=2000"
          alt="Delicious Indian Sweets and Snacks"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Floating Elements (Fake 3D) */}
      <motion.div 
        className="absolute top-1/4 left-10 z-20 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: y2 }}
      >
        <span className="text-2xl">🍬</span>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 right-10 z-20 hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        animate={{ y: [0, 30, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ y: y2 }}
      >
        <span className="text-3xl">🥮</span>
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center h-full pt-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
          style={{ opacity }}
        >
          <span className="inline-flex items-center py-1 px-4 rounded-full bg-[#ff9933]/20 text-[#ff9933] font-medium text-sm tracking-widest uppercase mb-4 border border-[#ff9933]/30 backdrop-blur-sm">
            <Star size={14} className="mr-2 fill-current" />
            100% Pure Veg • Authentic Taste
          </span>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <span className="text-2xl md:text-3xl font-script text-[#ff9933] lowercase drop-shadow-lg">dil se desi</span>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Craving the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9933] to-[#ffd700] italic">Perfect</span> Bite?
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
            Experience the authentic taste of Kolkata's famous sweets and street food, right here in Port Blair.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-[#ff9933] to-[#e68a2e] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,153,51,0.6)] hover:scale-105 w-full sm:w-auto text-lg"
            >
              <span className="mr-2 relative z-10">Order Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <button
              onClick={() => document.getElementById('full-menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto text-lg"
            >
              Explore Menu
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('full-menu')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ opacity }}
      >
        <span className="text-white/70 text-sm tracking-widest uppercase mb-2 font-medium">Scroll</span>
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-3 bg-[#ff9933] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
