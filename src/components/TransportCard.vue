<template>
  <div id="card" :style="style">
    <p id="title">Tram <span>B</span></p>
    <div class="trip">
      <div class="progressbar">
        <radial-progress-bar
          :diameter="diamter"
          :total-steps="totalStep"
          :completed-steps="completed_steps"
          :start-color=color_gradient
          :stop-color=color_gradient
          :innerStrokeColor=color_inline
        >
          <p>{{ formated_step }} mins</p>
        </radial-progress-bar>
      </div>
      <p class="infos">{{ trip1 }}</p>
    </div>
    <div class="trip">
      <div class="progressbar">
        <radial-progress-bar
          :diameter="diamter"
          :total-steps="totalStep"
          :completed-steps="completed_steps"
          :start-color=color_gradient
          :stop-color=color_gradient
          :innerStrokeColor=color_inline
        >
          <p>{{ formated_step }} mins</p>
        </radial-progress-bar>
      </div>
      <p class="infos">{{ trip2 }}</p>
    </div>
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
    trip1: String,
    trip2: String,
    width: String,
    height: String,
  },
  data() {
    return {
      diameter: 150,
      totalStep: 600000,
      // Les paramètres de la méthodes se trouvent à partir du 3ème paramètre inclus
      formated_step: setInterval(this.timeRemaining, 2000, 9055, 10),
      completed_steps: 0,
      color_inline: "#c8c8c8",
      color_gradient: "#f47499"
    };
  },
  methods: {
    timeRemaining(stopId, lineId) {
      fetch.fetchTBM(stopId, lineId).then((res) => {
        let remain = String(res.destinations[1616][0].waittime);
        let remainSplit = remain.split(":");
        let min = remainSplit[1];
        let sec = remainSplit[2];
        if (Math.abs(sec) < 10) {
          sec = `0${sec}`;
        }
        this.completed_steps =
          this.totalStep - Number(min * 1000 * 60 + sec * 1000);
        this.formated_step = min;
        console.log(this.totalStep);
        console.log(min * 1000 * 60);
        console.log(sec * 1000);
        return min + 1;
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
  background-color: grey;
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
