import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";

const stats = [
  { title: "Total Pelanggan", value: "892", change: "+12.5%" },
  { title: "Pelanggan Baru (Bulan Ini)", value: "48", change: "+8.2%" },
  { title: "Pelanggan Aktif", value: "654", change: "+5.1%" },
];

const customers = [
  {
    id: "CUST-001",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567890",
    address: "Jakarta Selatan",
    totalPurchases: 8,
    totalSpent: 45600000,
    lastPurchase: "16 Apr 2026",
    status: "VIP",
  },
  {
    id: "CUST-002",
    name: "Siti Rahma",
    email: "siti.rahma@email.com",
    phone: "081298765432",
    address: "Tangerang",
    totalPurchases: 5,
    totalSpent: 28900000,
    lastPurchase: "16 Apr 2026",
    status: "Aktif",
  },
  {
    id: "CUST-003",
    name: "Ahmad Yani",
    email: "ahmad.yani@email.com",
    phone: "081345678901",
    address: "Bekasi",
    totalPurchases: 12,
    totalSpent: 67200000,
    lastPurchase: "16 Apr 2026",
    status: "VIP",
  },
  {
    id: "CUST-004",
    name: "Dewi Kusuma",
    email: "dewi.kusuma@email.com",
    phone: "081456789012",
    address: "Jakarta Barat",
    totalPurchases: 3,
    totalSpent: 15600000,
    lastPurchase: "16 Apr 2026",
    status: "Aktif",
  },
  {
    id: "CUST-005",
    name: "Rudi Hartono",
    email: "rudi.hartono@email.com",
    phone: "081567890123",
    address: "Depok",
    totalPurchases: 6,
    totalSpent: 32400000,
    lastPurchase: "15 Apr 2026",
    status: "Aktif",
  },
  {
    id: "CUST-006",
    name: "Linda Wijaya",
    email: "linda.wijaya@email.com",
    phone: "081678901234",
    address: "Jakarta Timur",
    totalPurchases: 2,
    totalSpent: 12300000,
    lastPurchase: "14 Apr 2026",
    status: "Baru",
  },
  {
    id: "CUST-007",
    name: "Eko Prasetyo",
    email: "eko.prasetyo@email.com",
    phone: "081789012345",
    address: "Bogor",
    totalPurchases: 1,
    totalSpent: 8500000,
    lastPurchase: "13 Apr 2026",
    status: "Baru",
  },
  {
    id: "CUST-008",
    name: "Maya Sari",
    email: "maya.sari@email.com",
    phone: "081890123456",
    address: "Jakarta Utara",
    totalPurchases: 9,
    totalSpent: 52100000,
    lastPurchase: "12 Apr 2026",
    status: "VIP",
  },
];

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pelanggan</h1>
          <p className="text-gray-500">Kelola data pelanggan toko Anda</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Tambah Pelanggan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Segments */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Pelanggan VIP
                </p>
                <h3 className="mt-1 text-2xl font-bold text-yellow-900">124</h3>
                <p className="mt-1 text-xs text-yellow-700">
                  Total belanja &gt; 50 juta
                </p>
              </div>
              <Badge className="bg-yellow-600">VIP</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">
                  Pelanggan Aktif
                </p>
                <h3 className="mt-1 text-2xl font-bold text-green-900">654</h3>
                <p className="mt-1 text-xs text-green-700">
                  Transaksi 3 bulan terakhir
                </p>
              </div>
              <Badge className="bg-green-600">Aktif</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Pelanggan Baru
                </p>
                <h3 className="mt-1 text-2xl font-bold text-blue-900">114</h3>
                <p className="mt-1 text-xs text-blue-700">
                  Terdaftar bulan ini
                </p>
              </div>
              <Badge className="bg-blue-600">Baru</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Cari pelanggan (nama, email, telepon)..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Pelanggan</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Total Transaksi</TableHead>
                <TableHead>Total Belanja</TableHead>
                <TableHead>Terakhir Belanja</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalPurchases}x</TableCell>
                  <TableCell className="font-medium">
                    Rp {(customer.totalSpent / 1000000).toFixed(1)}jt
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {customer.lastPurchase}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "VIP"
                          ? "default"
                          : customer.status === "Aktif"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        customer.status === "VIP"
                          ? "bg-yellow-600"
                          : customer.status === "Aktif"
                          ? "bg-green-600"
                          : ""
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
