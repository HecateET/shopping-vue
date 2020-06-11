<template>
    <section class="publish-stone">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 商品管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 新增商品类型</span>
      </div>
      <div class="form-box table-responsive">
        <form class="form-horizontal">
          <div class="row form-group">
            <label for="type-name" class="col-sm-2 control-label">商品类型</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" form="addGoodsImage" v-model="typeName" id="type-name" placeholder="请输入商品类型名称">
            </div>
          </div>
          <div class="btn-content form-group">
            <button @click="saveAddType()" class="btn btn-info publish-btn col-sm-2">添加</button>
            <button  class="btn btn-danger cancel-btn col-sm-2">取消</button>
          </div>
        </form>
      </div>
      
      <toast ref="toast"></toast>

    </section>
</template>

<script>
import toast from '../../toast.vue'
    export default {
      name: "addType",
      data(){
        return{
          typeName:"",
          managerId:1,
        }
      },
      components:{
          toast,
      },
      methods:{
        saveAddType(){
            let that = this;
            if(this.typeName==""){
                this.$refs.toast.open({
                    hasIcon: false,
                    message: "请输入有效类目名！"
                })
            }else{
                this.axios.post(`${this.$store.state.baseURL}/manager/addType`,{
                    typeName:this.typeName,
                }).then((res)=>{
                    console.log(res)
                    let data = res.data;
                    if(data.code == '200'){
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"类目添加成功！"
                        })
                    }else if(data.code == '900'){ //类目已存在情况
                        that.$refs.toast.open({
                            hasIcon:true,
                            message:data.message,
                        })
                    }else{
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"类目添加失败，请稍后再试！"
                        })
                    }
                })
            }
        },
      },

    }
</script>

<style scoped>
  .publish-stone{
    font-size: 18px;
    padding: 10px 20px;
    background-color: #fff;
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
  .form-box{
    width: 90%;
    /*margin: 0;*/
    margin: 15px;

  }
  .form-group{
    margin: 0;
    margin-bottom: 10px;
  }
  .control-label{
    font-size: 16px;
  }
  .editor{
    margin: 10px 0;
    width: 90%;
    text-align:left;
    background-color: #fff;
  }
  .btn-content {
    margin: 20px;
  }
  .btn-content button {
    margin-left: 20px;
  }
  .upload-img{
    display: -webkit-box;
    width: 200px;
    height: 180px;
    -webkit-box-orient: vertical;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    background: #ffc;
    border-radius: 10px;
  }
  .upload-img p.glyphicon{
    font-size: 40px;
    color: #999;
    margin-bottom: 10px;
  }
  .upload-img p.upload-txt{
    color: #999;
  }
  #upload{
    /* display: none; */
  }
  #desc{
      margin-top: 10px;
      padding: 5px 10px;
      width: 600px;
      height: 200px;
  }
</style>
