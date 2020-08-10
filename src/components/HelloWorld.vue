<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-text-field
                v-model="address"
                label="Your Current Address"
                required
              />
              <v-btn text @click="locatorButtonPressed">Current</v-btn>
              <v-btn text>Search</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data() {
    return {
      address: "",
      lat: "",
      lng: "",
      API_KEY: "AIzaSyCptaE0KIUwUGLJjqYNfPfWGnGN6sZN_EM"
    };
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );

          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          console.log(this.lat);
          console.log(this.lng);
        },
        error => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=" +
            this.API_KEY
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
          console.log(this.address);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>
