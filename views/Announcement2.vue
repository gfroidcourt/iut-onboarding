<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce de l'Assopeña</h1>
        <div class="announcment">
            <h2>Intéressé(e) par un tournois Super Smash Bros ? Scan-moi !</h2>
            <img src="@/public/assets/asso/smash.png" id="AssoImg2"/>
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
    height: 525px;
    width: 525px;
    margin-top: 25px;
}
</style>
