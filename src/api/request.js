import axios from "axios";
import { ElMessage } from "element-plus";
import config from "../config";
const service = axios.create({
  baseURL: config.baseApi,
});

//进行二次封装的拦截器

service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// service.interceptors.response.use((response) => {
//   console.log("响应拦截器", response.data);
//   return response.data; // 确保返回
// });
service.interceptors.response.use((res) => {
  const { code: code, data: data } = res.data; // 注意字段名小写 data，与 Mock 一致
  console.log("响应拦截器", res.data);
  if (code === 200) {
    return data; // 返回整个 {code, data} 对象
  } else {
    const NETWORK_ERROR = "网络错误.....";
    ElMessage.error(res.data.msg || NETWORK_ERROR); // 假设错误响应有 msg 字段
    return Promise.reject(res.data.msg || NETWORK_ERROR);
  }
});
// 添加响应拦截器
// service.interceptors.response.use((res) => {
//   const { code: code, Data: data } = res.data;
//   console.log("响应拦截器", res.data);

//   if (code === 200) {
//     return data;
//   } else {
//     const NETWORK_ERROR = "网络错误.....";
//     ElMessage.error("无法正常显示该图表" || NETWORK_ERROR);
//     return Promise.reject("无法正常显示该图表" || NETWORK_ERROR);
//   }
// });

function request(options) {
  options.method = options.method || "get";
  //关于get请求参数的调整
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  //对mock的开关进行处理
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }
  //针对线上环境做一个处理
  if (config.env === "prod") {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return service(options);
}

export default request;
