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
                  color:"#2ec7c9"
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
                  color:"#2ec7c9"
                },
          ]
      }
  },
}