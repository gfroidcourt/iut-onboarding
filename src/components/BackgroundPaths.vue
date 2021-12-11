<template>
  <div v-if="active" :style="backgroundStyle" id="background-paths-container">
    <svg
      width="1646px"
      height="1351px"
      viewBox="777 -35 1646 1351"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <path
        id="path"
        d="M869 1222 C869 1222 971.439 984.153 1306 969 1485.444 960.873 1708.63 1053.186 1828 893 1944.153 737.13 1742.681 285.232 1861 131 1970.564 -11.82 2331 97 2331 97"
        fill="url(#left-to-right)"
        stroke="#ffffff"
        stroke-width="11"
        stroke-opacity="1"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "BackgroundPaths",
};
</script>

<style>

#background-paths-container {
  position: absolute;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#path {
  stroke-dasharray: 2000;
  animation: dash 2s linear infinite;
  position: absolute;
}

@keyframes dash {
  to {
    stroke-dashoffset: 3000;
  }
}

</style>
