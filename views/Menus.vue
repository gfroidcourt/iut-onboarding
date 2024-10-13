<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title" id="MenuViewTitle">Menus de ce midi</h1>
    <div class="view-content">
      <MenuCard restName="SpaceCampus" :mealList="spaceMenu" v-if="spaceEnabled" />
      <MenuCard restName="Sirtaki" :mealList="sirtakiMenu" v-if="sirtakiEnabled" />
    </div>
  </div>
</template>

<script>
import MenuCard from "../components/MenuCard.vue";
import * as api from "../api";

export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      sirtakiMenu: undefined,
      spaceMenu: undefined,
      sirtakiEnabled: true,
      spaceEnabled: true,
    };
  },
  components: {
    MenuCard,
  },
  mounted() {
    api.getAllRestaurantsMenus().then((res) => {
      this.sirtakiMenu = res.sirtaki;
      this.spaceMenu = res.space;

      //Désactivation des cartes à désactiver
      if(!res.sirtakiEnabled) {
        this.sirtakiEnabled = false;
      }
      if (!res.spaceEnabled) {
        this.spaceEnabled = false;
      }

      //Si aucun menu n'est récupérer, afficher une erreur.
      if (!res.spaceEnabled && !res.sirtakiEnabled) {
        document.getElementById("MenuViewTitle").innerHTML = "Erreur lors de la récupération des menus.";
      }
    });
  },
};
</script>
