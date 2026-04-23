Saran Revisi Sistem RPL

---

## A. Produk

1. **Tombol filter diperbaiki** agar berfungsi. Filter bekerja berdasarkan dua kriteria:
   - Status stok (Normal, Rendah, Habis)
   - Asal supplier

2. **Tambahkan informasi** di setiap produk:
   - Supplier
   - Harga Modal
   - Tanggal update data

3. **Form Tambah Produk** — saat menekan tombol "Tambah Produk", sistem memunculkan pop-up dengan isian:
   - Nama Produk
   - Kode Produk *(otomatis terisi, bisa diubah — primary key)*
   - Kategori Produk
   - Harga Modal
   - Harga Jual
   - Minimal Stok
   - Asal Supplier
   - Satuan Produk *(pcs, lusin, meter, dll.)*

4. **Tombol Edit** muncul pada setiap produk. Saat ditekan, form tampil seperti "Tambah Produk" namun sudah terisi dengan data yang ada sebelumnya.

---

## B. Kasir

1. **List produk di keranjang belanja** — setiap produk yang masuk keranjang menampilkan informasi:
   - Kode produk
   - Nama produk
   - Banyaknya produk
   - Satuan
   - Harga produk
   - Jumlah harga
   - Tombol **Edit** dan **Hapus** di setiap produk

2. **Pop-up form saat memasukkan produk ke keranjang** — setiap kali produk dimasukkan, sistem memunculkan pop-up dengan isian:
   - Nama Produk *(otomatis terisi)*
   - Kode Produk *(otomatis terisi — primary key)*
   - Kategori Produk *(otomatis terisi)*
   - Harga Jual Satuan *(otomatis terisi)*
   - Jumlah Produk *(kosong — wajib diisi)*
   - Satuan *(kosong — pcs, lusin, meter, dll.)*
   - Diskon per produk *(kosong — opsional, hanya diisi jika ingin memberi diskon per produk ke customer)*

3. **Input kode barang** — saat mengetik nama atau kode, sistem merekomendasikan beberapa barang di *quick access* sesuai huruf yang diketikkan.

4. **Kolom diskon global** ditambahkan di atas tombol Proses Pembayaran untuk input nominal diskon keseluruhan transaksi.

5. **Tombol Tambah** di bagian Informasi Pelanggan berfungsi untuk menambah data customer baru. Saat ditekan, muncul pop-up formulir dengan isian: Nama, No. HP, dan Alamat.

6. **Kolom input Nama Pelanggan** ditambahkan di bagian Informasi Pelanggan. Nama ini akan disematkan di dalam struk/bon.

7. **Form Hutang** (muncul setelah proses pembayaran hutang):
   - Saat mengetik nama customer di kolom Nama, sistem menampilkan rekomendasi nama dari data customer sesuai huruf yang diketik.
   - Saat salah satu nama diklik, kolom Nama, No. HP, dan Alamat terisi otomatis dari data customer.

8. **Tombol Print** — yang dicetak hanya bagian **list keranjang belanja**, bukan seluruh layar.

9. **Tombol Screenshot** — yang di-screenshot hanya bagian **list keranjang belanja** saja.

10. **Alur pembayaran saat menekan "Proses Pembayaran":**
    - Muncul pop-up "Pilih Jenis Pembayaran" dengan dua tombol: **Cash** dan **Hutang**.
    - **Jika Cash:** muncul pop-up input nominal pembayaran → konfirmasi lanjutkan atau tidak → jika dilanjutkan tampilkan nominal kembalian → cetak struk/bon otomatis → data masuk ke pemasukan.
    - **Jika Hutang:** muncul form isian (Nama, Alamat, No. HP, Waktu Hutang (hari)) → setelah diisi, data masuk ke piutang.

---

## C. Inventori

1. **Tombol filter** ditambahkan di samping search bar cari produk (bagian bawah), untuk memfilter list produk berdasarkan statusnya:
   - Normal
   - Rendah
   - Habis

2. **Tombol Order** ditambahkan di samping informasi "status" pada setiap produk. Tombol ini berfungsi sebagai shortcut untuk memasukkan produk ke keranjang order.
   - Saat tombol Order ditekan, tab **tidak berpindah** ke tab "Buat Order". User tetap berada di tab Inventori agar bisa memilih produk lain.
   - Tombol Order yang sudah dipilih berubah warna menjadi **hijau**.
   - Setelah proses order selesai, warna tombol Order kembali ke semula.

---

## D. Order

1. **Tampilan dan mekanisme** hampir sama dengan tab Kasir. Perbedaannya:
   - Harga produk yang tertera merupakan **harga modal**.
   - Bagian Informasi Pelanggan (seperti di tab Kasir) **dihapus**.

2. **Keranjang Order:**
   - Terdapat tombol **filter** untuk memfilter produk berdasarkan asal supplier.
   - Terdapat tombol **SS** (screenshot → kirim ke WA supplier), **Print** (cetak fisik list order), dan **Share** (otomatis terhubung ke WA, pilih kontak supplier).

3. **Tombol Reset** ditambahkan untuk mereset keranjang order (seperti yang ada di tab Kasir).

4. **Alur saat menekan tombol Submit/Proses Order:**
   - Muncul pop-up "Pilih Metode Pembayaran" dengan dua tombol: **Cash** dan **Kredit**.
   - **Jika Cash:** muncul pop-up konfirmasi "Apakah transaksi ingin dilanjutkan?" (Ya / Tidak). Jika Ya, data masuk ke pengeluaran. Jika Tidak, proses dibatalkan dan list keranjang tetap ada.
   - **Jika Kredit/Hutang:** muncul pop-up konfirmasi "Apakah transaksi ingin dilanjutkan?" (Ya / Tidak). Jika Ya, data masuk ke data hutang. Jika Tidak, proses dibatalkan dan list keranjang tetap ada.

