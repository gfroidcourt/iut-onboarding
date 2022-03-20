<template>
  <div v-show="isActive" class="view-container">
    <h1 class="view-title">
      {{ currentHourRangeStr }}
    </h1>
    <div class="view-content">
      <PlanningCard
        v-for="(data, index) in nextClasses.slice(0, 4)"
        :key="index"
        :data="data"
      />
    </div>
    <div class="view-content">
      <PlanningCard
        v-for="(data, index) in nextClasses.slice(4, 8)"
        :key="index"
        :data="data"
      />
    </div>
  </div>
</template>

<script>
import PlanningCard from "../components/PlanningCard.vue";
import { HyperplanningScheduler } from "scheduler";
import icals from "../icals.json";

const proxyUrl = "/api/scheduler/hyperplanning/:schedulerId/:dateParameter";

export default {
  props: {
    isActive: Boolean,
  },
  computed: {},
  data() {
    return {
      currentHourRangeStr: "",
      refreshInterval: undefined,
      nextClasses: [],
      classes: [],
    };
  },
  components: {
    PlanningCard,
  },
  methods: {
    generateGroupsSchedulers() {
      // {
      //     className: "s4p2d",
      //     classIcal: new HyperplanningScheduler(
      //       "6F7797DCA965970BD07CE67C30ADAB97",
      //       { proxyUrl }
      //     ),
      //     groups: {
      //       prime: new HyperplanningScheduler(
      //         "D0BB69B13D6E71C2FE3DCC2A1B088CAB",
      //         { proxyUrl }
      //       ),
      //       seconde: new HyperplanningScheduler(
      //         "1D982B81521687C43A8E36075F08B71B",
      //         { proxyUrl }
      //       ),
      //     },
      //   },
      icals.filter(i => i.type == "group").forEach((ical) => {
        this.classes.push({
          className: ical.group,
          classIcal: new HyperplanningScheduler(ical.ical, { proxyUrl }),
        });
      });
      console.log(icals);
    },
    setCurrentHourRange() {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      if (currentTime < 9 * 60 + 30) {
        // < 09h30
        this.currentHourRangeStr = "8h15 - 10h00";
      } else if (currentTime < 11 * 60 + 30) {
        // < 11h30
        this.currentHourRangeStr = "10h25 - 12h15";
      } else if (currentTime < 15 * 60 + 30) {
        // < 15h30
        this.currentHourRangeStr = "14h00 - 15h50";
      } else {
        // > 15h30
        this.currentHourRangeStr = "16h10 - 18h00";
      }
    },
    nextEventFilter(event) {
      // Actual time in minutes relatives to 00:00 of the current day (Ex: 420 for 07:00am)
      let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      const eventStartTime =
        event.dateStart.getHours() * 60 + event.dateStart.getMinutes();
      const eventEndTime =
        event.dateEnd.getHours() * 60 + event.dateEnd.getMinutes();

      // Cas spécial -> afficher les cours de 14h entre 11h30 et 13h30
      if (currentTime > 11 * 60 + 30 && currentTime < 13 * 60 + 30)
        currentTime += 2 * 60; // On fais croire qu'il est h+2, soit entre 13h30 et 15h30

      // Display this event 30min before it starts and stop displaying it 30 mins before it ends.
      return (
        currentTime > eventStartTime - 30 && currentTime < eventEndTime - 30
      );
    },
    async getAllPlannings() {
      console.log("Refreshing plannings");
      this.setCurrentHourRange();
      this.nextClasses = [];
      try {
        for (const c of this.classes) {
          const classEvent = await c.classIcal
            .getEvents()
            .then((events) => events.find(this.nextEventFilter));
          let primeEvent = await c.groups.prime
            .getEvents()
            .then((events) => events.find(this.nextEventFilter));
          const secondeEvent = await c.groups.seconde
            .getEvents()
            .then((events) => events.find(this.nextEventFilter));

          if (classEvent !== undefined) primeEvent = classEvent;

          this.nextClasses.push({
            className: c.className,
            isFullClass: classEvent !== undefined,
            type: [
              primeEvent ? primeEvent.type : undefined,
              secondeEvent ? secondeEvent.type : undefined,
            ],
            subject: [
              primeEvent
                ? primeEvent.subject.split(" ").slice(1).join(" ")
                : undefined,
              secondeEvent
                ? secondeEvent.subject.split(" ").slice(1).join(" ")
                : undefined,
            ],
            teacher: [
              primeEvent ? primeEvent.teachers.join(" - ") : undefined,
              secondeEvent ? secondeEvent.teachers.join(" - ") : undefined,
            ],
            room: [
              primeEvent ? primeEvent.locations[0] : undefined,
              secondeEvent ? secondeEvent.locations[0] : undefined,
            ],
          });
        }
      } catch (e) {
        console.error("Failed to fetch plannings", e);
        this.nextClasses = [];
        this.currentHourRangeStr = "Si si tu as cours, c'est juste un bug :)";
      }
    },
  },
  mounted() {
    this.generateGroupsSchedulers();
    this.getAllPlannings();
    const delay = 1000 * 60 * 5; // Refresh toutes les 5 minutes
    this.refreshInterval = setInterval(this.getAllPlannings, delay);
  },
  unmounted() {
    clearInterval(this.refreshInterval);
  },
};
</script>

<style scoped>
span {
  width: 100%;
  font-weight: bold;
}
</style>
