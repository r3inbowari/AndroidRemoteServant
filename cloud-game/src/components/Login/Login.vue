<template>
  <el-dialog v-model="sw" width="400px" :before-close="handleClose">
    <div class="login-dialog-content">
      <div class="login-logo">
        <img id="logo-bg" :src="logoUrl" alt="logo" />
      </div>
      <div class="login-title">
        <div class="login-top-title"><span>云游</span></div>
        <div class="login-mini-title"><span>专业云游戏中心</span></div>
      </div>
      <transition name="el-fade-in">
        <div v-if="show">
          <div class="car-login">
            <div class="login-form">
              <el-form
                :model="loginData"
                ref="loginRef"
                :rules="loginRules"
                label-width="80px"
              >
                <el-form-item prop="mobile">
                  <el-input
                    prefix-icon="el-icon-mobile-phone"
                    v-model="loginData.mobile"
                    placeholder="手机号"
                    maxlength="11"
                  ></el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <el-input
                    prefix-icon="el-icon-lock"
                    placeholder="密码"
                    v-model="loginData.password"
                    maxlength="18"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div class="login-submit">
            <el-button @click="loginClk" type="success">登录</el-button>
          </div>

          <div class="third-login">
            <el-divider>
              <a class="third-login-a"><span class="dingtalk"></span></a>
              <a class="third-login-a"><span class="wechat"></span></a>
            </el-divider>
          </div>
        </div>
      </transition>
      <div v-if="showLoading" v-loading="true" style="height: 100px"></div>
      <div class="login-footer">
        <a href="">找回密码</a>
        <span class="login-foot-span"></span>
        <a href="">快速注册</a>
        <span class="login-foot-span"></span>
        <a href="">邮箱登录</a>
        <span class="login-foot-span"></span>
        <a href="">遇到问题</a>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import img1 from '../../assets/login-bg.png'
import imgUrl0 from '/src/assets/login-bg.png'

import { defineComponent, ref, onMounted, toRefs, reactive, watch } from 'vue'

import { userLogin } from '../../api/user'
import { useStore } from 'vuex'
import { key } from '../../store'

import { VueCookieNext } from 'vue-cookie-next'

// el-message import
import { ElMessage } from 'element-plus'

import { ElNotification } from 'element-plus'

// import { initImage } from './item.ts'

/**
 * 登录组件
 * @props
 **/
