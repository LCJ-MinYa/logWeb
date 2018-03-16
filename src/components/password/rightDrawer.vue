<template>
    <transition name="slide-fade">
        <div class="right-drawer-box" v-show="showRightDrawer"></div>
    </transition>
</template>

<script>
export default {
    name: 'rightDrawer',
    props: ["showRightDrawer"],
    data () {
        return {

        }
    }
}
</script>

<style lang="css" scoped>
.right-drawer-box{
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    width: 30%;
    height:100%;
    box-shadow: -3px 2px 9px rgba(0, 0, 0, 0.4);
    z-index: 999;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translate3d(200px,0,0);
  opacity: 0;
}
</style>