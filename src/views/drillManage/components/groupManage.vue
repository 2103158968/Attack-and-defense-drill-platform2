<template>
    <div class='sys-body'>
        <div class="sys-title">分组管理</div>
        <div class="sys-divider"></div>
        <div class="top-container flex-wrap box-pack-justify">
            <div class="flex-wrap">

                <div class="sys-add-btn sys-btn" @click=""><i class="el-icon-add"></i>添加分组</div>
                <div class="sys-del-btn sys-btn" @click=""><i class="el-icon-del"></i>批量删除</div>
            </div>
            <div class="search flex-wrap box-align">
                <el-select v-model="listQuery.type" placeholder="选择分组属性" style="width: 100%;margin-right: 10px;">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :value="item.name"
                        :label="item.name"></el-option>
                </el-select>
                <el-input placeholder="搜索分组名称" prefix-icon="el-icon-search" v-model="listQuery.keySearch">
                </el-input>
            </div>

        </div>
        <!-- 列表 -->
        <div class="list-container">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                ref="multipleTable">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="分组名称">

                </el-table-column>
                <el-table-column prop="point" label="坐标">
                </el-table-column>
                <el-table-column prop="attribute" label="分组属性">
                </el-table-column>
                <el-table-column prop="connectTeam" label="关联攻击团队">
                </el-table-column>


                <el-table-column label="操作" width="200">
                    <template slot-scope="{row,$index}">
                        <el-button type="text" @click="editForm(row)">编辑</el-button>

                        <el-button type="text" style="color: #fa3737;">删除</el-button>
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
                    title: '',
                    content: '',
                    name: '',
                    type: '',
                    keySearch: ''
                },
                total: 10,
                addVisible: false,
                tableData: [
                    {
                        id: '1',
                        name: '浙江创智',
                        point: '',
                        attribute: '',
                        connectTeam: '浙江创智团队'

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