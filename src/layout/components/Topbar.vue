<template>
    <div class="top-nav">
        <div class="log">
            <img src="../../assets/layout/topbar-logo_03.png" alt="">
        </div>

        <!-- <el-menu :active-text-color="variables.menuActiveText" :default-active="activeMenu" mode="horizontal"
            @select="handleSelect">
            <div v-for="item in routes" :key="item.path" class="nav-item">
                <app-link :to="resolvePath(item)">
                    <el-menu-item v-if="!item.hidden" :index="item.path">{{ item.meta ? item.meta.title :
                        item.children[0].meta.title }}</el-menu-item>
                </app-link>
            </div>
        </el-menu> -->

        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">

                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import variables from '@/styles/variables.scss'
    import { constantRoutes } from '@/router'
    import { mapGetters } from 'vuex'

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {

        },
        data() {
            //这里存放数据
            return {
                routes: constantRoutes
            };
        },
        //监听属性 类似于data概念
        computed: {
            ...mapGetters(['avatar']),
            variables() {
                return variables
            },
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                // 如果是首页，首页高亮
                if (path === '/dashboard') {
                    return '/'
                }
                // 如果不是首页，高亮一级菜单
                const activeMenu = '/' + path.split('/')[1]
                return activeMenu
            },
        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            handleSelect() { },
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
<style lang="scss" scoped>

</style>