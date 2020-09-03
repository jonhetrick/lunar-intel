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
              <v-btn text @click="moonPhasePuller">Search for lunar</v-btn>
            </v-row>
          </v-container>
          <v-container>{{ DS_response }}</v-container>
          <div id="app">
            <h1>Info:</h1>
            <div v-for="i in DS_response" :key="i" class="i">
              {{ moonphase }}
            </div>
          </div>
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
      lat: 0,
      lng: 0,
      DS_response: null,
      loading: true,
      errored: false,
      API_KEY: "AIzaSyCptaE0KIUwUGLJjqYNfPfWGnGN6sZN_EM",
      DS_Key: "9091f71b89d453129c7e893656767cfa"
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

          this.lat = position.coords.latitude.toFixed(4);
          this.lng = position.coords.longitude.toFixed(4);

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
        let { data } = await axios.get(
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
    },
    moonPhasePuller() {
      axios
        .get(
          `https://api.darksky.net/forecast/${this.DS_Key}/${this.lat},${this.lng}`
        )
        .then(response => (this.DS_response = response.data.daily.data[0]))
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
