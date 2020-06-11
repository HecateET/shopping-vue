<template>
    <div>
        <headerNav/>
        <div id="cart">
            <section class="cartMain">
                <div class="cartMain_hd">
                    <ul class="order_lists cartTop">
                        <li class="list_chk">
                            <!--所有商品全选-->
                            <input type="checkbox" id="all" class="whole_check">
                            <label for="all" :class="fetchData.status?'mark':''" @click="cartchoose()"></label>
                            全选
                        </li>
                        <li class="list_con">商品信息</li>
                        <li class="list_info">商品参数</li>
                        <li class="list_price">单价</li>
                        <li class="list_amount">数量</li>
                        <li class="list_sum">金额</li>
                        <li class="list_op">操作</li>
                    
                    </ul>
                </div>

                <div class="cartBox" v-for="(item,index) in fetchData.list" key="index">
                    <!-- <div class="shop_info">
                        <div class="all_check">
                            <input type="checkbox" id="shop_a" class="shopChoice">
                            <label for="shop_a" class="shop" :class="item.check?'mark':''" @click="shopchoose(item)"></label>
                        </div>
                        <div class="shop_name">
                            店铺：<a href="javascript:;">{{item.shop_name}}</a>
                        </div>
                    </div> -->
                    <div class="order_content">
                        <ul class="order_lists" v-for="(pro,index) in item.products" :key="index">
                            <li class="list_chk">
                                <input type="checkbox" id="checkbox_2" class="son_check">
                                <label for="checkbox_2" :class="pro.checked?'mark':''" @click="choose(item,pro)"></label>
                            </li>
                            <li class="list_con">
                                <div class="list_img"><a href="javascript:;"><img :src="pro.img" alt=""></a></div>
                                <div class="list_text"><a href="javascript:;">{{pro.text}}</a>
                                <span class="list_custom">定制</span>
                                </div>
                            </li>
                            <li class="list_info">
                                <p>类型：{{pro.type}}</p>
                                <p>描述：{{pro.des}}</p>
                            </li>
                            <li class="list_price">
                                <p class="price">￥{{pro.price}}</p>
                                <div class="charge">
                                    <p>更多促销</p>
                                    <div class="chargebox">
                                        测试
                                    </div>
                                </div>
                            </li>
                            <li class="list_amount">
                                <div class="amount_box">
                                    <a href="javascript:;" class="reduce reSty" @click="reduce(pro)">-</a>
                                    <input type="text" v-model="pro.num" class="sum">
                                    <a href="javascript:;" class="plus" @click="add(pro)">+</a>
                                </div>
                            </li>
                            <li class="list_sum">
                                <p class="sum_price">￥{{pro.sum}}</p>
                            </li>
                            <li class="list_op">
                                <!-- <p class="collect"><a href="javascript:;" class="colBtn">收藏商品</a></p> -->
                                <p class="del"><a href="javascript:;" class="delBtn" @click="deleteItem(pro.cardId)">移除商品</a></p>
                                <!-- <p class="custom"><a href="javascript:;" class="cusBtn">定制商品</a></p> -->
                                <div class="custombox">
                                        测试
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> 

                <!--底部-->
                <div class="bar-wrapper">
                    <div class="bar-right">
                        <div class="piece">已选商品<strong class="piece_num">{{this.fetchData.allnum}}</strong>件</div>
                        <div class="totalMoney">共计: <strong class="total_text">￥{{this.fetchData.allsum}}</strong></div>
                        <div class="calBtn canBtn" @click="toConfirmOrder()" :class="[isCanPay?'canBtn':'']"><a href="javascript:;">结算</a></div>
                    </div>
                </div>
            </section>
            <section class="model_bg"></section>
            <section class="my_model">
                <p class="title">删除宝贝<span class="closeModel">X</span></p>
                <p>您确认要删除该宝贝吗？</p>
                <div class="opBtn"><a href="javascript:;" class="dialog-sure">确定</a><a href="javascript:;" class="dialog-close">关闭</a></div>
            </section>
        </div>
        
       <toast ref="toast"></toast>
    </div>
</template>

