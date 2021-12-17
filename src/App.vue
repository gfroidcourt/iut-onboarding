<template>
  <div style="background-color: #000000" id="container">
    <LoadingOverlay ref="loading" />
    <TransportCard
      :width="400"
      :height="500"
      :data="bus1"
    />
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
      bus1: {
        stops: {
          3323: "Bordeaux, Jardin Botanique",
          9055: "Gradignan, Beausoleil",
        },
        lineColor: "#f47499",
        lineId: 10,
        lineName: "Liane",
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
