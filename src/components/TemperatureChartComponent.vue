<script>
import { Line } from "vue-chartjs";
import "chartjs-plugin-annotation";
export default {
  extends: Line,
  name: "TemperatureChartComponent",
  props: {
    graph: {
      type: Object
    },
    temperatureConfiguration: {
      type: Object
    }
  },
  watch: {
    graph: function() {
      var annotations = [];
      var tc = this.temperatureConfiguration;
      (this.temperatureConfiguration);
      if (
        tc !== undefined &&
        typeof this.temperatureConfiguration.emergencyHigh == "number"
      ) {
        annotations.push({
          type: "line",
          mode: "horizontal",
          scaleID: "A",
          value: this.temperatureConfiguration.emergencyHigh,
          borderColor: "rgb(150, 20, 0, 0.5)",
          borderWidth: 1,
          label: {
            enabled: true,
            position: "left",
            content: "Maximum",
            backgroundColor: "rgba(150,0,0,0.6)",
            yAdjust: -10,
            yPadding: 2
          }
        });
      }

      if (
        tc !== undefined &&
        typeof this.temperatureConfiguration.emergencyLow == "number"
      ) {
        annotations.push({
          type: "line",
          mode: "horizontal",
          scaleID: "A",
          value: this.temperatureConfiguration.emergencyLow,
          borderColor: "rgb(150, 20, 0, 0.5)",
          borderWidth: 1,
          label: {
            enabled: true,
            position: "left",
            content: "Minimum",
            backgroundColor: "rgba(150,0,0,0.7)",
            yAdjust: -10,
            yPadding: 2
          }
        });
      }

      if (
        tc !== undefined &&
        typeof this.temperatureConfiguration.l1Low == "number"
      ) {
        annotations.push({
          type: "line",
          mode: "horizontal",
          scaleID: "A",
          value: this.temperatureConfiguration.l1Low,
          borderColor: "rgb(20, 20, 150, 0.7)",
          borderWidth: 1,
          borderDash: [2, 2],
          label: {
            enabled: true,
            position: "left",
            content: "L1 On",
            backgroundColor: "rgba(0,0,150,0.6)",
            yAdjust: -10,
            yPadding: 2
          }
        });
      }

      if (
        tc !== undefined &&
        typeof this.temperatureConfiguration.l2Low == "number"
      ) {
        annotations.push({
          type: "line",
          mode: "horizontal",
          scaleID: "A",
          value: this.temperatureConfiguration.l2Low,
          borderColor: "rgb(20, 20, 150, 0.7)",
          borderWidth: 1,
          borderDash: [2, 2],
          label: {
            enabled: true,
            position: "left",
            content: "L2 On",
            backgroundColor: "rgba(0,0,150,0.6)",
            yAdjust: -10,
            yPadding: 2
          }
        });
      }
      if (
        tc !== undefined &&
        typeof this.temperatureConfiguration.l1High == "number"
      ) {
        annotations.push({
          type: "line",
          mode: "horizontal",
          scaleID: "A",
          value: this.temperatureConfiguration.l1High,
          borderColor: "rgb(150, 60, 20, 0.7)",
          borderWidth: 1,
          borderDash: [2, 2],
          label: {
            enabled: true,
            position: "left",
            content: "L1 Off",
            backgroundColor: "rgba(190,60,0,0.6)",
            yAdjust: -10,
            yPadding: 2
          }
        });
      }
      if (
        tc !== undefined &&
        typeof this.temperatureConfiguration.l2High == "number"
      ) {
        annotations.push({
          type: "line",
          mode: "horizontal",
          scaleID: "A",
          value: this.temperatureConfiguration.l2High,
          borderColor: "rgb(150, 60, 20, 0.7)",
          borderWidth: 1,
          borderDash: [2, 2],
          label: {
            enabled: true,
            position: "left",
            content: "L2 Off",
            backgroundColor: "rgba(190,60,0,0.6)",
            yAdjust: -10,
            yPadding: 2
          }
        });
      }
      this.renderChart(this.chartdata, {
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
          annotations: annotations
        },
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
              ticks: {
                callback: function(value) {
                  return value + "°C";
                }
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }
          ]
        }
      });
    }
  },
  computed: {
    chartdata: function() {
      return {
        datasets: [
          {
            label: "Temperature",
            borderColor: "#D0312D",
            data: this.graph.inside,
            yAxisID: "A",
            pointRadius: 0,
            borderWidth: 1,
            fill: false
          },
          {
            label: "Temperature Outside",
            borderColor: "#ff000044",
            data: this.graph.outside,
            yAxisID: "A",
            pointRadius: 0,
            borderWidth: 2,
            fill: false
          }
        ]
      };
    }
  }
};
</script>
