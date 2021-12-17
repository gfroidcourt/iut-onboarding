<template>
  <div id="menuCard">
    <div id="restName">{{ restName }}</div>
    <div id="mealList">
      <div style="font-weight: bold"> Entrées diverses </div>
      <br>
      <div style="font-weight: bold"> Plats : </div>
      <br>
      <div id="meal" v-for="meal in mealList" :key="meal">- {{ meal }}</div>
      <br>
      <div style="font-weight: bold"> Desserts divers </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: ["restName", "mealList"],
};
</script>



<style>
#menuCard {
  height: 75vh;
  font-size: 2em;
  display: flex;
  flex-direction: column;
  width: 35%;
  background-color: white;
  color: #4F4C4D;
  border-radius: 15px;
}

#restName {
  font-weight: bold;
  font-size: 1.4em;
  padding: 20px;
  border-bottom: 1px lightgray solid;
}

#mealList {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
}

#meal {
  padding: 10px;
}
</style>
