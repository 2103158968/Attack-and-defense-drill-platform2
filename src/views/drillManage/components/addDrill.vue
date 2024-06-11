<template>
    <div class='edit-body'>

        <el-form label-width="160px" :model="ruleForm" ref="ruleForm" :rules="rules">

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="演练名称：" prop="name">
                        <el-input placeholder="请输入演练名称" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主办单位：" prop="sponsor">
                        <el-input placeholder="请输入主办单位" v-model="ruleForm.sponsor"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="创建人" prop="creator">
                        <el-input placeholder="请输入创建人" v-model="ruleForm.creator"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="演练场地：" prop="place">
                        <el-input placeholder="请输入主办单位" v-model="ruleForm.place"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地图资源地址" prop="location">
                        <el-input placeholder="请输入地图资源地址" v-model="ruleForm.location"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="坐标位置(经度)" prop="lon">
                        <el-input placeholder="请输入坐标位置(经度)" v-model="ruleForm.lon"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="坐标位置(纬度)" prop="lat">
                        <el-input placeholder="请输入坐标位置(纬度)" v-model="ruleForm.lat"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="演练时间" prop="drillTime">
                        <el-date-picker v-model="drillTime" type="datetimerange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" @change="getTime"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="裁判重新审核权限" prop="isJudgeRight">
                        <el-switch v-model="ruleForm.isJudgeRight" active-color="#0d57d6" :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                        <span class="switch-text">{{ruleForm.isJudgeRight == 1 ?'开通':'不开通'}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="防守方团队成绩权限" prop="isDefenseRight">
                        <el-switch v-model="ruleForm.isDefenseRight" active-color="#0d57d6" :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                        <span class="switch-text">{{ruleForm.isDefenseRight == 1 ?'开通':'不开通'}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="打分规则" prop="rule">
                        <el-input placeholder="请输入打分规则" v-model="ruleForm.rule"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form-item label="防御单位初始分" prop="startScore">
                        <el-input placeholder="请输入防御单位初始分" v-model="ruleForm.startScore"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="VPN类型" prop="VPNtype">
                        <!-- <el-input placeholder="请输入打分规则" v-model="ruleForm.VPNtype"></el-input> -->
                        <el-select v-model="ruleForm.VPNtype" placeholder="请选择VPN类型" style="width: 100%;">
                            <el-option v-for="(item,index) in VPNOptions" :key="index" :label="item.name"
                                :value="item.name">
                                {{item.name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="防守方目标系统权限" prop="isDefenseTargetRight">
                        <el-switch v-model="ruleForm.isDefenseTargetRight" active-color="#0d57d6" :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                        <span class="switch-text">{{ruleForm.isDefenseTargetRight == 1 ?'开通':'不开通'}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="展示防守方团队排名" prop="isRanking">
                        <el-switch v-model="ruleForm.isRanking" active-color="#0d57d6" :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                        <span class="switch-text">{{ruleForm.isRanking == 1 ?'开通':'不开通'}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="演练结束时继续算分" prop="isCalculating">
                        <el-switch v-model="ruleForm.isCalculating" active-color="#0d57d6" :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                        <span class="switch-text">{{ruleForm.isCalculating == 1 ?'开通':'不开通'}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="flex-wrap box-pack">
                <el-button type="" @click="close()">取消</el-button>
                <el-button type="danger" @click="submit('ruleForm')">确定</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { oneDrill, saveDrill } from '@/api/drillList'
    export default {
        props: [
            'drillId'
        ],
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                ruleForm: {
                    id: '0',
                    name: '',
                    sponsor: '',
                    place: '',
                    location: '',
                    lon: '',
                    lat: '',
                    drillStartTime: '',
                    drillEndTime: '',
                    drillState: '',
                    isJudgeRight: 0,//裁判重新审核权限
                    isDefenseRight: 0,//成绩权限
                    rule: '',//打分规则
                    startScore: '',//防御单位初始分
                    VPNtype: '',
                    creator: '',
                    isDefenseTargetRight: 0,//防守方目标系统权限
                    isRanking: 0,//展示防守方团队排名
                    isCalculating: 0,//演练结束时继续算分
                },
                rules: {
                    name: [
                        { required: true, message: '请输入演练名称', trigger: 'blur' },

                    ],
                    sponsor: [
                        { required: true, message: '请输入主办单位', trigger: 'blur' },

                    ],
                    creator: [
                        { required: true, message: '请输入创建人', trigger: 'blur' },

                    ],
                    place: [
                        { required: true, message: '请输入演练场地', trigger: 'blur' },

                    ],

                },
                drillTime: [],//演练时间
                VPNOptions: [
                    { id: '1', name: 'OpenConnectVpn' }
                ]

            };
        },
        //监听属性 类似于data概念
        computed: {

        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            getTime(val) {
                console.log(val);
                this.ruleForm.drillStartTime = val[0]
                this.ruleForm.drillEndTime = val[1]
            },
            close() {
                this.$emit('fMethod', false);

            },
            //保存
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.ruleForm.id = Number(this.ruleForm.id)
                        saveDrill(this.ruleForm).then(res => {
                            console.log('保存', res);
                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: res.message || '保存成功！'
                                })
                                this.close()
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.message || '保存失败！'
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //编辑的演练详情
            getInfo(_id) {
                const that = this
                oneDrill({ id: _id }).then((res) => {

                    if (res.data.code == 200) {
                        var result = res.data.data[0]
                        if (result.drillStartTime && result.drillEndTime) {
                            this.drillTime[0] = result.drillStartTime
                            this.drillTime[1] = result.drillEndTime
                        }
                        that.ruleForm = result
                        console.log('编辑', that.ruleForm);
                    } else {
                        return false
                    }
                })
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

            this.getInfo(this.drillId)
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
<style scoped>
    .switch-text {
        padding-left: 5px;
        vertical-align: middle;
    }
</style>