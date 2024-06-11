<template>
  <div class="body">
    <div class="flex-wrap box-align ">
      <!-- <div class="title-line"></div>
            <div>演练列表</div> -->
      <div class="sys-title">演练列表</div>

    </div>
    <div class="line" />
    <div class="top flex-wrap box-pack-justify">
      <div class="left flex-wrap">
        <div
          v-for="(item,index) in filterTypes"
          :class="tabValue == item ?'text-active filter-item':'text filter-item'"
          @click="onChange(item)"
        >
          {{ item }}
          <div v-show="tabValue == item" class="filter-line" />
        </div>

      </div>
      <div class="right flex-wrap">
        <el-input v-model="listQuery.keySearch" placeholder="搜索演练名称/主办单位" prefix-icon="el-icon-search" />
        <!-- <el-button type="" style="background-color: #ff5b3b;color: #fff;margin-left: 30px;"
                    icon="el-icon-upload">导入演练</el-button> -->
        <!-- <el-button type="" style="background-color: #2964fd;color: #fff; " class="box-align"><i
                        class="el-icon-add"></i>创建演练</el-button> -->
        <div class="sys-btn load-btn"><i class="el-icon-load" />
          <div>导入演练</div>
        </div>
        <div class="sys-btn add-btn" @click="drillVisible = true"><i class="el-icon-add" />
          <div>创建演练</div>
        </div>
      </div>
    </div>
    <div class="list-container column_wrapper">
      <div v-for="(item,index) in list" :key="index" class="list-item">
        <div class="title">{{ item.name }}</div>
        <div :class="item.drillState == '进行中'? 'status-01': item.drillState == '未启用'?'status-02':'status-03'" />
        <div v-show="item.drillState==='进行中'" class="over-btn flex-wrap box-align">
          <img src="../../assets/images/over-icon_06.png" alt="">
          <div>提前结束</div>
        </div>
        <div class="info-container flex-wrap box-pack-justify">
          <div class="left">
            <div class="flex-wrap2">
              <div>
                <span class="info-title">主办单位丨</span>
                <span>{{ item.sponsor }}</span>
              </div>
              <div><span class="info-title">创建人丨</span>
                <span>{{ item.creator }}</span>
              </div>
            </div>
            <!-- <el-row :gutter="20">
                            <el-col :span="14">
                                <span class="info-title">主办单位丨</span>
                                <span>{{item.sponsor}}</span>
                            </el-col>
                            <el-col :span="10" class="text-nowrap">
                                <span class="info-title">创建人丨</span>
                                <span>{{item.creator}}</span>
                            </el-col>
                        </el-row> -->
            <div>
              <span class="info-title">演练场地丨</span>
              <span>{{ item.place }}</span>
            </div>
            <div>
              <span class="info-title">演练时间丨</span>
              <span v-show="item.drillStartTime&& item.drillEndTime">{{ item.drillStartTime }}~{{ item.drillEndTime
              }}</span>
            </div>
          </div>

          <div class="right">
            <div class=" color1" @click="addUser(item.id)">添加用户</div>
            <div class="color2">
              <!-- 管理演练 -->
              <router-link :to="`/drillManage/drillInfo/${item.id}`" exact>演练管理</router-link>

            </div>
            <div class=" color3">成绩统计</div>
            <div class=" color4">导出演练</div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <!-- 添加用户 -->
    <el-dialog :visible.sync="addVisible" title="添加用户信息" @close="closeAdd">
      <add-user ref="child" :drill-id="drillId" :type="'drill'" @fMethod="onClose" />
    </el-dialog>
    <!-- 添加演练 -->
    <el-dialog :visible.sync="drillVisible" title="新增演练" width="70%">
      <Add-Drill :drill-type="drillType" @fMethod="closeDrill" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import AddUser from './components/addUser.vue'
