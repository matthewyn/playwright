import test, { expect } from "@playwright/test";
import ExcelJS from "exceljs";

test("basic test 1", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#downloadButton").click();
  const download = await downloadPromise;
  const filePath = "/Users/kennethmatthewyonathan/Downloads/download.xlsx";
  await download.saveAs(filePath);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    "/Users/kennethmatthewyonathan/Downloads/download.xlsx",
  );
  const worksheet = workbook.getWorksheet("Sheet1");
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value == "Mango") {
        worksheet.getCell(rowNumber, colNumber + 2).value = 350;
      }
    });
  });
  await workbook.xlsx.writeFile(
    "/Users/kennethmatthewyonathan/Downloads/download.xlsx",
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("/Users/kennethmatthewyonathan/Downloads/download.xlsx");
  const textLocator = page.getByText("Mango");
  const tableRow = page.getByRole("row").filter({ has: textLocator });
  await expect(tableRow.locator("#cell-4-undefined")).toHaveText("350");
});
