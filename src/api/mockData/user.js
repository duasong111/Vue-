import Mock from "mockjs";

//使用get去从config.js中去继续获取参数，POST从config.body中获取

function params2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 200;
//模拟两百条数据
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"), //可能有问题
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
    })
  );
}

export default {
  getUserList: (config) => {
    const { name, page = 1, limit = 10 } = params2Obj(config.url);

    const mockList = List.filter((user) => {
      if (name && user.name.indexOf(name) === -1) return false;
      return true;
    });
    //实现分页

    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );

    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length, //数据总条数需要返回
      },
    };
  },
};
