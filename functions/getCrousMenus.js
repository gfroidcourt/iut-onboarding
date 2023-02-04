import * as cheerio from "cheerio";
import fetch from "node-fetch";

const CROUS_RESTAURANT_BASE_URL = "https://www.crous-bordeaux.fr/restaurant/";
const SIRTAKI_URL = `${CROUS_RESTAURANT_BASE_URL}crous-cafet-le-sirtaki`;
const SPACE_URL = `${CROUS_RESTAURANT_BASE_URL}space-campus-resto-u`;

/**
 * Sélectionne tous les plats du menu du jour actuel, sans les entrées ni les desserts
 * @param {string} URL
 *  L'URL du site (space ou sirtaki)
 * @return {string[]} un tableau de string correspondant aux plats du site pour le jour actuel
 */
async function fetchMenu(URL) {
  const response = await fetch(URL, {
    method: "GET",
  });

  if (!response.ok)
    return null;

  const html = await response.text();

  if (html == null)
    return null;

  let $ = cheerio.load(html);
  let tabPlats = [];

  const htmlSelfMenu = $("ul.meal_foodies > li:nth-child(2)");
  $ = cheerio.load(htmlSelfMenu.html());

  $("li").each((_, htmlPlat) => {
    let plat = $(htmlPlat).html();
    // Sans les lignes inutiles
    if (plat.includes(":") || plat.includes("(") || plat.length === 0)
      return;
      // Sans les "Entrées diverses" et "Desserts divers"
    if (plat.includes("Entrées") || plat.includes("Desserts") || plat.includes("Salade"))
      return;
    tabPlats.push(plat.charAt(0).toUpperCase() + plat.slice(1));
  });

  return tabPlats;
}

/**
 * Sélectionne les plats du jour actuel pour les deux restaurants crous
 * @return Un objet contennant les plats des restaurants crous
 */
const getAllRestaurantsMenus = async () => ({
  space: await fetchMenu(SPACE_URL),
  // sirtaki: await fetchMenu(SIRTAKI_URL),
});

export const handler = async () => {
  try {
    const menus = await getAllRestaurantsMenus();
    return { statusCode: 200, body: JSON.stringify(menus) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
