<template>
  <div id="jiyouCommunity">
    <!-- <audio id="voice" autoplay="autoplay">
      <source :src="mp" />
    </audio> -->
    <header class="header main" id="jiyouweb_header">
      <nav class="nav">
        <h1 class="logo" style="color: violet"></h1>
        <ul class="navi">
          <li>
            <a href="/games" id="games"> <span>游戏</span></a>
          </li>
          <li>
            <a href="/events" id="events"> <span>公告/活动</span></a>
          </li>
          <li>
            <a href="/contact" id="contact"> <span>客服中心</span></a>
          </li>
        </ul>
        <div class="login">
          <div class="login-avatar">
            <MiniUser> </MiniUser>
          </div>
        </div>
      </nav>
    </header>

    <section id="body">
      <section class="section-banner">
        <!-- banner的背景 -->
        <div class="background" :style="bannerBackground">
          <div class="overlay"></div>
        </div>

        <!-- banner走马灯 -->
        <div class="content">
          <!-- 滑动列表 -->
          <div class="slider">
            <!-- 防止空错误 slideItems.dat.length !== 0 -->
            <div
              v-if="slideItems.dat.length !== 0"
              class="slick-list"
              style="width: 1200px"
            >
              <!-- prev -->
              <button
                type="button"
                class="slick-prev slick-arrow"
                style="display: block"
                @click="onClickSlideNav(0)"
              >
                <i class="arrow"></i
                ><span class="icon" :style="prevIconBackground"></span
                ><span class="txt"
                  ><span class="title">{{
                    slideItems.dat[prevIndex].title
                  }}</span
                  ><span id="HIVEsocial_main_banner_prev_game" class="game">{{
                    slideItems.dat[prevIndex].alias
                  }}</span></span
                >
              </button>

              <div class="cover-title">
                <div class="desc">
                  <p class="event_title">
                    {{ slideItems.dat[currentIndex].title }}
                  </p>
                  <p class="game_title">
                    {{ slideItems.dat[currentIndex].alias }}
                  </p>
                  <br style="-webkit-user-select: none; user-select: none" />
                  <div class="slide_progress_bar" style="width: 300px">
                    <p class="progress_num">
                      <span class="current">{{ currentIndex + 1 }}</span
                      >/<span class="total">{{ slideItems.dat.length }}</span>
                    </p>
                    <div class="gauge" :style="processLoading"></div>
                  </div>
                  <!-- end -->
                </div>
              </div>

              <swiper
                :slidesPerView="1"
                :spaceBetween="0"
                :loop="true"
                :pagination="{
                  clickable: true,
                }"
                :navigation="false"
                class="mySwiper"
                @slideChange="onSlideChange"
                @swiper="onSwiper"
              >
                <!-- 滑动列表加载 -->
                <swiper-slide v-for="slideItem in slideItems.dat"
                  ><img class="img-cover" :src="slideItem.cover" />
                </swiper-slide>
              </swiper>

              <!-- next -->
              <button
                type="button"
                class="slick-next slick-arrow"
                style="display: block"
                @click="onClickSlideNav(1)"
              >
                <i class="arrow"></i
                ><span class="icon" :style="nextIconBackground"></span
                ><span class="txt"
                  ><span class="title">{{
                    slideItems.dat[nextIndex].title
                  }}</span
                  ><span id="HIVEsocial_main_banner_prev_game" class="game">{{
                    slideItems.dat[nextIndex].alias
                  }}</span></span
                >
              </button>
            </div>
          </div>
        </div>

        <div class="slide-progress-bar"></div>
      </section>
      <div id="content">
        <section class="section_monthly_issue_game">
          <div class="content">
            <h2>热门游戏</h2>
            <GameSlider></GameSlider>
          </div>
        </section>
      </div>

      <section class="section-updates">
        <div class="content">
          <h2>最近更新的游戏</h2>
          <NormalCards></NormalCards>
        </div>
      </section>
    </section>

    <!-- <div
      style="
        background-color: rgb(190, 114, 114);
        border-radius: 10px;
        width: 200px;
        height: 150px;
        margin: 0 auto;
        position: absolute;
        top: 1000px;
        left: 700px;
        padding: 20px;
      "
    >
      <h3>选择金额进行充值</h3>
      <el-input
        style="margin-top: 40px"
        v-model="input"
        placeholder="输入点数"
      ></el-input>
      <el-button style="width: 100%; margin-top: 10px" type="success"
        >成功按钮</el-button
      >
    </div> -->
    <!-- <audio :src="src" autoplay="autoplay" controls="controls" ref="audio">
      Your browser does not support the audio element.
    </audio> -->
    <footer class="footer">
      <HomeFooter></HomeFooter>
    </footer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  ref,
  reactive,
  watch,
} from 'vue'

