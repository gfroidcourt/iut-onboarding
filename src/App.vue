<template>
  <div class="view-container">
    <Background ref="background" />

    <!-- <Meteo :isActive="currentView == 'weather'" />  -->
    <Menus :isActive="currentView == 'menus'" />
    <!-- <Planning :isActive="currentView == 'planning'" /> -->
    <Transport :isActive="currentView == 'transport'" />

    <LoadingOverlay ref="loading" />
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Background from "./components/Background.vue";

//import Meteo from "./views/Weather.vue";
import Menus from "./views/Menus.vue";
import Transport from "./views/NextTransports.vue";
//import Planning from "./views/NextClassRooms.vue";

import "./stylesheets/reset.css";

export default {
  name: "App",
  data() {
    return {
      currentView: "transport",
      views: {
        // weather: {
        //   time: 5000,
        // },
        transport: {
          time: 5000,
        },
        menus: {
          time: 5000,
        },
        // planning: {
        //   time: 5000,
        // },
      },
    };
  },
  methods: {
    getNextViewName() {
      switch (this.currentView) {
        // case "weather":
        //   return "transport";
        // case "transport":
        //   return "planning";
        case "transport":
          return "menus";
        case "menus":
          return "transport";
      }
    },
    changeView() {
      this.currentView = this.getNextViewName();
      setTimeout(() => {
        this.$refs.loading.show();
        this.$refs.background.next();
        setTimeout(this.changeView, 200);
      }, this.views[this.currentView].time);
    },
  },
  mounted() {
    this.changeView();
  },
  components: {
    LoadingOverlay,
    Background,
    //Meteo,
    Menus,
    Transport,
    // Planning,
  },
};
</script>

<style>
#app {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 1.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: "Poppins", sans-serif;
}

input {
  background-color: rgba(97, 97, 97, 0.2);
  border: none;
  padding: 10px;
  margin: 10px;
  color: rgb(255, 255, 255);
  transition: background-color 0.2s;
}
input:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

#menus {
  display: flex;
  justify-content: space-evenly;
}

.transport {
  display: flex;
  justify-content: space-around;
}

.view-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  height: 100vh;
}
</style>
