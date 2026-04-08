import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../CartContext';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isCartOpen, setIsCartOpen } = useCart();

  const handleWhatsAppOrder = () => {
    const message = cart.map(item => `${item.name} x ${item.quantity} - ₹${parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}`).join('\n');
    const total = `\n\nTotal: ₹${totalPrice}`;
    const encodedMessage = encodeURIComponent(`New Order from Website:\n\n${message}${total}`);
    window.open(`https://wa.me/918900902929?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ff9933]/10 rounded-full flex items-center justify-center text-[#ff9933]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3a2c2c]">Your Order</h2>
                  <p className="text-sm text-gray-500">{totalItems} items</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-[#3a2c2c] mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Add some delicious items from our menu to get started!</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-[#ff9933] text-white font-bold rounded-full hover:bg-[#e68a2e] transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-[#3a2c2c] truncate pr-2">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[#ff9933] font-bold mb-3">{item.price}</p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#ff9933] hover:text-[#ff9933] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-[#3a2c2c] w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#ff9933] hover:text-[#ff9933] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-[#3a2c2c]">₹{totalPrice}</span>
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1eb956] transition-all shadow-lg shadow-green-200"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="WhatsApp" 
                    className="w-5 h-5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  Order on WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Order will be sent to our WhatsApp for confirmation
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
