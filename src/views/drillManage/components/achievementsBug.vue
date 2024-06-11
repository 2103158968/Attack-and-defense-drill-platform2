<template>
    <div class='sys-body'>
        <div class="sys-title">0-Day漏洞列表
            <span class="top-text">（提交审核后需要刷新当前页显示最新审核状态）</span>
        </div>

        <div class="sys-divider"></div>
        <div class="top-container flex-wrap box-pack-justify">
            <div class="flex-wrap">

                <div class="sys-add-btn sys-btn" @click=""><i class="el-icon-down"></i>下载报告中</div>
                <div class="sys-add-btn sys-btn" @click=""><i class="el-icon-down"></i>导出防御汇总</div>
            </div>
            <div class="search flex-wrap box-align">
                <el-select v-model="listQuery.approve" placeholder="选择审核状态" clearable style="width: 40%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-date-picker v-model="listQuery.time" type="daterange" range-separator="~" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd" style="margin-left: 10px;width: 60%;" clearable>
                </el-date-picker>
                <el-input placeholder="搜索攻击团队名称/漏洞编号/漏洞标题/提交人" clearable prefix-icon="el-icon-search"
                    v-model="listQuery.keySearch" style="margin-left: 10px;">
                </el-input>
            </div>

        </div>
        <!-- 列表 -->
        <div class="list-container">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                ref="multipleTable">
                <el-table-column type="selection" width="55" align="center"></el-table-column>

                <el-table-column prop="name" label="攻击团队名称">
                </el-table-column>
                <el-table-column prop="number" label="漏洞编号">

                </el-table-column>
                <el-table-column prop="submitter" label="漏洞标题">
                </el-table-column>
                <el-table-column prop="defenseTeam" label="漏洞类型">
                </el-table-column>
                <el-table-column prop="approve" label="审核状态">
                </el-table-column>
                <el-table-column prop="point" label="评分">
                </el-table-column>
                <el-table-column prop="targetName" label="提交人">
                </el-table-column>

                <el-table-column prop="submitTime" label="提交时间">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="{row,$index}">
                        <el-button type="text">查看详情</el-button>

                        <el-button type="text" style="color: #fa3737;" @click="delData(row)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList" />
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import { pageDefense, oneDefense, delBug } from '@/api/drillList'
    export default {
        props: ['drillId'],
        //import引入的组件需要注入到对象中才能使用
        components: {
            Pagination
        },
        data() {
            //这里存放数据
            return {
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    title: '',
                    content: '',
                    name: '',
                    type: '',
                    time: '',
                    approve: '',
                    keySearch: '',
                    drillId: this.drillId
                },
                total: 10,
                addVisible: false,
                tableData: [
                    {

                    },
                ],
                typeOptions: [],//分组属性
                multipleSelection: [],//选中列表
                switchValue: true,
                options: [{
                    value: '1',
                    label: '通过'
                }, {
                    value: '2',
                    label: '未通过'
                },],
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getList() {
                const that = this
                pageDefense(that.listQuery).then(res => {
                    if (res.data.code == 200) {
                        var result = res.data.data
                        that.tableData = result
                    }
                    else {
                        return false
                    }
                })

            },
            //删除
            delData(row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                    delBug(row).then(res => {
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
    /* 列表 */
    .list-container {
        margin-top: 36px;
    }

    .top-text {
        font-family: HarmonyOS_Sans_SC;
        font-size: 14px;

        color: #868686;
    }
</style>