<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">Prochains transports</h1>
    <div class="view-content">
      <TransportCard :busData="liane31" />
      <TransportCard :busData="tramB" />
    </div>
  </div>
</template>

<script>
import TransportCard from "../components/TransportCard.vue";

export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      liane31: {
        stops: ["BMA:SA:BVILLA6", "BMA:SA:BVILLA6"],
        lineColor: "#59a9e2",
        lineId: 31,
        lineName: "Liane",
      },
      tramB: {
        stops: ["BMA:SA:TMONTA", "BMA:SA:TMONTA"],
        lineColor: "#f47499",
        lineId: "B",
        lineName: "Tram",
      },
    };
  },
  components: {
    TransportCard,
  },
};
</script>

