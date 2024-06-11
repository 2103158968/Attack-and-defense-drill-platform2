<template>
  <div class="sys-body">
    <div class="sys-title">演练信息</div>
    <div class="sys-divider" />
    <div class="list-container">
      <div class="item flex-wrap box-align">
        <img src="../../../../assets/images/index_01.png" alt="">
        <div>
          <div>累计举办演练场次</div>
          <div>1<span>次</span></div>
        </div>
      </div>
      <div class="item flex-wrap box-align">
        <img src="../../../../assets/images/index_02.png" alt="">
        <div>
          <div>累计有效攻击成功数</div>
          <div>10<span>个</span></div>
        </div>
      </div>
      <div class="item flex-wrap box-align">
        <img src="../../../../assets/images/index_03.png" alt="">
        <div>
          <div>累计有效防御成果数</div>
          <div>0<span>个</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
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

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { },
  // 方法集合
  methods: {

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    .list-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
            height: 55px;
            margin-right: 14px;
        }

    }

    .item div:nth-child(1) {
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #918e8e;
    }

    .item div:nth-child(2) {
        padding-top: 15px;
        font-family: HarmonyOS_Sans_SC_Bold;
        font-size: 25px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #3e3e3e;

        span {
            font-size: 15px;
        }
    }
</style>
