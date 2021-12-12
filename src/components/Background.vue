<template>
  <div :style="`background-color: ${this.color};`" id="background-container">
    <transition
      v-for="(line, index) in lines"
      :key="index"
      :name="line.transition"
    >
      <object
        v-if="decorationStyle === 'lines'"
        :data="line.svg"
        :style="line.posStyle"
        class="line"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Background",
  props: {
    color: {
      type: String,
      required: true,
    },
    // decorationStyle: {
    //   type: String,
    // },
  },
  data() {
    return {
      decorationStyle: "lines",
      lines: [
        {
          svg: require("../assets/path1.svg"),
          posStyle: " left: -300px;",
          transition: "slide-left",
        },
        {
          svg: require("../assets/path2.svg"),
          posStyle: "right: -300px; bottom: -50vh;",
          transition: "slide-right",
        },
        {
          svg: require("../assets/path3.svg"),
          posStyle: "right: -300px;",
          transition: "slide-right",
        },
      ],
    };
  },
  methods: {
    next() {
      if (this.decorationStyle === "lines") this.decorationStyle = null;
      else this.decorationStyle = "lines";
    },
  },
};
</script>

<style>
.slide-left-leave-active {
  animation: slide-left 0.5s cubic-bezier(0.29, 1.68, 0.26, 0.84) reverse;
}
.slide-left-enter-active {
  animation: slide-left 0.5s cubic-bezier(0.29, 1.68, 0.26, 0.84);
}
.slide-right-leave-active {
  animation: slide-right 0.5s cubic-bezier(0.29, 1.68, 0.26, 0.84) reverse;
}
.slide-right-enter-active {
  animation: slide-right 0.5s cubic-bezier(0.29, 1.68, 0.26, 0.84);
}

@keyframes slide-left {
  0% {
    transform: translateX(-100vw);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-right {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(0);
  }
}

#background-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -10;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.line {
  position: absolute;
  height: 120vh;
}
</style>
