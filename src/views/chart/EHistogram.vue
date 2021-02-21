<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main1" style="width: 100%;height: 100%;" />
</template>
<script>
/* eslint-disable vue/no-dupe-keys */

// import echarts from 'echarts'
export default {
  name: 'EHistogram',
  props: {
    opinion: {
      type: [Object, Array],
      default: () => {}
    },
    xAxisData: {
      type: [Object, Array],
      default: () => ''
    },
    opinionData: {
      type: [Object, Array],
      default: () => [
        {
          name: '邮件营销',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310, 210]
        },
        {
          name: '视频广告',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410, 210]
        },
        {
          name: '直接访问',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320, 210]
        },
        {
          name: '搜索引擎',
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320, 210]
        }
      ]
    }
  },
  data() {
    return {
      charts: ''
    }
  },
  // 调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie('main1')
    })
  },
  methods: {
    drawPie(id) {
      this.charts = this.$echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.opinion
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData,
          position: 'bottom',
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        dataZoom: [

        ],
        yAxis: {
          type: 'value'
        },
        series: this.opinionData
      })
    }
  }
}
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
