import { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  DollarSign,
  User,
  Printer,
  X,
  Search,
  Check,
  Edit,
  Percent,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

// Data inventori (sama dengan halaman Inventory)
const inventoryProducts = [
  {
    id: "PRD-001",
    name: "Saklar Engkel Broco",
    category: "Saklar",
    price: 15000,
    stock: 150,
  },
  {
    id: "PRD-002",
    name: "Saklar Seri Panasonic",
    category: "Saklar",
    price: 25000,
    stock: 120,
  },
  {
    id: "PRD-003",
    name: "Lampu LED 12 Watt Philips",
    category: "Lampu",
    price: 35000,
    stock: 200,
  },
  {
    id: "PRD-004",
    name: "Kabel NYM 2x1.5mm",
    category: "Kabel",
    price: 350000,
    stock: 45,
  },
  {
    id: "PRD-005",
    name: "Stop Kontak Universal Uticon",
    category: "Stop Kontak",
    price: 18000,
    stock: 80,
  },
  {
    id: "PRD-006",
    name: "Kabel LAN Cat6 UTP",
    category: "Kabel Ethernet",
    price: 450000,
    stock: 12,
  },
  {
    id: "PRD-007",
    name: "Connector RJ45 AMP Cat6",
    category: "Kabel Ethernet",
    price: 1500,
    stock: 0,
  },
  {
    id: "PRD-008",
    name: "MCB 2A Schneider",
    category: "MCB",
    price: 45000,
    stock: 65,
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  unit: string;
}

interface CustomerData {
  name: string;
  phone: string;
  address: string;
}

interface DebtData extends CustomerData {
  days: number;
}

export function Cashier() {
  const [productCode, setProductCode] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({ name: "", phone: "", address: "" });
  const [discount, setDiscount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "hutang" | "">("");
  const [amountPaid, setAmountPaid] = useState("");
  const [debtData, setDebtData] = useState<DebtData>({ name: "", phone: "", address: "", days: 7 });
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showPaymentTypeDialog, setShowPaymentTypeDialog] = useState(false);
  const [showCashPaymentDialog, setShowCashPaymentDialog] = useState(false);
  const [showDebtFormDialog, setShowDebtFormDialog] = useState(false);
  const [showConfirmPaymentDialog, setShowConfirmPaymentDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input saat mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Tambah produk ke keranjang
  const addToCart = (code: string) => {
    const product = inventoryProducts.find(
      (p) => p.id.toLowerCase() === code.toLowerCase()
    );

    if (!product) {
      toast.error("Produk tidak ditemukan!");
      return;
    }

    if (product.stock === 0) {
      toast.error("Stok produk habis!");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error("Stok tidak mencukupi!");
        return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`${product.name} ditambahkan`);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock,
          unit: "pcs",
        },
      ]);
      toast.success(`${product.name} ditambahkan ke keranjang`);
    }

    setProductCode("");
    inputRef.current?.focus();
  };

  // Update quantity
  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) return null;
            if (newQuantity > item.stock) {
              toast.error("Stok tidak mencukupi!");
              return item;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Hapus item
  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success("Item dihapus dari keranjang");
  };

  // Hitung total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = parseFloat(discount) || 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * 0.11; // PPN 11%
  const total = afterDiscount + tax;

  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && productCode) {
      addToCart(productCode);
    }
  };

  // Reset kasir
  const resetCashier = () => {
    setCart([]);
    setCustomerData({ name: "", phone: "", address: "" });
    setDiscount("");
    setPaymentMethod("");
    setAmountPaid("");
    setDebtData({ name: "", phone: "", address: "", days: 7 });
    setProductCode("");
    inputRef.current?.focus();
  };

  // Proses pembayaran
  const processPayment = () => {
    if (cart.length === 0) {
      toast.error("Keranjang masih kosong!");
      return;
    }
    setShowPaymentTypeDialog(true);
  };

  // Handle pilih metode pembayaran
  const handleSelectPaymentMethod = (method: "cash" | "hutang") => {
    setPaymentMethod(method);
    setShowPaymentTypeDialog(false);

    if (method === "cash") {
      setShowCashPaymentDialog(true);
    } else {
      setShowDebtFormDialog(true);
    }
  };

  // Handle konfirmasi pembayaran cash
  const handleConfirmCash = () => {
    const paid = parseFloat(amountPaid) || 0;

    if (paid < total) {
      toast.error("Jumlah bayar kurang!");
      return;
    }

    setShowCashPaymentDialog(false);
    setShowConfirmPaymentDialog(true);
  };

  // Handle submit hutang
  const handleSubmitDebt = () => {
    if (!debtData.name || !debtData.phone || !debtData.address) {
      toast.error("Mohon lengkapi semua data!");
      return;
    }

    // Generate transaction ID
    const newTransactionId = `TRX-${Date.now().toString().slice(-6)}`;
    setTransactionId(newTransactionId);

    toast.success("Data piutang berhasil disimpan!");
    setShowDebtFormDialog(false);
    setShowSuccessDialog(true);
  };

  // Handle simpan customer
  const handleSaveCustomer = () => {
    if (!customerData.name) {
      toast.error("Nama pelanggan harus diisi!");
      return;
    }
    toast.success("Data pelanggan disimpan!");
    setShowCustomerDialog(false);
  };

  // Handle edit item quantity
  const handleEditItem = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      setEditingItemId(id);
      setEditQuantity(item.quantity.toString());
    }
  };

  const handleSaveEdit = () => {
    if (!editingItemId) return;

    const newQty = parseInt(editQuantity);
    if (isNaN(newQty) || newQty <= 0) {
      toast.error("Jumlah tidak valid!");
      return;
    }

    const item = cart.find((i) => i.id === editingItemId);
    if (item && newQty > item.stock) {
      toast.error("Stok tidak mencukupi!");
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === editingItemId ? { ...item, quantity: newQty } : item
      )
    );

    setEditingItemId(null);
    setEditQuantity("");
    toast.success("Jumlah diperbarui!");
  };

  // Selesaikan transaksi
  const completeTransaction = () => {
    // Generate transaction ID
    const newTransactionId = `TRX-${Date.now().toString().slice(-6)}`;
    setTransactionId(newTransactionId);

    setShowConfirmPaymentDialog(false);
    setShowSuccessDialog(true);

    toast.success("Transaksi berhasil!");

    // Auto print struk (simulasi)
    setTimeout(() => {
      console.log("Printing receipt...");
    }, 500);
  };

  const change = parseFloat(amountPaid) - total;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kasir (POS)</h1>
          <p className="text-gray-500">Sistem Point of Sale</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetCashier}>
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Section - Input & Cart */}
        <div className="space-y-6 lg:col-span-2">
          {/* Input Kode Barang */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Input Kode Barang
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    placeholder="Masukkan kode produk (contoh: PRD-001)"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-lg"
                  />
                </div>
                <Button
                  onClick={() => addToCart(productCode)}
                  disabled={!productCode}
                  className="px-6"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah
                </Button>
              </div>

              {/* Quick Access Buttons */}
              <div>
                <Label className="mb-2 block text-sm text-gray-600">
                  Quick Access:
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {inventoryProducts.slice(0, 8).map((product) => (
                    <Button
                      key={product.id}
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(product.id)}
                      className="h-auto flex-col py-2"
                      disabled={product.stock === 0}
                    >
                      <span className="text-xs font-bold">{product.id}</span>
                      <span className="text-xs text-gray-600">
                        {product.name.slice(0, 15)}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Keranjang Belanja
                </span>
                <Badge variant="secondary">{cart.length} item</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                  <p>Keranjang masih kosong</p>
                  <p className="text-sm">Scan atau input kode barang</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Kode</TableHead>
                      <TableHead>Nama Produk</TableHead>
                      <TableHead className="w-[80px] text-center">Qty</TableHead>
                      <TableHead className="w-[60px]">Satuan</TableHead>
                      <TableHead className="w-[120px] text-right">Harga</TableHead>
                      <TableHead className="w-[120px] text-right">Jumlah</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-center">
                          {editingItemId === item.id ? (
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                                className="h-8 w-16 text-center"
                                autoFocus
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={handleSaveEdit}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span>{item.quantity}</span>
                          )}
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right">
                          Rp {item.price.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleEditItem(item.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Summary & Payment */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Pelanggan
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomerDialog(true)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Tambah
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customerData.name ? (
                <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                  <p className="font-medium text-gray-900">{customerData.name}</p>
                  {customerData.phone && (
                    <p className="text-sm text-gray-600">{customerData.phone}</p>
                  )}
                  {customerData.address && (
                    <p className="text-sm text-gray-600">{customerData.address}</p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCustomerDialog(true)}
                    className="mt-2 h-7 text-xs"
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Belum ada data pelanggan
                </p>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount" className="flex items-center gap-1 text-xs text-gray-600">
                  <Percent className="h-3 w-3" />
                  Diskon (Rp)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="h-9"
                />
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon</span>
                  <span>- Rp {discountAmount.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>PPN (11%)</span>
                <span>Rp {tax.toLocaleString("id-ID")}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button
            onClick={processPayment}
            disabled={cart.length === 0}
            className="h-14 w-full text-lg"
            size="lg"
          >
            <DollarSign className="mr-2 h-5 w-5" />
            Proses Pembayaran
          </Button>
        </div>
      </div>

      {/* Dialog: Tambah Customer */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Data Pelanggan</DialogTitle>
            <DialogDescription>Masukkan informasi pelanggan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Nama</Label>
              <Input
                id="customer-name"
                placeholder="Nama pelanggan"
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData({ ...customerData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">No HP</Label>
              <Input
                id="customer-phone"
                placeholder="08xxxxxxxxxx"
                value={customerData.phone}
                onChange={(e) =>
                  setCustomerData({ ...customerData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-address">Alamat</Label>
              <Input
                id="customer-address"
                placeholder="Alamat lengkap"
                value={customerData.address}
                onChange={(e) =>
                  setCustomerData({ ...customerData, address: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomerDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveCustomer}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Pilih Jenis Pembayaran */}
      <Dialog open={showPaymentTypeDialog} onOpenChange={setShowPaymentTypeDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Pilih Jenis Pembayaran</DialogTitle>
            <DialogDescription>
              Total yang harus dibayar: Rp {total.toLocaleString("id-ID")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button
              size="lg"
              className="h-16"
              onClick={() => handleSelectPaymentMethod("cash")}
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Cash
            </Button>
            <Button
              size="lg"
              className="h-16"
              variant="outline"
              onClick={() => handleSelectPaymentMethod("hutang")}
            >
              Hutang
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentTypeDialog(false)}
            >
              Batal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Input Nominal Pembayaran Cash */}
      <Dialog open={showCashPaymentDialog} onOpenChange={setShowCashPaymentDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Input Nominal Pembayaran</DialogTitle>
            <DialogDescription>
              Total: Rp {total.toLocaleString("id-ID")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount-paid">Jumlah Bayar</Label>
              <Input
                id="amount-paid"
                type="number"
                placeholder="0"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                autoFocus
              />
              {amountPaid && parseFloat(amountPaid) >= total && (
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-sm text-green-700">Kembalian:</p>
                  <p className="text-xl font-bold text-green-900">
                    Rp {change.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Jumlah Cepat:</Label>
              <div className="grid grid-cols-3 gap-2">
                {[50000, 100000, 200000, 500000, 1000000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmountPaid(amount.toString())}
                  >
                    {amount >= 1000000
                      ? `${amount / 1000000}jt`
                      : `${amount / 1000}rb`}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmountPaid(total.toString())}
                >
                  Pas
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCashPaymentDialog(false);
                setShowPaymentTypeDialog(true);
              }}
            >
              Kembali
            </Button>
            <Button onClick={handleConfirmCash}>
              <Check className="mr-2 h-4 w-4" />
              Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Form Hutang */}
      <Dialog open={showDebtFormDialog} onOpenChange={setShowDebtFormDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Form Hutang</DialogTitle>
            <DialogDescription>
              Total hutang: Rp {total.toLocaleString("id-ID")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="debt-name">Nama</Label>
              <Input
                id="debt-name"
                placeholder="Nama lengkap"
                value={debtData.name}
                onChange={(e) =>
                  setDebtData({ ...debtData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-phone">No HP</Label>
              <Input
                id="debt-phone"
                placeholder="08xxxxxxxxxx"
                value={debtData.phone}
                onChange={(e) =>
                  setDebtData({ ...debtData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-address">Alamat</Label>
              <Input
                id="debt-address"
                placeholder="Alamat lengkap"
                value={debtData.address}
                onChange={(e) =>
                  setDebtData({ ...debtData, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-days">Waktu Hutang (Hari)</Label>
              <Input
                id="debt-days"
                type="number"
                placeholder="7"
                value={debtData.days}
                onChange={(e) =>
                  setDebtData({ ...debtData, days: parseInt(e.target.value) || 7 })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDebtFormDialog(false);
                setShowPaymentTypeDialog(true);
              }}
            >
              Kembali
            </Button>
            <Button onClick={handleSubmitDebt}>Simpan Hutang</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Konfirmasi Pembayaran */}
      <Dialog open={showConfirmPaymentDialog} onOpenChange={setShowConfirmPaymentDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Transaksi</DialogTitle>
            <DialogDescription>Apakah transaksi dilanjutkan?</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold">Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dibayar</span>
                  <span className="font-medium">
                    Rp {parseFloat(amountPaid).toLocaleString("id-ID")}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-green-600">
                  <span>Kembalian</span>
                  <span className="text-xl font-bold">
                    Rp {change.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmPaymentDialog(false);
                setShowCashPaymentDialog(true);
              }}
            >
              Batal
            </Button>
            <Button onClick={completeTransaction}>
              <Check className="mr-2 h-4 w-4" />
              Lanjutkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="h-6 w-6" />
              Transaksi Berhasil!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-sm text-gray-600">ID Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactionId}
              </p>
            </div>

            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bayar</span>
                <span className="font-bold">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
              {paymentMethod === "cash" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dibayar</span>
                    <span className="font-medium">
                      Rp {parseFloat(amountPaid).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Kembalian</span>
                    <span className="font-bold">
                      Rp {change.toLocaleString("id-ID")}
                    </span>
                  </div>
                </>
              )}
              {paymentMethod === "hutang" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jatuh Tempo</span>
                    <span className="font-medium">{debtData.days} hari</span>
                  </div>
                  <div className="flex justify-between text-orange-600">
                    <span>Status</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Piutang
                    </Badge>
                  </div>
                </>
              )}
            </div>

            {(customerData.name || (paymentMethod === "hutang" && debtData.name)) && (
              <div className="rounded-lg border p-3">
                <p className="text-sm text-gray-600">Pelanggan</p>
                <p className="font-medium text-gray-900">
                  {paymentMethod === "hutang" ? debtData.name : customerData.name}
                </p>
                {paymentMethod === "hutang" && (
                  <>
                    <p className="text-sm text-gray-600">{debtData.phone}</p>
                    <p className="text-sm text-gray-600">{debtData.address}</p>
                  </>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button variant="outline" className="flex-1">
              <Printer className="mr-2 h-4 w-4" />
              Cetak Struk
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setShowSuccessDialog(false);
                resetCashier();
              }}
            >
              Transaksi Baru
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
