<template>
  <div class="view-container" v-show="isActive">
    <div class="view-content">
        <img class="image" src="@/public/assets/maintainer_ad.png" alt="Maintainer" />
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
  height: 900px;
  margin-top: 100px !important;
}
</style>

