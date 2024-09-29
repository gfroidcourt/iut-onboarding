<template>
    <div class="view-container" v-show="isActive">
        <h1 class="view-title">Annonce des enseignants</h1>
        <div class="announcment" id="Profs">
            <h2>Pour les deuxièmes et troisièmes année: Studio photo en 108 pour vos photos de CV ! <br/> Demandez à un enseignant de vous ouvrir la salle au besoin. </h2>
            <img src="https://cdn.icon-icons.com/icons2/1489/PNG/512/cameraoutline_102689.png" id="ProfQR">
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
#ProfQR {
  height: 425px;
  width: 425px;
}

#Profs {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#Profs h2 {
  font-size: 35px;
  font-family: Fredoka;
}
</style>
