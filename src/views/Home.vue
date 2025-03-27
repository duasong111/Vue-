<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px;">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImage" class="user" alt="加载失败，请重试" />
          <div class="user-info">
            <p class="user-info-admin">admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2025年3月22日</span></p>
          <p>上次登录地点：<span>湖北武汉</span></p>
          <el-card shadow="hover" class="user-table">
            <el-table :data="tableData">
              <el-table-column v-for="(val, key) in tableLable" :key="key" :prop="key" :label="val"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-card>
    </el-col>

    <el-col :span="16" style="margin-top: 20px;">
      <div class="number">
        <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
          <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart">
        <div ref="echart" style="height: 280px;"></div>
      </el-card>

      <div class="graph">
        <el-card>
          <div ref="userEchart" style="height: 240px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import userImage from '../assets/images/OIP.png';
import * as echarts from 'echarts';

const { proxy } = getCurrentInstance();

const tableData = ref([]);
const countData = ref([]);
const tableLable = ref({
  name: '课程',
  todayBuy: '本月购买',
  monthBuy: '上月购买',
  totalBuy: '总购买',
});

// ECharts 配置
const chartOptions = ref({
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
});

const getTableData = async () => {
  const data = await proxy.$api.getTableData();
  tableData.value = data;
};

const getCountData = async () => {
  const data = await proxy.$api.getCountData();
  countData.value = data;
};

const getChartData = async () => {
  const { orderData, videoDate, userDate } = await proxy.$api.getChartData();
  console.log('videoDate', videoDate);

  // 更新 chartOptions
  chartOptions.value.xAxis.data = orderData.date;
  chartOptions.value.series = Object.keys(orderData.data[0]).map((val) => ({
    name: val,
    data: orderData.data.map((item) => item[val]),
    type: 'line',
  }));

  // 初始化 ECharts
  const chartDom = proxy.$refs['echart'];
  if (chartDom) {
    const chartInstance = echarts.init(chartDom);
    chartInstance.setOption(chartOptions.value);
  } else {
    console.error('ECharts DOM 未找到');
  }

  //对下面的表格去进行渲染
  chartOptions.value.xAxis.data = userDate.map(item => item.date);
  chartOptions.value.series = [
    {
      name: "新增用户",
      data: userDate.map(item => item.new),
      type: 'bar',
      barWidth: '20%', // 设置柱子宽度
      itemStyle: {
        color: '#5470c6' // 自定义颜色
      }
    },
    {
      name: "活跃用户",
      data: userDate.map(item => item.active),
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: '#91cc75' // 不同颜色区分
      }
    }
  ];

  // 初始化 ECharts
  const userChartDom = proxy.$refs['userEchart'];
  if (userChartDom) {
    const userEchart = echarts.init(userChartDom);
    userEchart.setOption(chartOptions.value);
  } else {
    console.error('userEchart DOM 未找到');
  }
  //饼状图显示

};

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
});
</script>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: hidden;

  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }

    .user-info {
      p {
        line-height: 40px;
      }

      .user-info-p {
        color: #999;
      }

      .user-info-admin {
        font-size: 32px;
      }
    }
  }
}

.login-info {
  p {
    line-height: 30px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.user-table {
  margin-top: 10px;
}

.number {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-top: 8px;
  }

  .icons {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    margin: auto 10px;
  }

  .detail {

    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    .num {
      font-size: 24px;
      // margin-bottom: 10px;
    }

    .txt {
      font-size: 15px;
      //    text-align: center;
      color: #080808;
    }
  }

  .graph {
    display: flex;
    justify-content: space-between;

    .el-card {
      width: 48%;
      height: 260px;
    }
  }

}
</style>
