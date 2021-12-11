<template>
  <div v-if="active" :style="backgroundStyle" id="loading-overlay-container">
    <img :src="logoIut" :style="imageStyle" />
  </div>
</template>

<script>
export default {
  name: "LoadingOverlay",
  data() {
    return {
      active: false,
      duration: 3000,
      logoIut: require("../assets/logo_iut.svg"),
    };
  },
  methods: {
    show(duration = 2000) {
      this.active = true;
      this.duration = duration;
      setTimeout(() => (this.active = false), duration);
    },
  },
  computed: {
    backgroundStyle() {
      return `animation: background-in linear alternate 2 ${
        this.duration / 2000
      }s`;
    },
    imageStyle() {
      return `animation: scale-in cubic-bezier(0.29, 1.68, 0.26, 0.84) alternate 2 ${
        this.duration / 2000
      }s`;
    },
  },
};
</script>

<style>

#loading-overlay-container {
  position: absolute;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#loading-overlay-container img {
  width: 300px;
  height: 300px;
}

#path {
  stroke-dasharray: 2000;
  animation: dash 2s linear infinite;
  position: absolute;
}

@keyframes dash {
  to {
    stroke-dashoffset: 3000;
  }
}

@keyframes background-in {
  0% {
    background-color: transparent;
  }
  10%,
  100% {
    background-color: rgb(163, 217, 238);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0);
  }
  50%,
  100% {
    transform: scale(1);
  }
}
</style>
