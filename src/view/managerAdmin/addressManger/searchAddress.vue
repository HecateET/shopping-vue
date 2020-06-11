<template>
    <section class="search-address">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 地址管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 地址查询</span>
      </div>

      <div class="search-content">
        <form class="form-horizontal">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="userPhone" class="stone-title col-sm-5 control-label">用户手机号码：</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="userPhone"  placeholder="输入用户手机号码">
              </div>
            </div>
            <div class="form-group col-md-5">
              <label for="userId" class="stone-title col-sm-5 control-label">用户Id：</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="userId" placeholder="输入用户Id">
              </div>
            </div>
            <div class="btn-content col-md-1">
              <button class="btn btn-info publish-btn">搜索</button>
            </div>
          </div>
        </form>
        <hr>
      </div>
      <div class="result-content">
        <p class="result-title">您查询的用户地址信息为：</p>
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
              <input type="text" class="form-control" id="nick-name" readonly="readonly" v-model="userInfo.userName" placeholder="昵称">
            </div>
          </div>
          <div class="form-group">
            <label for="motto" class="stone-title col-sm-3 control-label">收获地址</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="motto" v-model="userInfo.motto" readonly="readonly" placeholder="个性签名">
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
            <label for="phone" class="stone-title col-sm-3 control-label">手机号码：</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="phone" readonly="readonly" v-model="userInfo.phoneNumber" placeholder="请输入手机号">
            </div>
          </div>
          <div class="form-group">
            <label for="email" class="stone-title col-sm-3 control-label">email：</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" readonly="readonly" id="email" v-model="userInfo.email" placeholder="请输入邮箱号">
            </div>
          </div>
          <div class="form-group">
            <label class="stone-title col-sm-3 control-label">所在地：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly="readonly" v-model="userInfo.province" placeholder="所在省份">
            </div>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly="readonly" v-model="userInfo.city" placeholder="所在城市">
            </div>
          </div>
        </form>
      </div>
    </section>
</template>

<script>
    export default {
      data(){
        return{
          userInfo:{
            userId:"0001",
            userName:"Hecate",
            phoneNumber:"17720849999",
            email:"1060526453@qq.com",
            sex:"女",
            province:"福建省",
            city:"福州市",
            motto:"Good Good Study,Day Day Up!",
            portNum:11,
            fansNum:20,
            followNum:35,
          }
        }
      },
      created(){

      },
      mounted(){

      },
      methods:{

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
</style>
