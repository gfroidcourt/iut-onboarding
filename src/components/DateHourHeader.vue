<template>
  <div id="header">
    <span>{{ currentDate }}</span>
    <span>{{ currentTime }}</span>
    <img :src="logoIut" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoIut: require("../assets/logo_iut.svg"),
      currentTime: "",
      currentDate: "",
      currentTimeInterval: undefined,
      currentDateInterval: undefined,
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = new Date().toLocaleTimeString();
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
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000);
    this.currentDateInterval = setInterval(this.updateCurrentDate, 1000);
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
  color: rgb(68, 71, 71);
}

#header > img {
  filter: invert(0.7);
}

#header > span:last-of-type {
  width: 20%;
  text-align: left;
  font-size: 1.75em;
}

</style>