import MiniUser from '../components/User/User.vue'

import GameSlider from '../components/Slider.vue'

import NormalCards from '../components/NormalCards.vue'

import HomeFooter from '../components/Footer.vue'

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// all import，不用less和scss了
import 'swiper/swiper-bundle.css'
// import 'swiper/components/navigation/navigation.scss'
// import 'swiper/components/pagination/pagination.scss'
// import 'swiper/components/scrollbar/scrollbar.scss'

// install Swiper modules
SwiperCore.use([Navigation, Pagination])

import { getBanner } from '../api/banner'

import mp from '../assets/20210312033044719.mp3'
import { useSound } from '@vueuse/sound'

export default defineComponent({
  name: 'App',
  components: {
    MiniUser,
    Swiper,
    SwiperSlide,
    GameSlider,
    NormalCards,
    HomeFooter,
  },
  data() {
    return {}
  },
  methods: {},
  setup() {
    let audio = ref(null)
    let src = mp

    let slideItems = reactive({
      dat: [
        // {
        //   title: '内核活动0',
        //   alias: 'kernel event',
        //   cover:
        //     'https://image-glb.qpyou.cn/hubweb/hive_img/web/banner/20200317/41a9e65126c0463ad975ac444027bfa3_1200x490.jpg',
        //   icon:
        //     'https://image-glb.qpyou.cn/hubweb/gmnotice/appcenter/1606972197901.jpg',
        // },
        // {
        //   title: '内核活动1',
        //   alias: 'kernel event',
        //   cover:
        //     'https://image-glb.qpyou.cn/hubweb/hive_img/web/banner/20201203/00d2a88aeb6037a2ada2ffd1ad703e61_1200x490.jpg',
        //   icon:
        //     'https://image-glb.qpyou.cn/hubweb/gmnotice/appcenter/1560919617216.jpg',
        // },
        // {
        //   title: '内核活动2',
        //   alias: 'kernel event',
        //   cover:
        //     'https://image-glb.qpyou.cn/hubweb/hive_img/web/banner/20210204/0aa3bbb693b4d1b9cb6fc61ce9d9ac8e_1200x490.jpg',
        //   icon:
        //     'https://image-glb.qpyou.cn/hubweb/gmnotice/appcenter/1612412918869.jpg',
        // },
      ],
    })

    // let slideItems = reactive({
    //   dat: [
    //     {
    //       title: '内核活动2',
    //       alias: 'kernel event',
    //       cover:
    //         'https://image-glb.qpyou.cn/hubweb/hive_img/web/banner/20210204/0aa3bbb693b4d1b9cb6fc61ce9d9ac8e_1200x490.jpg',
    //       icon:
    //         'https://image-glb.qpyou.cn/hubweb/gmnotice/appcenter/1612412918869.jpg',
    //     },
    //   ],
    // })

    // 横幅背景引用
    let bannerBackground = ref('')
    // 左侧导航icon
    let prevIconBackground = ref('')
    // 右侧导航icon
    let nextIconBackground = ref('')
    // process
    let processLoading = ref('')

    /**
       * 虚化背景替换
       * @param r 操作对象
       * @param url 传入背景地址
       * @example changeBackground(
            bannerBackground,
            'https://image-glb.qpyou.cn/hubweb/hive_img/web/banner/20201203/00d2a88aeb6037a2ada2ffd1ad703e61_1200x490.jpg'
          )
       **/
    function changeBackground(r, url) {
      r.value = 'background-image: url("' + url + '")'
    }

    let prevIndex = ref(0)
    let nextIndex = ref(0)

    let currentIndex = ref(0)

    // 横幅走马灯更改时
    function onSlideChange(e) {
      console.log(e.realIndex)
      // 索引判断
      if (slideItems.dat.length === 1 || slideItems.dat.length === 0) {
        prevIndex.value = 0
        nextIndex.value = 0
      } else {
        if (e.realIndex === 0) {
          prevIndex.value = slideItems.dat.length - 1
        } else {
          prevIndex.value = e.realIndex - 1
        }

        if (e.realIndex === slideItems.dat.length - 1) {
          nextIndex.value = 0
        } else {
          nextIndex.value = e.realIndex + 1
        }
      }

      // console.log(prevIndex.value, nextIndex.value)
      // 更改主背景
      changeBackground(bannerBackground, slideItems.dat[e.realIndex].cover)
      // 更改 prev icon
      changeBackground(prevIconBackground, slideItems.dat[prevIndex.value].icon)
      // 更改 next icon
      changeBackground(nextIconBackground, slideItems.dat[nextIndex.value].icon)
      loadingValue = 0
      currentIndex.value = e.realIndex
      // console.log(currentIndex.value)
    }

    let loadingValue = 0
    let timer

    onMounted(() => {
      processLoading.value = 'width:0px'

      // 获取数据
      getBanner().then((res) => {
        // console.log(res.Data)
        slideItems.dat.length = 0
        slideItems.dat = res.Data

        // 初始化背景
        if (slideItems.dat.length > 0) {
          changeBackground(bannerBackground, slideItems.dat[0].cover)
        }

        timer = setInterval(() => {
          processLoading.value = 'width:' + loadingValue + 'px'
          loadingValue++
          if (loadingValue == 200) {
            if (slideItems.dat.length > 1) {
              mSwiper.slideNext()
            }
            loadingValue = 0
          }
        }, 30)
      })
    })

    // swiper 初始化完成
    let mSwiper
    function onSwiper(mInstance) {
      console.log('[swiper] init done')
      mSwiper = mInstance
    }

    // 导航切换
    function onClickSlideNav(direction) {
      if (direction === 0) {
        mSwiper.slidePrev()
      } else {
        mSwiper.slideNext()
      }
    }

    return {
      bannerBackground,
      slideItems,
      onSlideChange,
      nextIndex,
      prevIndex,
      onClickSlideNav,
      onSwiper,
      prevIconBackground,
      nextIconBackground,
      processLoading,
      currentIndex,
      audio,
      mp,
    }
  },
})
</script>

