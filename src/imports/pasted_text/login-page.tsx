import { useState } from "react";
import { ShoppingCart, Plus, Minus, X, ChevronRight, MapPin, Clock, Star, Trash2, Eye, EyeOff, LogOut, User } from "lucide-react";

const USERS = [
  { username: "admin", password: "elca123", role: "Admin" },
  { username: "kasir", password: "kasir123", role: "Kasir" },
  { username: "pelanggan", password: "makan123", role: "Pelanggan" },
];

type AuthUser = { username: string; role: string };

function LoginPage({ onLogin }: { onLogin: (user: AuthUser) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const found = USERS.find((u) => u.username === username && u.password === password);
      if (found) {
        onLogin({ username: found.username, role: found.role });
      } else {
        setError("Username atau password salah. Coba lagi.");
      }
      setLoading(false);
    }, 700);
  }

  return (
    <div
      className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop&auto=format')" }}
      />
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent opacity-20" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-red-900 opacity-30" />

      <div className="relative w-full max-w-sm">
        {/* Logo Card */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center shadow-2xl mb-4">
            <span className="text-white font-bold text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>E</span>
          </div>
          <h1 className="text-white text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Kedai Elca
          </h1>
          <p className="text-red-200 text-sm mt-1">Masakan Rumahan Lezat</p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-3xl p-8 shadow-2xl border border-white/10">
          <h2 className="text-foreground font-bold text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Masuk ke Akun
          </h2>
          <p className="text-muted-foreground text-sm mb-6">Silakan login untuk melanjutkan</p>

          <form onSubmit={handleSubmit} className="space-y-4"> 
            <div>
              <label className="block text-foreground text-sm font-semibold mb-1.5">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-input-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground text-sm font-semibold mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔒</div>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-input-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-muted-foreground text-xs text-center mb-3">Akun demo tersedia:</p>
            <div className="grid grid-cols-3 gap-2">
              {USERS.map((u) => (
                <button
                  key={u.username}
                  type="button"
                  onClick={() => { setUsername(u.username); setPassword(u.password); setError(""); }}
                  className="bg-secondary hover:bg-muted text-foreground text-xs py-2 px-2 rounded-lg transition-colors font-medium text-center"
                >
                  <div className="font-semibold">{u.role}</div>
                  <div className="text-muted-foreground">{u.username}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-red-300 text-xs text-center mt-6">© 2025 Kedai Elca · Semua hak dilindungi</p>
      </div>
    </div>
  );
}

type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
};

type CartItem = MenuItem & { qty: number };

const MENU: MenuItem[] = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    desc: "Nasi goreng dengan telur, ayam, dan bumbu rahasia Elca",
    price: 18000,
    category: "Nasi",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format",
    popular: true,
  },
  {
    id: 2,
    name: "Nasi Ayam Bakar",
    desc: "Ayam bakar kecap dengan nasi putih hangat dan lalapan segar",
    price: 22000,
    category: "Nasi",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop&auto=format",
    popular: true,
  },
  {
    id: 3,
    name: "Nasi Uduk",
    desc: "Nasi uduk gurih disajikan dengan ayam goreng, tempe, dan sambal",
    price: 16000,
    category: "Nasi",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Mie Goreng Elca",
    desc: "Mie goreng dengan telur, sayuran, dan bumbu khas warung Elca",
    price: 16000,
    category: "Mie",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=300&fit=crop&auto=format",
    popular: true,
  },
  {
    id: 5,
    name: "Mie Rebus",
    desc: "Mie rebus kuah kaldu ayam dengan telor dan potongan sayuran",
    price: 14000,
    category: "Mie",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Soto Ayam",
    desc: "Soto bening ayam suwir dengan bihun, telur, dan perasan jeruk nipis",
    price: 17000,
    category: "Soto & Sup",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 7,
    name: "Es Teh Manis",
    desc: "Teh manis segar dengan es batu pilihan",
    price: 5000,
    category: "Minuman",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 8,
    name: "Jus Alpukat",
    desc: "Jus alpukat segar dengan susu kental manis dan coklat",
    price: 12000,
    category: "Minuman",
    image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop&auto=format",
    popular: true,
  },
  {
    id: 9,
    name: "Es Jeruk",
    desc: "Perasan jeruk segar langsung dengan es batu",
    price: 8000,
    category: "Minuman",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 10,
    name: "Pisang Goreng",
    desc: "Pisang goreng renyah dengan taburan gula dan keju parut",
    price: 10000,
    category: "Cemilan",
    image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 11,
    name: "Bakwan Jagung",
    desc: "Bakwan jagung renyah gurih, gorengan favorit pelanggan",
    price: 7000,
    category: "Cemilan",
    image: "https://th.bing.com/th/id/OIP.OfUneuiOLzCHnBdx-Hwa1wHaE8?w=274&h=183&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
  },
  {
    id: 12,
    name: "Tempe Mendoan",
    desc: "Tempe mendoan tipis dengan bumbu ketumbar, disajikan hangat",
    price: 8000,
    category: "Cemilan",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 13,
    nmae: "es teh",
    desc: "es teh minuman yang seger",
    price: 20000,
    category: "minuman",
    image: "https://th.bing.com/th/id/OIP.I2bEPnbJF7j3zN_r5ikdyQHaHa?w=188&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"
  }
];

