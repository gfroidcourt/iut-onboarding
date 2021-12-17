<template>
  <div id="card" :style="style">
    <p id="title">Tram <span>B</span></p>
    <div class="trip">
      <div class="progressbar">
        <radial-progress-bar
          :diameter="150"
          :total-steps="totalStep"
          :completed-steps="completed_steps"
        >
          <p>{{ formated_step }}</p>
        </radial-progress-bar>
      </div>
      <p class="infos">Gardignan, Beausoleil</p>
    </div>
    <div class="trip">
      <div class="progressbar"></div>
      <p class="infos">Bordeaux, Jardin Botanique</p>
    </div>
    <div>Oui : {{ formated_step }}</div>
  </div>
</template>

<script>
import RadialProgressBar from "../../node_modules//vue-radial-progress";
import * as fetch from "../api";

export default {
  name: "TransportCard",
  components: {
    RadialProgressBar,
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
    return {
      totalStep: 600000,
      formated_steps: setInterval(this.timeRemaining, 1000),
      completed_steps: 0,
    };
  },
  methods: {
    timeRemaining() {
      fetch.fetchTBM(9055, 10).then((res) => {
        var remain = res.destinations[1616][0].arrival_theorique;
        var date = Date.parse(remain);
        var now = Date.now();
        var dif = date - now;
        var min = Math.floor((dif / 1000 / 60) << 0);
        var sec = Math.floor((dif / 1000) % 60);
        if (Math.abs(sec) < 10) {
          sec = `0${sec}`;
        }
        this.completed_steps = this.totalStep - dif;
        var time = `${min}:${sec}`;
        this.formated_step = time;
        console.log(time);

        return time;
      });
    },
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
  justify-content: space-around;
}
</style>
