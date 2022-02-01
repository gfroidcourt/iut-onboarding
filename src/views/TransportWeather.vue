<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">Prochains transport</h1>
    <div class="view-content">
        <TransportCard :busData="liane10" />
        <TransportCard :busData="tramB" />
    </div>
      <h1 class="view-title">Météo</h1>
    <div class="view-content">
        <WeatherCard />
    </div>
  </div>
</template>

<script>
import TransportCard from "../components/TransportCard.vue";
import WeatherCard from "../components/WeatherCard.vue";

export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      liane10: {
        stops: [3323, 9055],
        lineColor: "#59a9e2",
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
  components: {
    TransportCard,
    WeatherCard,
  },
};
</script>

