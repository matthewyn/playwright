import { Given, Then, When } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import ExcelJS from "exceljs";

Given("File is already downloaded", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );
  const downloadPromise = this.page.waitForEvent("download");
  await this.page.locator("#downloadButton").click();
  const download = await downloadPromise;
  const filePath = "/Users/kennethmatthewyonathan/Downloads/download.xlsx";
  await download.saveAs(filePath);
});

When("File is already uploaded", async function () {
  // Write code here that turns the phrase above into concrete actions
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
  await this.page.locator("#fileinput").click();
  await this.page
    .locator("#fileinput")
    .setInputFiles("/Users/kennethmatthewyonathan/Downloads/download.xlsx");
});

Then("Price of Mango should be {int}", async function (int) {
  // Write code here that turns the phrase above into concrete actions
  const textLocator = this.page.getByText("Mango");
  const tableRow = this.page.getByRole("row").filter({ has: textLocator });
  await expect(tableRow.locator("#cell-4-undefined")).toHaveText(
    int.toString(),
  );
});
