<template>
  <div class="trip-container">
    <div class="progress-bar">
      <CircleProgress
        :border-width="23"
        :border-bg-width="23"
        :size="200"
        :percent="remainingPercent"
        :fill-color="busData.lineColor"
        empty-color="#ddd"
      />
      <p v-if="this.error == 0">
        {{ msToWaitTime(remainingTime)[0]
        }}<span>m</span
        >{{ msToWaitTime(remainingTime)[1]
        }}<span>s</span>
      </p>
      <img src="@/public/assets/Warning.png" height="128px" width="128px" v-if="error == 1"/>
    </div>
    <p class="infos" v-if="error == 0">{{ formatDirectionString() }}</p>
    <p class="infos" v-if="error == 1">Impossible de récuperer les informations pour cet arrêt.</p>
  </div>
</template>


<script>
import * as api from "../api";
import CircleProgress from "vue3-circle-progress";

export default {
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
      waitInterval: 60000,
      error: 0
    };
  },
  methods: {
    formatDirectionString() {
      return this.lineName
        .toLowerCase()
        .replace(".", " ")
        .split(" ")
        .map((word) => {
          if (word.length > 0) return word[0].toUpperCase() + word.substring(1);
          else return "";
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
      return [minutes, seconds];
    },
    waitTimeStringToMs(src) {
      return Math.abs(Date.now() - new Date(src));
    },
    async setTimeRemaining() {
      const res = await api.fetchTBM(
        this.busData.stops[this.index],
      );
      let found = false;
      let i = 0;
      while (!found && i < res.length) {
        if(this.index === 1 && res[i].route.id.toString().includes("_R")) {
          this.lineName = res[i].route.terminus;
          this.remainingTime = this.waitTimeStringToMs(res[i].departure);
          found = true;
        }
        if (this.index === 0 && !res[i].route.id.toString().includes("_R")) {
          this.lineName = res[i].route.terminus;
          this.remainingTime = this.waitTimeStringToMs(res[i].departure);
          found = true;
        }
        ++i;
      }
    },
    refreshProgressBar() {
      this.remainingTime -= 1000;
      if (this.remainingTime < 0) {
        this.remainingTime = 0;
      }
      if (this.remainingTime > this.waitInterval) {
        this.remainingPercent = 0.1;
      } else {
        this.remainingPercent =
          ((this.waitInterval - this.remainingTime) / this.waitInterval) * 100;
      }
    },
  },
  mounted() {
    this.setTimeRemaining();
    this.timeRemainingInterval = setInterval(this.setTimeRemaining, 5000);
    this.refreshProgressInterval = setInterval(this.refreshProgressBar, 1000);
    api
      .getTBMLineWaitInterval(
        this.busData.stops[this.index],
        this.busData.lineId
      ).then((time) => {
        this.waitInterval = time;
      }).catch((err) => {
        console.error(err);
        this.waitInterval = 6000000;
        this.error = 1;
      });
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
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.infos {
  font-size: 30px;
  width: 40%;
  line-height: 35px;
  text-align: left;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar > p, .progress-bar > img {
  position: absolute;
  font-size: 30px;
}

.progress-bar > p > span {
  font-size: 20px;
}
</style>
