<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">🎉🎉 Bienvenue à l'IUT de gradignan ! 🎉🎉</h1>
    <div class="announcment" id="WelcomeMessage">
      <h2>
        Un accueil à 13h avec un café gourmand vous est proposé au 1er étage. <br/>Si vous arrivez vers 13h45, un étudiant viendra vous accueillir dans le hall.
      </h2>
      <img src="https://img.freepik.com/photos-gratuite/mot-bienvenue-disponible-lancement-ouvert_53876-124476.jpg?semt=ais_hybrid"/>
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
