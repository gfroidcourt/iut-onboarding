<template>
  <div id="card" :style="style">
    <p id="title">
      {{ data.lineName }} <span>{{ data.lineId }}</span>
    </p>
    <div class="trip">
      <div class="progressbar">
        <radial-progress-bar
          diameter="150"
          :total-steps="data.waitInterval"
          :completed-steps="completedSteps"
          :start-color="data.lineColor"
          :stop-color="data.lineColor"
          innerStrokeColor="#c8c8c8"
        >
          <p>{{ msToWaitTime(remainingTime) }}</p>
        </radial-progress-bar>
      </div>
      <p class="infos">{{ Object.values(data.stops)[0] }}</p>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";
import * as api from "../api";

export default {
  name: "TransportCard",
  components: {
    RadialProgressBar,
  },
  props: {
    data: Object,
    width: String,
    height: String,
  },
  data() {
    return {
      loop: undefined,
      completedSteps: 0,
      remainingTime: 0,
    };
  },
  methods: {
    waitTimeStringToMs(src) {
      console.log(src);
      const remainSplit = src.split(":");
      return (parseInt(remainSplit[2]) + parseInt(remainSplit[1]) * 60) * 1000;
    },
    msToWaitTime(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${Math.round(minutes)}:${Math.round(seconds)}`;
    },
    async setTimeRemaining() {
      const res = await api.fetchTBM(
        Object.keys(this.data.stops)[1],
        this.data.lineId
      );
      console.log(Object.values(res.destinations)[0][0]);
      const waitStr = Object.values(res.destinations)[0][0].waittime;
      this.remainingTime = this.waitTimeStringToMs(waitStr);
    },
    refreshProgressBar() {
      this.remainingTime -= 1000;
      this.completedSteps = this.data.waitInterval - this.remainingTime;
      console.log(this.completedSteps);
    },
  },
  // Fonction appelé au moment du chargement du component
  mounted() {
    this.setTimeRemaining();
    this.loop = setInterval(this.refreshProgressBar, 1000);
  },
  // Quand le component est enlevé de la page
  unmounted() {
    clearInterval(this.loop);
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
  border-radius: 45px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.466);
}

#title {
  font-size: 3em;
}

.infos {
  font-size: 1em;
  width: 150px;
  margin: auto;
}

span {
  color: #f47f99;
}

.trip {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
