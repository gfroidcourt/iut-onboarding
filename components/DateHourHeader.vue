<template>
  <div id="header">
    <p>{{ currentDate }}</p>
    <p>{{ currentTime }}</p>
    <img style="width: 150px; margin-left: 150px;" src="/assets/logo_iut_noel.png" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: "",
      currentDate: "",
      currentTimeInterval: undefined,
      currentDateInterval: undefined,
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = new Date().toLocaleTimeString("fr-FR").split(" ")[0];
    },
    updateCurrentDate() {
      this.currentDate = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "2-digit",
      });
    },
  },
  mounted() {
    this.updateCurrentTime();
    this.updateCurrentDate();
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000); // Refresh every seconds
    this.currentDateInterval = setInterval(this.updateCurrentDate, 3600000); // Refresh evry hours
  },
  unmounted() {
    clearInterval(this.currentTimeInterval);
    clearInterval(this.currentDateInterval);
  },
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95vw;
  font-size: 1.25em;
  position: absolute;
  top: 0.5em;
  color: rgb(38, 48, 48);
}

#header > img {
  filter: invert(0.7);
  width: 150px;
}

#header > p {
  width: 320px;
  text-align: center;
  font-size: 32px;
}

#header > p:last-of-type {
  font-size: 44px;
}
</style>
