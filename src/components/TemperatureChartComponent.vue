<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  name: "TemperatureChartComponent",
  props: ["graph"],
  watch: {
    graph: function() {
      this.renderChart(this.chartdata, {
        responsive: true,
        maintainAspectRatio: false,
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
        // labels: ['January', 'February', 'DERP'],
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