import AddDrill from './components/addDrill.vue'
import { pageDrill } from '@/api/drillList'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Pagination, AddUser, AddDrill },
  data() {
    // 这里存放数据
    return {
      drillType: 'add',
      filterTypes: [
        '全部', '未启用', '进行中', '未开始', '已结束'
      ],

      tabValue: '全部',
      drillId: '', // 用于演练的新增用户
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        title: '',
        content: '',
        name: '',
        drillState: '',
        keySearch: ''
      },
      total: 10,
      addVisible: false,
      drillVisible: false,

      list: [
      ]

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {

  },
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
    // 添加用户
    addUser(id) {
      this.addVisible = true
      this.drillId = id
    },
    closeAdd() {
      this.$refs.child.resetForm('ruleForm')
    },
    onChange(val) {
      this.tabValue = val
      this.getList()
    },
    // toPage() {
    //     this.$router.push({ name: 'DrillInfo' })

    // },
    getList() {
      pageDrill(this.listQuery).then((res) => {
        if (res.data.code == 200) {
          var result = res.data.data

          this.list = result
          if (this.tabValue !== '全部') {
            this.list = this.list.filter(item => {
              return item.drillState = this.tabValue
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    onClose(data) {
      this.addVisible = data
    },
    // 关闭演练编辑dialog
    closeDrill(data) {
      this.drillVisible = data
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="scss">
  .body {
    background-color: #fff;
    padding: 18px 24px;

  }

  /* .top {
        font-family: HarmonyOS_Sans_SC_Bold;
        font-size: 18px;
        color: #000000;
        font-weight: bold;

        .title {
            height: 18px;
            position: relative;
            padding-left: 10px;

            &::before {
                content: '';
                display: block;
                width: 6px;
                height: 100%;
                background-color: #2b75fc;
                border-radius: 3px;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

    } */

  .title-line {
    width: 6px;
    height: 17px;
    background-color: #2b75fc;
    border-radius: 3px;
    margin-right: 9px;
  }

  .line {
    margin-top: 13px;
    width: 100%;
    border-bottom: solid 1px #e7e7e7;
    margin-bottom: 33px;
  }

  .filter-item {
    font-family: HarmonyOS_Sans_SC_Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;

    .filter-line {
      margin-top: 8px;
      width: 100%;
      height: 3px;
      background-color: #2b75fc;
      border-radius: 2px;
    }
  }

  .text-active {
    color: #2b75fc;
  }

  .text {
    color: #000;

  }

  .filter-item:nth-child(n+2) {
    margin-left: 36px;
  }

  .el-icon-load {
    background: url('../../assets/images/icon-2.png') no-repeat;
    background-size: 100%;
    width: 19px;
    height: 16px;
    margin-right: 8px;
  }

  .el-icon-add {
    background: url('../../assets/images/icon.png') no-repeat;
    background-size: 100%;
    width: 17px;
    height: 17px;
    margin-right: 8px;
  }

  .load-btn {
    background-color: #ff5b3b;
  }

  .add-btn {
    background-color: #2964fd;
  }

  /* 列表 */

  .list-container {
    margin-top: 30px;
  }

  .column_wrapper {
    column-count: 2;
  }

  .list-item {
    break-inside: avoid;
    width: 799px;
    min-height: 163px;
    max-height: 163px;
    background-color: #f6f7fb;
    padding: 17px 19px;
    font-family: HarmonyOS_Sans_SC_Medium;
    font-size: 14px;
    color: #393838;
    margin-bottom: 16px;
    position: relative;

    .status-01 {
      position: absolute;
      top: 0;
      left: 0;
      background: url('../../assets/images/left-status_03.png') no-repeat;
      background-size: cover;
      width: 63px;
      height: 57px;
    }

    .status-02 {
      position: absolute;
      top: 0;
      left: 0;
      background: url('../../assets/images/left-status_05.png') no-repeat;
      background-size: cover;
      width: 63px;
      height: 57px;
    }

    .status-03 {
      position: absolute;
      top: 0;
      left: 0;
      background: url('../../assets/images/left-status_09.png') no-repeat;
      background-size: cover;
      width: 63px;
      height: 57px;
    }

    .over-btn {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #f7e7e7;
      border-radius: 0px 0px 0px 10px;
      font-family: HarmonyOS_Sans_SC_Medium;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0px;
      height: 30px;
      color: #ff5b3b;
      padding: 0 10px;

      img {
        margin-right: 5px;
      }

    }

    .title {
      font-family: HarmonyOS_Sans_SC_Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #363636;
      margin-left: 33px;
      font-weight: bold;
    }
  }

  .info-container {
    margin-top: 21px;

    .left {
      line-height: 24px;
      width: 75%;
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background-color: #918e8e;
        border-radius: 3px;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.27;
      }
    }

    .info-title {
      font-family: HarmonyOS_Sans_SC_Medium;
      font-size: 14px;

      line-height: 20px;
      letter-spacing: 0px;
      color: #918e8e;
      white-space: nowrap;
    }

    .right {
      column-count: 2;

      div {
        width: 78px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        white-space: nowrap;

        border-radius: 12px;
        margin-bottom: 12px;
      }

      .color1 {
        background-color: #2964fd;
      }

      .color2 {
        background-color: #ffa024;
      }

      .color3 {
        background-color: #5fcab7;
      }

      .color4 {
        background-color: #93a7be;
      }
    }

  }

  ::v-deep .el-dialog__header .el-dialog__title {
    font-weight: 600;
    position: relative;
    padding-left: 10px;

    &::before {
      content: '';
      display: block;
      width: 6px;
      height: 100%;
      background-color: #2b75fc;
      border-radius: 3px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .text-nowrap {
    white-space: pre-line;
    /* 或者 white-space: pre-wrap; */
  }

  .flex-wrap2 {
    display: flex;
    flex-wrap: wrap;
  }

  /* .info-title {
        width: 150px;
        text-align: right;
        white-space: nowrap;
    } */

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
