1. Pertanyaan Konfirmasi & Catatan Umum Use Case
Konfirmasi Tab Hutang Piutang: Tab ini tampaknya belum ada di desain awal, mohon dicek kembali (rincian pembuatannya ada di poin Laporan di bawah).

Konfirmasi Tab Kasir untuk Admin: Perlu dipastikan kembali apakah tab kasir perlu ada di akun Admin. Berdasarkan use case, Admin tidak berurusan dengan kasir (hanya akun kasir yang menggunakannya).

Kontradiksi Tab Kasir (Catatan): Di poin Kasir ada instruksi penambahan informasi pelanggan, namun di poin Order terdapat instruksi "Bagian informasi pelanggan (di tab kasir) dihapus saja". Mohon desainer menyesuaikan mana keputusan akhirnya.

Penghapusan Tab Pelanggan: Terdapat saran awal untuk menghapus Tab Pelanggan secara keseluruhan, namun terdapat detail revisi jika tab ini tetap dipertahankan. (Lihat poin 5).

2. Tab Dashboard
Hapus Pelanggan Aktif: Hapus bagian informasi pelanggan aktif dari dashboard.

Hapus Transaksi Terakhir: Hapus bagian ini karena informasinya sudah tersedia lengkap di Tab Penjualan.

Ubah Teks Header Penjualan: Ubah "Total Penjualan" menjadi "Pemasukan", karena format yang ditampilkan berupa nominal rupiah (angka jumlah barang terjual lebih cocok disebut total penjualan).

3. Tab Produk
Keterangan Sisa Stok: Tambahkan informasi sisa stok barang di daftar produk (contoh: iPhone 14 Pro sisa X).

Informasi Tambahan Produk: Tambahkan informasi Supplier, Harga Modal, dan Tanggal Update Data pada setiap item produk.

Tombol Edit Produk: Tambahkan tombol edit di setiap produk. Jika diklik, form terbuka dengan data lama yang sudah terisi otomatis.

Pop-up Tambah Produk: Buat pop-up dengan form berikut: Nama Produk, Code Produk (Primary key, otomatis terisi tapi bisa diubah), Kategori Produk, Harga Modal Produk, Harga Jual Produk, Minimal Stok, Asal Supplier, dan Satuan Produk (pcs, lusin, meter, dll).

4. Tab Inventori
Tombol Filter: Tambahkan di samping search bar (bawah) untuk memfilter produk berdasarkan status (Normal, Rendah, Habis).

Tombol Order: Tambahkan di samping informasi "status" sebagai shortcut untuk memasukkan produk tersebut langsung ke keranjang order.

5. Tab Pelanggan
Hapus Tombol Edit Cepat: Hapus tombol edit yang ada di samping teks "Terakhir Belanja". Tetap pertahankan tombol edit yang berada di dalam menu dropdown titik tiga vertikal.

Hapus Email: Di bagian kontak, cukup tampilkan No HP saja.

Pop-up Tambah Pelanggan: Berisi form: ID Customer, Nama Customer, No HP Customer, Alamat Customer. Setelah disimpan, data masuk ke daftar pelanggan.

Form Edit Pelanggan: Memunculkan form serupa dengan form "Tambah" namun data lama sudah terisi. Jika disimpan, otomatis update.

6. Tab Supplier
Tampilan: Gunakan layout yang sama persis dengan Tab Pelanggan.

Pop-up Tambah Supplier: Berisi form: ID Supplier, Nama, No HP, Alamat, Ketentuan Masa Kredit (hari).

Form Edit Supplier: Sama seperti pelanggan, data lama otomatis terisi dan bisa langsung di-update.

7. Tab Kasir (Jika dipertahankan untuk Admin)
Detail Struk Transaksi: Saat pop-up "Transaksi Berhasil" (baik lunas maupun piutang) muncul, tambahkan detail: Nama Barang, Tanggal, Bulan, Tahun, dll.

List Keranjang Kasir: Harus memuat: Kode Produk, Nama Produk, Banyaknya Produk, Satuan, Harga Produk, Jumlah Harga, beserta tombol Edit dan Hapus pada setiap produk.

Pop-up Input Keranjang: Form berisi: Nama, Code, Kategori, Harga Jual Satuan (Keempatnya otomatis terisi dari database). Kolom "Jumlah Produk" (Kosong, wajib isi), "Satuan Produk" (Kosong), "Diskon" (Kosong, opsional per produk).

Kolom Diskon Global: Tambahkan input nominal diskon di atas tombol "Proses Pembayaran".

Proses Pembayaran: Munculkan pop-up "Pilih jenis pembayaran" dengan opsi Cash dan Hutang.

