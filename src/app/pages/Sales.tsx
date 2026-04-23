import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Penjualan Hari Ini",
    value: "Rp 8.450.000",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    title: "Transaksi Hari Ini",
    value: "42",
    change: "+8.2%",
    icon: ShoppingBag,
  },
  {
    title: "Rata-rata per Transaksi",
    value: "Rp 201.190",
    change: "+4.3%",
    icon: TrendingUp,
  },
];

const salesByDay = [
  { day: "Sen", amount: 6200 },
  { day: "Sel", amount: 5800 },
  { day: "Rab", amount: 7100 },
  { day: "Kam", amount: 6400 },
  { day: "Jum", amount: 8200 },
  { day: "Sab", amount: 9500 },
  { day: "Min", amount: 7800 },
];

const transactions = [
  {
    id: "TRX-001234",
    date: "16 Apr 2026, 10:30",
    customer: "Budi Santoso",
    items: 2,
    total: 18500000,
    payment: "Transfer",
    status: "Selesai",
  },
  {
    id: "TRX-001235",
    date: "16 Apr 2026, 10:15",
    customer: "Siti Rahma",
    items: 1,
    total: 12300000,
    payment: "Kartu Kredit",
    status: "Proses",
  },
  {
    id: "TRX-001236",
    date: "16 Apr 2026, 09:45",
    customer: "Ahmad Yani",
    items: 3,
    total: 21200000,
    payment: "Cash",
    status: "Selesai",
  },
  {
    id: "TRX-001237",
    date: "16 Apr 2026, 09:20",
    customer: "Dewi Kusuma",
    items: 1,
    total: 6900000,
    payment: "Transfer",
    status: "Selesai",
  },
  {
    id: "TRX-001238",
    date: "16 Apr 2026, 08:55",
    customer: "Rudi Hartono",
    items: 2,
    total: 15600000,
    payment: "Kartu Debit",
    status: "Selesai",
  },
  {
    id: "TRX-001239",
    date: "15 Apr 2026, 16:40",
    customer: "Linda Wijaya",
    items: 1,
    total: 4200000,
    payment: "Cash",
    status: "Selesai",
  },
  {
    id: "TRX-001240",
    date: "15 Apr 2026, 15:30",
    customer: "Eko Prasetyo",
    items: 4,
    total: 32500000,
    payment: "Transfer",
    status: "Dibatalkan",
  },
  {
    id: "TRX-001241",
    date: "15 Apr 2026, 14:20",
    customer: "Maya Sari",
    items: 1,
    total: 17800000,
    payment: "Kartu Kredit",
    status: "Selesai",
  },
];

export function Sales() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(
    (trx) =>
      trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Penjualan</h1>
          <p className="text-gray-500">
            Kelola transaksi dan monitoring penjualan
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Transaksi Baru
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <p className="mt-1 text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Penjualan 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  `Rp ${(Number(value) * 1000).toLocaleString("id-ID")}`
                }
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari transaksi atau pelanggan..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Filter Tanggal
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter Status
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Tanggal & Waktu</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell className="font-medium">{trx.id}</TableCell>
                  <TableCell>{trx.date}</TableCell>
                  <TableCell>{trx.customer}</TableCell>
                  <TableCell>{trx.items} item</TableCell>
                  <TableCell className="font-medium">
                    Rp {trx.total.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{trx.payment}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trx.status === "Selesai"
                          ? "default"
                          : trx.status === "Proses"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {trx.status}
                    </Badge>
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
