/* eslint-disable eqeqeq */
import puppeteer from "puppeteer";
import ora from "ora";
import fs from "fs";
import Prompt from "prompt-password";

// Si le navigateur doit être visible ou non (Headless = tourne en fond)
const HEADLESS = true;

// Identifiant de promo  à récupérer  sur hyperplanning pour ce semestre
// L'odre est important
const PROMOTIONS = ["INFO_BUT_S1", "INFO_BUT_S3", "INFO_BUT_S5"];

(async () => {
  const result = [];

  //////////////// DEMANDE IDENTIFIANTS CAS ////////////////
  const idnum = await new Prompt({
    message: "Enter your IDNUM please",
    name: "idnum",
    type: "text",
  }).run();
  const password = await new Prompt({
    type: "password",
    message: "Enter your password please",
    name: "password",
  }).run();
  /////////////////////////////////////////////////////////

  //////////////// OUVERTURE CHROMIUM //// ////////////////
  let spinner = ora("Opening browser").start();

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    ignoreHTTPSErrors: true,
    args: ["--window-size=1920,1080", "--incognito"],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  /////////////////////////////////////////////////////////

  //////////////////// CONNEXION CAS //////////////////////
  await page.goto(
    "https://hyperplanning.iut.u-bordeaux.fr/etudiant?identifiant=HDxVSaszjxkCS5RX"
  );

  await page.waitForTimeout(1000);

  //#region temp
  // Fill CAS form
  spinner.succeed();
  spinner = ora("Fill credentials").start();
  await page.$eval("#username", (el, id) => (el.value = id), idnum);
  await page.$eval("#password", (el, pass) => (el.value = pass), password);
  //#endregion

  spinner.succeed();
  spinner = ora("Submit authentication").start();
  await page.click("input.btn-submit");

  spinner.succeed();
  spinner = ora("Wait for redirect on HP").start();
  // Wait for CAS to redirect to HP
  await page.waitForTimeout(3000);
  /////////////////////////////////////////////////////////

  //////////// OUVERTURE PAGE PLANNINGS ///////////////////
  spinner.succeed();
  spinner = ora("Open promotions page").start();
  // Go to Promotions page
  await page.evaluate(() => {
    [...document.querySelectorAll("li > div")]
      .find((element) => element.textContent === "Promotions")
      .click();
  });

  // Select all promotions
  for (const promotion of PROMOTIONS) {
    spinner.succeed();
    spinner = ora(`Select promotion : ${promotion}`).start();
    await page.$eval(
      "input[role=combobox]",
      (el, prom) => (el.value = prom),
      promotion
    );
    await page.click("input[role=combobox]");
    await page.keyboard.press("Enter");

    // Open dropdown with all classes
    await page.waitForTimeout(1000);
    await page.click(
      "div.input-wrapper:last-of-type > div.ocb_cont > div[role=combobox]"
    );

    // Get all groups name in an array
    await page.waitForTimeout(500);
    /////////////////////////////////////////////////////////

    //////////// RECUP ICAL GROUPE PAR GROUPE ///////////////
    spinner.succeed();
    spinner = ora("Processing promotions groups").start();
    let groups = await page.$$eval("div.as-li > div", (elements) =>
      elements.map((item) => item.textContent)
    );
    groups = groups.filter((g) => g.includes("S") || g.includes("UT"));
    spinner.succeed();
    spinner = ora(
      "Closing groups dropdown and starting ical processing"
    ).start();
    // Close drop down
    await page.click(
      "div.input-wrapper:last-of-type > div.ocb_cont > div[role=combobox]"
    );
    await page.waitForTimeout(500);

    for (let group of groups) {
      await page.waitForTimeout(1000);
      spinner.text = `Focusing group ${group} ...`;

      await page.click(
        "div.input-wrapper:last-of-type > div.ocb_cont > div[role=combobox]"
      );
      await page.waitForTimeout(500);

      const groupsElements = await page.$$("div.as-li > div");

      for (let ge of groupsElements) {
        const currentName = await page.evaluate(
          (element) => element.textContent,
          ge
        );
        if (currentName === group) {
          spinner.text = `Fetching group ${group}`;
          ge.click();
          await page.waitForTimeout(500);

          // Open ical popup
          await page.click("tbody > tr > td:nth-of-type(2)");
          await page.waitForTimeout(500);

          // Get URL (Not stable)
          const element = await page.$(
            "div.ObjetFenetre_ICal_racine div.Fenetre_Espace section.m-top-l article.m-top > input"
          );
          let url = await page.evaluate((element) => element.value, element);
          url = url.split("icalsecurise=")[1].split("&param")[0];
          result.push({
            group,
            ical: url,
            type: group.includes("UT")
              ? "promo"
              : group.includes("'") || group.includes('"')
              ? "group"
              : "class",
          });

          spinner.text = `${group} ical Id is : ${url}`;
          spinner.succeed();
          spinner = new ora("Done").start();
          await page.click("div.cta-conteneur > i");
        }
      }
    }
  }
  /////////////////////////////////////////////////////////

  /////////////////  FERMETURE CHROME  ////////////////////
  spinner.text = "Scrapping done (closing)";
  spinner.succeed();

  await page.waitForTimeout(4000);
  await browser.close();

  console.log(result);
  /////////////////////////////////////////////////////////

  /////////////// TRAITEMENT RESULTAT    //////////////////
  const promos = result.filter((i) => i.type === "promo");
  const classes = result.filter((i) => i.type === "class");
  const groups = result.filter((i) => i.type === "group");

  const icals = {};

  promos.forEach((promo) => {
    if (typeof promo == undefined) {
      return;
    }
    const promoKey = promo.group.replace(" ", "_").toLowerCase();

    icals[promoKey] = {
      ical: promo.ical,
      classes: [],
    };
    console.log(`Processing promo ${promo.group}`);
    // eslint-disable-next-line quotes
    const promoClasses = classes.filter((c) =>
      c.group.includes(promo.group.slice(-2))
    );

    promoClasses.forEach((_class) => {
      console.log(`Processing class ${_class.group}`);

      const classGroups = groups.filter((g) => g.group.includes(_class.group));

      if (
        !(
          classGroups[0] == undefined ||
          classGroups[1] == undefined ||
          _class.ical == undefined
        )
      ) {
        icals[promoKey].classes.push({
          className: _class.group.toLowerCase(),
          classIcal: _class.ical,
          groups: {
            prime: classGroups[0].ical,
            seconde: classGroups[1].ical,
          },
        });
      }

      if( _class.group.indexOf("FI") != -1 || _class.group.indexOf("ALT") != -1) {
        icals[promoKey].classes.push({
          className: _class.group.toLowerCase(),
          classIcal: _class.ical,
        });
      }
    });
  });
  /////////////////////////////////////////////////////////

  /////////////// EXPORTATION EN FICHIER //////////////////
  console.log("File updated in src/icals.json");
  fs.writeFileSync("../icals.json", JSON.stringify(icals, null, 4));
  /////////////////////////////////////////////////////////
})();
