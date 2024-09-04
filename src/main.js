import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
let interval = setInterval(selfRefresh,30000);

let selfRefresh = async () => {
  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  if(currentTime === 8 * 60 + 1) {
    clearInterval(interval);
    window.location.reload();
  }
};
