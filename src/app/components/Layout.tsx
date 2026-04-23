import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  CreditCard,
  LogOut,
  FileText,
  Settings,
  ShieldCheck,
  Bell,
  Search,
  ChevronDown,
  Truck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../data/authDatabase";

const navItems: Array<{
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  subLabel?: string;
  roles: UserRole[];
}> = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "user"] },
  { path: "/products", label: "Produk", icon: Package, roles: ["admin", "user"] },
  { path: "/cashier", label: "Kasir", icon: CreditCard, roles: ["admin", "user"] },
  {
    path: "/order",
    label: "Order",
    icon: ClipboardList,
    subLabel: "& Inventori",
    roles: ["admin"],
  },
  { path: "/suppliers", label: "Supplier", icon: Truck, roles: ["admin"] },
  {
    path: "/reports",
    label: "Laporan",
    icon: FileText,
    subLabel: "& Penjualan",
    roles: ["admin"],
  },
  { path: "/settings", label: "Pengaturan", icon: Settings, roles: ["admin"] },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const availableNavItems = navItems.filter((item) => user && item.roles.includes(user.role));
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";
  const userRoleLabel = user?.role === "admin" ? "Administrator" : "User";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 z-40 h-full w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">SUKSES ELEKTRO</h1>
                <p className="text-xs text-gray-500">Toko Elektronika</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {availableNavItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{item.label}</span>
                      {item.subLabel && (
                        <span className="text-sm font-normal">{item.subLabel}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <span>{userInitial}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{userRoleLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-white px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Cari produk, transaksi..."
                  className="w-64 pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                      <span className="text-sm">{userInitial}</span>
                    </div>
                    <span className="hidden md:inline">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    {userRoleLabel}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs text-gray-500">
                    {user?.username}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-red-600" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}