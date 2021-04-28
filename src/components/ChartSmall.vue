<template>
  <div class="small">
    <HorizontalBar :chart-data="datacollection" :options="options" />
  </div>
</template>

<script>
import HorizontalBar from "@/components/HorizontalBar.js"

export default {
  props: ['post'],
  components: {
    HorizontalBar
  },
  computed: {
    winner: function () {
      return Math.max(this.post.pointA, this.post.pointB)
    },
  },
  data () {
    return {
      datacollection: { labels:[], datasets: [] },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1,
              fontFamily: '"Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif',
              fontSize: 16,
              fontStyle: 'bold',
              fontColor: 'black'
            }
          }],
          yAxes: [{
            ticks: {
              mirror: true,
              z:1,
              padding: -8,
              fontFamily: '"Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif',
              fontSize: 16,
              fontStyle: 'bold',
              fontColor: 'black'
            }
          }],
        },
        legend: {
          display: false
        },
        responsive: true
      },
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.post.textA, this.post.textB],
        datasets: [
          {
            data: [this.post.pointA, this.post.pointB],
            backgroundColor: [
              this.chartColor(this.post.pointA),
              this.chartColor(this.post.pointB),
            ],
            borderColor: [
              this.borderColor(this.post.pointA),
              this.borderColor(this.post.pointB),
            ],
            borderWidth: 1
          }
        ]
      }
    },
    chartColor(point) {
      if (this.post.pointA == this.post.pointB) {
        return 'rgba(54, 162, 235, 0.5)'
      }
      else if (this.winner == point) {
        return 'rgba(255, 99, 132, 0.5)'
      }
      else {
        return 'rgb(169, 169, 176, 0.5)'
      }
    },
    borderColor(point) {
      if (this.post.pointA == this.post.pointB) {
        return 'rgba(54, 162, 235, 1)'
      }
      else if (this.winner == point) {
        return 'rgba(255, 99, 132, 1)'
      }
      else {
        return 'rgb(169, 169, 176, 1)'
      }
    }
  }
}
</script>