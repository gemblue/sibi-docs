/* ═══════════════════════════════════════════════════════
   Endpoints Data — Semua endpoint SIBI Catalogue API
   ═══════════════════════════════════════════════════════ */

const ENDPOINTS = [
  /* ─────────── BUKU TERBARU ─────────── */
  {
    id: "getLatestBooks",
    title: "Buku Terbaru",
    path: "/api/catalogue",
    method: "GET",
    category: "Katalog",
    desc: "Mendapatkan daftar buku terbaru yang baru ditambahkan ke katalog. <strong>Tidak memerlukan parameter wajib</strong>.",
    params: [
      { name: "filter[catalogue][title]",          type: "string",  required: false, desc: "Filter berdasarkan judul." },
      { name: "filter[catalogue][writer]",         type: "string",  required: false, desc: "Filter berdasarkan penulis." },
      { name: "filter[catalogue][published_year]", type: "string",  required: false, desc: "Filter berdasarkan tahun terbit." },
      { name: "filter[catalogue][isbn]",           type: "string",  required: false, desc: "Filter berdasarkan ISBN." },
    ],
    notes: "Secara default menampilkan 10 buku terbaru.",
    example: "/api/catalogue?filter[catalogue][title]=Informatika",
  },

  /* ─────────── GET BOOKS ─────────── */
  {
    id: "getBooks",
    title: "Semua Buku (Umum)",
    path: "/api/catalogue/getBooks",
    method: "GET",
    category: "Katalog",
    desc: "Mendapatkan daftar semua buku di katalog dengan dukungan <strong>paginasi</strong> dan <strong>semua filter</strong>.",
    params: [
      { name: "limit",    type: "number", required: false, desc: "Jumlah data per halaman." },
      { name: "offset",   type: "number", required: false, desc: "Nomor halaman (dimulai dari 0)." },
    ],
    notes: "Mendukung semua parameter filter umum (title, slug, subject, level, class, dll). Lihat <a href=\"#glossary\" data-nav=\"glossary\">Glosarium Field</a> untuk daftar lengkap.",
    example: "/api/catalogue/getBooks?limit=5&offset=2",
  },

  /* ─────────── BUKU TEKS ─────────── */
  {
    id: "getTextBooks",
    title: "Buku Kurikulum 2013",
    path: "/api/catalogue/getTextBooks",
    method: "GET",
    category: "Katalog",
    desc: "Mendapatkan daftar buku dengan kategori <strong>Buku Kurikulum 2013 (K-13)</strong>. Mendukung filter lengkap serta <code>sort</code> dan <code>order_by</code>.",
    params: [
      { name: "limit",    type: "number",  required: false, desc: "Jumlah data per halaman." },
      { name: "offset",   type: "number",  required: false, desc: "Nomor halaman (dimulai dari 0)." },
      { name: "sort",     type: "string",  required: false, desc: "Urutan: <code>asc</code> (naik) atau <code>desc</code> (turun)." },
      { name: "order_by", type: "string",  required: false, desc: "Kolom pengurutan, misal: <code>updated_at</code>, <code>title</code>." },
    ],
    notes: "Filter boolean seperti <code>type_pdf</code>, <code>level_smp</code>, <code>class_7</code>, <code>subject_ipa</code> juga didukung. Beri nilai <code>true</code> untuk mengaktifkan.",
    example: "/api/catalogue/getTextBooks?limit=5&offset=0&title=matematika&type_pdf=true",
  },

  /* ─────────── BUKU PENGGERAK ─────────── */
  {
    id: "getPenggerakTextBooks",
    title: "Buku Kurikulum Merdeka",
    path: "/api/catalogue/getPenggerakTextBooks",
    method: "GET",
    category: "Katalog",
    desc: "Mendapatkan daftar buku dengan kategori <strong>Buku Kurikulum Merdeka</strong> — buku dari program Sekolah Penggerak Kemendikbud. Fitur filter sama dengan Buku K-13.",
    params: [
      { name: "limit",    type: "number",  required: false, desc: "Jumlah data per halaman." },
      { name: "offset",   type: "number",  required: false, desc: "Nomor halaman (dimulai dari 0)." },
      { name: "sort",     type: "string",  required: false, desc: "Urutan: <code>asc</code> atau <code>desc</code>." },
      { name: "order_by", type: "string",  required: false, desc: "Kolom pengurutan." },
    ],
    notes: "Anda bisa mengombinasikan beberapa filter boolean sekaligus. Contoh: <code>type_pdf=true&level_smp=true&class_8=true</code>.",
    example: "/api/catalogue/getPenggerakTextBooks?limit=5&offset=0&type_pdf=true&level_smp=true",
  },

  /* ─────────── BUKU NON TEKS ─────────── */
  {
    id: "getNonTextBooks",
    title: "Buku Non Teks",
    path: "/api/catalogue/getNonTextBooks",
    method: "GET",
    category: "Katalog",
    desc: "Mendapatkan daftar buku dengan kategori <strong>Buku Non Teks</strong> (buku pengayaan, referensi, bacaan umum). Mendukung filter <code>tag</code>.",
    params: [
      { name: "limit",    type: "number", required: false, desc: "Jumlah data per halaman." },
      { name: "offset",   type: "number", required: false, desc: "Nomor halaman (dimulai dari 0)." },
      { name: "tag",      type: "string", required: false, desc: "Filter berdasarkan tag/label khusus, misal: <code>transisi</code>, <code>STEM</code>." },
    ],
    notes: "Mendukung semua parameter filter umum (title, subject, level, dll).",
    example: "/api/catalogue/getNonTextBooks?limit=20&tag=transisi",
  },

  /* ─────────── DETAIL BUKU ─────────── */
  {
    id: "getDetails",
    title: "Detail Buku",
    path: "/api/catalogue/getDetails",
    method: "GET",
    category: "Katalog",
    desc: "Mendapatkan <strong>detail lengkap</strong> satu buku berdasarkan slug-nya. Mengembalikan semua field termasuk deskripsi, kontributor, ISBN, dll.",
    params: [
      { name: "slug", type: "string", required: true, desc: "Slug unik buku (didapat dari daftar buku di endpoint lain).", default: "panduan-guru-program-pemanfaatan-waktu-luang-bagi-peserta-didik-dengan-hambatan-intelektual-jenjang-sdlb-smplb-dan-smalb" },
    ],
    notes: "Slug adalah versi URL-friendly dari judul buku, biasanya dalam format huruf kecil dengan tanda hubung.",
    example: "/api/catalogue/getDetails?slug=buku-audio-ilmu-pengetahuan-alam-smp-kelas-8",
  },

  /* ─────────── SEARCH ─────────── */
  {
    id: "search",
    title: "Pencarian",
    path: "/api/catalogue/search",
    method: "GET",
    category: "Pencarian & Filter",
    desc: "Endpoint pencarian umum. (Parameter belum didokumentasikan di Postman collection — endpoint ini tersedia untuk penggunaan umum.)",
    params: [],
    notes: "Gunakan endpoint <code>getBooksByQuery</code> untuk pencarian berbasis judul yang terdokumentasi dengan baik.",
    example: "/api/catalogue/search",
  },

  /* ─────────── BOOKS BY TAG ─────────── */
  {
    id: "getBooksByTag",
    title: "Buku Berdasarkan Tag",
    path: "/api/catalogue/getBooksByTag",
    method: "GET",
    category: "Pencarian & Filter",
    desc: "Mendapatkan daftar buku yang memiliki <strong>tag/label</strong> tertentu. Cocok untuk menampilkan koleksi tematik seperti <em>STEM</em> atau <em>transisi</em>.",
    params: [
      { name: "tag",   type: "string", required: true,  desc: "Nama tag yang dicari, misal: <code>STEM</code>, <code>transisi</code>." },
      { name: "page",  type: "number", required: false, desc: "Nomor halaman (dimulai dari 1)." },
      { name: "limit", type: "number", required: false, desc: "Jumlah data per halaman." },
    ],
    notes: "Perhatikan: untuk endpoint ini, parameter halaman menggunakan <code>page</code> (dimulai dari 1), bukan <code>offset</code>.",
    example: "/api/catalogue/getBooksByTag?tag=STEM&page=2&limit=9",
  },

  /* ─────────── BOOKS BY QUERY ─────────── */
  {
    id: "getBooksByQuery",
    title: "Buku Berdasarkan Query",
    path: "/api/catalogue/getBooksByQuery",
    method: "GET",
    category: "Pencarian & Filter",
    desc: "Mencari buku berdasarkan <strong>query teks</strong> pada judul. Berguna untuk fitur <em>search bar</em> di aplikasi front-end.",
    params: [
      { name: "query",  type: "string", required: true,  desc: "Kata kunci pencarian pada judul buku." },
      { name: "limit",  type: "number", required: false, desc: "Jumlah data per halaman." },
      { name: "offset", type: "number", required: false, desc: "Nomor halaman (dimulai dari 0)." },
    ],
    notes: "Pencarian dilakukan pada field <code>title</code>. Bersifat <em>partial match</em> (tidak perlu kata persis).",
    example: "/api/catalogue/getBooksByQuery?query=interaktif&limit=5&offset=0",
  },

  /* ─────────── POPULER ─────────── */
  {
    id: "getPopularCatalogue",
    title: "Buku Terpopuler",
    path: "/api/statistic/getPopularCatalogue",
    method: "GET",
    category: "Statistik",
    desc: "Mendapatkan daftar buku yang <strong>paling populer</strong> berdasarkan statistik akses/baca. Berguna untuk menampilkan <em>trending books</em>.",
    params: [
      { name: "qty", type: "number", required: false, desc: "Jumlah buku terpopuler yang ingin ditampilkan. Default: 10." },
    ],
    notes: "Endpoint ini berada di bawah prefix <code>/api/statistic/</code>, bukan <code>/api/catalogue/</code>.",
    example: "/api/statistic/getPopularCatalogue?qty=10",
  },
];