const CATEGORIES = ["Semua", "Nasi", "Mie", "Soto & Sup", "Minuman", "Cemilan"];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  if (!currentUser) {
    return <LoginPage onLogin={setCurrentUser} />;
  }

  return <MainApp user={currentUser} onLogout={() => setCurrentUser(null)} />;
}

function MainApp({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [tableNo, setTableNo] = useState("");
  const [note, setNote] = useState("");

  const filtered =
    activeCategory === "Semua" ? MENU : MENU.filter((m) => m.category === activeCategory);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty > 1)
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      return prev.filter((c) => c.id !== id);
    });
  }

  function deleteFromCart(id: number) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function getQty(id: number) {
    return cart.find((c) => c.id === id)?.qty ?? 0;
  }

  const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);

function placeOrder() {
  if (!tableNo.trim()) return;

  const newOrder: KitchenOrder = {
    id: Date.now(),
    meja: tableNo,
    catatan: note,
    items: [...cart],
    total: totalPrice,
    status: "Menunggu",
    waktu: new Date().toLocaleTimeString("id-ID"),
  };

  setKitchenOrders(prev => [...prev, newOrder]);

  setOrderPlaced(true);
  setCart([]);
  setCartOpen(false);
  setTableNo("");
  setNote("");

  setTimeout(() => setOrderPlaced(false), 5000);
}
  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Success Toast */}
      {orderPlaced && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold animate-bounce">
          Pesanan berhasil dikirim ke dapur! 🍴
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary shadow-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              E
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                Kedai Elca
              </h1>
              <p className="text-red-200 text-xs leading-none mt-0.5">Masakan Rumahan Lezat</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <User size={12} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">{user.username}</span>
              <span className="text-red-300 text-xs">· {user.role}</span>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-accent hover:bg-orange-500 transition-colors text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Keranjang</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={onLogout}
              title="Keluar"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop&auto=format')" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-1">Selamat Datang di</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Kedai Elca
            </h2>
            <p className="text-red-100 mt-2 text-base max-w-sm">
              Masakan rumahan dengan cita rasa otentik. Pesan sekarang, dinikmati hangat!
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-red-200">
              <span className="flex items-center gap-1"><MapPin size={13} /> Jl. Merdeka No. 12</span>
              <span className="flex items-center gap-1"><Clock size={13} /> Buka 07.00 – 21.00</span>
              <span className="flex items-center gap-1"><Star size={13} className="fill-orange-300 text-orange-300" /> 4.8 (320 ulasan)</span>
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-2">
            {MENU.filter((m) => m.popular).slice(0, 2).map((m) => (
              <div key={m.id} className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-card border-b border-border sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeCategory === "Semua" && (
          <div className="mb-6">
            <h3 className="text-foreground font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Menu Populer ⭐
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {MENU.filter((m) => m.popular).map((item) => (
                <PopularCard key={item.id} item={item} qty={getQty(item.id)} onAdd={() => addToCart(item)} onRemove={() => removeFromCart(item.id)} />
              ))}
            </div>
            <h3 className="text-foreground font-bold text-xl mt-8 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Semua Menu
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} qty={getQty(item.id)} onAdd={() => addToCart(item)} onRemove={() => removeFromCart(item.id)} />
          ))}
        </div>
      </main>

      {/* Floating Cart Button (mobile) */}
      {totalItems > 0 && !cartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-2xl text-sm font-bold"
          >
            <ShoppingCart size={16} />
            <span>{totalItems} item · {formatRupiah(totalPrice)}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-card flex flex-col shadow-2xl">
            {/* Cart Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary">
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Keranjang Pesanan
              </h2>
              <button onClick={() => setCartOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={40} className="text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-muted-foreground text-sm">Keranjang masih kosong</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-secondary rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-accent font-bold text-sm">{formatRupiah(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full bg-muted hover:bg-border flex items-center justify-center transition-colors">
                        <Minus size={12} className="text-foreground" />
                      </button>
                      <span className="text-foreground font-bold text-sm w-5 text-center">{item.qty}</span>
                      <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full bg-primary hover:bg-red-700 flex items-center justify-center transition-colors">
                        <Plus size={12} className="text-white" />
                      </button>
                      <button onClick={() => deleteFromCart(item.id)} className="w-6 h-6 ml-1 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors">
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3 bg-card">
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-1">Nomor Meja <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="cth: Meja 3"
                    className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-1">Catatan (opsional)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="cth: tidak pedas, tanpa bawang..."
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div className="flex items-center justify-between py-2 border-t border-border">
                  <span className="text-muted-foreground text-sm">{totalItems} item</span>
                  <span className="text-foreground font-bold text-lg">{formatRupiah(totalPrice)}</span>
                </div>
                <button
                  onClick={placeOrder}
                  disabled={!tableNo.trim()}
                  className="w-full bg-primary hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Pesan Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuCard({
  item,
  qty,
  onAdd,
  onRemove,
}: {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-44 overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.popular && (
          <span className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Populer
          </span>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-foreground font-bold text-base leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.name}
        </h4>
        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.desc}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-primary font-bold text-base">{formatRupiah(item.price)}</span>
          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 bg-primary hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
            >
              <Plus size={12} /> Tambah
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={onRemove} className="w-7 h-7 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors border border-border">
                <Minus size={13} className="text-foreground" />
              </button>
              <span className="text-foreground font-bold text-sm w-4 text-center">{qty}</span>
              <button onClick={onAdd} className="w-7 h-7 rounded-full bg-primary hover:bg-red-700 flex items-center justify-center transition-colors">
                <Plus size={13} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PopularCard({
  item,
  qty,
  onAdd,
  onRemove,
}: {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex-shrink-0 w-44 bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-28 bg-secondary overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-3">
        <h4 className="text-foreground font-bold text-sm leading-snug truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.name}
        </h4>
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary font-bold text-xs">{formatRupiah(item.price)}</span>
          {qty === 0 ? (
            <button onClick={onAdd} className="w-6 h-6 rounded-full bg-primary hover:bg-red-700 flex items-center justify-center transition-colors">
              <Plus size={12} className="text-white" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button onClick={onRemove} className="w-5 h-5 rounded-full bg-secondary border border-border flex items-center justify-center">
                <Minus size={10} />
              </button>
              <span className="text-foreground font-bold text-xs">{qty}</span>
              <button onClick={onAdd} className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Plus size={10} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
