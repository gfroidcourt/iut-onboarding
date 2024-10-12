<template>
    <div class="container">
        <div class="logoDiscordContainer">
            <img :src="logoDiscord" alt="Discord Banner 2"/>
        </div>
        <div class="qrCodeContainer">
            <img  :src="qrCode" class="qrCode"/>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      qrCode: "/assets/asso/qrcode.png",
      logoDiscord: "/assets/logo_discord.png"
    };
  }
};
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 800px;
}
.logoDiscordContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.qrCode {
   max-width: 400px;
   height: auto;
   width: 400px;
}
.qrCodeContainer {
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    border-radius: 30px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.25);
}
</style>
