<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="item in tableLable" :key="item.prop" :width="item.width ? item.width : 125"
        :prop="item.prop" :label="item.label" />
      <el-table-column fixed="right" label="Operations" min-width="140">
        <template #="scope">
          <el-button type="success" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager" background size="small" layout="prev, pager, next" :total="config.total"
      @current-change="handleChange" />
  </div>
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新用户' : '编辑用户'" width="35%" :before-close="handleClose">

    <el-form ref="userForm" :inline="true" :model="formUser" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formUser.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker v-model="formUser.birth" type="date" placeholder="请输入" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>


<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted, getCurrentInstance, reactive, nextTick } from 'vue';

const { proxy } = getCurrentInstance();
const tableData = ref([]);
const getUserData = async () => {
  const data = await proxy.$api.getUserData(config);
  //采用map的方式去将sexLabel去进行展示出来
  tableData.value = data.list.map(item => ({
    ...item,
    sexLabel: item.sex === '1' ? '男' : '女'
  }))// 根据 Mock 数据结构调整
  config.total = data.count
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
const formInline = reactive({
  keyWord: ""
})
const handleSearch = () => {
  config.name = formInline.keyWord
  getUserData()
}
const config = reactive({
  name: '',
  total: 0,
  page: 1
})
const handleChange = (page) => {
  config.page = page,
    getUserData()
}
//删除按钮的设置
const handleDelete = (data) => {
  ElMessageBox.confirm("确定要删除吗？").then(async () => {
    await proxy.$api.deleteUser({ id: data.id })
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
    getUserData()
  })

}
const action = ref('add')
const dialogVisible = ref(false)
const formUser = reactive({
  sex: '1'
})
//表单验证规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    // { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必填项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必填项" }],
  addr: [{ required: true, message: "地址是必填项" }],
})
const handleClose = () => {
  dialogVisible.value = false;
}
const handleCancel = () => {
  dialogVisible.value = false;

}
const handleAdd = () => {
  dialogVisible.value = true
  action.value = 'add'
}
const timeFormat = (time) => {
  const formattedTime = new Date(time); // 使用一个新变量名
  let year = formattedTime.getFullYear();
  let month = formattedTime.getMonth() + 1;
  let date = formattedTime.getDate();
  function add(m) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add(month) + "-" + add(date);
};
//数据添加的提交按钮
const onSubmit = () => {
  proxy.$refs['userForm'].validate(async (vaild) => {
    if (vaild) {
      let res = null;
      formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth)
      if (action.value === 'add') {
        res = await proxy.$api.addUser(formUser)
      } else {
        res = await proxy.$api.editUser(formUser)
      }
      if (res) {
        dialogVisible.value = false
        proxy.$refs['userForm'].resetFields()
        ElMessage({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        getUserData()
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: 'error'
      })
    }
  })
}
//对数据的编辑
const handleEdit = (val) => {
  action.value = 'edit'
  dialogVisible.value = true
  nextTick(() => {
    Object.assign(formUser, { ...val, sex: '' + val.sex })
  })

}
onMounted(() => {
  getUserData();
});
</script>

<style lang="scss" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}

.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }

  .el-table {
    width: 100%;
    height: 500px;
  }
}

.select-clearn {
  display: flex;
}
</style>