<template>
  <div>
    <div>
      <div class="leftStyle">
        <div class="left2Style">
          <div class="datisDivStyle">{{ twrData.arrdep }}</div>
          <div style="text-align: center">
            <span style="fontsize: 12px; color: grey">
              {{
              twrData.datisdate
              }}
            </span>
            <br />
            <span style="fontsize: 16px; color: #e6e6e6">
              {{
              twrData.datistime
              }}
            </span>
          </div>
        </div>
        <span style="color: #67e8ff">{{ twrData.color }}</span>
      </div>
      <div class="rightStyle">
        <div class="rigth2Style">
          <!-- 仪表盘 -->
          <img
            src="@/assets/imgs/homePage/03.png"
            style="position: absolute; top: 70px; right: 140px"
          />
          <div ref="chartDom" class="right-top-second-div"></div>
        </div>
        <div class="rightBottom">
          <div class="rightBottomleft">
            <div class="bottomLeft">
              <span style="color: #ff8787; fontsize: 16px">QNH</span>
              <br />
              <span style="color: #cecece; fontsize: 12px">(hpa)</span>
            </div>
            <div
              style="
                width: 80px;
                text-align: center;
                float: left;
                color: #ff8787;
                fontsize: 20px;
                margin-top: 11px;
              "
            >{{ twrData.qnh }}</div>
          </div>
          <div class="rightBottomleft" style="margin-left: 5px">
            <div class="bottomLeft">
              <span style="color: #f0f0f5; fontsize: 16px">VIS</span>
              <br />
              <span style="color: #cecece; fontsize: 12px">(m)</span>
            </div>
            <div
              style="
                width: 80px;
                text-align: center;
                float: left;
                color: #f0f0f5;
                fontsize: 20px;
                margin-top: 11px;
              "
            >{{ twrData.vis }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
    <!-- 跑道 -->
    <div
      style="
        width: 950px;
        margin-left: calc(50vw - 475px);
        heigth: 200px;
        text-align: center;
        position: relative;
      "
    >
      <!-- 保护区 -->
      <img ref="protectArea" src="@/assets/imgs/homePage/protectArea.png" class="protect-area-img" />
      <!-- 跑道 -->
      <img ref="runway03" src="@/assets/imgs/homePage/runway03.png" class="runway-img" />
      <!-- 飞机 -->
      <div class="animation" ref="flight">
        <img src="@/assets/imgs/homePage/flight.png" style="width: 100px; height: 60px" />
        <div class="flight">
          MU2664
          <br />CES2870
        </div>
      </div>
      <!-- 车 -->
      <div ref="carDashed" class="carDashed"></div>
      <div class="animationCar" ref="car">
        <img src="@/assets/imgs/homePage/car.png" style="width: 30px; height: 25px" />
      </div>
      <img
        ref="west"
        src="@/assets/imgs/homePage/west.png"
        class="west-img"
        :style="imgDisplayStyle"
        @click="onProjectAreaClick('west')"
      />
      <img
        ref="west1"
        src="@/assets/imgs/homePage/west1.png"
        class="west1-img"
        @click="onProjectAreaClick('west1')"
      />
      <img
        ref="west2"
        src="@/assets/imgs/homePage/west2.png"
        class="west2-img"
        @click="onProjectAreaClick('west2')"
      />
      <img
        ref="west3"
        src="@/assets/imgs/homePage/west3.png"
        class="west3-img"
        @click="onProjectAreaClick('west3')"
      />
      <img
        ref="east3"
        src="@/assets/imgs/homePage/east3.png"
        class="east3-img"
        @click="onProjectAreaClick('east3')"
      />
      <img
        ref="east2"
        src="@/assets/imgs/homePage/east2.png"
        class="east2-img"
        @click="onProjectAreaClick('east2')"
      />
      <img
        ref="east1"
        src="@/assets/imgs/homePage/east1.png"
        class="east1-img"
        @click="onProjectAreaClick('east1')"
      />
      <img
        ref="east"
        src="@/assets/imgs/homePage/east.png"
        class="east-img"
        @click="onProjectAreaClick('east')"
      />
    </div>
    <!-- 气象预警 -->
    <div class="alarmStyle">
      <img
        v-show="alarmFlag"
        src="@/assets/imgs/homePage/alarm.png"
        style="height: 26px; width: 33px; margin-top: 22px; margin-left: 32px"
      />
      <span v-show="alarmFlag" class="alarmSpan">气象预警</span>
      <span v-show="alarmFlag" style="color: #ebeff0; fontSize: 22px">
        {{
        twrData.alarm
        }}
      </span>
      <!-- 雷暴预警 -->
      <img
        v-show="!alarmFlag"
        src="@/assets/imgs/homePage/leibao.png"
        style="height: 26px; width: 33px; margin-top: 22px; margin-left: 32px"
      />
      <span class="alarmSpan" v-show="!alarmFlag">雷暴预警</span>
      <span v-show="!alarmFlag" style="color: #ebeff0; fontSize: 22px">
        {{
        twrData.alarm2
        }}
      </span>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import lesFrontUtils from "les-front-utils";
export default {
  data() {
    return {
      twrData: {
        arrdep: "A",
        datisdate: "", //更新日期
        datistime: "", //更新时间
        color: "03#ILS",
        qnh: "1011.3",
        vis: "6000",
        alarm:
          "预计未来24小时我县大部分地区地质灾害气象风险等级为II级(风险高),易出现滑坡、泥石流等地质灾害，请做好防范工作。",
        alarm2: "预计12小时内有雷暴天气,有部分航班取消飞行,请做好防范工作"
      },
      intervalId: null,
      imgDisplayStyle: "", //图层是否显示隐藏
      echartData: {
        tmStart: "130", //绿线
        tmValue: "120",
        dmStart: "120",
        dmValue: "130",
        curSpeed: "3",
        curDirection: "80"
      },
      echartIntervalid: null,
      alarmFlag: true
      // flightCar: window.LESCONFIG.flightCar
    };
  },
  methods: {
    //保护区点击事件
    onProjectAreaClick(flag) {
      if (this.$refs[flag].style.opacity == 1) {
        this.$refs[flag].style.opacity = 0;
      } else {
        this.$refs[flag].style.opacity = 1;
      }
    },
    //绘制仪表盘
    echartInit() {
      var myChart = this.$echarts.init(this.$refs["chartDom"]);
      //绘制图表
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
              icon:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABwCAYAAAAXB/A7AAACkklEQVRYhcWYMW4UMRSG/12WKOmys8sNorC5AQWhTghIlAkNNRdIQ7gBuQWRuEJygRSkoEWBFpGGho4myCt7ZHv+57HneeCXRjvjef7mvd9+u6OdvPr0GQnt/vhyPQHwVQqZpWYDeGk/RcC0B3BkD1GpDLYBPLXnDYBfpRk8B/DQHgdDSjgSzrMAD6KnHthMsgHPbN1OjedHFoClTMsYBfAYwIqMr9g4A7wQsqJZMEBq5/UC5pLbVvvR6nQAh9J6W83iXRkDko3DYnxAhy4oyNIHdOoTFPjkA3LS78QOBbR7xQfsAZh4x6l37zS6t2KAWEvv+pEUlAL4hs61AHF1UgD/qYMAi5qApRQ0mombALa8663ouhfAaqZZSIAFGaM+lADoSpSUUARg9aozKDKRGUY7crQM/r+J6n2g3okqE6XOo+MMIPY+y4wBWP3ivVEAqR/YTnmjeKDOQPwKZx05SgYpQJYHo24kNaBjcHUTxd9A6T57V+5T8l05tYmcAo9iQM6bqhoQlFndg5wM1CYGMdU9UJegNjHVSNUA45nY14k0zgfkGOjUZuoDcjaRU+uVD8ipvxqgLXcogHrwT01sY6uWoDZR7UFOI1UDqE3seJDbiU5tvAOUGOjU+ICSTeS08AEl9VcDzLWAwAO1ieK/NAktq2agNlGdQUkjOQX7QA1QeVDaiU7redOBBjo104Gd6LSY9tR/AeBjCjBLAL4DeGvPnwDYITFzKYM/AI4B/LbHiR2LtfaAmXgG4Ma7vrFjFBB34hWADyTYjF1GY8s4gzsAbwDcE8C9vXcXZ9BEAT/JZOkBgYnnJEUmE2NigwyMSe8yJjuZWDNnvZE2ALwWlkmSiTVLu2EA7wHcFkx2+gbg7C+zpEDWTkOhfQAAAABJRU5ErkJggg==",
              length: "0",
              width: "20",
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
            startAngle: this.echartData.tmStart,
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
                value: this.echartData.tmValue,
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
            startAngle: this.echartData.dmStart,
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
                value: this.echartData.dmValue,
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
              symbolSize: [60, 30], //标记的宽、高
              data: [
                //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                {
                  value: this.echartData.curSpeed,
                  x: "center",
                  y: "center",
                  itemStyle: {
                    color: "#3B3C3D",
                    borderColor: "#5f6264",
                    borderRadius: 4,
                    borderWidth: 1,
                    opacity: 0.8
                  }
                }
              ],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: "#6CCDE1", //气泡中字体颜色
                    fontSize: 14,
                    formatter: function(obj) {
                      return obj.value + " m/s";
                    }
                  }
                }
              }
            },
            pointer: {
              length: "120", //指针长度
              offsetCenter: [0, "85%"],
              width: 26,
              icon:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABwCAYAAAAXB/A7AAACkklEQVRYhcWYMW4UMRSG/12WKOmys8sNorC5AQWhTghIlAkNNRdIQ7gBuQWRuEJygRSkoEWBFpGGho4myCt7ZHv+57HneeCXRjvjef7mvd9+u6OdvPr0GQnt/vhyPQHwVQqZpWYDeGk/RcC0B3BkD1GpDLYBPLXnDYBfpRk8B/DQHgdDSjgSzrMAD6KnHthMsgHPbN1OjedHFoClTMsYBfAYwIqMr9g4A7wQsqJZMEBq5/UC5pLbVvvR6nQAh9J6W83iXRkDko3DYnxAhy4oyNIHdOoTFPjkA3LS78QOBbR7xQfsAZh4x6l37zS6t2KAWEvv+pEUlAL4hs61AHF1UgD/qYMAi5qApRQ0mombALa8663ouhfAaqZZSIAFGaM+lADoSpSUUARg9aozKDKRGUY7crQM/r+J6n2g3okqE6XOo+MMIPY+y4wBWP3ivVEAqR/YTnmjeKDOQPwKZx05SgYpQJYHo24kNaBjcHUTxd9A6T57V+5T8l05tYmcAo9iQM6bqhoQlFndg5wM1CYGMdU9UJegNjHVSNUA45nY14k0zgfkGOjUZuoDcjaRU+uVD8ipvxqgLXcogHrwT01sY6uWoDZR7UFOI1UDqE3seJDbiU5tvAOUGOjU+ICSTeS08AEl9VcDzLWAwAO1ieK/NAktq2agNlGdQUkjOQX7QA1QeVDaiU7redOBBjo104Gd6LSY9tR/AeBjCjBLAL4DeGvPnwDYITFzKYM/AI4B/LbHiR2LtfaAmXgG4Ma7vrFjFBB34hWADyTYjF1GY8s4gzsAbwDcE8C9vXcXZ9BEAT/JZOkBgYnnJEUmE2NigwyMSe8yJjuZWDNnvZE2ALwWlkmSiTVLu2EA7wHcFkx2+gbg7C+zpEDWTkOhfQAAAABJRU5ErkJggg=="
            },
            data: [
              {
                //瞬时风向
                value: this.echartData.curDirection,
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
    //定时10分钟刷新
    dataRefreh() {
      //计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      //计时器为空,操作
      this.intervalId = setInterval(() => {
        var arrdep = ["A", "D"];
        this.twrData.arrdep = arrdep[Math.floor(Math.random() * arrdep.length)];
        this.twrData.datistime = lesFrontUtils.Common.date2Str(
          new Date(),
          "hh:mm"
        );
      }, 600000);
    },
    // 仪表盘动态刷新
    dataEchartRafreh() {
      if (this.echartIntervalid != null) {
        return;
      }
      //计时器为空,操作
      this.echartIntervalid = setInterval(() => {
        var arr = [0.6, 0.8, 1, 1.2, 1.3, 1.4];
        this.echartData.tmStart = (
          arr[Math.floor(Math.random() * arr.length)] * 100
        ).toFixed(2);
        this.echartData.tmValue = (
          arr[Math.floor(Math.random() * arr.length)] * 100
        ).toFixed(2);
        this.echartData.dmStart = (
          arr[Math.floor(Math.random() * arr.length)] * 100
        ).toFixed(2);
        this.echartData.dmValue = (
          arr[Math.floor(Math.random() * arr.length)] * 100
        ).toFixed(2);
        this.echartData.curSpeed = arr[
          Math.floor(Math.random() * arr.length)
        ].toFixed(2);
        this.echartInit();
      }, 3500);
    },
    // 键盘事件
    keyDown(e) {
      switch (e.keyCode) {
        case 90: //z  飞机显示
          this.$refs["flight"].style.opacity = 1;
          this.$refs["carDashed"].style.opacity = 0;
          this.$refs["car"].style.opacity = 0;
          this.$refs["east3"].style.opacity = 0;
          this.$refs["east2"].style.opacity = 0;
          this.$refs["east1"].style.opacity = 0;
          this.$refs["east"].style.opacity = 0;
          break;
        case 88: //x  车及虚线显示
          this.$refs["flight"].style.opacity = 0;
          this.$refs["carDashed"].style.opacity = 1;
          this.$refs["car"].style.opacity = 1;
          this.$refs["east3"].style.opacity = 1;
          this.$refs["east2"].style.opacity = 1;
          this.$refs["east1"].style.opacity = 1;
          this.$refs["east"].style.opacity = 1;
          break;
        case 67: //c 西 西1 西2 西3显示
          this.$refs["west"].style.opacity = 1;
          this.$refs["west1"].style.opacity = 1;
          this.$refs["west2"].style.opacity = 1;
          this.$refs["west3"].style.opacity = 1;
          this.$refs["east3"].style.opacity = 0;
          this.$refs["east2"].style.opacity = 0;
          this.$refs["east1"].style.opacity = 0;
          this.$refs["east"].style.opacity = 0;
          break;
        case 86: //v 东 东1 东2 东3显示
          this.$refs["west"].style.opacity = 0;
          this.$refs["west1"].style.opacity = 0;
          this.$refs["west2"].style.opacity = 0;
          this.$refs["west3"].style.opacity = 0;
          this.$refs["east3"].style.opacity = 1;
          this.$refs["east2"].style.opacity = 1;
          this.$refs["east1"].style.opacity = 1;
          this.$refs["east"].style.opacity = 1;
          break;
        case 65: //a 雷暴预警
          this.alarmFlag = false;
          break;
        case 83: //s 气象预警
          this.alarmFlag = true;
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keyDown);
    this.echartInit();
    this.twrData.datisdate = lesFrontUtils.Common.date2Str(
      new Date(),
      "YYYY-MM-DD"
    );
    this.twrData.datistime = lesFrontUtils.Common.date2Str(new Date(), "hh:mm");
  },
  created() {
    this.dataRefreh();
    this.dataEchartRafreh();
  },
  //停止定时器
  clear() {
    clearInterval(this.intervalId); //清除定时器
    this.intervalId = null;
  }
};
</script>
<style scoped>
.carDashed {
  border: 1px dashed red;
  width: 850px;
  height: 40px;
  position: absolute;
  top: 25%;
  left: 5%;
  opacity: 0;
}
.animation {
  position: absolute;
  top: 33%;
  left: 75%;
  transform: translate(100%, -58%);
  opacity: 0;
  animation-name: myfirst;
  -webkit-animation-name: myfirst;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  /* 规定动画完成每一个周期所用的时间 */
  /* 指定动画播放无限次 */
  /* -webkit-animation-iteration-count: infinite; */
}
@keyframes myfirst {
  0% {
    left: 65%;
    top: 33%;
  }
  100% {
    left: 0%;
    top: 33%;
  }
}
@-webkit-keyframes myfirst {
  0% {
    left: 65%;
    top: 33%;
  }
  100% {
    left: 0%;
    top: 33%;
  }
}
.animationCar {
  position: absolute;
  top: 32%;
  left: 90%;
  animation-name: car;
  opacity: 0;
  -webkit-animation-name: car;
  animation-duration: 10s;
  -webkit-animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-duration: 10s;
}
@keyframes car {
  0% {
    position: absolute;
    top: 32%;
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  49.9% {
    position: absolute;
    top: 32%;
    transform: translateX(-780px) translateY(0px) rotate(0deg);
  }
  50% {
    position: absolute;
    top: 32%;
    transform: translateX(-780px) translateY(0px) rotate(180deg);
  }
  50.9% {
    position: absolute;
    top: 30%;
    transform: translateX(-780px) translateY(0px) rotate(180deg);
  }
  99.9% {
    position: absolute;
    top: 30%;
    transform: translateX(0px) translateY(0) rotate(180deg);
  }
  100% {
    position: absolute;
    top: 30%;
    transform: translateX(0px) translateY(0) rotate(180deg);
  }
}
@-webkit-keyframes car {
  0% {
    position: absolute;
    top: 32%;
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  49.9% {
    position: absolute;
    top: 32%;
    transform: translateX(-780px) translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateX(-780px) translateY(0px) rotate(180deg);
  }
  50.9% {
    position: absolute;
    top: 30%;
    transform: translateX(-780px) translateY(0px) rotate(180deg);
  }
  99.9% {
    position: absolute;
    top: 30%;
    transform: translateX(0px) translateY(0) rotate(180deg);
  }
  99% {
    transform: translateX(0px) translateY(0) rotate(180deg);
  }
  100% {
    left: 0%;
    top: 40%;
    transform: translateX(0px) translateY(0) rotate(0deg);
  }
}
.leftStyle {
  float: left;
  width: 108px;
  height: 200px;
  text-align: center;
  margin-top: 20px;
  margin-left: 49px;
}
.left2Style {
  width: 108px;
  height: 158px;
  background: #464646;
  border: 1px solid #676767;
  margin-bottom: 10px;
}
.rightStyle {
  float: right;
  width: 265px;
  height: 300px;
  margin-right: 53px;
}
.rigth2Style {
  width: 265px;
  height: 200px;
  margin-top: 20px;
  background: #464646;
  border: 1px solid #5f5f5f;
  margin-bottom: 10px;
}
.right-top-second-div {
  width: 265px;
  height: 200px;
}
.rightBottom {
  width: 265px;
  height: 44px;
}
.rightBottomleft {
  width: 128px;
  height: 44px;
  float: left;
  background: #464646;
  border: 1px solid #5f5f5f;
}
.bottomLeft {
  text-align: center;
  float: left;
  height: 44px;
  width: 46px;
  background: #606062;
}
.datisDivStyle {
  width: 100%;
  text-align: center;
  color: #e6e6e6;
  font-size: 80px;
}

.alarmStyle {
  width: 95%;
  height: 76px;
  margin-left: 2.5%;
  margin-top: calc(100vh - 340px - 200px - 66px);
  background: #3d3d3d;
}

.alarmSpan {
  color: #f0ce66;
  font-size: 24px;
  margin-top: 22px;
  margin-left: 11px;
  margin-right: 29px;
}
.protect-area-img {
  display: inline-block;
}
.runway-img {
  width: 857px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.west-img {
  position: absolute;
  top: 2%;
  left: 0.2%;
  opacity: 0;
}
.west1-img {
  position: absolute;
  top: 0%;
  left: 1%;
  opacity: 0;
}

.west2-img {
  position: absolute;
  top: 0%;
  left: 16.7%;
  opacity: 0;
}

.west3-img {
  position: absolute;
  top: 0%;
  left: 33.25%;
  opacity: 0;
}

.east3-img {
  position: absolute;
  top: 0%;
  left: 51%;
  opacity: 0;
}

.east2-img {
  position: absolute;
  top: 0%;
  left: 68%;
  opacity: 0;
}

.east1-img {
  position: absolute;
  top: 0%;
  left: 83.5%;
  opacity: 0;
}
.east-img {
  position: absolute;
  top: 1%;
  right: 0%;
  opacity: 0;
}
.flight {
  background: #464646;
  border: 1px solid grey;
  width: 100px;
  position: absolute;
  left: 47%;
  top: -67%;
  text-align: center;
  color: #fff;
  z-index: 100;
  opacity: 0.6;
}
</style>
<style>
html,
body {
  height: 100%;
  padding: 0px;
  margin: 0px;
  background-color: black;
}
</style>