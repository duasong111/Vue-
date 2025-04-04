/*对整个项目的api进行统一的管理*/

import request from "./request";

export default {
  getTableData() {
    return request({
      url: "/home/getTableData",
      method: "get",
      mock: false,
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
      mock: false,
    });
  },
  getChartData() {
    return request({
      url: "/home/getChartData",
      method: "get",
      mock: false,
    });
  },
  //在User页面中展示
  getUserData(data) {
    return request({
      url: "/home/getUserData",
      method: "get",
      mock: false,
      data,
    });
  },
  //删除用户数据
  deleteUser(data) {
    return request({
      url: "/user/deleteUser",
      method: "get",
      data,
    });
  },
  //添加用户数据
  addUser(data) {
    return request({
      url: "/user/addUser",
      method: "post",
      data,
    });
  },
  //编辑用户数据
  editUser(data) {
    return request({
      url: "/user/updateUser",
      method: "post",
      data,
    });
  },
  getMenu(params) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data: params,
    });
  },
};
