<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: require("../assets/carosel/moon_phases.png")
        },
        {
          src: require("../assets/carosel/moon_half.png")
        }
      ]
    };
  }
};
</script>
