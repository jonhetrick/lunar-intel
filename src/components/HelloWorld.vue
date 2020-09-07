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
              <v-btn
                color="warning"
                rounded
                dark
                text
                @click="locatorButtonPressed"
                >Current</v-btn
              >
              <v-btn color="warning" rounded dark text @click="moonPhasePuller"
                >Search for lunar</v-btn
              >
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-card v-if="DS_response !== null" class="mx-auto" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline"
            >Daily Intel Drop</v-list-item-title
          >
          <v-list-item-subtitle>{{ summary }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">{{ moonPhase * 100 + "%" }}</v-col>
          <v-col cols="6">
            <v-img src="../assets/cards/half.png" alt="Sunny image"></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ windSpeed }} km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{
          cloudCover * 100 + "%"
        }}</v-list-item-subtitle>
      </v-list-item>

      <!-- <v-list class="transparent">
        <v-list-item v-for="item in forecast" :key="item.day">
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">{{
            item.temp
          }}</v-list-item-subtitle>
        </v-list-item>
      </v-list> -->
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data() {
    return {
      message: "",
      address: "",
      lat: 0,
      lng: 0,
      DS_response: null,
      summary: null,
      moonPhase: null,
      visibility: null,
      cloudCover: null,
      sunsetTime: null,
      windSpeed: null,
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
        .then(
          response => (
            (this.DS_response = response.data.daily.data[0]),
            (this.summary = response.data.daily.data[0].summary),
            (this.moonPhase = response.data.daily.data[0].moonPhase),
            (this.visibility = response.data.daily.data[0].visibility),
            (this.sunsetTime = response.data.daily.data[0].sunsetTime),
            (this.cloudCover = response.data.daily.data[0].cloudCover),
            (this.windSpeed = response.data.daily.data[0].windSpeed)
          )
        )
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    brain(phase) {
      if (phase <= 0.25) {
        return "Waxing or Waning Cresent";
      } else if (phase > 0.25 && this.moonPhase < 0.75) {
        return "First or Last Quarter";
      } else if (phase >= 0.75) {
        return "Waxing or Waning Gibbous";
      } else if (phase === 0.0) {
        return "new Moon";
      } else {
        return "Full moon";
      }
    },
    filters: {
      percent: function(val) {
        return val * 100 + "%";
      }
    }
  }
};
</script>
