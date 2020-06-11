r<template>
    <div class="confirmOrder">
        <headerNav></headerNav>
        <div class="container">
            <p class="choose-title">请选择收货地址：</p>
            <div class="addressList row">
                <div v-for="(item,index) in addressList" :key="index">
                    <div class="address-item col-sm-2 col-md-2" @click="selectedAddress(item,index)" :class="item.isSelected ? 'select-item':'un-select'">
                        <p class="address-name">{{item.userName}}</p>
                        <p class="address-des">{{item.userAddress}}</p>
                        <p class="address-tel">{{item.userPhone}}</p>
                        <span v-show="item.isDefualt == 1" class="default">默认地址</span>
                    </div>
                </div>
            </div>
            <div class="manager-address">
                <!-- <span class="show-all">显示全部地址</span> -->
                <span class="manager">管理地址</span>
            </div>
            <div class="add-address">
                <span @click="openDialog()">添加地址</span>
            </div>
         
            <hr>
            <p class="goods-title">确认订单信息：</p>
            <div class="goodsList">
                <div class="good-item-title">
                    <p class="title-info">宝贝信息</p>
                    <p class="title-price">单价</p>
                    <p class="title-number">数量</p>
                    <p class="title-total">小计</p>
                </div>
                <div class="good-item">
                    <div class="goods-info">
                        <img :src="productInfo.productPicture">
                        <p class="goods-title">{{productInfo.productName}}</p>
                    </div>
                    <p class="goods-price">￥{{productInfo.unitCost}}</p>
                    <p class="goods-number">{{goodsNumber}}</p>
                    <p class="goods-total-price">{{goodsNumber*productInfo.unitCost}}</p>
                    <!-- <p>{{productInfo}}</p> -->
                </div>
                <div class="total">
                    <span>合计(含运费):</span>
                    <span class="price">￥ {{totalPrice}}</span>
                </div>
            </div>
            <hr>
            <div class="bottom">
                <div class="total-info">
                    <div class="info">
                        <p class="need-pay">
                            实付款： 
                            <span class="unit">￥</span>
                            <span class="price">{{totalPrice}}</span>
                        </p>
                        <p class="address">
                            <span>寄送至：</span>
                            {{selectedAddressInfo.userAddress}}
                        </p>
                        <p class="user">
                            <span>收货人：</span>
                            {{selectedAddressInfo.userName}}  {{selectedAddressInfo.userPhone}}
                        </p>
                    </div>
                    <div class="submit-btn">
                        <span @click="submit()">提交订单</span>
                    </div>
                </div>
               
            </div>
        </div>
        <!-- 新增地址弹框 -->
        <div class="add-address-dialog" v-show="isShowAddDialog">
            <div class="add-content">
                <p class="dialog-title">创建地址</p>
                <form class="form-horizontal">
                     <div class="row form-group">
                        <label for="stone-title" class="col-sm-2 control-label">详细地址：</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" form="addGoodsImage" v-model="address" id="stone-title" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息">
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="stone-title" class="col-sm-2 control-label">收货人姓名：</label>
                        <div class="col-sm-4">
                        <input type="text" maxlength="26" class="form-control" form="addGoodsImage" v-model="addressName" id="stone-title" placeholder="长度不得超过26个字符">
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="stone-title" class="col-sm-2 control-label">手机号码：</label>
                        <div class="col-sm-4">
                        <input type="tel" maxlength="11" class="form-control" form="addGoodsImage" v-model="addressTel" id="stone-title" placeholder="请输入手机号吗">
                        </div>
                    </div>
                    
                </form>
                <div class="btn-content">
                    <div class="col-sm-7"></div>
                    <button @click="closeDialog()" class="btn btn-danger col-sm-2">取消</button>
                    <button @click="addAddress()" class="btn btn-info col-sm-2">保存</button>
                    
                </div>
            </div>
        </div>
        <toast ref="toast"></toast>
    </div>
</template>

