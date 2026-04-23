import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  Filter,
  Eye,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const monthlyRevenue = [
  { month: "Jan", revenue: 45000, profit: 12000, cost: 33000 },
  { month: "Feb", revenue: 52000, profit: 15000, cost: 37000 },
  { month: "Mar", revenue: 48000, profit: 13500, cost: 34500 },
  { month: "Apr", revenue: 61000, profit: 18000, cost: 43000 },
  { month: "Mei", revenue: 55000, profit: 16500, cost: 38500 },
  { month: "Jun", revenue: 67000, profit: 20000, cost: 47000 },
];

const categorySales = [
  { category: "Saklar", sales: 145 },
  { category: "Lampu", sales: 89 },
  { category: "Kabel", sales: 167 },
  { category: "Stop Kontak", sales: 124 },
  { category: "MCB", sales: 56 },
  { category: "Lainnya", sales: 203 },
];

// Data Penjualan/Transaksi
const salesTransactions = [
  {
    id: "TRX-001",
    date: "16 Apr 2026",
    customer: "Budi Santoso",
    total: 850000,
    status: "Lunas",
    items: [
      { id: "PRD-001", name: "Saklar Engkel Broco", quantity: 50, unit: "pcs", price: 15000 },
      { id: "PRD-003", name: "Lampu LED 12 Watt Philips", quantity: 10, unit: "pcs", price: 35000 },
    ],
  },
  {
    id: "TRX-002",
    date: "16 Apr 2026",
    customer: "Siti Rahma",
    total: 1200000,
    status: "Piutang",
    items: [
      { id: "PRD-004", name: "Kabel NYM 2x1.5mm", quantity: 2, unit: "roll", price: 380000 },
      { id: "PRD-005", name: "Stop Kontak Universal Uticon", quantity: 25, unit: "pcs", price: 17600 },
    ],
  },
  {
    id: "TRX-003",
    date: "15 Apr 2026",
    customer: "Ahmad Yani",
    total: 2400000,
    status: "Lunas",
    items: [
      { id: "PRD-006", name: "Kabel LAN Cat6 UTP", quantity: 5, unit: "box", price: 480000 },
    ],
  },
];

// Data Hutang (ke Supplier)
const hutangData = [
  {
    id: "ORD-002",
    supplier: "PT Kabel Nusantara",
    amount: 8520000,
    dateCreated: "15 Apr 2026",
    dueDate: "15 Mei 2026",
    datePaid: "",
    status: "Belum Lunas",
    items: [
      { id: "PRD-004", name: "Kabel NYM 2x1.5mm", quantity: 25, unit: "roll", price: 320000 },
      { id: "PRD-007", name: "Connector RJ45 AMP Cat6", quantity: 200, unit: "pcs", price: 1200 },
    ],
  },
  {
    id: "ORD-004",
    supplier: "CV Elektronik Jaya",
    amount: 4200000,
    dateCreated: "10 Apr 2026",
    dueDate: "25 Mei 2026",
    datePaid: "12 Apr 2026",
    status: "Lunas",
    items: [
      { id: "PRD-002", name: "Saklar Seri Panasonic", quantity: 200, unit: "pcs", price: 20000 },
      { id: "PRD-005", name: "Stop Kontak Universal Uticon", quantity: 100, unit: "pcs", price: 14000 },
    ],
  },
];

// Data Piutang (dari Customer)
const piutangData = [
  {
    id: "TRX-002",
    customer: "Siti Rahma",
    amount: 1200000,
    remaining: 1200000,
    dateCreated: "16 Apr 2026",
    dueDate: "23 Apr 2026",
    datePaid: "",
    status: "Belum Lunas",
    items: [
      { id: "PRD-004", name: "Kabel NYM 2x1.5mm", quantity: 2, unit: "roll", price: 380000 },
      { id: "PRD-005", name: "Stop Kontak Universal Uticon", quantity: 25, unit: "pcs", price: 17600 },
    ],
  },
  {
    id: "TRX-005",
    customer: "Dewi Kusuma",
    amount: 2500000,
    remaining: 0,
    dateCreated: "14 Apr 2026",
    dueDate: "21 Apr 2026",
    datePaid: "18 Apr 2026",
    status: "Lunas",
    items: [
      { id: "PRD-003", name: "Lampu LED 12 Watt Philips", quantity: 50, unit: "pcs", price: 35000 },
      { id: "PRD-008", name: "MCB 2A Schneider", quantity: 20, unit: "pcs", price: 45000 },
    ],
  },
];

