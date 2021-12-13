<template>
  <div>
    <Background ref="background"/>
    <LoadingOverlay ref="loading" />
    <input
      @click="$refs.loading.show()"
      value="Afficher chargement"
      type="button"
    />
    <input
      @click="$refs.background.next()"
      value="Afficher decorations"
      type="button"
    />
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Background from "./components/Background.vue";

import "./stylesheets/reset.css";

export default {
  name: "App",
  components: {
    LoadingOverlay,
    Background
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
