<template>
  <div id="menuCard">
    <span id="restName">{{ restName }}</span>
    <div id="mealList">
      <div id="meal" v-for="meal in mealList || []" :key="meal">
        - {{meal}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: {
    restName: String,
    mealList: Object
  },
};
</script>
<style scoped>

#menuCard {
  height: 75vh;
  font-size: 2em;
  display: flex;
  flex-direction: column;
  width: 35%;
  background-color: white;
  color: #4f4c4d;
  border-radius: 15px;
}

#mealList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#restName {
  font-weight: bold;
  font-size: 1.4em;
  padding: 20px;
  border-bottom: 1px lightgray solid;
}

#meal {
  padding: 30px;
}
</style>
