<template>
    <div class="goodsDetails">
       <headerNav></headerNav>
       <div class="container">
            <div class="row">
                <div class="col-sm-4 col-md-4">
                    <img :src="productInfo.productPicture" class="img-thumbnail">
                    <div class="row img-list">
                        <li class="col-xs-4 col-sm-4 col-md-4">
                            <img :src="productInfo.productPicture" class="img-thumbnail">
                        </li>
                        <li class="col-xs-4 col-sm-4 col-md-4">
                            <img :src="productInfo.productPicture" class="img-thumbnail">
                        </li>
                        <li class="col-xs-4 col-sm-4 col-md-4">
                            <img :src ="productInfo.productPicture" class="img-thumbnail">
                        </li>
                    </div>
                </div>
                <div class="col-sm-8 col-md-8">
                    <div class="jumbotron productInfo">
                        <h1 class="product-title">{{productInfo.productName}}</h1>
                        <p class="product-des">
                            商品描述：
                            {{productInfo.productDescribe}}
                        </p>
                        <p class="yunfei">运费： 快递 0.00</p>
                        <p class="price">
                            <span class="name">价钱：</span>
                            {{productInfo.unitCost}}
                            <span class="unit">元</span>
                        </p>
                        
                        <!-- 购买数量 -->
                        <div class="row form-group get-number">
                            <label for="number" class="col-sm-2 control-label title">数量:</label>
                            <div class="col-sm-2">
                            <input min="1" :max="productInfo.productStock" type="number" v-model="goodsNumber" class="form-control" form="addGoodsImage" id="number">
                            </div>
                            <div class="col-sm-1">
                                <span class="unit">件</span>
                            </div>
                        </div>

                        <p class="stock">
                            <span class="name">库存：</span>
                            {{productInfo.productStock}}
                            <span class="unit">件</span>
                        </p>
                        <p>
                            <span @click="addShopCarts()" class="add-cart btn btn-primary">加入购物车</span>
                            <span @click="gotoBuy()" class="right-get btn btn-primary">立即购买</span>
                        </p>
                    </div>
                </div>
            </div>
       </div>
       <toast ref="toast"></toast>
    </div>
</template>

<script>
import * as cookie from '@/assets/js/cookie'
import headerNav  from '../../components/headerNav'
import toast from '../toast.vue'
export default {
    name: "goodDetails",
    components:{
        headerNav,
        toast,
    },
    data(){
        let q = this.$route.query;
        return{
            productId:q.productId,
            productInfo:{},
            goodsNumber:1,
            userId:"",
        }
    },
    methods:{
        getGoodsDetails(){
            this.axios.post(`${this.$store.state.baseURL}/product/getGoodsInfo`,{
                productId:this.productId,
            }).then((res) =>{
              console.log(res);
              let data = res.data
              if(data.code == "200" && data.data && data.data.length>0){
                this.productInfo = data.data[0];
              } //查询失败则按默认值显示
            })
        },
        //加入用户购物车
        addShopCarts(){
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
            let that = this;
            if(this.goodsNumber<1){
                this.$refs.toast.open({
                    hasIcon:false,
                    message:"请输入商品数量",
                })
                return;
            }
            this.axios.post(`${this.$store.state.baseURL}/product/addShoppingCarts`,{
                productId:this.productInfo.productId,
                userId:this.userId,
                cartNum:this.goodsNumber,
            }).then((res)=>{
                let data = res.data
                if(data.code == "200"){
                    that.$refs.toast.open({
                        hasIcon:false,
                        message:"成功加入购物车，请在我的购物车中查看！"
                    })
                }else{
                    that.$refs.toast.open({
                        hasIcon:true,
                        message:"加入购物车失败，请在稍后再试！"
                    })
                }
            })
        },
        //立即购买,创建订单
        gotoBuy(){
            console.log('productInfo:',this.productInfo)
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
            let params = {
                productInfo:JSON.stringify(this.productInfo), //对商品信息编码
                goodsNumber:this.goodsNumber,
                from:"goodDetails",
            };
            this.$router.push({
                path:"/confirmOrder",
                name:"confirmOrder",
                query:params,
            })
        },
    },
    mounted(){

        this.getGoodsDetails();
    },
    created(){
        this.userId = cookie.getCookie('userID')||'';
    }
}
</script>

<style scoped>
.productInfo{
    background: #fff;
}
.product-title{
    font-size: 32px;
    font-weight: bold;
}
.product-des{
    font-size: 26px;
    color: #444;
}
.price{
    color: #FF0036;
    font-size: 28px;
}
.price .name{
    color: #666;
    font-size: 24px;
}
.price .unit{
    color: #333;
    font-size: 24px;
}
.stock{
    color: #888;
    font-size: 21px;
}
.get-number .title{
    color: #333;
    font-size: 26px;
}
.get-number .unit{
    color:#666;
    font-size: 24px;
}

.add-cart,.right-get{
    margin-right: 20px;
    float: left;
    overflow: hidden;
    position: relative;
    width: 178px;
    background-color: #ffeded;
    border: 1px solid #FF0036;
    color: #FF0036;
    font-family: 'Microsoft Yahei';
}
.right-get{
    background-color: #ff0036;
    border: 1px solid #ff0036;
    color: #fff;
}
</style>