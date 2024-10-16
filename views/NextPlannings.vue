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
import * as api from "../api";
import PlanningCard from "../components/PlanningCard.vue";
import icals from "../icals.json";

export default {
  props: {
    isActive: Boolean,
  },
  computed: {},
  data() {
    return {
      info_but1: [],
      info_but2: [],
      info_but3: [],
      currentHourRangeStr: "",
      refreshInterval: undefined,
      classes: [],
      fetched: false,
    };
  },
  components: {
    PlanningCard,
  },
  methods: {
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
    refresh() {
      api.getAllNextCourses(icals).then(
        (data) => {
          this.classes = data;
          this.getAllPlannings();
          console.log(data);
        }
     )
    },
    async getAllPlannings() {
      console.log("Refreshing plannings");
      this.setCurrentHourRange();
      this.info_but1 = [];
      this.info_but2 = [];
      this.info_but3 = [];
      try {
        for (const c of this.classes) {
          let primeEvent = c.groups.prime;
          let secondeEvent = c.groups.seconde;
          const classEvent = c.nextCourse;
          if(primeEvent == secondeEvent)

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
                    ? primeEvent.Matière
                    : undefined,
                  secondeEvent
                    ? secondeEvent.Matière
                    : undefined,
                ],
                teacher: [
                  primeEvent ? primeEvent.Enseignant: undefined,
                  secondeEvent ? secondeEventprimeEvent.Enseignant: undefined,
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
      this.fetched = true;
    },
  },
  mounted() {
    this.refresh()
    const delay = 1000 * 60 * 5; // Refresh toutes les 5 minutes
    this.refreshInterval = setInterval(this.refresh());
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
