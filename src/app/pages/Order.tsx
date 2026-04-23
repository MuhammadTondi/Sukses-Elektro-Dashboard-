import { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Filter,
  Camera,
  Printer,
  Share2,
  FileText,
  Check,
  X,
  Package,
  RotateCcw,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "sonner";
import { Inventory } from "./Inventory";

// Data produk untuk order
const orderProducts = [
  { id: "PRD-001", name: "Saklar Engkel Broco", supplier: "PT Mitra Elektrik", price: 12000, unit: "pcs" },
  { id: "PRD-002", name: "Saklar Seri Panasonic", supplier: "CV Elektronik Jaya", price: 20000, unit: "pcs" },
  { id: "PRD-003", name: "Lampu LED 12 Watt Philips", supplier: "Toko Lampu Terang", price: 28000, unit: "pcs" },
  { id: "PRD-004", name: "Kabel NYM 2x1.5mm", supplier: "PT Kabel Nusantara", price: 320000, unit: "roll" },
  { id: "PRD-005", name: "Stop Kontak Universal Uticon", supplier: "CV Elektronik Jaya", price: 14000, unit: "pcs" },
  { id: "PRD-006", name: "Kabel LAN Cat6 UTP", supplier: "PT Mitra Elektrik", price: 410000, unit: "box" },
  { id: "PRD-007", name: "Connector RJ45 AMP Cat6", supplier: "PT Kabel Nusantara", price: 1200, unit: "pcs" },
  { id: "PRD-008", name: "MCB 2A Schneider", supplier: "PT Mitra Elektrik", price: 38000, unit: "pcs" },
];

// Data history order dengan status added inventory
const historyOrders = [
  {
    id: "ORD-001",
    date: "16 Apr 2026",
    supplier: "PT Mitra Elektrik",
    total: 5400000,
    status: "Lunas",
    addedToInventory: false,
    items: [
      { id: "PRD-001", name: "Saklar Engkel Broco", quantity: 200, unit: "pcs", price: 12000 },
      { id: "PRD-008", name: "MCB 2A Schneider", quantity: 50, unit: "pcs", price: 38000 },
    ],
  },
  {
    id: "ORD-002",
    date: "15 Apr 2026",
    supplier: "PT Kabel Nusantara",
    total: 8520000,
    status: "Hutang",
    addedToInventory: false,
    items: [
      { id: "PRD-004", name: "Kabel NYM 2x1.5mm", quantity: 25, unit: "roll", price: 320000 },
      { id: "PRD-007", name: "Connector RJ45 AMP Cat6", quantity: 200, unit: "pcs", price: 1200 },
    ],
  },
  {
    id: "ORD-003",
    date: "14 Apr 2026",
    supplier: "Toko Lampu Terang",
    total: 5600000,
    status: "Lunas",
    addedToInventory: true,
    items: [
      { id: "PRD-003", name: "Lampu LED 12 Watt Philips", quantity: 200, unit: "pcs", price: 28000 },
    ],
  },
];

interface CartItem {
  id: string;
  name: string;
  supplier: string;
  price: number;
  quantity: number;
  unit: string;
}

export function Order() {
  const [activeTab, setActiveTab] = useState("order");
  const [productCode, setProductCode] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterSupplier, setFilterSupplier] = useState("all");
  const [showOrderDetailDialog, setShowOrderDetailDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "kredit" | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof historyOrders[0] | null>(null);
  const [orders, setOrders] = useState(historyOrders);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterHistorySupplier, setFilterHistorySupplier] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === "order") {
      inputRef.current?.focus();
    }
  }, [activeTab]);

  // Tambah produk ke keranjang
  const addToCart = (code: string) => {
    const product = orderProducts.find(
      (p) => p.id.toLowerCase() === code.toLowerCase()
    );

    if (!product) {
      toast.error("Produk tidak ditemukan!");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
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
          supplier: product.supplier,
          price: product.price,
          quantity: 1,
          unit: product.unit,
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filter cart by supplier
  const filteredCart = filterSupplier === "all"
    ? cart
    : cart.filter(item => item.supplier === filterSupplier);

  // Get unique suppliers from cart
  const suppliersInCart = Array.from(new Set(cart.map(item => item.supplier)));

  // Reset cart
  const handleReset = () => {
    setCart([]);
    toast.success("Keranjang order direset");
  };

  // Handle screenshot
  const handleScreenshot = () => {
    toast.info("Screenshot keranjang order...");
  };

  // Handle print
  const handlePrint = () => {
    toast.info("Mencetak keranjang order...");
    window.print();
  };

  // Handle share
  const handleShare = () => {
    toast.info("Membagikan keranjang order ke WhatsApp...");
  };

  // Handle submit order
  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      toast.error("Keranjang masih kosong!");
      return;
    }
    setShowPaymentDialog(true);
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: "cash" | "kredit") => {
    setPaymentMethod(method);
    setShowPaymentDialog(false);
    setShowConfirmDialog(true);
  };

  // Handle confirm order
  const handleConfirmOrder = () => {
    if (paymentMethod === "cash") {
      toast.success("Order berhasil! Data masuk ke pengeluaran.");
    } else {
      toast.success("Order berhasil! Data masuk ke data hutang.");
    }
    setCart([]);
    setShowConfirmDialog(false);
    setPaymentMethod(null);
  };

  // Handle cancel confirm
  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
    setPaymentMethod(null);
    toast.info("Transaksi dibatalkan, keranjang tetap tersimpan");
  };

  // Handle view order detail
  const handleViewOrderDetail = (order: typeof historyOrders[0]) => {
    setSelectedOrder(order);
    setShowOrderDetailDialog(true);
  };

  // Handle add to inventory
  const handleAddToInventory = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, addedToInventory: true } : order
    ));
    toast.success("Stok produk berhasil ditambahkan ke inventori!");
  };

  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && productCode) {
      addToCart(productCode);
    }
  };

  // Filter history orders
  const filteredHistoryOrders = orders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesSupplier = filterHistorySupplier === "all" || order.supplier === filterHistorySupplier;
    return matchesStatus && matchesSupplier;
  });

  // Get unique suppliers from history
  const suppliersInHistory = Array.from(new Set(orders.map(order => order.supplier)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Produk</h1>
          <p className="text-gray-500">Kelola order pembelian dari supplier</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="order">Buat Order</TabsTrigger>
          <TabsTrigger value="history">History Order</TabsTrigger>
          <TabsTrigger value="inventory">Inventori</TabsTrigger>
        </TabsList>

        {/* Tab: Buat Order */}
        <TabsContent value="order" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Section - Input & Cart */}
            <div className="space-y-6 lg:col-span-2">
              {/* Input Kode Barang */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Input Kode Produk
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Masukkan kode produk (contoh: PRD-001)"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-lg"
                    />
                    <Button
                      onClick={() => addToCart(productCode)}
                      disabled={!productCode}
                      className="px-6"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah
                    </Button>
                  </div>

                  {/* Quick Access */}
                  <div>
                    <Label className="mb-2 block text-sm text-gray-600">
                      Quick Access:
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {orderProducts.slice(0, 8).map((product) => (
                        <Button
                          key={product.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(product.id)}
                          className="h-auto flex-col py-2"
                        >
                          <span className="text-xs font-bold">{product.id}</span>
                          <span className="text-xs text-gray-600">
                            {product.name.slice(0, 12)}...
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cart */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Keranjang Order
                      <Badge variant="secondary" className="ml-2">
                        {cart.length} item
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={filterSupplier} onValueChange={setFilterSupplier}>
                        <SelectTrigger className="w-[200px]">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Supplier</SelectItem>
                          {suppliersInCart.map((supplier) => (
                            <SelectItem key={supplier} value={supplier}>
                              {supplier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p>Keranjang order masih kosong</p>
                      <p className="text-sm">Input kode produk untuk mulai order</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Kode</TableHead>
                          <TableHead>Nama Produk</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead className="w-[80px] text-center">Qty</TableHead>
                          <TableHead className="w-[60px]">Satuan</TableHead>
                          <TableHead className="w-[120px] text-right">Harga</TableHead>
                          <TableHead className="w-[120px] text-right">Jumlah</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCart.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {item.supplier}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell className="text-right">
                              Rp {item.price.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Section - Actions & Summary */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Aksi Keranjang</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleScreenshot}
                    disabled={cart.length === 0}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Screenshot
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handlePrint}
                    disabled={cart.length === 0}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleShare}
                    disabled={cart.length === 0}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={handleReset}
                    disabled={cart.length === 0}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Keranjang
                  </Button>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ringkasan Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Item</span>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} pcs</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total Order</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitOrder}
                disabled={cart.length === 0}
                className="h-14 w-full text-lg"
                size="lg"
              >
                <Check className="mr-2 h-5 w-5" />
                Submit Order
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Tab: History Order */}
        <TabsContent value="history" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Lunas">Lunas</SelectItem>
                    <SelectItem value="Hutang">Hutang</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterHistorySupplier} onValueChange={setFilterHistorySupplier}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Supplier</SelectItem>
                    {suppliersInHistory.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar History Order ({filteredHistoryOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code Order</TableHead>
                    <TableHead>Tanggal Order</TableHead>
                    <TableHead>Nama Supplier</TableHead>
                    <TableHead className="text-right">Total Nominal</TableHead>
                    <TableHead>Status Pembayaran</TableHead>
                    <TableHead className="w-[150px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistoryOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewOrderDetail(order)}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell className="text-right font-bold">
                        Rp {order.total.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={order.status === "Lunas" ? "default" : "secondary"}
                          className={order.status === "Lunas" ? "bg-green-600" : "bg-orange-500"}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={order.addedToInventory ? "secondary" : "outline"}
                          className={order.addedToInventory ? "gap-1 bg-green-100 text-green-700" : "gap-1"}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!order.addedToInventory) {
                              handleAddToInventory(order.id);
                            }
                          }}
                          disabled={order.addedToInventory}
                        >
                          <Package className="h-3 w-3" />
                          {order.addedToInventory ? "Added" : "Add Inventori"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Inventori */}
        <TabsContent value="inventory" className="space-y-6">
          <Inventory />
        </TabsContent>

      </Tabs>

      {/* Dialog: Payment Method */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
            <DialogDescription>
              Pilih metode pembayaran untuk order ini
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              onClick={() => handlePaymentMethodSelect("cash")}
              className="h-24 flex-col gap-2 bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Check className="h-8 w-8" />
              <span>Cash</span>
            </Button>
            <Button
              onClick={() => handlePaymentMethodSelect("kredit")}
              className="h-24 flex-col gap-2 bg-orange-500 hover:bg-orange-600"
              size="lg"
            >
              <FileText className="h-8 w-8" />
              <span>Kredit</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirm Order */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Transaksi</DialogTitle>
            <DialogDescription>
              Apakah transaksi ingin dilanjutkan?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Metode Pembayaran</p>
              <p className="font-bold text-gray-900">
                {paymentMethod === "cash" ? "Cash" : "Kredit"}
              </p>
              <Separator className="my-2" />
              <p className="text-sm text-gray-600">Total Order</p>
              <p className="font-bold text-gray-900">
                Rp {total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleCancelConfirm}>
              <X className="mr-2 h-4 w-4" />
              Tidak
            </Button>
            <Button onClick={handleConfirmOrder}>
              <Check className="mr-2 h-4 w-4" />
              Ya, Lanjutkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Order Detail */}
      <Dialog open={showOrderDetailDialog} onOpenChange={setShowOrderDetailDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detail Order {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Rincian produk yang dibeli dari {selectedOrder?.supplier}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedOrder && (
              <>
                <div className="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Order</p>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge
                      variant={selectedOrder.status === "Lunas" ? "default" : "secondary"}
                      className={selectedOrder.status === "Lunas" ? "bg-green-600" : "bg-orange-500"}
                    >
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Supplier</p>
                    <p className="font-medium">{selectedOrder.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Order</p>
                    <p className="font-bold">Rp {selectedOrder.total.toLocaleString("id-ID")}</p>
                  </div>
                </div>

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
                    {selectedOrder.items.map((item) => (
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
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOrderDetailDialog(false)}>
              Tutup
            </Button>
            <Button onClick={() => {
              if (selectedOrder) {
                handleAddToInventory(selectedOrder.id);
                setShowOrderDetailDialog(false);
              }
            }}>
              <Package className="mr-2 h-4 w-4" />
              Add ke Inventori
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
