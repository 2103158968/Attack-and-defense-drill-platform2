<template>
  <div class="sys-body">
    <div class="sys-title">攻击日志管理</div>
    <div class="sys-divider" />
    <div class="top-container flex-wrap box-pack-justify">
      <div class="flex-wrap">

        <div class="sys-add-btn sys-btn" @click=""><i class="el-icon-down" />导出攻击日志</div>

      </div>
      <div class="search flex-wrap box-align">
        <el-date-picker
          v-model="listQuery.time"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
        <el-input
          v-model="listQuery.keySearch"
          placeholder="搜索团队名称/用户名称/身份证号"
          prefix-icon="el-icon-search"
          style="margin-left: 10px;"
        />
      </div>

    </div>
    <!-- 列表 -->
    <div class="list-container">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="teamName" label="团队名称" />
        <el-table-column prop="userName" label="用户姓名" />
        <el-table-column prop="postID" label="身份证号" />
        <el-table-column prop="target" label="攻击目标" />
        <el-table-column prop="targetIP" label="目标IP" />
        <el-table-column prop="URL" label="URL" show-overflow-tooltip />
        <el-table-column prop="way" label="攻击方式" />

        <el-table-column prop="submitTime" label="提交时间" />

        <el-table-column label="操作" width="160">
          <template slot-scope="{row,$index}">
            <el-button type="text">查看详情</el-button>

            <el-button type="text" style="color: #fa3737;" @click="delData(row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { pageLog, oneLog, delLog } from '@/api/drillList'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    Pagination
  },
  props: ['drillId'],
  data() {
    // 这里存放数据
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        title: '',
        content: '',
        teamName: '',
        type: '',
        time: '',
        keySearch: '',
        drillId: this.drillId

      },
      total: 0,
      addVisible: false,
      tableData: [
        // {
        //     id: '1',
        //     teamName: '浙江创智团队',
        //     userName: 'zjcz',
        //     postID: '330327200001291719',
        //     attackTarget: '',
        //     targetIP: '192.888.215.15',
        //     URL: 'http://www.7777788888.com/',
        //     attackType: '',
        //     submitTime: '2024-05-20 11:09:00'
        // },
      ],
      typeOptions: [], // 分组属性
      multipleSelection: []// 选中列表
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
    handleSelectionChange(val) {
      this.multipleSelection = val
            },
    getList() {
      pageLog(this.listQuery).then((res) => {
        if (res.data.code == 200) {
          var result = res.data.data
          this.tableData = result
          this.total = res.data.total
        } else {
          return false
        }
      })
            },
    // 删除
    delData(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
                    delLog(row).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
                            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
                        }
        })
                }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
                });
            }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    /* 列表 */
    .list-container {
        margin-top: 36px;
    }
</style>
