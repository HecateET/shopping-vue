<template>
  <nav class="navbar navbar-default" id="myHeader">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#" style="font-weight: bold">在线购物系统</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-left">
          <!--exact可以避免根路由使用始终激活的样式-->
          <router-link tag="li" role="presentation" to="/index" exact><a class="text-color">首页</a></router-link>
          <router-link tag="li" role="presentation" to="/goodsType"><a class="text-color">商品分类</a></router-link>
          <!-- <router-link tag="li" role="presentation" to="/aboutUs"><a class="text-color">关于我们</a></router-link> -->
          <!--<router-link tag="li" role="presentation" to="/stoneAssessment"><a class="text-color">奇石估价</a></router-link>-->

        </ul>

        <ul class="nav navbar-nav navbar-right" v-if="!isLogin">
          <router-link tag="li" role="presentation" to="/login"><a class="text-color">登录</a></router-link>
          <router-link tag="li" role="presentation" to="/register"><a class="text-color">注册</a></router-link>
        </ul>

        <ul class="nav navbar-nav navbar-right" v-if="isLogin">
          <li class="dropdown">
            <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;Hecate <span class="caret"></span></a>-->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <img class="headpic" :src="userHeadPic" >&nbsp;&nbsp;&nbsp;{{userName}} <span class="caret"></span>
              </a>
            <ul class="dropdown-menu">
              <!--<li><a class="text-color" :href="'/user/' + userId + '/aboutme'">个人中心</a></li>-->
              <router-link tag="li" role="presentation" to="/myCenter/myInfo"><a class="text-color">个人中心</a></router-link>
              <router-link tag="li" role="presentation" to="/myShoppingCart"><a class="text-color">我的购物车</a></router-link>
              <router-link tag="li" role="presentation" to="/myCenter/myOrder"><a class="text-color">我的订单</a></router-link>
              <li><a class="text-color" @click="exitLogin()"  href="/">退出登录</a></li>
            </ul>
          </li>
          <router-link tag="li" role="presentation" to="/settings"><a class="text-color"><span class="glyphicon glyphicon-cog"></span>  设置</a></router-link>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
    import * as cookie from '../assets/js/cookie.js'
    export default {
      name: "Header",
      data(){
        return{
          isLogin:false,
          userId:'',
          userName:'',
          userHeadPic:'',
        }
      },
      methods:{
        //退出登录
        exitLogin(){
          let domainStr = cookie.getRootDomain();
          cookie.$cookie("userID","",{doamin:domainStr,path:'/',expires:15,unEncoded:false})
          cookie.$cookie("userName","",{doamin:domainStr,path:'/',expires:15,unEncoded:false})
          cookie.$cookie("headPic","",{doamin:domainStr,path:'/',expires:15,unEncoded:false})
          this.userId = "";
          this.userName = "";
          this.userHeadPic = "";   
          this.$router.push({
              path:'/index',
              name:'shoppingIndex1',
          })  
        }
      },
      created(){
        
        this.userId = cookie.getCookie('userID')||'';
        this.userName = cookie.getCookie('userName')||'用户XX';
        this.userHeadPic = cookie.getCookie('headPic') || require('../assets/images/headpic.png');
        console.log("header:",this.userId);
        console.log(this.userName);
        console.log(this.userHeadPic);
        if(this.userId){
          this.isLogin = true;
        }
      }
    }
</script>

<style scoped>
  #myHeader{

  }
  .navbar{
    margin: 0;
  }
  .navbar, .dropdown-menu {
    /*background-color: #BDD1C5;*/
    background-color: rgb(35, 42, 52);
    color: #fff;
  }
  .navbar-default .navbar-brand {
    color: #d3d3d3;
  }
  .navbar-default .navbar-nav>li>a {
    color: #d3d3d3;
  }
  li .text-color, .dropdown .dropdown-toggle {
    color: #d3d3d3;
    font-size: 16px;
  }

  li {
    cursor: pointer;
  }
  .headpic{
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  .router-link-exact-active{
    /*background-color: #fff;*/
    border: 1px solid #fff;
    border-radius: 12px;
    color: #fff;
    font-size: 25px;
    font-weight: bold;
  }
  .active{
    /*background-color: #fff;*/
    color: #fff;
    font-size: 25px;
    font-weight: bolder;
  }
</style>
