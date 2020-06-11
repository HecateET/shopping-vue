<template>
    <div class="register_container">
        <headerNav></headerNav>
        <div class="login_box">
            <div class="avatar_box">
                <img src="../../assets/logo.png">
            </div>
            <!-- 输入区域 -->
            <div class="form_box">
                <div class="form_item">
                    <input v-model="username" class="iconfont username" placeholder="请输入手机号" type="text">
                </div>
                <div class="form_item">
                    <input v-model="password" class="iconfont password" placeholder="请输入密码" type="password">
                </div>
                <router-link tag="li" role="presentation" to="/register"><a class="text-color">已有账号？去登录</a></router-link>
              
                <div class="form_btn">
                    <div @click="resetForm()" class="reset_btn">重置</div>
                    <div @click="register()" class="login_btn">注册</div>
                </div>
            </div>
        </div> 
        <toast ref="toast" />
    </div>
</template>

<script>
import headerNav  from '../../components/headerNav.vue'
import {$cookie,getRootDomain} from '../../assets/js/cookie.js'
import toast from '../toast.vue'
export default {
    components:{
        headerNav,
        toast,
    },
    data(){
        return{
            username:'',
            password:'',
        }
    },
    methods:{
        //重置表单
        resetForm(){
            this.username = '';
            this.password = '';
        },
        register(){
            let that = this;
            if(this.username == '' || this.password == ''){
                alert("请输入手机号或密码");
                return;
            }else{
                this.axios.post(`${this.$store.state.baseURL}/users/signup`,{
                    userTel:this.username,
                    password:this.password,
                }).then((res)=>{   
                    let data = res.data 
                    if(data.code == 200){
                        if(data.data==1){
                            that.$refs.toast.open({
                                hasIcon:false,
                                message:"注册成功，前往登录",
                            })
                            setTimeout(()=>{
                                that.$router.push({
                                    path:"/login",
                                    name:'login',
                                })
                            },3000)
                        }else if(data.data == 2){ //账户已注册
                            that.$refs.toast.open({
                                hasIcon:true,
                                message:data.message,
                            })
                        }
                    }
                })
            }
        }
    },
    created(){

    }
    
}
</script>

<style lang="less" scoped>
.register_container{
    height: 100%;
    background-color: #2b4b6b;
}   
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #eee;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .form_box{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .form_item{
            width: 100%;
            margin: 20px 0;
            // .username{
            //     position: relative;
            //     &::before{
            //         position: absolute;
            //         content: "&#xe650;";
            //         width: 16px;
            //         height: 16px;
                    
            //     }
            // }
            // .password{

            // }
            input{
                box-sizing: border-box;
                width: 100%;
                height: 50px;
                border-radius: 5px;
                border:1px solid #999;
                font-size: 16px;
                padding: 0 20px;
            }
        }
        .form_btn{
            display: flex;
            justify-content: flex-end;
            padding-bottom:12px; 
            div{
                font-size: 16px;
                color: #fff;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 10px;
            }
            .reset_btn{
                background: rgb(119, 117, 117);
                cursor: pointer;
            }
            .login_btn{
                margin-right:0;
                cursor: pointer;
                background:rgb(97, 203, 245); 
            }
        }
    }
}
</style>