import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Pemasukan",
    value: "Rp 45.231.000",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "blue",
  },
  {
    title: "Transaksi Hari Ini",
    value: "234",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "green",
  },
  {
    title: "Total Produk",
    value: "1.248",
    change: "+5.2%",
    trend: "up",
    icon: Package,
    color: "purple",
  },
];

const salesData = [
  { name: "Sen", value: 4200 },
  { name: "Sel", value: 3800 },
  { name: "Rab", value: 5100 },
  { name: "Kam", value: 4600 },
  { name: "Jum", value: 6200 },
  { name: "Sab", value: 7800 },
  { name: "Min", value: 6400 },
];

const productCategoryData = [
  { name: "Saklar", value: 350, color: "#3b82f6", id: "cat-1" },
  { name: "Lampu", value: 280, color: "#8b5cf6", id: "cat-2" },
  { name: "Kabel", value: 220, color: "#10b981", id: "cat-3" },
  { name: "Stop Kontak", value: 150, color: "#f59e0b", id: "cat-4" },
  { name: "Lainnya", value: 120, color: "#ef4444", id: "cat-5" },
];

const topProducts = [
  {
    name: "Kabel NYM 2x1.5mm",
    category: "Kabel",
    sold: 85,
    revenue: "Rp 29.750.000",
  },
  {
    name: "Lampu LED 12W Philips",
    category: "Lampu",
    sold: 420,
    revenue: "Rp 14.700.000",
  },
  {
    name: "Saklar Seri Panasonic",
    category: "Saklar",
    sold: 350,
    revenue: "Rp 8.750.000",
  },
  {
    name: "Stop Kontak Uticon",
    category: "Stop Kontak",
    sold: 280,
    revenue: "Rp 5.040.000",
  },
  {
    name: "MCB 2A Schneider",
    category: "MCB",
    sold: 95,
    revenue: "Rp 4.275.000",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Selamat datang di SUKSES ELEKTRO - Overview sistem Anda
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            purple: "bg-purple-500",
            orange: "bg-orange-500",
          };

          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <div className="mt-2 flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">vs bulan lalu</span>
                    </div>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      colors[stat.color as keyof typeof colors]
                    }`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Penjualan Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    `Rp ${(Number(value) * 1000).toLocaleString("id-ID")}`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produk Terlaris</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      {product.revenue}
                    </p>
                    <p className="text-sm text-gray-500">{product.sold} terjual</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}