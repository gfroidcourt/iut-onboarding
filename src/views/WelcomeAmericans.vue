<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">🎉🎉 Welcome to the IUT of Gradignan ! 🎉🎉</h1>
    <div class="announcment" id="WelcomeMessage">
      <h2>
        Starting from Monday, June 17th and for the two following weeks, <br /> we are welcoming American peaple here !
        Enjoy your time with us !
      </h2>
      <img src="../assets/US_Flag.png">
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
    };
  }
};
</script>
<style>
#WelcomeMessage {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 35px;
  font-family: Fredoka;
}

#WelcomeMessage img {
  height:425px;
  margin-top: 25px;
}
</style>
