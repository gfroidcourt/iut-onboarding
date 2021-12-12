<template>
  <div id="card" :style="style">
    <p id="title">Tram <span>B</span></p>
    <div class="trip">
      <div class="progressbar">
        <vue-ellipse-progress
          :data="circles"
          :progress="progress"
          :angle="-90"
          color="blue"
          :colorFill="colorFillGradient"
          emptyColor="#8ec5fc"
          :emptyColorFill="emptyColorFillGradient"
          :size="300"
          :thickness="10"
          emptyThickness="10%"
          lineMode="in 10"
          :legend="true"
          :legendValue="180"
          legendClass="legend-custom-style"
          dash="60 0.9"
          animation="reverse 700 400"
          :noData="false"
          :loading="false"
          fontColor="white"
          :half="false"
          :gap="10"
          dot="10 blue"
          fontSize="5rem"
        >
        </vue-ellipse-progress>
      </div>
      <p class="infos">Gardignan, Beausoleil</p>
    </div>
    <div class="trip">
      <div class="progressbar"></div>
      <p class="infos">Bordeaux, Jardin Botanique</p>
    </div>
  </div>
</template>

<script>
import VueEllipseProgress from "vue-ellipse-progress";

export default {
  name: "TransportCard",
  components: {
    VueEllipseProgress,
  },
  props: {
    lineColor: String,
    lineName: String,
    lineType: String,
    trip1: Object,
    trip2: Object,
    width: String,
    height: String,
  },
  data() {
    return {};
  },
  methods: {},
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
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  border-radius: 45px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.466);
}

#title {
  font-size: 3em;
}

.infos {
  font-size: 1em;
  width: 150px;
}

span {
  color: red;
}

.trip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
