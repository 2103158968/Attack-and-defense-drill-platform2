<template>
  <div class="add-body">
    <el-form ref="ruleForm" label-width="120px" :model="ruleForm" :rules="rules" autocomplete="off">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户姓名：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户的真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号角色：" prop="role">
            <el-select v-model="ruleForm.role" placeholder="请选择角色名称" style="width: 100%;" clearable
              @change="changeRole">
              <el-option label="攻击方" value="攻击方" />
              <el-option label="防御方" value="防御方" />
              <el-option label="全局选手" value="全局选手" />
            </el-select>
          </el-form-item>
        </el-col>
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
            <el-select v-model="ruleForm.teamId" placeholder="请选择团队" style="width: 100%;" clearable filterable
              @change="changeTeam">
              <el-option v-for="(team,index) in teamOptions" :label="team.name" :value="team.id" />

            </el-select>
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
            <el-input v-model="ruleForm.password" placeholder="请设置初始密码" type="password" autocomplete="new-password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱地址：" prop="Email">

            <el-input v-model="ruleForm.Email" placeholder="请输入用户的邮箱地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="flex-wrap box-pack">
        <el-button type="" @click="close()">取消</el-button>
        <el-button type="danger" @click="saveUser('ruleForm')">确定</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
  import { pageTeam } from '@/api/team'
  import { saveStaff } from '@/api/drillList'
  export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    props: ['drillId'],
    data() {
      // 这里存放数据
      return {
        ruleForm: {
          id: '0',
          name: '',
          role: '',
          idCard: '',
          phone: '',
          teamId: '',
          password: '',
          Email: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户的真实姓名', trigger: 'blur' }

          ],
          role: [
            { required: true, message: '请选择角色名称', trigger: 'blur' }

          ],
          idCard: [
            { required: true, message: '请输入用户的身份证号', trigger: 'blur' }

          ],
          teamId: [
            { required: true, message: '请选择所属团队', trigger: 'blur' }

          ],
          password: [
            { required: true, message: '请设置初始密码', trigger: 'blur' }

          ]
        },
        teamOptions: [],
        listQuery: {
          current: 1,
          size: 9999,
          type: ''
        }

      }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.getTeams()
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
      close() {
        this.resetForm('ruleForm')
        this.$emit('fMethod', false)

      },
      saveUser(formName) {
        this.ruleForm.drillId = this.drillId
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
        this.listQuery.type = _type
        pageTeam(that.listQuery).then((res) => {
          if (res.data.code == 200) {
            var result = res.data.data.records

            that.teamOptions = result
          }
        })
      },
      changeTeam(val) {
        let teamName = this.teamOptions.map(function (item) {
          if (item.id == val) {
            return item.name
          }
        })
        this.ruleForm.teamName = teamName[0]
      },
      changeRole(val) {
        let type = ''
        if (val == '攻击方') {
          type = '攻击方团队'
        } else if (val == '防御方') {
          type = '防御单位团队'
        }
        this.getTeams(type)
      }

    } // 如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style scoped lang="scss">

</style>