<script>
import * as cookie from '@/assets/js/cookie'
import headerNav  from '../../components/headerNav'
import toast from '../toast'
export default {
    name:"myShopCart",
    components:{
        headerNav,
        toast
    },
    data(){
        return{
            userId:'',
            shoppingCartLists:[],
            isCanPay:false,
            fetchData:{
                        list:[
                            {
                                shop_id:1, //用不到
                                shop_name:'搜猎人艺术生活', //用不到
                                products:[
                                    {
                                        pro_id:101,
                                        text:'洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶',
                                        price:480,
                                        num:1,
                                        img:require("../../assets/images/shoppingCart/1.png"),
                                        sum:480,
                                        type:"",
                                        checked:false ,//商品选中状态
                                        cardId:'',
                                        des:"",

                                    },
                                    {
                                        pro_id:102,
                                        text:'花露水花露水花露水花露水花露水花露水花露水花露水',
                                        price:680,
                                        num:1,
                                        img:require("../../assets/images/shoppingCart/2.png"),
                                        sum:680,
                                        checked:false
                                    },
                                    {
                                        pro_id:103,
                                        text:'燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片',
                                        price:380,
                                        num:1,
                                        img:require("../../assets/images/shoppingCart/3.png"),
                                        sum:380,
                                        checked:false
                                    }
                                ],
                                check:false,//店铺选中状态
                                choose:0,//商品选中个数
                            },
                        ],
                status:false,//全选选中状态
                allchoose:0,//店铺选中个数
                allsum:0,//总计价格
                allnum:0//总计数量
             },
        }
    },
    watch:{

    },
    methods:{
        //获取购物车列表
        getShoppingCartList(){
            this.axios.post(`${this.$store.state.baseURL}/users/getMyShopCarts`,{
                userId:this.userId,
            }).then((res)=>{
                let data = res.data;
                console.log("我的购物车：",data)
                if(data.code == "200" && data.data.length>0){
                    this.shoppingCartLists = data.data;
                    let list = [],allPrice = 0,allnum =0;
                    data.data.forEach(item=>{
                        let info = {};
                        info.pro_id = item.productId;
                        info.text = item.productName;
                        info.price = item.unitCost;
                        info.num = item.cartNum;
                        info.sum = item.unitCost * info.num;
                        info.img = item.productPicture;
                        info.type = item.productType;
                        info.checked = false;
                        info.des = item.productDescribe;
                        info.cardId = item.cardId; //购物车id
                        list.push(info);
                        
                        if(info.checked) {
                            allPrice += info.sum
                            allnum ++;
                        }
                    })
                    this.fetchData.list[0].products = list;
                    this.fetchData.allsum = allPrice;
                    this.fetchData.allnum = allnum;
                    console.log(list);
                    
                }
            })
        },
        //从购物车列表中移除
        deleteItem(cardId){
            this.axios.post(`${this.$store.state.baseURL}/users/deleteShopItem`,{
                cartId:cardId,
            }).then((res)=>{
                let data = res.data;
                console.log("删除购物车移除",data);
                if(data.code == '200'){
                    console.log("商品移除成")
                    this.getShoppingCartList();
                }
            })
        },
        //接口修改购物车内商品数量 减少，最少是1 
        subShopItemNums(cardId){
            this.axios.post(`${this.$store.state.baseURL}/users/subShopItemNums`,{
                cartId:cardId,
            }).then((res)=>{
                let data = res.data;
                console.log("商品数量-1",data);
                if(data.code == '200'){
                    console.log("商品数量-1",data);
                }
            })
        },
        //接口修改购物车内商品数量 增加
        addShopItemNums(cardId){
            this.axios.post(`${this.$store.state.baseURL}/users/addShopItemNums`,{
                cartId:cardId,
            }).then((res)=>{
                let data = res.data;
                console.log("商品数量+1",data);
                if(data.code == '200'){
                    console.log("商品数量+1")
                }
            })
        },
        //是否选中状态数据库修改,不用了
        updateGoodsCheck(cardId){
            this.axios.post(`${this.$store.state.baseURL}/users/updateGoodsCheck`,{
                cartId:cardId,
            }).then((res)=>{
                let data = res.data;
                console.log("选中状态变更",data);
                if(data.code == '200'){
                    console.log("选中状态变更成功")
                }
            })
        },
        //勾选购物车内商品
        choosetrue(item,pro){
            pro.checked=true
            ++item.choose===item.products.length?item.check=true:''
            item.check?++this.fetchData.allchoose===this.fetchData.list.length?this.fetchData.status=true:this.fetchData.status=false:''
            this.fetchData.allsum+=pro.sum//当触发商品选中按钮，将商品总价格添加到总计价格
            this.fetchData.allnum ++;
        },
        //取消勾选购物车内商品
        choosefalse(item,pro){
            pro.checked=false
            --item.choose
            if(item.check){
                item.check=false
                --this.fetchData.allchoose
            }
            this.fetchData.status=false
            this.fetchData.allsum-=pro.sum//当触发商品取消按钮，将商品总价格从总计价格删去                 
            this.fetchData.allnum --;
        },
        //点击结算，跳转订单确认页
        toConfirmOrder(){
            let params = {
                // productInfo:JSON.stringify(this.productInfo), //对商品信息编码
                // goodsNumber:this.goodsNumber,
                from:"shoppingCart",
            };
            let needPayList = []
            this.fetchData.list[0].products.forEach(item=>{
                if(item.checked){
                    needPayList.push(item);
                }
            })
            console.log(needPayList);
            if(needPayList.length!=0){
                
            }
        },

        choose(item,pro){
            !pro.checked?this.choosetrue(item,pro):this.choosefalse(item,pro)
        },
        //这里是绑定到html上的方法，取反是由于你在触发方法的时候取的是之前的状态
        shoptrue(item){
            item.products.forEach((pro)=>{
                pro.checked===false?this.choosetrue(item,pro):''
            })
        },
        //循环店铺中的商品，先筛选出目前没选中的商品，给它执行choosetrue函数
        shopfalse(item){
            item.products.forEach((pro)=>{
                pro.checked===true?this.choosefalse(item,pro):''
            })
        },
        //循环店铺中的商品，先筛选出目前被选中的商品，给它执行choosefalse函数
        shopchoose(item){
            !item.check?this.shoptrue(item):this.shopfalse(item)
        },  
        cartchoose(){
            this.fetchData.status=!this.fetchData.status//取反改变状态
            this.fetchData.status?this.fetchData.list.forEach((item)=>this.shoptrue(item)):this.fetchData.list.forEach((item)=>this.shopfalse(item))
        },
        //增加商品
        add(pro){
            pro.num++
            pro.sum+=pro.price
            this.addShopItemNums(pro.cardId);
            pro.checked?this.fetchData.allsum+=pro.price:this.fetchData.allsum//这里判断下商品的状态决定是不是要改变总计价格
        },
        //减少商品
        reduce(pro){
            if(pro.num===1){
                pro.num
            }else{
                this.subShopItemNums(pro.cardId);
                pro.num--
                pro.sum-=pro.price
                pro.checked?this.fetchData.allsum-=pro.price:this.fetchData.allsum//同上
            }
        }
    },
    created(){
        this.userId = cookie.getCookie('userID')||'';
        
    },
    mounted(){
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

        this.getShoppingCartList();
    },
}
</script>

