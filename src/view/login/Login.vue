<template>
    <div class="login_container">
        <headerNav></headerNav>
        <div class="login_box">
            <div class="avatar_box">
                <img src="../../assets/logo.png">
            </div>
            <!-- 输入区域 -->
            <div class="form_box">
                <div class="form_item">
                    <input v-model="loginForm.username" class="iconfont username" placeholder="请输入账号" type="text">
                </div>
                <div class="form_item">
                    <input v-model="loginForm.password" class="iconfont password" placeholder="请输入密码" type="password">
                </div>
                <router-link tag="li" role="presentation" to="/register"><a class="text-color">去注册</a></router-link>
              
                <div class="form_btn">
                    <div @click="resetForm()" class="reset_btn">重置</div>
                    <div @click="login()" class="login_btn">登录</div>
                </div>
            </div>
        </div>
        <toast ref="toast" />
    </div>
</template>

<script>
import headerNav  from '../../components/headerNav.vue'
import * as cookie from '../../assets/js/cookie.js'
import toast from '../toast.vue'
export default {
    components:{
        toast,
        headerNav,
    },
    data(){
        return{
            loginForm:{
                username:'',
                password:'',
            },
            userInfo:{},
        }
    },
    watch:{

    },
    created(){
       
    },
    methods:{
        //重置表单
        resetForm(){
            this.loginForm.username = '';
            this.loginForm.password = '';
        },
        //校验表单数据
        validName(){
            let lenN = this.loginForm.username.length;
            let flag = true;
            if(lenN<3 || lenN >15){
                flag = false;
            }
            if(lenN = 0)
            return flag;
        },
        validPassword(){

        },
        login(){
            let that = this;
            this.axios.post(`${this.$store.state.baseURL}/users/doLogin`,{
                username:that.loginForm.username,
                password:that.loginForm.password,
            }).then((res)=>{   
                let data = res.data 
                if(data.code == 200){
                   if(data.data==2){ //登录成功
                        this.$refs.toast.open({
                            hasIcon:false,
                            message:"登录成功",
                        })
                        this.searchUserInfo();
                   }else if(data.data == 1){//无改账号，前去注册
                        this.$refs.toast.open({
                            hasIcon:true,
                            message:"查无该账号，请前往注册！",
                        })
                   }else if(data.data == 3){ //密码错误
                        alert(data.message)
                        this.$refs.toast.open({
                            hasIcon:true,
                            message:"密码错误，请重新输入密码！",
                        })
                   } 
                }
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        },
        //根据手机号查询用户信息
        searchUserInfo(){
            this.axios.post(`${this.$store.state.baseURL}/users/getUserIdByUserTel`,{
                userTel:this.loginForm.username,
            }).then((res)=>{
                let data = res.data 
                console.log(data);
                if(data.code == 200){
                    if(data.data.length!=0){
                        this.userId = data.data[0].userId
                        if(this.userId){
                            let domainStr = cookie.getRootDomain();
                            console.log(domainStr);
                            this.getUserInfo();
                            cookie.$cookie("userID",this.userId,{doamin:domainStr,path:'/',expires:15,unEncoded:false})
                        }
                    }
                }else{
                    console.log('请稍后再试')
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        //获取其他详情
        getUserInfo(){
            this.axios.post(`${this.$store.state.baseURL}/users/getUserInfo`,{
                userId:this.userId,
            }).then((res)=>{
                let data = res.data;
                console.log(data);
                if(data.code == 200){
                    this.userInfo = data.data;
                    console.log(this.userInfo);
                    let domainStr = cookie.getRootDomain();
                    console.log(domainStr);
                    cookie.$cookie("userID",this.userId,{doamin:domainStr,path:'/',expires:15,unEncoded:false})
                    cookie.$cookie("userName",this.userInfo.userNickName,{doamin:domainStr,path:'/',expires:15,unEncoded:false})
                    cookie.$cookie("headPic",this.userInfo.userHeadPic,{doamin:domainStr,path:'/',expires:15,unEncoded:false})
                    
                    this.$router.push({
                        path:'/index',
                        name:'shoppingIndex1',
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container{
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
                background:rgb(97, 203, 245);
                cursor: pointer;
            }
        }
    }
}
</style>

