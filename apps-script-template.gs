/**
 * RPP Pramuka Kaffah — Google Apps Script Backend
 *
 * Cara deploy:
 * 1. Buka https://sheets.new — buat Google Sheet baru
 * 2. Rename Sheet1 menjadi "RPP"
 * 3. Buat header row (baris 1):
 *    tanggal | waktu | pembina | golongan | durasi | materi | tujuan | kegiatan | alat | evaluasi | linkLKS | _id | userId | createdAt
 * 4. Extensions > Apps Script — paste kode ini
 * 5. Ganti SHEET_ID di bawah dengan ID sheet dari URL (panjang acak antara /d/ dan /edit)
 * 6. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy Web App URL → tempel ke index.html line 292 (ganti 'YOUR_APPS_SCRIPT_WEB_APP_URL')
 * 8. Buka index.html langsung di browser
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Ganti dengan ID Google Sheet Anda
const SHEET_NAME = 'RPP';

function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet "' + SHEET_NAME + '" tidak ditemukan. Buat sheet dengan nama tersebut.');
  return sheet;
}

function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return jsonResponse([]);

    const headers = data[0];
    const result = data.slice(1).map(function(row) {
      var obj = {};
      headers.forEach(function(h, i) { obj[h] = row[i]; });
      return obj;
    });

    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function doPost(e) {
  try {
    const sheet = getSheet();
    var body = JSON.parse(e.postData.contents);

    // Hapus data berdasarkan _id (UUID dari frontend)
    if (body._action === 'delete') {
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var idCol = headers.indexOf('_id') + 1;
      if (idCol === 0) throw new Error('Kolom _id tidak ditemukan. Tambahkan header _id di sheet.');
      for (var i = data.length - 1; i >= 1; i--) {
        if (String(data[i][idCol - 1]) === String(body._id)) {
          sheet.deleteRow(i + 1);
          return jsonResponse({ success: true, deleted: true });
        }
      }
      return jsonResponse({ error: 'Data tidak ditemukan' }, 404);
    }

    // Tambah data baru
    sheet.appendRow([
      body.tanggal || '',
      body.waktu || '',
      body.pembina || '',
      body.golongan || '',
      body.durasi || '',
      body.materi || '',
      body.tujuan || '',
      body.kegiatan || '',
      body.alat || '',
      body.evaluasi || '',
      body.linkLKS || '',
      body._id || '',
      body.userId || '',
      new Date()
    ]);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function jsonResponse(data, statusCode) {
  statusCode = statusCode || 200;
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