<style scoped>
html,body{
    position: relative;
    width: 100%;
    min-height: 950px;
}
input[type="checkbox"]{
    display: none;
}
label{
    position: relative;
    display: inline-block;
    z-index: 1;
    border: 1px solid #b8b8b8;
    margin-left: 10px;
    border-radius: 1px;
    width: 12px;
    height: 12px;
    cursor: pointer;
}
label.mark{
    background: url("../../assets/images/shoppingCart/mark1.png") no-repeat -1px -1px;
}

a:hover{
    color: #ff8000;
    text-decoration: underline;
}



.cartMain{
    position: relative;
    width: 1200px;
    min-width: 1200px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 0px 100px;
    min-height: 210px;
}
/*购物车头部*/
.cartMain_hd{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #3c3c3c;
}
.cartMain_hd .cartTop{
    height: 50px;
}
.cartMain_hd .cartTop .list_chk{
    width: 80px;
    text-indent: 30px;
}
.cartMain_hd .cartTop .list_con{
    width: 312px;
}
.cartMain_hd .cartTop .list_chk label{
    position: absolute;
    left: 10px;
    top:19px;
    margin: 0;
}
.cartMain_hd .cartTop .list_info{
    padding: 0;
    text-indent: 15px;
}
.cartMain_hd .cartTop .list_con{
    text-indent: 140px;
}


