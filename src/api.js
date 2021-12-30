const TBM_URL = "https://ws.infotbm.com/ws/1.0/get-realtime-pass";
const WEATHER_URL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/131928?apikey=SI5CGkV2GkHfHZARLw9La9DIYQchBu2F&language=fr-fr";
const HYPPERPLANNING_URL = "";

export const fetchTBM = async (stopId, lineId) => {
  try {
    const result = await fetch(`${TBM_URL}/${stopId}/${lineId}`);
    return await result.json();
  } catch (e) {
    throw `Erreur de récupération des données TBM (ligne: ${lineId}, arrêt: ${stopId}) : ${e}`;
  }
};
//Fetch accuweather qui renvoit un JSON contenant la météo du jour, on s'intéresse surtout ici au temps
export const fetchWeather = async () => {
  try {
    const result = await fetch(WEATHER_URL);
    const data = await result.json();
    return data.Headline.Category;
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



