<template>
    <section class="user-info">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 用户管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 用户资料</span>
      </div>

      <div class="search-content">
        <form class="form-horizontal">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="userPhone" class="stone-title col-sm-5 control-label">用户手机号码：</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="userPhone" v-model="searchTelKey" placeholder="输入用户手机号码">
              </div>
            </div>
            <div class="form-group col-md-5">
              <label for="userId" class="stone-title col-sm-5 control-label">用户名：</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" v-model="searchNameKey" id="userId" placeholder="输入用户名称">
              </div>
            </div>
            <div class="btn-content col-md-1">
              <button class="btn btn-info publish-btn" @click="searchKey()">搜索</button>
            </div>
          </div>
        </form>
        <hr>
      </div>
      <div class="result-content">
        <p class="result-title">您查询的用户信息为：</p>
        <hr>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="user-id" class="stone-title col-sm-3 control-label">用户ID：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control"  readonly="readonly" id="user-id"  v-model="userInfo.userId" placeholder="用户ID">
            </div>
          </div>
          <div class="form-group">
            <label for="nick-name" class="stone-title col-sm-3 control-label">昵称：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="nick-name" readonly="readonly" v-model="userInfo.userNickName" placeholder="昵称">
            </div>
          </div>
          <!-- <div class="form-group">
            <label for="motto" class="stone-title col-sm-3 control-label">个性签名：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="motto" v-model="userInfo.motto" readonly="readonly" placeholder="个性签名">
            </div>
          </div> -->
          <div class="form-group">
            <label class="stone-title col-sm-3 control-label">性别：</label>

            <div class="col-sm-8 radio">
              <label>
                <input type="radio" name="optionsRadios" id="sex-woman" value="option1" :checked="userInfo.userSex=='女'"> 女
              </label>
              <label>
                <input type="radio" name="optionsRadios" id="sex-man" value="option1" :checked="userInfo.userSex=='男'"> 男
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="phone" class="stone-title col-sm-3 control-label">手机号码：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="phone" readonly="readonly" v-model="userInfo.userTel" placeholder="请输入手机号">
            </div>
          </div>
          <div class="form-group">
            <label for="email" class="stone-title col-sm-3 control-label">注册时间：</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" readonly="readonly" id="email" v-model="userInfo.registerTime" placeholder="请输入邮箱号">
            </div>
          </div>
          <!-- <div class="form-group">
            <label class="stone-title col-sm-3 control-label">所在地：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly="readonly" v-model="userInfo.province" placeholder="所在省份">
            </div>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly="readonly" v-model="userInfo.city" placeholder="所在城市">
            </div>
          </div> -->
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
          userInfo:{
            userId:"",
            userNickName:"",
            userSex:"",
            userTel:"",
            registerTime:"",
          },
          searchTelKey:"",
          searchNameKey:"",
        }
      },
      components:{
        toast
      },
      mounted(){

      },
      methods:{
        searchKey(){
          let that = this;
          let sKey = '';
          if(this.searchTelKey!=""){
            sKey = this.searchTelKey
          }else if(this.searchNameKey!=""){
            sKey = this.searchNameKey
          }
          this.axios.post(`${this.$store.state.baseURL}/manager/searchUser`,{
            key:sKey
          }).then((res)=>{
              let data = res.data;
              console.log(data)
              console.log(that.$refs)
              if(data.code == 200){
                if(data.data.length == 0){
                  that.$refs.toast.open({
                      hasIcon: true,
                      message: "查无改用户，请输入其他关键字查询"
                  });
                }else{
                  this.userInfo = data.data[0];
                  if(this.userInfo){
                    let date = new Date(this.userInfo.registerTime);
                    this.userInfo.registerTime = formatTime(date);
                  }
                }
              }else{
                console.log(that.$refs)
                that.$refs.toast.open({
                    hasIcon: true,
                    message: "查询失败请稍后再试"
                });
                  console.log('请稍后再试！')
              }
          }).catch((err)=>{
              that.$refs.toast.open({
                    hasIcon: true,
                    message: "服务器错误，请稍后再试"
                });
              console.log(err)
          })
        }
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
