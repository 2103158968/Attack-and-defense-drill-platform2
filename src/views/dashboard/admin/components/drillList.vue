<template>
  <div class="sys-body">
    <div class="sys-title">最新演练</div>
    <div class="sys-divider" />
    <div class="list">
      <div v-for="(item,index) in tableData" :key="index" class="item">
        <div class="top flex-wrap box-align box-pack-justify">
          <div class="title">{{ item.name }}</div>
          <div>剩余时间:{{ item.otherTime }}</div>
        </div>
        <div class="flex-wrap box-align box-pack-justify">
          <div>
            <div>演练时间 :{{ item.drillTime }}</div>
            <div>演练场地 :{{ item.address }}</div>
          </div>
          <div :class="item.status == '进行中'?'red' : item.status=='已结束'?'info':'doing'">
            {{ item.status }}
          </div>
        </div>
        <div class="sys-divider" />
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
      tableData: [
        {
          id: '1',
          name: '2024年度海宁市“智汇潮涌·共筑网安”攻防演练300人组友谊赛',
          drillTime: '2024-4-15 09:00:00-2024-4-19 11:00:00',
          address: '浙江省嘉兴市海宁市拱辰路3号',
          status: '进行中',
          otherTime: '71小时37分'

        },
        {
          id: '2',
          name: '2024年度海宁市“智汇潮涌·共筑网安”攻防演练300人组友谊赛',
          drillTime: '2024-4-15 09:00:00-2024-4-19 11:00:00',
          address: '浙江省嘉兴市海宁市拱辰路3号',
          status: '已结束',
          otherTime: '71小时37分'

        },
        {
          id: '3',
          name: '2024年度海宁市“智汇潮涌·共筑网安”攻防演练300人组友谊赛',
          drillTime: '2024-4-15 09:00:00-2024-4-19 11:00:00',
          address: '浙江省嘉兴市海宁市拱辰路3号',
          status: '未开启',
          otherTime: '71小时37分'
        }
      ]
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
    .list {
        margin-top: 26px;
        padding: auto 10px;
    }

    .item {
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #918e8e;
        line-height: 20px;

        .title {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #363636;
        }

        .top {
            padding-bottom: 17px;
        }

    }

    .red {
        background-color: #ff7d7a;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 14px;

        color: #ffffff;
        padding: 3px 18px;
        border-radius: 12px;
    }

    .info {
        background-color: #9faebb;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 14px;

        color: #ffffff;
        padding: 3px 18px;
        border-radius: 12px;
    }

    .doing {
        background-color: #5fb0ca;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 14px;

        color: #ffffff;
        padding: 3px 18px;
        border-radius: 12px;
    }
</style>
