<template>
    <div class='body'>
        <div class="sys-title">
            目标系统管理
        </div>
        <div class="sys-divider">

        </div>

        <div class="top-container flex-wrap box-pack-justify">
            <div class="flex-wrap">
                <div class="sys-del-btn sys-btn"><i class="el-icon-del"></i>批量删除</i></div>
                <div class="sys-up-btn sys-btn"><i class="el-icon-up"></i>导出目标系统</div>
                <div class="sys-muban-btn sys-btn"><i class="el-icon-muban"></i>下载模板</div>

                <div class="sys-down-btn sys-btn"><i class="el-icon-down"></i>导入目标系统</div>
                <div class="sys-add-btn sys-btn"><i class="el-icon-add"></i>一键获取IP</div>
                <div class="sys-add-btn sys-btn" @click="editForm"><i class="el-icon-add"></i>添加目标系统</div>
            </div>
            <div class="search">
                <el-input placeholder="搜索目标系统名称/防御单位" prefix-icon="el-icon-search" v-model="listQuery.keySearch">
                </el-input>
            </div>
        </div>
        <div class="list-container">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                ref="multipleTable">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="目标系统名称">

                </el-table-column>
                <el-table-column prop="companyName" label="防御单位名称">
                </el-table-column>
                <el-table-column prop="targetIP" label="目标系统IP">
                </el-table-column>
                <el-table-column prop="targetDomain" label="目标系统域名">
                </el-table-column>
                <el-table-column prop="url" label="URL">
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="{row,$index}">
                        <el-button type="text" @click="editForm(row)">编辑</el-button>

                        <el-button type="text" style="color: #fa3737;" @click="delData(row)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList" />
        </div>
        <!-- 目标系统编辑 -->
        <el-dialog :visible.sync="addVisible" :title="ruleForm.id== '0' ? '新增目标系统信息':'编辑目标系统信息'" @close="handleClose">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                <div class="sys-dialog-title">基本信息</div>
                <el-form-item label="目标系统名称" prop="name">
                    <el-input placeholder="请输入目标系统名称" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="防御单位名称" prop="companyName">
                            <span style="color: #a0a0a0;">(如未添加团队则无法选择)</span>
                            <el-select v-model="ruleForm.companyName" placeholder="请选择防御单位" style="width: 100%;"
                                :disabled="unitOptions.length == 0" clearable filterable>
                                <el-option v-for="item in unitOptions" :key="item.id" :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                            <!-- <el-input placeholder="请输入防御单位名称" v-model="ruleForm.companyName"></el-input> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目标系统省市" prop="targetCity">
                            <el-cascader v-model="ruleForm.targetCity" :options="targetCityOptions"
                                :props="{ expandTrigger: 'hover' }" @change="handleChange"
                                style="width: 100%;"></el-cascader>
                            <!-- <el-input placeholder="请输入防御单位名称"></el-input> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="目标系统域名" prop="targetDomain">
                    <i class="el-icon-warning" style="color: #a0a0a0;"></i>
                    <el-input placeholder="请输入目标系统域名" v-model="ruleForm.targetDomain"></el-input>
                </el-form-item>
                <el-form-item label="目标系统IP" prop="targetIP">
                    <span style="color: #a0a0a0;">(目标IP可多填，输入后按回车确认)</span>
                    <el-input placeholder="请输入目标系统IP" v-model="ruleForm.targetIP"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <span style="color: #a0a0a0;">(填写URL时候请包含域名)</span>
                    <el-input placeholder="请输入URL" v-model="ruleForm.url"></el-input>
                </el-form-item>
                <div class="sys-dialog-title">其他信息</div>
                <el-form-item label="是否部署蜜罐" prop="isDeploy">
                    <el-switch v-model="ruleForm.isDeploy" active-color="#0d57d6" :active-value="1" :inactive-value="0">
                    </el-switch>
                    <span class="switch-text">{{ruleForm.isDeploy === 1 ?'是':'否'}}</span>
                </el-form-item>
                <div class="btn-list flex-wrap box-pack">
                    <el-button type="" @click="addVisible = false">取消</el-button>
                    <el-button type="danger" @click="submit('ruleForm')">确定</el-button>
                </div>
            </el-form>
        </el-dialog>



    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import { pageTarget, oneTarget, saveTarget, delTarget } from '@/api/drillList'
    export default {
        props: ['drillId'],
        //import引入的组件需要注入到对象中才能使用
        components: { Pagination },
        data() {
            //这里存放数据
            return {
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    title: '',
                    content: '',
                    name: '',
                    keySearch: '',
                    drillId: this.drillId
                },
                total: 10,
                tableData: [

                ],
                multipleSelection: [],//选中的多选数据
                addVisible: false,
                ruleForm: {
                    id: '0',
                    drillId: '',
                    name: '',
                    companyName: '',
                    targetDomain: '',//域名
                    targetCity: [],//目标系统省市
                    targetIP: '',
                    url: '',
                    isDeploy: 0
                },
                rules: {
                    name: [
                        { required: true, message: '请输入目标系统名称', trigger: 'blur' },
                    ],
                    companyName: [
                        { required: true, message: '请选择防御单位名称', trigger: 'blur' },
                    ],
                    isDeploy: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                },
                unitOptions: [
                    {
                        id: '1',
                        name: '浙江创智科技股份有限公司'
                    }
                ],
                targetCityOptions: [
                    {
                        value: '浙江省',
                        label: '浙江省',
                        children: [{
                            value: '嘉兴市',
                            label: '嘉兴市',

                        }, {
                            value: '杭州市',
                            label: '杭州市',

                        },
                        {
                            value: '绍兴市',
                            label: '绍兴市',

                        },
                        ]
                    },
                    {
                        value: '江苏省',
                        label: '江苏省',
                        children: [{
                            value: ' 南京市',
                            label: ' 南京市',

                        }, {
                            value: '苏州市',
                            label: '苏州市',

                        },
                        {
                            value: '无锡市',
                            label: '无锡市',

                        },
                        ]
                    },

                ]



            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            getList() {
                pageTarget(this.listQuery).then(res => {
                    if (res.data.code == 200) {
                        var result = res.data.data
                        this.tableData = result
                    } else {
                        return false
                    }
                })
            },
            //多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //省市选择
            handleChange(value) {
                console.log(value);
            },
            //删除
            delData(row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                    delTarget(row).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            editForm(row) {
                if (row.id) {
                    if (row.targetCity) {
                        if (row.targetCity.includes(',')) {
                            row.targetCity = row.targetCity.split(',')
                        } else {
                            row.targetCity = [row.targetCity]
                        }
                    }
                    this.ruleForm = { ...row }
                } else {
                    this.ruleForm = {
                        id: '0',
                        name: '',
                        companyName: '',
                        targetDomain: '',//域名
                        targetCity: [],//目标系统省市
                        targetIP: '',
                        url: '',
                        isDeploy: false
                    }
                }
                this.addVisible = true
                // this.resetForm('ruleForm')
            },
            //保存
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        // this.ruleForm.id = Number(this.ruleForm.id)
                        if (this.ruleForm.targetCity.length !== 0) {
                            this.ruleForm.targetCity = this.ruleForm.targetCity.join(',')
                        }
                        this.ruleForm.drillId = this.drillId
                        saveTarget(this.ruleForm).then(res => {

                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: res.message || '保存成功！'
                                })

                                this.resetForm(formName)
                                this.getList()
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

                this.addVisible = false
                this.$refs[formName].resetFields();

            },

            //关闭前回调
            handleClose(val) {

                this.$nextTick(() => {
                    this.resetForm('ruleForm');
                });

            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getList()

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
    .body {
        background-color: #fff;
        padding: 19px 24px;
    }

    .search {
        width: 266px;
    }

    /* 列表 */
    .list-container {
        margin-top: 36px;
    }

    /* dialog */
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

    .switch-text {
        padding-left: 10px;
    }

    .btn-list {
        margin-top: 39px;


    }
</style>