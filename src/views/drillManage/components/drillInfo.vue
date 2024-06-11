<template>
  <div class="info-container">
    <div class="tab-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#f3373e"
        text-color="#000"
        @select="handleSelect"
      >
        <el-menu-item index="演练详情">演练详情</el-menu-item>
        <el-menu-item index="目标系统管理">目标系统管理</el-menu-item>
        <el-menu-item index="攻防团队">攻防团队

        </el-menu-item>

        <el-submenu index="用户管理">
          <template slot="title">用户管理</template>
          <el-menu-item index="攻击方">攻击方</el-menu-item>
          <el-menu-item index="防御方">防御方</el-menu-item>
          <el-menu-item index="全局选手">全局选手</el-menu-item>

        </el-submenu>
        <el-menu-item index="分组管理">分组管理

        </el-menu-item>
        <el-submenu index="成果列表">
          <template slot="title">成果列表</template>
          <el-menu-item index="攻击链列表">攻击链列表</el-menu-item>
          <el-menu-item index="防御成果列表">防御成果列表</el-menu-item>
          <el-menu-item index="0-Day漏洞列表">0-Day漏洞列表</el-menu-item>

        </el-submenu>
        <el-submenu index="综合管理">
          <template slot="title">综合管理</template>
          <el-menu-item index="综合汇报列表">综合汇报列表</el-menu-item>
          <el-menu-item index="通知公告管理">通知公告管理</el-menu-item>
          <el-menu-item index="护网里程管理">护网里程管理</el-menu-item>

        </el-submenu>
        <el-menu-item index="攻击日志管理">攻击日志管理

        </el-menu-item>
        <el-menu-item index="VPN管理">VPN管理

        </el-menu-item><el-menu-item index="统计中心">统计中心

        </el-menu-item>
        </el-menu-item><el-menu-item index="指挥中心">指挥中心

        </el-menu-item>
        </el-menu-item><el-menu-item index="配置中心">配置中心

        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-body">
      <DrillDetail v-if="activeIndex==='演练详情'" :drill-id="drillId" />
      <TargetSystem v-if="activeIndex==='目标系统管理'" :drill-id="drillId" />
      <Teams v-if="activeIndex === '攻防团队'" :drill-id="drillId" />
      <!-- 用户管理 -->
      <attacker-list v-if="activeIndex === '攻击方'" :drill-id="drillId" />
      <!-- 成果列表 -->
      <Attack-Chain v-if="activeIndex === '攻击链列表'" :drill-id="drillId" />
      <achievements-defense v-if="activeIndex === '防御成果列表'" :drill-id="drillId" />
      <achievements-bug v-if="activeIndex === '0-Day漏洞列表'" :drill-id="drillId" />
      <group-manage v-if="activeIndex === '分组管理'" :drill-id="drillId" />
      <!-- 综合管理 -->
      <report-manage v-if="activeIndex==='综合汇报列表'" :drill-id="drillId" />
      <notice-manage v-if="activeIndex === '通知公告管理'" :drill-id="drillId" />
      <net-manage v-if="activeIndex === '护网里程管理'" :drill-id="drillId" />
      <attack-log v-if="activeIndex === '攻击日志管理'" :drill-id="drillId" />
      <VPNManage v-if="activeIndex === 'VPN管理'" :drill-id="drillId" />
      <attacker-statistics v-if="activeIndex === '统计中心'" :drill-id="drillId" />

    </div>

  </div>
</template>

<script>
import DrillDetail from './drillDetail.vue'
import TargetSystem from './targetSystem.vue'
import Teams from './teams.vue'
import AttackChain from './attackChain.vue'
import GroupManage from './groupManage.vue'
import AttackLog from './attackLog.vue'
import VPNManage from './VPNManage.vue'
import NetManage from './netManage.vue'
import NoticeManage from './noticeManage.vue'
import ReportManage from './reportManage.vue'
import AttackerStatistics from './attackerStatistics.vue'
import AttackerList from './attackerList.vue'
import AchievementsDefense from './achievementsDefense.vue'
import AchievementsBug from './achievementsBug.vue'
import { oneDrill } from '@/api/drillList'
import achievementsBug from './achievementsBug.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    DrillDetail, // 演练详情
    TargetSystem, // 目标系统管理
    Teams, // 团队管理
    AttackChain, // 攻击链列表
    GroupManage, // 分组管理
    AttackLog, // 攻击日志
    VPNManage, // VPN管理
    NetManage, // 护网里程管理
    NoticeManage, // 通知公告管理
    ReportManage, // 综合汇报列表
    AttackerStatistics, // 攻击方统计
    AttackerList, // 用户管理（攻击方）
    AchievementsDefense, // 防御成果列表
    AchievementsBug, // 漏洞列表

    achievementsBug
  },
  data() {
    // 这里存放数据
    return {
      activeIndex: '演练详情',
      drillId: '',
      info: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const _id = this.$route.params.id
    if (_id) {
      this.drillId = _id
    }

    const _activeIndex = window.localStorage.getItem('activeIndex')
    if (_activeIndex) {
      this.activeIndex = _activeIndex
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() {
    window.localStorage.clear()
  }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { },
  // 方法集合
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
                this.activeIndex = key
      window.localStorage.setItem('activeIndex', key)
      // switch (key) {
      //     case '2':
      //         console.log('dddddddd');
      //         this.$router.push({ path: '/targetSystem/1' })
      //         break
      // }
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    ::v-deep .el-menu.el-menu--horizontal {
        /* height: 53px;
        line-height: 53px; */
        border: none;
    }

    ::v-deep .el-menu--horizontal>.el-menu-item {
        /* height: 53px;
        line-height: 53px; */
        /* line-height: 53px; */
    }

    .main-body {
        margin-top: 17px;
    }

    .tab-container {
        min-width: 1656px;
        white-space: nowrap;

    }
</style>
