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
            <th class="table-head">用户名称</th>
            <th class="table-head">手机号码</th>
            <th class="table-head">注册时间</th>
            <th class="table-head">性别</th>
            <th class="table-head">头像</th>
            <th class="table-head">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="userList.length==0">
              <td colspan="7" class="not-data">暂无用户信息，请稍后再试</td>
             
          </tr>
          <tr style="vertical-align: center" v-else v-for="(item,index) in userList" :key="item.userId">
            <th scope="row">{{index+1}}</th>
            <td class="table-txt">{{item.userNickName}}</td>
            <td class="table-txt">{{item.userTel}}</td>
            <td class="table-txt">{{item.registerTime}}</td>
            <td class="table-txt">{{item.userSex}}</td>
            <td class="table-txt"><img :src="item.userHeadPic" style="width: 40px; height: 30px;"></td>
            <td class="table-txt">
              <!-- <button class="btn btn-info" >修改</button> -->
              <button class="btn btn-danger">注销</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--分页-->
      <nav v-show="userList.length!=0" aria-label="...">
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

import {formatTime} from '../../../assets/js/methods.js'
    export default {
      name: "stoneIndex",
      data(){
        return{
            userList:[],
        }
      },
      methods:{
          getAllUser(){
              this.axios.post(`${this.$store.state.baseURL}/manager/getAllUsers`)
                .then((res)=>{
                    let data = res.data;
                    if(data.code == 200){
                        this.userList = data.data;
                        this.userList.forEach(item=>{
                            let date = new Date(item.registerTime)
                            item.registerTime = formatTime(date);
                        })
                    }else{
                        this.userList = [];
                        console.log('请稍后再试！')
                    }
                }).catch((err)=>{
                    console.log(err)
                })
          }
      },
      mounted(){
          this.getAllUser();
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
