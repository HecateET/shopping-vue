<template>
    <section class="my-center">
      <headerNav></headerNav>
      <div class="container">
        <div class="center-banner">
          <div class="userinfo">
            <div class="user-headpic">
              <!-- <img src="../../assets/images/myCenter/headpic.jpg"> -->
              <img :src="userInfo.userHeadPic">
            </div>
            <div class="user-name">{{userInfo.loginName}}</div>
            <div class="user-intro"></div>
            <div class="user-list">
              <div class="user-item" @click="routerUrl('/myCenter/myOrder')">
                <p class="user-item-num">{{orderNum}}</p>
                <p class="user-item-type">我的订单</p>
              </div>
              <div class="user-item" @click="routerUrl('/myCenter/myOrder')">
                <p class="user-item-num">{{hasSend}}</p>
                <p class="user-item-type">已发货</p>
              </div>
              <div class="user-item" @click="routerUrl('/myCenter/myOrder')">
                <p class="user-item-num">{{hasReceive}}</p>
                <p class="user-item-type">已收货</p>
              </div>
            </div>
          </div>
          <div class="change-bgm">更换背景图</div>
        </div>
        <div class="center-content">
          <!--个人中心菜单-->
          <div class="center-aside">
            <ul class="aside-menu">
              <!--<li class="aside-item">-->
              <a class="text-color">
                <router-link tag="li" class="aside-item one-menu-child" active-class="active" role="presentation" to="/myCenter/myInfo">
                  个人信息
                </router-link>
              </a>

              <!--</li>-->
              <!--<li class="aside-item">-->
              <!-- <a class="text-color">
                <router-link tag="li" class="aside-item one-menu-child" active-class="active" role="presentation" to="/myCenter/myShoppingCart">
                  购物车
                </router-link>
              </a> -->
              <!--</li>-->
              <!--<li class="aside-item">-->
              <a class="text-color">
                <router-link tag="li" class="aside-item one-menu-child" active-class="active" role="presentation" to="/myCenter/myOrder">
                  我的订单
                </router-link>
              </a>

              <!--</li>-->
              <!--<li class="aside-item">-->
              <a class="text-color">
                <router-link tag="li" class="aside-item one-menu-child" active-class="active" role="presentation" to="/myCenter/myAddress">
                  我的地址
                </router-link>
              </a>
              <!-- <a class="text-color">
                <router-link tag="li" class="aside-item one-menu-child" active-class="active" role="presentation" to="/myCenter/changePassword">
                  修改密码
                </router-link>
              </a> -->
            </ul>
          </div>
          <div class="my-center-content">
            <router-view/>
          </div>
        </div>
      </div>
      <toast ref="toast"></toast>
    </section>
</template>

<script>
import * as cookie from '@/assets/js/cookie'
import headerNav from '../../components/headerNav'
import toast from '../toast.vue'
    export default {
      name: "myCenterIndex",
      components:{
        headerNav,
        toast,
      },
      data(){
        return{
          Height:$(window).height(),
          Width:$(window).width(),
          userInfo:{},
          userHeadPic:"",
          userId:'',
          orderList:[],
          orderNum:0,
          hasSend:0,
          hasReceive:0,
        }
      },
      created(){
          this.userId = cookie.getCookie('userID')||'';
      },  
      methods:{
      //  路由跳转
        routerUrl(url){
          this.$router.push({ path:url});
        },
        getImageUrl(oUrl){
          return `${this.$store.state.baseURL}${oUrl}`;
        },
        //获取用户信息
        getUserInfo(){
          this.axios.post(`${this.$store.state.baseURL}/users/getUserInfo`,{
              userId:this.userId,
          }).then((res)=>{
              let data = res.data;
              console.log(data)
              if(data.code == "200" && data.data){
                  this.userInfo = data.data;
              }
          })
        },
        //获取用户订单列表
        getUserOrderList(){
          this.axios.post(`${this.$store.state.baseURL}/users/getMyOrders`,{
            userId:this.userId,
          }).then((res)=>{
            let data = res.data
            console.log(data)
            if(data.code == "200"){
              this.orderList = data.data;
              console.log("orderList:",this.orderList)
              this.orderNum = this.orderList.length;
              let sendNum = 0,receiveNum = 0;
              this.orderList.forEach(item=>{
                if(item.orderStatus =='已收货'){
                  receiveNum++;
                }
                if(item.orderStatus == '已发货'){
                  sendNum++;
                }
              })
              this.hasReceive = receiveNum;
              this.hasSend = sendNum;
            }
          })
        }
      },
      
      mounted() {
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
        this.getUserInfo();
        this.getUserOrderList();
      },
    }
