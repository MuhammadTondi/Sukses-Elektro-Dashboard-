import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

const products = [
  {
    id: "PRD-001",
    name: "Saklar Engkel Broco",
    category: "Saklar",
    brand: "Broco",
    supplier: "PT Mitra Elektrik",
    price: 15000,
    costPrice: 12000,
    stock: 150,
    minStock: 50,
    unit: "pcs",
    status: "Tersedia",
    lastUpdated: "16 Apr 2026",
  },
  {
    id: "PRD-002",
    name: "Saklar Seri Panasonic",
    category: "Saklar",
    brand: "Panasonic",
    supplier: "CV Elektronik Jaya",
    price: 25000,
    costPrice: 20000,
    stock: 120,
    minStock: 40,
    unit: "pcs",
    status: "Tersedia",
    lastUpdated: "15 Apr 2026",
  },
  {
    id: "PRD-003",
    name: "Lampu LED 12 Watt Philips",
    category: "Lampu",
    brand: "Philips",
    supplier: "Toko Lampu Terang",
    price: 35000,
    costPrice: 28000,
    stock: 200,
    minStock: 80,
    unit: "pcs",
    status: "Tersedia",
    lastUpdated: "14 Apr 2026",
  },
  {
    id: "PRD-004",
    name: "Kabel NYM 2x1.5mm",
    category: "Kabel",
    brand: "Supreme",
    supplier: "PT Kabel Nusantara",
    price: 350000,
    costPrice: 320000,
    stock: 45,
    minStock: 20,
    unit: "roll",
    status: "Tersedia",
    lastUpdated: "16 Apr 2026",
  },
  {
    id: "PRD-005",
    name: "Stop Kontak Universal Uticon",
    category: "Stop Kontak",
    brand: "Uticon",
    supplier: "CV Elektronik Jaya",
    price: 18000,
    costPrice: 14000,
    stock: 80,
    minStock: 30,
    unit: "pcs",
    status: "Tersedia",
    lastUpdated: "13 Apr 2026",
  },
  {
    id: "PRD-006",
    name: "Kabel LAN Cat6 UTP",
    category: "Kabel Ethernet",
    brand: "AMP",
    supplier: "PT Mitra Elektrik",
    price: 450000,
    costPrice: 410000,
    stock: 12,
    minStock: 25,
    unit: "box",
    status: "Stok Rendah",
    lastUpdated: "12 Apr 2026",
  },
  {
    id: "PRD-007",
    name: "Connector RJ45 AMP Cat6",
    category: "Kabel Ethernet",
    brand: "AMP",
    supplier: "PT Kabel Nusantara",
    price: 1500,
    costPrice: 1200,
    stock: 0,
    minStock: 100,
    unit: "pcs",
    status: "Habis",
    lastUpdated: "10 Apr 2026",
  },
  {
    id: "PRD-008",
    name: "MCB 2A Schneider",
    category: "MCB",
    brand: "Schneider",
    supplier: "PT Mitra Elektrik",
    price: 45000,
    costPrice: 38000,
    stock: 65,
    minStock: 25,
    unit: "pcs",
    status: "Tersedia",
    lastUpdated: "16 Apr 2026",
  },
  {
    id: "PRD-009",
    name: "Fitting Lampu E27",
    category: "Fitting",
    brand: "Oki",
    supplier: "Toko Lampu Terang",
    price: 8000,
    costPrice: 6000,
    stock: 180,
    minStock: 60,
    unit: "pcs",
    status: "Tersedia",
    lastUpdated: "15 Apr 2026",
  },
  {
    id: "PRD-010",
    name: "Kabel NYA 2.5mm",
    category: "Kabel",
    brand: "Eterna",
    supplier: "PT Kabel Nusantara",
    price: 180000,
    costPrice: 165000,
    stock: 75,
    minStock: 30,
    unit: "roll",
    status: "Tersedia",
    lastUpdated: "14 Apr 2026",
  },
];

