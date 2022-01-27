<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">Météo</h1>
    <WeatherCard />
  </div>
</template>

<script>

import WeatherCard from "../components/MeteoCard.vue";

export default {
  name: "TimeWeather",
  props: {
    isActive: Boolean,
  },
  components: {
    WeatherCard
  },
  methods: {},
};
</script>

<style scoped>
</style>
