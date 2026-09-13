import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL("../outputs/", import.meta.url).pathname;
const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Leads");
sheet.showGridLines = false;

const headers = [[
  "วันที่ส่ง", "ชื่อสถาบัน", "ประเภท", "ขนาดสถาบัน", "คำขอชดเชย/เดือน",
  "ช่องทางติดต่อ", "ความสนใจราคา", "Consent", "UTM Source", "UTM Medium",
  "UTM Campaign", "UTM Content", "Landing URL", "สถานะติดตาม", "หมายเหตุ"
]];
const seed = [[
  new Date("2026-09-13T09:00:00+07:00"), "ตัวอย่าง (ลบได้)", "ดนตรี", "51–150 คน",
  "10–30 ครั้ง", "example-line", "สนใจทดลองใช้", true, "facebook", "paid_social",
  "test_campaign", "creative_a", "https://example.com", "ใหม่", "แถวตัวอย่างสำหรับตรวจรูปแบบ"
]];

sheet.getRange("A1:O1").values = headers;
sheet.getRange("A2:O2").values = seed;
sheet.freezePanes.freezeRows(1);
sheet.getRange("A1:O2").format.font = { name: "Arial", size: 10, color: "#202124" };
sheet.getRange("A1:O1").format.fill = "#E8EAED";
sheet.getRange("A1:O1").format.font = { name: "Arial", size: 10, bold: true, color: "#202124" };
sheet.getRange("A1:O1").format.horizontalAlignment = "center";
sheet.getRange("A1:O2").format.verticalAlignment = "center";
sheet.getRange("A1:O2").format.borders = { preset: "insideHorizontal", style: "thin", color: "#DADCE0" };
sheet.getRange("A1:O2").format.rowHeightPx = 28;
sheet.getRange("A2:A5000").setNumberFormat("yyyy-mm-dd hh:mm:ss");
sheet.getRange("A:A").format.columnWidthPx = 150;
sheet.getRange("B:B").format.columnWidthPx = 180;
sheet.getRange("C:C").format.columnWidthPx = 100;
sheet.getRange("D:E").format.columnWidthPx = 145;
sheet.getRange("F:F").format.columnWidthPx = 160;
sheet.getRange("G:G").format.columnWidthPx = 145;
sheet.getRange("H:H").format.columnWidthPx = 80;
sheet.getRange("I:L").format.columnWidthPx = 125;
sheet.getRange("M:M").format.columnWidthPx = 220;
sheet.getRange("N:N").format.columnWidthPx = 110;
sheet.getRange("O:O").format.columnWidthPx = 220;
sheet.getRange("N2:N5000").dataValidation = { rule: { type: "list", values: ["ใหม่", "ติดต่อแล้ว", "นัดเดโม", "ทดลองใช้", "ไม่สนใจ"] } };

workbook.recalculate();
const check = await workbook.inspect({ kind: "table", range: "Leads!A1:O2", include: "values,formulas", tableMaxRows: 5, tableMaxCols: 15 });
console.log(check.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!", options: { useRegex: true, maxResults: 50 }, summary: "formula error scan" });
console.log(errors.ndjson);
await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({ sheetName: "Leads", range: "A1:O2", scale: 1 });
await fs.writeFile(`${outputDir}/classmakeup-leads-preview.png`, new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/classmakeup-leads.xlsx`);
