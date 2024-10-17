<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce de l'Assopeña</h1>
        <div class="announcment">
          <h2>Pour bien commencer la dernière semaine, le lundi 21/10/2024, le BDE vends des crêpes 0.5€ l'unité ! <br/> Une offre spéciale thé + 1 crêpe est disponible à 0.80€ !</h2>
          <img src="@/public/assets/asso/assoCrepes.png" id="AssoImg" />
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
    max-height: 425px;
    max-width: 325px;
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
