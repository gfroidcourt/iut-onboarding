<template>
  <div class="view-container" v-show="isActive">
    <h1 class="view-title">Menus de ce midi</h1>
    <div class="view-content">
      <MenuCard restName="SpaceCampus" :mealList="spaceMenu" />
    </div>
  </div>
</template>

<script>
import MenuCard from "../components/MenuCard.vue";
import * as scrapMeal from "../scrapMeal.js";

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
    scrapMeal.getAllRestaurantsMenus().then((res) => {
      this.sirtakiMenu = res.sirtaki;
      this.spaceMenu = res.space;
    });
  },
};
</script>

