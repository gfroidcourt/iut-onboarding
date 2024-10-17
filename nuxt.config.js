// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    display: 'swap',
    outputDir: 'assets/fonts/',
    families: {
      Fredoka: {
        wght: ["75..125",500]
      },
      Poppins: {
        wght: 300
      }
    }
  },

  routeRules: {
    "/api/hp/**": {
      proxy: "https://hyperplanning.iut.u-bordeaux.fr/Telechargements/ical/**"
    }
  }
};