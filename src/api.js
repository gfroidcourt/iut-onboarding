const TBM_URL = "https://ws.infotbm.com/ws/1.0/get-realtime-pass";
const WEATHER_URL_NEXT_12_HOURS = "https://api.weatherapi.com/v1/forecast.json?key=72687f6b06f94afa9f7103056220603&q=Gradignan&aqi=no&lang=fr&hour=";
const CURRENT_WEATHER_URL = "https://api.weatherapi.com/v1/current.json?key=72687f6b06f94afa9f7103056220603&q=Gradignan&aqi=no&lang=fr";

export const fetchTBM = async (stopId, lineId) => {
  try {
    const result = await fetch(`${TBM_URL}/${stopId}/${lineId}`);
    return await result.json();
  } catch (e) {
    throw `Erreur de récupération des données TBM (ligne: ${lineId}, arrêt: ${stopId}) : ${e}`;
  }
};


//Fetch l'api et renvoie un Json contenant la température et l'icone météo pour les 12 prochains heures pour chaque deux heures
export const fetch12HoursWeather = async () => {
  let weathertab = [];
  let dateT = new Date;
  let hour = dateT.getHours() + 2;
  if(hour % 2 === 1)
  {
    hour = hour - 1;
  }
  for (let i = hour; i <= hour + 12; i = i + 2) {
    let hourloop = i;
    if(hourloop >= 24)
    {
      hourloop = hourloop - 24;
    }
    try {
      const result = await fetch(WEATHER_URL_NEXT_12_HOURS + hourloop);
      const data = await result.json();
      weathertab.push({
        "Heure": hourloop,
        "icone": data.forecast.forecastday[0].hour[0].condition.icon,
        "Temperature": data.forecast.forecastday[0].hour[0].temp_c
      });
    }
    catch (e) {
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

export const fetchHyperplanning = async () => {
  // TO DO
};

export const getTBMLineWaitInterval = async (stopId, lineId) => {
  try {
    const data = await fetchTBM(stopId, lineId);
    const dests = Object.values(data.destinations);
    let timeBus1 = dests[0][0].departure;
    let timeBus2 = dests[0][1].arrival;
    const date1 = new Date(timeBus1);
    const date2 = new Date(timeBus2);
    const result = Math.abs(date1 - date2);
    return result;
  } catch (e) {
    throw `Erreur de récupération des wait interval TBM (ligne: ${lineId}, arrêt: ${stopId}) : ${e}`;
  }
};
