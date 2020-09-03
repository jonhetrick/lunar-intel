<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <h2 class="mr-2">Lunar Intel</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/jonhetrick/lunar-intel"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main dark color="black">
      <Carosel />
      <HelloWorld />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Footer from "./components/Footer";
// import Map from "./components/Map";
import Carosel from "./components/Carosel";

export default {
  name: "App",

  components: {
    HelloWorld,
    Carosel,
    Footer
  },

  data: () => ({
    //
  })
};
</script>
