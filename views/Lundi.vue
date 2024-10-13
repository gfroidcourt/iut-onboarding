<template>
    <div class="view-container" v-show="isActive">
      <div class="view-content">
          <img class="image" src="@/public/assets/lundi.png" alt="Lundi" />
      </div>
    </div>
 </template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
  components: {},
};
</script>

<style scoped>
.view-content > img {
  height: 800px;
  margin-top: 100px !important;
  padding: 25px;
  border-radius: 25px;
  background-color: white;
}
</style>
