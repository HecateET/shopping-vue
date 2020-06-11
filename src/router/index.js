import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'

import Login from  '../view/login/Login.vue'
import Register from '../view/signin/register.vue'
import Index from  '../view/index/index.vue'
import GoodsType from '../view/index/goodsType.vue'
import GoodDetails from '../view/goodsDetail/goodDetails.vue'
import ConfirmOrder from '../view/order/ConfirmOrder.vue'
import OrderDetails from '../view/order/orderDetails.vue'
import PayIndex from '../view/order/PayIndex.vue'
import MyCenterIndex from  '../view/myCenter/myCenterIndex.vue'
import MyCenterMyInfo from '../view/myCenter/myInfo.vue'
import MyShoppingCart from '../view/myCenter/myShoppingCart.vue'
import ChangePassword from '../view/myCenter/changePassword.vue'
import MyOrder from '../view/myCenter/myOrder.vue'
import MyAddress from '../view/myCenter/myAddress.vue'
import Manager from '../view/managerAdmin/manager.vue'
import ManagerLogin from '../view/managerAdmin/login/ManagerLogin.vue'
import ManagerSearchUser from "../view/managerAdmin/userManger/searchUser.vue"
import ManagerUserList from '../view/managerAdmin/userManger/userList.vue'
import ManagerAddGoods from '../view/managerAdmin/goodsManger/addGoods.vue'
import ManagerEditGoods from '../view/managerAdmin/goodsManger/editGoods.vue'
import ManagerGoodList from '../view/managerAdmin/goodsManger/goodsList.vue'
import ManagerAddType from '../view/managerAdmin/goodsManger/addType.vue'
import ManagerSearchOrder from '../view/managerAdmin/orderManger/searchOrder.vue'
import ManagerOrderList from '../view/managerAdmin/orderManger/orderList.vue'
import ManagerAddressList from '../view/managerAdmin/addressManger/addressList.vue'
import ManagerSearchAddress from '../view/managerAdmin/addressManger/searchAddress.vue'
import ManagerSetPassword from '../view/managerAdmin/managerSet/changePassword.vue'
import ManagerMyPublish from  '../view/managerAdmin/managerSet/myPublish.vue'

Vue.use(Router)
// Vue.prototype.$ajax = axios;

export default new Router({
  routes: [
    { 
      path: '/login', 
      name:"userLogin",
      component: Login 
    },
    {
      path:'/register',
      name:'register',
      component:Register,

    },
    {
      path: '/',
      name:'shoppingIndex',
      redirect: '/index',
    },
    {//首页
      path:'/index',
      name:'shoppingIndex1',
      component:Index,
    },
    {//商品页
      path:"/goodsType",
      name:"goodType",
      component:GoodsType,
    },
    {//商品详情页
      path:"/goodDetails",
      name:"goodDetails",
      component:GoodDetails
    },
    {//确认订单
      path:"/confirmOrder",
      name:"confirmOrder",
      component:ConfirmOrder,
    },
    {
      path:"/orderDetails",
      name:"orderDetails",
      component: OrderDetails 
    },
    {
      path:"/payIndex",
      name:"payIndex",
      component: PayIndex 
    },
    {
      path:"/myShoppingCart",
      name:"myShoppingCartIndex",
      component:MyShoppingCart,
    },
    {
      path:"/myCenter",
      name:"myCenter",
      component:MyCenterIndex,
      children:[
        {
          path:"/myCenter/myInfo",
          name:"myCenterMyInfo",
          component:MyCenterMyInfo,
        },
        {
          path:"/myCenter/changePassword",
          name:"changePassword",
          component:ChangePassword,
        },
        {
          path:"/myCenter/myOrder",
          name:"myOrder",
          component:MyOrder,
        },
        {
          path:"/myCenter/myAddress",
          name:"myAddress",
          component:MyAddress,
        },
      ]
    },
    {//后台管理系统
      path:'/manager',
      name:"manager",
      component:Manager,
      children:[
        {
          path:"/manager/searchUser",
          name:"managerSearchUser",
          component:ManagerSearchUser,
        },
        {
          path:"/manager/login",
          name:"managerLogin",
          component:ManagerLogin,
        },
        {
          path:"/manager/userList",
          name:"managerUserList",
          component:ManagerUserList,
        },
        {
          path:"/manager/addGoods",
          name:"managerAddGoods",
          component:ManagerAddGoods,
        },
        {
          path:"/manager/editGoods",
          name:"managerEditGoods",
          component:ManagerEditGoods,
        },
        {
          path:'/manager/addType',
          name:"managerAddType",
          component:ManagerAddType,
        },
        {
          path:"/manager/goodLists",
          name:"managerGoodList",
          component:ManagerGoodList,
        },
        {
          path:"/manager/orderList",
          name:"managerOrderList",
          component:ManagerOrderList,
        },
        {
          path:"/manager/searchOrder",
          name:"searchOrder",
          component:ManagerSearchOrder,
        },
        {
          path:"/manager/addressList",
          name:"managerAddressList",
          component:ManagerAddressList,
        },
        {
          path:"/manager/searchAddress",
          name:"managerSearchAddress",
          component:ManagerSearchAddress,
        },
        {
          path:"/manager/setPassword",
          name:"managerSetPassword",
          component:ManagerSetPassword
        },
        {
          path:"/manager/myPublish",
          name:"managerMyPublish",
          component:ManagerMyPublish
        },

      ]

    }
  ]
})
