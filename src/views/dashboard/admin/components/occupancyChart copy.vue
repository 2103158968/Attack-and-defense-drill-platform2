<template>
  <div ref="chart" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '165px'
    }
  },
  data() {
    // 这里存放数据
    return {
      chart: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { },
  // 方法集合
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        color: ['#2964fd', '#feb941'],
        title: [{
          text: '75.0%',
          x: '50%',
          y: '40%',
          textAlign: 'center',
          textStyle: {
            fontSize: '18',

            color: '#000',
            textAlign: 'center'

          }
        }, {
          text: '账号占用率',
          left: '50%',
          top: '55%',
          textAlign: 'center',
          textStyle: {
            fontSize: '12',
            color: '#838383',
            textAlign: 'center'

          }
        }],
        series: [
          {
            name: '账号',
            type: 'pie',

            radius: ['80%', '95%'],

            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 35,

              // borderColor: 'rgba(200,200,200,0.3)',
              // borderWidth: 0,

              shadowColor: '#ffffff',
              // shadowBlur: 5,

              borderWidth: 5, // 设置扇区之间的边框宽度
              borderColor: '#ffffff' // 设置扇区之间的边框颜色
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'normal'
              }
            },
            labelLine: {
              show: false
            },

            data: [
              { value: 782, name: '在用账号' },
              { value: 218, name: '未用账号' }
            ]
          }
        ]
      })
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>
