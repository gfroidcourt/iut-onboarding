<template>
  <div style="background-color: #000000" id="container">
    <LoadingOverlay ref="loading" />
    <TransportCard :width="400" :height="500" :busData="liane10" />
    <TransportCard :width="400" :height="500" :busData="tramB" />
    <input
      @click="$refs.loading.show()"
      value="Afficher chargement"
      type="button"
    />
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import TransportCard from "./components/TransportCard.vue";
import "./stylesheets/reset.css";

export default {
  name: "App",
  data() {
    return {
      liane10: {
        stops: [3323, 9055],
        lineColor: "#3F96D4",
        lineId: 10,
        lineName: "Liane",
        waitInterval: 600000, // 10m
      },
      corol31: {
        stops: [3323, 9055],
        lineColor: "#F89454",
        lineId: 31,
        lineName: "Corol",
        waitInterval: 600000, // 10m
      },
      tramB: {
        stops: [7463, 3730],
        lineColor: "#f47499",
        lineId: "B",
        lineName: "Tram",
        waitInterval: 600000, // 10m
      },
    };
  },
  components: {
    LoadingOverlay,
    TransportCard,
  },
};
</script>

<style>
#app {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