export default defineComponent({
  data() {
    return {
      // login logo
      logoUrl: imgUrl0,
      // loginData: {
      //   mobile: '',
      //   password: '',
      // },
      // main form show param
      // show: true,
      // // loading tag param
      // show1: false,
      // // dialog switch
      // switch: false,
    }
  },

  props: {},

  setup(props, { attrs, slots, emit }) {
    const show = ref(true)
    const showLoading = ref(false)
    const sw = ref(false)
    // console.log('12')
    // console.log(this.$cookie.isCookieAvailable('token'))
    // const loginFunc = async () => {
    //   repositories.value = await fetchUserRepositories(props.user)
    // }

    // get store using inject store key
    const store = useStore(key)

    const loginData = reactive({
      mobile: '',
      password: '',
    })

    const loginRef = ref(null)
    // in this time, the template div is not mounted to the vdom,
    // we can not read the ref on this process
    // the ref will bu attach on mounted() (auto)
    // console.log(loginRef.value)

    // watch(loginRef, (element, prevElement) => {
    //   console.log(element)
    //   console.log('as')
    //   // loginRef.value = element
    //   console.log(element instanceof HTMLCanvasElement)
    //   if (element instanceof HTMLCanvasElement) {
    //     console.log('ass')
    //     loginRef.value = element
    //     if (onMountCallback && prevElement === null) onMountCallback(loginRef)
    //   } else {
    //     loginRef.value = null
    //   }
    // })

    const loginRules = reactive({
      mobile: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        // { min: 11, max: 11, message: '手机号长度为11字符', trigger: 'blur' },
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    })

    function loginClk() {
      // loginRef.value.validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })

      // catch validate promise ?
      // error: validate() is is promise function.
      // test 15598870762
      loginRef.value.validate((valid) => {
        if (valid) {
          // open loading status
          showLoading.value = true
          show.value = false

          // console.log('login process');
          // console.log(loginData);

          // validated and login req
          userLogin(loginData.mobile, loginData.password)
            .then((res) => {
              if (res.code === 2005) {
                ElNotification({
                  title: '成功',
                  message: '登陆成功 用户: ' + loginData.mobile,
                  type: 'success',
                })

                VueCookieNext.setCookie('token', res.data, { expire: '7d' })
                store.commit('setToken', res.data)
              } else {
                ElNotification({
                  title: '错误',
                  message: '账号或密码错误，请重试(' + res.code + ')',
                  type: 'error',
                })
              }
              show.value = true
              showLoading.value = false
              sw.value = false
            })
            .catch((e) => {
              ElNotification({
                title: '错误',
                message: '账号或密码错误，请重试(' + e.response.data.code + ')',
                type: 'error',
              })
              show.value = true
              showLoading.value = false
            })
        } else {
          ElNotification({
            title: '错误',
            message: '参数错误(2901)',
            type: 'error',
          })
          return false
        }
      })
      // console.log('logindata', loginData)
      // const store = useStore(key)

      // validate login by server
      // if (VueCookieNext.isCookieAvailable('token')) {
      //   store.commit('setToken', VueCookieNext.getCookie('token'))
      // } else {
      //   userLogin('15598870762', '15598870762').then((res) => {
      //     if (res.code === 2005) {
      //       console.log('login succeed')
      //       VueCookieNext.setCookie('token', res.data, { expire: '7d' })
      //       // const store = useStore(key)
      //       store.commit('setToken', res.data)
      //     }
      //   }).catch(e => {
      //     console.log(e);

      //   })
      // }
    }

    return {
      loginClk,
      store,
      loginData,
      loginRules,
      loginRef,
      showLoading,
      show,
      sw,
    }
  },
  mounted() {
    // const store = useStore(key)
    // store.commit('setToken', this.$cookie.getCookie('token'))
  },
  methods: {
    onClick() {
      console.log('clk')
      this.show = false
      setTimeout(() => {
        this.showLoading = true
      }, 300)

      this.Login()
      // const store = useStore(key)
      // store.commit('setToken', this.$cookie.getCookie('token'))
      setTimeout(() => {
        this.showLoading = false
        this.show = true
      }, 4000)
    },
    // 登录窗口被关闭时
    handleClose() {
      this.sw = false
    },

    needLogin() {
      this.sw = true
    },
    Login() {
      // local login
      let that = this
      if (this.$cookie.isCookieAvailable('token')) {
        console.log('asd')
      } else {
        userLogin('15598870762', '15598870762').then((res) => {
          console.log(res.code)
          if (res.code === 2005) {
            console.log('login succeed')
            that.$cookie.setCookie('token', res.data, { expire: '7d' })
            const store = useStore(key)
            store.commit('setToken', res.data)
          }
        })
      }
    },
  },
})
</script>

<style>
.car-login .el-carousel__item {
  background-color: #fff !important;
}

.third-login span {
  display: inline-block;
  width: 28px;
  height: 29px;
  background-image: url('/src/assets/third-part.png');
  background-repeat: no-repeat;
  background-size: 100%;
  vertical-align: middle;
  margin-right: 5px;
}
.third-login span.wechat {
  background-position: 0 -59.5px;
}
.third-login span.dingtalk {
  background-position: 0 -28.7px;
}
.third-login {
  margin-top: 30px;
  text-align: center;
  width: 320px;
  margin-left: 20px;
  margin-bottom: 30px;
}
.login-logo img {
  width: 320px;
}

.login-logo {
  text-align: center;
}

.login-dialog-content .el-form-item__content {
  margin-left: 0px !important;
}

.login-foot-span {
  display: inline-block;
  width: 1px;
  height: 14px;
  vertical-align: middle;
  margin: 0 8px 3px;
  background-color: #e8e8e8;
}

.login-top-title {
  font-size: 32px;
  line-height: 1.2;
  color: #262626;
}

.login-mini-title {
  color: #595959;
  margin-top: 8px;
  font-size: 18px;
}

.login-title {
  margin-top: 14px;
  text-align: center;
  margin-bottom: 18px;
}

.login-title a,
span::selection {
  background-color: rgb(209, 236, 249);
}
.login-footer a::selection {
  background-color: rgb(209, 236, 249);
}

.login-form {
  width: 320px;
  margin-left: 20px;
  height: 124px;
}

.login-submit .el-button {
  width: 320px;
  /* margin-left: 20px; */
}

.login-submit {
  text-align: center;
}

.login-footer {
  text-align: center;
  width: 320px;
  margin-left: 20px;
  margin-top: 20px;
}
</style>
