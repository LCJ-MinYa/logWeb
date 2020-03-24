<template>
    <div class="copyright-box">
        <span class="copyright">©2020 <a href="https://www.ziyiu.com/">恣意游</a></span>
        <span class="beian">蜀ICP备15022337号</span>
    </div>
</template>

<script>
export default {
    name: 'copyright',
    data () {
        return {

        }
    }
}
</script>

<style lang="css" scoped>
.copyright-box{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
}
.copyright-box span{
    color: #eee;
    font-size: 14px;
    margin: 0 40px;
}
.copyright-box span a{
    text-decoration:none;
    color: #eee;
}
</style>