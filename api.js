import ICAL from "ical.js";
import { useFetch } from "nuxt/app";

const TBM_URL = "https://gateway-apim.infotbm.com/maas-web/web/v1/timetables/stops/stop_area:";
const WEATHER_URL_NEXT_12_HOURS =
  "https://api.weatherapi.com/v1/forecast.json?key=72687f6b06f94afa9f7103056220603&q=Gradignan&aqi=no&lang=fr&hour=";
const CURRENT_WEATHER_URL =
  "https://api.weatherapi.com/v1/current.json?key=72687f6b06f94afa9f7103056220603&q=Gradignan&aqi=no&lang=fr";
const HYPERPLANNING_URL = 
  "https://hyperplanning.iut.u-bordeaux.fr/Telechargements/ical/Edt.ics?version=2024.0.9.0"

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
  let stage2 = stage1.split(";")
  let stage3 = []
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
}

const sameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
}

export const getNextCourse = (icalID) => {
  let res = $fetch(`/api/hp/Edt.ics?version=2024.0.9.0&icalsecurise=${icalID}`).then((tmp) => {
    return ICAL.parse(tmp);
  }).then((result) => {
    // Variables de controle de la boucle
    let found = false;
    let i = 0;
    const events = result[2];
    
    // Variables pour la boucle afin d'éviter les répétitions
    let e;
    let tstart;
    let tend;
    let currentTime = new Date();
    while(!found && i < events.length) {
      e = events[i][1];
      tstart = new Date(e[4][3]);
      tend = new Date(e[5][3]);

      /*
      On affiche le cours jusqu'à 30 mn avant sa fin, si on est entre 12 et 14h, alors on affiche celui après la pause
      */

      if(sameDay(currentTime,tstart) && currentTime.getTime() > tstart.getTime() - 30 * 60000 && currentTime.getTime() < tend.getTime() - 30 * 60000) {
        found = true;
      } else if(sameDay(currentTime,tstart) && currentTime <= tstart && currentTime.getHours() < 14 && currentTime.getMinutes() < 35 && tstart.getHours() == 14 && currentTime.getHours() >= 12) {
        found = true;
      } else if(sameDay(currentTime,tstart) && currentTime <= tstart && currentTime.getHours() < 8 && currentTime.getMinutes() < 0 && tstart.getHours() == 8) {
        found = true;
      }

      ++i;
    }

    const final = transformDesc(e[e.length-1][3]);
    return (JSON.stringify(final));
  }).catch((e) => {throw e;});
  return res;
}

export const getAllNextCourses = async (icals) => {
  let promos = [];
  let classes = [];
  let But3_done = false;
  for(let promo of Object.keys(icals)) {
    if (
      promo === "info_but3_ALT" ||
      (promo === "info_but3_FI" && !But3_done)
    ) {
      promos.push("info_but3");
    }
    for(let c of icals[promo].classes) {
      let promises = []
      promises.push(getNextCourse(c.classIcal));
      try {
        promises.push(getNextCourse(c.groups.prime));
        promises.push(getNextCourse(c.groups.seconde))
      } catch(e) {};
      await Promise.all(promises).then(data => {
        classes.push({
          promotion: promo,
          className: c.className,
          nextCourse: JSON.parse(data[0]),
          groups: c.groups
            ? {
              prime: data[1] !== undefined ? JSON.parse(data[1]) : undefined,
              seconde: data[2] !== undefined ? JSON.parse(data[2]) : undefined,
            }
            : [],
        });
      });
    }
  };
  return classes;
}