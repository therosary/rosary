/**
 * ✝ THE ROSARY — Google Sheets Backend
 * =====================================
 * HOW TO SET THIS UP (one time only):
 *
 * 1. Go to https://sheets.google.com and create a NEW spreadsheet
 * 2. Rename it "The Rosary Backend"
 * 3. Create TWO sheets (tabs at the bottom):
 *    - Rename "Sheet1" to:  Products
 *    - Click the + button, name the new sheet:  Intentions
 *
 * 4. In the "Products" sheet, add these headers in Row 1:
 *    id | name | category | desc | link | imgUrl | featured | addedAt
 *
 * 5. In the "Intentions" sheet, add these headers in Row 1:
 *    id | name | category | intention | anonymous | shareConsent | status | submittedAt
 *
 * 6. In the spreadsheet, click Extensions → Apps Script
 * 7. Delete all existing code. Paste THIS entire file.
 * 8. Click Save (floppy disk icon)
 * 9. Click Deploy → New Deployment
 * 10. Click the gear icon next to "Type" → select "Web App"
 * 11. Set "Execute as" → Me
 * 12. Set "Who has access" → Anyone
 * 13. Click Deploy → Authorize → Allow
 * 14. COPY the Web App URL shown — it looks like:
 *     https://script.google.com/macros/s/XXXXXXX/exec
 * 15. Paste that URL into your shop.html and prayer-request.html
 *     where it says: const BACKEND_URL = 'PASTE_YOUR_URL_HERE';
 *
 * That's it! Your website will now read/write to Google Sheets.
 */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const action = e.parameter.action;
  const sheet = e.parameter.sheet || 'Products';

  try {
    if (action === 'getProducts') {
      return respond(getRows('Products'));
    }
    if (action === 'getIntentions') {
      return respond(getRows('Intentions'));
    }
    if (action === 'getPublicIntentions') {
      const all = getRows('Intentions');
      const pub = all.filter(r => r.status === 'approved' && r.shareConsent === 'true');
      return respond(pub);
    }
    return respond({ error: 'Unknown action' });
  } catch(err) {
    return respond({ error: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'addIntention') {
      return respond(addRow('Intentions', data.payload));
    }
    if (action === 'addProduct') {
      return respond(addRow('Products', data.payload));
    }
    if (action === 'updateIntentionStatus') {
      return respond(updateCell('Intentions', data.id, 'status', data.status));
    }
    if (action === 'deleteIntention') {
      return respond(deleteRow('Intentions', data.id));
    }
    if (action === 'updateProduct') {
      return respond(updateRow('Products', data.id, data.payload));
    }
    if (action === 'deleteProduct') {
      return respond(deleteRow('Products', data.id));
    }
    return respond({ error: 'Unknown action' });
  } catch(err) {
    return respond({ error: err.message });
  }
}

// ── Helper: get all rows as array of objects ──
function getRows(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = String(row[i] || ''));
    return obj;
  });
}

// ── Helper: add a new row ──
function addRow(sheetName, payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(h => payload[h] !== undefined ? payload[h] : '');
  sheet.appendRow(row);
  return { success: true };
}

// ── Helper: update a single cell by id ──
function updateCell(sheetName, id, field, value) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  const fieldCol = headers.indexOf(field);
  if (idCol < 0 || fieldCol < 0) return { error: 'Column not found' };
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      sheet.getRange(i + 1, fieldCol + 1).setValue(value);
      return { success: true };
    }
  }
  return { error: 'Row not found' };
}

// ── Helper: update all fields of a row by id ──
function updateRow(sheetName, id, payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      headers.forEach((h, j) => {
        if (payload[h] !== undefined) {
          sheet.getRange(i + 1, j + 1).setValue(payload[h]);
        }
      });
      return { success: true };
    }
  }
  return { error: 'Row not found' };
}

// ── Helper: delete a row by id ──
function deleteRow(sheetName, id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { error: 'Row not found' };
}

// ── Helper: return JSON response with CORS headers ──
function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
