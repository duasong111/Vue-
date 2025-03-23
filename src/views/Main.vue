<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <CommonAside></CommonAside>
      <el-container>
        <el-header class="el-header">
          <common-header />
        </el-header>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
</script>

<style scoped lang="less">
.common-layout,
.lay-container {
  height: 100%;
}

.el-header {
  background-color: #333333;
}
</style>
