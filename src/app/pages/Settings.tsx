import { useState } from "react";
import {
  Settings as SettingsIcon,
  Store,
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Save,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500">
          Kelola preferensi dan konfigurasi sistem toko
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store" className="gap-2">
            <Store className="h-4 w-4" />
            Toko
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Pembayaran
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Toko</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="store-name">Nama Toko</Label>
                  <Input id="store-name" defaultValue="SUKSES ELEKTRO" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-tagline">Tagline</Label>
                  <Input
                    id="store-tagline"
                    defaultValue="Toko Elektronika Terpercaya"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-description">Deskripsi</Label>
                  <Textarea
                    id="store-description"
                    rows={4}
                    defaultValue="Kami menyediakan berbagai produk elektronik berkualitas dengan harga terjangkau. Melayani pelanggan dengan sepenuh hati sejak 2015."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="store-phone">Telepon</Label>
                    <Input
                      id="store-phone"
                      defaultValue="021-12345678"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="store-email">Email</Label>
                    <Input
                      id="store-email"
                      type="email"
                      defaultValue="info@sukseselektro.com"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-address">Alamat</Label>
                  <Textarea
                    id="store-address"
                    rows={3}
                    defaultValue="Jl. Raya Elektronik No. 123, Jakarta Selatan 12345"
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jam Operasional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  "Senin - Jumat",
                  "Sabtu",
                  "Minggu",
                ].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <Label className="w-32">{day}</Label>
                    <Input className="flex-1" defaultValue="09:00 - 20:00" />
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">Nama Depan</Label>
                    <Input id="first-name" defaultValue="Admin" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Nama Belakang</Label>
                    <Input id="last-name" defaultValue="Toko" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="admin@sukseselektro.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" defaultValue="081234567890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferensi Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Terima notifikasi melalui email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Terima notifikasi push di browser
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Peringatan Stok Rendah</Label>
                  <p className="text-sm text-gray-500">
                    Notifikasi saat stok produk menipis
                  </p>
                </div>
                <Switch
                  checked={stockAlerts}
                  onCheckedChange={setStockAlerts}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Laporan Harian</Label>
                  <p className="text-sm text-gray-500">
                    Terima ringkasan penjualan harian
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifikasi Transaksi</Label>
                  <p className="text-sm text-gray-500">
                    Notifikasi untuk setiap transaksi baru
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">
                    Konfirmasi Password Baru
                  </Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Tambahkan lapisan keamanan ekstra
                  </p>
                </div>
                <Button variant="outline">Aktifkan</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Riwayat Login</Label>
                  <p className="text-sm text-gray-500">
                    Lihat aktivitas login akun Anda
                  </p>
                </div>
                <Button variant="outline">Lihat Riwayat</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cash / Tunai</Label>
                  <p className="text-sm text-gray-500">Pembayaran tunai</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transfer Bank</Label>
                  <p className="text-sm text-gray-500">
                    BCA, Mandiri, BNI, BRI
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Kartu Kredit/Debit</Label>
                  <p className="text-sm text-gray-500">Visa, Mastercard</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-Wallet</Label>
                  <p className="text-sm text-gray-500">
                    GoPay, OVO, DANA, ShopeePay
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Bank</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bank-name">Nama Bank</Label>
                  <Select defaultValue="bca">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca">Bank BCA</SelectItem>
                      <SelectItem value="mandiri">Bank Mandiri</SelectItem>
                      <SelectItem value="bni">Bank BNI</SelectItem>
                      <SelectItem value="bri">Bank BRI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-number">Nomor Rekening</Label>
                  <Input id="account-number" defaultValue="1234567890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-name">Nama Pemilik Rekening</Label>
                  <Input id="account-name" defaultValue="SUKSES ELEKTRO" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
