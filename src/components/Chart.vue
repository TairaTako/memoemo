<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  props: ['post'],
  computed: {
    winner: function () {
      return Math.max(this.post.pointA, this.post.pointB)
    }
  },
  extends: HorizontalBar,
  name: 'Chart',
  data () {
    return {
      data: {
        labels: [this.post.textA, this.post.textB],
        datasets: [
          {
            data: [this.post.pointA, this.post.pointB],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1
            }
          }]
        },
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>