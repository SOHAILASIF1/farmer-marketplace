import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = {
  guest: [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about" },
  ],
  buyer: [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Cart", to: "/cart" },
    { label: "My Orders", to: "/orders" },
  ],
  farmer: [
    { label: "Dashboard", to: "/farmer/dashboard" },
    { label: "My Products", to: "/farmer/products" },
    { label: "Add Product", to: "/farmer/products/new" },
    { label: "Orders", to: "/farmer/orders" },
  ],
  dealer: [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "My Listings", to: "/dealer/products" },
    { label: "Requirements", to: "/requirements" },
  ],
  admin: [
    { label: "Dashboard", to: "/admin" },
    { label: "Users", to: "/admin/users" },
    { label: "Products", to: "/admin/products" },
    { label: "Orders", to: "/admin/orders" },
  ],
};

const btnOutline =
  "rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50";
const btnSolid =
  "rounded-lg border border-green-600 bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "guest";
  const links = NAV_LINKS[role] || NAV_LINKS.guest;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-xl">
            🌱
          </span>
          <span className="text-2xl font-bold text-green-800">FarmMart</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[15px] font-medium text-gray-700 hover:text-green-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        {role !== "admin" && (
          <div className="hidden lg:flex">
            <input
              type="text"
              placeholder="Fasal, sabzi, phal search karo..."
              className="w-60 rounded-l-lg border border-r-0 border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-green-600"
            />
            <button className="rounded-r-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
              Search
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {loading ? null : user ? (
            <>
              <span className="hidden text-sm font-medium text-gray-700 sm:block">
                {user.name}
              </span>
              <button onClick={handleLogout} className={btnOutline}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={btnOutline}>Login</Link>
              <Link to="/signup" className={btnSolid}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}