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
    const data =  await result.json();
    return data.Headline.Category;
  } catch (e) {
    throw `Erreur de récupération des données météo : ${e}`;
  }

};

export const fetchHyperplanning = async () => {
  // TO DO
};
