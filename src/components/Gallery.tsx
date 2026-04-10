import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const defaultGalleryImages = [
  'https://b.zmtcdn.com/data/pictures/chains/9/20849849/b06938e6ab0303398a00000c43b0fccc.jpg',
  'https://b.zmtcdn.com/data/pictures/9/20849849/f0af445746de2011fed3e4b1d46af3e8_o2_featured_v2.jpg',
  'https://b.zmtcdn.com/data/pictures/chains/9/20849849/28dc98175d9c4a0b433377a3340b1e9d_featured_v2.jpg',
  'https://b.zmtcdn.com/data/o2_banners/54de14cdc3793dfce39a46c989f3e5c1.jpg',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  'https://images.unsplash.com/photo-1626132646529-500637532537?w=800&q=80',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80',
  'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=800&q=80',
  'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80',
];

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<string[]>(defaultGalleryImages);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'gallery'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().images && docSnap.data().images.length > 0) {
        setGalleryImages(docSnap.data().images);
      } else {
        setGalleryImages(defaultGalleryImages);
      }
    }, (error) => {
      console.error("Error fetching gallery images:", error);
    });

    return () => unsubscribe();
  }, []);

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
