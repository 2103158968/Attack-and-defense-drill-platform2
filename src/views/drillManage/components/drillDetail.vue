<template>
  <div class="body">
    <div class="left">
      <div class="sys-title">演练列表</div>
      <div class="sys-divider" />
      <div class="top">
        <span class="drill-id">演练ID:{{ info.id }}</span>
        <span class="time">创建时间：{{ info.createTime }}</span>
        <span
          v-show="info.drillState"
          :class="info.drillState == '进行中'?'type color2':info.drillState == '未启用'?'type color1':'type color4'"
        >{{ info.drillState }}</span>
      </div>
      <div class="detail-container">
        <el-row :gutter="20">
          <el-col :span="8" class="title">演练名称</el-col>
          <el-col :span="16">{{ info.name }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">主办单位</el-col>
          <el-col :span="16">{{ info.sponsor }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">演练场地</el-col>
          <el-col :span="16">{{ info.place }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">地图资源地址</el-col>
          <el-col :span="16">{{ info.location }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">坐标位置</el-col>
          <el-col :span="16">{{ info.lon }}<span v-show="info.lat">,{{ info.lat }}</span></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">演练时间</el-col>
          <el-col
            v-show="info.drillStartTime && info.drillEndTime"
            :span="16"
          >{{ info.drillStartTime }}~{{ info.drillEndTime }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">裁判重新审核权限</el-col>
          <el-col :span="16"><el-switch v-model="info.isJudgeRight" active-color="#0d57d6" disabled />
            <span class="switch-text">{{ info.process == true ?'开通':'不开通' }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">防守方团队成绩权限</el-col>

          <el-col :span="16"><el-switch v-model="info.isDefenseRight" active-color="#0d57d6" disabled />
            <span class="switch-text">{{ info.isDefenseRight == '是' ?'开通':'不开通' }}</span>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">打分规则</el-col>
          <el-col :span="16">{{ info.rule }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">防御单位初始分</el-col>
          <el-col :span="16">{{ info.startScore }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">VPN类型</el-col>
          <el-col :span="16">{{ info.VPNType }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">创建人</el-col>
          <el-col :span="16">{{ info.creator }}</el-col>
        </el-row>
        <!-- <el-row :gutter="20">
                    <el-col :span="8" class="title">创建时间</el-col>
                    <el-col :span="16">{{info.createDate}}</el-col>
                </el-row> -->
        <el-row :gutter="20">
          <el-col :span="8" class="title">防守方目标系统权限</el-col>
          <el-col :span="16"><el-switch v-model="info.isDefenseTargetRight" active-color="#0d57d6" disabled />
            <span class="switch-text">{{ info.isDefenseTargetRight == true ?'开通':'不开通' }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">展示防守方团队排名</el-col>
          <el-col :span="16">
            <i class="el-icon-warning" style="color:#fa9218;margin-right: 7px;" />
            <el-switch v-model="info.isRanking" active-color="#0d57d6" disabled />
            <span class="switch-text">{{ info.isRanking == true ?'开通':'不开通' }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="title">演练结束时继续算分</el-col>
          <el-col :span="16"><el-switch v-model="info.isCalculating" active-color="#0d57d6" disabled />
            <span class="switch-text">{{ info.isCalculating == true ?'开通':'不开通' }}</span>
          </el-col>
        </el-row>
        <div class="flex-wrap box-pack edit-left">
          <el-button
            type="primary"
            style="background-color: #2964fd; border: none;"
            @click="drillVisible =true"
          >修改</el-button>
        </div>

      </div>

    </div>
    <div class="right-container">
      <div class="sys-title">添加裁判/区域管理员<div class="top-content">
        <img src="../../../assets/images/icon_3.png" alt="">
        注意事项：请于每场演练中添加对应的裁判员账号。
      </div>
      </div>
      <div class="sys-divider" />
      <div class=" flex-wrap box-pack-justify">
        <div class="list-container flex-wrap">
          <div
            v-for="(item,index) in filterTypes"
            :class="tabValue == item ?'text-active filter-item':'text filter-item'"
            @click="onChange(item)"
          >
            {{ item }}
            <div v-show="tabValue == item" class="filter-line" />
          </div>
        </div>
        <div class="flex-wrap">
          <el-input v-model="listQuery.keySearch" placeholder="搜索用户姓名/身份证号" prefix-icon="el-icon-search" />
          <div class="sys-btn add-btn" @click="editUser"><i class="el-icon-add" />
            <div>{{ tabValue == '裁判'?'添加裁判':'添加管理员' }}</div>
          </div>
        </div>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%">

          <el-table-column prop="name" label="用户姓名" />
          <el-table-column prop="roleName" label="账号角色" />
          <el-table-column prop="status" label="账号状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '正常' ? 'success' : 'danger'"
              >{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="110" />
          <el-table-column prop="idCard" label="身份证号" width="180" />
          <el-table-column prop="email" label="邮箱地址" width="180" />
          <el-table-column prop="createDate" label="添加时间" width="180" />
          <el-table-column label="操作" width="200">
            <template slot-scope="{row,$index}">
              <el-button type="text" @click="editUser(row)">编辑</el-button>
              <el-button type="text" style="color: #fa9218;">重置密码</el-button>
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
    </div>
    <!-- 添加裁判/管理员 -->
    <el-dialog :visible.sync="addVisible" :title="ruleForm.id== '0' ? '新增':'编辑'" @close="handleClose">
      <el-form ref="ruleForm" label-width="120px" :model="ruleForm" :rules="rules" autocomplete="off">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户姓名：" prop="name">
              <el-input
                v-model="ruleForm.name"
                :placeholder="tabValue == '裁判'? '请输入裁判姓名':'请输入区域管理员姓名' "
              />
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
            <el-form-item label="邮箱地址：" prop="email">

              <el-input v-model="ruleForm.email" placeholder="请输入用户的邮箱地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="flex-wrap box-pack">
          <el-button type="" @click="addVisible = false">取消</el-button>
          <el-button type="danger" @click="saveUser('ruleForm')">确定</el-button>
        </div>
      </el-form>

    </el-dialog>
    <el-dialog :visible.sync="drillVisible" title="编辑演练" width="70%">
      <Add-Drill :drill-id="info.id" @fMethod="closeDrill" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { oneDrill, pageStaff, saveStaff, delStaff } from '@/api/drillList'

import AddDrill from './addDrill.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    Pagination,
    AddDrill
  },
  props: ['drillId'],

  data() {
    // 这里存放数据
    return {
      drillType: 'edit',
      info: {
        // id: '72170',
        // name: '2024年度海宁市“智汇潮涌·共筑网安”攻防演练300人组友谊赛',
        // unit: '浙江创智科技股份有限公司',
        // address: '浙江省嘉兴市南湖区泊金湾明珠广场11楼',
        // mapAddress: '',
        // point: '',
        // time: '2024-04-15 09:00:00 ~ 2024-04-19 11:00:00',
        // process: true,//裁判重新审核权限
        // gradePermissions: '否',//成绩权限
        // gradeRule: '手动打分',//打分规则
        // defenseGrade: '10000',//防御单位初始分
        // VPNtype: 'OpenConnectVpn',
        // creatName: '浙江创智',
        // status: '进行中',
        // createDate: '2024-04-14 21:44:50',
        // targetPermissions: false,//防守方目标系统权限
        // isShow: false,//展示防守方团队排名
        // keep: false,//演练结束时继续算分

      },
      filterTypes: [
        '裁判', '区域管理员'
      ],
      tabValue: '裁判',
      listQuery: {
        current: 1,
        size: 10,
        title: '',
        content: '',
        keySearch: '',
        drillId: this.drillId,
        roleName: ''
      },
      total: 0,
      tableData: [

      ], addVisible: false,
      ruleForm: {
        id: '0',
        name: '',
        roleName: '',
        idCard: '',
        phone: '',
        password: '',
        email: '',
        positionDesc: '正常'
      },
      rules: {
        name: [
          { required: true, message: '请输入用户的真实姓名', trigger: 'blur' }

        ],
        roleName: [
          { required: true, message: '请选择角色名称', trigger: 'blur' }

        ],
        idCard: [
          { required: true, message: '请输入用户的身份证号', trigger: 'blur' }

        ],

        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }

        ]
      },
      drillVisible: false// 编辑演练

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
    this.getInfo(this.drillId)
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
    onChange(val) {
      this.tabValue = val
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
    close() {
      this.addVisible = false
            },

    resetForm(formName) {
                // this.addVisible = false
      this.$refs[formName].resetFields()

            },
    // 关闭前回调
    handleClose(val) {
                this.$nextTick(() => {
        this.resetForm('ruleForm')
                });
            },
    // 编辑裁判/管理员
    editUser(row) {
      if (row.id) {
        this.ruleForm = { ...row }
      } else {
        this.ruleForm = {
          id: '0',
          name: '',
          roleName: '',
          idCard: '',
          phone: '',

          password: '',
          email: ''
        }
      }
      this.addVisible = true
            },
    saveUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.roleName = this.tabValue

          saveStaff(this.ruleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: res.message || '保存成功！'
              })
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
    // 删除
    delData(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
                    delStaff(row).then(res => {
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
            },

    // 关闭演练编辑dialog
    closeDrill(data) {
      this.drillVisible = data
    },
    getInfo(_id) {
      const that = this
      oneDrill({ id: _id }).then((res) => {
                    if (res.data.code == 200) {
          var result = res.data.data[0]
          that.info = result
          console.log(that.info)
                    } else {
          return false
        }
      })
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    .body {
        display: flex;
    }

    .left {
        width: 555px;
        /* height: 937px; */
        background-color: #ffffff;
        /* display: inline-block; */
        padding: 19px 24px;
    }

    .drill-id {
        font-family: HarmonyOS_Sans_SC_Bold;
        font-size: 18px;
        font-weight: 600;

        letter-spacing: 0px;
        color: #131313;
    }

    .time {
        margin-left: 17px;
        font-family: HarmonyOS_Sans_SC;
        font-size: 14px;
        letter-spacing: 0px;
        color: #868686;
    }

    .type {
        /* width: 76px; */
        height: 24px;
        /* background-color: #ff7d7a; */
        border-radius: 12px;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 14px;
        color: #fff;
        line-height: 24px;
        padding: 0 18px;
        float: right;
    }

    .color1 {
        background-color: #2964fd;
    }

    .color2 {
        background-color: #ff7d7a;
    }

    .color3 {
        background-color: #5fcab7;
    }

    .color4 {
        background-color: #93a7be;
    }

    .detail-container {
        margin-top: 48px;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        /* line-height: 30px; */
        letter-spacing: 0px;
        color: #282828;
    }

    .el-row {
        margin-top: 25px;
    }

    .title {
        font-family: HarmonyOS_Sans_SC;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        /* line-height: 40px; */
        letter-spacing: 0px;
        color: #8b8989;
        text-align: right;
    }

    .switch-text {
        padding-left: 5px;
        vertical-align: middle;
    }

    .edit-left {
        margin-top: 74px;
    }

    /* 右边 */
    .right-container {
        /* display: inline-block; */
        margin-left: 13px;
        padding: 19px 24px;
        background-color: #ffffff;
        /* width: 100%; */
        width: 1088px;
    }

    .top-content {
        display: inline-block;
        font-family: HarmonyOS_Sans_SC;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #868686;

        img {
            margin: 0 7px 0 27px;
        }
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

    /* 增加按钮 */
    .el-icon-add {
        background: url('../../../assets/images/icon.png') no-repeat;
        background-size: 100%;
        width: 17px;
        height: 17px;
        margin-right: 8px;
    }

    .add-btn {
        background-color: #2964fd;
    }

    .list {
        margin-top: 37px;
    }
</style>
