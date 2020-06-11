<template>
    <div class="payindex">
        <h1>收银台：</h1>
        <h2>请扫码付款：</h2>
        <img class="pay" src="../../assets/images/payCode.jpg">
        <div class="btn-content">
            <p class="btn pay" @click="payCom()">支付完成</p>
            <p class="btn no-pay" @click="goback()">取消支付</p>
        </div>
        <toast ref="toast" />
    </div>
</template>

<script>
import * as cookie from '../../assets/js/cookie.js'
import toast from '../toast.vue'
export default {
    data(){
         let q = this.$route.query;
        return{
            userId:'',
            orderId:q.orderId,
        }
    },
    components:{toast},
    methods:{
        payCom(){
            this.changeOrderStatus()

        },
        goback(){
            this.$router.back()
        },
        changeOrderStatus(){
            let that =this;
            this.axios.post(`${this.$store.state.baseURL}/manager/changeOrder`,{
                orderId:this.orderId,
                orderStatus:"已支付",
                hasSend:0,
            }).then((res)=>{
                let data = res.data;
                console.log(data)
                if(data.code == "200" && data.data==1){
                    // this.orderInfos = data.data[0];
                    //修改成功重新请求订单详情
                    that.$refs.toast.open({
                        hasIcon:false,
                        message:"支付成功回到订单详情页"
                    })
                    setTimeout(function(){
                        that.$router.back();
                    },3000)
                }else{
                    that.$refs.toast.open({
                        hasIcon:true,
                        message:"订单取消失败，请稍后再试！"
                    })
                }
            })
        }
    },
    created(){

    },
    mounted(){

    }
}

</script>

<style scoped>
.payindex{
    font-size:30px;
    font-weight: bold;
    text-align:center;
    margin: 0 auto;
}
.pay{
    width: 450px;
    height: auto;
}
.btn-content{
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    border:1px solid #ccc;
    font-size: 28px;
    width: 150px;
    margin: 0 10px;

}
</style>