<template>
    <section class="stone-index">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 购物后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 用户管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 用户列表</span>
      </div>
      <!--<ol class="breadcrumb">-->
        <!--<li><a href="#">Home</a></li>-->
        <!--<li><a href="#">Library</a></li>-->
        <!--<li class="active">Data</li>-->
      <!--</ol>-->

      <div class="search-content input-group">
        <input class="form-control" type="text" placeholder="输入用户手机号或用户名">
        <span class="input-group-btn">
        <button class="btn btn-default" type="button">搜索</button>
      </span>
      </div>
      <!--奇石-->
      <div class="stone-table table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th class="table-head">#</th>
            <th class="table-head">订单号</th>
            <th class="table-head">订单状态</th>
            <th class="table-head">商品名称</th>
            <th class="table-head">商品单价(元)</th>
            <th class="table-head">商品数量(件)</th>
            <th class="table-head">订单总价(元)</th>
            <th class="table-head">顾客姓名</th>
            <th class="table-head">顾客电话</th>
            <th class="table-head">顾客地址</th>
            <th class="table-head">是否发货</th>
            <th class="table-head">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr style="vertical-align: center" v-for="(item,index) in orderLists" :key="index">
            <th scope="row">{{index+1}}</th>
            <td class="table-txt">{{item.orderNo}}</td>
            <td class="table-txt">{{item.orderStatus}}</td>
            <td class="table-txt">{{item.productName}}</td>
            <td class="table-txt">{{item.unitCost}}</td>
            <td class="table-txt">{{item.productNum}}</td>
            <td class="table-txt">{{item.unitCost*item.productNum}}</td>
            <td class="table-txt">{{item.userName}}</td>
            <td class="table-txt">{{item.userPhone}}</td>
            <td class="table-txt">{{item.userAddress}}</td>
            <td class="table-txt">{{item.hasSend == 1?'是':'否'}}</td>
            <!-- <td class="table-txt"><img :src="item.imageUrl" style="width: 40px; height: 30px;"></td> -->
            <td class="table-txt">
                
            <!-- <button  class="btn btn-success">查看详情</button> -->
              <button @click="changeStatus(item)" class="btn btn-info">修改状态</button>
              <!-- <button @click="deleteOrder()" class="btn btn-danger">删除</button> -->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="change-order-dialog" v-show="isShowDialog">
        <div class="change-content">
          <div class="dialog-title">修改订单状态</div>
            <form class="form-horizontal">
                <div class="row form-group">
                  <label for="stone-title" class="col-sm-2 control-label">订单号：</label>
                  <div class="col-sm-10">
                  <input type="text" class="form-control" form="addGoodsImage" v-model="orderNo" id="stone-title" placeholder="订单号">
                  </div>
              </div>
              <div class="row form-group">
                  <label for="stone-title" class="col-sm-2 control-label">订单状态：</label>
                  <div class="col-sm-4">
                     <select id="select" form="addGoodsImage"  v-model="orderStatus" class="form-control" >
                      <option value="未支付">未支付</option>
                      <option value="已支付">已支付</option>
                      <option value="已发货">已发货</option>
                      <option value="已取消">已取消</option>
                    </select>
                    <!-- <input type="text" maxlength="26" class="form-control" form="addGoodsImage" v-model="addressName" id="stone-title" placeholder="长度不得超过26个字符"> -->
                  </div>
              </div>
              
          </form>
        <div class="btn-content">
            <div class="col-sm-7"></div>
            <button @click="closeDialog()" class="btn btn-danger col-sm-2">取消</button>
            <button @click="saveChange()" class="btn btn-info col-sm-2">修改</button>
        </div>
        </div>
      </div>
      <toast ref='toast' />

    </section>
</template>

<script>
import toast from '../../toast.vue'
    export default {
        name: "stoneIndex",
        components:{
          toast,
        },
        data(){
            return{
                orderLists:[],
                isShowDialog:false,
                changeItem:{

                }
            }
        },
        methods:{
            //获取订单列表
            getOrderList(){
                this.axios.post(`${this.$store.state.baseURL}/manager/getAllOrdersList`)
                    .then((res)=>{
                        let data = res.data;
                        if(data.code == 200){
                            this.orderLists = data.data;
                        }else{
                            this.orderLists = [];
                            console.log('请稍后再试！')
                        }
                        console.log(data.data)
                    }).catch((err)=>{
                        console.log(err)
                    })
            },
            //修改订单状态
            changeStatus(item,index){
              this.isShowDialog = true;
              this.orderNo = item.orderNo;
              this.orderStatus = item.orderStatus;
              this.changeItem = item;
              this.hasSend = item.hasSend;
            },
            saveChange(){
              let that = this;
              this.axios.post(`${this.$store.state.baseURL}/manager/changeOrder`,{
                orderStatus:this.orderStatus,
                orderId:this.changeItem.orderId,
                hasSend:this.changeItem.hasSend,
              }).then((res)=>{
                  let data = res.data;
                  if(data.code == 200){
                      that.$refs.toast.open({
                          hasIcon:false,
                          message:data.message,
                      })
                      this.getOrderList();
                      this.closeDialog();
                  }else{
                      that.$refs.toast.open({
                          hasIcon:false,
                          message:"订单状态修改失败，请稍后再试！",
                      })
                  }
                  console.log(data.data)
              }).catch((err)=>{
                  console.log(err)
              })
            },
            closeDialog(){
              this.isShowDialog = false;
              this.orderNo = "";
              this.orderStatus = "";
              this.changeItem = {};
              this.hasSend = ""
            },
            deleteOrder(){
              this.axios.post(`${this.$store.state.baseURL}/manager`,{

              }).then()
            }
        },
        mounted(){
            this.getOrderList()
        },
        
    }
</script>

<style lang="less" scoped>
  .stone-index{
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
  }
  .change-order-dialog{
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .change-content{
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


  .stone-table{
    margin: 10px;
    text-align: center;
    background-color: #fff;
  }

  .stone-table>.table>table>tbody>tr>td{
    text-align: center;
    vertical-align: middle;
  }
  .stone-table .table-head{
    color: #333;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
  }
  .stone-table .table-txt{
    color: #333;
    font-size: 16px;
    text-align: center;
    vertical-align: middle;
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
  .search-content{
    width: 30%;
    margin-left: 68%;
    /*text-align: right;*/
  }
</style>