// Data Penghasilan/Pendapatan
const revenueData = [
  {
    id: "TRX-001",
    customer: "Budi Santoso",
    date: "16 Apr 2026",
    netRevenue: 100000,
    grossRevenue: 850000,
    status: "Lunas",
    items: [
      { id: "PRD-001", name: "Saklar Engkel Broco", quantity: 50, unit: "pcs", price: 15000 },
      { id: "PRD-003", name: "Lampu LED 12 Watt Philips", quantity: 10, unit: "pcs", price: 35000 },
    ],
  },
  {
    id: "TRX-002",
    customer: "Siti Rahma",
    date: "16 Apr 2026",
    netRevenue: 150000,
    grossRevenue: 1200000,
    status: "Piutang",
    items: [
      { id: "PRD-004", name: "Kabel NYM 2x1.5mm", quantity: 2, unit: "roll", price: 380000 },
      { id: "PRD-005", name: "Stop Kontak Universal Uticon", quantity: 25, unit: "pcs", price: 17600 },
    ],
  },
  {
    id: "TRX-003",
    customer: "Ahmad Yani",
    date: "15 Apr 2026",
    netRevenue: 300000,
    grossRevenue: 2400000,
    status: "Lunas",
    items: [
      { id: "PRD-006", name: "Kabel LAN Cat6 UTP", quantity: 5, unit: "box", price: 480000 },
    ],
  },
];

