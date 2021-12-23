<template>
  <div id="card" :style="style">
    <p id="title">
      {{ busData.lineName }} <span :style="`color: ${busData.lineColor}`">{{ busData.lineId }}</span>
    </p>
    <TripTransportCard
      :busData="busData"
      :index="0"
    />
    <TripTransportCard
      :busData="busData"
      :index="1"
    />
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
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.466);
}

#title {
  font-size: 3em;
}
</style>
