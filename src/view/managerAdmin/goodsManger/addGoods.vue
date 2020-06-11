<template>
    <section class="publish-stone">
      <!--面包屑-->
      <div class="tab-title">
        <span><i class="glyphicon glyphicon-home"></i> 后台管理系统</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 商品管理</span>
        <span><i class="glyphicon glyphicon-menu-right"></i> 发布商品</span>
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
              <input type="text" class="form-control" form="addGoodsImage" v-model="goodsName" id="stone-title" placeholder="请输入商品名称">
            </div>
          </div>
          <div class="row form-group">
            <label for="stone-title" class="col-sm-2 control-label">商品价格</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" form="addGoodsImage" v-model="goodsCost" id="stone-title" placeholder="请输入商品价格">
            </div>
            <div class="col-sm-2">
                元
            </div>
          </div>
          <div class="row form-group">
            <label for="stone-title" class="col-sm-2 control-label">商品库存</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" form="addGoodsImage" v-model="goodsStock"  id="stone-title" placeholder="请输入商品库存">
            </div>
          </div>
          <div class="row form-group">
            <label for="publish-time" class="col-sm-2 control-label">发布时间</label>
            <div class="col-sm-4">
              <input type="date" class="form-control" form="addGoodsImage" id="publish-time">
            </div>
            <div class="col-sm-4">
              <input type="time" form="addGoodsImage" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label for="select" class="col-sm-2 control-label">商品类型</label>
            <div class="col-sm-4">
              <select id="select" form="addGoodsImage"  v-model="goodsType" class="form-control" >
                <option v-for="(item,index) in typeList" :key="index" :value="item">{{item}}</option>
                <!-- <option value="服装/鞋/帽">服装/鞋/帽</option>
                <option value="数码产品">数码产品</option>
                <option value="文具">文具</option>
                <option value="玩具">玩具</option>
                <option value="书籍">书籍</option>
                <option value="零食">零食</option>
                <option value="其他">其他</option> -->
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="upload" class="col-sm-2 control-label">商品图片</label>
            <div class="col-sm-10">
              <div class="upload-img" id="myPic">
                <img :src="images" class="img-responsive" form="addGoodsImage" >
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
              <textarea id="desc" form="addGoodsImage" v-model="goodsDetails" class="desc-content" placeholder="请输入商品描述"></textarea>
            </div>
          </div>

          <div class="btn-content form-group">
            <button @click="saveAddGoods()" class="btn btn-info publish-btn col-sm-2">发布</button>
            <button  class="btn btn-danger cancel-btn col-sm-2">取消</button>
          </div>
        </form>
      </div>

      <!--富文本编辑器-->
      <!--<div ref="editor" class="editor"></div>-->

    </section>
</template>

<script>
  import E from 'wangeditor';
    export default {
      name: "publishGoods",
      data(){
        
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
          typeList:['服装/鞋/帽','数码产品','文具','玩具','书籍','零食','其他'],
          managerId:1,
        }
      },
      watch:{
        goodsType(val,newVal){
            console.log(val,newVal)
        }  
      },
      created(){

      },
      mounted(){
        //得到商品类目表
        this.getTypeList();

      },
      methods:{
        //查询类目列表
        getTypeList(){
          this.axios.post(`${this.$store.state.baseURL}/manager/getProductTypeList`)
            .then((res) =>{
              let data = res.data
              if(data.code == "200" && data.data && data.data.typeList){
                this.typeList = data.data.typeList;
              } //查询失败则按默认值显示
            }
          )
        },
        //点击保存发布商品
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
