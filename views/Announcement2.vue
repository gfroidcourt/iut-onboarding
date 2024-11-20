<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce de l'Assopeña</h1>
        <div class="announcment">
            <h2>Mardi prochain, c'est téléthon ! Achetez un petit déj' pendant une pause exceptionnellement rallongée !</h2>
            <img src="@/public/assets/asso/telethon.png" id="AssoImg2"/>
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
#AssoImg2 {
    height: 625px;
    width: 525px;
    margin-top: 25px;
}
</style>
