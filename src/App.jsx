import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { ProductProvider } from "./context/ProductContext";
import Cart from "./components/Cart";
import DarkModeToggle from "./components/DarkModeToggle";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AddProduct from "./pages/AddProduct";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setToastMessage("Item added to bag");
    window.setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <ProductProvider>
      <BrowserRouter>
        <div
          className={`min-h-screen font-sans selection:bg-blush transition-colors duration-300 ${
            darkMode 
              ? "bg-neutral-900 text-champagne selection:text-neutral-900" 
              : "bg-champagne text-dried-thyme"
          }`}
        >
          {/* Top Navigation Bar adhering strictly to reference design spacing */}
          <nav
            className={`sticky top-0 z-40 border-b backdrop-blur-md px-8 py-6 flex flex-row items-center justify-between transition-colors duration-300 ${
              darkMode 
                ? "border-neutral-800 bg-neutral-900/90" 
                : "border-bisque/30 bg-champagne/90"
            }`}
          >
            {/* Logo */}
            <h1 className="text-2xl font-serif font-bold tracking-tight lowercase">
              april<span className="text-antique-rose">.</span>
            </h1>

            {/* Navigation Links with PURE TEXT strings for stable testing selectors */}
            <div className="flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `pb-1 transition-all duration-200 border-b-2 ${
                    isActive 
                      ? "border-dried-thyme text-dried-thyme dark:border-champagne dark:text-champagne font-bold" 
                      : "border-transparent opacity-60 hover:opacity-100 hover:text-antique-rose"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `pb-1 transition-all duration-200 border-b-2 ${
                    isActive 
                      ? "border-dried-thyme text-dried-thyme dark:border-champagne dark:text-champagne font-bold" 
                      : "border-transparent opacity-60 hover:opacity-100 hover:text-antique-rose"
                  }`
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  `pb-1 transition-all duration-200 border-b-2 ${
                    isActive 
                      ? "border-dried-thyme text-dried-thyme dark:border-champagne dark:text-champagne font-bold" 
                      : "border-transparent opacity-60 hover:opacity-100 hover:text-antique-rose"
                  }`
                }
              >
                Add Product
              </NavLink>
            </div>

            {/* Interactive Functional Controls */}
            <div className="flex items-center gap-4">
              <DarkModeToggle
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-1 hover:opacity-70 transition-opacity"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-antique-rose text-champagne text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scaleIn">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </nav>

          {/* Core Content Layout Viewport Router */}
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop addToCart={addToCart} />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Slide-out Sidebar Drawer for Cart view */}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
          />

          {/* Bottom Feedback Notification Banner */}
          {toastMessage && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dried-thyme text-champagne px-6 py-3 rounded-md shadow-xl transition-all duration-300 z-50 flex items-center space-x-3 border border-bisque/20">
              <svg
                className="w-4 h-4 text-blush"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-sans text-xs font-bold tracking-widest uppercase">
                {toastMessage}
              </span>
            </div>
          )}
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
