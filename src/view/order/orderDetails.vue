<template>
    <div class="order-detail">
        <headerNav></headerNav>
        <!--  -->
        <div class="container">
            <div class="step">
                <div class="all step1">
                    <p class="no">1</p>
                    <p class="title">拍下商品</p>
                    <p class="date">2020.04.12 16:40:00</p>

                </div>
                <div class="all step2">
                    <p class="no">2</p>
                    <p class="title">付款</p>
                </div>
                <div class="all step3">
                    <p class="no">3</p>
                    <p class="title">卖家发货</p>
                </div>
                <div class="all step4">
                    <p class="no">4</p>
                    <p class="title">确认收货</p>
                </div>
            </div>
            <!--  -->
            <div class="order-info">
                <div class="left">
                    <p class="title">订单信息</p>
                    <p>
                        收货地址：{{orderInfos.userAddress}}
                    </p>
                    <p>
                        订单编号：{{orderInfos.orderNo}}                
                    </p>
                    <p>
                        收货人姓名：{{orderInfos.userName}}
                    </p>
                </div>
                <div class="right">
                    <!-- 未支付 -->
                    <div class="no-pay" v-show="orderInfos.orderStatus && orderInfos.orderStatus =='未支付'">
                        <p class="title">订单状态: 商品已拍下，等待买家付款</p>
                        <p class="date-cut">您还有<span>19小时8分29秒</span> ;来付款,超时订单自动关闭</p>
                        <p class="gopay">
                            您可以 
                            <span class="btn-pay" @click="goPay()">去支付</span>
                            <span v-show="orderInfos.orderStatus!='已取消'" class="btn-cancel" @click="cancelOrder()">取消订单</span>
                        </p>
                    </div>
                     <!-- 已取消 -->
                    <div class="cancel"  v-show="orderInfos.orderStatus && orderInfos.orderStatus =='已支付'">
                        <p class="title">订单状态: 已支付</p>
                        <p class="why">等待卖家发货</p>
                    </div>
                    <!-- 已取消 -->
                    <div class="cancel"  v-show="orderInfos.orderStatus && orderInfos.orderStatus =='已取消'">
                        <p class="title">订单状态: 关闭交易</p>
                        <p class="why">关闭类型：买家取消订单</p>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="product-info">
                <div class="goodsList">
                    <div class="good-item-title">
                        <p class="title-info">商品</p>
                        <p class="title-price">单价</p>
                        <p class="title-number">数量</p>
                        <!-- <p class="title-total">小计</p> -->
                        <p class="status">状态</p>
                    </div>
                    <div class="good-item">
                        <div class="goods-info">
                            <img class="good-img" :src="orderInfos.productPicture">
                            <p class="goods-title">{{orderInfos.productDescribe}}</p>
                        </div>
                        <p class="goods-price">￥{{orderInfos.unitCost}}</p>
                        <p class="goods-number">{{orderInfos.productNum}}</p>
                        <!-- <p class="goods-total-price">{{}}</p> -->
                        <p  class="goods-total-price">{{orderInfos.orderStatus}}</p>
                    </div>
                    <!-- <div class="total">
                        <span>合计(含运费):</span>
                        <span class="price">￥ {{}}</span>
                    </div> -->
                </div>
            </div>
            <!--  -->
            <div class="total">
                <div class="left">
                    商品情况：
                </div>
                <div class="right">
                    <p class="item">
                        <span class="title">商品总价：</span>
                        <span class="price">￥{{goodsTotalPrice}}</span>
                    </p>
                    <p class="item">
                        <span class="title">快递费：</span>
                        <span class="price">￥{{kaudiPrice}}</span>
                    </p>
                    <p class="item bold">
                        <span class="title">订单总价：</span>
                        <span class="price">￥{{pirce}}</span>
                    </p>
                    <p class="item bold">
                        <span class="title">需付款：</span>
                        <span class="price red">￥{{needPay}}</span>
                    </p>
                </div>
            </div>
        </div>
     
       <toast ref="toast"></toast>

        <!--  -->
    </div>
    
</template>

<script>
import * as cookie from '@/assets/js/cookie'
import headerNav  from '../../components/headerNav'
import toast from '../toast.vue'

