<template>
  <section class="home-index">
    <!--轮播图-->
    <headerNav></headerNav>
    <div class="index-content container">
      <!-- <button @click="getAllGoodsList()">请求接口</button> -->
      <div class="row">
        <div class="col-md-2 col-sm-2" width="200" hegiht="500" >
            <ul class="list-group">
                <li class="list-group-item click"  @click="getGoodsByType(item)" v-for="(item,index) in typeList" :key="index">{{item}}</li>
            </ul>
        </div>
          <div class="col-md-10 col-sm-10">
              <div v-if="goodLists.length>0" class="row">
                <div v-for="(item,index) in goodLists" :key="index" class="col-sm-6 col-md-4">
                    <div class="thumbnail product">
                        <img :src="item.productPicture">
                        <div class="caption product-des">
                        <h3 class="title">{{item.productName}}</h3>
                        <p class="price">￥{{item.unitCost}}</p>
                        <p>
                            <a @click="gotoGoodsDetails(item.productId)" class="btn btn-primary" role="button">立即购买</a> 
                            <a @click="gotoGoodsDetails(item.productId)" class="btn btn-default" role="button">查看详情</a>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 无数据页面 -->
            <div v-else>
                <div class="jumbotron">
                    <h1>商品为空</h1>
                    <p>该类型暂无商品</p>
                    <p><a class="btn btn-primary btn-lg" @click="getAllGoodsList()" role="button">查看全部商品</a></p>
                </div>
            </div>
          </div>
      </div>
      
    </div>
  </section>
</template>

<script>
import headerNav  from '../../components/headerNav'
//   import Swiper from 'swiper';
    export default {
      name: "index",
      components:{
          headerNav,
      },
      data(){
        return{
          goodLists:{},
          typeList:['服装/鞋/帽','数码产品','文具','玩具','书籍','零食','其他'],
        //   Height:$(window).height(),
        //   Width:$(window).width(),
        }
      },
      created() {
      },
      mounted() {
        this.getAllGoodsList()
        // $(".home-index").css("min-height",this.Height-$("#myHeader").height());
        // new Swiper('.swiper-container',{
        //   loop:true,
        //   autoplay:true,
        //   delay:3000,
        // });
        // console.log(this.Height);
      },
      methods:{
        gotoGoodsDetails(productId){
          let  params = {
            productId:productId,
          }
          this.$router.push({
            name:"goodDetails",
            params: params,
            query:params,
          })
        },
        //获取商品分类列表
        getTypeList(){
            this.axios.post(`${this.$store.state.baseURL}/manager/getProductTypeList`)
            .then((res) =>{
              let data = res.data
              if(data.code == "200" && data.data && data.data.typeList){
                this.typeList = data.data.typeList;
              } //查询失败则按默认值显示
            })
        },
        //获取全部商品
        getAllGoodsList(){
          this.axios.post(`${this.$store.state.baseURL}/manager/getGoodsList`)
            .then((res)=>{
              let data = res.data;
              if(data.code =="200"){
                this.goodLists = data.data;
              }else{

              }
            })
        },
        //根据类别查询商品
        getGoodsByType(type){
            this.axios.post(`${this.$store.state.baseURL}/manager/getGoodsListByType`,{
                type:type
            }).then((res)=>{
              let data = res.data;
              if(data.code =="200"){
                this.goodLists = data.data;
              }
            })
        }
      },
    }
</script>

<style scoped style="less">
  .home-index{
    width: 100%;
    /*min-height: 800px;*/
   background-color: #f5f6f7;
  }
  .banner-content{
    position: relative;
    width: 100%;
    height: 300px;
  }
  .banner-content img {
    width: 100%;
    height: 300px;
  }
  .banner-content .banner-box{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(237, 255, 126, 0.4);
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .banner-box .title{
    padding: 25px 0;
    font-family: Arial;
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  }
  .banner-box #search.index-search{
    width: 600px;
    height: 50px;
    font-size: 20px;
    padding: 5px 15px;
    border: 1px solid #fff;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  }
  .banner-box #search.index-search:active{
    border: 1px solid #fff;
  }

  .swiper-box{
    width: 100%;
    /*height: 400px;*/
    background-color: palegreen;
  }
  .swiper-slide{
    margin:0;
    padding: 0;
    text-align: center;
  }
  .swiper-slide img{
    width: 100%;
    height: 350px;
    text-align: center;
  }
  .index-content{
    background-color: white;
  }
  .product-des{
    height: 140px;
  }
  .product .title{
    height: 40px;
    padding: 5px 0;
    font-size: 18px;
    font-weight: bold;
  }
  .product .price{
    padding: 8px 0;
    font-size: 20px;
    color: red;
  }
  .click{
      cursor: pointer;
  }
</style>
