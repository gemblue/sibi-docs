/* ═══════════════════════════════════════════════════════
   Field Glossary — Definisi setiap field/parameter
   ═══════════════════════════════════════════════════════ */

const FIELD_GLOSSARY = [
  {
    group: "Umum / Katalog",
    fields: [
      { name: "id",           type: "number",  desc: "ID unik buku di database internal." },
      { name: "title",        type: "string",  desc: "Judul lengkap buku." },
      { name: "slug",         type: "string",  desc: "Slug URL-friendly dari judul buku. Digunakan untuk endpoint <code>getDetails</code>." },
      { name: "image",        type: "string",  desc: "URL gambar sampul (cover) buku." },
      { name: "attachment",   type: "string",  desc: "URL file lampiran buku (PDF/ePUB/audio)." },
      { name: "description",  type: "string",  desc: "Deskripsi atau sinopsis buku." },
    ]
  },
  {
    group: "Klasifikasi Buku",
    fields: [
      { name: "class",        type: "string",  desc: "Kelas dari buku (nilai: 1–12)." },
      { name: "level",        type: "string",  desc: "Jenjang pendidikan: <code>SD</code>, <code>SMP</code>, <code>SMA</code>, <code>SDLB</code>, dsb." },
      { name: "subject",      type: "string",  desc: "Mata pelajaran, misal: <code>Matematika</code>, <code>IPA</code>, <code>Bahasa Indonesia</code>." },
      { name: "category",     type: "string",  desc: "Kategori buku: <code>Buku Teks</code>, <code>Buku Non Teks</code>, <code>Buku Penggerak</code>." },
      { name: "book_type",    type: "string",  desc: "Tipe buku, misal: <code>textbook</code>, <code>non-textbook</code>." },
      { name: "type",         type: "string",  desc: "Format/jenis konten: <code>pdf</code>, <code>audio</code>, <code>interactive</code>." },
      { name: "format",       type: "string",  desc: "Format fisik/digital buku." },
      { name: "edition",      type: "string",  desc: "Edisi cetakan buku (misal: Cetakan ke-1)." },
      { name: "version",      type: "string",  desc: "Versi revisi buku." },
      { name: "unit",         type: "string",  desc: "Satuan atau unit terkait buku." },
    ]
  },
  {
    group: "Kontributor / Pembuat",
    fields: [
      { name: "writer",           type: "string", desc: "Nama penulis buku." },
      { name: "reviewer",         type: "string", desc: "Nama penelaah / reviewer buku." },
      { name: "translator",       type: "string", desc: "Nama penerjemah buku." },
      { name: "adapter",          type: "string", desc: "Nama pengadaptasi isi buku." },
      { name: "designer",         type: "string", desc: "Nama desainer tata letak buku." },
      { name: "cover_designer",   type: "string", desc: "Nama desainer sampul (cover) buku." },
      { name: "ilustrator",       type: "string", desc: "Nama ilustrator / pembuat gambar." },
      { name: "editor",           type: "string", desc: "Nama editor / penyunting naskah." },
    ]
  },
  {
    group: "Penerbitan",
    fields: [
      { name: "publisher",        type: "string", desc: "Nama penerbit buku." },
      { name: "published_year",   type: "number", desc: "Tahun terbit buku (misal: <code>2024</code>)." },
      { name: "isbn",             type: "string", desc: "Nomor ISBN (International Standard Book Number)." },
      { name: "language",         type: "string", desc: "Bahasa yang digunakan buku, misal: <code>Indonesia</code>, <code>English</code>." },
      { name: "curriculum",       type: "string", desc: "Kurikulum acuan, misal: <code>Kurikulum Merdeka</code>, <code>K13</code>." },
      { name: "collation",        type: "string", desc: "Kolasi: jumlah halaman, ilustrasi, ukuran buku." },
      { name: "context",          type: "string", desc: "Konteks penggunaan buku (misal: nasional, daerah)." },
    ]
  },
  {
    group: "Status & Metadata",
    fields: [
      { name: "status",           type: "string", desc: "Status buku: <code>published</code>, <code>draft</code>, dsb." },
      { name: "created_at",       type: "datetime", desc: "Timestamp saat data buku dibuat." },
      { name: "updated_at",       type: "datetime", desc: "Timestamp saat data buku terakhir diperbarui." },
      { name: "tag",              type: "string", desc: "Tag/label khusus buku (misal: <code>STEM</code>, <code>transisi</code>)." },
    ]
  },
  {
    group: "HET — Harga Eceran Tertinggi",
    fields: [
      { name: "het_id",       type: "string", desc: "ID data HET di database. Bernilai <code>null</code> bila buku belum memiliki data HET. Tersedia pada endpoint <strong>Buku Kurikulum 2013</strong>, <strong>Buku Kurikulum Merdeka</strong>, dan <strong>Detail Buku</strong>." },
      { name: "het_title",    type: "string", desc: "Judul buku sebagaimana tercatat pada data HET; bisa berbeda dari <code>title</code>. Bernilai <code>null</code> bila belum ada. Tersedia pada <strong>Buku Kurikulum 2013</strong> dan <strong>Buku Kurikulum Merdeka</strong>." },
      { name: "het",          type: "array",  desc: "Daftar harga HET per zona distribusi. Berisi objek <code>{ zone, price }</code>. Bernilai <code>[]</code> bila buku belum memiliki data HET." },
      { name: "zone",         type: "string", desc: "Kode zona distribusi HET: <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>5a</code>, <code>5b</code>." },
      { name: "price",        type: "number", desc: "Harga eceran tertinggi untuk zona tersebut, dalam Rupiah (contoh: <code>16100</code>)." },
    ]
  },
  {
    group: "Parameter Khusus Filter",
    fields: [
      { name: "type_pdf",         type: "boolean", desc: "Filter: hanya tampilkan buku tipe <strong>PDF</strong>. Beri nilai <code>true</code>." },
      { name: "type_audio",       type: "boolean", desc: "Filter: hanya tampilkan buku tipe <strong>Audio</strong>." },
      { name: "type_interactive", type: "boolean", desc: "Filter: hanya tampilkan buku tipe <strong>Interaktif</strong>." },
      { name: "level_sd",         type: "boolean", desc: "Filter: hanya tampilkan buku jenjang <strong>SD</strong>." },
      { name: "level_smp",        type: "boolean", desc: "Filter: hanya tampilkan buku jenjang <strong>SMP</strong>." },
      { name: "level_sma",        type: "boolean", desc: "Filter: hanya tampilkan buku jenjang <strong>SMA</strong>." },
      { name: "level_sdlb",       type: "boolean", desc: "Filter: hanya tampilkan buku jenjang <strong>SDLB</strong> (Sekolah Dasar Luar Biasa)." },
      { name: "class_1",          type: "boolean", desc: "Filter: buku untuk kelas 1." },
      { name: "class_2",          type: "boolean", desc: "Filter: buku untuk kelas 2." },
      { name: "class_3",          type: "boolean", desc: "Filter: buku untuk kelas 3." },
      { name: "class_4",          type: "boolean", desc: "Filter: buku untuk kelas 4." },
      { name: "class_5",          type: "boolean", desc: "Filter: buku untuk kelas 5." },
      { name: "class_6",          type: "boolean", desc: "Filter: buku untuk kelas 6." },
      { name: "class_7",          type: "boolean", desc: "Filter: buku untuk kelas 7." },
      { name: "class_8",          type: "boolean", desc: "Filter: buku untuk kelas 8." },
      { name: "class_9",          type: "boolean", desc: "Filter: buku untuk kelas 9." },
      { name: "class_10",         type: "boolean", desc: "Filter: buku untuk kelas 10." },
      { name: "class_11",         type: "boolean", desc: "Filter: buku untuk kelas 11." },
      { name: "class_12",         type: "boolean", desc: "Filter: buku untuk kelas 12." },
      { name: "subject_ipa",              type: "boolean", desc: "Filter: mata pelajaran <strong>IPA</strong> (Ilmu Pengetahuan Alam)." },
      { name: "subject_ips",              type: "boolean", desc: "Filter: mata pelajaran <strong>IPS</strong> (Ilmu Pengetahuan Sosial)." },
      { name: "subject_ipas",             type: "boolean", desc: "Filter: mata pelajaran <strong>IPAS</strong> (IPA & IPS gabungan)." },
      { name: "subject_indonesia",        type: "boolean", desc: "Filter: mata pelajaran <strong>Bahasa Indonesia</strong>." },
      { name: "subject_inggris",          type: "boolean", desc: "Filter: mata pelajaran <strong>Bahasa Inggris</strong>." },
      { name: "subject_matematika",       type: "boolean", desc: "Filter: mata pelajaran <strong>Matematika</strong>." },
      { name: "subject_informatika",      type: "boolean", desc: "Filter: mata pelajaran <strong>Informatika</strong>." },
      { name: "subject_pjok",             type: "boolean", desc: "Filter: mata pelajaran <strong>PJOK</strong> (Pendidikan Jasmani, Olahraga, dan Kesehatan)." },
      { name: "subject_ppkn",             type: "boolean", desc: "Filter: mata pelajaran <strong>PPKn</strong> (Pendidikan Pancasila dan Kewarganegaraan)." },
      { name: "subject_agama",            type: "boolean", desc: "Filter: mata pelajaran <strong>Pendidikan Agama</strong>." },
      { name: "subject_sejarah",          type: "boolean", desc: "Filter: mata pelajaran <strong>Sejarah</strong>." },
      { name: "subject_seni_rupa",        type: "boolean", desc: "Filter: mata pelajaran <strong>Seni Rupa</strong>." },
      { name: "subject_seni_tari",        type: "boolean", desc: "Filter: mata pelajaran <strong>Seni Tari</strong>." },
      { name: "subject_seni_musik",       type: "boolean", desc: "Filter: mata pelajaran <strong>Seni Musik</strong>." },
      { name: "subject_seni_teater",      type: "boolean", desc: "Filter: mata pelajaran <strong>Seni Teater</strong>." },
    ]
  },
];