.cartBox{
    width: 100%;
    margin-bottom: 15px;
}
.cartBox .shop_info{
    position: relative;
    width: 100%;
    height: 38px;
    background-color: #fff;
    line-height: 38px;
    vertical-align: baseline;
}
.cartBox .shop_info .all_check{
    position: relative;
    float: left;
    width: 30px;
    height: 38px;
}

.cartBox .shop_info .all_check input[type="checkbox"]{
    position: absolute;
    z-index: 0;
    left: -20px;
    top: -20px;
}
.cartBox .shop_info .all_check .shop{
    position: absolute;
    top:13px;
}
.cartBox .shop_info .shop_name{
    float: left;
}



/*商品列表*/
.cartBox .order_content{
    border: 1px solid #ccc;
}
.cartBox .order_content a{
    display: block;
}
.order_charge{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e7e7e7;
}
.order_charge p{
    display: inline-block;
    line-height: 40px;
}
.order_charge p.charge_info{
    margin:0 30px 0 50px;
}
.order_charge p.charge_info span{
    border: 1px solid #f60;
    padding:2px;
    color: #f60;
}
.order_lists{
    width: 100%;
    height: 130px;
    border-bottom: 1px solid #e7e7e7;
}
.order_lists:last-child{
    border-bottom: none;
}
.order_lists li{
    float: left;
    height: 100%;
}

.order_lists .list_chk{
    position: relative;
    width: 50px;
}
.order_lists .list_chk input[type="checkbox"]{
    position: absolute;
    z-index: 0;
    left: -20px;
    top: -20px;
}
.order_lists .list_chk label{
    margin: 20px 0 0 24px;
}

.order_lists .list_con{
    width: 342px;
}
.order_lists .list_con .list_img{
    width: 80px;
    height: 80px;
    margin-top: 20px;
    float: left;
}
.order_lists .list_con .list_img img{
    width: 100%;
    vertical-align: top;
}
.order_lists .list_con .list_text{
    margin: 20px 0 0 10px;
    line-height: 18px;
    width: 200px;
    float: left;
}
.order_lists .list_con .list_text a{
    color: #3c3c3c;
    margin-bottom: 5px;
}
.order_lists .list_con .list_text a:hover{
    color: #ff873e;
    text-decoration: underline;
}
.order_lists .list_con .list_text .list_custom{
    background-color:#ff8000;
    padding:3px;
    border-radius: 3px;
    color: #fff;
}
.order_lists .list_info{
    width: 252px;
    box-sizing: border-box;
    padding: 20px 0;
}
.order_lists .list_info p{
    color: #9c9c9c;
    line-height: 18px;
    margin-left: 15px;
}
.order_lists .list_price{
    width: 130px;
}
.order_lists .list_price .price{
    margin-top: 20px;
    line-height: 18px;
    font-family: Verdana,Tahoma,arial;
    color: #3c3c3c;
    font-weight: bold;
}
.order_lists .list_price .charge{
    position: relative;
    z-index: 4
}
.order_lists .list_price .charge p{
    color: #ff0000;
    border:1px solid #ff0000;
    width: 62px;
    height:25px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
}
.order_lists .list_price .charge .chargebox{
    display: none;
    width: 300px;
    height: 110px;
    background: #000;
    z-index: 1;
}
.order_lists .list_amount{
    width: 120px;
}
.order_lists .list_amount .amount_box{
    margin-top: 20px;
    width: 77px;
    height: 25px;
    position: relative;
}
.order_lists .list_amount .amount_box input{
    width: 39px;
    height: 15px;
    line-height: 15px;
    border: 1px solid #aaa;
    color: #343434;
    text-align: center;
    padding: 4px 0;
    background-color: #fff;
    z-index: 2;
    position: absolute;
    left: 18px;
    float: left;
}
.order_lists .list_amount .amount_box a{
    float: left;
    height: 23px;
    width: 17px;
    border: 1px solid #e5e5e5;
    background: #f0f0f0;
    text-align: center;
    line-height: 23px;
    color: #444;
    position: absolute;
    top:0;
}
.order_lists .list_amount .amount_box a:hover{
    border-color: #ff873e;
    text-decoration: none;
    color: #ff873e;
    z-index: 3;
}

