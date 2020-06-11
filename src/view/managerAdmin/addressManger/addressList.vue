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
      
      <div class="stone-table table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th class="table-head">#</th>
            <th class="table-head">用户名称</th>
            <th class="table-head">手机号码</th>
            <th class="table-head">注册时间</th>
            <th class="table-head">性别</th>
            <th class="table-head">头像</th>
            <th class="table-head">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr style="vertical-align: center" v-for="(item,index) in stoneList" :key="index">
            <th scope="row">{{index+1}}</th>
            <td class="table-txt">{{item.stoneTitle}}</td>
            <td class="table-txt">{{item.stoneType}}</td>
            <td class="table-txt">{{item.publishTime}}</td>
            <td class="table-txt">{{item.author}}</td>
            <td class="table-txt"><img :src="item.imageUrl" style="width: 40px; height: 30px;"></td>
            <td class="table-txt">
              <button class="btn btn-info">修改</button>
              <button class="btn btn-success">预览</button>
              <button class="btn btn-danger">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--分页-->
      <nav aria-label="...">
        <ul class="pagination">
          <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
          <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
        </ul>
      </nav>

    </section>
</template>

<script>
    export default {
      name: "stoneIndex",
      data(){
        return{
          stoneList:[
            {
              stoneId:34,
              stoneTitle:"奇怪的石头哈哈",
              stoneType:"九龙壁",
              publishTime:"2019-01-31 19:30:31",
              author:"Andy",
              imageUrl:"",
            //   imageUrl:require("../../assets/images/stoneIndex/stone1.jpg"),
            },
            {
              stoneId:34,
              stoneTitle:"歲月的摧殘",
              stoneType:"其他石种",
              publishTime:"2019-01-03 19:30:31",
              imageUrl:"",
            //   imageUrl:require("../../assets/images/stoneIndex/stone2.jpg"),
              author:"Hecate",
            },
            {
              stoneId:34,
              stoneTitle:"大吉大利",
              stoneType:"寿山石",
              publishTime:"2019-01-03 19:30:31",
               imageUrl:"",
            //   imageUrl:require("../../assets/images/stoneIndex/stone3.png"),
              author:"小可爱",
            },
            {
              stoneId:34,
              stoneTitle:"飞黄腾达",
              stoneType:"九龙壁",
              publishTime:"2019-01-03 19:30:31",
               imageUrl:"",
            //   imageUrl:require("../../assets/images/stoneIndex/stone4.png"),
              author:"Hecate",
            },
            {
              stoneId:34,
              stoneTitle:"奇石的渊源",
              stoneType:"九龙壁",
              publishTime:"2019-01-03 19:30:31",
               imageUrl:"",
            //   imageUrl:require("../../assets/images/stoneIndex/stone2.jpg"),
              author:"Hecate",
            },
          ],
        }
      },

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
