import { useState } from "react";
import {
  ShoppingCart, Plus, Minus, X,
  User, ClipboardList, Pencil, Users, Trash2, Eye, EyeOff, LogOut, UserPlus
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthUser = { username: string; role: string; password?: string };

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

type OrderStatus = "Menunggu" | "Diproses" | "Selesai";

type Order = {
  id: string;
  tableNo: string;
  note: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  time: string;
  orderedBy: string;
};

// ─── Static Data Initial ──────────────────────────────────────────────────────

const INITIAL_USERS: AuthUser[] = [
  { username: "admin",     password: "elca123",  role: "Admin" },
  { username: "kasir",     password: "kasir123", role: "Kasir" },
  { username: "bagush",    password: "TIB",      role: "bagush" },
  { username: "pelanggan", password: "makan123", role: "Pelanggan" },
  { username: "budi",      password: "budi123",  role: "Pelanggan" },
];

const INITIAL_MENU: MenuItem[] = [
  { id: 1,  name: "Nasi Goreng Spesial", desc: "Nasi goreng dengan telur, ayam, dan bumbu rahasia Elca", price: 18000, category: "Nasi",      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format", popular: true },
  { id: 2,  name: "Nasi Ayam Bakar",     desc: "Ayam bakar kecap dengan nasi putih hangat dan lalapan segar", price: 22000, category: "Nasi", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop&auto=format", popular: true },
  { id: 3,  name: "Mie Goreng Elca",     desc: "Mie goreng dengan telur, sayuran, dan bumbu khas warung Elca", price: 16000, category: "Mie",  image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=300&fit=crop&auto=format", popular: true },
  { id: 4,  name: "Soto Ayam",           desc: "Soto bening ayam suwir dengan bihun, telur, dan perasan jeruk nipis", price: 17000, category: "Soto & Sup", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&auto=format" },
  { id: 5,  name: "Es Teh Manis",        desc: "Teh manis segar dengan es batu pilihan", price: 5000, category: "Minuman", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format" },
  { id: 6,  name: "Jus Alpukat",         desc: "Jus alpukat segar dengan susu kental manis dan coklat", price: 12000, category: "Minuman", image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop&auto=format", popular: true },
];

const ALL_TABLES = Array.from({ length: 10 }, (_, i) => `Meja ${i + 1}`);

const CATEGORIES = ["Semua", "Nasi", "Mie", "Soto & Sup", "Minuman", "Cemilan"];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [userList, setUserList] = useState<AuthUser[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({ username: "budi", role: "Pelanggan" });

  if (!currentUser) return <LoginPage users={userList} onLogin={setCurrentUser} />;
  return (
    <MainApp
      user={currentUser}
      userList={userList}
      setUserList={setUserList}
      onLogout={() => setCurrentUser(null)}
      onSwitchUser={setCurrentUser}
    />
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginPage({ users, onLogin }: { users: AuthUser[]; onLogin: (user: AuthUser) => void }) {
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
      const found = users.find((u) => u.username === username && u.password === password);
      if (found) {
        onLogin({ username: found.username, role: found.role });
      } else {
        setError("Username atau password salah. Coba lagi.");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative w-full max-w-sm bg-card rounded-3xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center shadow-xl mb-3">
            <span className="text-white font-bold text-3xl">E</span>
          </div>
          <h1 className="text-foreground text-2xl font-bold">Kedai Elca</h1>
          <p className="text-muted-foreground text-xs mt-1">Masakan Rumahan Lezat</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-foreground text-xs font-semibold mb-1">Username</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-foreground text-xs font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                className="w-full pl-3 pr-10 py-2 rounded-xl bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 text-xs text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-muted-foreground text-xs text-center mb-2">Akun Demo Quick Select:</p>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto">
            {users.map((u) => (
              <button
                key={u.username}
                type="button"
                onClick={() => { setUsername(u.username); setPassword(u.password || ""); }}
                className="bg-secondary hover:bg-muted text-foreground text-xs py-1.5 px-2 rounded-lg text-center truncate"
              >
                <div className="font-semibold">{u.role}</div>
                <div className="text-muted-foreground text-[10px]">{u.username}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

type Panel = "none" | "cart" | "orders";

function MainApp({
  user,
  userList,
  setUserList,
  onLogout,
  onSwitchUser
}: {
  user: AuthUser;
  userList: AuthUser[];
  setUserList: React.Dispatch<React.SetStateAction<AuthUser[]>>;
  onLogout: () => void;
  onSwitchUser: (u: AuthUser) => void;
}) {
  const [menuList, setMenuList] = useState<MenuItem[]>(INITIAL_MENU);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [panel, setPanel] = useState<Panel>("none");
  const [toastMsg, setToastMsg] = useState("");
  const [selectedTable, setSelectedTable] = useState("Meja 1");
  const [note, setNote] = useState("");
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1001",
      tableNo: "Meja 2",
      note: "Sedang dikerjakan",
      items: [{ id: 1, name: "Nasi Goreng Spesial", desc: "", price: 18000, category: "Nasi", image: "", qty: 2 }],
      total: 36000,
      status: "Diproses",
      time: "12:15",
      orderedBy: "budi"
    },
    {
      id: "ORD-1002",
      tableNo: "Meja 5",
      note: "Jangan pedas",
      items: [{ id: 5, name: "Es Teh Manis", desc: "", price: 5000, category: "Minuman", image: "", qty: 1 }],
      total: 5000,
      status: "Menunggu",
      time: "12:30",
      orderedBy: "pelanggan"
    }
  ]);
  
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  // Modal State Tambah Akun Demo
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Pelanggan");

  // Modal State Edit Akun Demo
  const [editAccountModalOpen, setEditAccountModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState("Pelanggan");

  // Modal State Edit / Add Menu
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formImage, setFormImage] = useState("");
  const [formCategory, setFormCategory] = useState("Nasi");

  const filtered = activeCategory === "Semua" ? menuList : menuList.filter((m) => m.category === activeCategory);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const activeOrders = orders.filter((o) => o.status !== "Selesai");

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  }

  // ── Account Handlers ────────────────────────────────────────────────────────

  function handleAddAccount() {
    if (!newUsername.trim() || !newPassword.trim()) return;
    const exists = userList.some((u) => u.username.toLowerCase() === newUsername.toLowerCase());
    if (exists) {
      showToast("Username sudah digunakan! ❌");
      return;
    }

    const newUser: AuthUser = {
      username: newUsername.trim(),
      password: newPassword.trim(),
      role: newRole,
    };

    setUserList((prev) => [...prev, newUser]);
    setNewUsername("");
    setNewPassword("");
    setNewRole("Pelanggan");
    setAddAccountModalOpen(false);
    showToast(`Akun ${newUser.username} berhasil ditambahkan! 👤`);
  }

  function handleOpenEditAccount(u: AuthUser) {
    setEditingUser(u);
    setEditUsername(u.username);
    setEditPassword(u.password || "");
    setEditRole(u.role);
    setEditAccountModalOpen(true);
  }

  function handleSaveEditAccount() {
    if (!editingUser || !editUsername.trim()) return;

    setUserList((prev) =>
      prev.map((u) =>
        u.username === editingUser.username
          ? { username: editUsername.trim(), password: editPassword, role: editRole }
          : u
      )
    );

    if (user.username === editingUser.username) {
      onSwitchUser({ username: editUsername.trim(), role: editRole });
    }

    setEditAccountModalOpen(false);
    showToast("Akun demo berhasil diperbarui! ✏️");
  }

  function handleDeleteAccount(usernameTarget: string) {
    if (user.username === usernameTarget) {
      showToast("Tidak dapat menghapus akun yang sedang digunakan! ⚠️");
      return;
    }
    setUserList((prev) => prev.filter((u) => u.username !== usernameTarget));
    showToast(`Akun ${usernameTarget} dihapus! ❌`);
  }

  // ── Cart Handlers ───────────────────────────────────────────────────────────

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
      if (!existing) return prev;
      if (existing.qty > 1) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      return prev.filter((c) => c.id !== id);
    });
  }

  function deleteFromCart(id: number) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  // ── Menu Management Handlers ──────────────────────────────────────────────

  function handleOpenAddModal() {
    setEditingItem(null);
    setFormName("");
    setFormPrice(15000);
    setFormImage("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format");
    setFormCategory("Nasi");
    setEditModalOpen(true);
  }

  function handleOpenEditModal(item: MenuItem) {
    setEditingItem(item);
    setFormName(item.name);
    setFormPrice(item.price);
    setFormImage(item.image);
    setFormCategory(item.category);
    setEditModalOpen(true);
  }

  function handleSaveMenu() {
    if (!formName.trim()) return;

    const defaultImg = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format";

    if (editingItem) {
      setMenuList((prev) =>
        prev.map((m) =>
          m.id === editingItem.id
            ? { ...m, name: formName, price: Number(formPrice), image: formImage.trim() || defaultImg, category: formCategory }
            : m
        )
      );
      showToast("Menu diperbarui! ✏️");
    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        name: formName,
        price: Number(formPrice),
        desc: "",
        category: formCategory,
        image: formImage.trim() || defaultImg,
      };
      setMenuList((prev) => [newItem, ...prev]);
      showToast("Menu ditambahkan! ➕");
    }
    setEditModalOpen(false);
  }

  function handleDeleteMenu(id: number) {
    setMenuList((prev) => prev.filter((m) => m.id !== id));
    deleteFromCart(id);
    showToast("Menu dihapus ❌");
  }

  function placeOrder() {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: "ORD-" + Date.now().toString().slice(-4),
      tableNo: selectedTable,
      note: note.trim(),
      items: [...cart],
      total: totalPrice,
      status: "Menunggu",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      orderedBy: user.username,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setNote("");
    setPanel("none");
    showToast(`Pesanan ${selectedTable} berhasil dikirim! 🍴`);
  }

  function updateOrderStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-5 py-2 rounded-full shadow-lg text-sm font-semibold">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary shadow-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">E</div>
            <h1 className="text-white font-bold text-lg hidden sm:block">Kedai Elca</h1>

            {/* Quick Switch Demo Button */}
            <div className="relative">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20"
              >
                <Users size={12} />
                <span>Akun Demo</span>
              </button>

              {showDemoMenu && (
                <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                  <div className="px-3 py-1 flex justify-between items-center border-b border-border pb-1.5 mb-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Ganti Akun Demo</span>
                    
                    {/* Tombol + Tambah Akun Baru */}
                    <button
                      onClick={() => {
                        setShowDemoMenu(false);
                        setAddAccountModalOpen(true);
                      }}
                      className="bg-primary hover:bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5"
                      title="Tambah Akun Demo Baru"
                    >
                      <Plus size={10} />
                      <span>Tambah</span>
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto divide-y divide-border/40">
                    {userList.map((u) => (
                      <div
                        key={u.username}
                        className={`px-3 py-1.5 flex items-center justify-between hover:bg-secondary/60 ${
                          user.username === u.username ? "bg-secondary" : ""
                        }`}
                      >
                        <button
                          onClick={() => {
                            onSwitchUser({ username: u.username, role: u.role });
                            setShowDemoMenu(false);
                          }}
                          className="flex-1 text-left flex justify-between items-center mr-2"
                        >
                          <div>
                            <div className={`text-xs ${user.username === u.username ? "font-bold text-primary" : "text-foreground"}`}>
                              {u.username}
                            </div>
                            <div className="text-[10px] text-muted-foreground">{u.role}</div>
                          </div>
                        </button>

                        {/* Tombol Edit & Hapus Akun */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditAccount(u);
                            }}
                            className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                            title="Edit Akun"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAccount(u.username);
                            }}
                            className="p-1 text-muted-foreground hover:text-red-500 rounded transition-colors"
                            title="Hapus Akun"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tombol Tambah Menu */}
            <button
              onClick={handleOpenAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Tambah Menu</span>
            </button>

            {/* Tombol Pesanan */}
            <button
              onClick={() => setPanel(panel === "orders" ? "none" : "orders")}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20"
            >
              <ClipboardList size={14} />
              <span className="hidden sm:inline">Pesanan ({activeOrders.length})</span>
            </button>

            {/* Tombol Keranjang */}
            <button
              onClick={() => setPanel(panel === "cart" ? "none" : "cart")}
              className="relative bg-accent hover:bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <ShoppingCart size={14} />
              <span>Keranjang ({totalItems})</span>
            </button>

            <button onClick={onLogout} className="text-white/80 hover:text-white p-1.5">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Categories & List */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Filter Kategori */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Menu Item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {filtered.map((item) => {
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
                  
                  {/* Action Edit & Delete Menu */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="w-7 h-7 bg-white/80 hover:bg-white text-foreground rounded-full flex items-center justify-center shadow transition-all"
                      title="Edit Menu"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(item.id)}
                      className="w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow transition-all"
                      title="Hapus Menu"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                    {item.desc && <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.desc}</p>}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-accent text-sm">{formatRupiah(item.price)}</span>
                    
                    {/* Tombol Tambah (+) / Pengatur Jumlah */}
                    {inCart ? (
                      <div className="flex items-center gap-1.5 bg-secondary rounded-lg p-1">
                        <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded bg-card flex items-center justify-center text-xs font-bold">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold px-1">{inCart.qty}</span>
                        <button onClick={() => addToCart(item)} className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs font-bold">
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-primary hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                      >
                        <Plus size={14} />
                        <span>Tambah</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal Tambah Akun Demo Baru */}
      {addAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm rounded-2xl p-5 border border-border shadow-2xl relative">
            <button onClick={() => setAddAccountModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <UserPlus size={18} className="text-primary" />
              <h3 className="text-base font-bold text-foreground">Tambah Akun Demo Baru</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Password</label>
                <input
                  type="text"
                  placeholder="Masukkan password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Role / Peran</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                >
                  <option value="Pelanggan">Pelanggan</option>
                  <option value="Kasir">Kasir</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={() => setAddAccountModalOpen(false)} className="flex-1 bg-secondary text-foreground text-xs font-bold py-2 rounded-lg">
                Batal
              </button>
              <button onClick={handleAddAccount} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-red-700">
                Simpan Akun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Akun Demo */}
      {editAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm rounded-2xl p-5 border border-border shadow-2xl relative">
            <button onClick={() => setEditAccountModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Pencil size={18} className="text-primary" />
              <h3 className="text-base font-bold text-foreground">Edit Akun Demo</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Password</label>
                <input
                  type="text"
                  placeholder="Masukkan password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Role / Peran</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                >
                  <option value="Pelanggan">Pelanggan</option>
                  <option value="Kasir">Kasir</option>
                  <option value="Admin">Admin</option>
                  <option value="bagush">bagush</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={() => setEditAccountModalOpen(false)} className="flex-1 bg-secondary text-foreground text-xs font-bold py-2 rounded-lg">
                Batal
              </button>
              <button onClick={handleSaveEditAccount} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-red-700">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit / Tambah Menu */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-2xl p-5 border border-border shadow-2xl relative">
            <button onClick={() => setEditModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-foreground mb-4">
              {editingItem ? "Edit Menu ✏️" : "Tambah Menu Baru ➕"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Nama Menu</label>
                <input
                  type="text"
                  placeholder="Masukkan nama menu"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Kategori</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                >
                  {CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">URL Img (Gambar)</label>
                <input
                  type="text"
                  placeholder="https://example.com/gambar.jpg"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-input-background border border-border text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={() => setEditModalOpen(false)} className="flex-1 bg-secondary text-foreground text-xs font-bold py-2 rounded-lg">
                Batal
              </button>
              <button onClick={handleSaveMenu} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-red-700">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panel Keranjang */}
      {panel === "cart" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="w-full max-w-sm bg-card h-full flex flex-col shadow-2xl">
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <h3 className="font-bold text-base">Keranjang Pesanan</h3>
              <button onClick={() => setPanel("none")}><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground py-10">Keranjang Masih Kosong</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-secondary p-2.5 rounded-xl">
                    <div>
                      <p className="font-bold text-xs text-foreground">{item.name}</p>
                      <p className="text-xs text-accent font-semibold">{formatRupiah(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => removeFromCart(item.id)} className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs">
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-bold px-1">{item.qty}</span>
                      <button onClick={() => addToCart(item)} className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center text-xs">
                        <Plus size={10} />
                      </button>
                      <button onClick={() => deleteFromCart(item.id)} className="w-5 h-5 ml-1 text-red-500 hover:bg-red-100 rounded flex items-center justify-center">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-border space-y-3 bg-card">
                <div>
                  <label className="block text-xs font-semibold mb-1">Pilih Meja Pemesan</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full px-3 py-1.5 border border-border text-xs rounded-lg bg-input-background"
                  >
                    {ALL_TABLES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Catatan Pesanan</label>
                  <input
                    type="text"
                    placeholder="cth: Jangan pedas, es sedikit..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-1.5 border border-border text-xs rounded-lg bg-input-background"
                  />
                </div>
                <div className="flex justify-between font-bold text-sm">
                  <span>Total:</span>
                  <span className="text-accent">{formatRupiah(totalPrice)}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs"
                >
                  Kirim Pesanan Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Panel Daftar Pesanan */}
      {panel === "orders" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="w-full max-w-md bg-card h-full flex flex-col shadow-2xl">
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <h3 className="font-bold text-base">Daftar Pesanan Dapur</h3>
              <button onClick={() => setPanel("none")}><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {orders.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground py-10">Belum Ada Pesanan</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="border border-border bg-secondary p-3 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">{o.tableNo} ({o.id})</span>
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{o.status}</span>
                    </div>
                    <div className="text-xs space-y-1 border-t border-border pt-2">
                      {o.items.map((it) => (
                        <div key={it.id} className="flex justify-between">
                          <span>{it.name} x{it.qty}</span>
                          <span>{formatRupiah(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border font-bold text-xs">
                      <span>Total: {formatRupiah(o.total)}</span>
                      {o.status === "Menunggu" && (
                        <button onClick={() => updateOrderStatus(o.id, "Diproses")} className="bg-blue-600 text-white px-2 py-1 rounded text-[10px]">
                          Proses
                        </button>
                      )}
                      {o.status === "Diproses" && (
                        <button onClick={() => updateOrderStatus(o.id, "Selesai")} className="bg-green-600 text-white px-2 py-1 rounded text-[10px]">
                          Selesai
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}