Alur Pembayaran Cash: Muncul pop-up input nominal pembayaran dari pelanggan -> Pop-up konfirmasi lanjutkan transaksi -> Jika lanjut, muncul nominal kembalian, struk/bon otomatis ter-print, dan data masuk ke Pemasukan.

Alur Pembayaran Hutang: Muncul form: Nama, Alamat, No HP, Waktu Hutang (hari) -> Setelah diisi, data otomatis masuk ke Piutang.

Pop-up Tambah Pelanggan (Jika dipakai): Meminta input Nama, No HP, dan Alamat.

8. Tab Order
Catatan Fungsi Tab: Tab ini hanya untuk mencatat rekap list order internal demi menghitung pengeluaran/hutang. Order ke supplier tetap via WhatsApp (manual).

Mekanisme Dasar: Tampilan mirip Tab Kasir, namun menggunakan Harga Modal (bukan harga jual).

Tombol Filter Keranjang: Tambahkan tombol filter berdasarkan Asal Supplier.

Tombol Aksi Keranjang: Tambahkan tombol Screenshot (SS), Print, dan Share (otomatis terhubung ke WA) untuk mengirim keranjang order ke supplier. Posisinya disesuaikan agar rapi.

Halaman History Order: Menampilkan list order berisi: Code Order, Tgl Order, Nama Supplier, Total Nominal Order, dan Status Pembayaran.

Klik Detail Order: Jika salah satu history diklik, tampilkan rincian produk yang dibeli (format sama seperti keranjang order).

Tombol Add Inventori: Tambahkan di kanan setiap list history order. Berfungsi otomatis memasukkan stok produk yang sudah diorder ke dalam data Inventori.

Proses Pembayaran Order: Muncul pop-up "Pilih Metode Pembayaran" dengan opsi Cash dan Kredit (Hutang).

Alur Pembayaran Cash (Order): Muncul pop-up konfirmasi (Ya/Tidak). Jika Ya -> data masuk ke Pengeluaran. Jika Tidak -> transaksi batal (keranjang tetap utuh).

Alur Pembayaran Hutang (Order): Muncul pop-up konfirmasi (Ya/Tidak). Jika Ya -> data masuk ke Hutang. Jika Tidak -> transaksi batal (keranjang tetap utuh).

9. Manajemen Tab Laporan (Penggabungan Tab)
Pindahkan tab Penjualan, Hutang, Piutang, Penghasilan, dan Pengeluaran agar menyatu ke dalam satu Tab Utama yaitu Tab Laporan.

Laporan > Penjualan:

Hapus diagram batang di halaman penjualan.

Ubah tampilan "Penjualan Hari Ini" menjadi jumlah total barang terjual (bukan rupiah).

Pastikan riwayat transaksi tetap tampil.

Jika salah satu list transaksi diklik, munculkan rincian produk (format seperti keranjang kasir).

Laporan > Hutang:

Menampilkan: Code Order, Jumlah Hutang, Asal Supplier, Tanggal Hutang, Tanggal Jatuh Tempo, Tanggal Bayar (kosong jika belum lunas), Status (Lunas/Belum Lunas).

Filter: Berdasarkan Nama Supplier dan Jangka Waktu.

Klik Detail: Memunculkan rincian produk order.

Laporan > Piutang:

Menampilkan: Code Transaksi, Nama Customer, Jumlah Piutang, Tanggal Piutang, Tanggal Jatuh Tempo, Sisa Piutang, Tanggal Bayar (kosong jika belum), Status (Lunas/Belum Lunas).

Filter: Berdasarkan Nama Customer dan Jangka Waktu.

Klik Detail: Memunculkan rincian produk dari transaksi kasir.

Laporan > Penghasilan:

Bersumber dari data Penjualan dan Piutang.

Menampilkan list: Code Transaksi, Nama Customer, Tanggal Pemasukan, Pendapatan Bersih, Pendapatan Kotor, Status (Lunas/Piutang).

Menampilkan ringkasan: Total Penghasilan Kotor, Penghasilan Bersih, Total Nominal Piutang.

Filter: Berdasarkan Nama Customer, Jangka Waktu, dan Status (berlaku untuk list maupun ringkasan).

Klik Detail: Memunculkan rincian produk transaksi.

Laporan > Pengeluaran:

Bersumber dari data Hutang dan Order.

Menampilkan list: Code Order, Nama Supplier, Jumlah Pengeluaran, Tanggal Pengeluaran, Status (Lunas/Hutang).

Menampilkan ringkasan: Total Pengeluaran, Total Nominal Hutang.

Filter: Berdasarkan Nama Supplier, Jangka Waktu, dan Status (berlaku untuk list maupun ringkasan).

Klik Detail: Memunculkan rincian produk order.