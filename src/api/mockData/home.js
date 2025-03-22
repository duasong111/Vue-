import { GoodsFilled, StarFilled, SuccessFilled } from "@element-plus/icons-vue"

export default {
    getTableData:() =>{
        return{
            code:200,
           Data:[
                {
                    name: 'OPPO',
                    todayBuy:100,
                    monthBuy:200,
                    totalBuy:300
                  },{
                    name: '小米',
                    todayBuy:100,
                    monthBuy:200,
                    totalBuy:300
                  },{
                    name: '苹果',
                    todayBuy:100,
                    monthBuy:200,
                    totalBuy:300
                  },
            ]
        }
    },
    getCountData:() =>{
      return{
          code:200,
          Data:[
              {
                  name: '支付账单',
                  value:1234,
                  icon:"SuccessFilled",
                  color:"#2ec7c9"
                },              {
                  name: '本月支付账单',
                  value:333,
                  icon:"GoodsFilled",
                  color:"#ce5777"
                },              {
                  name: '本月收藏账单',
                  value:1234,
                  icon:"StarFilled",
                  color:"#2ec7c9"
                },
                {
                  name: '本月未支付账单',
                  value:1234,
                  icon:"GoodsFilled",
                  color:"#c93756"
                },
                {
                  name: '其他',
                  value:111,
                  icon:"SuccessFilled",
                  color:"#fbc82f"
                },
                {
                  name: '其他',
                  value:999,
                  icon:"GoodsFilled",
                  color:"#fbc82f"
                },
          ]
      }
    },
    getChartData:() =>{
      return{
          code:200,
          Data:{
            orderData :{
              date:[
                "2025-3-16",
                "2025-3-17",
                "2025-3-18",
                "2025-3-19",
                "2025-3-20",
                "2025-3-21",
                "2025-3-22",
              ],
              data:{
                苹果:3333,
                小米:4444,
                华为:5555,
                OPPO:6666,
                VIVO:7777,
                三星:8888,
              },              data:{
                苹果:3213,
                小米:4434,
                华为:4355,
                OPPO:4366,
                VIVO:7327,
                三星:8228,
              },              data:{
                苹果:3332,
                小米:4222,
                华为:5323,
                OPPO:3266,
                VIVO:6234,
                三星:54,
              },              data:{
                苹果:3343,
                小米:4344,
                华为:5455,
                OPPO:6666,
                VIVO:7547,
                三星:8548,
              },
            },
          },
          videoDate:[
            {name:"小米",value:3333},
            {name:"苹果",value:2233},
            {name:"VIVO",value:3233},
            {name:"OPPO",value:2233},
            {name:"魅族",value:4233},
            {name:"三星",value:3233},
          ],
          userDate:[
            {date:"小米",new:3333,active:200},
            {date:"苹果",new:2233,active:300},
            {date:"VIVO",new:3233,active:400},
            {date:"OPPO",new:2233,active:500},
            {date:"魅族",new:4233,active:600},
            {date:"三星",new:3233,active:200},
          ],
      }
  },
}