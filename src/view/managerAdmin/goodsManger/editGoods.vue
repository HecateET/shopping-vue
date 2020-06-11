<template>
    <section class="publish-stone">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 购物系统后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 商品管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 修改商品</span>
      </div>
      <form class="form-horizontal" id="addGoodsImage"></form>
      <div class="form-box table-responsive">
        <!--<form class="">-->
          <!--<div class="form-group row">-->
            <!--<label class="col-sm-2" for="stone-title">奇石标题</label>-->
            <!--<input type="text" class="col-sm-10 form-control" id="stone-title" placeholder="请输入奇石标题">-->
          <!--</div>-->
        <!--</form>-->
        <form class="form-horizontal">
          <div class="row form-group">
            <label for="stone-title" class="col-sm-2 control-label">商品名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" form="addGoodsImage" v-model="productInfo.productName" id="stone-title" placeholder="请输入商品名称">
            </div>
          </div>
          <div class="row form-group">
            <label for="stone-title" class="col-sm-2 control-label">商品价格</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" form="addGoodsImage" v-model="productInfo.unitCost" id="stone-title" placeholder="请输入商品价格">
            </div>
            <div class="col-sm-2">
                元
            </div>
          </div>
          <div class="row form-group">
            <label for="stone-title" class="col-sm-2 control-label">商品库存</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" form="addGoodsImage" v-model="productInfo.productStock"  id="stone-title" placeholder="请输入商品库存">
            </div>
          </div>
          <!-- <div class="row form-group">
            <label for="publish-time" class="col-sm-2 control-label">发布时间</label>
            <div class="col-sm-4">
              <input type="date" class="form-control" form="addGoodsImage" id="publish-time">
            </div>
            <div class="col-sm-4">
              <input type="time" form="addGoodsImage" class="form-control">
            </div>
          </div> -->

          <div class="form-group">
            <label for="select" class="col-sm-2 control-label">商品类型</label>
            <div class="col-sm-4">
              <select id="select" form="addGoodsImage"  v-model="productInfo.productType" class="form-control" >
                <option value="服装/鞋/帽">服装/鞋/帽</option>
                <option value="数码产品">数码产品</option>
                <option value="文具">文具</option>
                <option value="玩具">玩具</option>
                <option value="书籍">书籍</option>
                <option value="零食">零食</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="upload" class="col-sm-2 control-label">商品图片</label>
            <div class="col-sm-10">
              <div class="upload-img" id="myPic">
                <img :src="productInfo.productPicture" class="img-responsive" form="addGoodsImage" >
                <p class="glyphicon glyphicon-picture"></p>
                <p class="upload-txt">点击上传商品图片</p>
                <input id="upload" type="file"
                            name="avatar"
                            @change="changeImage($event)"
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            form="addGoodsImage"
                            ref="avatarInput"
                            class="btn"/>
              </div>

            </div>
          </div>

          <div class="form-group">
            <label for="desc" class="col-sm-2 control-label">商品描述</label>
            <div class="col-sm-10">
              <textarea id="desc" form="addGoodsImage" v-model="productInfo.productDescribe" class="desc-content" placeholder="请输入商品描述"></textarea>
            </div>
          </div>

          <div class="btn-content form-group">
            <button @click="saveGoods()" class="btn btn-info publish-btn col-sm-2">保存</button>
            <button @click="goback()"  class="btn btn-danger cancel-btn col-sm-2">取消</button>
          </div>
        </form>
      </div>

      <!--富文本编辑器-->
      <!--<div ref="editor" class="editor"></div>-->
      <toast ref="toast"></toast>
    </section>
</template>

