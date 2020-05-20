<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'HumidityChartComponent',
  props: ['graph'],
  watch: {
    graph: function() {
      this.renderChart(this.chartdata, {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            //ticks: {
            //  max: new Date(),
            //  min: new Date() - 24 * 1000 * 3600
            //}
          }],
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',

            ticks: {
              callback: function(value) {
                return value + '%';
              },
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        }
      })
    }
  },
  computed: {
    chartdata: function() {
      return {
        // labels: ['January', 'February', 'DERP'],
        datasets: [{
            label: 'Humidity',
            borderColor: '#0000ff',
            data: this.graph.inside,
            yAxisID: 'A',
            pointRadius: 0,
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Humidity Outside',
            borderColor: '#0000ff44',
            data: this.graph.outside,
            yAxisID: 'A',
            pointRadius: 0,
            borderWidth: 2,
            fill: false
          }
        ]
      }
    },



  }
}

</script>
