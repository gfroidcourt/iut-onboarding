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
          <p>{{ classType }}</p>
          <p>{{ data.subject[groupindex] }}</p>
        </div>
        <div class="subject-infos">
          <p class="teacher">
            {{
              data.teacher[groupindex]
                ? data.teacher[groupindex]
                : "Pas de prof"
            }}
          </p>
        </div>
        <div class="subject-infos">
          <p class="room">{{ data.room[groupindex] }}</p>
        </div>
      </div>
      <div v-else style="opacity: 0.5" class="data-container">
        <img v-if="Math.random() > 0.5" :src="noClassLogo" />
        <img v-else :src="noClassPoule" />
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
      noClassPoule: require("../assets/gitpoule.png"),
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
      return ["prime", "seconde"];
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
  },
  computed: {
    classColor() {
      const className = this.data.className.toUpperCase();
      return className.includes("S4") || className.includes("S4")
        ? "#9f99f5"
        : "#f0a377";
    },
    classType() {
      if (this.data.type[0] === undefined) return "";
      return this.data.type[0].split("_")[0];
    },
  },
};
</script>


<style scoped>
.planning-container {
  width: 300px;
  height: 400px;

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

.dataContainer {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.data-container {
  flex: 1;
  width: 100%;
  padding: 20px;
  margin-top: auto;
  margin-bottom: auto;
  max-height: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
}

.subject-infos > p {
  max-width: 60%;
}

.room {
  color: rgb(53, 182, 221);
  font-size: 25px;
  font-weight: 900;
}

.teacher {
  color: rgb(138, 138, 138);
  font-size: 18px;
}
</style>
