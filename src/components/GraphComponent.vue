<template>
  <v-card class="mx-auto">
    <v-card-text class="text--primary">
      <v-row>
        <v-col>
          <div class="overline">
            Resolution
          </div>
          <v-btn-toggle v-bind:value="value.resolution">
            <v-btn v-on:click="handleValueResolution(0)">High</v-btn>
            <v-btn v-on:click="handleValueResolution(1)">Medium</v-btn>
            <v-btn v-on:click="handleValueResolution(2)">Low</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col>
          <div class="overline">
            Period
          </div>
          <v-btn-toggle v-bind:value="value.period">
            <v-btn v-on:click="handleValuePeriod(0)">24h</v-btn>
            <v-btn v-on:click="handleValuePeriod(1)">Week</v-btn>
            <v-btn v-on:click="handleValuePeriod(2)">Month</v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12">
          <TemperatureChartComponent v-bind:graph="graphTemperature" v-bind:temperatureConfiguration="temperatureConfiguration" />
        </v-col>
        <v-col md="6" sm="12">
          <HumidityChartComponent v-bind:graph="graphHumidity" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import TemperatureChartComponent from "./TemperatureChartComponent";
import HumidityChartComponent from "./HumidityChartComponent";

export default {
  name: "GraphComponent",
  components: {
    TemperatureChartComponent,
    HumidityChartComponent
  },
  props: {
    graph: {
      type: Object
    },
    value: {
      type: Object
    }
  },
  methods: {
    handleValueResolution: function (newValue) {
      this.$emit('value', {
        resolution: newValue,
        period: this.value.period
      })
    },
    handleValuePeriod: function (newValue) {
      this.$emit('value', {
        resolution: this.value.resolution,
        period: newValue
      })
    }
  },
  computed: {
    graphTemperature: function (){
      return {
        inside: this.graph.temperature,
        outside: this.graph.temperatureOutside
      };
    },
    graphHumidity: function (){
      return {
        inside: this.graph.humidity,
        outside: this.graph.humidityOutside
      };
    }
  },
  data: () => ({
    temperatureConfiguration: {
      emergencyLow: 11,
      emergencyHigh: 37,
      l1Low: 17,
      l1High: 24,
      l2Low: 20,
      l2High: 34
    }
  })
};
</script>