// Data Pengeluaran
const expenseData = [
  {
    id: "ORD-001",
    supplier: "PT Mitra Elektrik",
    amount: 5400000,
    date: "16 Apr 2026",
    status: "Lunas",
    items: [
      { id: "PRD-001", name: "Saklar Engkel Broco", quantity: 200, unit: "pcs", price: 12000 },
      { id: "PRD-008", name: "MCB 2A Schneider", quantity: 50, unit: "pcs", price: 38000 },
    ],
  },
  {
    id: "ORD-002",
    supplier: "PT Kabel Nusantara",
    amount: 8520000,
    date: "15 Apr 2026",
    status: "Hutang",
    items: [
      { id: "PRD-004", name: "Kabel NYM 2x1.5mm", quantity: 25, unit: "roll", price: 320000 },
      { id: "PRD-007", name: "Connector RJ45 AMP Cat6", quantity: 200, unit: "pcs", price: 1200 },
    ],
  },
  {
    id: "ORD-003",
    supplier: "Toko Lampu Terang",
    amount: 5600000,
    date: "14 Apr 2026",
    status: "Lunas",
    items: [
      { id: "PRD-003", name: "Lampu LED 12 Watt Philips", quantity: 200, unit: "pcs", price: 28000 },
    ],
  },
];

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterName, setFilterName] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const handleViewDetail = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetailDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500">
            Analisis performa dan insight bisnis toko
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="quarter">Kuartal Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Pilih Tanggal
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Total Pendapatan</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  Rp 328.6jt
                </h3>
                <p className="mt-1 text-sm text-green-600">+15.3% vs bulan lalu</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Total Transaksi</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">1,248</h3>
                <p className="mt-1 text-sm text-green-600">+12.8% vs bulan lalu</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Produk Terjual</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">2,456</h3>
                <p className="mt-1 text-sm text-green-600">+18.2% vs bulan lalu</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Pelanggan Baru</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">148</h3>
                <p className="mt-1 text-sm text-green-600">+8.5% vs bulan lalu</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Data Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="penjualan">Penjualan</TabsTrigger>
          <TabsTrigger value="hutang">Hutang</TabsTrigger>
          <TabsTrigger value="piutang">Piutang</TabsTrigger>
          <TabsTrigger value="penghasilan">Penghasilan</TabsTrigger>
          <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
        </TabsList>

        {/* Tab: Overview */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analisis Pendapatan & Profit (6 Bulan Terakhir)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) =>
                      `Rp ${(Number(value) * 1000).toLocaleString("id-ID")}`
                    }
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Pendapatan"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                    name="Profit"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Penjualan */}
        <TabsContent value="penjualan" className="space-y-4">
          {/* Category Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Penjualan per Kategori Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categorySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} unit`} />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Transaction List */}
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Transaksi Penjualan ({salesTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Transaksi</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nama Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesTransactions.map((trx) => (
                    <TableRow
                      key={trx.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewDetail(trx)}
                    >
                      <TableCell className="font-medium">{trx.id}</TableCell>
                      <TableCell>{trx.date}</TableCell>
                      <TableCell>{trx.customer}</TableCell>
                      <TableCell className="text-right font-bold">
                        Rp {trx.total.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={trx.status === "Lunas" ? "default" : "secondary"}
                          className={trx.status === "Lunas" ? "bg-green-600" : "bg-orange-500"}
                        >
                          {trx.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(trx);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Hutang */}
        <TabsContent value="hutang" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Select value={filterName} onValueChange={setFilterName}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Supplier</SelectItem>
                    <SelectItem value="PT Kabel Nusantara">PT Kabel Nusantara</SelectItem>
                    <SelectItem value="CV Elektronik Jaya">CV Elektronik Jaya</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Waktu</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Hutang List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Hutang ({hutangData.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Order</TableHead>
                    <TableHead className="text-right">Jumlah Hutang</TableHead>
                    <TableHead>Asal Supplier</TableHead>
                    <TableHead>Tgl Hutang</TableHead>
                    <TableHead>Tgl Jatuh Tempo</TableHead>
                    <TableHead>Tgl Bayar Hutang</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hutangData.map((hutang) => (
                    <TableRow
                      key={hutang.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewDetail(hutang)}
                    >
                      <TableCell className="font-medium">{hutang.id}</TableCell>
                      <TableCell className="text-right font-bold">
                        Rp {hutang.amount.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>{hutang.supplier}</TableCell>
                      <TableCell>{hutang.dateCreated}</TableCell>
                      <TableCell>{hutang.dueDate}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {hutang.datePaid || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={hutang.status === "Lunas" ? "default" : "secondary"}
                          className={hutang.status === "Lunas" ? "bg-green-600" : "bg-orange-500"}
                        >
                          {hutang.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(hutang);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Piutang */}
        <TabsContent value="piutang" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Select value={filterName} onValueChange={setFilterName}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Customer</SelectItem>
                    <SelectItem value="Siti Rahma">Siti Rahma</SelectItem>
                    <SelectItem value="Dewi Kusuma">Dewi Kusuma</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Waktu</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Piutang List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Piutang ({piutangData.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Transaksi</TableHead>
                    <TableHead>Nama Customer</TableHead>
                    <TableHead className="text-right">Jumlah Piutang</TableHead>
                    <TableHead>Tgl Piutang</TableHead>
                    <TableHead>Tgl Jatuh Tempo</TableHead>
                    <TableHead className="text-right">Sisa Piutang</TableHead>
                    <TableHead>Tgl Bayar Piutang</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {piutangData.map((piutang) => (
                    <TableRow
                      key={piutang.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewDetail(piutang)}
                    >
                      <TableCell className="font-medium">{piutang.id}</TableCell>
                      <TableCell>{piutang.customer}</TableCell>
                      <TableCell className="text-right font-bold">
                        Rp {piutang.amount.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>{piutang.dateCreated}</TableCell>
                      <TableCell>{piutang.dueDate}</TableCell>
                      <TableCell className="text-right">
                        Rp {piutang.remaining.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {piutang.datePaid || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={piutang.status === "Lunas" ? "default" : "secondary"}
                          className={piutang.status === "Lunas" ? "bg-green-600" : "bg-orange-500"}
                        >
                          {piutang.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(piutang);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Penghasilan/Pendapatan */}
        <TabsContent value="penghasilan" className="space-y-4">
          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">Total Penghasilan Kotor</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Rp 4.45jt</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">Total Penghasilan Bersih</p>
                <h3 className="mt-2 text-2xl font-bold text-green-600">Rp 550rb</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">Total Nominal Piutang</p>
                <h3 className="mt-2 text-2xl font-bold text-orange-600">Rp 1.2jt</h3>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Select value={filterName} onValueChange={setFilterName}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Customer</SelectItem>
                    {revenueData.map(r => (
                      <SelectItem key={r.customer} value={r.customer}>{r.customer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Waktu</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Lunas">Lunas</SelectItem>
                    <SelectItem value="Piutang">Piutang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Revenue List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Penghasilan ({revenueData.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Transaksi</TableHead>
                    <TableHead>Nama Customer</TableHead>
                    <TableHead>Tgl Pemasukan</TableHead>
                    <TableHead className="text-right">Pendapatan Bersih</TableHead>
                    <TableHead className="text-right">Pendapatan Kotor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueData.map((revenue) => (
                    <TableRow
                      key={revenue.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewDetail(revenue)}
                    >
                      <TableCell className="font-medium">{revenue.id}</TableCell>
                      <TableCell>{revenue.customer}</TableCell>
                      <TableCell>{revenue.date}</TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        Rp {revenue.netRevenue.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        Rp {revenue.grossRevenue.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={revenue.status === "Lunas" ? "default" : "secondary"}
                          className={revenue.status === "Lunas" ? "bg-green-600" : "bg-orange-500"}
                        >
                          {revenue.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(revenue);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Pengeluaran */}
        <TabsContent value="pengeluaran" className="space-y-4">
          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">Total Pengeluaran</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Rp 19.52jt</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">Total Nominal Hutang</p>
                <h3 className="mt-2 text-2xl font-bold text-red-600">Rp 8.52jt</h3>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Select value={filterName} onValueChange={setFilterName}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Supplier</SelectItem>
                    {expenseData.map(e => (
                      <SelectItem key={e.supplier} value={e.supplier}>{e.supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Waktu</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Lunas">Lunas</SelectItem>
                    <SelectItem value="Hutang">Hutang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Expense List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Pengeluaran ({expenseData.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Order</TableHead>
                    <TableHead>Nama Supplier</TableHead>
                    <TableHead className="text-right">Jumlah Pengeluaran</TableHead>
                    <TableHead>Tgl Pengeluaran</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map((expense) => (
                    <TableRow
                      key={expense.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewDetail(expense)}
                    >
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.supplier}</TableCell>
                      <TableCell className="text-right font-bold text-red-600">
                        Rp {expense.amount.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={expense.status === "Lunas" ? "default" : "secondary"}
                          className={expense.status === "Lunas" ? "bg-green-600" : "bg-red-500"}
                        >
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(expense);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog: Transaction Detail */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detail Transaksi {selectedTransaction?.id}</DialogTitle>
            <DialogDescription>
              Rincian produk dalam transaksi
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedTransaction && selectedTransaction.items && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTransaction.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell className="text-right">
                        Rp {item.price.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
