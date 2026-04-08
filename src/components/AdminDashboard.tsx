import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Save, X } from 'lucide-react';

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
  { name: 'Ghee Samosa', category: 'Snacks', price: '₹30', desc: 'Crispy fried pastry with a savory filling of spiced potatoes and peas, prepared in pure ghee.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Ghee Kachori', category: 'Snacks', price: '₹60', desc: 'Flaky, deep-fried pastry filled with a spiced lentil mixture, prepared in pure ghee.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Sambar Vada', category: 'Snacks', price: '₹120', desc: 'Savory lentil donuts soaked in a flavorful and spicy lentil soup (sambar).', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800', isSignature: false },

  // CHAAT
  { name: 'Pani Puri Sooji Atta', category: 'Chaat', price: '₹60', desc: 'Crispy hollow puris made of semolina and flour, served with tangy spiced water.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800', isSignature: true, tag: 'Bestseller' },
  { name: 'Dahi Vada', category: 'Chaat', price: '₹120', desc: 'Soft lentil dumplings soaked in thick, creamy yogurt and topped with sweet & spicy chutneys.', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Creamy Bhalla Chaat', category: 'Chaat', price: '₹160', desc: 'Soft bhallas served with a generous topping of creamy yogurt and signature chutneys.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&q=80&w=800', isSignature: true, tag: 'Must Try' },
  { name: 'Creamy Papri Chaat', category: 'Chaat', price: '₹160', desc: 'Crispy papris topped with potatoes, chickpeas, creamy yogurt, and tangy chutneys.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Creamy Bhalla Papri Chaat', category: 'Chaat', price: '₹180', desc: 'A delightful combination of soft bhallas and crispy papris with creamy yogurt.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&q=80&w=800', isSignature: true, tag: 'Popular' },
  { name: 'Ghee Tikki with Chana', category: 'Chaat', price: '₹180', desc: 'Crispy potato patties fried in ghee, served with spicy chickpea curry.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&q=80&w=800', isSignature: true, tag: 'Chef Special' },
  { name: 'Ghee Samosa Chaat', category: 'Chaat', price: '₹70', desc: 'Crushed ghee samosas topped with yogurt, chutneys, and fine sev.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Ghee Kachori Chaat', category: 'Chaat', price: '₹100', desc: 'Crushed ghee kachoris topped with yogurt, chutneys, and spices.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Ghee Samosa with Channa', category: 'Chaat', price: '₹90', desc: 'Ghee samosas served with a side of spicy and flavorful chickpea curry.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Ghee Kachori with Channa', category: 'Chaat', price: '₹120', desc: 'Ghee kachoris served with a side of spicy and flavorful chickpea curry.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Raj Kachori', category: 'Chaat', price: '₹220', desc: 'The king of chaats! A large crispy kachori filled with a variety of snacks and chutneys.', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=800', isSignature: true, tag: 'Signature' },
  { name: 'Katori Chat', category: 'Chaat', price: '₹220', desc: 'Edible crispy baskets filled with a medley of potatoes, chickpeas, yogurt, and chutneys.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&q=80&w=800', isSignature: false },
  { name: 'Spl Sagar Bhalla Chat', category: 'Chaat', price: '₹220', desc: 'Our special house-made bhalla chaat with premium ingredients and extra creaminess.', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800', isSignature: true, tag: 'House Special' },
];

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Samosa Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#/" className="text-sm text-orange-600 hover:text-orange-700 font-medium">Back to Site</a>
              <span className="text-sm text-gray-500">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
          <div className="space-x-3">
            {items.length === 0 ? (
              <button
                onClick={handleSeedData}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Load Initial Data
              </button>
            ) : (
              <button
                onClick={() => setShowClearAllConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Clear All Data
              </button>
            )}
            <button
              onClick={startAdd}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </button>
          </div>
        </div>

        {showClearAllConfirm && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trash2 className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-bold">
                  Are you sure you want to delete ALL menu items? This cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowClearAllConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Yes, Clear Everything
              </button>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {(isAdding || editingId) && (
              <li className="p-4 bg-orange-50">
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={formData.category || 'Chaat'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Price (e.g. ₹210)</label>
                    <input
                      type="text"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={formData.desc || ''}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Tag (Optional)</label>
                    <input
                      type="text"
                      value={formData.tag || ''}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-1 flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="isSignature"
                      checked={formData.isSignature || false}
                      onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isSignature" className="ml-2 block text-sm text-gray-900">
                      Signature Item
                    </label>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={cancelEdit}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              </li>
            )}

            {items.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-medium text-orange-600 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500 truncate">{item.category} • {item.price}</p>
                      {item.isSignature && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">Signature</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Inline Delete Confirmation */}
                {deleteConfirmId === item.id && (
                  <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-red-800 font-medium">Are you sure you want to delete this item?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
            
            {items.length === 0 && !isAdding && (
              <li className="p-8 text-center text-gray-500">
                No menu items found. Click "Load Initial Data" to populate the database.
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
