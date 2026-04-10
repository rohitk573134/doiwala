import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ImageUpload from './ImageUpload';
import { Trash2, Loader2, Plus, X } from 'lucide-react';

export default function GalleryManager() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'gallery'), (docSnap) => {
      if (docSnap.exists()) {
        setImages(docSnap.data().images || []);
      } else {
        setImages([]);
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching gallery:", err);
      setError("Failed to load gallery images.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddImages = async (urls: string | string[]) => {
    if (!urls || (Array.isArray(urls) && urls.length === 0)) return;
    try {
      setError('');
      const newUrls = Array.isArray(urls) ? urls : [urls];
      const updatedImages = [...images, ...newUrls];
      await setDoc(doc(db, 'settings', 'gallery'), { images: updatedImages }, { merge: true });
    } catch (err: any) {
      setError(err.message || 'Failed to add images to gallery');
    }
  };

  const handleDeleteImage = async (indexToDelete: number) => {
    try {
      setError('');
      const newImages = images.filter((_, index) => index !== indexToDelete);
      await setDoc(doc(db, 'settings', 'gallery'), { images: newImages }, { merge: true });
    } catch (err: any) {
      setError(err.message || 'Failed to delete image');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#ff9933]" size={32} /></div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the images displayed in your restaurant's gallery.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-full">
          <span className="text-orange-700 font-bold text-sm">{images.length} Images</span>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
          <div className="flex items-center">
            <X className="text-red-400 mr-3" size={20} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Add New Images</h3>
        <div className="max-w-xl">
          <ImageUpload 
            value={[]} 
            onChange={(urls) => handleAddImages(urls)} 
            multiple={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider">Current Gallery</h3>
        {images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-sm italic">No images in the gallery yet. Start by uploading some!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {images.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square shadow-sm hover:shadow-md transition-all duration-300">
                <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all transform hover:scale-110 shadow-xl"
                    title="Delete Image"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
