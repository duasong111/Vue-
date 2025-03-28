<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="item in tableLable" :key="item.prop" :width="item.width ? item.width : 125"
        :prop="item.prop" :label="item.label" />
      <el-table-column fixed="right" label="Operations" min-width="140">
        <template #default>
          <el-button type="success" size="small" @click="handleClick">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue';

const { proxy } = getCurrentInstance();
const tableData = ref([]);
const getUserData = async () => {
  const data = await proxy.$api.getUserData();
  //采用map的方式去将sexLabel去进行展示出来
  tableData.value = data.list.map(item => ({
    ...item,
    sexLabel: item.sex === 1 ? '男' : '女'
  }))// 根据 Mock 数据结构调整

};
const tableLable = reactive([
  {
    prop: "name",
    label: "姓名"
  }, {
    prop: "age",
    label: "年龄"
  }, {
    prop: "sexLabel",
    label: "性别"
  }, {
    prop: "birth",
    label: "出生日期",
    width: 400
  }, {
    prop: "addr",
    label: "地址",
    width: 400
  },
])
onMounted(() => {
  getUserData();
});

const handleClick = () => {
  console.log('click');
};
</script>

<style lang="scss" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>