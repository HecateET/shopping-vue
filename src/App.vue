<template>
  <div id="app">
    <!-- 路由占位符 -->   
    <router-view/>
  </div>
</template>

<script>
import * as cookie from './assets/js/cookie'
export default {
  name: 'App',
  data(){
    return{
      userId:'',
      userName:'',
      userHeadPic:'',
    }
  },
  created(){
    this.userId = cookie.getCookie('userID')||'';
    this.userName = cookie.getCookie('userName')||'';
    this.userHeadPic = cookie.getCookie('headPic') || '';
    console.log("APP:==",this.userId,this.userName,this.userHeadPic);
  }
}
</script>

<style>

</style>
