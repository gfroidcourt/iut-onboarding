<template>
  <div id="loading-container">
    <div :style="progress" id="progress-bar"></div>
  </div>
</template>

<script>
export default {
  props: {
    time: Number,
  },
  computed: {
    progress() {
      return `animation: progress linear ${this.time} infinite;`;
    },
  },
  watch: {
    time(oldVal, newVal) {
    },
  },
};
</script>

<style scoped>
#loading-container {
  height: 40px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);

  position: fixed;
  bottom: 0;
}
#progress-bar {
  height: 100%;
  background-color: rgb(255, 255, 255);
}

@keyframes progress {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
