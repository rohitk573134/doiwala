import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Save, X, Image as ImageIcon, Utensils } from 'lucide-react';
import ImageUpload from './ImageUpload';
import GalleryManager from './GalleryManager';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
  desc: string;
  tag?: string;
  image: string;
  isSignature?: boolean;
}

const CATEGORIES = ['Chaat', 'Snacks'];

// Initial data for seeding based on the provided menu image
const INITIAL_DATA = [
  // SNACKS
  { name: 'Ghee Samosa', category: 'Snacks', price: '₹30', desc: 'Crispy fried pastry with a savory filling of spiced potatoes and peas, prepared in pure ghee.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?w=800', isSignature: false },
  { name: 'Ghee Kachori', category: 'Snacks', price: '₹60', desc: 'Flaky, deep-fried pastry filled with a spiced lentil mixture, prepared in pure ghee.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?w=800', isSignature: false },
  { name: 'Sambar Vada', category: 'Snacks', price: '₹120', desc: 'Savory lentil donuts soaked in a flavorful and spicy lentil soup (sambar).', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800', isSignature: false },

  // CHAAT
  { name: 'Pani Puri Sooji Atta', category: 'Chaat', price: '₹60', desc: 'Crispy hollow puris made of semolina and flour, served with tangy spiced water.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800', isSignature: true, tag: 'Bestseller' },
  { name: 'Dahi Vada', category: 'Chaat', price: '₹120', desc: 'Soft lentil dumplings soaked in thick, creamy yogurt and topped with sweet & spicy chutneys.', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800', isSignature: false },
  { name: 'Creamy Bhalla Chaat', category: 'Chaat', price: '₹160', desc: 'Soft bhallas served with a generous topping of creamy yogurt and signature chutneys.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=800', isSignature: true, tag: 'Must Try' },
  { name: 'Creamy Papri Chaat', category: 'Chaat', price: '₹160', desc: 'Crispy papris topped with potatoes, chickpeas, creamy yogurt, and tangy chutneys.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=800', isSignature: false },
  { name: 'Creamy Bhalla Papri Chaat', category: 'Chaat', price: '₹180', desc: 'A delightful combination of soft bhallas and crispy papris with creamy yogurt.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=800', isSignature: true, tag: 'Popular' },
  { name: 'Ghee Tikki with Chana', category: 'Chaat', price: '₹180', desc: 'Crispy potato patties fried in ghee, served with spicy chickpea curry.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=800', isSignature: true, tag: 'Chef Special' },
  { name: 'Ghee Samosa Chaat', category: 'Chaat', price: '₹70', desc: 'Crushed ghee samosas topped with yogurt, chutneys, and fine sev.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?w=800', isSignature: false },
  { name: 'Ghee Kachori Chaat', category: 'Chaat', price: '₹100', desc: 'Crushed ghee kachoris topped with yogurt, chutneys, and spices.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?w=800', isSignature: false },
  { name: 'Ghee Samosa with Channa', category: 'Chaat', price: '₹90', desc: 'Ghee samosas served with a side of spicy and flavorful chickpea curry.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?w=800', isSignature: false },
  { name: 'Ghee Kachori with Channa', category: 'Chaat', price: '₹120', desc: 'Ghee kachoris served with a side of spicy and flavorful chickpea curry.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?w=800', isSignature: false },
  { name: 'Raj Kachori', category: 'Chaat', price: '₹220', desc: 'The king of chaats! A large crispy kachori filled with a variety of snacks and chutneys.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?w=800', isSignature: true, tag: 'Signature' },
  { name: 'Katori Chat', category: 'Chaat', price: '₹220', desc: 'Edible crispy baskets filled with a medley of potatoes, chickpeas, yogurt, and chutneys.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=800', isSignature: false },
  { name: 'Spl Sagar Bhalla Chat', category: 'Chaat', price: '₹220', desc: 'Our special house-made bhalla chaat with premium ingredients and extra creaminess.', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800', isSignature: true, tag: 'House Special' },
];

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery'>('menu');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribe = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      const menuItems: MenuItem[] = [];
      snapshot.forEach((doc) => {
        menuItems.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      setItems(menuItems);
    }, (err) => {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items. Check your permissions.");
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/admin');
  };

  const handleSeedData = async () => {
    try {
      setError('');
      for (const item of INITIAL_DATA) {
        await addDoc(collection(db, 'menuItems'), item);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to seed data');
    }
  };

  const handleClearAll = async () => {
    try {
      setError('');
      const querySnapshot = await getDocs(collection(db, 'menuItems'));
      
      // Use batch for better performance and atomicity
      const { writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);
      
      querySnapshot.docs.forEach((docItem) => {
        batch.delete(doc(db, 'menuItems', docItem.id));
      });
      
      await batch.commit();
      setShowClearAllConfirm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to clear data');
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      // Create a copy of formData and remove the id field to avoid security rule violations
      const { id, ...dataToSave } = formData as any;
      
      if (editingId) {
        await updateDoc(doc(db, 'menuItems', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'menuItems'), dataToSave);
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
    } catch (err: any) {
      setError(err.message || 'Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError('');
      await deleteDoc(doc(db, 'menuItems', id));
      setDeleteConfirmId(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete item');
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ category: 'Chaat', isSignature: false });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  if (loading || !isAdmin) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="bg-orange-100 p-2 rounded-xl mr-3">
                <Utensils className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Doiwala Admin</h1>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Control Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-orange-600 font-semibold transition-colors"
              >
                View Website
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900">Administrator</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-xl shadow-sm">
            <div className="flex items-center">
              <X className="text-red-500 mr-3" size={20} />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'menu'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Utensils className="w-4 h-4 mr-2" />
            Menu Items
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'gallery'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Gallery
          </button>
        </div>

        {activeTab === 'gallery' ? (
          <GalleryManager />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
                <p className="text-sm text-gray-500 mt-1">Add, edit or remove items from your digital menu.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                {items.length === 0 ? (
                  <button
                    onClick={handleSeedData}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm"
                  >
                    Load Initial Data
                  </button>
                ) : (
                  <button
                    onClick={() => setShowClearAllConfirm(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-red-100 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={startAdd}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </button>
              </div>
            </div>

            {showClearAllConfirm && (
              <div className="bg-red-600 p-6 rounded-2xl shadow-xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-center text-center sm:text-left">
                  <div className="bg-white/20 p-3 rounded-full mr-4 hidden sm:block">
                    <Trash2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Delete all menu items?</p>
                    <p className="text-white/80 text-sm">This action is permanent and cannot be undone.</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowClearAllConfirm(false)}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-red-600 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-lg"
                  >
                    Yes, Delete All
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-50">
                {isAdding && (
                  <li className="p-8 bg-orange-50/50 border-b border-orange-100 animate-in fade-in">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-gray-900">
                          Add New Menu Item
                        </h3>
                        <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                          <X size={24} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Name</label>
                            <input
                              type="text"
                              value={formData.name || ''}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Special Ghee Samosa"
                              className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                              <select
                                value={formData.category || 'Chaat'}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none appearance-none"
                              >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price</label>
                              <input
                                type="text"
                                value={formData.price || ''}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="₹00"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea
                              value={formData.desc || ''}
                              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                              rows={3}
                              placeholder="Describe the taste and ingredients..."
                              className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none resize-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Image</label>
                            <ImageUpload 
                              value={formData.image || ''} 
                              onChange={(url) => setFormData({ ...formData, image: url as string })} 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tag (Optional)</label>
                              <input
                                type="text"
                                value={formData.tag || ''}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                placeholder="e.g. Bestseller"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                              />
                            </div>
                            <div className="flex items-center pt-8">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.isSignature || false}
                                  onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-sm font-bold text-gray-700">Signature Item</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end gap-4 border-t border-orange-100 pt-8">
                        <button
                          onClick={cancelEdit}
                          className="px-8 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Discard Changes
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-10 py-3 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Item
                        </button>
                      </div>
                    </div>
                  </li>
                )}


                {items.map((item) => (
                  <li key={item.id} className={`group transition-all duration-200 ${editingId === item.id ? 'p-8 bg-orange-50/50 border-b border-orange-100' : 'p-5 hover:bg-gray-50'}`}>
                    {editingId === item.id ? (
                      <div className="max-w-4xl mx-auto animate-in fade-in">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-bold text-gray-900">Edit Menu Item</h3>
                          <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Name</label>
                              <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Special Ghee Samosa"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                                <select
                                  value={formData.category || 'Chaat'}
                                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none appearance-none"
                                >
                                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price</label>
                                <input
                                  type="text"
                                  value={formData.price || ''}
                                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                  placeholder="₹00"
                                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                              <textarea
                                value={formData.desc || ''}
                                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                rows={3}
                                placeholder="Describe the taste and ingredients..."
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none resize-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Image</label>
                              <ImageUpload 
                                value={formData.image || ''} 
                                onChange={(url) => setFormData({ ...formData, image: url as string })} 
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tag (Optional)</label>
                                <input
                                  type="text"
                                  value={formData.tag || ''}
                                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                  placeholder="e.g. Bestseller"
                                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                                />
                              </div>
                              <div className="flex items-center pt-8">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.isSignature || false}
                                    onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                                  <span className="ml-3 text-sm font-bold text-gray-700">Signature Item</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-10 flex justify-end gap-4 border-t border-orange-100 pt-8">
                          <button
                            onClick={cancelEdit}
                            className="px-8 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            Discard Changes
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-10 py-3 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Update Item
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center min-w-0 gap-6">
                            <div className="relative flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-20 h-20 object-cover rounded-2xl shadow-sm border border-gray-100" 
                                referrerPolicy="no-referrer"
                              />
                              {item.isSignature && (
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-lg shadow-sm">
                                  <Plus size={12} className="rotate-45" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-lg font-bold text-gray-900 truncate">{item.name}</p>
                                {item.tag && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">
                                    {item.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 font-medium mb-1">
                                <span className="text-orange-600">{item.category}</span> • {item.price}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-1 max-w-md">{item.desc}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => startEdit(item)}
                              className="p-3 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                              title="Edit Item"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {deleteConfirmId === item.id && (
                          <div className="mt-6 p-6 bg-red-50 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95">
                            <div className="flex items-center">
                              <div className="bg-red-100 p-2 rounded-full mr-4">
                                <Trash2 className="h-5 w-5 text-red-600" />
                              </div>
                              <p className="text-sm text-red-900 font-bold">Delete "{item.name}" from menu?</p>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                              >
                                Confirm Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}

                
                {items.length === 0 && !isAdding && (
                  <li className="p-20 text-center">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Utensils className="text-gray-300" size={32} />
                    </div>
                    <p className="text-gray-500 font-bold">No menu items found</p>
                    <p className="text-gray-400 text-sm mt-1">Start by adding your first delicious item!</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
