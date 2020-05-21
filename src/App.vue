<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text>
        <v-icon>fa-tv</v-icon>
        <span class="ml-2">Tortoise</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col md="6" sm="12">
            <LightComponent
              v-bind:monitor="monitor"
              v-bind:webcam="webcam"
              v-bind:disabled="lightComponentDisabled"
              v-on:lightChanged="lightChanged"
              v-on:webcamRequest="handleWebcamRequest"
            />
          </v-col>
          <v-col md="6" sm="12">
            <SensorComponent v-bind:monitor="monitor" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <GraphComponent v-bind:graph="graph" v-bind:value="graphModel" v-on:value="graphModelChanged" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LightComponent from "./components/LightComponent";
import SensorComponent from "./components/SensorComponent";
import GraphComponent from "./components/GraphComponent";

export default {
  name: "App",
  components: {
    LightComponent,
    SensorComponent,
    GraphComponent
  },
  mounted() {
    this.loadMonitor();
    this.loadGraph();
  },
  methods: {
    graphModelChanged: function (graphModel) {
      this.graphModel = graphModel
      this.loadGraph()
    },
    loadMonitor: function() {
      var baseUrl = "/api";
      this.axios
        .get(baseUrl + "/v1/monitor", { crossdomain: true })
        .then(response => {
          this.monitor = response.data;
        });
    },
    loadGraph: function() {
      var baseUrl = "/api";
      var tw;
      var periodDays;

      var period = this.graphModel.period;
      var resolution = this.graphModel.resolution;

      if (period == 0) {
        periodDays = 1;
      } else if (period == 1) {
        periodDays = 7;
      } else {
        periodDays = 31;
      }

      if (resolution == 0) {
        tw = periodDays * 60;
      } else if (resolution == 1) {
        tw = periodDays * 600;
      } else {
        tw = periodDays * 3600;
      }

      var end = new Date(Date.now());
      var start = new Date(Date.now() - 1000 * periodDays * 3600 * 24);
      this.axios
        .get(
          baseUrl +
            "/v1/series?timeWindow=" +
            tw +
            "&start=" +
            start.toISOString() +
            "&end=" +
            end.toISOString(),
          { crossdomain: true }
        )
        .then(response => {
          this.graph = response.data;
        });
    },
    handleWebcamRequest: function() {
      this.webcam.loading = true;
      this.loadMonitor();
      this.reloadWebcam(2000);
    },
    lightChanged: function(lightId, value) {
      var oldValue = this.monitor[lightId].value;
      this.monitor[lightId] = value;

      var reloadAndLock =
        !this.monitor[lightId].controlled &&
        oldValue != this.monitor[lightId].value;
      if (reloadAndLock) {
        this.lightComponentDisabled = true;
        this.webcam.loading = true;
      }

      var payload = {
        light1: this.monitor.switchLight1,
        light2: this.monitor.switchLight2
      };
      this.axios.post("/api/v1/control/switch", payload).then(() => {
        window.setTimeout(
          function() {
            this.reloadWebcam(2000);
          }.bind(this),
          1000
        );
      });
    },
    reloadWebcam: function(wait) {
      this.axios
        .post("/api/v1/webcam/request", {}, { crossdomain: true })
        .then(() => {
          window.setTimeout(
            function() {
              var imageTimestamp = new Date().getTime();
              this.lightComponentDisabled = false;
              this.webcam = {
                loading: false,
                url:
                  "http://tortoise.heimann.hamburg/webcam_small.jpg?" +
                  imageTimestamp
              };
            }.bind(this),
            wait
          );
        });
    }
  },
  data: () => ({
    monitor: {},
    webcam: {
      loading: false,
      url: "http://tortoise.heimann.hamburg/webcam_small.jpg?1589970715554"
    },
    lightComponentDisabled: false,
    resolution: 1,
    period: 1,
    graph: {
      temperature: [],
      temperatureOutside: [],
      humidity: [],
      humidityOutside: []
    },
    graphModel: {
      resolution: 1,
      period: 0
    },
  })
};
</script>
