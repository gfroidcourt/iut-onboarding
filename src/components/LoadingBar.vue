<template>
  <div id="loading-bar"></div>
</template>

<script>
export default {
  props: {
    time: Number,
  },
}
</script>

<style scoped>
#loading-bar {
  height: 20px;
  width: 100%;
  background-color: red;
}
</style>