<template>
  <div style="background-color: #ccc">
    <LoadingOverlay ref="loading" />
    <h1>Hello world</h1>
    <input
      @click="$refs.loading.show()"
      value="Afficher chargement"
      type="button"
    />
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import "./stylesheets/reset.css";

export default {
  name: "App",
  components: {
    LoadingOverlay,
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
</style>
