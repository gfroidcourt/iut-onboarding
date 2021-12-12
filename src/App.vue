<template>
  <div style="background-color: #ffff" id="container">
    <LoadingOverlay ref="loading" />
    <TransportCard :width="400" :height="500"/>
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
  components: {
    LoadingOverlay,
    TransportCard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  display: flex;
  justify-content:space-evenly;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
