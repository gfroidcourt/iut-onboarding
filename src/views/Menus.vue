<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title" id="MenuViewTitle">Menus de ce midi</h1>
    <div class="view-content">
      <MenuCard restName="SpaceCampus" :mealList="spaceMenu" />
      <MenuCard restName="Sirtaki" :mealList="sirtakiMenu" />
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
    };
  },
  components: {
    MenuCard,
  },
  mounted() {
    api.getAllRestaurantsMenus().then((res) => {
      this.sirtakiMenu = res.sirtaki;
      this.spaceMenu = res.space;
      if(!res.sirtakiEnabled) {
        document.getElementsByClassName("view-content")[0].childNodes[1].style.display = "none";
      }
      if (!res.spaceEnabled) {
        document.getElementsByClassName("view-content")[0].childNodes[0].style.display = "none";
      }

      if (!res.spaceEnabled && !res.sirtakiEnabled) {
        document.getElementById("MenuViewTitle").innerHTML = "Erreur lors de la récupération des menus.";
      }
    });
  },
};
</script>
