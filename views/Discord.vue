<template>
    <div class="view-container" v-show="isActive">
      <h1 class="view-title">Rejoignez le Discord de l'IUT informatique !</h1>
      <div class="view-content">
        <DiscordCard />
      </div>
    </div>
  </template>

<script>
import DiscordCard from "../components/DiscordCard.vue";

export default {
  props: {
    isActive: Boolean,
  },
  components: {
    DiscordCard,
  },
};
</script>
