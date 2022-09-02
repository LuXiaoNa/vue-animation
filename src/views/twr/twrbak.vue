<template>
  <div class="twr">
    <!-- 本场起飞航班计划 -->
    <div class="left-index">
      <!-- 左侧上部 -->
      <div class="left-top-index">
        <!-- 通播号、运行模式 -->
        <div class="left-top-first-div index-div-style">
          <!-- 通播号 -->
          <div class="datis-div" @click="onDatisClick">
            <div ref="datis" :class="datisDivStyle">{{datis}}</div>
            <div>
              <span>{{ datisdate }}</span>
              <br />
              <span>{{ datistime }}</span>
            </div>
          </div>
          <el-button
            type="primary"
            size="mini"
            @click="onChangeRunWay"
            class="mode-change-button"
            v-isLogin
          >模式变更</el-button>
          <el-button
            type="primary"
            size="mini"
            title="运行模式变更历史记录"
            class="run-mode-history-btn"
            @click="onRunModeHisLook"
            v-isLogin
          >
            <img class="run-mode-history-img" />
          </el-button>
          <span class="run-mode-span">{{ renderRunMode(runMode) }}</span>
        </div>
        <!-- 频率、跑道示意图、灯光、场面状态 -->
        <div class="left-top-second-div index-div-style">
          <div style="margin-bottom:10px">
            <!-- 通信频率 -->
            <span class="query-form-title-label" style="margin-left:0px">塔台频率：</span>
            <!-- <codelist
              type="select"
              ref="tatai"
              :init.sync="areaForm.tatai"
              code="twr_rate"
              @select="(val) => onRateChanged(val, 'tatai')"
              size="small"
              class="rate-codelist"
              v-isLogin
              :allowCreate="true"
            ></codelist>-->
            <span class="query-form-title-label">进近频率：</span>
            <!-- <codelist
              type="select"
              ref="jinjin"
              :init.sync="areaForm.jinjin"
              code="app_rate"
              @select="(val) => onRateChanged(val, 'jinjin')"
              size="small"
              :disabled="true"
              class="rate-codelist"
            ></codelist>-->
            <!-- 灯光等级 -->
            <span class="query-form-title-label">总灯开关：</span>
            <!-- <codelist
              type="select"
              code="sum_lamp_type"
              :init="all_light"
              @select="(e) => onlampChange(e, 'all_light')"
              class="lamp-select"
              v-isLogin
            ></codelist>-->
            <el-tooltip
              class="item"
              effect="dark"
              :content="yjLightTip?yjLightTip:'无调整建议'"
              placement="top"
            >
              <span>
                <span :class="[yjflash?'notUpdate-datis-div':'query-form-title-label']">PaPi灯：</span>
                <!-- <codelist
                  type="select"
                  code="lamp_type"
                  :init="yj_light"
                  @select="(e) => onlampChange(e, 'yj_light')"
                  class="lamp-select"
                  v-isLogin
                ></codelist>-->
              </span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="pdLightTip?pdLightTip:'无调整建议'"
              placement="bottom"
            >
              <span>
                <span :class="[pdflash?'notUpdate-datis-div':'query-form-title-label']">跑道灯：</span>
                <!-- <codelist
                  type="select"
                  code="lamp_type"
                  :init="pd_light"
                  @select="(e) => onlampChange(e, 'pd_light')"
                  class="lamp-select"
                  v-isLogin
                ></codelist>-->
              </span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="hxdLightTip?hxdLightTip:'无调整建议'"
              placement="bottom"
            >
              <span>
                <span :class="[hxdflash?'notUpdate-datis-div':'query-form-title-label']">进近灯：</span>
                <codelist
                  type="select"
                  code="lamp_type"
                  :init="hxd_light"
                  @select="(e) => onlampChange(e, 'hxd_light')"
                  class="lamp-select"
                  v-isLogin
                ></codelist>
              </span>
            </el-tooltip>
            <!-- 当前小时起降架次总和 -->
            <span class="query-form-title-label">小时流量：</span>
            <span :class="overNumClass">{{hourAllPlanNum}}</span>
          </div>
          <!-- 跑道 -->
          <!-- 保护区 -->
          <img
            ref="protectArea"
            src="@/assets/imgs/homePage/protectArea.png"
            class="protect-area-img"
          />
          <img
            ref="west"
            src="@/assets/imgs/homePage/west.png"
            class="west-img"
            @click="onProjectAreaClick('west','4')"
            @contextmenu.prevent="onSignMouseRight('west','4')"
          />
          <img
            ref="west1"
            src="@/assets/imgs/homePage/west1.png"
            class="west1-img"
            @click="onProjectAreaClick('west1','4')"
            @contextmenu.prevent="onSignMouseRight('west1','4')"
          />
          <img
            ref="west2"
            src="@/assets/imgs/homePage/west2.png"
            class="west2-img"
            @click="onProjectAreaClick('west2','4')"
            @contextmenu.prevent="onSignMouseRight('west2','4')"
          />
          <img
            ref="west3"
            src="@/assets/imgs/homePage/west3.png"
            class="west3-img"
            @click="onProjectAreaClick('west3','4')"
            @contextmenu.prevent="onSignMouseRight('west3','4')"
          />
          <img
            ref="east3"
            src="@/assets/imgs/homePage/east3.png"
            class="east3-img"
            @click="onProjectAreaClick('east3','4')"
            @contextmenu.prevent="onSignMouseRight('east3','4')"
          />
          <img
            ref="east2"
            src="@/assets/imgs/homePage/east2.png"
            class="east2-img"
            @click="onProjectAreaClick('east2','4')"
            @contextmenu.prevent="onSignMouseRight('east2','4')"
          />
          <img
            ref="east1"
            src="@/assets/imgs/homePage/east1.png"
            class="east1-img"
            @click="onProjectAreaClick('east1','4')"
            @contextmenu.prevent="onSignMouseRight('east1','4')"
          />
          <img
            ref="east"
            src="@/assets/imgs/homePage/east.png"
            class="east-img"
            @click="onProjectAreaClick('east','4')"
            @contextmenu.prevent="onSignMouseRight('east','4')"
          />
          <!-- 跑道 -->
          <img ref="runway03" src="@/assets/imgs/homePage/runway03.png" class="runway-img" />
          <img ref="runway21" src="@/assets/imgs/homePage/runway21.png" class="runway-img" />
          <!-- 巡检 -->
          <img
            id="pdxj"
            ref="pdxj"
            class="xjdd"
            src="@/assets/imgs/homePage/car.png"
            :style="pdxjDisplay"
          />
          <!-- 占用 -->
          <img ref="xjdd" class="xjdd" src="@/assets/imgs/homePage/xjdd.gif" :style="xjddDisplay" />
          <!-- 跑道关闭 -->
          <img
            ref="runwayClose"
            src="@/assets/imgs/homePage/runwayClose.png"
            class="runway-close-img"
          />
          <!-- 滑行道施工 -->
          <img
            ref="A1"
            src="@/assets/imgs/homePage/A1.png"
            class="A1-img"
            @click="onProjectAreaClick('A1','2')"
            @contextmenu.prevent="onSignMouseRight('A1','2')"
          />
          <img
            ref="A2"
            src="@/assets/imgs/homePage/A2.png"
            class="A2-img"
            @click="onProjectAreaClick('A2','2')"
            @contextmenu.prevent="onSignMouseRight('A2','2')"
          />
          <img
            ref="A3"
            src="@/assets/imgs/homePage/A3.png"
            class="A3-img"
            @click="onProjectAreaClick('A3','2')"
            @contextmenu.prevent="onSignMouseRight('A3','2')"
          />
          <img
            ref="A4"
            src="@/assets/imgs/homePage/A4.png"
            class="A4-img"
            @click="onProjectAreaClick('A4','2')"
            @contextmenu.prevent="onSignMouseRight('A4','2')"
          />
          <img
            ref="A5"
            src="@/assets/imgs/homePage/A5.png"
            class="A5-img"
            @click="onProjectAreaClick('A5','2')"
            @contextmenu.prevent="onSignMouseRight('A5','2')"
          />
          <img
            ref="A6"
            src="@/assets/imgs/homePage/A6.png"
            class="A6-img"
            @click="onProjectAreaClick('A6','2')"
            @contextmenu.prevent="onSignMouseRight('A6','2')"
          />
          <img
            ref="A7"
            src="@/assets/imgs/homePage/A7.png"
            class="A7-img"
            @click="onProjectAreaClick('A7','2')"
            @contextmenu.prevent="onSignMouseRight('A7','2')"
          />
          <img
            ref="A8"
            src="@/assets/imgs/homePage/A8.png"
            class="A8-img"
            @click="onProjectAreaClick('A8','2')"
            @contextmenu.prevent="onSignMouseRight('A8','2')"
          />
          <img
            ref="A9"
            src="@/assets/imgs/homePage/A9.png"
            class="A9-img"
            @click="onProjectAreaClick('A9','2')"
            @contextmenu.prevent="onSignMouseRight('A9','2')"
          />
          <img
            ref="alpha"
            src="@/assets/imgs/homePage/alpha.png"
            class="alpha-img"
            @click="onProjectAreaClick('alpha','2')"
            @contextmenu.prevent="onSignMouseRight('alpha','2')"
          />
          <!-- 跑道上的灯光 -->
          <img ref="lamp03" src="@/assets/imgs/homePage/lamp03.png" class="lamp-img" />
          <img ref="lamp21" src="@/assets/imgs/homePage/lamp21.png" class="lamp-img" />

          <div class="left-top-second-bottom-div">
            <!-- 日出、日落 -->
            <img
              :src="require('@/assets/imgs/homePage/sunrise.png')"
              style="width:36px;height:25px"
            />
            <span class="query-form-title-label">日出：</span>
            <span class="font-blod" style="margin-top: 4px;">{{ sunriseTime }}</span>
            <img :src="require('@/assets/imgs/homePage/sunset.png')" style="margin-left:10px" />
            <span class="query-form-title-label">日落：</span>
            <span class="font-blod" style="margin-top: 4px;">{{ sunsetTime }}</span>
            <!-- 场面状态 -->
            <span class="query-form-title-label" style="margin-left:40px">场面状态：</span>
            <el-checkbox-group
              v-model="runwayOps"
              @change="onRunwayOpsChange"
              style="display:inline-block"
              size="small"
            >
              <el-checkbox
                v-for="item in runwayOpsList"
                :key="item.ID"
                :label="item.ID"
                :value="item.ID"
              >{{ item.TEXT }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div
        style="width:100%;height:calc((100% - 258px)/2);margin-top:10px"
        class="adep-flight-div index-div-style"
      >
        <div class="flight-title-span small-module-title-label">
          本场起飞航班计划
          <el-radio-group v-model="adep_cstat" @change="onCstatChanged('adep')" style="float:right">
            <el-radio
              v-for="item in cstatColorList"
              :key="item.ID"
              :label="item.ID"
              :value="item.ID"
              @click.native.prevent="cstatRadioCheck(item.ID,'adep')"
            >{{item.ID}}</el-radio>
          </el-radio-group>
        </div>
        <el-table
          :data="adepFlightData"
          class="table-style pass-apply-table"
          max-height="100%"
          stripe
          @row-dblclick="lookPlanDetail"
          :cell-style="fontColor"
          height="calc(100% - 25px)"
        >
          <el-table-column prop="arcid" label="航班" align="center"></el-table-column>
          <el-table-column prop="arctyp" label="机型" align="center"></el-table-column>
          <el-table-column prop="cstat" label="航班状态" align="center" :formatter="onRenderCstat"></el-table-column>
          <el-table-column prop="adep" label="起飞机场" align="center"></el-table-column>
          <el-table-column prop="ades" label="降落机场" align="center"></el-table-column>
          <el-table-column prop="eobt" label="EOBT" align="center" :formatter="onRenderTime"></el-table-column>
          <!-- <el-table-column prop="atd" label="ATD" align="center" :formatter="onRenderTime"></el-table-column> -->
          <el-table-column
            prop="passApplyStatus"
            label="放行申请状态"
            align="center"
            :formatter="onRenderPassStatus"
          ></el-table-column>
          <el-table-column prop="operator" label="操作" align="center">
            <template slot-scope="scope">
              <div
                title="放行申请"
                class="pass-apply-btn"
                @click="onPassApply(scope.row)"
                v-isLogin
                v-if="scope.row.passApplyStatus !='3'"
              ></div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 本场降落航班计划 -->
      <div
        style="width:100%;height:calc((100% - 258px)/2 - 10px);margin-top:10px"
        class="index-div-style"
      >
        <div class="flight-title-span small-module-title-label">
          本场降落航班计划
          <el-radio-group v-model="ades_cstat" @change="onCstatChanged('ades')" style="float:right">
            <el-radio
              v-for="item in cstatColorList"
              :key="item.ID"
              :label="item.ID"
              :value="item.ID"
              @click.native.prevent="cstatRadioCheck(item.ID,'ades')"
            >{{item.ID}}</el-radio>
          </el-radio-group>
        </div>
        <el-table
          :data="adesFlightData"
          class="table-style"
          max-height="100%"
          stripe
          @row-dblclick="lookPlanDetail"
          :cell-style="fontColor"
          height="calc(100% - 25px)"
        >
          <el-table-column prop="arcid" label="航班" align="center"></el-table-column>
          <el-table-column prop="arctyp" label="机型" align="center"></el-table-column>
          <el-table-column prop="cstat" label="航班状态" align="center" :formatter="onRenderCstat"></el-table-column>
          <el-table-column prop="adep" label="起飞机场" align="center"></el-table-column>
          <el-table-column prop="ades" label="降落机场" align="center"></el-table-column>
          <!-- <el-table-column prop="sobt" label="SOBT" align="center" :formatter="onRenderTime"></el-table-column> -->
          <el-table-column prop="eta" label="ETA" align="center" :formatter="onRenderTime"></el-table-column>
          <el-table-column prop="atd" label="ATD" align="center" :formatter="onRenderTime"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="right-index">
      <!-- 右侧上部 -->
      <div class="right-top-index index-div-style">
        <!-- awos -->
        <div class="right-top-first-div">
          <div class="awos-data-div">
            <div>
              <el-row>
                <el-col :span="10" class="awos-title-col">
                  <div>PW</div>
                </el-col>
                <el-col :span="14">
                  {{awosData.pw || '/////'}}
                  <span></span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" class="awos-title-col">
                  <div style="color:#FF8787">
                    QNH
                    <br />
                    <span class="awos-unit-span">(hPa)</span>
                  </div>
                </el-col>
                <el-col :span="14">
                  <span style="color: #ff8787;font-size: 20px;">{{awosData.qnhins}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" class="awos-title-col">
                  <div>HW</div>
                </el-col>
                <el-col :span="14">
                  {{awosData.hw2a}}
                  <span class="awos-unit-span" style="margin-left:5px">m/s</span>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="10" class="awos-title-col">
                  <div>
                    CB
                    <br />
                    <span class="awos-unit-span">(m)</span>
                  </div>
                </el-col>
                <el-col :span="14">{{awosData.cloudbase}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="10" class="awos-title-col">
                  <div>
                    VIS
                    <br />
                    <span class="awos-unit-span">(m)</span>
                  </div>
                </el-col>
                <el-col :span="14" ref="preVis" :class="preVisColStyle">{{awosData.vis}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="10" class="awos-title-col">
                  <div>CW</div>
                </el-col>
                <el-col :span="14">
                  {{awosData.cw2a}}
                  <span class="awos-unit-span" style="margin-left:5px">m/s</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- RVR三段 -->
          <div class="top-third-one-div small-div-border head-wind-div">
            <div class="third-left-div common-title-div">
              <div>RVR</div>
              <div>(m)</div>
            </div>
            <div class="third-right-div">
              <el-row>
                <el-col :span="8">TDZ</el-col>
                <el-col :span="8">MID</el-col>
                <el-col :span="8">END</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">{{rvr.tdz}}</el-col>
                <el-col :span="8">{{rvr.mid}}</el-col>
                <el-col :span="8">{{rvr.end}}</el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!-- 仪表盘 -->
        <div ref="chartDom" class="right-top-second-div"></div>
      </div>
      <!-- 信息面板 -->
      <div class="index-div-style right-index-one-div">
        <!-- <MessagePanel></MessagePanel> -->
      </div>
      <!-- 流控、通航活动、专机要客 -->
      <div class="index-div-style right-index-one-div">
        <!-- <ActiveTab style="height:100%"></ActiveTab> -->
      </div>

      <!-- 航行通告 -->
      <div class="index-div-style right-index-one-div">
        <!-- <NotamPanel></NotamPanel> -->
      </div>
    </div>

    <!-- 通播详情 -->
    <!-- <DatisDetail :datisDetailDialogVisible.sync="datisDetailDialogVisible"></DatisDetail> -->
    <!-- 跑道运行模式变更 -->
    <!-- <RunMode
      :runModeDialogVisible.sync="runModeDialogVisible"
      :oldMode.sync="runMode"
      @handleRunModeVisi="handleRunModeVisi"
    ></RunMode>-->
    <!-- 跑道运行模式变更检查历史记录 -->
    <!-- <RunModeHis :runModeHisDialogVisi.sync="runModeHisDialogVisi"></RunModeHis> -->

    <!-- 放行申请弹窗 -->
    <el-dialog
      title="放行申请"
      :visible.sync="applyDialogVisible"
      width="300px"
      class="pass-apply-dialog"
    >
      <div class="apply-info-div">
        <span>航班号: {{selectedPlanRow.arcid}}</span>
        <span style="float:right">降落机场：{{selectedPlanRow.ades}}</span>
      </div>
      <div class="cdm-div">
        CDM时间：
        <el-time-picker v-model="cdm" placeholder="请选择" size="mini" format="HH:mm"></el-time-picker>
      </div>
      <div class="apply-type-div" style="width:100%">
        <el-radio-group v-model="passApplyType" size="mini">
          <el-radio
            border
            v-for="item in applyTypeList"
            :key="item.ID"
            :label="item.ID"
          >{{item.TEXT}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onApplyOk" size="small">确 定</el-button>
        <el-button @click="applyDialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 飞行计划详情页面 -->
    <!-- <PlanDetail
      :showDetail.sync="showPlanDetail"
      :row="planRow"
      @handleDetail="handlePlanDetailDialog"
    ></PlanDetail>-->
  </div>
</template>

<script>
// import ActiveTab from "@/views/sipds/homePage/active-tab";
// import NotamPanel from "@/views/sipds/homePage/notam-panel";
// import MessagePanel from "@/views/sipds/homePage/message-panel";
// import RunMode from "@/views/sipds/homePage/run-mode";
// import RunModeHis from "@/views/sipds/homePage/run-mode-his";
// import DatisDetail from "@/views/sipds/homePage/datis-detail";
// import PlanDetail from "@/views/sipds/plan/planDetail";

// } from "@/api/noticeInfo.js";
// import { getBizcodeList, getGroupIdByRegion } from "@/api/common.js";
// import {
//   getRunwayInfo,
//   saveRunwayStatus,
//   removeRunwayStatus
// } from "@/api/runway.js";
// import {
//   listNewTwrLight,
//   saveTL,
//   queryTodayPlan,
//   getAwosByRunway,
//   getNewNoteByGroupId,
//   getDatis,
//   saveHomeNote
// } from "@/api/homePage.js";
// import $sunday from "@/api/sunday.js";
// import { getParamConfigOne } from "@/api/vspParam.js";
// import { statFlightNum } from "@/api/homePage.js";
// import { dealChartData } from "@/utils/weather/awosChart.js";

import axios from "axios";

var img; //图像对象
var busImgRight; //图像左边的位置
var delta = -5; //每次移动的距离
var delay = 30; //时间
var busImgOldRight = "950px";

let runwayInt = null; //跑道巡检定时返回的ID
let getDataInt = null; //获取各业务数据定时返回的ID
export default {
  // components: {
  //   ActiveTab,
  //   NotamPanel,
  //   MessagePanel,
  //   RunMode,
  //   RunModeHis,
  //   DatisDetail,
  //   PlanDetail
  // },
  data() {
    return {
      groupId: "", //科室id
      userId: "", //当前登录人userid
      roleId: "", //角色id
      seatId: "", //席位id

      datisDivStyle: "updated-datis-div", //通播号样式
      datis: "", //通播号
      datisdate: "", //更新日期
      datistime: "", //更新时间
      datisDetail: "", //通播详情
      datisDetailDialogVisible: false, //通播详情窗口

      awosData: {
        qnhins: "",
        vis: "", //VIS
        cloudbase: "",
        pw: ""
      },
      rvr: {
        tdz: "",
        mid: "",
        end: ""
      },

      preVisColStyle: "normal-pervis-col", //VIS字体颜色

      runModeDialogVisible: false, //运行模式变更弹窗
      runMode: "", //运行模式
      runModeList: [], //运行模式列表
      runModeHisDialogVisi: false, //跑道运行模式变更历史记录页面

      areaForm: {
        tatai: "", //塔台频率
        jinjin: "" //进近频率
      },

      areaFormName: {
        tatai: "塔台",
        jinjin: "进近"
      },

      hourAllPlanNum: 0, //当前小时航班总架次
      overNumClass: "", //超容架次告警样式

      runwayOps: [], //跑道状态
      runwayOpsList: [], //跑道状态列表
      pdxjDisplay: "display:none", //跑道巡检图标是否隐藏
      xjddDisplay: "display:none", //跑道占用图标是否隐藏
      feixingquList: [
        "west",
        "west1",
        "west2",
        "west3",
        "east",
        "east1",
        "east2",
        "east3"
      ], //飞行区列表
      huaxingdaoList: [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
        "alpha"
      ], //滑行道列表

      sunsetTime: "", //日落时间
      sunriseTime: "", //日出时间
      all_light: "0", //灯光总开关
      pd_light: "0", //跑道灯
      hxd_light: "0", //进近灯
      yj_light: "0", //PaPi灯
      pdflash: false, //跑道灯是否需要调整
      hxdflash: false, //进近灯是否需要调整
      yjflash: false, //PaPi灯是否需要调整
      pdLightTip: "", //跑道灯调整建议
      hxdLightTip: "", //进近灯调整建议
      yjLightTip: "", //PaPi灯调整建议

      headWind: "",
      crossWind: "",

      adep_cstat: [], //本场起飞航班状态
      ades_cstat: [], //本场降落航班状态
      adepFlightData: [], //本场起飞航班计划
      adesFlightData: [], //本场降落航班计划
      passApplyStatusList: [], //获取飞行计划申请放行状态列表
      showPlanDetail: false, //飞行计划详情页面是否显示
      planRow: null, //飞行计划选中行
      cstatColorList: [], //航班状态颜色列表

      hourAdepAdesData: [], //当前小时、下一小时起飞数表格

      selectedPlanRow: {}, // 选中的飞行计划行
      applyDialogVisible: false, //放行申请弹窗
      cdm: new Date(), //cdm时间
      passApplyType: "0", //放行申请类型
      applyTypeList: [] //放行申请类型列表
    };
  },

  watch: {
    // 跑道灯
    pd_light: {
      handler() {
        if (this.pd_light == "0") {
          this.$refs.lamp03.style.opacity = 0;
          this.$refs.lamp21.style.opacity = 0;
        } else {
          if (
            this.$common
              .renderCodeId(this.runMode, this.runModeList)
              .indexOf("03") > -1
          ) {
            this.$refs.lamp03.style.opacity = 1;
            this.$refs.lamp21.style.opacity = 0;
          } else if (
            this.$common
              .renderCodeId(this.runMode, this.runModeList)
              .indexOf("21") > -1
          ) {
            this.$refs.lamp03.style.opacity = 0;
            this.$refs.lamp21.style.opacity = 1;
          }
        }
      }
    },
    // 跑道运行模式
    runMode: {
      handler() {
        if (
          this.$common
            .renderCodeId(this.runMode, this.runModeList)
            .indexOf("03") > -1
        ) {
          this.$refs.runway03.style.opacity = 1;
          this.$refs.runway21.style.opacity = 0;
          if (this.pd_light != "0") {
            this.$refs.lamp03.style.opacity = 1;
            this.$refs.lamp21.style.opacity = 0;
          }
        } else if (
          this.$common
            .renderCodeId(this.runMode, this.runModeList)
            .indexOf("21") > -1
        ) {
          this.$refs.runway03.style.opacity = 0;
          this.$refs.runway21.style.opacity = 1;
          if (this.pd_light != "0") {
            this.$refs.lamp03.style.opacity = 0;
            this.$refs.lamp21.style.opacity = 1;
          }
        }
      }
    }
  },
  mounted() {
    //获取科室id
    this.groupId = this.LesUtil.UserInfoUtil.getCurrentGroupId()
      ? this.LesUtil.UserInfoUtil.getCurrentGroupId()
      : "9f00520c3a604377a4d64036fce8819a";
    //获取userid
    this.userId = this.LesUtil.UserInfoUtil.getCurrentUserId()
      ? this.LesUtil.UserInfoUtil.getCurrentUserId()
      : "0998d44318fa44f3bb033030adcea1d4";
    //获取当前角色
    this.roleId = this.LesUtil.UserInfoUtil.getCurrentSeatRoleId()
      ? this.LesUtil.UserInfoUtil.getCurrentSeatRoleId()
      : "5dcd3207910145389264ece7517c5971";
    //获取席位
    this.seatId = this.LesUtil.UserInfoUtil.getCurrentSeatId()
      ? this.LesUtil.UserInfoUtil.getCurrentSeatId()
      : "22";

    //获取通播号对象
    // datisRef = this.$refs.datis;

    //获取跑道状态列表
    // getBizcodeList("runwayOps_type").then(res => {
    //   this.runwayOpsList = res.data.data;
    // });

    //获取运行模式列表
    // getBizcodeList("runMode").then(res => {
    //   this.runModeList = res.data.data;
    // });

    //计算跑道长度
    setTimeout(() => {
      img = document.getElementById("pdxj");
      busImgRight = busImgOldRight;
    }, 0);

    //获取放行申请类型列表
    // getBizcodeList("pass_apply_type").then(res => {
    //   this.applyTypeList = res.data.data;
    // });

    //获取飞行计划申请放行状态列表
    // getBizcodeList("pass_apply_status").then(res => {
    //   this.passApplyStatusList = res.data.data;
    // });

    //获取航班状态颜色列表
    // getBizcodeList("cstat_color").then(res => {
    //   this.cstatColorList = res.data.data;
    // });

    // var that = this;
    // window.addEventListener("visibilitychange", this.setGetDataInterval(), true)

    //监听灯光调整消息
    window.addEventListener("message", event => {
      let topic = event.data.topic;
      //灯光等级调整预警
      if (topic == "lightAdjust") {
        var msg = JSON.parse(event.data.msg);
        if (msg) {
          //灯光闪烁告警
          this.pdflash = msg.pdflash ? true : false;
          this.hxdflash = msg.hxdflash ? true : false;
          this.yjflash = msg.yjflash ? true : false;
          //灯光等级调整建议
          this.pdLightTip = msg.pdflash;
          this.hxdLightTip = msg.hxdflash;
          this.yjLightTip = msg.yjflash;
        }
      }
      //取消所有灯光等级调整预警
      if (topic == "cancelAllLightAlarm") {
        this.pdflash = "";
        this.hxdflash = "";
        this.yjflash = "";

        this.pdLightTip = "";
        this.hxdLightTip = "";
        this.yjLightTip = "";
      }

      let closeTopic = event.data.closeIframe;
      if (closeTopic) {
        window.clearInterval(getDataInt);
      } else if (closeTopic == false) {
        if (getDataInt) {
          window.clearInterval(getDataInt);
        }
        //开启轮询模式
        this.setIntervalMethod();
      }
    });

    //开启轮询模式
    this.setIntervalMethod();
  },

  //页面销毁时
  beforeDestroy() {
    //清除定时器
    if (runwayInt) {
      window.clearInterval(runwayInt);
    }
    if (getDataInt) {
      window.clearInterval(getDataInt);
    }
  },

  methods: {
    //开启轮询模式
    setIntervalMethod() {
      this.getAllData();
      //定时每2秒获取一次各业务数据
      getDataInt = setInterval(() => {
        this.getAllData();
      }, 2000);
    },

    //获取业务接口数据
    getAllData() {
      //获取通播信息
      this.getDatis();

      //查询运行模式
      this.getNewNoteByGroupId();

      //获取各地区频率
      this.getAreaRate();

      //绘制跑道图标
      this.getRunwayInfo();

      //查询日出日落时间
      this.getSunDay();

      //查询灯光
      this.queryLamp();

      //查询当日飞行计划
      this.queryTodayPlan("adep");
      this.queryTodayPlan("ades");

      //根据跑道查询最新的自观气象
      this.getAwosByRunway();

      //获取气象最低标准
      this.getWeatherParam();

      //统计当前小时总架次
      this.statFlightNum();
    },

    //=======================通播号===================
    //获取通播信息
    getDatis() {
      var that = this;
      getDatis().then(res => {
        var resData = res.data.data;
        if (resData) {
          this.datis = resData.version;
          this.datisdate = this.$common.parseTime(
            resData.saveTime,
            "{y}-{m}-{d}"
          );
          this.datistime = this.$common.parseTime(resData.saveTime, "{h}:{i}");
          this.datisDetail = resData.datis;
        }

        //若超过一小时未更新，则高亮闪烁提醒

        if (
          new Date().getTime() - new Date(resData.saveTime).getTime() >
          60 * 60 * 1000
        ) {
          that.datisDivStyle = "notUpdate-datis-div";
        } else {
          that.$nextTick(() => {
            that.datisDivStyle = "updated-datis-div";
          });
        }
      });
    },

    //查看通播详情
    onDatisClick() {
      this.datisDetailDialogVisible = true;
    },

    //===============跑道运行模式变更====================
    //根据部门查询运行模式
    getNewNoteByGroupId() {
      getNewNoteByGroupId({ contentType: "runMode" }).then(res => {
        if (res.data.data) {
          this.runMode = JSON.parse(res.data.data.content).runMode;
        }
      });
    },

    //点击运行模式变更
    onChangeRunWay() {
      this.runModeDialogVisible = true;
    },

    //跑道运行模式变更页面关闭时
    handleRunModeVisi(val) {
      this.runModeDialogVisible = false;
      this.runMode = val;
    },

    //渲染运行模式
    renderRunMode(val) {
      return this.$common.renderCodeId(val, this.runModeList);
    },

    //查看跑道运行模式变更历史记录
    onRunModeHisLook() {
      this.runModeHisDialogVisi = true;
    },

    //=================通讯频率=======================
    //获取各地区频率
    getAreaRate() {
      getNewNoteByGroupId({ contentType: "rate" }).then(res => {
        if (res.data.data) {
          var content = res.data.data.content;
          this.areaForm = JSON.parse(content);
        }
      });
    },

    //各地区频率改变时
    onRateChanged(value, flag) {
      let val = value.replace(/^\.+|[^\d.]/g, "");
      this.areaForm[flag] = val;
      let that = this;
      if (val) {
        this.$confirm(
          "是否确认变更" + this.areaFormName[flag] + "的频率?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.areaForm[flag] = val;
          let selectedValue = this.$refs[flag].list.find(item => {
            return item.ID == val;
          });
          var content = JSON.stringify({ ...this.areaForm, [flag]: val });
          var vdata = {
            groupId: this.groupId,
            userId: this.userId,
            seatId: this.seatId,
            content: content,
            contentType: "rate",
            changeName: this.areaFormName[flag],
            changeValue: selectedValue ? selectedValue.TEXT : val
          };
          that.$refs[flag].$children[0].blur();
          saveHomeNote(vdata).then(res => {
            if (res.data.data) {
              this.$message({
                type: "success",
                message: "频率变更成功"
              });
              this.areaForm[flag] = val;
              that.$refs[flag].$children[0].blur();
            } else {
              this.$message({
                type: "error",
                message: "频率变更失败"
              });
            }
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请输入格式正确的频率"
        });
      }
    },

    //===============跑道状态===========================

    //保护区点击事件
    onProjectAreaClick(flag, type) {
      //2:滑行道施工 4:飞行区施工
      if (this.runwayOps.indexOf(type) > -1) {
        this.$refs[flag].style.opacity = 1;
        this.saveRunwayStatus(flag, type);
      }
    },

    //跑道巡检
    move() {
      if (parseInt(img.style.left) < 200) {
        busImgRight = busImgOldRight;
      }
      img.style.left = parseInt(busImgRight) + delta + "px";
      busImgRight = img.style.left;

      if (runwayInt) {
        window.clearInterval(runwayInt);
      }

      //重复不断调用函数
      if (this.runwayOps.indexOf("0") > -1) {
        runwayInt = setTimeout(this.move, delay);
      }
    },

    //跑道状态值改变时
    onRunwayOpsChange(e) {
      //0:跑道巡检、 1：跑道占用、2：滑行道施工、3：跑道关闭、4：飞行区施工
      if (e.indexOf("0") > -1 && e.indexOf("1") > -1) {
        if (e.indexOf("0") == e.length - 1) {
          e.splice(e.indexOf("1"), 1);
        } else if (e.indexOf("1") == e.length - 1) {
          e.splice(e.indexOf("0"), 1);
        }
      }

      //点击跑道关闭
      if (e.indexOf("3") > -1) {
        //跑道关闭
        this.$refs.runwayClose.style.opacity = 1;

        //若跑道巡检是启动状态，则将其取消
        if (e.indexOf("0") > -1 && e.indexOf("3") < e.indexOf("0")) {
          this.$message({
            type: "warning",
            message: "请先取消跑道关闭状态"
          });
          this.runwayOps.splice(this.runwayOps.indexOf("1"), 1);
        } else if (e.indexOf("0") > -1 && e.indexOf("3") > e.indexOf("0")) {
          this.removeRunwayStatus(null, "0");
          this.runwayOps.splice(this.runwayOps.indexOf("0"), 1);
        }
        //若跑道占用是启动状态，则将其取消
        if (e.indexOf("1") > -1 && e.indexOf("3") < e.indexOf("1")) {
          this.$message({
            type: "warning",
            message: "请先取消跑道关闭状态"
          });
          this.runwayOps.splice(this.runwayOps.indexOf("1"), 1);
        } else if (e.indexOf("1") > -1 && e.indexOf("3") > e.indexOf("1")) {
          this.removeRunwayStatus(null, "1");
          this.runwayOps.splice(this.runwayOps.indexOf("1"), 1);
        }

        this.saveRunwayStatus(null, "3");
      } else {
        this.$refs.runwayClose.style.opacity = 0;
        this.removeRunwayStatus(null, "3");
      }

      //点击跑道巡检
      if (e.indexOf("0") > -1) {
        //并且跑道关闭状态未启动
        if (e.indexOf("3") <= -1) {
          img.style.left = busImgOldRight;
          //删除跑道占用状态
          this.removeRunwayStatus(null, "1");
          //巡检等待
          this.saveRunwayStatus(null, "0");
        } else {
          this.$message({
            type: "warning",
            message: "请先取消跑道关闭状态"
          });
        }
      }

      //点击跑道占用
      if (e.indexOf("1") > -1) {
        //并且跑道关闭状态未启动
        if (e.indexOf("3") <= -1) {
          //删除跑道巡检状态
          this.removeRunwayStatus(null, "0");
          //占用
          this.saveRunwayStatus(null, "1");
        } else {
          this.$message({
            type: "warning",
            message: "请先取消跑道关闭状态"
          });
        }
      }

      //取消跑道巡检
      if (e.indexOf("0") <= -1) {
        //删除跑道巡检状态
        this.removeRunwayStatus(null, "0");
      }

      //取消跑道占用
      if (e.indexOf("1") <= -1) {
        //删除跑道占用状态
        this.removeRunwayStatus(null, "1");
      }
      this.runwayOps = e;
    },

    //保存场面状态变更
    saveRunwayStatus(rwStyle, type) {
      var vdata = {};
      if (rwStyle) {
        vdata.rwStyle = rwStyle;
      }
      vdata.runwayType = type;

      saveRunwayStatus(vdata).then(() => {
        this.getRunwayInfo();
      });
    },

    //查询跑道图标信息
    getRunwayInfo() {
      getRunwayInfo().then(res => {
        var data = res.data.data;
        var hxdExistList = [];
        var fxqExistList = [];
        if (data.length > 0) {
          //绘制巡检、占用
          var pdxjFlag = false;
          var xjddFlag = false;
          for (let i = 0; i < data.length; i++) {
            var src = "";
            switch (data[i].runwayType) {
              case "0":
                pdxjFlag = true;
                break;
              case "1":
                xjddFlag = true;
                break;
              case "2":
                //滑行道施工
                this.$nextTick(() => {
                  this.$refs[data[i].rwStyle].style.opacity = 1;
                });
                hxdExistList.push(data[i].rwStyle);
                break;
              case "3":
                //跑道关闭
                this.$refs.runwayClose.style.opacity = 1;
                if (this.runwayOps.indexOf("3") <= -1) {
                  this.runwayOps.push("3");
                }
                break;
              case "4":
                //飞行区施工
                this.$refs[data[i].rwStyle].style.opacity = 1;
                fxqExistList.push(data[i].rwStyle);
                break;
            }
            data[i].src = src;
          }
          //跑道巡检
          if (pdxjFlag) {
            this.pdxjDisplay = "display:block;z-index:3";
            if (this.runwayOps.indexOf("0") <= -1) {
              this.runwayOps = ["0"];
            }
            this.move();
          } else {
            this.pdxjDisplay = "display:none";
          }

          //跑道占用
          if (xjddFlag) {
            this.xjddDisplay = "display:block;z-index:3";
            if (this.runwayOps.indexOf("1") <= -1) {
              this.runwayOps = ["1"];
            }
          } else {
            this.xjddDisplay = "display:none";
          }
        } else {
          this.pdxjDisplay = "display:none";
          this.xjddDisplay = "display:none";
        }

        //隐藏取消滑行道施工
        for (let item of this.huaxingdaoList) {
          if (hxdExistList.indexOf(item) < 0) {
            this.$refs[item].style.opacity = 0;
          }
        }
        //隐藏取消飞行区施工的
        for (let item1 of this.feixingquList) {
          if (fxqExistList.indexOf(item1) < 0) {
            this.$refs[item1].style.opacity = 0;
          }
        }
      });
    },

    //删除跑道信息
    removeRunwayStatus(rwStyle, type) {
      removeRunwayStatus({ runwayType: type, rwStyle: rwStyle }).then(() => {
        if (rwStyle) {
          //隐藏图标
          this.$refs[rwStyle].style.opacity = 0;
        } else if (type == "0") {
          this.pdxjDisplay = "display:none";
        } else if (type == "1") {
          this.xjddDisplay = "display:none";
        } else if (type == "3") {
          this.$refs.runwayClose.style.opacity = 0;
        }
      });
    },

    //右键取消飞行区施工、滑行道施工
    onSignMouseRight(rwStyle, type) {
      this.removeRunwayStatus(rwStyle, type);
    },

    //====================日出日落====================
    getSunDay() {
      $sunday
        .getSunDay({ day: this.$common.parseTime(new Date(), "{m}-{d}") })
        .then(res => {
          var resData = res.data.data;
          if (resData && resData.length > 0) {
            this.sunsetTime = resData[0].sunset;
            this.sunriseTime = resData[0].sunrise;
          }
        });
    },

    //====================灯光========================
    //灯光值改变时
    onlampChange(e, lamp) {
      this[lamp] = e;
      var otherLampList = ["yj_light", "pd_light", "hxd_light"];
      this.onSaveLamp(e, lamp);
      if (lamp == "all_light") {
        //若为总开关，并且总开关不为自定义（6）改变其它开关
        if (e != "6") {
          for (let item of otherLampList) {
            this[item] = e;
            this.onSaveLamp(e, item);
          }
        }
      } else if (
        this.yj_light != this.pd_light ||
        this.yj_light != this.hxd_light ||
        this.pd_light != this.hxd_light
      ) {
        this.all_light = "6";
        this.onSaveLamp("6", "all_light");
      }
    },

    //保存灯光
    onSaveLamp(e, lamp) {
      var vdata = { userId: this.userId, lightType: lamp, lightLevel: e };
      saveTL(vdata).then(() => {
        // this.queryLamp();
      });
    },

    //查询灯光
    queryLamp() {
      listNewTwrLight().then(res => {
        if (res.data.data.length > 0) {
          for (const iterator of res.data.data) {
            this[iterator.lightType] = iterator.lightLevel;
          }
        }
      });
    },

    //=====================气象=======================
    //QNH
    getAwosByRunway() {
      if (this.runMode && this.runModeList.length > 0) {
        let localtionId =
          this.$common
            .renderCodeId(this.runMode, this.runModeList)
            .indexOf("03") > -1
            ? "03"
            : "21";
        getAwosByRunway({ localtionId: localtionId }).then(res => {
          let data = res.data.data;
          this.awosData = this.formatChart(data);
          this.rvr.tdz = this.awosData.rvr1a;

          let runwayImg = "03";
          if (localtionId == "03") {
            runwayImg = window.publicUrl + "/runways/runway03.json";
          } else if (localtionId == "21") {
            runwayImg = window.publicUrl + "/runways/runway21.json";
          }
          //绘制仪表盘
          this.drawEchart(runwayImg, "chartDom", this.awosData);
        });
        //查询中间跑道跑道视程
        getAwosByRunway({ localtionId: "MID" }).then(res => {
          let data = res.data.data;
          this.rvr.mid = this.formatChart(data).rvr1a;
        });

        let endLocaltionId = localtionId == "03" ? "21" : "03";
        getAwosByRunway({ localtionId: endLocaltionId }).then(res => {
          let data = res.data.data;
          this.rvr.end = this.formatChart(data).rvr1a;
        });
      }
    },

    //绘图
    drawEchart(jsonStr, graph, data) {
      var that = this;
      axios.get(jsonStr).then(res => {
        //跑道图片
        let runway = "image://" + res.data.uri;
        //数据处理
        var chartData = dealChartData(data);
        //绘制图表
        this.echartInit(
          that.$echarts.init(that.$refs[graph]),
          runway,
          chartData
        );
      });
    },

    //绘制仪表盘
    echartInit(myChart, runwayPic, data) {
      var option = {
        series: [
          //刻度盘
          {
            type: "gauge",
            center: ["50%", "50%"],
            min: 0,
            max: 360,
            splitNumber: 12,
            radius: "74%",
            startAngle: 90,
            endAngle: 450,
            axisLine: {
              lineStyle: {
                color: [[1, "#dfe0e0"]],
                width: 1
              }
            },
            splitLine: {
              distance: 13,
              length: 2,
              lineStyle: {
                width: 1,
                color: "#dfe0e0"
              },
              show: false
            },
            axisTick: {
              distance: -6,
              length: 4,
              splitNumber: 1,
              lineStyle: {
                color: "#DBDEE1"
              }
            },
            axisLabel: {
              distance: -37,
              color: "#dfe0e0",
              fontSize: 12,
              formatter: function(value) {
                if (value == 0) {
                  return "";
                } else {
                  return value;
                }
              }
            },
            pointer: {
              icon: runwayPic,
              length: "107",
              width: "82",
              offsetCenter: [0, "86%"]
            },
            data: [
              {
                value: "0"
              }
            ],
            detail: {
              show: false
            }
          },
          //10分钟风向
          {
            type: "gauge",
            center: ["50%", "50%"],
            startAngle: data.tmStart,
            endAngle: null,
            min: 0,
            max: 360,
            radius: "73%",
            // zlevel:1,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              clip: true,
              roundCap: true
            },
            axisLine: {
              lineStyle: {
                width: 8,
                color: [[1, "transparent"]]
              }
            },
            splitLine: {
              show: false,
              distance: 0
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: [
              {
                value: data.tmValue,
                itemStyle: {
                  color: "#5BCCA0"
                }
              }
            ],
            title: {
              fontSize: 14
            },
            detail: {
              show: false
            }
          },
          //2分钟风向
          {
            type: "gauge",
            center: ["50%", "50%"],
            startAngle: data.dmStart,
            endAngle: null,
            min: 0,
            max: 360,
            radius: "65%",
            // zlevel:1,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              clip: true,
              roundCap: true
            },
            axisLine: {
              lineStyle: {
                width: 8,
                color: [[1, "transparent"]]
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: [
              {
                value: data.dmValue,
                itemStyle: {
                  color: "#FFDB6F"
                }
              }
            ],
            detail: {
              show: false
            }
          },
          {
            type: "gauge",
            center: ["50%", "50%"],
            startAngle: 90,
            endAngle: 450,
            min: 0,
            max: 360,
            radius: "70%",
            opacity: 1,
            // zlevel:3,
            markPoint: {
              symbol: "rect", //标记的图形
              symbolSize: [100, 30], //标记的宽、高
              data: [
                //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                {
                  // value: direction ,
                  value: "200",
                  x: "center",
                  y: "center",
                  itemStyle: {
                    color: "#3B3C3D",
                    borderColor: "#5f6264",
                    borderRadius: 4,
                    borderWidth: 1
                    // opacity: 0.8,
                  }
                }
              ],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: "#6CCDE1", //气泡中字体颜色
                    fontSize: 18,
                    position: ["20%", "8"],
                    formatter: function() {
                      //   return this.direction + "\n" + this.currentSpeed + " m/s";
                      return data.curSpeed + " m/s";
                    }
                  }
                }
              }
            },
            pointer: {
              length: "140%", //指针长度
              offsetCenter: [0, "65%"],
              width: 26,
              icon:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABwCAYAAAAXB/A7AAACkklEQVRYhcWYMW4UMRSG/12WKOmys8sNorC5AQWhTghIlAkNNRdIQ7gBuQWRuEJygRSkoEWBFpGGho4myCt7ZHv+57HneeCXRjvjef7mvd9+u6OdvPr0GQnt/vhyPQHwVQqZpWYDeGk/RcC0B3BkD1GpDLYBPLXnDYBfpRk8B/DQHgdDSjgSzrMAD6KnHthMsgHPbN1OjedHFoClTMsYBfAYwIqMr9g4A7wQsqJZMEBq5/UC5pLbVvvR6nQAh9J6W83iXRkDko3DYnxAhy4oyNIHdOoTFPjkA3LS78QOBbR7xQfsAZh4x6l37zS6t2KAWEvv+pEUlAL4hs61AHF1UgD/qYMAi5qApRQ0mombALa8663ouhfAaqZZSIAFGaM+lADoSpSUUARg9aozKDKRGUY7crQM/r+J6n2g3okqE6XOo+MMIPY+y4wBWP3ivVEAqR/YTnmjeKDOQPwKZx05SgYpQJYHo24kNaBjcHUTxd9A6T57V+5T8l05tYmcAo9iQM6bqhoQlFndg5wM1CYGMdU9UJegNjHVSNUA45nY14k0zgfkGOjUZuoDcjaRU+uVD8ipvxqgLXcogHrwT01sY6uWoDZR7UFOI1UDqE3seJDbiU5tvAOUGOjU+ICSTeS08AEl9VcDzLWAwAO1ieK/NAktq2agNlGdQUkjOQX7QA1QeVDaiU7redOBBjo104Gd6LSY9tR/AeBjCjBLAL4DeGvPnwDYITFzKYM/AI4B/LbHiR2LtfaAmXgG4Ma7vrFjFBB34hWADyTYjF1GY8s4gzsAbwDcE8C9vXcXZ9BEAT/JZOkBgYnnJEUmE2NigwyMSe8yJjuZWDNnvZE2ALwWlkmSiTVLu2EA7wHcFkx2+gbg7C+zpEDWTkOhfQAAAABJRU5ErkJggg=="
            },
            data: [
              {
                //瞬时风向
                value: data.curDirection,
                detail: {
                  offsetCenter: [0, 0]
                }
              }
            ],
            axisLine: {
              lineStyle: {
                width: 0
              }
            },
            splitLine: {
              show: false,
              distance: 0
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            detail: { show: false }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    //获取气象最低标准
    getWeatherParam() {
      var that = this;

      //查询可见度最低标准
      getParamConfigOne({ paramName: "visibility" }).then(res => {
        var vis = res.data.data.paramValue;
        //若低于能见度标准，则报警

        if (parseFloat(vis) > parseFloat(that.awosData.vis)) {
          this.preVisColStyle = "alarm-pervis-col";
        } else {
          this.preVisColStyle = "normal-pervis-col";
        }
      });
    },

    //格式化awos数据，去除单位
    formatChart(map) {
      var data = {};
      for (const key in map) {
        data[key] = map[key] ? map[key].split(" ")[0] : "";
      }
      return data;
    },

    //=====================小时流量======================
    statFlightNum() {
      //获取跑道容量架次
      getParamConfigOne({ paramName: "runwayOverCapacity" }).then(res => {
        //跑道容量架次
        let runwayOverCapacity = res.data.data.paramValue;
        //获取架次统计
        statFlightNum().then(res => {
          var data = res.data.data;
          let allNum =
            parseInt(data.hourTakeOffNum) + parseInt(data.hourLoadNum);
          this.hourAllPlanNum = allNum;

          if (parseInt(runwayOverCapacity) <= allNum) {
            this.overNumClass = "super-capacity-class";
          } else {
            this.overNumClass = "";
          }
        });
      });
    },

    //=====================航班计划=======================
    //查询当日飞行计划
    queryTodayPlan(flag) {
      var vdata = {};
      if (flag == "adep") {
        vdata.cstat = this.adep_cstat;
        vdata.indexAdep = window.ownAirportCode;
      } else {
        vdata.cstat = this.ades_cstat;
        vdata.indexAdes = window.ownAirportCode;
      }
      queryTodayPlan(vdata).then(res => {
        this[flag == "adep" ? "adepFlightData" : "adesFlightData"] =
          res.data.data;
      });
    },

    //航班状态改变时
    onCstatChanged(flag) {
      this.queryTodayPlan(flag);
    },

    //航班状态值改变时
    cstatRadioCheck(value, flag) {
      value == this[flag + "_cstat"]
        ? (this[flag + "_cstat"] = "")
        : (this[flag + "_cstat"] = value);
    },

    //发车申请
    onBusApply() {
      this.$prompt("请输入航班号", "发车申请", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "输入的航班号是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //渲染时间为 时:分
    onRenderTime(row, column, cellValue) {
      if (cellValue) {
        return this.$common.parseTime(cellValue, "{d}") ==
          this.$common.parseTime(new Date(), "{d}")
          ? this.$common.parseTime(cellValue, "{h}:{i}")
          : this.$common.parseTime(cellValue, "{d} / {h}:{i}");
      } else {
        return "";
      }
    },

    //放行申请
    onPassApply(row) {
      this.selectedPlanRow = row;
      this.passApplyType = "0";
      this.applyDialogVisible = true;
    },

    //放行申请确定
    onApplyOk() {
      this.applyDialogVisible = false;
      var vdata = {
        seatId: this.seatId,
        userId: this.userId,
        roleId: this.roleId,
        flag: "group"
      };
      vdata.bizId = this.selectedPlanRow.ifplid; //关联飞行计划id
      vdata.noticeType = "8"; //通知公告类型：8：放行申请
      vdata.noticeContent =
        "航班号：" +
        this.selectedPlanRow.arcid +
        "\n降落机场：" +
        this.selectedPlanRow.ades +
        "\nCDM时间：" +
        (this.cdm ? this.$common.parseTime(this.cdm, "{h}:{i}") : "无") +
        "\n放行申请类型：" +
        this.$common.renderCodeId(this.passApplyType, this.applyTypeList);
      vdata.isConfirm = "0"; //通知公告是否需要确认：0：是
      vdata.isDeleted = "0";
      vdata.operateType = "1"; //操作状态： 1：已发布
      //查询接收席位（区调）的groupid
      // getGroupIdByRegion({ region: "CTR" }).then(res => {
      //   vdata.recId = res.data.data.id;
      //   saveNoticeInfo(vdata).then(res => {
      //     if (res.data.data) {
      //       this.$message({
      //         type: "success",
      //         message: "发送放行申请成功"
      //       });
      //       this.$emit("handleDialogVisible", false);
      //     } else {
      //       this.$message({
      //         type: "success",
      //         message: "发送放行申请失败"
      //       });
      //     }
      //   });
      // });
    },

    //渲染放行申请状态
    onRenderPassStatus(row, column, cellValue) {
      //1:未申请 2:未审核 3:已确认
      return this.$common.renderCodeId(cellValue, this.passApplyStatusList);
    },

    //渲染航班状态
    onRenderCstat(row, column, cellValue) {
      return cellValue ? cellValue : "SCH";
    },

    //飞行计划详情弹框隐藏
    handlePlanDetailDialog(val) {
      this.showPlanDetail = val;
    },

    //双击查看飞行计划详情
    lookPlanDetail(val) {
      this.planRow = val;
      this.showPlanDetail = true;
    },

    //渲染航班状态颜色
    fontColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2) {
        let cstat = row.cstat ? row.cstat : "SCH";
        return "color:" + this.$common.renderCodeId(cstat, this.cstatColorList);
      }
    }
  }
};
</script>

<style scoped>
/* @import "./common.css"; */
.twr {
  height: 100%;
}

.top-index {
  width: 100%;
  height: 328px;
}

.left-index {
  width: 1110px;
  height: 100%;
  float: left;
}

.right-index {
  width: calc(100% - 1110px);
  height: 100%;
  padding: 10px 0px 0px 10px;
  float: left;
}

.left-top-index {
  width: 100%;
  height: 248px;
}

.right-top-index {
  width: 100%;
  height: 200px;
}

/* .top-left-div {
  width: calc(100% - 1327px);
  height: 100%;
  float: left;
  margin-right: 10px;
} */

.top-right-div {
  width: 1317px;
  height: 100%;
  float: left;
}

.left-top-first-div {
  width: 132px;
  height: 100%;
  text-align: center;
  float: left;
}

.datis-div {
  width: 100%;
  height: 158px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #676767;
  background: #464646;
  padding: 10px;
}

.datis-div div:first-child {
  width: 100%;
  height: 57px;
  font-size: 80px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.datis-div div:last-child {
  width: 100%;
  color: #ffffff;
  padding-top: 20px;
  text-align: center;
}

.datis-div div:last-child span:first-child {
  font-size: 16px;
}

.datis-div div:last-child span:last-child {
  font-size: 30px;
  display: inline-block;
  margin-top: 10px;
}

.left-top-second-div {
  width: calc(100% - 142px);
  height: 100%;
  margin-left: 10px;
  float: left;
}

.left-top-second-div >>> .el-input__inner {
  padding: 0px 2px;
  font-size: 16px;
  font-weight: bold;
}

.left-top-second-div > span {
  margin-left: 5px;
}

.left-top-second-div >>> .el-input__suffix {
  width: 20px;
}

.rate-codelist {
  display: inline-block;
}

.rate-codelist >>> .el-input__inner {
  width: 74px;
}

/* .top-left-div >>> .el-row {
  border: 1px solid #676767;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc((100% - 18px) / 6);
  font-weight: 700;
  font-size: 20px;
  color: #f0f0f5;
}

.top-left-div >>> .el-row .el-col {
  text-align: center;
}

.top-left-div >>> .el-row .el-col:last-child span:last-child {
  color: #c8cacc;
  font-size: 14px;
  float: right;
  margin-right: 10px;
  margin-top: 2px;
}

.top-left-div >>> .el-row .el-col:first-child {
  border-right: 1px solid #676767;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.top-right-first-div {
  width: 100%;
  height: calc(100% - 293px);
  display: flex;
  align-items: center;
}

.top-right-second-div {
  width: 100%;
  height: 283px;
  margin-top: 10px;
}

.top-right-second-bottom-div {
  width: 1244px;
  height: 86px;
  position: absolute;
  top: 238px;
  right: 46px;
}

.top-first-row {
  line-height: 40px;
}

.run-mode-span {
  font-size: 24px;
  font-weight: 700;
  color: #67e8ff;
  display: inline-block;
  margin-top: 10px;
}

.span-title {
  margin-left: 50px;
  margin-right: 5px;
}

.mode-change-button {
  display: inline-block;
  float: left;
}

.run-mode-history-btn {
  padding: 0px;
  width: 27px;
  height: 28px;
  display: inline-block;
  float: right;
  margin-left: 5px;
}

.run-mode-history-img {
  width: 18px;
  height: 18px;
  /* background-image: url("~@/assets/imgs/homePage/historyRecord.png"); */
}

.top-second-runway {
  width: 100%;
  height: 200px;
}

.weater-img {
  width: 26px;
  height: 26px;
  margin-left: 10px;
  vertical-align: middle;
}

.runway-img {
  width: 857px;
  height: 100px;
  position: absolute;
  top: 90px;
  left: 195px;
}

.west-img {
  position: absolute;
  top: 55px;
  left: 153px;
  opacity: 0;
}

.west1-img {
  position: absolute;
  top: 52px;
  left: 161px;
  opacity: 0;
}

.west2-img {
  position: absolute;
  top: 52px;
  left: 309px;
  opacity: 0;
}

.west3-img {
  position: absolute;
  top: 52px;
  left: 465px;
  opacity: 0;
}

.east3-img {
  position: absolute;
  top: 52px;
  left: 634px;
  opacity: 0;
}

.east2-img {
  position: absolute;
  top: 52px;
  left: 794px;
  opacity: 0;
}

.east1-img {
  position: absolute;
  top: 52px;
  left: 940px;
  opacity: 0;
}

.east-img {
  position: absolute;
  top: 54px;
  left: 1061px;
  opacity: 0;
  z-index: 5;
}

.runway-close-img {
  position: absolute;
  top: 83px;
  left: 188px;
  opacity: 0;
  width: 870px;
  height: 134px;
}

.A1-img {
  position: absolute;
  top: 142px;
  left: 204px;
  opacity: 0;
  z-index: 2;
}

.A2-img {
  position: absolute;
  top: 142px;
  left: 253px;
  opacity: 0;
  z-index: 2;
}
.A3-img {
  position: absolute;
  top: 142px;
  left: 335px;
  opacity: 0;
  z-index: 2;
}
.A4-img {
  position: absolute;
  top: 142px;
  left: 428px;
  opacity: 0;
  z-index: 2;
}
.A5-img {
  position: absolute;
  top: 142px;
  left: 539px;
  opacity: 0;
  z-index: 2;
}
.A6-img {
  position: absolute;
  top: 142px;
  left: 676px;
  opacity: 0;
  z-index: 2;
}
.A7-img {
  position: absolute;
  top: 142px;
  left: 799px;
  opacity: 0;
  z-index: 2;
}
.A8-img {
  position: absolute;
  top: 142px;
  left: 890px;
  opacity: 0;
  z-index: 2;
}
.A9-img {
  position: absolute;
  top: 142px;
  left: 978px;
  opacity: 0;
  z-index: 2;
}

.alpha-img {
  position: absolute;
  top: 179px;
  left: 204px;
  opacity: 0;
  z-index: 2;
}

.lamp-img {
  position: absolute;
  top: 98px;
  left: 207px;
  opacity: 0;
}

.pdxj {
  position: absolute;
  width: 86px;
  height: 40px;
  top: 109px;
  right: 98px;
  display: none;
}

.xjdd {
  position: absolute;
  width: 86px;
  height: 40px;
  left: 955px;
  top: 96px;
  display: none;
}

.left-top-second-bottom-div {
  width: 100%;
  height: 52px;
  position: relative;
  margin-top: -54px;
  padding: 0px 33px;
  display: flex;
  align-items: center;
}

.lamp-div >>> .el-input__inner {
  height: 38px;
  font-size: 18px;
  font-weight: bold;
  padding: 0 5px;
}

.lamp-div >>> .el-input__icon {
  line-height: 100%;
}

.head-wind-div {
  width: 380px;
  margin-right: 10px;
}

.text-font-bold {
  font-size: 36px;
  font-weight: bold;
}

.lamp-div {
  width: 360px;
  margin-left: 0px;
}

.lamp-div > .el-row {
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  height: 50%;
}

.lamp-row {
  display: flex;
  align-items: flex-start;
  padding-top: 5px;
  height: 50%;
}

.lamp-div > .el-row .el-col span:last-child {
  font-weight: bold;
}

.lamp-title-span {
  width: 96px;
  text-align: right;
  display: inline-block;
}

.lamp-select {
  width: 70px;
  display: inline-block;
}

.cross-wind-div {
  width: 190px;
  margin-left: 10px;
}

.top-third-one-div {
  width: 100%;
  height: 58px;
  float: left;
}

.third-left-div {
  width: 46px;
  height: 100%;
  float: left;
  text-align: center;
  padding: 10px 0px;
  background: #5f5f5f;
}

.third-left-div div:first-child {
  font-size: 16px;
  font-weight: bold;
}

.third-left-div div:last-child {
  color: #c8cacc;
  font-size: 14px;
}

.third-right-div {
  width: calc(100% - 46px);
  height: 100%;
  float: left;
  text-align: center;
}

.third-right-div .el-row:first-child {
  height: 25px;
  border-bottom: 1px solid #5f5f5f;
  line-height: 25px;
  color: #858585;
  font-size: 14px;
  font-weight: 500;
}

.third-right-div .el-row:last-child {
  height: calc(100% - 25px);
  font-size: 18px;
  font-weight: 700;
  line-height: 31px;
  color: #f0f0f5;
}

.third-right-div .el-row .el-col {
  height: 100%;
  border-right: 1px solid #676767;
}

.third-right-div .el-row .el-col:last-child {
  border-right: none;
}

.hour-flight-table {
  width: 324px;
  float: left;
  height: 100%;
  margin-left: 10px;
}

.table-style {
  width: 100%;
}

.right-index-one-div {
  height: calc((100% - 230px) / 3);
  margin-top: 10px;
}

.ids-work {
  position: absolute;
}

.pass-apply-btn {
  background-image: url("~@/assets/imgs/homePage/passApply.png");
  width: 28px;
  height: 24px;
  cursor: pointer;
}

.adep-flight-div >>> .el-table .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.apply-info-div {
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  background: #5e5e5e;
  line-height: 40px;
}

.cdm-div {
  width: 100%;
  margin: 10px 0px;
}

.cdm-div >>> .el-date-editor.el-input {
  width: calc(100% - 79px);
}

.apply-type-div {
  padding: 0px 7px 0px 10px;
}

.apply-type-div >>> .el-radio:nth-child(odd) {
  width: 100px;
  margin-bottom: 10px;
}
.apply-type-div >>> .el-radio:nth-child(even) {
  width: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.apply-type-div >>> .el-radio:first-child {
  margin-left: 10px;
}

.top-right-first-div >>> .el-select {
  width: 80px;
}

.top-right-first-div >>> .el-input__inner {
  padding: 0 5px;
}

.top-right-first-div >>> .el-checkbox {
  margin-right: 10px;
}

.updated-datis-div {
  color: #ffffff;
}

.notUpdate-datis-div {
  color: red !important;
  -webkit-animation-name: imageAnim;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: ease;
  -webkit-animation-play-state: running;
}

@-webkit-keyframes imageAnim {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.normal-pervis-col {
  color: #f0f0f5;
}

.alarm-pervis-col {
  color: yellow !important;
  -webkit-animation-name: imageAnim;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: ease;
  -webkit-animation-play-state: running;
}

.twr >>> .super-capacity-class {
  color: red;
  font-weight: 700;
  -webkit-animation-name: imageAnim;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: ease;
  -webkit-animation-play-state: running;
}

@-webkit-keyframes imageAnim {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.right-top-first-div {
  width: calc(100% - 222px);
  height: 100%;
  float: left;
  margin-right: 10px;
}

.right-top-second-div {
  width: 212px;
  height: 100%;
  float: left;
  background: #464646;
  border: 1px solid #5f5f5f;
}

.awos-data-div {
  width: 100%;
  height: calc(100% - 58px);
}

.awos-data-div > div {
  float: left;
  width: calc((100% - 5px) / 2);
  height: 100%;
}

.awos-data-div > div:first-child {
  margin-right: 5px;
}

.awos-data-div .el-row {
  border: 1px solid #676767;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc((100% - 15px) / 3 + 5px);
  font-weight: 700;
  font-size: 20px;
  color: #f0f0f5;
}

.awos-data-div .el-row:last-child {
  height: calc((100% - 15px) / 3 - 10px);
}

.awos-data-div .el-row .el-col {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #f0f0f5;
  font-weight: 500;
  text-align: center;
}

.awos-data-div .el-row .el-col:last-child {
  font-weight: 700;
}

.awos-title-col {
  border-right: 1px solid #676767;
  font-size: 16px;
  font-weight: 500;
  background: #606062;
}

.awos-unit-span {
  font-size: 12px;
  color: #cecece;
}

.query-form-title-label {
  margin-left: 5px;
}
</style>
