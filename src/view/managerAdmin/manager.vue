<template>
    <div class="manager-content">
        <ManagerHeader></ManagerHeader>
        <div class="manager">
        <!--个人中心左边垂直菜单-->
        <div class="manager-aside">
            <!--菜单组件-->
            <ManagerLeft></ManagerLeft>
        </div>
        <!--右边内容区域-->
        <div class="manager-content">

            <router-view/>
        </div>
    </div>
    </div>
</template>

<script>

import ManagerHeader from './managerHeader.vue'
import ManagerLeft from './managerLeft.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        ManagerHeader,
        ManagerLeft,
    },
    methods:{

    },
    mounted:{

    }
    
}
</script>

<style lang="less" scoped>
.manager{
    width: 100%;
    min-height: 800px;
    display: -webkit-box;
    /*background-color: aqua;*/
    .manager-aside{
        top: 0;
        left: 0;
        width: 200px;
        min-height: 800px;
        border-right: 1px solid #ccc;
        /*background-color: aquamarine;*/
    }
    .manager-content{
        -webkit-box-flex: 1;
    }
  }
  
</style>