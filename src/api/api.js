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
  getUserData() {
    return request({
      url: "/home/getUserData",
      method: "get",
      mock: false,
    });
  },
};
