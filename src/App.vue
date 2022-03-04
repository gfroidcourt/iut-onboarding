<template>
  <div class="view-container">
    <Background ref="background" />

    <DateAndHourHeader />
    <Menus
      v-if="Object.keys(views).includes('menus')"
      :isActive="currentView == 'menus'"
    />
    <Planning
      v-if="Object.keys(views).includes('planning')"
      :isActive="currentView == 'planning'"
    />
    <TransportWeather
      v-if="Object.keys(views).includes('transportWeather')"
      :isActive="currentView == 'transportWeather'"
    />
    <LoadingBar
      :view="views[currentView]"
    />
    <LoadingOverlay ref="loading" />
  </div>
</template>

<script>
import DateAndHourHeader from "./components/DateHourHeader.vue";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import Background from "./components/Background.vue";
import Menus from "./views/Menus.vue";
import TransportWeather from "./views/TransportWeather.vue";
import Planning from "./views/NextPlannings.vue";
import LoadingBar from "./components/LoadingBar.vue";

import "./stylesheets/reset.css";

const DEVELOPEMENT_MODE = false;

export default {
  data() {
    return {
      currentView: "transport",
      views: {
        /*
          To active only one or some views, juste comment here what you dont want to be
          displayed.
          If only one view is uncommented, the slide show will be disabled (Usefull for development).

          The order in the object is the display order
        */
        planning: {
           time: DEVELOPEMENT_MODE ? 5000 : 1000 * 30,
           allowed: () => {
             // 6h to 17h
             const currentHour = new Date().getHours();
             return currentHour >= 6 && currentHour <= 17;
           },
         },
        transportWeather: {
          time: DEVELOPEMENT_MODE ? 10000 : 1000 * 20,
          allowed: () => {
            // 10h to 20h
            let currentHour = new Date().getHours();
            return currentHour >= 10 && currentHour <= 20;
          },
        },
        menus: {
          time: DEVELOPEMENT_MODE ? 10000 : 1000 * 20,
          allowed: () => {
            // 6h to 14h
            let currentHour = new Date().getHours();
            return currentHour >= 6 && currentHour < 14;
          },
        },
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
    /**
     * Change the actual view
     *
     * Will display only allowed views (Hour range is currently valid)
     */
    changeView() {
      this.currentView = this.getNextViewName();
      if (
        this.views[this.currentView].allowed() === false &&
        !DEVELOPEMENT_MODE
      ) {
        this.changeView();
        return;
      }

      if (Object.keys(this.views).length <= 1)
        //Detect we've commented all views except one
        return; // (Disable slide show)

      setTimeout(
        () => {
          this.$refs.loading && this.$refs.loading.show();
          this.$refs.background && this.$refs.background.next();
          setTimeout(this.changeView, 200);
        },
        this.views[this.currentView].time
      );
    },
  },
  mounted() {
    this.$refs.background && this.$refs.background.next();
    this.changeView();
  },
  components: {
    LoadingOverlay,
    Background,
    Menus,
    TransportWeather,
    Planning,
    DateAndHourHeader,
    LoadingBar,
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
  flex-direction: column;

  height: 100vh;
  overflow: hidden; /* Hide scroll-bars */
}

.view-content {
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.view-title {
  margin-top: 90px;
  min-width: 400px;

  background-color: white;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);

  color: rgb(73, 72, 72);

  line-height: 43px;

  font-size: 37px;
  font-weight: 800;
  padding: 30px 50px;
  border-radius: 30px;
}
</style>