5. **Tab History Order:**
   - Menampilkan list: Kode Order, Tgl Order, Nama Supplier, Total Nominal Order, Status Pembayaran.
   - Di samping kanan setiap list terdapat tombol **Add Inventori** untuk menambahkan stok produk yang di-order ke data produk (update stok).
   - Setelah tombol Add Inventori ditekan, teks berubah menjadi **"Added"** dan tombol tidak dapat ditekan kembali.
   - Terdapat tombol **filter** berdasarkan status pembayaran dan nama supplier.
   - Saat mengklik salah satu list history order, tampil rincian detail order berisi informasi produk (format sama seperti keranjang order).

6. **Catatan penting:** Tab Order hanya berfungsi untuk membuat list order dan mempermudah penghitungan pengeluaran serta hutang dari supplier secara otomatis. Tab ini **bukan** tempat untuk order barang langsung ke sistem supplier. Pengiriman list order ke supplier dilakukan melalui tombol SS, Print, atau Share.

---

## E. Supplier

1. **Tampilan tab Supplier** sama dengan tab Pelanggan, diisi dengan data supplier.

2. **Tombol Tambah Supplier** — saat ditekan, muncul form isian:
   - ID Supplier
   - Nama Supplier
   - No. HP
   - Alamat
   - Ketentuan Masa Kredit (hari)

   Setelah diisi, data langsung masuk ke daftar supplier.

3. **Tombol Edit** di setiap list supplier — saat ditekan, form tampil sudah terisi dengan data sebelumnya. Setelah diedit, data terupdate otomatis.

4. **Tombol filter** ditambahkan untuk memfilter daftar supplier berdasarkan **status**.

---

## F. Customer

- Tab Customer **dikembalikan** dan **digabung dengan tab Supplier** dalam satu halaman.

- **Tombol Edit** yang terletak di samping informasi "Terakhir Belanja" **dihapus**. Tombol Edit di dalam menu titik tiga vertikal (ujung kanan) tetap dipertahankan.

- Pada bagian kontak, **hanya tampil nomor HP** (kolom email dihapus).

- **Tombol Tambah Pelanggan** — saat ditekan, muncul form isian:
  - ID Customer
  - Nama Customer
  - No. HP
  - Alamat

  Setelah diisi, data masuk ke daftar pelanggan.

- **Tombol Edit** di setiap list pelanggan — saat ditekan, form tampil sudah terisi dengan data yang ada sebelumnya. Setelah diedit, data terupdate otomatis.

---

## G. Laporan

1. **Tombol Pilih Tanggal** diperbaiki agar berfungsi.

2. **Tombol filter berdasarkan waktu** diperbaiki agar berfungsi.

3. **Tab Tren** dihilangkan.

4. **Tab Kategori** digabungkan ke dalam tab Penjualan.

5. **Tab Penjualan** (dipindahkan dari tab terpisah ke dalam Laporan):
   - Menampilkan riwayat transaksi lengkap.
   - Tab Kategori produk digabung di sini.
   - Saat mengklik salah satu transaksi, tampil list produk yang dibeli dengan format sama seperti keranjang belanja di tab Kasir.

6. **Tab Hutang** (dipindahkan dari tab terpisah ke dalam Laporan):
   - Menampilkan list: Kode Order, Jumlah Hutang, Asal Supplier, Tgl Hutang, Tgl Jatuh Tempo, Tgl Bayar Hutang *(kosong jika belum lunas)*, Status (Lunas / Belum Lunas).
   - Saat mengklik salah satu list, tampil rincian produk yang di-order (format sama seperti keranjang order).
   - Terdapat tombol filter berdasarkan nama supplier dan jangka waktu.

7. **Tab Piutang** (dipindahkan dari tab terpisah ke dalam Laporan):
   - Menampilkan list: Kode Transaksi, Nama Customer, Jumlah Piutang, Tgl Piutang, Tgl Jatuh Tempo, Sisa Piutang, Tgl Bayar Piutang *(kosong jika belum lunas)*, Status (Lunas / Belum Lunas).
   - Saat mengklik salah satu list, tampil rincian produk (format sama seperti keranjang belanja).
   - Terdapat tombol filter berdasarkan nama customer dan jangka waktu.

8. **Tab Penghasilan/Pendapatan** (dipindahkan dari tab terpisah ke dalam Laporan):
   - Menampilkan list: Kode Transaksi, Nama Customer, Tgl Pemasukan, Pendapatan Bersih, Pendapatan Kotor, Status (Lunas / Piutang).
   - Sumber data dari penjualan dan dari data piutang.
   - Saat mengklik salah satu list, tampil rincian produk (format sama seperti keranjang belanja).
   - Terdapat ringkasan informasi (total penghasilan kotor, penghasilan bersih, total nominal piutang, dll.) yang dapat difilter berdasarkan jangka waktu.
   - Terdapat tombol filter berdasarkan nama customer, jangka waktu, dan status.

9. **Tab Pengeluaran** (ditambahkan ke dalam Laporan):
   - Menampilkan list: Kode Order, Nama Supplier, Jumlah Pengeluaran, Tgl Pengeluaran, Status (Lunas / Hutang).
   - Sumber data dari order dan dari data hutang.
   - Saat mengklik salah satu list, tampil rincian produk (format sama seperti keranjang order).
   - Terdapat ringkasan informasi (total pengeluaran, total nominal hutang, dll.) yang dapat difilter berdasarkan jangka waktu.
   - Terdapat tombol filter berdasarkan nama supplier, jangka waktu, dan status.