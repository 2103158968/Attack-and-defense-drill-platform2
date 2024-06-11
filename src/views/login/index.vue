<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
      label-position="left">

      <div class="title-container">
        <img src="../../assets/images/login_form_03.png" alt="">
        <img src="../../assets/images/login_form_07.png" alt="">
      </div>

      <el-form-item prop="username">
        <el-row>
          <el-col :span="3">
            <span class="svg-container">
              <!-- <svg-icon icon-class="user" /> -->
              <!-- <i class="log-user"></i> -->
              <img src="../../assets/images/login_form_11.png" alt="">

            </span>
          </el-col>
          <el-col :span="4">
            <div class="log-name">用户名</div>
          </el-col>
          <el-col :span="16">
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"
              tabindex="1" autocomplete="on" />
          </el-col>
        </el-row>




      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-row>
            <el-col :span="3">
              <span class="svg-container">
                <!-- <svg-icon icon-class="password" /> -->
                <img src="../../assets/images/login_form_15.png" alt="">
              </span>
            </el-col>
            <el-col :span="4">
              <div class="log-name">密码</div>
            </el-col>
            <el-col :span="16">
              <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                placeholder="请输入密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
                @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-col>
          </el-row>


        </el-form-item>
      </el-tooltip>
      <el-row :gutter="0">
        <el-col :span="13">
          <el-form-item prop="code" class="code-num">
            <el-row>
              <el-col :span="3">
                <span class="svg-container">
                  <!-- <svg-icon icon-class="password" /> -->
                  <img src="../../assets/images/login_form_18.png" alt="">
                </span>
              </el-col>
              <el-col :span="4">
                <div class="log-name">验证码</div>
              </el-col>
              <el-col :span="16">
                <el-input ref="code" v-model="loginForm.code" placeholder="验证码" name="code" type="text" tabindex="3"
                  autocomplete="on" @keyup.enter.native="handleLogin" />
              </el-col>
            </el-row>



          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="code-container " @click="refreshCodeNumber">
            <img :src="captchaImage" alt="" @click="getCode" class="code-img" />
          </div>
        </el-col>
      </el-row>
      <!-- <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="code" v-model="loginForm.code" placeholder="请输入验证码" name="code" type="text" tabindex="3"
          autocomplete="on" />
      </el-form-item> -->


      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px; height: 53px;
	background-color: #2964fd;
	border-radius: 15px;" @click.native.prevent="handleLogin">立即登录</el-button>


    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  import SocialSign from './components/SocialSignin'

  export default {
    name: 'Login',
    components: { SocialSign },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入账号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于3位'))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
          code: '',
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          code: [
            {
              required: true,
              trigger: 'blur',
              validator: validateCode
            }
          ]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {},
        captchaImage: ''
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      // if (this.loginForm.username === '') {
      //   this.$refs.username.focus()
      // } else if (this.loginForm.password === '') {
      //   this.$refs.password.focus()
      // }
      this.getCode()
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
              .catch((error) => {

                //  this.$message.error(res.message || '登录异常')
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      },
      // afterQRScan() {
      //   if (e.key === 'x-admin-oauth-code') {
      //     const code = getQueryObject(e.newValue)
      //     const codeMap = {
      //       wechat: 'code',
      //       tencent: 'code'
      //     }
      //     const type = codeMap[this.auth_type]
      //     const codeName = code[type]
      //     if (codeName) {
      //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //         this.$router.push({ path: this.redirect || '/' })
      //       })
      //     } else {
      //       alert('第三方登录失败')
      //     }
      //   }
      // }
      //获取验证码
      getCode() {

        const that = this
        that.captchaImage = '/manage/captcha?rand=' + Math.random() * (14 - 1)

        // that.$axios.get("manage/captcha").then((res) => {});
      },
      refreshCodeNumber: function () {
        this.codeNum = this.codeNum + '?t=' + Math.random()
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  /* $bg: #283443; */
  $bg: #dbe8f3;
  $light_gray: #fff;
  /* $cursor: #fff; */
  $cursor: #000;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    min-height: 100%;
    width: 100%;
    /* background-color: $bg; */
    overflow: hidden;
    background: url('../../assets/images/login_bg.png') no-repeat no-repeat;
    background-size: 100% 100%;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $cursor;
        height: 47px;
        caret-color: #fff;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      top: 234px;
      width: 484px;
      max-width: 100%;
      padding: 26px 76px 0;
      margin: 0 1046px;
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 10px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .log-user {}

    .svg-container {
      padding: 12px 5px 0px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

    }


    .title-container {
      position: relative;
      width: 100%;
      text-align: center;
      margin-bottom: 58px;

      img:nth-last-child(n+1) {
        margin-top: 34px;
      }

      /* 子元素宽度的百分比，可以根据需要调整 */



      /* .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      } */
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }

  .login-container ::v-deep .el-form-item {
    width: 325px;
    /* width: 100%; */
    height: 50px;
    background-color: #dbe8f3;
    border-radius: 15px;

  }

  .code-img {
    z-index: 9999999;
    /* width: 82%;
    height: 60px; */
    top: 0;
  }

  .code-container {
    /* height: 45px; */

  }

  .log-name {
    font-family: HarmonyOS_Sans_SC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #262728;
  }

  /* ::v-deep .el-row {
    display: flex;
    align-items: center;
  } */
</style>