<script>
import * as cookie from '@/assets/js/cookie'
import headerNav  from '../../components/headerNav'
import toast from '../toast.vue'
export default {
    name: "confirmOrder",
    components:{
        headerNav,
        toast, 
    },
    data(){
        let q = this.$route.query;
        console.log(this.$route.query);
        let productInfoAll = JSON.parse(decodeURI(q.productInfo)); //对商品信息解码
        let productInfo = {}
        if(q.from == "goodDetails"){
            productInfo = productInfoAll;
        }else{
            productInfo = productInfoAll[0];
        }
        return{
            userId:'',
            addressList:[],
            productId:productInfo.productId,
            goodsNumber:q.goodsNumber,
            productInfo:productInfo,
            totalPrice:0,
            productList:[],
            //用户选中的收货地址
            selectedAddressInfo:{},
            //新增的收获地址信息
            addressName:"",
            addressTel:"",
            address:"",
            isShowAddDialog:false,
        }
    },
    methods:{
        //获取用户收货地址
        getUserAddressList(){
            this.axios.post(`${this.$store.state.baseURL}/users/getAddressList`,{
                userId:this.userId,
            }).then((res) =>{
              console.log(res);
              let data = res.data
              if(data.code == "200" && data.data && data.data.length>0){
                this.addressList = data.data;
                this.addressList.forEach(item=>{
                    item.isSelected = false;
                    if(item.isDefualt == 1){
                        item.isSelected = true;
                        this.selectedAddressInfo = item;
                    }
                })
              } //查询失败则按默认值显示
            })
        },
        //选择用户收货地址
        selectedAddress(adInfo,index){
            this.selectedAddressInfo = adInfo;
            let selectInfo = this.addressList[index];
            let addressList = this.addressList;
            for(let i = 0; i<this.addressList.length;i++){
                this.addressList[i].isSelected = false;
            }
            this.addressList[index].isSelected = true; 
            
        },
        //创建单
        submit(){
            console.log(1111111)
            let that = this;
            let orderNo = this.randomNumber();
            if(!orderNo){
                orderNo = this.randomNumber();
            }
            this.axios.post(`${this.$store.state.baseURL}/order/createOrder`,{
                orderNo:orderNo,
                userId:this.userId,
                productId:this.productId,
                productName:this.productInfo.productName,
                productNum:this.goodsNumber,
                orderStatus:"未支付",
                addressId:this.selectedAddressInfo.addressId,
            }).then((res)=>{
                let data = res.data
                console.log(res);
                console.log(data);
                if(data.code == "200" && data.data){
                    that.$refs.toast.open({
                        hasIcon:false,
                        message:"创建订单单成功",
                    })
                    let orderId = data.data[0].orderId;
                    console.log(data.data);
                    //go 支付
                    setTimeout(function(){
                        let params = {
                            orderNo:orderNo,
                            orderId:orderId,
                        }
                        that.$router.push({
                            path:"/orderDetails",
                            name:"orderDetails",
                            params:params,
                            query:params,
                        })
                    },3000)
                   
                }else{
                    that.$refs.toast.open({
                        hasIcon:false,
                        message:"创建订单失败，请稍后再试",
                    })
                }
            })
        },
        //添加收获地址
        addAddress(){
            let  that = this;
            if(this.addressName==""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入收获人姓名",
                })
                return;   
            }else if(this.addressTel==""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入电话号码",
                })
                return;   
            }else if(this.address == ""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入收货地址",
                })
                return;   
            }else{
                this.axios.post(`${this.$store.state.baseURL}/users/addUserAddress`,{
                    userId:this.userId,
                    userName:this.addressName,
                    userPhone:this.addressTel,
                    userAddress:this.address,
                }).then((res) =>{
                    console.log(res);
                    let data = res.data;
                    if(data.code == "200"){
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"新增收获地址成功",
                        })
                        that.closeDialog();
                        //添加成功后重新请求收获地址
                        that.getUserAddressList();
                        
                    }else{
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"新增地址失败，请稍后再试",
                        })
                    }
                })
            }
        },
        //打开新增地址的弹框
        openDialog(){
            this.isShowAddDialog = true;
        },
        //关闭新增地址的弹框
        closeDialog(){
            this.isShowAddDialog = false;
            this.addressName="";
            this.addressTel=""
            this.address=""
        },
        //点击管理地址
        gotoManagerAddress(){
            this.$router.push({

            })
        },
        randomNumber() {
            const now = new Date()
            let month = now.getMonth() + 1
            let day = now.getDate()
            let hour = now.getHours()
            let minutes = now.getMinutes()
            let seconds = now.getSeconds()
            month = this.setTimeDateFmt(month)
            hour = this.setTimeDateFmt(hour)
            minutes = this.setTimeDateFmt(minutes)
            seconds = this.setTimeDateFmt(seconds)
            return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 23 + 100)).toString()
        },
        setTimeDateFmt(data){
            return data<10? `0${data}`:data;
        }
    },
    created(){
        this.userId = cookie.getCookie('userID')||'';
    },
    mounted(){
        if(this.userId==""){
            this.$refs.toast.open({
                hasIcon:false,
                message:"请登录，正在跳转登陆页！",
            })
            setTimeout(()=>{
                this.$router.push({
                    path:'/login',
                    name:'userLogin',
                })
            },3000)
            return;
        }
        this.getUserAddressList();
        this.totalPrice = this.goodsNumber*this.productInfo.unitCost
        console.log(this.$route)
        console.log(this.goodsNumber,this.productInfo,this.productId);
    },
}
</script>

