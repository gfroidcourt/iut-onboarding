<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce de l'Assopeña</h1>
        <div class="announcment">
            <img src="../dataAsso/assets/Affiche_Bar_25.png" id="AssoImg">
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
    height: 625px;
    width: 425px;
}

.announcment {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  padding: 25px;
  display: flex;
  flex-direction: row;
}
</style>
