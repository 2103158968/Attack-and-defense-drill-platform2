<template>
    <div class='sys-body'>
        <div class="flex-wrap box-align box-pack-justify">
            <div class="sys-title">攻击方统计</div>
            <div><el-switch v-model="switchValue" active-text="看团队个人" inactive-text="只看团队" active-color="#2964fd"
                    inactive-color="#409EFF">
                </el-switch> </div>
        </div>
        <div class="sys-divider"></div>
        <div class="top-container flex-wrap box-pack-justify">
            <div class="flex-wrap">

                <div class="sys-add-btn sys-btn" @click=""><i class="el-icon-down"></i>导出统计</div>

            </div>
            <div class="search flex-wrap box-align">
                <el-select v-model="listQuery.type" placeholder="请选择排序方式" clearable style="width: 300px;">
                    <el-option label="攻击次数" value="攻击次数"></el-option>
                    <el-option label="在线时长" value="在线时长"></el-option>
                </el-select>
                <el-input placeholder="搜索攻击方团队" prefix-icon="el-icon-search" v-model="listQuery.keySearch"
                    style="margin-left: 10px;" clearable>
                </el-input>
            </div>

        </div>
        <!-- 列表 -->
        <div class="list-container">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                ref="multipleTable">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" :label="switchValue?'攻击方姓名':'攻击方团队'">

                </el-table-column>
                <el-table-column prop="num" label="攻击次数">

                </el-table-column>

                <el-table-column prop="submitTime" label="在线时长">
                    <template slot-scope="{row}">
                        <span>{{row.duration || 0}}min</span>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="操作" width="160">
                    <template slot-scope="{row,$index}">
                        <el-button type="text" @click="editForm(row)">编辑</el-button>

                        <el-button type="text" style="color: #fa3737;">删除</el-button>
                    </template>

                </el-table-column> -->
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList" />
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    export default {
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

                    name: '',
                    type: '',//排序方式
                    keySearch: ''

                },
                switchValue: false,
                total: 10,
                addVisible: false,
                tableData: [
                    {
                        id: '1',
                        name: '浙江创智团队',
                        num: 0,
                        duration: '237'
                    },
                    {
                        id: '2',
                        name: '安信检测',
                        num: 0,
                        duration: '237'
                    },
                ],
                typeOptions: [],//分组属性
                multipleSelection: [],//选中列表
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
<style scoped>
    /* 列表 */
    .list-container {
        margin-top: 36px;
    }
</style>