<style lang="less" scoped>
.confirmOrder{
    .choose-title{
        font-size: 18px;
        font-weight: bold;
        color:#333;
        padding-bottom: 15px;
    }
    .manager-address{
        position: relative;
        height: 30px;
        .show-all{
            position: absolute;
            left: 0;
            color: #333;
            font-size: 14px;
            text-align: left;
        }
        .manager{
            position: absolute;
            left: 0;
            color: #333;
            font-weight: bold;
            font-size: 14px;
            text-align: right;
            cursor: pointer;
        }
    }
    .addressList{
        .address-item{
            position: relative;
            padding: 10px;
            // width: 250px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-left: 15px;
            margin-bottom: 15px;
            .default{
                position: absolute;
                padding: 2px 5px;
                right: 0;
                top: 0;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background: rgba(0, 0, 0, 0.2);
            }
        }
        // .address-item:hover{
        //     border: 3px solid #ff000033;
        //     background: #ff000012;
        // }
        .select-item{
            border: 3px solid #ff000033;
            background: #ff000012;
        }
        .un-select{
            border: 1px solid #ccc;
            background: #fff;
        }
        
    }
    .add-address{
        text-align: right;
        span{
            font-size: 16px;
            color: red;
            font-weight: bold;
            cursor: pointer;
        }
        padding-bottom: 20px;
    }
    .goods-title{
        margin-left: 10px;
        padding: 15px 0;
        font-size: 16px;
        color: #333;
    }
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
                width: 30%;
                display: flex;
                align-items: center;
                img{
                    width: 50px;
                    height: 50px;
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
    .bottom{
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;
        text-align: right;
        position: relative;
        margin-top: 20px;
        .total-info{
            position: absolute;
            right: 0;
            .info{
                width: 400px;
                padding: 10px;
                border: 1px solid rgb(255, 0, 54);
                font-size: 12px;
                .need-pay{
                    font-weight: 700;
                    color: #333;
                    padding-bottom: 10px;
                    padding-right: 10px;
                    .unit{
                        color: #999;
                        font-size: 26px;
                    }
                    .price{
                        color: rgb(255, 0, 54);
                        font-size: 26px;
                        font-weight: 700;
                    }
                }
                .address,.user{
                    padding-bottom: 10px;
                    padding-right: 10px;
                    span{
                        font-size: 12px;
                        font-weight: 700;
                        color: #333;
                    }
                }
            }
        }
        .submit-btn{
            span{
                display: inline-block;
                width: 180px;
                height: 39px;
                line-height: 39px;
                font-size: 14px;
                font-weight: 700;
                background: rgb(255, 0, 54);
                color: #fff;
                cursor: pointer;
                text-align: center;
               
            }
           
        }
    }
    .add-address-dialog{
        position: fixed;
        background: rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .add-content{
            padding:20px;
            width: 800px;
            background: #fff;
            border-radius: 10px;
            .dialog-title{
                font-size: 16px;
                color: #333;
                font-weight: 700;
                padding-bottom: 15px;
            }
            .btn-content{
                .btn{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>