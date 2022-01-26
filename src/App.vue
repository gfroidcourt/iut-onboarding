<template>
  <div id="container">
    <Background ref="background" />
    <LoadingOverlay ref="loading" />
    <PlanningView/>
  </div>
</template>

<script>
import PlanningView from "./views/NextPlannings.vue";
import Background from "./components/Background.vue";

export default {
  name: "App",
  data() {
    return {
      liane10: {
        stops: [3323, 9055],
        lineColor: "#3F96D4",
        lineId: 10,
        lineName: "Liane",
      },
      tramB: {
        stops: [7463, 3730],
        lineColor: "#f47499",
        lineId: "B",
        lineName: "Tram",
      },
      sirtakiMenu: undefined,
      spaceMenu: undefined,
    };
  },
  mounted() {
    this.$refs.background.next();
  },
  components: {
    // Date,
    PlanningView,
    Background
    //MenuCard,
    //TransportCard,
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
  font-family: "Poppins", sans-serif;
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

#menus {
  display: flex;
  justify-content: space-evenly;
}

#container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.transport {
  display: flex;
  justify-content: space-around;
}
</style>
