<template>
  <div class="sys-body">
    <div class="sys-title">账号信息</div>
    <div class="sys-divider" />
    <div class="flex-wrap box-align box-pack-justify ">
      <div class="left ">
        <occupancy-chart />
      </div>
      <div class="right column_wrapper">
        <div class="item">
          <div>可参演总数</div>
          <div class="black">90000</div>
        </div>
        <div class="item">
          <div>已参演人数</div>
          <div class="waring">90000</div>
        </div>

        <div class="item">
          <div>可参演人数</div>
          <div class="blue">67493</div>
        </div>
        <div class="item">
          <div>攻击方人数</div>
          <div class="red">56</div>
        </div>
        <div class="item">
          <div>防御方人数</div>
          <div class="green">24</div>
        </div>
        <div class="item">
          <div>裁判员人数</div>
          <div class="black">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import OccupancyChart from './occupancyChart.vue'
export default {

  // import引入的组件需要注入到对象中才能使用
  components: {
    OccupancyChart
  },
  data() {
    // 这里存放数据
    return {

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
    // this.getEducation((res) => {
    //     //人员学历
    //     this.getOption("chart", res);

    // });

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() {

  }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { },
  // 方法集合
  methods: {
    getEducation(callback) {
      const that = this

      that.$axios
        .post(
          'screenPages/staffing/getEducationAnalysis',
          that.$qs.stringify({})
        )
        .then((res) => {
          if (res.data.status) {
            var result = res.data.data
            // console.log("学历", result);
          }
          if (callback) {
            return callback(result)
          }
        })
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    .left {
        width: 252px;
        border-right: 1px solid #e6e6e6;
        /* background-color: aqua; */
    }

    .right {
        width: 447px;
        margin-left: 65px;
    }

    .item {
        width: 120px;
        height: 84px;
        background-color: #f6f7fb;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #918e8e;
        border-radius: 5px;
        /* margin-right: 25px; */
        margin-bottom: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        line-height: 35px;

        .black {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 0px;
            color: #3e3e3e;
        }

        .waring {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 0px;
            color: #fba511;
        }

        .blue {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 0px;
            color: #2964fd;
        }

        .red {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 0px;
            color: #ff5b3b;
        }

        .green {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 25px;
            font-weight: bold;
            letter-spacing: 0px;
            color: #55d2ad;
        }
    }

    .column_wrapper {
        column-count: 3;
    }
</style>
