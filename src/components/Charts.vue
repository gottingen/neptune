<template>
  <br/>
  <div>
    <button @click="changeData">改变数据</button>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <button @click="recoveryData">恢复数据</button>
  </div>
  <div id="myEChart" style='height: 500px; width: auto;'></div>
</template>

<script>
// 导入echarts依赖
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue';
export default {
  data() {
    return {};
  },
  setup() {
    // 在组件挂载的时候，初始化图表信息
    onMounted(() => {
      // Echarts重新加载数据但不重新渲染的原因和解决方法
      document.getElementById("myEChart").setAttribute('_echarts_instance_', '');
      let myChart = echarts.init(document.getElementById("myEChart"));
      getChartSetting().then(() => {
        myChart.setOption(option);
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    });

    let scheduleList = reactive([]);
    let option = reactive({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          emphasis: {
            focus: 'series'
          },
          markLine: {
            lineStyle: {
              type: 'dashed'
            },
            data: [[{ type: 'min' }, { type: 'max' }]]
          }
        },
        {
          name: 'Baidu',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: 'Google',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: 'Bing',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: 'Others',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    });

    function changeData() {
      console.log("进入修改函数");
      scheduleList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
      option.xAxis[0].data = scheduleList;
      refreshChart();
    }
    function recoveryData() {
      console.log("进入恢复函数");
      scheduleList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      option.xAxis[0].data = scheduleList;
      refreshChart();
    }

    function refreshChart() {
      console.log("进入刷新图表函数");
      // Echarts重新加载数据但不重新渲染的原因和解决方法
      document.getElementById("myEChart").setAttribute('_echarts_instance_', '');
      let myChart = echarts.init(document.getElementById("myEChart"));
      myChart.setOption(option);
    }

    // 获取echart数据函数
    async function getChartSetting() {
      scheduleList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      option.xAxis[0].data = scheduleList;
      // 之前的案例参考
      // const url = `${BASE_URL}/selectdata`;
      // console.log("selectdata");
      // res = await $axios({
      //     url,
      //     method: "post",
      // });
      // scheduleList = res.map(v => v.schedule);
      // option.xAxis[0].data = scheduleList;
    }
    return {
      changeData,
      recoveryData,
      option,
      scheduleList,
      getChartSetting,
    }
  },
  methods: {

  },
}
</script>
