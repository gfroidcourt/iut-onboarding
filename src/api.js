const TBM_URL = "https://ws.infotbm.com/ws/1.0/get-realtime-pass";
const WEATHER_URL = "";
const HYPPERPLANNING_URL = "";

export const fetchTBM = async (stopId, lineId) => {
  try {
    const result = await fetch(`${TBM_URL}/${stopId}/${lineId}`);
    return await result.json();
  } catch (e) {
    throw `Erreur de récupération des données TBM (ligne: ${lineId}, arrêt: ${stopId}) : ${e}`;
  }
};

export const fetchWeather = async () => {
  // TO DO
};

export const fetchHyperplanning = async () => {
  // TO DO
};
