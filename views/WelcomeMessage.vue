<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">🎉🎉 Bienvenue à l'IUT de gradignan ! 🎉🎉</h1>
    <div class="announcment" id="WelcomeMessage">
      <h2>
        A tous ceux qui intègrent pour la première fois l'IUT, <br /> nous sommes ravis de vous accueillir parmi nous. <br /> N'hésitez pas à poser des questions !
      </h2>
      <img src="https://framerusercontent.com/images/9GOLkRv44U9bspljOXgIWwdQk.png"/>
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
