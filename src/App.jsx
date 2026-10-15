import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavorSection from './components/FlavorSection';
import MenuSection from './components/MenuSection';
import CustomBuilder from './components/CustomBuilder';
import Cart from './components/Cart';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Reveal from './components/Reveal';
import { featuredProducts } from './data/products';

const STORAGE_KEY = 'dreamy-scoops-cart';

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToast = (message) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    addToast(`${product.name} added to cart`);
  };

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    const product = cartItems.find((p) => p.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (product) addToast(`${product.name} removed`);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [cartItems]
  );

  return (
    <div className="bg-cream text-brown">
      <Navbar itemCount={totalItems} />
      <main>
        <Reveal><Hero onAddToCart={addToCart} /></Reveal>

        <Reveal><FlavorSection onAddToCart={addToCart} addToast={addToast} /></Reveal>

        <Reveal><MenuSection onAddToCart={addToCart} addToast={addToast} /></Reveal>

        <section className="section-shell">
          <div className="grid gap-10 xl:grid-cols-[1.25fr_0.75fr]">
            <Reveal><CustomBuilder onAddToCart={addToCart} addToast={addToast} /></Reveal>
            <Reveal><Cart
              items={cartItems}
              total={subtotal}
              onIncrease={(id) => updateQuantity(id, 1)}
              onDecrease={(id) => updateQuantity(id, -1)}
              onRemove={removeItem}
              addToast={addToast}
            /></Reveal>
          </div>
        </section>

        <Reveal>
          <section className="bg-[#FFF1F5]">
            <div className="section-shell">
              <div className="rounded-[32px] bg-gradient-to-r from-[#FFD8E5] to-[#F6E7FF] p-5 shadow-soft sm:p-10">
                <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <span className="inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-brown">
                      Special Offer
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold text-brown sm:text-4xl">
                      Double the Scoops, Double the Happiness!
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-brown/80">
                      Make every moment sweeter with your favorite ice cream.
                    </p>
                    <a
                      href="#menu"
                      className="mt-6 inline-flex items-center rounded-full bg-pink px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Explore Special Offers
                    </a>
                  </div>

                  <div className="relative overflow-hidden rounded-[28px]">
                    <img
                      src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80"
                      alt="Ice cream sundae promotional"
                      className="h-[320px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal><About /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><Gallery /></Reveal>
        <Reveal><Newsletter /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>

      <Footer />
      <Toast message={toast} />
    </div>
  );
};

export default App;
