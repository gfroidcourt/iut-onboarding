const TBM_URL = "https://ws.infotbm.com/ws/1.0/get-realtime-pass";
const WEATHER_URL_NEXT_12_HOURS = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/131928?apikey=SI5CGkV2GkHfHZARLw9La9DIYQchBu2F";
const CURRENT_WEATHER_URL = "http://dataservice.accuweather.com/currentconditions/v1/131928?apikey=SI5CGkV2GkHfHZARLw9La9DIYQchBu2F&language=fr-fr";
const HYPPERPLANNING_URL = "";

export const fetchTBM = async (stopId, lineId) => {
  try {
    const result = await fetch(`${TBM_URL}/${stopId}/${lineId}`);
    return await result.json();
  } catch (e) {
    throw `Erreur de récupération des données TBM (ligne: ${lineId}, arrêt: ${stopId}) : ${e}`;
  }
};
//Fetch accuweather qui renvoit un JSON contenant la météo des 12 prochaines heures à Gradignan
export const fetchNextWeather = async () => {
  try {
    const result = await fetch(WEATHER_URL_NEXT_12_HOURS);
    const data = await result.json();
    let weathertab = [];
    for (let i = 0; i < data.length; i++) {
      if (new Date(data[i].DateTime).getHours() % 2 === 0) {
        weathertab.push({
          "Heure": data[i].DateTime.substring(11, 13),
          "icone": `https://www.accuweather.com/images/weathericons/${data[i].WeatherIcon.toString()}.svg`,
          "Temperature": Math.round((data[i].Temperature.Value - 32) * 5 / 9),
        });
      }
    }
    return weathertab;
  } catch (e) {
    throw `Erreur de récupération des données météo : ${e}`;
  }

};

//Fetch accuweather pour récupérer le temps à l'heure de la requête
export const fetchCurrentWeather = async () => {
  try {
    const result = await fetch(CURRENT_WEATHER_URL);
    const data = await result.json();
    return {
      weatherText: data[0].WeatherText,
      temperature: Math.round(data[0].Temperature.Metric.Value)
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
