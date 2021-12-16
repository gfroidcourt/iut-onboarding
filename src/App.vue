<template>
  <div>
    <Background ref="background" />
    <LoadingOverlay ref="loading" />
    <input
      @click="$refs.loading.show()"
      value="Afficher chargement"
      type="button"
    />
    <input
      @click="$refs.background.next()"
      value="Changer background"
      type="button"
    />
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Background from "./components/Background.vue";

import "./stylesheets/reset.css";
import * as scrapMeal from "./scrapMeal.js";

export default {
  name: "App",
  components: {
    LoadingOverlay,
    Background,
  },
  mounted() {
    scrapMeal.getAllRestaurantsMenus().then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

input {
  background-color: rgba(97, 97, 97, 0.2);
  border: none;
  padding: 10px;
  margin: 10px;
  color: rgb(255, 255, 255);
  transition: background-color 0.2s;
}
input:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
