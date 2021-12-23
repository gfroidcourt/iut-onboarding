<template>
  <div class="trip-container">
    <div class="progress-bar">
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
    <p class="infos">{{ formatDirectionString() }}</p>
  </div>
</template>


<script>
import * as api from "../api";
import CircleProgress from "vue3-circle-progress";

export default {
  name: "TripTransportCard",
  components: {
    CircleProgress,
  },
  props: {
    busData: Object,
    index: Number,
  },
  data() {
    return {
      refreshProgressInterval: undefined,
      timeRemainingInterval: undefined,
      updatedAt: undefined,
      remainingPercent: 0,
      remainingTime: 0,
      lineName: "",
    };
  },
  methods: {
    formatDirectionString() {
      return this.lineName
        .toLowerCase()
        .replace(".", " ")
        .split(" ")
        .map((word) => {
          if(word.length > 0)
            return word[0].toUpperCase() + word.substring(1);
          else
            return "";
        })
        .join(" ");
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
    waitTimeStringToMs(src) {
      const remainSplit = src.split(":");
      return (parseInt(remainSplit[2]) + parseInt(remainSplit[1]) * 60) * 1000;
    },
    async setTimeRemaining() {
      const res = await api.fetchTBM(
        this.busData.stops[this.index],
        this.busData.lineId
      );
      const dests = Object.values(res.destinations);
      let indexBus = 0;
      if (dests[1] !== undefined && dests[1][0].waittime < dests[0][0].waittime) indexBus = 1;

      if (this.updatedAt !== dests[indexBus][0].updated_at) {
        const waitStr = dests[indexBus][0].waittime;
        this.remainingTime = this.waitTimeStringToMs(waitStr);
      }
      this.updatedAt = dests[indexBus][0].updated_at;
      this.lineName = dests[indexBus][0].destination_name;
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
  mounted() {
    this.setTimeRemaining();
    this.timeRemainingInterval = setInterval(this.setTimeRemaining, 5000);
    this.refreshProgressInterval = setInterval(this.refreshProgressBar, 1000);
  },
  unmounted() {
    clearInterval(this.refreshProgressInterval);
    clearInterval(this.timeRemainingInterval);
  },
};
</script>

<style>
.trip-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.infos {
  font-size: 1em;
  width: 150px;
  margin: auto;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar > p {
  position: absolute;
}
</style>
