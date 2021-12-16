/* eslint-disable */
import fetch from "node-fetch";
import cheerio from "cheerio";

const SPACE_URL = "https://www.crous-bordeaux.fr/restaurant/space-campus-resto-u/";
const SIRTAKI_URL = "https://www.crous-bordeaux.fr/restaurant/crous-cafet-le-sirtaki/";

/**
 * Sélectionne tous les plats du menu du jour actuel, sans les entrées ni les desserts
 * @param {string} URL
 *  L'URL du site (space ou sirtaki)
 * @return {string[]} un tableau de string correspondant aux plats du site pour le jour actuel
 */
async function fetchMenu(URL) {
  // { headers: {
  //   "Access-Control-Allow-Origin": "*",
  // } }
  const response = await fetch(URL);
  const html = await response.text();

  let $ = cheerio.load(html);
  let tabPlats = [];
  // Menu complet de chaque jour
  $(".slides li").each((_, htmlDayMenu) => {

    let dayMenu = $(htmlDayMenu).html();
    // Sans les jours futurs
    if (dayMenu.split(" ")[3] !== new Date().getDate().toString())
      return;

    $ = cheerio.load(dayMenu);
    // Menu Crous du jour actuel
    $(".liste-plats:nth-of-type(2)").each((_, htmlListMenu) => {
      $ = cheerio.load(htmlListMenu);
      // Plats du Crous du jour actuel
      $("li").each((_, htmlPlat) => {
        let plat = $(htmlPlat).html();
        // Sans les lignes inutiles
        if (plat.includes(":") || plat.includes("(") || plat.length === 0)
          return;
        // Sans les "Entrées diverses" et "Desserts divers"
        if (plat.includes("Entrées") || plat.includes("Desserts"))
          return;
        tabPlats.push(plat);
      });
    });
  });
  return tabPlats;
}

/**
 * Sélectionne les plats du jour actuel pour les deux restaurants crous
 * @return Un objet contennant les plats des restaurants crous
 */
export const getAllRestaurantsMenus = async () => ({
  space: await fetchMenu(SPACE_URL),
  sirtaki: await fetchMenu(SIRTAKI_URL),
});
