<template>
    <section class="stone-index">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 购物后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 我的管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 我的发布</span>
      </div>
      <!--<ol class="breadcrumb">-->
        <!--<li><a href="#">Home</a></li>-->
        <!--<li><a href="#">Library</a></li>-->
        <!--<li class="active">Data</li>-->
      <!--</ol>-->

      <!-- <div class="search-content input-group">
        <input class="form-control" type="text" placeholder="输入用户手机号或用户名">
        <span class="input-group-btn">
        <button class="btn btn-default" type="button">搜索</button>
      </span>
      </div> -->
      <div class="stone-table table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th class="table-head">#</th>
            <th class="table-head">商品Id</th>
            <th max-width="200" class="table-head">商品名称</th>
            <th class="table-head">商品价格（单位/元）</th>
            <th class="table-head">商品库存（单位/件）</th>
            <th class="table-head">商品描述</th>
            <th width="100" class="table-head">商品图片</th>
            <th width="100" class="table-head">商品类型</th>
            <th class="table-head">发布者(管理员)</th>
            <th width="210" class="table-head">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="goodList.length==0">
              <td colspan="7" class="not-data">暂无商品信息，请稍后再试</td>
             
          </tr>
          <tr style="vertical-align: center" v-else v-for="(item,index) in goodList" :key="item.userId">
            <th scope="row">{{index+1}}</th>
            <td class="table-txt">{{item.productId}}</td>
            <td class="table-txt">{{item.productName}}</td>
            <td class="table-txt">{{item.unitCost}}元</td>
            <td class="table-txt">{{item.productStock}}</td>
            <td class="tabel-txt">{{item.productDescribe}}</td>
            <td class="table-txt"><img :src="item.productPicture" style="width: 40px; height: 30px;"></td>
            <td class="table-txt">
                <span class="label label-info">{{item.productType}}</span>
            </td>
            <td class="table-txt">{{item.managerName}}</td>
            <td class="table-txt">
              <button @click="editGoods(item.productId)" class="btn btn-info" >修改</button>
              <button @click="getGoddsDetails(item.productId)" class="btn btn-success">查看</button>
              <button @click="deleteGoods(item.productId)" class="btn btn-danger">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--分页-->
      <!-- <nav v-show="goodList.length!=0" aria-label="...">
        <ul class="pagination">
          <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
          <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
        </ul>
      </nav> -->

    </section>
</template>

<script>
    export default {
      name: "stoneIndex",
      data(){
        return{
            goodList:[],
            managerId:1,
        }
      },
      methods:{
          getGoosList(){
              this.axios.post(`${this.$store.state.baseURL}/manager/myPublish`,{
                  managerId:this.managerId,
              })
                .then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.goodList = data.data;
                    }else{
                        this.goodList = [];
                        console.log('请稍后再试！')
                    }
                    console.log(data.data)
                }).catch((err)=>{
                    console.log(err)
                })
          },
          /**
           * 修改商品信息
           */
          editGoods(productId){
            
          },
          /**
           * 查看商品详情
           */
          getGoddsDetails(productId){
            let query = {
                productId:productId,
            }
            this.$router.push({
                path:"/goodDetails",
                name:"goodDetails",
                query:query,
            })
          },
          /**
           * 删除商品item
           */
          deleteGoods(productId){

          }
      },
      mounted(){
          this.getGoosList();
      }

    }
</script>

<style scoped>
  .stone-index{
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
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
  .stone-table .not-data{
      height: 200px;
      font-size: 28px;
      color: #888;
      line-height: 200px;
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
