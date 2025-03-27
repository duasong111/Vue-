<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small">
        <component class="icons" is="menu" @click="handCollapse" />
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- <img :src="getImageUrl('user')" class="user"/> -->
          <img :src="userImage" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
            <el-dropdown-item>语言

            </el-dropdown-item>
            <el-dropdown-item>模式</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const getImageUrl = (user) => {
  return new URL(`../../images/${user}.png`, import.meta.url).href
}
import userImage from '../assets/images/OIP.png'
import { useAllDataStore } from '@/stores'
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))

const store = useAllDataStore()
//去调用store函数，然后取反，实现不一样展示功能
const handCollapse = () => { store.state.isCollapse = !store.state.isCollapse; }


</script>
<style lange="less" scoped>
/* .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
} */
.header[data-v-1bc5cecc] {
  display: flex;
  background-color: #333;
  align-items: flex-end;
  justify-content: space-between;
}

[data-v-1bc5cecc] .bread span {
  color: #fff !important;
  cursor: pointer !important;
  margin: 0 5px;
}

.icons {
  width: 20px;
  height: 20px;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20rpx;
  }

}

.r-content {
  background-color: #333;

  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;

}
</style>