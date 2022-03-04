<template>
  <div class="planning-container">
    <!-- eslint-disable vue/no-v-for-template-key -->
    <div
      class="planning-card"
      v-for="(group, groupindex) in getGroupsComponent()"
      :key="groupindex"
    >
      <div :style="`color: ${classColor}`" class="card-header">
        <p v-for="(item, index) in getClassNameComponent(group)" :key="index">
          {{ item }}
        </p>
      </div>
      <div v-if="group !== undefined" class="data-container">
        <div class="subject-infos">
          <p>{{ classType(group === "seconde" ? 1 : 0) }} - {{ data.subject[group === "seconde" ? 1 : 0] }}</p>
        </div>
        <div class="subject-infos">
          <p class="teacher">
            {{
              data.teacher[group === "seconde" ? 1 : 0]
                ? data.teacher[group === "seconde" ? 1 : 0]
                : "Pas de prof"
            }}
          </p>
        </div>
        <div class="subject-infos">
          <p class="room">{{ data.room[group === "seconde" ? 1 : 0] }}</p>
        </div>
      </div>
      <div v-else style="opacity: 0.5" class="data-container">
        <img style="width: 35%;" :src="noClassLogo" />
        <p>Pas cours</p>
      </div>
    </div>
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
  data() {
    return {
      noClassLogo: require("../assets/robot.png"),
    };
  },
  methods: {
    getGroupsComponent() {
      if (this.data.isFullClass) return [""];
      if (
        // No class
        this.data.subject[0] === undefined &&
        this.data.subject[1] === undefined
      )
        return [undefined];
      if (this.data.subject[0] === undefined) return ["seconde"];
      if (this.data.subject[1] === undefined) return ["prime"];
      return ["prime", "seconde"]; // Prime et seconde ont cours en même temps
    },
    getClassNameComponent(group = undefined) {
      const a = this.data.className.toUpperCase();
      const result = [
        a.slice(0, a.length - 1),
        a.slice(a.length - 1, a.length),
      ];
      if (group) return [...result, group];
      return result;
    },
    classType(index = 0) {
      if (this.data.type[index] === undefined) return "";
      return this.data.type[index].split("_")[0];
    },
  },
  computed: {
    classColor() {
      const className = this.data.className.toUpperCase();
      return className.includes("S4") || className.includes("S4")
        ? "#9f99f5"
        : "#f0a377";
    },
  },
};
</script>


<style scoped>
.planning-container {
  width: 300px;
  height: 360px;

  display: flex;
  flex-direction: column;
}

.planning-card {
  width: 100%;
  flex: 1;

  background-color: white;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
  border-radius: 21px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.card-header {
  padding: 12px 0 12px 0;
  width: 100%;

  border-bottom: solid 3px rgb(230, 230, 230);
  font-size: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-header > p {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
}

.card-header > p:nth-child(2n-1) {
  font-size: 20px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 4px;
}

.data-container {
  flex: 1;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  max-height: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.data-container > img {
  margin-top: -30px;
  margin-bottom: 30px;
}

.subject-infos {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.subject-infos > p {
  margin-right: 10px;
  margin-left: 10px;
  line-height: 25px;
}

.subject-infos > p {
  max-width: 60%;
}

.room {
  color: rgb(41, 154, 189);
  font-size: 25px;
  font-weight: 900;
}

.teacher {
  color: rgb(138, 138, 138);
  font-size: 18px;
}
</style>
