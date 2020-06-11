<template>
    <section class="my-info">
      <div class="base-info">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="nick-name" class="stone-title col-sm-3 control-label">昵称：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="nick-name" v-model="userInfo.userNickName" placeholder="昵称">
            </div>
          </div>
          <div class="form-group">
            <label class="stone-title col-sm-3 control-label">性别：</label>

            <div class="col-sm-8 radio">
              <label>
                <input type="radio" name="optionsRadios" id="sex-woman" value="option1" checked> 女
              </label>
              <label>
                <input type="radio" name="optionsRadios" id="sex-man" value="option1"> 男
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="email" class="stone-title col-sm-3 control-label">手机号：</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="email" disabled v-model="userInfo.userTel" placeholder="请输入手机号">
            </div>
          </div>
          <div class="form-group">
            <label for="old-password" class="stone-title col-sm-3 control-label">旧密码：</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" @blur="judgeOldPwd()"  id="old-password"  v-model="oldPwdInput" placeholder="请输入旧密码">
              <span v-show="isShowOldError" class="error-tips">{{errorTips1}}</span>
           
            </div>
          </div>
          <div class="form-group">
            <label for="new-password" class="stone-title col-sm-3 control-label">新密码：</label>
            <div class="col-sm-8">
              <input type="password" class="form-control"  @blur="judgeAgianPwd()" id="new-password" v-model="newPwdInput" placeholder="请输入新密码">
              <span v-show="isShowJudgeError" class="error-tips">{{errorTips2}}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="pwd" class="stone-title col-sm-3 control-label">再次确认：</label>
            <div class="col-sm-8">
              <input type="password" class="form-control"  @blur="judgeNewPwd()" :class="[isShowJudgeError?'has-error':'']" id="pwd" v-model="againPwdInput" placeholder="请再次输入确认新密码">
              <span v-show="isShowJudgeError" class="error-tips">{{errorTips3}}</span>
            </div>
          </div>

          <div class="btn-content">
            <button class="btn btn-info publish-btn">保存</button>
            <button class="btn btn-danger cancel-btn">取消</button>
          </div>
        </form>
      </div>
      <div class="my-picture">
        <p>头像设置</p>
        <img class="head-pic" :src="userInfo.userHeadPic">
        <div class="head-content">
          <p class="edit"><span class="glyphicon glyphicon-pencil"></span>设置</p>
        </div>
      </div>
      <toast ref='toast' />
    </section>
</template>

<script>
import toast from '../toast.vue'
    export default {
      name: "personInfo",
      components:{
        toast,
      },
      data(){
        return{
          userInfo:{
            nickName:"Hecate",
            email:"1060526453@qq.com",
            motto:"Good Study Day Day Up",
            headPic:require("../../assets/images/myCenter/headpic.jpg"),
            password:"",
            province:"福建省",
            city:"龙岩市",
          },
          userId:'',
          password:"",
          newPassword:"",

          isShowOldError:false,
          isShowJudgeError:false,
          oldPwdInput:"",
          newPwdInput:"",
          againPwdInput:"",
          errorTips1:"",
          errorTips2:"",
          errorTips3:"",
          errorTipsList:[
              "输入的密码不正确请重新输入",
              "两次输入的密码不一致",
              "新密码不能为空",
              "请输入确认密码",
              "密码不能为空",
          ]
        }
      },
      created(){
        this.userId = this.$parent.userId;
        if(this.userId==""){
            this.$refs.toast.open({
                hasIcon:false,
                message:"请登录后在添加购物车，正在跳转登陆页！",
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
      },
      watch:{
        password(newVal,oldVal){
          
        }
      },
      methods:{
        //校验用户输入的密码是否正确

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
        //保存修改
        setUserInfo(){
          let that = this;
          if(this.oldPwdInput == ""){
              this.errorTips1 = this.errorTipsList[4]
              this.isShowOldError = true;
              this.$refs.toast.open({
                  hasIcon:true,
                  message:this.errorTips1
              })
              return
          }else if(this.newPwdInput == ""){
              this.errorTips2 = this.errorTipsList[2]
              this.isShowNewError = true;
              this.$refs.toast.open({
                  hasIcon:true,
                  message:this.errorTips2
              })
              return
          }else if(this.againPwdInput == ""){
              this.errorTips3 = this.errorTipsList[3]
              this.isShowJudgeError = true;
              this.$refs.toast.open({
                  hasIcon:true,
                  message:this.errorTips3
              })
              return
          }
        },
        //校验输入的老密码是否正确
        judgeOldPwd(){
          console.log(this.oldPwdInput,this.managerInfo)
          if(this.oldPwdInput !=""){
              this.isShowOldError = false;
          }
          if(this.oldPwdInput != this.managerInfo.managerPwd){
            //   alert("旧密码输入错误");
            this.errorTips1 = this.errorTipsList[0];
            this.isShowOldError = true
          }else{
              this.isShowOldError = false;
          }
        },
        //校验输入的新密码是否正确
        judgeNewPwd(){
          if(this.againPwdInput !=""){
              this.isShowJudgeError = false;
          }
          if(this.newPwdInput != this.againPwdInput){
              this.errorTips2 = this.errorTipsList[1];
              this.errorTips3 = this.errorTipsList[1];
              this.isShowJudgeError = true;
              this.isShowNewError = true;
          }else{
              this.isShowJudgeError = false;
              this.isShowNewError = false;
          }
        },
        judgeAgianPwd(){
          if(this.newPwdInput !=""){
              this.isShowNewError =false
          }
          if(this.newPwdInput != this.againPwdInput){
              this.errorTips2 = this.errorTipsList[1];
              this.errorTips3 = this.errorTipsList[1];
              this.isShowJudgeError = true;
              this.isShowNewError = true;
          }else{
              this.isShowJudgeError = false;
              this.isShowNewError = false;
          }
        }

      }

    }
</script>

<style scoped>
  .has-error{
    border-color: #a94442;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  }

  .error-tips{
      color: #a94442;
      font-size: 12px;
  }
  .my-info{
    font-family: Arial;
    display: -webkit-box;
    font-size: 16px;
    background-color: #fff;
    padding: 20px 10px;
  }
  .base-info{
    -webkit-box-flex: 1;
  }
  .my-picture{
    position: relative;
    width: 200px;
    margin: 10px;
  }
  .my-picture p{
    font-size: 16px;
    color: #333;
    font-weight: bold;
    padding-bottom: 5px;
  }
  .my-picture .head-pic{
    width: 200px;
    height: 200px;
    border: 1px #ccc solid;
    border-radius: 5px;
  }
  .my-picture .head-content{
    position: absolute;
    top: 11%;
    width: 200px;
    height: 200px;
    /*background: indianred;*/
    /*opacity: 0.7;*/
  }
  .head-content .edit{
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 18px;
    color: #f6fff1;
    padding: 5px;
    background:rgba(0,0,0,0.3);
  }
  .head-content .edit span{
    padding: 0 8px;
    font-size: 16px;
    color: #f6fff1;
  }
  .btn-content{
    margin: 20px 10px;
  }
  .btn-content button{
    width: 100px;
    margin: 0 10px;
    font-size: 16px;
  }

</style>
