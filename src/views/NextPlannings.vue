<template>
  <div v-show="isActive" class="view-container">
    <h1 class="view-title">
      {{ currentHourRange }}
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

export default {
  name: "NextPlannings",
  props: {
    isActive: Boolean,
  },
  computed: {
    currentHourRange() {
      const currentHour = new Date().getHours();
      if (currentHour < 9) return "8h15 - 10h00";
      if (currentHour < 11) return "10h25 - 12h15";
      if (currentHour < 15) return "14h00 - 15h50";
      return "16h10 - 18h00";
    },
  },
  data() {
    return {
      nextClasses: [],
      classes: [
        // ---------- S2
        {
          className: "s2a",
          classIcal: new HyperplanningScheduler(
            "CE8638F9B59C0A35C2CF4CDB41051C0E"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "0FA68EE12FDCA4C2657C36B8B9558050"
            ),
            seconde: new HyperplanningScheduler(
              "B71C6DC006B737F0FCEDA822471A639A"
            ),
          },
        },
        {
          className: "s2b",
          classIcal: new HyperplanningScheduler(
            "6D7C13B82DE9CDA42C78A252BD570B2D"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "4E606F7C099919719D7DE7DA4CFE1B8F"
            ),
            seconde: new HyperplanningScheduler(
              "CDD881675EF00C31504AAAA994DD3BC2"
            ),
          },
        },
        {
          className: "s2c",
          classIcal: new HyperplanningScheduler(
            "39C323F7C3BD91E014C4FDC40C7FCDBA"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "8F4171703614E0BAA7ACF1F914EBCABC"
            ),
            seconde: new HyperplanningScheduler(
              "5D857710462242730F70F6CB91FD4E26"
            ),
          },
        },
        {
          className: "s2d",
          classIcal: new HyperplanningScheduler(
            "AD951FB0BE4A6840E6B8D7E15F78D6A3"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "CE7C0306EF8DF4DD2FB9F0D1AB9599F2"
            ),
            seconde: new HyperplanningScheduler(
              "D825CB8CEA48FFBC6CCF39B233A5EB26"
            ),
          },
        },
        // --------- S4 ----------
        {
          className: "s4p1a",
          classIcal: new HyperplanningScheduler(
            "00C1354F35A00111FCB402037094EAD6"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "1E2215B0BB4EDB1B6CE854D54835D63A"
            ),
            seconde: new HyperplanningScheduler(
              "9DD89A30CC73C87FDEAED896EC0346EE"
            ),
          },
        },
        {
          className: "s4p2b",
          classIcal: new HyperplanningScheduler(
            "447BD7694D284EC94EC9118808058402"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "F15605CE20E596BBFB8B1CE48E746263"
            ),
            seconde: new HyperplanningScheduler(
              "90FFE04255DB88BE6382F443A2884B1A"
            ),
          },
        },
        {
          className: "s4p2c",
          classIcal: new HyperplanningScheduler(
            "2151B33366B4E8315DFB481C314E3D32"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "322B4F0A5FA48D15A1682EB03FE39F9E"
            ),
            seconde: new HyperplanningScheduler(
              "B618BE9003219E29C8853F07CFCD2985"
            ),
          },
        },
        {
          className: "s4p2d",
          classIcal: new HyperplanningScheduler(
            "6F7797DCA965970BD07CE67C30ADAB97"
          ),
          groups: {
            prime: new HyperplanningScheduler(
              "D0BB69B13D6E71C2FE3DCC2A1B088CAB"
            ),
            seconde: new HyperplanningScheduler(
              "1D982B81521687C43A8E36075F08B71B"
            ),
          },
        },
      ],
    };
  },
  components: {
    PlanningCard,
  },
  methods: {
    nextEventFilter(event) {
      const currentHour = new Date().getHours();
      //const currentHour = 10;
      // const currentMinute = 0;
      const currentMinute = new Date().getMinutes();
      const currenttHourMinute = currentHour * 60 + currentMinute;
      const startHour = event.dateStart.getHours();
      const startMinute = event.dateStart.getMinutes();
      const startHourMinute = startHour * 60 + startMinute;
      const endHour = event.dateEnd.getHours();
      const endMinute = event.dateEnd.getMinutes();
      const endHourMinute = endHour * 60 + endMinute;

      return (
        currenttHourMinute > startHourMinute - 30 &&
        currenttHourMinute < endHourMinute - 30
      );
    },
    async getAllPlannings() {
      this.nextClasses = [];
      for (const c of this.classes) {
        const classEvent = await c.classIcal
          .setDate("2022-02-02")
          .getEvents()
          .then((events) => events.find(this.nextEventFilter));
        let primeEvent = await c.groups.prime
          .setDate("2022-02-02")
          .getEvents()
          .then((events) => events.find(this.nextEventFilter));
        const secondeEvent = await c.groups.seconde
          .setDate("2022-02-02")
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
    },
  },
  mounted() {
    this.getAllPlannings();
  },
};
</script>

<style scoped>
span {
  width: 100%;
  font-weight: bold;
}
</style>
