<template>
  <div class="_2oV8uPP0dj">
    <div>
      <!-- <div class="_24ddJm1Q5s"><h1 class="B4QNkMu-0t">日志</h1></div> -->
      <div style="margin-top: 30px" class="_2QPZldYe9U">
        <div class="_2PCUI90lIf">
          <div class="xOYTLnYrng">
            <input
              placeholder="试试搜索吧"
              type="text"
              class="_1JKQs_Qawx"
              value=""
            />
          </div>
          <div class="_2km92h_dfH">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      <div class="content-main">
        <div>
          <el-table empty-text="无数据" :data="logData.dat" style="width: 100%">
            <el-table-column prop="_id" label="索引"> </el-table-column>
            <el-table-column prop="title" label="游戏"> </el-table-column>
            <el-table-column prop="aid" label="游戏 ID"> </el-table-column>
            <el-table-column prop="uid" label="用户 ID"> </el-table-column>
            <el-table-column prop="device_id" label="设备 ID">
            </el-table-column>
            <el-table-column prop="st" label="开始时间"> </el-table-column>
            <el-table-column prop="duration" label="持续时长(秒)">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div style="padding-bottom: 30px; display: none">
        <div class="PaFzglKCf5" style="height: 593px">
          <div class="_29b6nIu_GY">
            <svg
              width="200"
              height="200"
              viewBox="0 0 320 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  d="M71.689 53.055c9.23-1.487 25.684 27.263 41.411 56.663 18.572-8.017 71.708-7.717 93.775 0 4.714-15.612 31.96-57.405 41.626-56.663 3.992.088 13.07 31.705 23.309 94.96 2.743 16.949 7.537 47.492 14.38 91.63-42.339 17.834-84.37 26.751-126.095 26.751-41.724 0-83.756-8.917-126.095-26.751C52.973 116.244 65.536 54.047 71.689 53.055z"
                  stroke="#eee"
                  stroke-width="4"
                  stroke-linecap="round"
                  fill="currentColor"
                  class=""
                ></path>
                <circle fill="#eee" cx="216.5" cy="181.5" r="14.5"></circle>
                <circle fill="#eee" cx="104.5" cy="181.5" r="14.5"></circle>
                <g stroke="#eee" stroke-linecap="round" stroke-width="4">
                  <path
                    d="M175.568 218.694c-2.494 1.582-5.534 2.207-8.563 1.508-3.029-.7-5.487-2.594-7.035-5.11M143.981 218.694c2.494 1.582 5.534 2.207 8.563 1.508 3.03-.7 5.488-2.594 7.036-5.11"
                  ></path>
                </g>
              </g>
            </svg>
          </div>

          <div style="font-size: 28px">暂无日志...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  ref,
  reactive,
  watch,
} from 'vue'
import { getBanner } from '../api/banner'
import { getHot } from '../api/hot'
import { getUpdate } from '../api/update'

import { useStore } from 'vuex'
import { key } from '../store'
import { useRouter } from 'vue-router'

import { userLogin, userInfo } from '../api/user'

import { Toast } from 'vant'

import { VueCookieNext } from 'vue-cookie-next'

import { getPlayLog } from '../api/session'
import { format } from '../utils'

export default defineComponent({
  components: {},
  setup() {
    const store = useStore(key)
    const router = useRouter()

    const logData = reactive({
      dat: [],
    })

    getPlayLog().then((res) => {
      logData.dat = res.Data
      logData.dat.forEach((element, index) => {
        logData.dat[index].st = format(new Date(element.st * 1000))
      })
    })

    // console.log(format(new Date()))
    return { logData }
  },
})
</script>

<style>
.B4QNkMu-0t {
  text-align: left;
  margin: 0;
  padding: 20px 40px;
  font-size: 2em;
}
h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

._2QPZldYe9U {
  padding: 0 40px 5px;
}

._2PCUI90lIf {
  position: relative;
  height: 40px;
}

.xOYTLnYrng {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
}

._1JKQs_Qawx {
  -webkit-appearance: none;
  background-color: var(--color-input-bg);
  background-image: none;
  border-radius: 20px;
  border: 1px solid var(--color-input-border);
  box-sizing: border-box;
  color: #c1c1c1;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  outline: none;
  padding: 0 15px 0 35px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

._2km92h_dfH {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
}

.PaFzglKCf5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #2d2d30;
}

._29b6nIu_GY {
  opacity: 0.3;
  display: none;
  /* 关闭 */
}

.PaFzglKCf5 div:nth-child(2) {
  color: var(--color-text-secondary);
  font-size: 1.4em;
  opacity: 0.6;
}
</style>

<style scoped>
.content-main {
  margin: 20px 40px 20px 40px;
}
</style>

<!-- 对话框与列表的主题定制 -->
<style>
/* 对话框颜色 */
.el-dialog {
  background-color: var(--color-bg-sidebar);
}

/* 表格底色 */
.el-table th,
.el-table tr {
  background-color: var(--color-bg-sidebar);
}

/* 表格底色扩展 */
.el-table,
.el-table__expanded-cell {
  background-color: var(--color-bg-sidebar);
}

/* 表格项悬浮 */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: var(--color-input-border);
}

/* 表格头颜色 */
.el-table th,
.el-table tr:hover {
  background-color: var(--color-sb-active-row-bg);
}

/* 表格间隔分离 */
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid var(--color-separator);
}

/* 表格底部分离 */
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: var(--color-separator);
}

/* 字体 */
.el-table .cell,
.el-dialog__title {
  color: var(--color-text);
}

/* 弹窗标题字重 */
.el-dialog__title {
  font-weight: bold;
}
</style>
