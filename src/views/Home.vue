
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px;">
        <el-card shadow="hover">
            <div class="user">
                <img :src="userImage" class="user" alt="加载失败，请重试">
                <div class="user-info">
                    <p class="user-info-admin">admin</p>
                    <p class="user-info-p">超级管理员</p>
                </div>
            </div>
            <div class="login-info">
                <p>上次登录时间：<span>2025年3月22日</span></p>
                <p>上次登录地点：<span>湖北武汉</span></p>

                <el-card shadow="hover" class="user-table">
            <el-table :data="tableData" >
                <el-table-column 
                v-for="(val,key) in tableLable"
                :key="key"
                :prop="key"
                :label="val"
                >
                </el-table-column>
        </el-table>
        </el-card>
            </div>
        </el-card>


    </el-col>

    <!-- 对另一半的处理 -->
     <el-col :span="16" style="margin-top: 20px;">
        <div class="number">
            <el-card
        :body-style="{display:'flex',padding:0 }"
        v-for="item in countData"
        :key="item.name">
         <component :is="item.icon"
         class="icons"
         :style="{background:item.color}"></component>   
            
        <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
        </div>
        </el-card>
        </div>
     </el-col>
  </el-row>
</template>


<script setup>
import { ref,onMounted,getCurrentInstance } from "vue";
import userImage from '../assets/images/OIP.png' // 直接导入图片

const {proxy} = getCurrentInstance();

const tableData = ref([])
const countData = ref([])
const tableLable = ref({
    name: '课程',
    todayBuy:"本月购买",
    monthBuy:"上月购买",
    totalBuy:"总购买"
})

const getTableData = async() =>{
    const data = await proxy.$api.getTableData();
    /*为啥直接是data呢，不是data.tableData呢，是因为在request.js中
    进行了 const {code:code,tableData:data} = res.data; 已经解构了*/
    tableData.value = data;  
}
//去拿到countData
const getCountData = async() =>{
    const data = await proxy.$api.getCountData();
    /*为啥直接是data呢，不是data.Data呢，是因为在request.js中
    进行了 const {code:code,Data:data} = res.data; 已经解构了*/
    countData.value = data;  
}
onMounted(()=>{
    getTableData();
    getCountData();
})
</script>

<style scoped lang="less">
.home{
    height: 100%;
    overflow: hidden;
    .user{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .user-info{
            p{
                line-height: 40px;
            }
            .user-info-p{
                color: #999;
            }
            .user-info-admin{
                font-size: 32px;
            }
        }
    }
}
.login-info{
    p{
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span{
        color: #666;
        margin-left: 60px;
        }
    }
}
.user-table{
        margin-top: 10px;
    }
.number{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
        width: 32%;
        margin-top: 8px;
    }
    .icons{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        margin:auto 10px;
    }
    .detail{
       // display: flex;
       // flex-direction: column;
       // justify-content: center;
       .num{
           font-size: 24px;
           // margin-bottom: 10px;
       }
       .txt{
           font-size: 15px;
        //    text-align: center;
           color: #080808;
       }
   }

}
</style>
