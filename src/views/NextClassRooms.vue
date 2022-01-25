<template>
    <div class="view-container" v-show="isActive">

    </div>
</template>

<script>
export default {
  name: "NextClassRooms",
  props: {
    isActive: Boolean,
  },
  components: {
    // déclarer les components importés ici
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
