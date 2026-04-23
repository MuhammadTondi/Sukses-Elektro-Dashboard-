import { useState } from "react";
import {
  Truck,
  UserPlus,
  Search,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Filter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";

const stats = [
  { title: "Total Supplier", value: "24", change: "+3.2%" },
  { title: "Supplier Aktif", value: "18", change: "+2.1%" },
  { title: "Order Bulan Ini", value: "42", change: "+15.8%" },
];

const suppliers = [
  {
    id: "SUP-001",
    name: "PT Mitra Elektrik",
    phone: "02178945612",
    address: "Jakarta Selatan",
    creditTerm: 30,
    totalOrders: 28,
    totalValue: 125000000,
    lastOrder: "16 Apr 2026",
    status: "Aktif",
  },
  {
    id: "SUP-002",
    name: "CV Elektronik Jaya",
    phone: "02156784321",
    address: "Tangerang",
    creditTerm: 45,
    totalOrders: 22,
    totalValue: 95000000,
    lastOrder: "15 Apr 2026",
    status: "Aktif",
  },
  {
    id: "SUP-003",
    name: "Toko Lampu Terang",
    phone: "02198761234",
    address: "Jakarta Barat",
    creditTerm: 30,
    totalOrders: 18,
    totalValue: 68000000,
    lastOrder: "14 Apr 2026",
    status: "Aktif",
  },
  {
    id: "SUP-004",
    name: "PT Kabel Nusantara",
    phone: "02145678901",
    address: "Bekasi",
    creditTerm: 60,
    totalOrders: 15,
    totalValue: 82000000,
    lastOrder: "13 Apr 2026",
    status: "Aktif",
  },
  {
    id: "SUP-005",
    name: "UD Cahaya Terang",
    phone: "02187654321",
    address: "Jakarta Timur",
    creditTerm: 30,
    totalOrders: 9,
    totalValue: 42000000,
    lastOrder: "10 Apr 2026",
    status: "Aktif",
  },
  {
    id: "SUP-006",
    name: "CV Mandiri Listrik",
    phone: "02134567890",
    address: "Depok",
    creditTerm: 30,
    totalOrders: 5,
    totalValue: 28000000,
    lastOrder: "05 Apr 2026",
    status: "Tidak Aktif",
  },
];

export function Suppliers() {
  const [activeTab, setActiveTab] = useState("suppliers");
  const [searchQuery, setSearchQuery] = useState("");
  const [supplierStatusFilter, setSupplierStatusFilter] = useState("all");
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);

  const filteredSuppliers = suppliers.filter(
    (supplier) => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.phone.includes(searchQuery);
      const matchesStatus = supplierStatusFilter === "all" || supplier.status === supplierStatusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier</h1>
          <p className="text-gray-500">Kelola data supplier toko Anda</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value);
        setSearchQuery("");
      }}>
        <TabsList className="grid w-full max-w-[220px] grid-cols-1">
          <TabsTrigger value="suppliers">
            <Truck className="mr-2 h-4 w-4" />
            Supplier
          </TabsTrigger>
        </TabsList>

        {/* Tab: Suppliers */}
        <TabsContent value="suppliers" className="space-y-6">
          {/* Action Button */}
          <div className="flex justify-end">
            <Button className="gap-2" onClick={() => setShowSupplierDialog(true)}>
              <UserPlus className="h-4 w-4" />
              Tambah Supplier
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
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supplier Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">
                  Supplier Aktif
                </p>
                <h3 className="mt-1 text-2xl font-bold text-green-900">18</h3>
                <p className="mt-1 text-xs text-green-700">
                  Order dalam 3 bulan terakhir
                </p>
              </div>
              <Badge className="bg-green-600">Aktif</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Supplier Tidak Aktif
                </p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">6</h3>
                <p className="mt-1 text-xs text-gray-700">
                  Tidak ada order 3 bulan terakhir
                </p>
              </div>
              <Badge variant="secondary">Tidak Aktif</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

          {/* Search & Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Cari supplier (nama, telepon)..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={supplierStatusFilter} onValueChange={setSupplierStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Suppliers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Supplier ({filteredSuppliers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama Supplier</TableHead>
                    <TableHead>No. HP</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Masa Kredit</TableHead>
                    <TableHead>Total Order</TableHead>
                    <TableHead>Total Nilai</TableHead>
                    <TableHead>Terakhir Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.id}</TableCell>
                      <TableCell>
                        <p className="font-medium">{supplier.name}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{supplier.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{supplier.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.creditTerm} hari</TableCell>
                      <TableCell>{supplier.totalOrders}x</TableCell>
                      <TableCell className="font-medium">
                        Rp {(supplier.totalValue / 1000000).toFixed(0)}jt
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {supplier.lastOrder}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            supplier.status === "Aktif"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            supplier.status === "Aktif"
                              ? "bg-green-600"
                              : ""
                          }
                        >
                          {supplier.status}
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
        </TabsContent>

      </Tabs>

      {/* Dialog: Add/Edit Supplier */}
      <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah Supplier</DialogTitle>
            <DialogDescription>
              Masukkan data supplier baru
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="supplier-id">ID Supplier</Label>
              <Input id="supplier-id" placeholder="SUP-001" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier-name">Nama Supplier</Label>
              <Input id="supplier-name" placeholder="PT ABC" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier-phone">No. HP</Label>
              <Input id="supplier-phone" placeholder="0812..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier-address">Alamat</Label>
              <Input id="supplier-address" placeholder="Jakarta" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier-credit">Ketentuan Masa Kredit (hari)</Label>
              <Input id="supplier-credit" type="number" placeholder="30" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSupplierDialog(false)}>
              Batal
            </Button>
            <Button onClick={() => setShowSupplierDialog(false)}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
