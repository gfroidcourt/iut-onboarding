<template>
  <div style="background-color: #ffff" id="container">
    <LoadingOverlay ref="loading" />
    <TransportCard :width="400" :height="500" trip1="Gradignan, Beausoleil" trip2="Bordeaux, Jardin Botanique"/>
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
  font-family: 'Poppins', sans-serif;
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
