<template>
  <div id="card" :style="style">
    <p id="title">
      {{ busData.lineName }}
      <span :style="`color: ${busData.lineColor} ; font-size : 1.7em`">{{
        busData.lineId
      }}</span>
    </p>
    <TripTransportCard :busData="busData" :index="0"/>
    <TripTransportCard :busData="busData" :index="1"/>
  </div>
</template>

<script>
import TripTransportCard from "./TripTransportCard.vue";

export default {
  name: "TransportCard",
  components: {
    TripTransportCard,
  },
  props: {
    busData: Object,
    width: Number,
    height: Number,
  },
  computed: {
    style() {
      return `height: ${this.height}px; 
              width: ${this.width}px`;
    },
  },
};
</script>

<style scoped>
#card {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 0px 30px 0px rgba(30, 30, 30, 0.2);
}

#title {
  font-size: 1.2em;
}
</style>
