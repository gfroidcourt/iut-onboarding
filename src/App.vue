<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
    // delcarer les components importés ici
  },
  methods: {
    test() {
      console.log("Hey");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