</script>

<style scoped>
  *{
    font-family: "Impact,Arial,Microsoft YaHei";
    /*margin: 0;*/
    /*padding: 0;*/
  }
  .my-center{
    width: 100%;
    margin-bottom: 50px;
    background-color: #f5f6f7;
    
  }
  .container{
    /*background-color: #fff;*/
  }
  /*个人中心bannerr部分*/
  .center-banner{
    position: relative;
    height: 300px;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    margin-bottom: 15px;
    /* background:url("../../assets/images/myCenter/center1.jpeg") palegreen center no-repeat ; */
    background-size: cover;
  }
  .userinfo{
    width: 30%;
    /*height: 80%;*/
    background-color: rgba(255,250,205,0.5);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    text-align: center;
    border-radius: 10px;
  }
  .user-headpic{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: palegreen;
    margin: 20px;
  }
  .user-headpic img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .userinfo .user-name{
    font-family: "Impact,Arial,Microsoft YaHei";
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .userinfo .user-intro{
    color: #333;
    font-size: 16px;
    padding-bottom: 5px;
  }
  /*粉丝标题*/
  .userinfo .user-list{
    display: -webkit-box;
    width: 100%;
    /*height: 60px;*/
    padding: 10px 0;
    border-top: 1px solid #ccc;
    /*background-color: #edff7e;*/
  }
  .userinfo .user-list .user-item{
    font-family: "Impact,Arial,Microsoft YaHei";
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    border-right: 1px solid #ccc;
  }
  .userinfo .user-list .user-item:hover{
    cursor: pointer;
    background-color: rgba(0,0,0,0.3);
  }
  .user-item:hover .user-item-num,.user-item:hover .user-item-type{
    color: #fff;
  }

  .userinfo .user-list .user-item:last-child{
    border-right: none;
  }
  .user-item-num{
    font-family: "Impact,Arial,Microsoft YaHei";
    color: #333;
    font-size: 20px;
    font-weight: bold;
  }
  .user-item-type{
    color: #555;
    font-size: 16px;
  }

  .center-banner .change-bgm{
    position: absolute;
    top: 5%;
    right: 2%;
    color: #fff;
    font-size: 16px;
  }


  /*个人中心主体部分*/
  .center-content{
    display: -webkit-box;
  }
  .aside-menu{
    width: 100%;
  }
  .user-card{
    width: 100%;
    height: 150px;
    background-color: coral;
  }
  .aside-item{
    width: 100%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: skyblue;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: 18px;
  }
  .text-color{
    color: #fff;
    font-size: 18px;
    text-decoration: none;
  }
  .aside-item:hover{
    background-color: rgba(0,0,0,0.5);
    color: #fff;
  }
  .router-link-exact-active{
    /*background-color: #fff;*/
    border: 1px solid #fff;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
  }
  .active{
    background-color: rgba(0,0,0,0.5);
    color: #fff;
  }
  /*.aside-item .text-color:hover{*/
    /*color: #FF7F50;*/
  /*}*/
  .center-aside{
    width: 250px;
    border-right: 1px solid #ccc;
    /*background-color: yellow;*/
    margin-right: 15px;
  }
  .my-center-content{
    -webkit-box-flex: 1;
  }
</style>
