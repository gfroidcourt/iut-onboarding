<template>
  <div id="card" :style="style">
    <p id="title">
      {{ busData.lineName }} <span>{{ busData.lineId }}</span>
    </p>
    <div class="trip">
      <div class="progressbar">
        <CircleProgress
          :border-width="17"
          :border-bg-width="17"
          :percent="remainingPercent"
          :fill-color="busData.lineColor"
          empty-color="#c8c8c8"
        />
        <p>
          {{ msToWaitTime(remainingTime) }}
          <span style="font-size: 0.7em">mins</span>
        </p>
      </div>
      <p class="infos">{{ Object.values(busData.stops)[0] }}</p>
    </div>
  </div>
</template>

<script>
import * as api from "../api";
import CircleProgress from "vue3-circle-progress";

export default {
  name: "TransportCard",
  components: {
    CircleProgress,
  },
  props: {
    busData: Object,
    width: Number,
    height: Number,
  },
  data() {
    return {
      refreshProgressInterval: undefined,
      timeRemainingInterval: undefined,
      remainingPercent: 0,
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
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      minutes = Math.round(minutes);
      seconds = Math.round(seconds);
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      return `${minutes}:${seconds}`;
    },
    async setTimeRemaining() {
      const res = await api.fetchTBM(
        Object.keys(this.busData.stops)[1],
        this.busData.lineId
      );
      const waitStr = Object.values(res.destinations)[0][0].waittime;
      this.remainingTime = this.waitTimeStringToMs(waitStr);
    },
    refreshProgressBar() {
      this.remainingTime -= 1000;
      if (this.remainingTime < 0) {
        this.remainingTime = 0;
      }
      if (this.remainingTime > this.busData.waitInterval) {
        this.remainingPercent = 0.1;
      } else {
        this.remainingPercent =
          ((this.busData.waitInterval - this.remainingTime) /
            this.busData.waitInterval) *
          100;
      }
    },
  },
  // Fonction appelé au moment du chargement du component
  mounted() {
    this.setTimeRemaining();
    this.timeRemainingInterval = setInterval(this.setTimeRemaining, 15000);
    this.refreshProgressInterval = setInterval(this.refreshProgressBar, 1000);
  },
  // Quand le component est enlevé de la page
  unmounted() {
    clearInterval(this.refreshProgressInterval);
    clearInterval(this.timeRemainingInterval);
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

.progressbar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.progressbar > p {
  position: absolute;
}

#title span {
  color: #f47f99;
}

.trip {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