.order_lists .list_amount .amount_box .reduce{
    left: 0;
}

.order_lists .list_amount .amount_box .reSty{
    color: #cbcbcb;
}
.order_lists .list_amount .amount_box .reSty:hover{
    border-right: none;
    border-color: #e5e5e5;
    text-decoration: none;
    color: #cbcbcb;
}

.order_lists .list_amount .amount_box .plus{
    border-left-color: transparent;
    right: 0;
}


.order_lists .list_sum{
    width: 140px;
}
.order_lists .list_sum .sum_price{
    line-height: 18px;
    margin-top: 20px;
    font-family: Verdana,Tahoma,arial;
    color: #900;
    font-weight: bold;
}
.order_lists .list_op{
    width: 164px;
}
.order_lists .list_op .collect{
    margin-top: 20px;
}
.order_lists .list_op .del{
    line-height: 18px;
    margin:5px 0;
}
.order_lists .list_op .custombox{
    width: 200px;
    height: 350px;
    background-color: #000;
    display: none;
    position: relative;
    z-index: 9
}
/*底部总计算价*/
.bar-wrapper{
    width: 1200px;
    height: 50px;
    position: fixed;
    bottom: -1px;
    z-index: 99;
    background: #e5e5e5;
}
.bar-wrapper .bar-right{
    float: right;
    color: #3c3c3c;
}
.bar-wrapper .bar-right strong{
    color: #900;
}

.bar-wrapper .bar-right .piece{
    float: left;
    min-width: 110px;
    margin-right: 20px;
    height: 50px;
    line-height: 50px;
}
.bar-wrapper .bar-right .piece .piece_num{
    display: inline-block;
    padding: 0 10px;
    font-weight: 700;
    font-size: 18px;
    font-family: tohoma,arial;
}
.bar-wrapper .bar-right .totalMoney{
    float: left;
    min-width: 100px;
    height: 50px;
    line-height: 50px;
}
.bar-wrapper .bar-right .totalMoney .total_text{
    float: right;
    font-weight: 400;
    font-size: 20px;
    font-family: Arial;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 15px;
}
.bar-wrapper .bar-right .calBtn{
    float: left;
}
.bar-wrapper .bar-right .calBtn a{
    display: block;
    width: 120px;
    height: 50px;
    color: #fff;
    background: #B0B0B0;
    cursor: not-allowed;
    font-size: 22px;
    letter-spacing: 5px;
    text-decoration: none;
    line-height: 50px;
    text-align: center;
    border-radius: 2px;
}
.bar-wrapper .bar-right .canBtn a{
    display: block;
    width: 120px;
    height: 50px;
    color: #fff;
    background: #ff0000;
    cursor: pointer;
    font-size: 22px;
    letter-spacing: 5px;
    text-decoration: none;
    line-height: 50px;
    text-align: center;
    border-radius: 2px;
}
.bar-wrapper .bar-right .calBtn a.btn_sty{
    background: #ff873e;
    cursor: pointer;
}

/*自己定义的模态框*/
.model_bg{
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    z-index: 999;
    display: none;
}
.my_model{
    position: fixed;
    display: none;
    top:50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -200px;
    z-index: 9999;
    width: 360px;
    height: 120px;
    border: 1px solid #aeaeae;
    border-radius: 3px;
    padding: 20px;
    background: #fff;
}
.my_model .title{
    font-size: 14px;
    color: #3c3c3c;
    font-weight: 700;
    margin-bottom: 20px;
}
.my_model .title .closeModel{
    float: right;
    cursor: pointer;
}
.my_model p{
    line-height:16px;
}
.my_model .opBtn{
    margin-top: 20px;
}
.my_model .opBtn a{
    width: 58px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    -ms-border-radius: 1px;
    border-radius: 1px;
    display: inline-block;
    margin-right: 10px;
    font-weight: 700;
}
.my_model .dialog-sure{
    background: #52a0e5;
    color: #fff;
    border: 1px solid #52a0e5;
}

.my_model .dialog-close{
    background: #fff;
    border: 1px solid #d9d9d9;
    color: #3c3c3c;
}
</style>