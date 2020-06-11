<style lang="less" scoped>
    .toast-wrap-bg{position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 999;background: rgba(0, 0, 0, .6);
        // .toast-wrap{position: relative;width: 100%;height: 100%;
        //     .info{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 300px;padding: 0 40px 40px 40px;background: #fff;
        //         a{display: block;width: 20px;height: 20px;background: url(//pic5.40017.cn/01/001/d5/01/rBANC1r1NIKAV2o6AAAAquM-sR4753.png) no-repeat 0 0;margin-top: 14px;margin-left: 314px;}
        //         p{font-size: 18px;line-height: 28px;color: #333;}
        //     }
        // }
        .toast-wrap{width: 340px;background: #fff;padding: 0 40px;position: fixed;top: 50%;left: 50%;margin-left: -210px;margin-top: -105px;box-shadow: 2px 0 8px rgba(0,0,0,.2);z-index: 222;
            .close{width: 20px;height: 20px;background: url(//pic5.40017.cn/01/001/d5/01/rBANC1r1NIKAV2o6AAAAquM-sR4753.png) no-repeat 0 0; background-size: 100% 100%; position: absolute;top: 14px;right: 6px;}
            .middle{display: table;padding: 60px 0;max-width: 340px;margin: 0 auto;position: relative;}
            .inner{display: table-cell;vertical-align: middle;
                img{width: 50px;height: 50px;position: absolute;left: 0;top: 50%;transform: translate(0,-50%);-webkit-transform: translate(0,-50%);-o-transform: translate(0,-50%);-ms-transform: translate(0,-50%);-moz-transform: translate(0,-50%);background: url(//pic5.40017.cn/02/000/bc/0b/rBLkCVrkLrKAOg3UAAADz8Z10hQ273.png) no-repeat top center;}
                p{font-size: 20px;}
            }
        }
        .toast-wrap-icon{
            .middle{padding-left: 64px;}
        }
    }
</style>

<template>
    <div class="toast-wrap-bg" v-show="showTimeWork">
        <div class="toast-wrap" :class="{'toast-wrap-icon': hasIcon}">
            <a href="javascript:;" @click="close" class="close"></a>
            <div class="middle">
                <div class="inner">
                    <img src="//file.40017.cn/international/pc/train/img/icon_fail.png" v-show="hasIcon">
                    <p v-html="message"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                showTimeWork: false,
                hasIcon: false,
                message: ''
            }
        },
        methods: {
            open(obj){
                this.hasIcon = obj.hasIcon;
                this.message = obj.message;
                this.showTimeWork = true;
                let that = this;
                if(!this.hasIcon){
                    setTimeout(function(){
                        that.showTimeWork = false;
                    },3000);
                }
            },
            close(){
                this.showTimeWork = false;
            }
        }
    }
</script>

