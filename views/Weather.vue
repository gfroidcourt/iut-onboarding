<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">Météo</h1>
    <div class="view-content">
      <WeatherCard />
    </div>
  </div>
</template>

<script>
import WeatherCard from "../components/WeatherCard.vue";

export default {
  props: {
    isActive: Boolean,
  },
  components: {
    WeatherCard,
  },
};
</script>

