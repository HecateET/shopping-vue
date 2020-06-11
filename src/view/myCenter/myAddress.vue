<template>
    <div class="my-address">
        <div class="address-nav">
            <p class="btn" @click="addNew()">新增地址</p>
        </div>
        <div class="address-list table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="table-head">#</th>
                        <th class="table-head">收货人</th>
                        <th class="table-head">详细地址</th>
                        <th class="table-head">电话/手机</th>
                        <th class="table-head">操作</th>
                        <th class="table-head"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="vertical-align: center" v-for="(item,index) in addressList" :key="index">
                        <th scope="row">{{index+1}}</th>
                        <td class="table-txt">{{item.userName}}</td>
                        <td class="table-txt">{{item.userAddress}}</td>
                        <td class="table-txt">{{item.userPhone}}</td>
                        <td class="table-txt">
                            <button class="btn btn-info" @click="changeAddress(item)">修改</button>
                            <button class="btn btn-danger" @click="deleteAddress(item)">删除</button>
                        </td>
                        <td class="table-txt">
                            <p class="defualt" v-show="item.isDefualt ==1">默认地址</p>
                            <p @click="setDefualt(item)" v-show="item.isDefualt !=1" class="btn set-default">设未默认</p>
                        </td>
                    </tr>
                    <tr  v-if="addressList.length==0">
                        <td colspan="6">
                             暂无收获地址，点击新增地址，添加一个收获地址吧~
                            <p class="btn" @click="addNew()">新增地址</p>
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>

         <!-- 新增地址弹框 -->
        <div class="add-address-dialog" v-show="isShowAddDialog">
            <div class="add-content">
                <p class="dialog-title">创建地址</p>
                <form class="form-horizontal">
                     <div class="row form-group">
                        <label for="stone-title" class="col-sm-2 control-label">详细地址：</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" form="addGoodsImage" v-model="address" id="stone-title" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息">
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="stone-title" class="col-sm-2 control-label">收货人姓名：</label>
                        <div class="col-sm-4">
                        <input type="text" maxlength="26" class="form-control" form="addGoodsImage" v-model="addressName" id="stone-title" placeholder="长度不得超过26个字符">
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="stone-title" class="col-sm-2 control-label">手机号码：</label>
                        <div class="col-sm-4">
                        <input type="tel" maxlength="11" class="form-control" form="addGoodsImage" v-model="addressTel" id="stone-title" placeholder="请输入手机号吗">
                        </div>
                    </div>
                    
                </form>
                <div class="btn-content">
                    <div class="col-sm-7"></div>
                    <button @click="closeDialog()" class="btn btn-danger col-sm-2">取消</button>
                    <button v-show="isAdd" @click="addAddress()" class="btn btn-info col-sm-2">保存</button>
                    <button v-show="isChange" @click="changeAddressAPI()" class="btn btn-info col-sm-2">修改</button>
                </div>
            </div>
        </div>
        <toast ref="toast"></toast>
    </div>
</template>

