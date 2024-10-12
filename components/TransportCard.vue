<template>
  <div id="card">
    <p id="title">
      {{ busData.lineName }}
      <span :style="`color: ${busData.lineColor} ; font-size : 1.7em`">{{
        busData.lineId
        }}</span>
    </p>
    <TripTransportCard :busData="busData" :index="0" />
    <TripTransportCard :busData="busData" :index="1" />
  </div>
</template>

<script>
import TripTransportCard from "./TripTransportCard.vue";

export default {
  components: {
    TripTransportCard,
  },
  props: {
    busData: Object,
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
  height: 640px;
  width: 540px;
}

#title {
  font-size: 40px;
}
</style>
