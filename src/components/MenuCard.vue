<template>
  <div id="menu-card">
    <div class="card-header">
      <p>{{ restName }}</p>
    </div>
    <div class="meal-list">
      <div class="meal" v-for="meal in mealList || []" :key="meal">
        - {{meal}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    restName: String,
    mealList: Object
  },
};
</script>
<style scoped>

#menu-card {
  width: 600px;
  height: 700px;

  display: flex;
  flex-direction: column;
  background-color: white;

  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.card-header {
  padding: 20px 0 20px 0;
  width: 100%;

  border-bottom: solid 3px rgb(230, 230, 230);
  font-size: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-header > p {
  color: rgb(230, 141, 57);
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
}

.meal-list {
  color: #4f4c4d;
  height: 100%;
  width: 100%;

  font-size: 33px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.meal {
  padding: 5px 10px;
}
</style>
