<template>
  <div
    style="background-color: #a391e5"
    class="view-container"
    v-show="isActive"
  >
    <div>
      <img style="width: 200px" class="logo" :src="logoIut" />
      <h1
        style="padding: 80px; font-size: 60px; color: white; padding-top: 10px"
      >
        IUT Informatique
      </h1>
      <h1 style="padding: 80px; font-size: 60px; display: flex; justify-content: space-evenly;" class="view-title">
        Bienvenue <div class="wave-hand">👋</div>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      logoIut: require("../assets/logo_iut.svg"),
    };
  },
};
</script>

<style scoped>
.wave-hand {
  animation: hand 1s infinite ease-in-out;
  transform-origin: 40px 40px;
}

.logo {
  animation: pump 3s infinite ease-in-out;
}

@keyframes hand {
  0% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(30deg);
  }
}

@keyframes pump {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
