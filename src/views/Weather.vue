<template>
  <div class="view-container" v-show="isActive">
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
