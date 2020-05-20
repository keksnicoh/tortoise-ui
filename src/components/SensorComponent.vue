<template>
  <v-card class="mx-auto">
    <v-card-text class="text--primary">
      <v-row justify="space-around">
        <v-col cols="6" align-self="left" class="headline">
          <div class="overline">Forecast 3h</div>
        </v-col>
        <v-col cols="6" class="text-right">
          <div class="overline">
            Inside
            <span style="color:#999">/ Outside</span>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="2" align-self="left" class="headline">
          <div class="d-flex flex-column align-center">
            <v-icon large>{{forecastWeatherIcon}}</v-icon>
            <p class="mb-0 caption">{{forecastTemperature}}</p>
          </div>
        </v-col>
        <v-col cols="2" align-self="center" class="headline">
          <span class="ml-2"></span>
        </v-col>
        <v-col cols="8" class="text-right" align-self="center">
          <div class="headline">
            {{temperatureInside}}
            <span style="color:#999">/ {{temperatureOutside}}</span>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="2" align-self="left" class="headline">
          <div class="d-flex flex-column align-center">
            <v-icon large>fa-tint</v-icon>
            <p class="mb-0 caption">{{forecastHumidity}}</p>
          </div>
        </v-col>
        <v-col cols="2" align-self="center" class="headline">
          <span class="ml-2"></span>
        </v-col>

        <v-col cols="8" class="text-right" align-self="center">
          <div class="headline">
            {{humidityInside}}
            <span style="color:#999">/ {{humidityOutside}}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SensorComponent",
  props: {
    monitor: Object
  },
  computed: {
    temperatureInside: function() {
      if (this.monitor == undefined) {
        return "-,-°C";
      }
      return this.renderTemperature(this.monitor.sensorTemperatur);
    },
    temperatureOutside: function() {
      if (this.monitor == undefined) {
        return "-,-°C";
      }
      return this.renderTemperature(this.monitor.sensorTemperaturOutside);
    },
    humidityInside: function() {
      if (this.monitor == undefined) {
        return "-,-°C";
      }
      return this.renderHumidity(this.monitor.sensorHumidity);
    },
    humidityOutside: function() {
      if (this.monitor == undefined) {
        return "-,-°C";
      }
      return this.renderHumidity(this.monitor.sensorHumidityOutside);
    },
    forecastTemperature: function() {
      if (this.monitor == undefined) {
        return "";
      }

      if (this.monitor.weather == undefined) {
        return "";
      }

      if (this.monitor.weather.length > 0) {
        var weather = this.monitor.weather[0];
        return this.renderTemperature(weather.temperature);
      }

      return "";
    },
    forecastWeatherIcon: function() {
      if (this.monitor == undefined) {
        return "";
      }

      if (this.monitor.weather == undefined) {
        return "";
      }

      if (this.monitor.weather.length > 0) {
        var weather = this.monitor.weather[0];
        switch (weather.label) {
          case "Clouds - broken clouds":
            return "fa-cloud-sun";
          default:
            return "fa-cloud-sun";
        }
      }

      return "fa-cloud-sun";
    },
    forecastHumidity: function() {
      if (this.monitor == undefined) {
        return "";
      }

      if (this.monitor.weather == undefined) {
        return "";
      }

      if (this.monitor.weather.length > 0) {
        var weather = this.monitor.weather[0];
        return this.renderHumidity(weather.humidity);
      }

      return "";
    }
  },
  methods: {
    renderTemperature: function(temperature) {
      if (typeof temperature != "number") {
        return "-,-°C";
      } else {
        return temperature.toFixed(0).replace(".", ",") + "°C";
      }
    },
    renderHumidity: function(humidity) {
      if (typeof humidity != "number") {
        return "-,-%";
      } else {
        return humidity.toFixed(0).replace(".", ",") + "%";
      }
    }
  },
  data: () => ({})
};
</script>
