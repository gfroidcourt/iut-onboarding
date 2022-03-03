const puppeteer = require('puppeteer');
const prompts = require('prompts');

async function askForCredidentials() {
    const { login } = await prompts({
        type: 'text',
        message: 'Identifiant : IDNUM',
        name: 'login',
    });
    const { password } = await prompts({
        type: 'password',
        message: 'Mot de passe',
        name: 'password',
    });
    return { password, login };
}

async function scrapID() {

    // On récpère les logs
    const { login, password } = await askForCredidentials();

    // On ouvre le navigateur
    const browser = await puppeteer.launch({ headless: false, slowMo: 50, defaultViewport: null });
    const page = await browser.newPage();

    // On va sur l'URL de HP
    await page.goto('https://cas.u-bordeaux.fr/cas/login?service=https:%2F%2Fhyperplanning.iut.u-bordeaux.fr%2F');


    // On remplit les champs
    await page.$eval('#username', (el, login) => el.value = login, login);
    await page.$eval('#password', (el, password) => el.value = password, password);

    // On appuie sur "se connecter"
    await page.click('.btn-submit');

    // On attends que la page s'affiche
    await page.waitForSelector('.ibe_etab');

    await page.evaluate(() => {
        [...document.querySelectorAll("li > div")].find(element => element.textContent === "Promotions").click();
    });

    // METHODE CACA MAIS QUI FONCTIONNE
    // await page.click('.ocb_bouton');
    // await page.click('ul > li:nth-child(52)');

    await page.click('input[role=combobox]');
    await page.$eval('input[role=combobox]', el => el.value = 'INFO DUT S4');
    await page.keyboard.press('Enter');

    // On récupère le Xpath. Notre élément se trouve à l'index 0, on le récupère.
    const elements = await page.$x('/html/body/div[3]/div[2]/div[1]/div/div[5]/div[2]/div/div/div/div[1]/div/div/div[2]')[0];
    await elements[0].click();
    // await browser.close();
}

scrapID();