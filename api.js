import ICAL from "ical.js";
import { useFetch } from "nuxt/app";

const TBM_URL = "https://gateway-apim.infotbm.com/maas-web/web/v1/timetables/stops/stop_area:";
const WEATHER_URL_NEXT_12_HOURS =
  "https://api.weatherapi.com/v1/forecast.json?key=72687f6b06f94afa9f7103056220603&q=Gradignan&aqi=no&lang=fr&hour=";
const CURRENT_WEATHER_URL =
  "https://api.weatherapi.com/v1/current.json?key=72687f6b06f94afa9f7103056220603&q=Gradignan&aqi=no&lang=fr";

export const fetchTBM = async (stopId) => {
  try {
    const result = await fetch(`${TBM_URL}${stopId}`);
    const text = await result.text();
    const str = new window.DOMParser().parseFromString(text, "text/html");
    const data = await str.body.firstChild.data;
    const json = await JSON.parse(data);
    const interesting = await json.nextDepartures.slice(0,4);
    return interesting;
  } catch (e) {
    throw `Erreur de récupération des données TBM (arrêt: ${stopId}) : ${e}`;
  }
};

//Fetch l'api et renvoie un Json contenant la température et l'icone météo pour les 12 prochains heures pour chaque deux heures
export const fetch12HoursWeather = async () => {
  let weathertab = [];
  let dateT = new Date();
  let hour = dateT.getHours() + 2;
  if (hour % 2 === 1) {
    hour = hour - 1;
  }
  for (let i = hour; i <= hour + 12; i = i + 2) {
    let hourloop = i;
    if (hourloop >= 24) {
      hourloop = hourloop - 24;
    }
    try {
      const result = await fetch(WEATHER_URL_NEXT_12_HOURS + hourloop, {mode: "cors"});
      const data = await result.json();
      weathertab.push({
        Heure: hourloop,
        icone: data.forecast.forecastday[0].hour[0].condition.icon,
        Temperature: data.forecast.forecastday[0].hour[0].temp_c,
      });
    } catch (e) {
      throw `Erreur de récupération des données météo : ${e}`;
    }
  }
  return weathertab;
};

//Fetch accuweather pour récupérer le temps à l'heure de la requête
export const fetchCurrentWeather = async () => {
  try {
    const result = await fetch(CURRENT_WEATHER_URL);
    const data = await result.json();
    return {
      weatherText: data.current.condition.text,
      temperature: data.current.temp_c,
    };
  } catch (e) {
    throw `Erreur de récupération des données météo : ${e}`;
  }
};

export const getTBMLineWaitInterval = async (stopId, lineId) => {
  try {
    const data = await fetchTBM(stopId, lineId);
    const dep1 = data[0];
    const dep2 = data[2];
    let timeBus1 = dep1.departure;
    let timeBus2 = dep2.departure;
    const date1 = new Date(timeBus1);
    const date2 = new Date(timeBus2);
    const result = Math.abs(date1 - date2);
    return result;
  } catch (e) {
    throw `Erreur de récupération des wait interval TBM (ligne: ${lineId}, arrêt: ${stopId}) : ${e}`;
  }
};

export const getAllRestaurantsMenus = async () => {
  try {
    const result = await fetch(".netlify/functions/getCrousMenus");
    return await result.json();
  } catch (e) {
    throw `Erreur de récupération des menus CROUS : ${e}`;
  }
};

const transformDesc = (desc) => {
  if(desc.length === 0) {
    return ;
  }
  let stage1 = desc.replaceAll("<br/>",";");
  let stage2 = stage1.split(";");
  let stage3 = [];
  for(let i of stage2) {
    stage3.push(i.split(":"));
  }

  let stage4 = {};
  for(let t of stage3) {
    let key = t[0];
    key = key.replaceAll("é","e");
    key = key.replaceAll(" ","");
    key = key.replaceAll("è","e");
    stage4[key] = t[1];
  }

  if(stage4.Salle !== undefined) {
    stage4.Salle = stage4.Salle.split(" ")[1];
  } else {
    stage4.Salle = "";
  }

  return stage4;
};
