<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1>Coordinates</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <p>Latitude: {{ coordinates.lat.toFixed(4) }}</p>
        <p>Longitude: {{ coordinates.lng.toFixed(4) }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    };
  },
  created() {
    //onload grab coordinates
    this.$getLocation({})
      .then(coordinates => {
        this.coordinates = coordinates;
      })
      .catch(error => alert(error));
  }
};
</script>