<style>
body {
  /* 全局污染 白色主题 */
  background-color: #f7f8fa !important;
}
#app {
  background-color: #f7f8fa;
}

.header.main {
  background-color: rgba(0, 0, 0, 0);
}

.header {
  position: relative;
  margin: 0;
  padding: 0;
  background-color: #000;
}

/* 导航栏 */
.nav {
  width: 1240px;
  height: 82px;
  position: relative;
  z-index: 100;
  margin: 0 auto;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

/* 标题logo */
.nav .logo {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 16px;
  left: 20px;
  font-size: 0;
  color: rgba(0, 0, 0, 0);

  /* logo */
  background-color: gray;
  border-radius: 10px;
}

ol,
ul {
  list-style: none;
}

a {
  color: inherit;
}

/* 思源 */
span {
  font-family: 'Noto Sans SC', sans-serif;
}

/* 头部列表 */
.nav .navi li {
  height: 82px;
  display: inline-block;
  position: relative;
  margin: 0 31px;
  padding: 0 2px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.47;
  color: #fff;
  color: #b0baca;
  vertical-align: middle;
}

.nav .navi li a {
  width: 100%;
  height: 100%;
  display: inline-block;
}

.nav .navi li a:after {
  width: 0;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  content: '';
}

/* 悬浮 */
.nav .navi li:hover a {
  color: #1277ff;
}

/* 头像相关 */
.nav .login {
  width: auto;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  color: #b0baca;
  text-align: right;
}

/* 头像相关 */
.nav .login .login-avatar {
  font: inherit;
  color: inherit;

  width: 50px;
  height: 50px;
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 0;
}

/* banner的背景 */
.section-banner .background {
  max-width: 1920px;
  height: 480px;
  position: relative;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 1920px auto;
  transition: background-image 0.3s ease-in-out;
  opacity: 1;
}

/* background overlay */
.section-banner .background .overlay {
  max-width: 1920px;
  height: 480px;
  position: relative;
  margin: 0 auto;
  background-image: url(../assets/overlay_main_top.png);
  background-repeat: repeat-x;
  background-position: 50% 50%;
  background-size: 1px 480px;
  -webkit-transition: background-image 1s ease-in-out;
  transition: background-image 1s ease-in-out;
}

.section-banner {
  height: 480px;
  margin: -82px auto 92px;
  background-color: #0a0a12;
}

/* swipe top 部分 */
.section-banner .content {
  height: 480px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -600px;
}

.section-banner .slider {
  width: 1200px;
  height: 490px;
  position: absolute;
  overflow: hidden;
  top: 82px;
  left: 0;
  border-radius: 20px;
}

.section-banner .slider .slick-arrow {
  width: 384px;
  height: 90px;
  position: absolute;
  z-index: 10;
  top: 50%;
  margin-top: -45px;
  background-color: rgba(10, 10, 18, 0.9);
  -webkit-transition: transform 0.5s ease-out;
  transition: transform 0.5s ease-out;
}

.section-banner .slider .slick-arrow .arrow {
  width: 7px;
  height: 10px;
  position: absolute;
  top: 50%;
  margin: -5px 0 0 0;
}

.section-banner .slider .slick-prev .arrow {
  left: 348px;
  background-position: -504px -57px;
}

.section-banner .slider {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* prev */
.section-banner .slider .slick-prev .arrow {
  left: 348px;
  background-position: -504px -57px;
}

/* 箭头图片加载 */
.arrow {
  background-image: url(../assets/icon_2x.png);
  background-repeat: no-repeat;
  background-size: 512px 512px;
}

.section-banner .slider .slick-prev .icon {
  right: 60px;
}

.section-banner .slider .slick-arrow .icon {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-size: 100% 100%;
  border: 2px solid #1277ff;
  border-radius: 50px;
}

button {
  vertical-align: top;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: none;
  outline: none;
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}

.section-banner .slider .slick-prev:hover {
  -webkit-transform: translateX(330px);
  transform: translateX(330px);
}

.section-banner .slider .slick-prev {
  left: -330px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

* {
  border: 0;
}

.section-banner .slider .slick-arrow .txt .title {
  width: 238px;
  height: 24px;
  position: absolute;
  top: 22px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: #1277ff;
}

.section-banner .slider .slick-prev .txt .title {
  overflow: hidden;
  right: 126px;
  text-overflow: ellipsis;
  word-wrap: normal !important;
  white-space: nowrap;
}

.section-banner .slider .slick-prev .txt {
  text-align: right;
}

.section-banner .slider .slick-prev .txt .game {
  overflow: hidden;
  right: 126px;
  text-overflow: ellipsis;
  word-wrap: normal !important;
  white-space: nowrap;
}
.section-banner .slider .slick-arrow .txt .game {
  width: 238px;
  height: 18px;
  position: absolute;
  top: 50px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.38;
  color: #7e8592;
}

/* next */
.section-banner .slider .slick-next {
  right: -330px;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
}

.section-banner .slider .slick-next .arrow {
  right: 348px;
  background-position: -279px -86px;
}

.section-banner .slider .slick-next .icon {
  left: 60px;
}

.section-banner .slider .slick-next .txt {
  text-align: left;
}

.section-banner .slider .slick-arrow:hover {
  -webkit-transition: transform 0.5s ease-out;
  transition: transform 0.5s ease-out;
}

.section-banner .slider .slick-next:hover {
  -webkit-transform: translateX(-330px);
  transform: translateX(-330px);
}

.section-banner .slider .slick-next .txt .title {
  overflow: hidden;
  left: 126px;
  text-overflow: ellipsis;
  word-wrap: normal !important;
  white-space: nowrap;
}
.section-banner .slider .slick-arrow .txt .title {
  width: 238px;
  height: 24px;
  position: absolute;
  top: 22px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: #1277ff;
}

.section-banner .slider .slick-next .txt .game {
  overflow: hidden;
  left: 126px;
  text-overflow: ellipsis;
  word-wrap: normal !important;
  white-space: nowrap;
}
.section-banner .slider .slick-arrow .txt .game {
  width: 238px;
  height: 18px;
  position: absolute;
  top: 50px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.38;
  color: #7e8592;
}

/* title */
.cover-title {
  position: absolute;
  top: 350px;
  left: 0px;
  width: 400px;
  height: 140px;
  z-index: 20;
}

.cover-title .desc {
  margin-left: 50px;
}

.section-banner .cover-title .desc .event_title {
  display: block;
  overflow: hidden;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.5;
  color: #1277ff;
  text-overflow: ellipsis;
  letter-spacing: normal;
  word-wrap: normal !important;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
}

.section-banner .slider .desc .game_title {
  font-size: 16px;
  font-weight: bold;
  -webkit-user-select: none;
  user-select: none;
  /* color: #7e8592; */
  color: #f7f8fa;
}

* {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  border: 0;
  font-family: 'Noto Sans', sans-serif;
}

.gauge {
  height: 2px;
  background-color: #1277ff;
}

.progress_num {
  font-size: 14px;
  font-weight: bold;
  color: #7e8592;
  -webkit-user-select: none;
  user-select: none;
}

/* content内容 */
.section_monthly_issue_game {
  padding: 70px 0 40px;
}

.section_monthly_issue_game .content {
  overflow-x: hidden;
}

.content {
  width: 1240px;
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.section-updates {
  padding: 0 0 98px;
}

/* table占位 */
.section-updates:after {
  display: table;
  clear: both;
  content: '';
}
.footer {
  background-color: #0a0a12;
}
</style>
