<template>
  <div id="container">
    <Background ref="background" />
    <LoadingOverlay ref="loading" />
    <TransportCard :width="400" :height="500" :busData="liane10" />
    <TransportCard :width="400" :height="500" :busData="tramB" />
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
    <!-- <div id="menus">
      <MenuCard restName="Sirtaki" :mealList="sirtakiMenu" />
      <MenuCard restName="SpaceCampus" :mealList="spaceMenu" />
    </div> -->
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import TransportCard from "./components/TransportCard.vue";
import Background from "./components/Background.vue";
import MenuCard from "./components/MenuCard.vue";

import "./stylesheets/reset.css";
import * as scrapMeal from "./scrapMeal.js";

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
      sirtakiMenu: undefined,
      spaceMenu: undefined,
    };
  },
  components: {
    LoadingOverlay,
    TransportCard,
    Background,
    //MenuCard,
  },
  mounted() {
    scrapMeal.getAllRestaurantsMenus().then((res) => {
      this.sirtakiMenu = res.sirtaki;
      this.spaceMenu = res.space;
    });
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
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
