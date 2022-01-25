<template>
  <div class="view-container" v-show="isActive">
    <MenuCard restName="Sirtaki" :mealList="sirtakiMenu" />
    <MenuCard restName="SpaceCampus" :mealList="spaceMenu" />
  </div>
</template>

<script>
import MenuCard from "../components/MenuCard.vue";
import * as scrapMeal from "../scrapMeal.js";

export default {
  name: "AvailableClassRooms",
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

