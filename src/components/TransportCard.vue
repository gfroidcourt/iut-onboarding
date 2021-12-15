<template>
  <div id="card" :style="style">
    <p id="title">Tram <span>B</span></p>
    <div class="trip">
      <div class="progressbar">
        <radial-progress-bar
          :diameter="150"
          :total-steps="10"
          :completed-steps="completed_steps"
        >
          <p>{{ totalTime }}</p>
        </radial-progress-bar>
      </div>
      <input type="button" @click="click" />
      <p class="infos">Gardignan, Beausoleil</p>
    </div>
    <div class="trip">
      <div class="progressbar"></div>
      <p class="infos">Bordeaux, Jardin Botanique</p>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "../../node_modules//vue-radial-progress";

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
      totalTime: 1,
      completed_steps: 1,
    };
  },
  methods: {
    click() {
      this.completed_steps += 1;
      this.totalTime += 1;
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
