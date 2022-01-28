<template>
  <div class="container">
    <div class="current_infos">
      <p>{{ this.currentTemperature }}°</p>
      <div class="ville-temps">
        <p>Gradignan</p>
        <p>{{ this.currentWeather }}</p>
      </div>
    </div>
    <div class="infos-meteo">
      <div class="meteo_card" v-for="(meteo, index) in info_meteo" :key="index">
        <p>{{ meteo.Heure }}H</p>
        <img :src="meteo.icone" />
        <p>{{ meteo.Temperature }}°</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../api";
export default {
  name: "Meteo",
  data() {
    return {
      currentWeather: undefined,
      currentTemperature: undefined,
      info_meteo: [
      ],
    };
  },
  methods: {},
  mounted() {
    api.fetchCurrentWeather().then((weatherinfos) => {
      this.currentTemperature = weatherinfos.temperature;
      this.currentWeather = weatherinfos.weatherText;
    });
    api.fetchNextWeather().then((tab) => {
      this.info_meteo = tab;
    });
  },
};
</script>

<style>
.container {
  background-color: #ffffff;
  border-radius: 20px;
  width: 800px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.current_infos {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.current_infos > p {
  font-size: 2em;
}

.ville-temps {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.ville-temps > p:first-of-type {
  color: #5c717d;
  margin-bottom: 10px;
}

.infos-meteo {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 100px;
}

.meteo_card {
  width: 130px;
  height: 200px;
}

.meteo_card > p {
  font-size: 1.2em;
}

img {
  width: 100px;
  height: 100px;
}
</style>
