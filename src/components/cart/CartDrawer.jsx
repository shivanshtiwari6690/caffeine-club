import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Coffee, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Receipt
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItemCount,
    processDemoCheckout,
    checkoutData,
    closeCheckoutModal
  } = useCart();

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (checkoutData) {
          closeCheckoutModal();
        } else if (isCartOpen) {
          closeCart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, checkoutData, closeCart, closeCheckoutModal]);

  return (
    <>
      {/* 1. Cart Slide-Over Drawer */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Backdrop overlay */}
          <div 
            onClick={closeCart}
            className="absolute inset-0 bg-coffee-950/60 backdrop-blur-xs transition-opacity duration-300"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-cream-50 border-l border-cream-200 shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-cream-200 flex items-center justify-between bg-cream-100/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-coffee-950 text-cream-50 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 id="cart-drawer-title" className="font-serif font-black text-xl text-coffee-950">
                      Your Order Tray
                    </h2>
                    <span className="text-xs text-coffee-600 font-mono">
                      {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="p-2 rounded-xl text-coffee-700 hover:text-coffee-950 hover:bg-cream-200/80 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-cream-100/80 p-3.5 rounded-2xl border border-cream-200/90 flex gap-3.5 items-center justify-between"
                    >
                      {/* Image Thumbnail */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover bg-coffee-900 shrink-0"
                      />

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="font-serif font-bold text-sm text-coffee-950 truncate">
                          {item.name}
                        </h4>
                        <span className="font-mono text-xs text-caramel-600 font-semibold block">
                          ₹{item.price} each
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-cream-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="px-2 py-0.5 text-coffee-800 hover:bg-cream-100 transition cursor-pointer text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-xs text-coffee-950">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="px-2 py-0.5 text-coffee-800 hover:bg-cream-100 transition cursor-pointer text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-coffee-950 ml-auto">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from order`}
                        className="p-1.5 text-coffee-400 hover:text-terracotta-600 transition cursor-pointer rounded-lg hover:bg-cream-200/60"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  /* Empty State */
                  <div className="text-center py-20 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-cream-200 text-coffee-500 flex items-center justify-center mx-auto">
                      <Coffee className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-lg text-coffee-950">
                        Your tray is empty
                      </h3>
                      <p className="text-xs text-coffee-600 max-w-xs mx-auto">
                        Explore our single-origin coffees, fresh bakes, and kitchen plates to add your favorites.
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="px-4 py-2 rounded-xl bg-coffee-950 text-cream-50 text-xs font-semibold hover:bg-caramel-500 transition cursor-pointer"
                    >
                      Browse Menu
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout Controls */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-cream-200 bg-cream-100/60 space-y-4">
                  {/* Calculation Breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-coffee-600">
                      <span>Order Items ({totalItemCount})</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-coffee-600">
                      <span>Taxes & Kitchen Service</span>
                      <span className="font-mono text-sage-600 font-semibold">Included</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-coffee-950 pt-2 border-t border-cream-200 font-serif">
                      <span>Total Amount</span>
                      <span className="font-mono text-caramel-600 font-bold text-lg">
                        ₹{subtotal}
                      </span>
                    </div>
                  </div>

                  {/* Demo Warning Notice */}
                  <div className="flex items-start gap-2 bg-cream-200/60 p-2.5 rounded-xl border border-cream-300/80 text-[11px] text-coffee-700">
                    <AlertCircle className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Academic Project:</strong> Real payment gateways are simulated. Clicking checkout will generate a demo pickup token.
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => processDemoCheckout()}
                      className="w-full py-3.5 px-6 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-caramel-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>Proceed to Demo Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-center text-xs text-coffee-600 hover:text-terracotta-600 font-medium transition cursor-pointer"
                    >
                      Clear entire tray
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Demo Checkout Receipt Modal */}
      {checkoutData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-950/75 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-cream-50 rounded-3xl max-w-md w-full border border-cream-200 shadow-2xl p-6 sm:p-8 space-y-6 text-center">
            
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center mx-auto border border-sage-200 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-caramel-600 font-semibold">
                DEMO ORDER PLACED
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-coffee-950">
                Brewing in Progress!
              </h3>
              <p className="text-xs text-coffee-600">
                Your order has been registered in the café kitchen queue.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-cream-100 rounded-2xl p-4 border border-cream-200 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-coffee-600">Order Token:</span>
                <span className="font-bold text-coffee-950">{checkoutData.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-coffee-600">Est. Preparation Time:</span>
                <span className="font-bold text-caramel-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~{checkoutData.estimatedPrepMinutes} mins
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase text-coffee-500 font-bold block mb-1">
                  Items to Collect ({checkoutData.items.length}):
                </span>
                {checkoutData.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-coffee-800 text-[11px]">
                    <span className="truncate pr-2">{i.quantity}x {i.name}</span>
                    <span className="shrink-0 font-bold">₹{i.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2 border-t border-cream-200 font-bold text-sm text-coffee-950">
                <span>Total Simulated Paid:</span>
                <span className="text-caramel-600 font-mono">₹{checkoutData.subtotal}</span>
              </div>
            </div>

            {/* Academic Evaluation Disclaimer */}
            <div className="bg-cream-200/60 p-3 rounded-xl border border-cream-300 text-[11px] text-coffee-700 text-left">
              <p>
                <strong>Notice:</strong> This is a university CS viva demonstration. No financial transaction or payment API was executed.
              </p>
            </div>

            <button
              onClick={closeCheckoutModal}
              className="w-full py-3.5 px-6 rounded-xl bg-coffee-950 hover:bg-caramel-500 text-cream-50 font-semibold text-sm transition-colors cursor-pointer shadow-md"
            >
              Done & Return to Café
            </button>
          </div>
        </div>
      )}
    </>
  );
}
