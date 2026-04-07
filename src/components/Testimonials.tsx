import { motion } from 'motion/react';
import { Star, StarHalf, Quote } from 'lucide-react';

const row1Reviews = [
  { id: 1, name: 'WeweTu', location: 'Bengaluru, India', platform: 'Tripadvisor', rating: 5, text: 'Nice New Veg All time Snack place. We had an early lunch cum snacks at the place on the way to the airport. Great quality and authentic taste.' },
  { id: 2, name: 'Rahul S.', location: 'Port Blair', platform: 'Google', rating: 5, text: 'The Rasmalai here is absolutely divine! Best in Andaman. Highly recommend visiting if you have a sweet tooth.' },
  { id: 3, name: 'Priya M.', location: 'Mumbai', platform: 'Zomato', rating: 4, text: 'Great place for evening snacks. The Samosa Chaat is highly recommended. Very clean and hygienic environment.' },
  { id: 4, name: 'Amit K.', location: 'Delhi', platform: 'Justdial', rating: 5, text: 'Authentic Bengali sweets in Port Blair. Very hygienic and clean. The staff is also very polite and quick.' },
  { id: 5, name: 'Sneha V.', location: 'Chennai', platform: 'Tripadvisor', rating: 5, text: 'Loved the Pav Bhaji and Mishti Doi. A must-visit for vegetarians looking for quality food in the islands.' },
];

const row2Reviews = [
  { id: 6, name: 'Local Guide', location: 'Port Blair', platform: 'Justdial', rating: 4, text: 'One of the best Indian Sweet Dealers in Port Blair. The sweets are fresh and the chaat is perfectly balanced.' },
  { id: 7, name: 'Foodie Traveler', location: 'India', platform: 'Zomato', rating: 5, text: 'At Doiwala in Port Blair, every sweet bite is a journey to bliss, where the island\'s best flavors come to life.' },
  { id: 8, name: 'Vikram T.', location: 'Kolkata', platform: 'Google', rating: 4, text: 'Good quality sweets, slightly crowded in the evenings but worth the wait. The packaging is excellent for travel.' },
  { id: 9, name: 'Neha R.', location: 'Pune', platform: 'Zomato', rating: 5, text: 'Their Kaju Katli melts in your mouth. Perfect packaging for taking back home. Will definitely visit again!' },
  { id: 10, name: 'Anjali D.', location: 'Hyderabad', platform: 'Justdial', rating: 5, text: 'Finally a pure veg place with amazing chaat options! The Pani Puri water was perfectly spiced and tangy.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#fff8f0] relative overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
          width: max-content;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff9933]/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#3a2c2c] mb-8"
          >
            Real <span className="text-[#ff9933] italic">Reviews</span>
          </motion.h2>
          
          {/* Average Rating Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-sm border border-[#ff9933]/20 max-w-sm mx-auto"
          >
            <div className="text-6xl font-bold text-[#3a2c2c] mb-2">4.7</div>
            <div className="flex items-center space-x-1 mb-3">
              <Star size={24} className="text-[#ff9933] fill-current" />
              <Star size={24} className="text-[#ff9933] fill-current" />
              <Star size={24} className="text-[#ff9933] fill-current" />
              <Star size={24} className="text-[#ff9933] fill-current" />
              <StarHalf size={24} className="text-[#ff9933] fill-current" />
            </div>
            <p className="text-[#3a2c2c]/70 font-medium">Based on 325+ reviews</p>
            <div className="flex gap-3 mt-4 text-sm text-[#3a2c2c]/50 font-medium">
              <span>Google</span> &bull; <span>Zomato</span> &bull; <span>Tripadvisor</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-8 overflow-hidden relative w-full py-4">
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#fff8f0] to-transparent z-10 pointer-events-none" />
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#fff8f0] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Right to Left */}
        <div className="flex animate-marquee-left">
          {[...row1Reviews, ...row1Reviews].map((testimonial, index) => (
            <div key={`row1-${testimonial.id}-${index}`} className="w-[320px] md:w-[400px] flex-shrink-0 px-4">
              <ReviewCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex animate-marquee-right">
          {[...row2Reviews, ...row2Reviews].map((testimonial, index) => (
            <div key={`row2-${testimonial.id}-${index}`} className="w-[320px] md:w-[400px] flex-shrink-0 px-4">
              <ReviewCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3a2c2c]/5 relative group h-full flex flex-col">
      <Quote size={40} className="absolute top-6 right-6 text-[#ff9933]/10 group-hover:text-[#ff9933]/20 transition-colors" />
      
      <div className="flex items-center space-x-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < testimonial.rating ? "text-[#ff9933] fill-current" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-[#3a2c2c]/80 italic mb-8 relative z-10 leading-relaxed flex-grow">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#3a2c2c]/5">
        <div>
          <h4 className="font-bold text-[#3a2c2c]">{testimonial.name}</h4>
          <p className="text-sm text-[#3a2c2c]/50">{testimonial.location}</p>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-[#fff8f0] text-[#ff9933] text-xs font-semibold rounded-full">
            {testimonial.platform}
          </span>
        </div>
      </div>
    </div>
  );
}
