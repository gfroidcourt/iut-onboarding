<template>
  <div class="view-container" v-show="isActive">
    <TransportCard :busData="liane10" />
    <TransportCard :busData="tramB" />
  </div>
</template>

<script>
import TransportCard from "../components/TransportCard.vue";

export default {
  name: "NextTransports",
  props: {
    isActive: Boolean,
  },
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
  components: {
    TransportCard,
  },
};
</script>

<style scoped>
</style>
