<template>
  <v-app>
    <v-app-bar app color="light" light collapse-on-scroll="true">
      <div class="d-flex align-center">
        <v-img
          alt="Lunar Intel Logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/cover.png"
          width="400"
        />
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

    <v-main>
      <Carosel />
      <Map />
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import Map from "./components/Map";
import Carosel from "./components/Carosel";

export default {
  name: "App",

  components: {
    Map,
    Carosel
  },

  data: () => ({
    //
  })
};
</script>