interface ProductForm {
  id: string;
  name: string;
  category: string;
  brand: string;
  supplier: string;
  costPrice: string;
  price: string;
  minStock: string;
  unit: string;
}

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    id: "",
    name: "",
    category: "",
    brand: "",
    supplier: "",
    costPrice: "",
    price: "",
    minStock: "",
    unit: "pcs",
  });

  // Get unique suppliers
  const uniqueSuppliers = Array.from(new Set(products.map(p => p.supplier)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    const matchesSupplier = supplierFilter === "all" || product.supplier === supplierFilter;

    return matchesSearch && matchesStatus && matchesSupplier;
  });

  // Generate auto ID
  const generateProductId = () => {
    const maxId = products.reduce((max, p) => {
      const num = parseInt(p.id.split("-")[1]);
      return num > max ? num : max;
    }, 0);
    return `PRD-${String(maxId + 1).padStart(3, "0")}`;
  };

  // Handle open add dialog
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      id: generateProductId(),
      name: "",
      category: "",
      brand: "",
      supplier: "",
      costPrice: "",
      price: "",
      minStock: "",
      unit: "pcs",
    });
    setIsDialogOpen(true);
  };

  // Handle open edit dialog
  const handleOpenEdit = (product: typeof products[0]) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      supplier: product.supplier,
      costPrice: product.costPrice.toString(),
      price: product.price.toString(),
      minStock: product.minStock.toString(),
      unit: product.unit,
    });
    setIsDialogOpen(true);
  };

  // Handle save
  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.supplier || !formData.costPrice || !formData.price) {
      toast.error("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    if (editingProduct) {
      toast.success("Produk berhasil diperbarui!");
    } else {
      toast.success("Produk baru berhasil ditambahkan!");
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produk</h1>
          <p className="text-gray-500">Kelola inventori produk toko Anda</p>
        </div>
        <Button className="gap-2" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowFilterDialog(true)}
              >
                <Filter className="h-4 w-4" />
                Filter
                {(statusFilter !== "all" || supplierFilter !== "all") && (
                  <Badge variant="secondary" className="ml-1">
                    {[statusFilter !== "all" ? 1 : 0, supplierFilter !== "all" ? 1 : 0].reduce((a, b) => a + b, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Produk</TableHead>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Harga Modal</TableHead>
                  <TableHead>Harga Jual</TableHead>
                  <TableHead>Tgl Update</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Sisa: {product.stock} {product.unit}</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-sm">{product.supplier}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.stock}</p>
                        <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Rp {product.costPrice.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>
                      Rp {product.price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {product.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "Tersedia"
                            ? "default"
                            : product.status === "Stok Rendah"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleOpenEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Perbarui informasi produk"
                : "Masukkan detail produk yang akan ditambahkan ke inventori"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-id">Code Produk</Label>
              <Input
                id="product-id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="PRD-001"
              />
              <p className="text-xs text-gray-500">
                Code otomatis terisi, bisa diubah jika perlu
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Nama Produk *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: iPhone 14 Pro"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori Produk *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saklar">Saklar</SelectItem>
                    <SelectItem value="Lampu">Lampu</SelectItem>
                    <SelectItem value="Kabel">Kabel</SelectItem>
                    <SelectItem value="Stop Kontak">Stop Kontak</SelectItem>
                    <SelectItem value="Kabel Ethernet">Kabel Ethernet</SelectItem>
                    <SelectItem value="MCB">MCB</SelectItem>
                    <SelectItem value="Fitting">Fitting</SelectItem>
                    <SelectItem value="Aksesoris">Aksesoris</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="brand">Merek</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Contoh: Apple"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="supplier">Asal Supplier *</Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) => setFormData({ ...formData, supplier: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT Mitra Elektrik">PT Mitra Elektrik</SelectItem>
                  <SelectItem value="CV Elektronik Jaya">CV Elektronik Jaya</SelectItem>
                  <SelectItem value="Toko Lampu Terang">Toko Lampu Terang</SelectItem>
                  <SelectItem value="PT Kabel Nusantara">PT Kabel Nusantara</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="costPrice">Harga Modal Produk *</Label>
                <Input
                  id="costPrice"
                  type="number"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Harga Jual Produk *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minStock">Minimal Stok</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  placeholder="10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Satuan Produk</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">Pcs</SelectItem>
                    <SelectItem value="lusin">Lusin</SelectItem>
                    <SelectItem value="meter">Meter</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingProduct ? "Perbarui Produk" : "Simpan Produk"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Filter Produk</DialogTitle>
            <DialogDescription>
              Filter produk berdasarkan status stok dan supplier
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="filter-status">Status Stok</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="filter-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Tersedia">Tersedia</SelectItem>
                  <SelectItem value="Stok Rendah">Stok Rendah</SelectItem>
                  <SelectItem value="Habis">Habis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="filter-supplier">Supplier</Label>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger id="filter-supplier">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Supplier</SelectItem>
                  {uniqueSuppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("all");
                setSupplierFilter("all");
              }}
            >
              Reset
            </Button>
            <Button onClick={() => setShowFilterDialog(false)}>
              Terapkan Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
