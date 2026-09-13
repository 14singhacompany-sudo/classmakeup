/**
 * ClassMakeup Early Access lead receiver.
 * Set Script Properties: SPREADSHEET_ID and WEBHOOK_SECRET.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    var props = PropertiesService.getScriptProperties();
    if (!data.secret || data.secret !== props.getProperty("WEBHOOK_SECRET")) {
      return json_({ ok: false, error: "unauthorized" });
    }
    var sheet = SpreadsheetApp.openById(props.getProperty("SPREADSHEET_ID")).getSheetByName("Leads");
    if (!sheet) throw new Error("Leads sheet not found");
    sheet.appendRow([
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      clean_(data.institute), clean_(data.type), clean_(data.size), clean_(data.requests),
      clean_(data.contact), clean_(data.interest), data.consent === true,
      clean_(data.utmSource), clean_(data.utmMedium), clean_(data.utmCampaign),
      clean_(data.utmContent), clean_(data.landingUrl), "ใหม่", ""
    ]);
    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: "write_failed" });
  }
}

function clean_(value) {
  var text = String(value || "").trim().slice(0, 500);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
