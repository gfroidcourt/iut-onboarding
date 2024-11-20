<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce de l'Assopeña</h1>
        <div class="announcment">
          <h2>Vous voulez des défis pendant toute une nuit ? Les inscriptions, c'est par ici !</h2>
          <div id="AssoImg">
            <img src="@/public/assets/asso/post3.jpg" />
          </div>
        </div>
    </div>
</template>
<script>
export default{
  props: {
    isActive: Boolean,
  }
};
</script>
<style>

#AssoImg {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#AssoImg > img {
    max-height: 425px;
    max-width: 425px;
    margin: 10px;
    width: 425px;
    height: 425px;
}

.announcment {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  padding: 25px;
  display: flex;
  flex-direction: column !important;
  align-items: center;
}

h2 {
  font-family: Fredoka, sans-serif;
  font-size: 35px;
}
</style>
