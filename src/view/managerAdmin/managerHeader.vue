<template>
    <div class="headerNav">
        <div class="content">
            <div class="right">
                <div class="icon">购物系统后台管理系统</div>
            </div>
            <div class="left">
                <div class="login" v-if="!isLogin">
                    <div @click="toLogin()" class="li">登录</div>
                    <!-- <div class="li">注册</div> -->
                </div>
                <div class="li myCenter" v-else>
                    个人中心
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isLogin:true,
            managerId:'',
        }
    },
    components:{

    },
    methods:{
        toLogin(){
            this.$router.push({
                push:'/manager/login',
                name:"managerLogin"
            })
        },
    }
}
</script>

<style lang="less" scoped>
.headerNav{
    background: #555;
    .content{
        padding: 0 25px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#fff;
        .right,.left{
            display: flex;
            justify-content: center;
            .icon{
                padding-right: 20px;
                font-size: 28px;
            }
            .li{
                font-size: 20px;
                padding: 0 15px;
            }
            .login{
                display: flex;
            }
        }
    }
}
</style>