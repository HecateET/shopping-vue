<template>
    <section class="search-address">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 购物系统后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 我的管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 修改密码</span>
      </div>


    
      <div class="result-content">
        <div>我的信息：</div>
        <hr>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="manager-id" class="stone-title col-sm-3 control-label">管理员ID</label>
            <div class="col-sm-3">
              <input type="text" class="form-control"  readonly="readonly" id="manager-id"  v-model="managerId" placeholder="用户ID">
            </div>
          </div>
          <div class="form-group">
            <label for="nick-name" class="stone-title col-sm-3 control-label">管理员名称：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="nick-name" readonly="readonly" v-model="managerName" placeholder="昵称">
            </div>
          </div>
           <div class="form-group">
            <label for="manger-type" class="stone-title col-sm-3 control-label">管理员类型：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="manger-type" readonly="readonly" v-model="managerType" placeholder="类型">
            </div>
          </div>
          <hr>
          <div>更改密码：</div>
          <div class="form-group">
            <label for="oldPwd" class="stone-title col-sm-3 control-label">输入旧密码</label>
            <div class="col-sm-3">
              <input type="password" @blur="judgeOldPwd()" class="form-control" :class="[isShowOldError?'has-error':'']" id="oldPwd" v-model="oldPwdInput" placeholder="请输入旧密码">
              <span v-show="isShowOldError" class="error-tips">{{errorTips1}}</span>
            </div>
            
          </div>
          <div class="form-group">
            <label for="newPwd" class="stone-title col-sm-3 control-label">新密码：</label>
            <div class="col-sm-3">
              <input type="password" class="form-control" @blur="judgeAgianPwd()" :class="[isShowJudgeError?'has-error':'']" id="newPwd" v-model="newPwdInput" placeholder="请输入新密码">
              <span v-show="isShowJudgeError" class="error-tips">{{errorTips2}}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="pwd" class="stone-title col-sm-3 control-label">再次确认：</label>
            <div class="col-sm-3">
              <input type="password" @blur="judgeNewPwd()" class="form-control" :class="[isShowJudgeError?'has-error':'']" id="pwd" v-model="againPwdInput" placeholder="请再次输入确认新密码">
              <span v-show="isShowJudgeError" class="error-tips">{{errorTips3}}</span>
            </div>
          </div>
          <div class="btn-content form-group">
            <div class="col-sm-2"></div>
            <button @click="setPassword()" class="btn btn-info publish-btn col-sm-2">确认保存</button>
            <button style="margin-left:20px" class="btn btn-danger cancel-btn col-sm-2">取消</button>
          </div>
        </form>
      </div>
      <toast ref="toast"></toast>
    </section>
</template>

<script>
import toast from '../../toast'
    export default {
      data(){
        return{
          managerName:"",
          managerType:"",
          managerId:1,
          oldPwdInput:"",
          newPwdInput:"",
          againPwdInput:"",
          managerInfo:{},
          isShowOldError:false,
          isShowJudgeError:false,
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
      components:{
          toast
      },
      methods:{
          //获取管理员信息
          getMangerInfo(){
              let that = this;
              this.axios.post(`${this.$store.state.baseURL}/manager/getMangerInfo`,{
                  managerId:this.managerId,
              }).then((res)=>{
                  let data = res.data
                  if(data.code == "200" && data.data.length>0){
                      this.managerInfo = data.data[0]
                      this.managerName = this.managerInfo.managerName;
                      this.managerType = this.managerInfo.managerType;
                  }else{
                      that.$refs.toast.open({
                          hasIcon: true,
                          message:"查询失败请稍后再试"
                      })
                  }
              })
          },
          setPassword(){
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
              console.log(this.isShowJudgeError,this.isShowOldError,this.isShowNewError)
              if(!this.isShowJudgeError 
                && !this.isShowOldError 
                && !this.isShowNewError
                && this.oldPwdInput !=""
                && this.newPwdInput !=""
                && this.againPwdInput !=""){
                    //请求接口修改密码
                    that.axios.post(`${this.$store.state.baseURL}/manager/updatePwd`,{
                        mangerId:this.mangerId,
                        newPassword:this.newPwdInput,
                    }).then((res)=>{
                        let data = res.data
                        if(data.code =="200"){
                            that.$refs.toast.open({
                                hasIcon:false,
                                message:data.message,
                            })
                            console.log(data)
                        }else{
                            that.$refs.toast.open({
                                hasIcon:true,
                                message:data.message,
                            })
                        }
                    })
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
      },
      mounted(){
          this.getMangerInfo();
      },
    }
</script>

<style scoped>
  .search-address{
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
  .has-error{
    border-color: #a94442;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  }

  .error-tips{
      color: #a94442;
      font-size: 12px;
  }
</style>
