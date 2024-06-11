<template>
    <div class='add-body'>
        <el-form label-width="120px" :model="ruleForm" ref="ruleForm" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户姓名：" prop="name">
                        <el-input placeholder="请输入用户的真实姓名" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号名称：" prop="name">
                        <el-input placeholder="请输入账号名称" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="身份证号：" prop="idCard">
                        <el-input placeholder="请输入用户的身份证号" v-model="ruleForm.idCard"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="手机号：" prop="phone">
                        <el-input placeholder="请输入用户的手机号" v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="初始密码：" prop="password">
                        <template #label>
                            <span>初始密码 <i class="el-icon-warning" style="color:#fa9218"></i>:</span>

                        </template>
                        <el-input placeholder="请设置初始密码" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱地址：" prop="Email">

                        <el-input placeholder="请输入用户的邮箱地址" v-model="ruleForm.Email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="有效时间：" prop="Email">

                        <el-input placeholder="请输入用户的邮箱地址" v-model="ruleForm.Email"></el-input>
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

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {

        },
        data() {
            //这里存放数据
            return {
                ruleForm: {
                    id: '0',
                    name: '',
                    userName: '',
                    // status: '',
                    phone: '',
                    idCard: '',
                    email: '',
                    effecyiveTime: '',

                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户的真实姓名', trigger: 'blur' },

                    ],
                    userName: [
                        { required: true, message: '请输入用户的真实姓名', trigger: 'blur' },

                    ],


                    idCard: [
                        { required: true, message: '请输入用户的身份证号', trigger: 'blur' },

                    ],

                    password: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },

                    ],
                }

            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            close() {
                this.$emit('fMethod', false);

            },
            saveUser(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() { }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped lang="scss">

</style>