<script>
import toast from '../toast'
import *  as cookie from '../../assets/js/cookie.js'
export default {
    name:"myAddress",
    data(){
        return{
            userId:'',
            addressList:[],
            isShowAddDialog:false,
            //新增的收获地址信息
            addressName:"",
            addressTel:"",
            address:"",
            addressId:"", //需要修改的addressI都
            defualtAddress:{}, //记住默认地址的addressId
            isAdd:false,
            isChange:false,
        }
    },
    components:{
        toast,
    },
    methods:{
        //获取用户收货地址列表
        getMyAddress(){
            this.axios.post(`${this.$store.state.baseURL}/users/getAddressList`,{
                userId:this.userId,
            }).then((res)=>{
                let data = res.data;
                console.log(data)
                if(data.code == "200" && data.data){
                    this.addressList = data.data;
                    this.addressList.forEach(item => {
                        if(item.isDefualt == 1){
                            this.defualtAddress = item;
                        }
                    });
                    // this.addressList = []
                }
            })
        },
        //新增地址,打开弹框蒙层
        addNew(){
            this.isShowAddDialog = true;
            this.isAdd = true;
        },
        //设置为默认地址
        setDefualt(item){
            let that = this;
            console.log(this.defualtAddress,item);
            this.axios.post(`${this.$store.state.baseURL}/users/updateAddress`,{
                addressId:that.defualtAddress.addressId,
                userName:that.defualtAddress.userName,
                userPhone:that.defualtAddress.userPhone,
                userAddress:that.defualtAddress.userAddress,
                isDefult:-1,
            }).then((res) =>{
                let data = res.data
                if(data.code == '200'){
                    that.axios.post(`${that.$store.state.baseURL}/users/updateAddress`,{
                        addressId:item.addressId,
                        userName:item.userName,
                        userPhone:item.userPhone,
                        userAddress:item.userAddress,
                        isDefult:1,
                    }).then((res1) =>{
                        console.log("res1",res1)
                        let data1 = res1.data
                        if(data1.code =="200"){
                            console.log("设置默认地址成功");
                            //设置成功后重新请求地址列表。
                            this.getMyAddress();
                        }
                    })
                }
            })
        },
        //关闭弹框
        closeDialog(){
            this.isShowAddDialog = false;
            this.isAdd = false;
            this.isChange = false;
            this.addressName="";
            this.addressTel="";
            this.address="";
            this.addressId = "";
        },
        //修改收货地址信息
        changeAddress(item){
            this.addressName=item.userName;
            this.addressTel=item.userPhone;
            this.address=item.userAddress;
            this.addressId = item.addressId;
            this.isShowAddDialog = true;
            this.isChange = true;
        },
        changeAddressAPI(item){
            let  that = this;
            if(this.addressName==""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入收获人姓名",
                })
                return;   
            }else if(this.addressTel==""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入电话号码",
                })
                return;   
            }else if(this.address == ""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入收货地址",
                })
                return;   
            }else{
                this.axios.post(`${this.$store.state.baseURL}/users/updateAddress`,{
                        addressId:this.addressId,
                        userName:this.addressName,
                        userPhone:this.addressTel,
                        userAddress:this.address,
                }).then((res) =>{
                    let data = res.data;
                    if(data.code == "200"){
                        console.log("修改成功")
                        this.$refs.toast.open({
                            hasIcon:false,
                            message:"地址修改成功！",
                        })
                        //关闭dialog
                        this.closeDialog();
                        //设置成功后重新请求地址列表。
                        this.getMyAddress();
                    }else{
                        that.$refs.toast.open({
                            hasIcon:true,
                            message:"地址修改失败！请稍后再试！",
                        })
                    }
                })
            }
           
        },
        //删除收货地址
        deleteAddress(item){
            console.log("删除地址：");
            let that =this;
            this.axios.post(`${this.$store.state.baseURL}/users/deleteAddress`,{
                   addressId:item.addressId,
                }).then((res) =>{
                    let data = res.data;
                    console.log(data)
                    if(data.code ==200){
                        console.log("删除成功！")
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"删除成功！",
                        })
                        that.getMyAddress();
                    }else{
                        that.$refs.toast.open({
                            hasIcon:true,
                            message:"此地址不能删除！",
                        })
                    }
                })
        },
        //添加新地址
        addAddress(){
            let  that = this;
            if(this.addressName==""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入收获人姓名",
                })
                return;   
            }else if(this.addressTel==""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入电话号码",
                })
                return;   
            }else if(this.address == ""){
                this.$refs.toast.open({
                    hasIcon:true,
                    message:"请输入收货地址",
                })
                return;   
            }else{
                this.axios.post(`${this.$store.state.baseURL}/users/addUserAddress`,{
                    userId:this.userId,
                    userName:this.addressName,
                    userPhone:this.addressTel,
                    userAddress:this.address,
                }).then((res) =>{
                    console.log(res);
                    let data = res.data;
                    if(data.code == "200"){
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"新增收获地址成功",
                        })
                        that.closeDialog();
                        //添加成功后重新请求收获地址
                        that.getMyAddress();
                        
                    }else{
                        that.$refs.toast.open({
                            hasIcon:false,
                            message:"新增地址失败，请稍后再试",
                        })
                    }
                })
            }
        },

        
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
        
        this.getMyAddress();

    }
}
</script>

<style scoped lang='less'>
.my-address{
    .address-nav{
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-align: center;
        -webkit-box-pack: end;
        width: 100%;
        height: 40px;
        background-color: #ffc;
        border-bottom: 1px solid #ccc;
        .btn{
            border: 1px solid #ccc;
            margin-right: 15px;
        }
    }
    .address-list{
        margin: 10px 0;
        background: #fff;
        .defualt{
            display: block;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #ff5000;
            border-radius: 3px;
            background: #ffd6cc;
            color: #f30;
        }
        .btn{
            border: 1px solid #ccc;
            margin-right: 15px;
        }
    }
    .add-address-dialog{
        position: fixed;
        background: rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .add-content{
            padding:20px;
            width: 800px;
            background: #fff;
            border-radius: 10px;
            .dialog-title{
                font-size: 16px;
                color: #333;
                font-weight: 700;
                padding-bottom: 15px;
            }
            .btn-content{
                .btn{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>