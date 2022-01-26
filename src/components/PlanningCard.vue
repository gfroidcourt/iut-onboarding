<template>
  <div id="planningcard">
    <h1 class="card-header">{{ data.className.toUpperCase() }}</h1>
    <!-- Si on est en classe entière -->
    <template v-if="data.isFullClass">
      <div class="row">
        <p>{{ data.type[0] }}</p>
      </div>
      <div class="row">
        <p>{{ data.subject[0] }}</p>
      </div>
      <div class="row">
        <p class="teacher">{{ data.teacher[0] }}</p>
      </div>
      <div class="row">
        <p>{{ data.room[0] }}</p>
      </div>
    </template>
    <!-- Groupe prime a cours -->
    <template v-else-if="!data.isFullClass && data.type[0] != undefined">
      <div class="row">
        <p>{{ data.type[0] }}</p>
      </div>
      <div class="row">
        <p>{{ data.subject[0] }}</p>
      </div>
      <div class="row">
        <p class="teacher">{{ data.teacher[0] }}</p>
      </div>
      <div class="row">
        <p>{{ data.room[0] }}</p>
      </div>
    </template>
    <!-- Groupe seconde a cours -->
    <template v-else-if="!data.isFullClass && data.type[1] != undefined">
      <div class="row">
        <p>{{ data.type[1] }}</p>
      </div>
      <div class="row">
        <p>{{ data.subject[1] }}</p>
      </div>
      <div class="row">
        <p class="teacher">{{ data.teacher[1] }}</p>
      </div>
      <div class="row">
        <p>{{ data.room[1] }}</p>
      </div>
    </template>
    <template v-else>
      <p class="noCours">T'as pas cours bro UwU</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    //check if the subject second element is undefined
    checkHalfGroupes(subject) {
      if (subject[1] === undefined) {
        return true;
      }
      return false;
    },
  },
};
</script>


<style scoped>
#planningcard {
  width: 300px;
  height: 400px;
  margin: 2vw;

  background-color: white;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  border-radius: 21px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.card-header {
  border-bottom: solid 2px rgb(70, 70, 70);
  font-size: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: #f47499;
  margin: 0;
  padding: 10px 0 10px 0;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-around;
}

.teacher {
  font-size: 20px;
}

#planningcard > .row:last-of-type > p {
  font-size: 30px;
  align-items: center;
  text-align: center;
  color: #3f96d4;
}

</style>
