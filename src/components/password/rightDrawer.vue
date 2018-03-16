<template>
    <transition name="slide-fade">
        <div class="right-drawer-box" v-show="showRightDrawer">
            <el-button type="primary" @click="closeRightDrawer">关闭</el-button>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'rightDrawer',
    props: ["showRightDrawer"],
    data () {
        return {

        }
    },
    methods: {
        closeRightDrawer(){
            this.$emit('closeRightDrawer');
        }
    }
}
</script>

<style lang="css" scoped>
.right-drawer-box{
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 400px;
    height:100%;
    box-shadow: -3px 2px 9px rgba(0, 0, 0, 0.4);
    z-index: 999;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translate3d(80%,0,0);
  opacity: 0;
}
</style>