export default {
    name:"orderDetails",
    data(){
        console.log(this.$route)
        let q = this.$route.query;
        console.log(q.orderId,q.orderNo);
        return{
            userId:'',
            orderId:q.orderId,
            orderNo:q.orderNo,
            orderInfos:[],
            goodsTotalPrice:0,
            kaudiPrice:"0.00",//快递费
            pirce:0, //订单总价
            needPay:0, //需付款

        }
    },
    components:{
        headerNav,
        toast, 
    },
    methods:{
        getOrderDetails(){
            this.axios.post(`${this.$store.state.baseURL}/manager/getOneOrder`,{
                orderNo:this.orderNo,
                orderId:this.orderId,
            }).then((res)=>{
                let data = res.data;
                console.log(data)
                if(data.code == "200" && data.data.length>0){
                    this.orderInfos = data.data[0];
                    this.goodsTotalPrice = this.orderInfos.unitCost*this.orderInfos.productNum;
                    this.needPay = this.goodsTotalPrice;
                    this.pirce = this.goodsTotalPrice;
                }
            })
        },
        goPay(){
            let query = {
                orderNo:this.orderNo,
                orderId:this.orderId,
            }
            this.$router.push({
                path:'/payIndex',
                name:'payIndex',
                query:query
            })
        },
        cancelOrder(){
            let that = this;
            this.axios.post(`${this.$store.state.baseURL}/manager/changeOrder`,{
                orderId:this.orderId,
                orderStatus:"已取消",
                hasSend:0,
            }).then((res)=>{
                let data = res.data;
                console.log(data)
                if(data.code == "200" && data.data==1){
                    // this.orderInfos = data.data[0];
                    //修改成功重新请求订单详情
                    that.$refs.toast.open({
                        hasIcon:false,
                        message:"订单取消成功！"
                    })
                    setTimeout(function(){
                        that.getOrderDetails();
                    },2000)
                }else{
                    that.$refs.toast.open({
                        hasIcon:true,
                        message:"订单取消失败，请稍后再试！"
                    })
                }
            })
        }
    },
    mounted(){

        let q = this.$route.query;
        this.orderId = q.orderId;
        this.orderNo = q.orderNo;
        this.getOrderDetails();
    },
    created(){
        this.userId = cookie.getCookie('userID')||'';
    }
    
}
</script>

<style lang="less" scoped>
.order-detail{
    .container{
        padding-top: 40px;
    }
    .step{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        .all{
            // flex: 1;
            position: relative;
            width: 210px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            font-size: 16px;
            background: url("http://img.alicdn.com/tps/i4/T1ze0ZXA0aXXcVlxZa-734-340.png") no-repeat;
            background-position:10px 10px ;
            .no{
                font-size: 16px;
                font-weight: bold;
                color: #fff;
                position: absolute;
                left: 49%;
            }
            .title{
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                position: absolute;
                top: -35px;
                left: 40%;
            }
            .date{
                position: absolute;
                text-align: center;
                bottom: -30px;
                left: 27%;
                font-size: 12px;
                color: #999;

            }
        }
        .step1{
            background-position: -260px -34px;
        }
        .step2{
            background-position: -260px -102px;
        }
        .step3{
            background-position: -260px -102px;
        }
        .step4{
            background-position: -260px -136px;
        }
    }

    .order-info{
        display: flex;
        border: 1px solid #ccc;
        margin: 20px 0;
        .left{
            width: 400px;
            background: #fbfbfb;
            border-right:1px solid #ccc;
            padding-bottom: 10px;
            .title{
                margin-bottom:10px;
                padding:5px 20px;
                color: #333;
                font-size: 14px;
                font-weight: bold;
                background: #F3F3F3;
                border-bottom: 1px solid #ccc;
            }
            p{
                padding:10px 20px;
            }

        }
        .right{
            flex: 1;
            padding:20px;
            padding-left: 60px;
            // text-align: center;
            .title{
                padding:15px;
                font-size: 16px;
                color: #333;
                font-weight: bold;
            }
            .no-pay{
                .date-cut{
                    font-size: 14px;
                    color: #333;
                    padding: 15px;
                    span{
                        color: #C60500;
                    }
                }
                .gopay{
                    font-size: 14px;
                    color: #333;
                    padding: 15px;
                    .btn-pay,.btn-cancel{
                        padding: 5px 10px;
                        text-align: center;
                        border: 1px solid #eee;
                        background: #ccc;
                        cursor: pointer;
                    }

                }
            }
            .cancel{
                .why{
                    font-size: 14px;
                    color: #333;
                    padding: 15px;
                }
            }
        }
      
    }
    .product-info{
         .goodsList{
            color: #333;
            .good-item-title{
                border-bottom: 1px solid #eee;
                display: flex;
                p{
                    flex: 1;
                    font-size: 16px;
                    font-weight: bold;
                }
                .title-info{
                    flex: 1.5;
                }
            }
            .good-item{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 0;
                background: rgba(159,216,239,0.06);
                border-bottom: 1px solid #eee;
                .goods-info,.goods-price,.goods-number,.goods-total-price{
                    flex: 1;
                }
                .goods-info{
                    flex:1.5;
                    width: 35%;
                    display: flex;
                    align-items: center;
                    img{
                        width: 70px;
                        height: 70px;
                        margin-right: 15px;
                    }
                }
            }
            .total{
                text-align: right;
                font-size: 16px;
                padding: 10px 0;
                .price{
                    color: red;
                    font-weight: bold;
                }
                border-bottom: 1px solid #eee;
            }
        }
    }
    .total{
        margin: 20px 0;
        padding: 20px;
        width: 100%;
        background: #f3f3f3;
        display: flex;
        .left,.right{
            flex:1;
        }
        .right{
            .item{
                text-align: right;
                margin-bottom: 8px;
                span{
                    display: inline-block;
                }
                .title{
                    width: 200px;
                    font-size: 14px;
                    padding-right: 20px;
                }
                .price{
                    width: 80px;
                    padding-right: 20px;
                }
            }   
            .bold{
                padding-bottom: 10px;
                .title{
                    font-size: 18px;
                    font-weight: bold;
                }
                .price{
                    font-size: 18px;
                    font-weight: bold;
                }
                .red{
                    color: #DD2727;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
            
        }
    }
}
</style>