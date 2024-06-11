<template>
  <div class="sys-body">
    <div class=" flex-wrap box-pack-justify box-align">
      <div class="sys-title">用户管理</div>
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

        <div class="sys-add-btn sys-btn" @click="editForm"><i class="el-icon-add" />创建{{ tabValue }}</div>
      </div>
      <div class="search">
        <el-input v-model="listQuery.keySearch" placeholder="搜索用户姓名/账号名称" prefix-icon="el-icon-search" />
      </div>

    </div>
    <div class="list-container">
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="name" label="用户姓名" />
        <el-table-column prop="userName" label="账号名称" />
        <el-table-column prop="status" label="账号状态">
          <template slot-scope="{row}">
            <span>
              <el-tag :type="row.status == '正常'?'success':'danger'">{{ row.status }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="idCard" label="身份证号" />
        <el-table-column prop="email" label="邮箱地址" />
        <el-table-column prop="effecyiveTime" label="有效时间" />
        <el-table-column prop="createTime" label="添加时间" />

        <el-table-column label="操作" width="200">
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="editForm(row)">编辑</el-button>
            <el-button type="text">密码重置</el-button>

            <el-button type="text" style="color: #fa3737;">删除</el-button>
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
    <!-- 添加用户 -->
    <el-dialog :visible.sync="addVisible" :title="(ruleForm.id=='0'?'新增':'编辑')+tabValue">
      <el-form ref="ruleForm" label-width="120px" :model="ruleForm" :rules="rules" autocomplete="off">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户姓名：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入用户的真实姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号名称：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入账号名称" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="ruleForm.idCard" placeholder="请输入用户的身份证号" />
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
            <el-form-item label="邮箱地址：" prop="Email">

              <el-input v-model="ruleForm.Email" placeholder="请输入用户的邮箱地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效时间：" prop="effecyiveTime">
              <el-date-picker
                v-model="ruleForm.effecyiveTime"
                type="date"
                placeholder="选择有效时间"
                style="width: 100%;"
              />
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
import { saveStaff } from '@/api/drillList'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    Pagination
  },
  data() {
    // 这里存放数据
    return {
      tabOptions: ['运维管理员', '平台审计员'],
      tabValue: '运维管理员',
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        title: '',
        content: '',
        name: '',
        keySearch: ''
      },
      total: 10,
      addVisible: false,
      tableData: [
        // {
        //     id: '1',
        //     name: '吴王格',
        //     userName: 'wwg',
        //     status: '正常',
        //     phone: '19203339023',
        //     idCard: '330327200001291719',
        //     email: '',
        //     effecyiveTime: '2024-6-1',
        //     createTime: '2024-4-14 19:34:23'
        // },
        // {
        //     id: '2',
        //     name: '吴王格',
        //     userName: 'wwg',
        //     status: '异常',
        //     phone: '19203339023',
        //     idCard: '330327200001291719',
        //     email: '',
        //     effecyiveTime: '2024-6-1',
        //     createTime: '2024-4-14 19:34:23'
        // }, {
        //     id: '3',
        //     name: '吴王格',
        //     userName: 'wwg',
        //     status: '正常',
        //     phone: '19203339023',
        //     idCard: '330327200001291719',
        //     email: '',
        //     effecyiveTime: '2024-6-1',
        //     createTime: '2024-4-14 19:34:23'
        // },
        // {
        //     id: '4',
        //     name: '吴王格',
        //     userName: 'wwg',
        //     status: '正常',
        //     phone: '19203339023',
        //     idCard: '330327200001291719',
        //     email: '',
        //     effecyiveTime: '2024-6-1',
        //     createTime: '2024-4-14 19:34:23'
        // }
      ],
      ruleForm: {
        id: '0',
        name: '',
        userName: '',
        // status: '',
        phone: '',
        idCard: '',
        email: '',
        effecyiveTime: ''

      },
      rules: {
        name: [
          { required: true, message: '请输入用户的真实姓名', trigger: 'blur' }

        ],
        userName: [
          { required: true, message: '请输入用户的真实姓名', trigger: 'blur' }

        ],

        idCard: [
          { required: true, message: '请输入用户的身份证号', trigger: 'blur' }

        ],

        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }

        ]
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
          roleId: '',
          roleName: ''
        }
      }
      this.addVisible = true
    },
    close() {
      this.addVisible = false
            },
    saveUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveStaff(this.ruleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
            } else {
              this.$message({
                type: 'error',
                message: '保存失败'
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

    getList() { }

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
