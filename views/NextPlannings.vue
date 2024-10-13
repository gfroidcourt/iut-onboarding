<template>
  <div v-show="isActive" class="view-container">
    <h1 class="view-title">
      {{ currentHourRangeStr }}
    </h1>
    <div id="columns">
      <!--Column for BUT1-->
      <div id="c1">
        <div class="view-content">
          <PlanningCard
            v-for="(data, index) in info_but1.slice(0, 2)"
            :key="index"
            :data="data"
          />
        </div>
        <div class="view-content">
          <PlanningCard
            v-for="(data, index) in info_but1.slice(2, 4)"
            :key="index"
            :data="data"
          />
        </div>
      </div>
      <!--Column for BUT2-->
      <div id="c2">
        <div class="view-content">
          <PlanningCard
            v-for="(data, index) in info_but2.slice(0, 2)"
            :key="index"
            :data="data"
          />
        </div>
        <div class="view-content">
          <PlanningCard
            v-for="(data, index) in info_but2.slice(2, 4)"
            :key="index"
            :data="data"
          />
        </div>
      </div>
      <!--Column for BUT3-->
      <div id="c3">
        <div class="view-content">
          <PlanningCard
            v-for="(data, index) in info_but3.slice(0, 2)"
            :key="index"
            :data="data"
          />
        </div>
        <div class="view-content">
          <PlanningCard
            v-for="(data, index) in info_but3.slice(2, 4)"
            :key="index"
            :data="data"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlanningCard from "../components/PlanningCard.vue";
import icals from "../icals.json";
import {HyperplanningScheduler} from "@xabi08yt/iutgradignanhpscheduler";

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
      info_but1: [],
      info_but2: [],
      info_but3: [],
      classes: [],
    };
  },
  components: {
    PlanningCard,
  },
  methods: {
    /**
     * Récupère tout le fichier icals.json et construit un objet quasi hydentique
     * mais avec des instance de Schedulers à la place des string d'icals.
     */
    generateGroupsSchedulers() {
      this.promos = [];
      let But3_done = false;
      Object.keys(icals).forEach((promo) => {
        if (
          promo === "info_but3_ALT" ||
          (promo === "info_but3_FI" && !But3_done)
        ) {
          this.promos.push("info_but3");
        }
        icals[promo].classes.forEach((c) => {
          this.classes.push({
            promotion: promo,
            className: c.className,
            classIcal: new HyperplanningScheduler(c.classIcal, { proxyUrl }),
            groups: c.groups
              ? {
                prime: new HyperplanningScheduler(c.groups.prime, {
                  proxyUrl,
                }),
                seconde: new HyperplanningScheduler(c.groups.seconde, {
                  proxyUrl,
                }),
              }
              : [],
          });
        });
      });
    },
    setCurrentHourRange() {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      if (currentTime < 9 * 60 + 45) {
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
      this.info_but1 = [];
      this.info_but2 = [];
      this.info_but3 = [];
      try {
        for (const c of this.classes) {
          c.classIcal.getEvents() // For a really stupid and wtf bug, a really stupid and wtf fix
          let primeEvent;
          let secondeEvent;
          const classEvent = await c.classIcal.getEvents()
            .then((events) => events.find(this.nextEventFilter));
          // eslint-disable-next-line eqeqeq
          if (!c.groups == undefined) {
            primeEvent = await c.groups.prime
              .getEvents()
              .then((events) => events.find(this.nextEventFilter));
            secondeEvent = await c.groups.seconde
              .getEvents()
              .then((events) => events.find(this.nextEventFilter));
          }

          if (classEvent !== undefined) primeEvent = classEvent;

          //Switching between columns depending on the promotion
          switch (c.promotion) {
            case "info_but1":
              this.info_but1.push({
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
                  primeEvent
                    ? primeEvent.locations[0].split(" ")[0]
                    : undefined,
                  secondeEvent
                    ? secondeEvent.locations[0].split(" ")[0]
                    : undefined,
                ],
              });
              break;
            case "info_but2":
              this.info_but2.push({
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
                  primeEvent
                    ? primeEvent.locations[0].split(" ")[0]
                    : undefined,
                  secondeEvent
                    ? secondeEvent.locations[0].split(" ")[0]
                    : undefined,
                ],
              });
              break;
            case "info_but3_FI":
            case "info_but3_ALT":
            case "info_but3":

              this.info_but3.push({
                className: `[${c.className.split(" ")[1]}] ${c.className.split(" ")[0]}`,
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
                  primeEvent
                    ? primeEvent.locations[0].split(" ")[0]
                    : undefined,
                  secondeEvent
                    ? secondeEvent.locations[0].split(" ")[0]
                    : undefined,
                ],
              });
              break;
            default:
              console.log("Unknown promotion.");
          }
        }
      } catch (e) {
        console.error("Failed to fetch plannings", e);
        this.nextClasses = [];
        // eslint-disable-next-line prefer-template
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

#columns {
  display: flex;
  flex-direction: row;
}
</style>
