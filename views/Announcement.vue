<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce de l'Assopeña</h1>
        <div class="announcment">
          <h2>Toute la nuit du 31 octobre, c'est le Barathon d'Halloween ! <br/> 1500 personnes sont attendues, alors ramenez vos amis ! Scannez le QR code pour vous inscrire.</h2>
          <div id="AssoImg">
            <img src="@/public/assets/asso/asso.jpg" />
            <img src="@/public/assets/asso/qrcodeBarathon.png" />
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
    max-width: 325px;
    margin: 10px;
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
