<template>
    <div class='sys-body'>
        <div class="sys-title">VPN账号列表</div>
        <div class="sys-divider"></div>
        <div class="top-container flex-wrap box-pack-justify">
            <div class="flex-wrap">

                <div class="sys-add-btn sys-btn" @click="">一键分配</div>
                <div class="sys-add-btn sys-btn" @click="">一键禁用</div>
                <div class="sys-add-btn sys-btn" @click="">一键启用</div>
                <div class="sys-add-btn sys-btn" @click="">导出VPN账号</div>



            </div>
            <div class="search flex-wrap box-align">
                <el-select v-model="listQuery.status" placeholder="请选择状态">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="禁用" value="禁用"></el-option>
                </el-select>
                <el-select v-model="listQuery.role" placeholder="请选择账号角色" style="margin-left: 10px;">
                    <el-option label="攻击方" value="攻击方"></el-option>
                    <el-option label="防御方" value="防御方"></el-option>
                </el-select>
                <el-select v-model="listQuery.type" placeholder="请选择账号类型" style="margin-left: 10px;">
                    <el-option label="OpenConnectVpn
" value="OpenConnectVpn
"></el-option>

                </el-select>
                <el-input placeholder="搜索VNP账号名/当前使用身份证号" prefix-icon="el-icon-search" v-model="listQuery.keySearch"
                    style="margin-left: 10px;width: 300px;">
                </el-input>
            </div>

        </div>
        <!-- 列表 -->
        <div class="list-container">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                ref="multipleTable">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="VPNName" label="VPN账号名">
                    <template slot-scope="{row}">
                        <span type="text">{{row.VPNName}}</span>
                        <i class="el-icon-document"></i>
                    </template>

                </el-table-column>
                <el-table-column prop="password" label="VPN密码">
                    <template slot-scope="{row}">
                        <el-button type="text">查看</el-button>
                        <i class="el-icon-document"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="IP" label="内网IP">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="{row}">
                        <el-tag :type="row.status== '启用'?'success':'danger'">{{row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="idCard" label="当前使用身份证号">
                </el-table-column>
                <el-table-column prop="roles" label="账号角色">
                </el-table-column>
                <el-table-column prop="type" label="账号类型">
                </el-table-column>


                <el-table-column label="操作" width="200">
                    <template slot-scope="{row,$index}">
                        <el-button type="text" @click="">重置密码</el-button>

                        <el-button type="text" style="color: #67C23A;">重新申请</el-button>
                        <el-button type="text" @click="">禁用</el-button>

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
                    time: '',
                    role: '',
                    status: '',
                    keySearch: ''
                },
                total: 10,
                addVisible: false,
                tableData: [
                    {
                        id: '1',
                        VPNName: 'connect_4qUeFW5',
                        password: '192.888.215.15',
                        IP: '192.888.215.15',
                        status: '启用',
                        idCard: '330327200001291719',
                        roles: '攻击方',
                        type: 'OpenConnectVpn',

                    },
                    {
                        id: '2',
                        VPNName: 'connect_4qUeFWi',
                        password: '192.888.215.15',
                        IP: '192.888.215.15',
                        status: '禁用',
                        idCard: '330327200001291719',
                        roles: '攻击方',
                        type: 'OpenConnectVpn',

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