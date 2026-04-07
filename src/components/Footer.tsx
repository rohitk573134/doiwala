import { Instagram, Facebook, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3a2c2c] text-[#fff8f0] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-[#ff9933] tracking-wide">DOIWALA</h3>
            <p className="text-[#fff8f0]/70 text-sm leading-relaxed max-w-xs">
              Bringing the authentic taste of Kolkata's famous sweets and chaat to the beautiful islands of Andaman.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/doiwala_andaman/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#fff8f0]/10 flex items-center justify-center hover:bg-[#ff9933] hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/people/Doiwala-Andaman/61561160398773/?locale=sv_SE#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#fff8f0]/10 flex items-center justify-center hover:bg-[#ff9933] hover:text-white transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-sm text-[#fff8f0]/70">
              <li><a href="#home" className="hover:text-[#ff9933] transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-[#ff9933] transition-colors">Our Menu</a></li>
              <li><a href="#why-us" className="hover:text-[#ff9933] transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-[#ff9933] transition-colors">Reviews</a></li>
              <li><a href="#gallery" className="hover:text-[#ff9933] transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-[#ff9933] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-sm text-[#fff8f0]/70">
              <li>JPRH+G78, ATR MAIN ROAD</li>
              <li>near Anand Paradise Theater School Line</li>
              <li>Andaman Housing Coop Society</li>
              <li>Sri Vijaya Puram, Andaman and Nicobar Islands 744103</li>
              <li className="pt-2">
                <a href="tel:08900902929" className="hover:text-[#ff9933] transition-colors">089009 02929</a>
              </li>
              <li>
                <a href="mailto:doiwala.andaman@gmail.com" className="hover:text-[#ff9933] transition-colors">doiwala.andaman@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-white">Opening Hours</h4>
            <ul className="space-y-4 text-sm text-[#fff8f0]/70">
              <li className="flex justify-between border-b border-[#fff8f0]/10 pb-2">
                <span>Monday - Sunday</span>
                <span>9:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#fff8f0]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#fff8f0]/50">
          <p>&copy; {new Date().getFullYear()} Doiwala Port Blair. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
            <p className="flex items-center">
              Made with <Heart size={14} className="mx-1 text-[#ff9933] fill-current" /> for food lovers
            </p>
            <a href="#/admin" className="hover:text-[#ff9933] transition-colors text-xs opacity-50 hover:opacity-100">
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
