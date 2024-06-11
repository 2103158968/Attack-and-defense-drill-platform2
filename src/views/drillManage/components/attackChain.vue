<template>
    <div class='body'>
        <div class="top-container">
            <div class="sys-title">攻击成果统计</div>
            <div class="sys-divider"></div>
            <div class="flex-wrap box-align top-content">
                <div class="totle">
                    <div><span>14</span>个</div>
                    <div class="round-name">攻击成果总数</div>
                </div>
                <div class="top-item flex-wrap box-align">
                    <img src="../../../assets/images/icon-show_03.png" alt="">
                    <div>
                        <div>待审核</div>
                        <div class="item-text">0</div>
                    </div>
                </div>
                <div class="top-item flex-wrap box-align">
                    <img src="../../../assets/images/icon-show_05.png" alt="">
                    <div>
                        <div>审核通过</div>
                        <div class="item-text">10</div>
                    </div>
                </div>
                <div class="top-item flex-wrap box-align">
                    <img src="../../../assets/images/icon-show_07.png" alt="">
                    <div>
                        <div>审核无效</div>
                        <div class="item-text">2</div>
                    </div>
                </div>
                <div class="top-item flex-wrap box-align">
                    <img src="../../../assets/images/icon-show_09.png" alt="">
                    <div>
                        <div>审核驳回</div>
                        <div class="item-text">2</div>
                    </div>
                </div>

            </div>
        </div>
        <div class="bottom-container">
            <div class="flex-wrap box-pack-justify">
                <div class="sys-title">攻击成果列表-攻击链列表</div>

                <div class="remark">是否开放提交报告的操作权限<el-switch v-model="process" style="margin-left: 10px;"
                        active-color="#0d57d6">
                    </el-switch>
                    <span class="switch-text">{{process == true ?'是':'否'}}</span>
                </div>

            </div>
            <div class="sys-divider"></div>
            <div class=" flex-wrap box-pack-justify">
                <div class="flex-wrap">

                    <div class="sys-up-btn sys-btn"><i class="el-icon-down"></i>下载全部报告 </div>
                    <div class="sys-down-btn sys-btn"><i class="el-icon-manage"></i>查看全部攻击链</div>

                    <div class="sys-green-btn sys-btn"><i class="el-icon-up"></i>导出隐患汇总</div>

                </div>
                <div class="search">
                    <el-input placeholder="搜索攻击团队名称/防御团队名称" prefix-icon="el-icon-search" v-model="listQuery.keySearch">
                    </el-input>
                </div>
            </div>
            <div class="list-container">
                <el-table :data="tableData" style="width: 100%" ref="multipleTable">

                    <el-table-column prop="attackName" label="攻击团队名称" width="120">

                    </el-table-column>
                    <el-table-column prop="defenseName" label="防御团队名称" width="200">
                    </el-table-column>
                    <el-table-column prop="number" align="center" label="攻击成果数量">

                    </el-table-column>
                    <el-table-column prop="auditNum" align="center" label="待审核" sortable>
                    </el-table-column>
                    <el-table-column prop="pass" align="center" label="审核通过" sortable>
                    </el-table-column>


                    <el-table-column prop="failNum" align="center" label="审核不通过" sortable>
                    </el-table-column>
                    <el-table-column prop="rejectNum" align="center" label="审核驳回" sortable>
                    </el-table-column>
                    <el-table-column prop="point" align="center" label="总评分" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="创建人">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" width="160">
                    </el-table-column>

                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="{row,$index}">
                            <el-button type="text">查看详情</el-button>
                            <el-button type="text">查看攻击链</el-button>
                            <el-button type="text" style="color: #fa3737;" @click="delData(row)">删除</el-button>
                        </template>

                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current"
                    :limit.sync="listQuery.size" @pagination="getList" />
            </div>

        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import { pageAttack, oneAttack, delAttack } from '@/api/drillList'
    export default {
        props: ['drillId'],
        //import引入的组件需要注入到对象中才能使用
        components: {
            Pagination
        },
        data() {
            //这里存放数据
            return {
                process: true,//是否开放提交报告的操作权限
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
                    // {
                    //     id: '1',
                    //     attackName: '济源战队',
                    //     defenseName: ' 浙江创智科技股份有限公司',
                    //     number: '2',//攻击成果数量
                    //     auditNum: '23',//待审核
                    //     approveNum: '1',//审核通过
                    //     failNum: '0',//审核不通过
                    //     rejectNum: '0',//审核驳回
                    //     point: '3800',//总评分
                    //     name: '李晓霞',//
                    //     updateTime: ' 2024-04-16 10:48:00  '
                    // },


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
                const that = this
                pageAttack(that.listQuery).then(res => {
                    if (res.data.code == 200) {
                        var result = res.data.data
                        that.tableData = result
                        console.log('攻击链列表', result);
                    } else {
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


                    delAttack(row).then(res => {
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
    .top-container {
        padding: 19px 24px;
        background-color: #fff;
    }

    .top-content {
        margin-top: 28px;
        margin-left: 73px;
    }

    .totle {
        width: 144px;
        height: 144px;
        background-color: #097ef6;
        border-radius: 50%;
        text-align: center;
        font-family: HarmonyOS_Sans_SC;
        font-size: 15px;
        letter-spacing: 0px;
        color: rgb(255, 255, 255, 0.9);
        margin: auto 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 133px;

        span {
            font-family: HarmonyOS_Sans_SC_Medium;
            font-size: 35px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }

        .round-name {
            margin-top: 10px;

        }


    }



    .top-item {
        width: 133px;
        height: 70px;
        border-right: solid 2px #ebebeb;
        font-family: HarmonyOS_Sans_SC_Medium;
        font-size: 15px;
        line-height: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #a2a2a2;

        img {
            width: 40px;
            height: 40px;
            margin-right: 16px;
        }

        .item-text {
            font-family: HarmonyOS_Sans_SC_Medium;
            font-size: 25px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
        }
    }

    .top-item:nth-child(n+2) {
        margin-left: 36px;
    }

    .top-item:last-child {
        border: none;
    }

    /* 列表 */
    .bottom-container {
        margin-top: 16px;
        padding: 19px 24px;
        background-color: #fff;
    }

    .remark {
        font-family: HarmonyOS_Sans_SC;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #898989;
    }

    .switch-text {
        margin-left: 7px;

        color: #000000;
    }

    .list-container {
        margin-top: 34px;
    }
</style>