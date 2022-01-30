import puppeteer from "puppeteer";
import ora from "ora";

import Prompt from "prompt-password";
var prompt = new Prompt({
  type: "password",
  message: "Enter your password please",
  name: "password"
});

(async () => {
  const password = await prompt.run();

  const spinner = ora("Opening browser").start();

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: ["--window-size=1920,1080"],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });
  const page = await browser.newPage();

  await page.goto("https://hyperplanning.iut.u-bordeaux.fr/etudiant?identifiant=HDxVSaszjxkCS5RX");

  await page.waitForTimeout(1000);

  // Fill CAS form
  spinner.text = "Fill credentials";
  await page.$eval("#username", el => el.value = "criboulet");
  await page.$eval("#password", (el, pass) => el.value = pass, password);

  spinner.text = "Subit authentication";
  await page.click("input.btn-submit");

  spinner.text = "Wait for redirect on HP";
  // Wait for CAS to redirect to HP
  await page.waitForTimeout(3000);

  spinner.text = "Open promotions page";
  // Go to Promotions page
  await page.evaluate(() => {
    [...document.querySelectorAll("li > div")].find(element => element.textContent === "Promotions").click();
  });

  spinner.text = "Select all promotions";
  // Select promotion
  await page.$eval("input[role=combobox]", el => el.value = "INFO DUT S4");
  await page.click("input[role=combobox]");
  await page.keyboard.press("Enter");

  spinner.text = "Select all groups";
  // Open dropdown with all classes
  await page.waitForTimeout(1000);
  await page.click("div.input-wrapper:last-of-type > div.ocb_cont > div[role=combobox]");

  // Get all groups name in an array
  await page.waitForTimeout(500);

  spinner.text = "Processing all groups ...";
  let groups = await page.$$eval("div.as-li > div", elements => elements.map(item => item.textContent));
  groups = groups.filter(g => g.includes("S") && !g.includes("UT"));

  spinner.text = "Closing groups dropdown and starting ical processing";
  // Close drop down
  await page.click("div.input-wrapper:last-of-type > div.ocb_cont > div[role=combobox]");
  await page.waitForTimeout(500);

  const result = [];
  for (let group of groups) {
    await page.waitForTimeout(500);
    spinner.text = `Focusing group ${group} ...`;

    await page.click("div.input-wrapper:last-of-type > div.ocb_cont > div[role=combobox]");
    await page.waitForTimeout(500);

    const groupsElements = await page.$$("div.as-li > div");

    for (let ge of groupsElements) {
      const currentName = await page.evaluate(element => element.textContent, ge);
      if (currentName === group) {
        spinner.text = `Found group data ${group} ...`;
        ge.click();
        await page.waitForTimeout(500);

        spinner.text = `Opening Ical prompt ${group} ...`;
        // Open ical popup
        await page.click("tbody > tr > td:nth-of-type(2)");
        await page.waitForTimeout(500);

        spinner.text = `Retreiving url ${group} ...`;

        // Get URL
        const element = await page.$("td.PetitEspaceHaut > input[type=text]");
        const url = await page.evaluate(element => element.value, element);
        spinner.text = url;
        result.push({ group, url });
        spinner.text = `url found ${group} !`;

        await page.click("td.Fenetre_boutonfermeture > i");
      }
    }
  }


  await page.waitForTimeout(4000);
  spinner.succeed("Done");

  console.log(result);
  await browser.close();
})();
