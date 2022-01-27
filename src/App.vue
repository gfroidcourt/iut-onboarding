<template>
  <div class="view-container">
    <Background ref="background" />

    <!-- <Meteo :isActive="currentView == 'weather'" />  DISABLE (NEED #36 TO BE FIXED) -->
    <Menus :isActive="currentView == 'menus'" />
    <Planning :isActive="currentView == 'planning'" />
    <Transport :isActive="currentView == 'transport'" />

    <LoadingOverlay ref="loading" />
  </div>
</template>

<script>
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Background from "./components/Background.vue";
import Menus from "./views/Menus.vue";
import Transport from "./views/NextTransports.vue";
import Meteo from "./views/Weather.vue";
import Planning from "./views/NextPlannings.vue";

import "./stylesheets/reset.css";

export default {
  name: "App",
  data() {
    return {
      currentView: "transport",
      views: {
        // transport: {
        //   time: 5000,
        //   allowed: () => true, // TO DO
        // },
        // menus: {
        //   time: 5000,
        //   allowed: () => true, // TO DO
        // },
        planning: {
          time: 5000,
          allowed: () => true, // TO DO
        },
        // weather: { // DISABLE (NEED #36 TO BE FIXED)
        //   time: 5000,
        //   allowed: () => true // TO DO
        // },
      },
    };
  },
  methods: {
    /**
     * @return the name of the next view that will be displayed
     */
    getNextViewName() {
      const viewTypes = Object.keys(this.views);
      let nextView = viewTypes[viewTypes.indexOf(this.currentView) + 1];
      if (nextView === undefined) nextView = viewTypes[0];
      return nextView;
    },
    changeView() {
      // WIP - View manager logic as to be made here

      // TO DO
      // - Better timings
      // - Handling allowed functions

      this.currentView = this.getNextViewName();
      setTimeout(() => {
        // this.$refs.loading && this.$refs.loading.show();
        this.$refs.background && this.$refs.background.next();
        // setTimeout(this.changeView, 200);
      }, this.views[this.currentView].time);
    },
  },
  mounted() {
    this.changeView();
  },
  components: {
    LoadingOverlay,
    Background,
    // eslint-disable-next-line vue/no-unused-components
    Meteo,
    Menus,
    Transport,
    Planning,
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
  flex-wrap: wrap;

  height: 100vh;
  overflow: hidden; /* Hide scroll-bars */
}
</style>
