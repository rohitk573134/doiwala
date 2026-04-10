import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function LocationContact() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#3a2c2c] mb-4"
          >
            Visit <span className="text-[#ff9933] italic">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#3a2c2c]/70 max-w-2xl mx-auto"
          >
            Come experience the taste of Kolkata in the heart of Port Blair.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-start space-x-4 p-6 rounded-2xl bg-[#fff8f0] border border-[#ff9933]/10 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin size={24} className="text-[#ff9933]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#3a2c2c] text-xl mb-2">Location</h3>
                <p className="text-[#3a2c2c]/70 text-sm leading-relaxed">
                  JPRH+G78, ATR MAIN ROAD,<br />
                  near Anand Paradise Theater School Line,<br />
                  Andaman Housing Coop Society,<br />
                  Sri Vijaya Puram, Andaman and Nicobar Islands 744103
                </p>
                <a
                  href="https://www.google.com/maps/place/Doiwala/@11.6414435,92.7282822,20.91z/data=!4m6!3m5!1s0x3088957c425e27ad:0xf70723b51c18f9d4!8m2!3d11.641299!4d92.7282029!16s%2Fg%2F11l2xr5zf5?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 text-[#ff9933] font-medium text-sm hover:underline"
                >
                  Get Directions <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start space-x-4 p-6 rounded-2xl bg-[#fff8f0] border border-[#ff9933]/10 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Clock size={24} className="text-[#ff9933]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#3a2c2c] text-xl mb-2">Hours</h3>
                <p className="text-[#3a2c2c]/70 text-sm leading-relaxed">
                  Monday - Sunday<br />
                  9:00 AM - 9:00 PM
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start space-x-4 p-6 rounded-2xl bg-[#fff8f0] border border-[#ff9933]/10 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone size={24} className="text-[#ff9933]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#3a2c2c] text-xl mb-2">Contact</h3>
                <p className="text-[#3a2c2c]/70 text-sm leading-relaxed mb-1">
                  <a href="tel:08900902929" className="hover:text-[#ff9933] transition-colors">089009 02929</a>
                </p>
                <p className="text-[#3a2c2c]/70 text-sm leading-relaxed flex items-center">
                  <Mail size={14} className="mr-2 text-[#ff9933]" />
                  <a href="mailto:doiwala.andaman@gmail.com" className="hover:text-[#ff9933] transition-colors">doiwala.andaman@gmail.com</a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-[400px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-[#fff8f0]"
            >
              <iframe
                src="https://maps.google.com/maps?q=11.641299,92.7282029&hl=en&z=20&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Doiwala Location"
                className="grayscale-[20%] contrast-[1.1]"
              ></iframe>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
