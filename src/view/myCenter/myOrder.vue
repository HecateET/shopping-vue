<template>
    <section class="my-orders">
      <div class="my-orders-tab">
        <p>全部订单</p>
        <p>待付款</p>
        <p>已发货</p>
        <p>已收货</p>
      </div>
      <div class="order-content">
        <div class="order-list">
          <div class="order-item" v-for="(item,index) in orderList" :key="index">
            <div class="top">
              <span class="time">{{item.orderDate}}</span>
              <span class="orderNo">
                订单号：
                {{item.orderNo}}
              </span>
            </div>
            <div class="bottom">
              <img class="product-img" :src="item.productPicture">
              <div class="product-info">
                <p class="name">{{item.productName}}</p>
                <p class="type">{{item.productType}}</p>
                <p class="des">{{item.productDescribe}}</p>
              </div>
              <p class="price">{{item.unitCost}}</p>
              <p class="num">{{item.productNum}}</p>
              <div class="btn-content">
                <p>{{item.orderStatus}}</p>
                <p class="btn" @click="gotoOrderDetail(item)">订单详情</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

import {formatTime} from '../../assets/js/methods.js'
    export default {
      name: "myPort",
      data(){
          return{
            userId:'',
            orderList:[],
            type:1, //tab位置
          }
      },
      methods:{
        getUserOrderList(){
          this.axios.post(`${this.$store.state.baseURL}/users/getMyOrders`,{
            userId:this.userId,
          }).then((res)=>{
            let data = res.data
            console.log(data)
            if(data.code == "200" && data.data.length>0){
              this.orderList = data.data;
              this.orderList.forEach(item=>{
                let date = new Date(item.orderDate)
                item.orderDate = formatTime(date);
              })
            }
          })
        },
        //跳转订单详情页
        gotoOrderDetail(item){
           let query = {
                orderNo:item.orderNo,
                orderId:item.orderId,
            }
            this.$router.push({
                path:"/orderDetails",
                name:"orderDetails",
                query:query,
            })
        }
      },
      created(){
        this.userId = this.$parent.userId;
        if(this.userId==""){
            this.$refs.toast.open({
                hasIcon:false,
                message:"请登录后在添加购物车，正在跳转登陆页！",
            })
            setTimeout(()=>{
                this.$router.push({
                    path:'/login',
                    name:'userLogin',
                })
            },3000)
            return;
        }
      },
      mounted(){
        this.getUserOrderList();
      },
    }
</script>

<style lang="less" scoped >
  .my-orders{
    // background-color: #fff;
    margin-bottom: 50px;
    .my-orders-tab{
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      width: 100%;
      height: 40px;
      background-color: #ffc;
      border-bottom: 1px solid #ccc;
      p{
        flex: 1;
        font-size: 14px;
        font-weight: bold;
        color: #333;
        text-align: center;
        border-right: 1px solid #ccc;
      }
      p:last-child{
        border-right: none;
      }
    }
    .order-content{
      padding:10px 0;
      .order-list{
        .order-item{
          margin-bottom: 15px;
          background: #fff;
          .top{
            font-size: 14px;
            padding: 10px;
            background: #ececec;
            border-bottom: 1px solid #ccc;
            .time{
              font-weight: bold;
              margin-left: 5px ;
            }
            .orderNo{
              margin-left: 10px ;
            }
          }
          .bottom{
            padding:10px;
            display: flex;
            .product-img{
              width: 120px;
              height: 120px;
              margin-right: 15px;
            }
            .product-info{
              width: 240px;
              display: flex;
              flex-direction:column;
              align-items: flex-start;
              justify-content: center;
              .name{
                font-size: 12px;
                color: #333;
                padding-bottom: 5px;
              }
              .type,.des{
                font-size: 12px;
                color: #999;
              }
            }
            .price{
              flex:1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .num{
              flex:1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .btn-content{
              flex:1;
              display: flex;
              flex-direction:column;
              align-items: center;
              justify-content: center;
              p{
                font-size: 12px;
              }
              .btn{
                margin-top: 15px;
                border:1px solid #999;
              }
             
            }
          }
        }
      }
    }
  }
  

</style>
