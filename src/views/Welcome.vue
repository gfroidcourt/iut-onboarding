<template>
  <div class="view-container" v-show="isActive">
    <div class="view-content">
      <h1 class="view-title welcome-title">
        Bienvenue aux portes ouvertes de l'IUT informatique
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
};
</script>

<style>
.welcome-title {
    font-size: 80px;
    line-height: 100px;
}
</style>
