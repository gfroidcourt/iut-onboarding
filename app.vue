<template>
  <div class="view-container">
    <Background ref="background" />

    <DateAndHourHeader />
    <Lundi
      v-if="Object.keys(views).includes('lundi')"
      :isActive="currentView == 'lundi'"
    />
    <Mardi
      v-if="Object.keys(views).includes('mardi')"
      :isActive="currentView == 'mardi'"
    />
    <Mercredi
      v-if="Object.keys(views).includes('mercredi')"
      :isActive="currentView == 'mercredi'"
    />
    <Jeudi
      v-if="Object.keys(views).includes('jeudi')"
      :isActive="currentView == 'jeudi'"
    />
    <Vendredi
      v-if="Object.keys(views).includes('vendredi')"
      :isActive="currentView == 'vendredi'"
    />
    <Menus
      v-if="Object.keys(views).includes('menus')"
      :isActive="currentView == 'menus'"
    />
    <Planning
        v-if="Object.keys(views).includes('planning')"
        :isActive="currentView == 'planning'"
      />
    <client-only>
      <Transport
        v-if="Object.keys(views).includes('transport')"
        :isActive="currentView == 'transport'"
      />
      <Weather
        v-if="Object.keys(views).includes('weather')"
        :isActive="currentView == 'weather'"
      />
    </client-only>
    <Discord
      v-if="Object.keys(views).includes('discord')"
      :isActive="currentView == 'discord'"
    />
    <MaintainerProposal
      v-if="Object.keys(views).includes('maintainer')"
      :isActive="currentView == 'maintainer'"
    />
    <Announcement
      v-if="Object.keys(views).includes('announcement')"
      :isActive="currentView == 'announcement'"
    />
    <Announcement2
      v-if="Object.keys(views).includes('announcement')"
      :isActive="currentView == 'announcement2'"
    />
    <TeacherAnnouncement
      v-if="Object.keys(views).includes('tannouncement')"
      :isActive="currentView == 'tannouncement'"
    />
    <WelcomeAmericans
      v-if="Object.keys(views).includes('welcAmericans')"
      :isActive="currentView == 'welcAmericans'"
    />
    <LoadingBar :view="views[currentView]" />
    <TransitionOverlay ref="loading" />
  </div>
</template>

<script>
import DateAndHourHeader from "./components/DateHourHeader.vue";
import TransitionOverlay from "./components/TransitionOverlay.vue";
import Background from "./components/Background.vue";
import LoadingBar from "./components/LoadingBar.vue";

import Menus from "./views/Menus.vue";
import Transport from "./views/Transport.vue";
import Weather from "./views/Weather.vue";
import Planning from "./views/NextPlannings.vue";
import Discord from "./views/Discord.vue";
import MaintainerProposal from "./views/MaintainerProposal.vue";

import "./stylesheets/reset.css";
import Announcement from "./views/Announcement.vue";
import Announcement2 from "./views/Announcement2.vue";
import TeacherAnnouncement from "./views/TeacherAnnouncement.vue";
import WelcomeAmericans from "./views/WelcomeMessage.vue";
import Lundi from "./views/Lundi.vue";
import Mardi from "./views/Mardi.vue";
import Mercredi from "./views/Mercredi.vue";
import Jeudi from "./views/Jeudi.vue";
import Vendredi from "./views/Vendredi.vue";

const DEVELOPEMENT_MODE = false;

export default {
  data() {
    return {
      currentView: "planning",
      views: {
        /*
          To active only one or some views, juste comment here what you dont want to be
          displayed.
          If only one view is uncommented, the slide show will be disabled (Usefull for development).

          The order in the object is the display order
        */
        lundi: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => true && !this.isEndOfDay() && new Date().getDay() === 1,
        },
        mardi: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => true && !this.isEndOfDay() && new Date().getDay() === 2,
        },
        mercredi: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => true && !this.isEndOfDay() && new Date().getDay() === 3,
        },
        jeudi: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => true && !this.isEndOfDay() && new Date().getDay() === 4,
        },
        vendredi: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => true && !this.isEndOfDay() && new Date().getDay() === 5,
        },
        planning: {
          time: () => DEVELOPEMENT_MODE ? 5000 : this.returnTimeForPlanning(),
          allowed: () => {
            // 6h to 17h30
            const currentTime =
            new Date().getHours() * 60 + new Date().getMinutes();
            return currentTime >= 6 * 60 && currentTime <= 17 * 60 + 30;
          }
        },
        transport: {
          time: () => DEVELOPEMENT_MODE ? 10000 : this.getTimeForBusesAndWeather(),
          allowed: () => true,
        },
        weather: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 7 * 1000,
          allowed: () => true,
        },
        menus: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 15,
          allowed: () => {
            // 6h to 14h
            let currentHour = new Date().getHours();
            return currentHour >= 6 && currentHour < 14;
          },
        },
        /* Enable this at the start of each year (The QR code has to be updated)*/
        discord: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => false,
        },
        /* Enable when looking for new maintainers */
        maintainer: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 10,
          allowed: () => false && !this.isEndOfDay(),
        },
        announcement: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => false && !this.isEndOfDay(),
        },
        announcement2: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => false && !this.isEndOfDay(),
        },
        tannouncement: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 7,
          allowed: () => false && !this.isEndOfDay(),
        },
        welcAmericans: {
          time: () => DEVELOPEMENT_MODE ? 10000 : 1000 * 10,
          allowed: () => false && !this.isEndOfDay(),
        }
      },
    };
  },
  methods: {

    /**
     * @return If the courses of the day are finished.
     */

    isEndOfDay() {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      return currentTime > (17 * 60 + 30);
    },

    /**
     * @return the time to show the weather and transport card depending on current Hour
     */
    getTimeForBusesAndWeather() {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      if(currentTime > 17 * 60 + 30) {
        return 60000;
      }
      return 7000;
    },

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

      setTimeout(() => {
        this.$refs.loading && this.$refs.loading.show();
        this.$refs.background && this.$refs.background.next();
        setTimeout(this.changeView, 200);
      }, this.views[this.currentView].time());
    },
    /**
     * Return true if the view allowed to be displayed is the Planning only
     * This method is used to ensure that 5 minutes before the end of the each break only the Planning is displayed,
     * and not the other views.
     * @return {boolean}
     */
    onlyPlanning() {
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();
      switch (currentHour) {
        case 8:
          return currentMinutes >= 10 && currentMinutes < 20;
        case 10:
          return currentMinutes >= 20 && currentMinutes < 30;
        case 13:
          return currentMinutes >= 55 && currentMinutes <= 59;
        case 16:
          return currentMinutes >= 5 && currentMinutes < 10;
        default:
          return false;
      }
    },
    /**
     * Return the time in ms before the next view is displayed (after the planning)
     * @return {number}
     */
    returnTimeForPlanning() {
      if (this.onlyPlanning())
        return 1000 * 60 * 10; // Forcing for 10 minutes
      return 1000 * 10;
    },
  },
  mounted() {
    this.$refs.background && this.$refs.background.next();
    this.changeView();
  },
  components: {
    Planning,
    TransitionOverlay,
    Background,
    Lundi,
    Mardi,
    Mercredi,
    Jeudi,
    Vendredi,
    Menus,
    Transport,
    Weather,
    DateAndHourHeader,
    LoadingBar,
    Discord,
    MaintainerProposal,
    Announcement,
    Announcement2,
    TeacherAnnouncement,
    WelcomeAmericans,
  },
};
</script>

<style>
body {
  font-family: Poppins, sans-serif;
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