<script>
  import E from 'wangeditor';
  import toast from '../../toast.vue'
    export default {
      name: "editGoods",
      components:{
        toast,
      },
      data(){
      let q = this.$route.query;
        return{
          editorContent:'',
          goodsName:"",
          goodsCost:"",
          goodsStock:"",
          goodsType:"",
          goodsImage:"",
          goodsDetails:"",

          upath:"",//保存选中的文件
          images:"",
          managerId:1,

          productId:q.productId,
          productInfo:{},
        }
      },
      watch:{
        goodsType(val,newVal){
            console.log(val,newVal)
        },
        productId(value){
          this.getGoodsDetails();
        }
      },
      created(){

      },
      mounted(){
        // this.createEdioter();
        this.getGoodsDetails();

      },
      methods:{
        //返回上一级页面，列表页
        goback(){
          this.$router.back();
        },
        // 保存修改商品
        saveGoods(){
          let that = this;
          if(that.productInfo.productName==""){
            that.$refs.toast.open({
                hasIcon:true,
                message:"请输入商品名称",
            })
            return
          }else if(that.productInfo.productDescribe == ""){
            that.$refs.toast.open({
                hasIcon:true,
                message:"请输入商品信息描述",
            })
            return
          }else if(that.productInfo.productPicture == ""){
            that.$refs.toast.open({
                hasIcon:true,
                message:"请上传商品图片",
            })
            return
          }else if(that.productInfo.unitCost == ""){
            that.$refs.toast.open({
                hasIcon:true,
                message:"请输入商品价格",
            })
            return
          }else if(that.productInfo.productStock == ""){
            that.$refs.toast.open({
                hasIcon:true,
                message:"请输入商品库存",
            })
            return
          }
          this.axios.post(`${this.$store.state.baseURL}/manager/updateGoods`,{
            productName:this.productInfo.productName,
            productDescribe:this.productInfo.productDescribe,
            productPicture:this.productInfo.productPicture,
            unitCost:this.productInfo.unitCost,
            productStock:this.productInfo.productStock,
            productId:this.productInfo.productId,
          }).then((res)=>{
            let data = res.data;
            if(data.code == "200"){
              that.$refs.toast.open({
                  hasIcon:false,
                  message:"商品信息修改成功",
              });
              that.getGoodsDetails();
              //修改成功保存后，跳转列表页
              setTimeout(()=>{
                this.goback();
              },3000)
            }else{
              that.$refs.toast.open({
                  hasIcon:true,
                  message:"商品信息修改失败，请稍后再试",
              })
            }
          })
        },
        getGoodsDetails(){
          this.axios.post(`${this.$store.state.baseURL}/product/getGoodsInfo`,{
              productId:this.productId,
          }).then((res) =>{
            console.log(res);
            let data = res.data
            if(data.code == "200" && data.data && data.data.length>0){
              this.productInfo = data.data[0];
              console.log("productInfo",this.productInfo)
            } //查询失败则按默认值显示
          })
        },
        //这边没用到
        saveAddGoods(){
            setTimeout(()=>{
                let that = this;
                // let zipFormData = new FormData();
                // for(let i=0; i<this.upath.length;i++){
                //     zipFormData.append('filename',this.upath[i]);
                // }
                // //添加其他的表单元素
                // zipFormData.append("goodsName",this.goodsName);
                // zipFormData.append("goodsCost",this.goodsCost);
                // zipFormData.append("goodsStock",this.goodsStock);
                // zipFormData.append("goodsName",this.goodsType);
                // zipFormData.append("goodsName",this.goodsImage);
                // zipFormData.append("goodsName",this.goodsDetails);
                // zipFormData.append("goodsName",this.goodsName);

                // let config = {headers: {'Content-Type': 'multipart/form-data'}};
                this.axios.post(`${this.$store.state.baseURL}/manager/addGoods`,{
                    type:that.goodsType,
                    goodsName:that.goodsName,
                    describe:that.goodsDetails,
                    price:that.goodsCost,
                    stock:that.goodsStock,
                    picture:"/fdssdf",
                    managerId:that.managerId,
                }).then((res)=>{
                    alert("添加商品成功")
                    this.$router.push({
                        path:"/manager/goodList"
                    })
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
                setTimeout(()=>{
                    if(this.upath){
                        alert("上传成功")
                    }else{
                        alert("请选择图片")
                    }
                },20)
            },1000)
        },
        changeImage(e){
            this.upath = e.target.files;
            var inputFile = document.querySelector("[type='file']");
            var reader = new FileReader();
            reader.onload = function (event) {
                document.querySelector("img").src = `${event.target.result}`;
                document.querySelector("#myPic").style.backgroundColor = "transparent";
            };
            reader.readAsDataURL(inputFile.files[0]);
            this.isSaveHead = true;
        },
        upImage(){
             setTimeout(() => {
            let _this = this;
            // console.log(this.upath);
            // console.log("this.mydata:  " + this.mydata)
            var zipFormData = new FormData();
            //依次添加多个文件
            for (var i = 0; i < this.upath.length; i++) {
              zipFormData.append('filename', this.upath[i]);
            }
            //添加其他的表单元素
            let config = {headers: {'Content-Type': 'multipart/form-data'}};
            this.$ajax.post(`${axios.defaults.baseURL}/users/uploadfile`, zipFormData, config
            ).then(function (response) {
              console.log(response);
              console.log(response.data);
              console.log(response.bodyText);
            });
            setTimeout(() => {
              if (this.upath) {
                alert("修改成功");
                // location.href = `/user/${_this.$store.state.userId}/aboutme`;
              } else {
                alert("请选择图片!");
              }
            }, 20);
          }, 1000);
        },
        createEdioter(){
          var editor = new E(this.$refs.editor);
          editor.customConfig.onchange = (html)=>{
            this.editorContent = html;
          };
          editor.customConfig.colors = [
            '#000000',
            '#eeece0',
            '#1c487f',
            '#4d80bf',
            '#c24f4a',
            '#8baa4a',
            '#7b5ba1',
            '#46acc8',
            '#f9963b',
            '#ffffff',
            '#DB70DB',
            '#cc1d18'
          ];
          // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
          editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复
          ];
          //配置服务器端地址
          //editor.customConfig.uploadImgServer = 'http://localhost:3000/activityEdit';
          editor.create();
        },
      }
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
