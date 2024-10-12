<template>
  <div id="loading-container">
    <div :style="progress" id="progress-bar"></div>
  </div>
</template>

<script>
export default {
  props: {
    view: Object,
  },
  data() {
    return {
      width: undefined,
      transition: undefined,
    };
  },
  computed: {
    progress() {
      return `width: ${this.width}; transition: ${
        this.transition
      }; animation-duration: ${this.view ? this.view.time() : 0}ms;`;
    },
  },
  watch: {
    view: {
      // eslint-disable-next-line no-unused-vars
      handler(oldVal, newVal) {
        if (oldVal === undefined) return;
        this.width = 0;
        this.transition = "width 0s";
        const delay = 1300;
        setTimeout(() => {
          this.transition = `width ${oldVal.time() - delay}ms linear`;
          this.width = "100%";
        }, delay);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#loading-container {
  height: 20px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);

  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
}

#progress-bar {
  height: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 0 5px 5px 0;
}
</style>
