import Mock from "mockjs";

export default {
  getMenu: (config) => {
    // 从 config 中提取 loginForm 数据 --注意数据的解构

    const body = JSON.parse(config.body || "{}");
    const { username, pass } = body;

    if (username === "admin" && pass === "password") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "house",
              url: "Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "video-play",
              url: "Mall",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "User",
            },
            {
              path: "other",
              label: "其他",
              icon: "location",
              url: "Page1",
              children: [
                {
                  path: "/page",
                  name: "page",
                  label: "页面1",
                  icon: "setting",
                  url: "page1",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "setting",
                  url: "page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "xiaoming" && pass === "password") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "house",
              url: "Home",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "User",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
