<template>
  <div class="body">
    <div class=" flex-wrap box-pack-justify box-align">
      <div class="sys-title">攻防团队（{{ tabValue }}）</div>
      <div class="tabs flex-wrap">
        <div v-for="(item,index) in tabOptions" :key="index" class="tab-item" @click="handleChange(item)">
          <div :class="tabValue === item? 'tab-text' :''">{{ item }}</div>
          <div v-show="tabValue === item" class="tab-line" />
        </div>

      </div>
    </div>
    <div class="sys-divider" />
    <div class="top-container flex-wrap box-pack-justify">
      <div class="flex-wrap">

        <div class="sys-muban-btn sys-btn"><i class="el-icon-muban" />下载导入模板</div>

        <div class="sys-down-btn sys-btn"><i class="el-icon-down" />导入团队成员</div>
        <div class="sys-team-btn sys-btn"><i class="el-icon-team" />关联团队</i></div>
        <div class="sys-add-btn sys-btn"><i class="el-icon-class" />导入分组</div>
        <div class="sys-manage-btn sys-btn"><i class="el-icon-manage" />批量管理</div>
      </div>
      <div class="search">
        <el-input v-model="listQuery.keySearch" placeholder="搜索团队名称" prefix-icon="el-icon-search" />
      </div>

    </div>
    <div class="list-container flex-wrap flex-rowWrap">
      <div v-for="(item,index) in tableData" :key="index" class="list-item">
        <div class="flex-wrap">
          <div>
            <img src="../../../assets/images/list_01.png" alt="">
          </div>
          <div>
            <div class="item-unit">{{ item.name }}</div>
            <div>所属分组：{{ item.groupId || '暂无' }}</div>
          </div>
        </div>
        <div class="item-botttom">
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                成员人数<span class="item-number">{{ item.number || 0 }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                团队排名<span class="item-number">{{ item.rank ? 'NO.'+item.rank:'暂无' }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                团队得分<span class="item-number">{{ item.score || 0 }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                提交报告<span class="item-number">{{ item.file || 0 }}</span>
              </div>
            </el-col>

          </el-row>
        </div>
        <div class="sys-divider" />
        <div class="item-title">
          团队介绍 >
        </div>
        <div class="item-content">
          {{ item.introduce || '暂无介绍' }}
        </div>
        <div class="flex-wrap box-align box-pack-justify btn-list">
          <div class="add-btn" @click="addMember(item)">添加成员</div>
          <div class="grade-btn">得分详情</div>
        </div>
        <div>更新时间：{{ item.updateTime }}</div>
      </div>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
    <!-- 添加团队成员 -->
    <el-dialog :visible.sync="addVisible" :title="'添加成员信息（'+teamInfo.name+'）'" @close="closeAdd">
      <add-user
        ref="child"
        :drill-id="drillId"
        :team-id="teamInfo.id"
        :team-type="teamInfo.type"
        :type="'team'"
        @fMethod="onClose"
      />
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import AddUser from './addUser.vue'
import { pageTeam, oneTeam } from '@/api/team'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Pagination, AddUser },
  props: ['drillId'],
  data() {
    // 这里存放数据
    return {
      tabOptions: ['攻击方团队', '防御单位团队'],
      tabValue: '攻击方团队',
      listQuery: {
        current: 1,
        size: 10,
        title: '',
        content: '',
        name: '',
        keySearch: '',
        drillId: this.drillId,
        type: ''
      },
      total: 10,
      tableData: [

      ],
      addVisible: false,
      teamInfo: {}
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
    this.getList()
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
    handleChange(val) {
                this.tabValue = val
      this.getList()
    },
    onClose(data) {
      this.addVisible = data
    },
    closeAdd() {
      this.$refs.child.resetForm('ruleForm')
            },
    addMember(item) {
                this.teamInfo = { ...item }
      this.addVisible = true
            },
    getList() {
      const that = this

      that.listQuery.type = that.tabValue
      pageTeam(that.listQuery).then(res => {
        if (res.data.code == 200) {
          var result = res.data.data.records
          that.total = res.data.data.total
          that.tableData = result
        }
      })
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    .body {
        margin-top: 17px;
        padding: 19px 24px;
        background-color: #fff;
    }

    .tabs {
        font-family: HarmonyOS_Sans_SC;
        font-size: 16px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #000000;

        .tab-item:nth-child(n+2) {
            margin-left: 35px;
        }

        .tab-text {
            color: #2b75fc;
        }

        .tab-line {
            width: 34px;
            height: 3px;
            background-color: #2b75fc;
            border-radius: 2px;
            /* margin-top: 8px; */
            margin: 8px auto 0;
        }

    }

    /* 列表 */
    .list-container {
        margin-top: 18px;
        /* justify-content: space-around; */
    }

    .list-item {
        /* display: inline-block; */
        width: 296px;
        /* height: 324px; */
        background-color: #ffffff;
        box-shadow: 7px 7px 0px 0px rgba(165, 192, 230, 0.32);
        border: solid 1px #ebebeb;
        margin-right: 22px;
        margin-top: 19px;
        padding: 28px 38px;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 13px;
        color: #969696;
        line-height: 20px;

        img {
            /* width: 45px; */
            height: 40px;
            margin-right: 14px;
        }

        .item-unit {
            font-family: HarmonyOS_Sans_SC_Bold;
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #1c1c1c;
        }

        .item-botttom {
            margin-top: 30px;
            margin-bottom: 4px;

            .item-number {
                font-family: HarmonyOS_Sans_SC_Bold;
                font-size: 15px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #2f2f2e;
                margin-left: 10px;

            }
        }

        .item-title {
            font-family: HarmonyOS_Sans_SC_Medium;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #2d2b2b;
            margin-bottom: 10px;
        }

        .item-content {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /* 设置最大显示行数 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            margin-bottom: 18px;
        }

        .btn-list {
            margin-bottom: 19px;
        }

        .add-btn {
            font-family: HarmonyOS_Sans_SC_Medium;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 26px;
            letter-spacing: 0px;
            color: #ffffff;
            width: 103px;
            height: 26px;
            background-color: #2964fd;
            border-radius: 13px;
            text-align: center;
        }

        .grade-btn {
            font-family: HarmonyOS_Sans_SC_Medium;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 26px;
            letter-spacing: 0px;
            color: #ffffff;
            width: 103px;
            height: 26px;
            background-color: #f86b6b;
            border-radius: 13px;
            text-align: center;
        }

    }
</style>
