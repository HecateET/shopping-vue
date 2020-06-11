<template>
    <section class="user-info">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 订单管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 订单查询</span>
      </div>

      <div class="search-content">
        <form class="form-horizontal">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="userPhone" class="stone-title col-sm-5 control-label">订单号：</label>
              <div class="col-sm-7">
                <input type="text" v-model="orderNoKey" class="form-control" id="userPhone"  placeholder="输入订单号">
              </div>
            </div>
            <div class="form-group col-md-5">
              <label for="userId" class="stone-title col-sm-5 control-label">订单ID</label>
              <div class="col-sm-7">
                <input type="text" v-model="orderIdKey" class="form-control" id="userId" placeholder="订单ID">
              </div>
            </div>
            <div class="btn-content col-md-1">
              <button @click="search()" class="btn btn-info publish-btn">搜索</button>
            </div>
          </div>
        </form>
        <hr>
      </div>
      <div class="result-title" v-show="result.length>1">
          <p class="result-title">您查询的结果大于一条，请手动切换查看详情!</p>
          <button style="margin-left:10px" v-for="(item,index) in result" :key="index" @click="changeTap(index)" class="btn btn-info publish-btn">{{index+1}}</button>
          <hr>
      </div>
     <!-- <div class="result-title" v-show="result.length==0">
          <p class="result-title">查无结果，请输入正确的订单号或订单ID进行查询！</p>
         <hr>
      </div> -->
      <div class="result-content">
        <p class="result-title">您查询的订单信息为：</p>
        <hr>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="user-id" class="stone-title col-sm-3 control-label">用户ID：</label>
            <div class="col-sm-2">
              <input type="text" class="form-control"  readonly="readonly" id="user-id"  v-model="orderInfo.customerId" placeholder="用户ID">
            </div>
            <label for="order-id" class="stone-title col-sm-1 control-label">订单Id：</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="order-id" readonly="readonly" v-model="orderInfo.orderId" placeholder="订单Id：">
            </div>
            <label for="product-id" class="stone-title col-sm-1 control-label">商品Id:</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="product-id" readonly="readonly" v-model="orderInfo.orderId" placeholder="商品Id:">
            </div>
          </div>
          <div class="form-group">
            <label for="motto" class="stone-title col-sm-3 control-label">订单号:</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" id="motto" v-model="orderInfo.orderNo" readonly="readonly" placeholder="订单号">
            </div>
          </div>
          <div class="form-group">
            <label class="stone-title col-sm-3 control-label">是否发货：</label>

            <div class="col-sm-8 radio">
              <label>
                <input type="radio" name="optionsRadios" id="isSend-Y" value="option1" :checked="orderInfo.hasSend==1"> 是
              </label>
              <label>
                <input type="radio" name="optionsRadios" id="isSend-N" value="option1" :checked="orderInfo.hasSend==0"> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="goods" class="stone-title col-sm-3 control-label">订单状态：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="goods" readonly="readonly" v-model="orderInfo.orderStatus" placeholder="订单状态">
            </div>
          </div>
          <div class="form-group">
            <label for="goods" class="stone-title col-sm-3 control-label">商品名称：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" id="goods" readonly="readonly" v-model="orderInfo.productName" placeholder="商品名称">
            </div>
          </div>
          <div class="form-group">
            <label for="goodsCost" class="stone-title col-sm-3 control-label">商品单价：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" readonly="readonly" id="goodsCost" v-model="orderInfo.unitCost" placeholder="商品单价">
            </div>
            <label for="goodsCost" class="stone-title col-sm-1 control-label">商品数量：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" readonly="readonly" id="goodsCost" v-model="orderInfo.productNum" placeholder="商品数量">
            </div>
          </div>
          <div class="form-group">
            <label for="goodsCost" class="stone-title col-sm-3 control-label">订单总价：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" readonly="readonly" id="goodsCost" v-model="orderInfo.totalPrice" placeholder="订单总价">
            </div>
          </div>
          <div class="form-group">
            <label for="addressName" class="stone-title col-sm-3 control-label">收货人：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" readonly="readonly" id="addressName" v-model="orderInfo.userName" placeholder="收获人">
            </div>
             <label for="addressTel" class="stone-title col-sm-1 control-label">联系电话：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" readonly="readonly" id="addressTel" v-model="orderInfo.userPhone" placeholder="联系电话">
            </div>
          </div>
          <div class="form-group">
            <label for="address" class="stone-title col-sm-3 control-label">收获地址：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" readonly="readonly" id="address" v-model="orderInfo.userAddress" placeholder="收获地址">
            </div>
          </div>
        </form>
      </div>
      
      <toast ref="toast"></toast>
    </section>
</template>

<script>
import {formatTime} from '../../../assets/js/methods.js'
import toast from '../../toast'
    export default {
      name: "userinfo",
      data(){
        return{
            result:[],
            orderInfo:{},
            orderNoKey:"",
            orderIdKey:"",
        }
      },
      components:{
          toast,
      },
      methods:{
          changeTap(index){
              this.orderInfo = this.result[index]
          },
          clearInfo(){
             this.orderInfo={
                "orderId": '',
                "productId": '',
                "customerId": '',
                "orderNo": '',
                orderDate: '',
                "productNum": '',
                "hasSend": 0,
                "orderStatus": "",
                "addressId": '',
                "userName": "",
                "userPhone": "",
                "userAddress": "",
                "productName": "",
                "productType": "",
                "productDescribe": "",
                "productPicture": "",
                "unitCost": ''
            }
          },
          search(){
            let that= this
            if(this.orderNoKey==""&& this.orderIdKey ==""){
                that.$refs.toast.open({
                    hasIcon: false,
                    message: "请至少输入一个订单号或订单ID！"
                });
                return;
            }else{
                this.axios.post(`${this.$store.state.baseURL}/manager/getOneOrder`,{
                    orderId:this.orderIdKey,
                    orderNo:this.orderNoKey,
                }).then((res)=>{
                    let data = res.data
                    console.log(data);
                    if(data.code=="200"){
                        if(data.data.length==0){
                            that.$refs.toast.open({
                                hasIcon:false,
                                message:"查无改订单"
                            })
                            this.clearInfo()
                        }else if(data.data.length == 1){
                            this.result = data.data;
                            this.orderInfo = data.data[0];
                            let date = new Date(this.orderInfo.orderDate)
                            this.orderInfo.orderDate = formatTime(date)
                            this.orderInfo.totalPrice = this.orderInfo.unitCost * this.orderInfo.productNum;
                        }else{
                            this.result = data.data;
                        }
                    }else if(data.code =="900"){
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:data.message
                        })
                    }
                })
            }
          }
      },
      created(){

      },
      mounted(){
          //数据结构初始化
          this.clearInfo()
      },
    }
</script>

<style scoped>
  .user-info{
    width: 100%;
    padding: 10px;
    font-size: 18px;
  }
  .tab-title{
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  .tab-title span{
    color: #333;
    font-size: 18px;
    /*padding: 0 3px;*/
  }
  .result-content{
    margin: 15px 10px;
  }
  .result-title{
    font-size: 18px;
    color: #333;
    font-weight: bold;
    padding: 10px;
  }
  .form-control{
    margin: 5px 0;
  }
</style>
