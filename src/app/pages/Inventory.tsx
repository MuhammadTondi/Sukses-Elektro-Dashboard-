import { useState } from "react";
import {
  Package,
  AlertTriangle,
  TrendingDown,
  Search,
  Download,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

const stats = [
  {
    title: "Total Produk",
    value: "1,248",
    icon: Package,
    color: "blue",
  },
  {
    title: "Stok Rendah",
    value: "24",
    icon: AlertTriangle,
    color: "orange",
  },
  {
    title: "Stok Habis",
    value: "8",
    icon: TrendingDown,
    color: "red",
  },
];

const inventoryItems = [
  {
    id: "PRD-001",
    name: "Saklar Engkel Broco",
    category: "Saklar",
    currentStock: 150,
    minStock: 50,
    maxStock: 300,
    location: "Rak A-01",
    lastRestock: "12 Apr 2026",
    status: "Normal",
  },
  {
    id: "PRD-002",
    name: "Saklar Seri Panasonic",
    category: "Saklar",
    currentStock: 120,
    minStock: 40,
    maxStock: 250,
    location: "Rak A-02",
    lastRestock: "10 Apr 2026",
    status: "Normal",
  },
  {
    id: "PRD-003",
    name: "Lampu LED 12 Watt Philips",
    category: "Lampu",
    currentStock: 200,
    minStock: 80,
    maxStock: 400,
    location: "Rak B-01",
    lastRestock: "14 Apr 2026",
    status: "Normal",
  },
  {
    id: "PRD-004",
    name: "Kabel NYM 2x1.5mm",
    category: "Kabel",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    location: "Rak C-01",
    lastRestock: "08 Apr 2026",
    status: "Normal",
  },
  {
    id: "PRD-005",
    name: "Stop Kontak Universal Uticon",
    category: "Stop Kontak",
    currentStock: 80,
    minStock: 30,
    maxStock: 200,
    location: "Rak A-03",
    lastRestock: "15 Apr 2026",
    status: "Normal",
  },
  {
    id: "PRD-006",
    name: "Kabel LAN Cat6 UTP",
    category: "Kabel Ethernet",
    currentStock: 12,
    minStock: 25,
    maxStock: 80,
    location: "Rak C-02",
    lastRestock: "05 Apr 2026",
    status: "Rendah",
  },
  {
    id: "PRD-007",
    name: "Connector RJ45 AMP Cat6",
    category: "Kabel Ethernet",
    currentStock: 0,
    minStock: 100,
    maxStock: 500,
    location: "Rak C-03",
    lastRestock: "28 Mar 2026",
    status: "Habis",
  },
  {
    id: "PRD-008",
    name: "MCB 2A Schneider",
    category: "MCB",
    currentStock: 65,
    minStock: 25,
    maxStock: 150,
    location: "Rak D-01",
    lastRestock: "13 Apr 2026",
    status: "Normal",
  },
  {
    id: "PRD-009",
    name: "Fitting Lampu E27",
    category: "Fitting",
    currentStock: 180,
    minStock: 60,
    maxStock: 350,
    location: "Rak B-02",
    lastRestock: "01 Apr 2026",
    status: "Normal",
  },
];

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddToOrder = (itemId: string, itemName: string) => {
    // Simulasi menambahkan ke keranjang order
    // Dalam implementasi nyata, ini akan terhubung dengan state management
    console.log(`Adding ${itemName} to order cart`);
    // Bisa redirect ke halaman Order atau buka dialog
  };

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-500";
      case "Rendah":
        return "bg-yellow-500";
      case "Habis":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventori</h1>
          <p className="text-gray-500">Monitor dan kelola stok produk</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sinkronisasi
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = {
            blue: "bg-blue-500",
            orange: "bg-orange-500",
            red: "bg-red-500",
          };

          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
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

      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-900">
                  Peringatan Stok Rendah
                </h3>
                <p className="mt-1 text-sm text-orange-700">
                  24 produk memiliki stok di bawah minimum. Segera lakukan
                  restocking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Stok Habis</h3>
                <p className="mt-1 text-sm text-red-700">
                  8 produk tidak tersedia. Hubungi supplier untuk pemesanan ulang.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Rendah">Stok Rendah</SelectItem>
                <SelectItem value="Habis">Habis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Status Inventori ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok Saat Ini</TableHead>
                <TableHead>Level Stok</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Restock Terakhir</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.currentStock}</p>
                      <p className="text-xs text-gray-500">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={getStockPercentage(
                          item.currentStock,
                          item.maxStock
                        )}
                        className="h-2"
                      />
                      <p className="text-xs text-gray-500">
                        {Math.round(
                          getStockPercentage(item.currentStock, item.maxStock)
                        )}
                        %
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {item.lastRestock}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStockColor(item.status)}
                      variant={
                        item.status === "Normal"
                          ? "default"
                          : item.status === "Rendah"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      onClick={() => handleAddToOrder(item.id, item.name)}
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
