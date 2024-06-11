<template>
  <div class="sys-body">
    <div class=" flex-wrap box-pack-justify box-align">
      <div class="sys-title">用户列表（{{ tabValue }}）</div>
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
        <div class="sys-del-btn sys-btn" @click=""><i class="el-icon-del" />批量删除</div>
        <div class="sys-green-btn sys-btn"><i class="el-icon-up" />导出所有用户</div>

        <div class="sys-add-btn sys-btn" @click="editForm"><i class="el-icon-add" />添加用户</div>
      </div>
      <div class="search">
        <el-input v-model="listQuery.keySearch" placeholder="搜索用户姓名/身份证号" prefix-icon="el-icon-search" />
      </div>

    </div>
    <div class="list-container">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="用户姓名" />
        <el-table-column prop="teamName" :label="tabValue=='攻击方'?'攻击方团队':tabValue == '防御方'?'防御方团队':'团队'" />
        <el-table-column prop="ip" :label="tabValue=='攻击方'?'攻击出口IP':tabValue == '防御方'?'防御出口IP':'IP'" />

        <el-table-column prop="status" label="账号状态">
          <template slot-scope="{row}">
            <span>
              <el-tag :type="row.positionDesc == '正常'?'success':'danger'">{{ row.positionDesc ||
                '异常' }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip />
        <el-table-column prop="email" label="邮箱地址" show-overflow-tooltip />

        <el-table-column prop="createTime" label="添加时间" />

        <el-table-column label="操作" width="200">
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="editForm(row)">编辑</el-button>
            <el-button type="text">密码重置</el-button>

            <el-button type="text" style="color: #fa3737;" @click="delData(row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </div>
    <!-- 添加用户 -->
    <el-dialog :visible.sync="addVisible" :title="(ruleForm.id=='0'?'新增':'编辑')+tabValue">
      <el-form ref="ruleForm" label-width="120px" :model="ruleForm" :rules="rules" autocomplete="off">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户姓名：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入用户的真实姓名" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
                        <el-form-item label="账号名称：" prop="name">
                            <el-input placeholder="请输入账号名称" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col> -->

          <el-col :span="12">
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="ruleForm.idCard" placeholder="请输入用户的身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属团队：" prop="teamId">
              <template #label>
                <span>所属团队 <i class="el-icon-warning" style="color:#fa9218" />:</span>

              </template>
              <el-select
                v-model="ruleForm.teamId"
                placeholder="请选择团队"
                style="width: 100%;"
                clearable
                filterable
                @change="changeTeam"
              >
                <el-option v-for="(team,index) in teamOptions" :label="team.name" :value="team.id" />

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="tabValue=='攻击方'?'攻击出口IP：':tabValue == '防御方'?'防御出口IP：':'IP：'" prop="ip">
              <el-input v-model="ruleForm.ip" placeholder="请输入IP地址" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入用户的手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="初始密码：" prop="password">
              <template #label>
                <span>初始密码 <i class="el-icon-warning" style="color:#fa9218" />:</span>

              </template>
              <el-input
                v-model="ruleForm.password"
                placeholder="请设置初始密码"
                type="password"
                autocomplete="new-password"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱地址：" prop="email">

              <el-input v-model="ruleForm.email" placeholder="请输入用户的邮箱地址" />
            </el-form-item>
          </el-col>

        </el-row>
        <div class="flex-wrap box-pack">
          <el-button type="" @click="close()">取消</el-button>
          <el-button type="danger" @click="saveUser('ruleForm')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { pageTeam } from '@/api/team'
import { pageStaff, saveStaff, delStaff } from '@/api/drillList'
import verify from './../../../utils/verify.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    Pagination
  },
  props: ['drillId'],
  data() {
    // 这里存放数据
    return {
      tabOptions: ['攻击方', '防御方', '全局选手'],
      tabValue: '攻击方',
      listQuery: {
        current: 1,
        size: 10,
        title: '',
        content: '',
        name: '',
        keySearch: '',
        drillId: this.drillId,
        roleName: ''
      },
      total: 0,
      addVisible: false,
      tableData: [

      ],
      ruleForm: {
        id: '0',
        name: '',
        userName: '',
        // status: '',
        phone: '',
        idCard: '',
        email: '',
        effecyiveTime: '',
        teamId: '',
        teamName: '',
        drillId: '',
        positionDesc: '正常',
        ip: '',
        roleName: ''

      },
      rules: {
        name: [
          { required: true, message: '请输入用户的真实姓名', trigger: 'blur' }

        ],
        idCard: [{ required: true, message: '请输入用户的身份证号', trigger: 'blur' }, verify('IDCard')],
        email: [
          verify('email')
        ],
        phone: [
          verify('phone')
        ],
        ip: [verify('ip')],

        password: [
          { required: true, message: '请输入初始密码', trigger: 'blur' }

        ]

      },
      multipleSelection: [], // 选中列表
      teamOptions: [],
      teamQuery: {
        current: 1,
        size: 9999,
        type: '',
        drillId: this.drillId
      }
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
    this.getTeams('攻击方团队')
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
    handleChange(val) {
      this.tabValue = val
      let type = ''
      if (val == '攻击方') {
        type = '攻击方团队'
      } else if (val == '防御方') {
        type = '防御单位团队'
      }
      this.getTeams(type)
      this.getList()
    },

    editForm(row) {
      if (row.id) {
        this.ruleForm = { ...row }
      } else {
        this.ruleForm = {
          id: '0',
          name: '',
          userName: '',
          // status: '',
          phone: '',
          idCard: '',
          email: '',
          effecyiveTime: '',
          teamId: '',
          teamName: '',
          drillId: '',
          positionDesc: '正常',
          ip: ''

        }
      }
      this.addVisible = true
    },
    close() {
      this.addVisible = false
            },
    saveUser(formName) {
      this.ruleForm.drillId = this.drillId
      this.ruleForm.roleName = this.tabValue
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.drillId = this.drillId
          saveStaff(this.ruleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: res.message || '保存成功！'
              })
              this.resetForm(formName)
              this.close()
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: res.message || '保存失败！'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取团队列表
    getTeams(_type) {
      const that = this
      this.teamQuery.type = _type
      pageTeam(that.teamQuery).then((res) => {
        if (res.data.code == 200) {
          var result = res.data.data.records

          that.teamOptions = result
        }
      })
    },
    changeTeam(val) {
      let team = this.teamOptions.map(function(item) {
        if (item.id == val) {
          return item
        }
      })
      console.log(team)
                this.ruleForm.teamName = team[0].team
      this.ruleForm.teamType = team[0].type
    },

    getList() {
      this.listQuery.roleName = this.tabValue
      pageStaff(this.listQuery).then((res) => {
        if (res.data.code == 200) {
          var result = res.data.data
          this.tableData = result
          this.total = res.data.total
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
                    delStaff(row.id).then(res => {
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

    .list-container {
        margin-top: 34px;
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
</style>
