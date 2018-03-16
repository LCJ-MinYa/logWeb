<template>
    <transition name="bg-fade">
        <div class="right-drawer-wrap" @click.self="closeRightDrawer" v-show="showRightDrawer">
            <transition name="slide-fade">
                <div class="right-drawer-box" v-show="showRightDrawer">
                    <creat-password @menuIndex="menuIndex" @closeRightDrawer="closeRightDrawer" :isEditPassword="isEditPassword"></creat-password>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import creatPassword from './creatPassword'

export default {
    name: 'rightDrawer',
    props: ["showRightDrawer"],
    components:{
        'creatPassword': creatPassword,
    },
    data () {
        return {
            isEditPassword: true,
        }
    },
    methods: {
        closeRightDrawer(){
            this.$emit('closeRightDrawer');
        },
        menuIndex(){

        }
    }
}
</script>

<style lang="css" scoped>
.right-drawer-wrap{
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.right-drawer-box{
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 450px;
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
  transform: translate3d(80%,0,0);
  opacity: 0;
}

.bg-fade-enter-active {
  transition: all .5s ease;
}
.bg-fade-leave-active {
  transition: all .5s ease;
}
.bg-fade-enter, .bg-fade-leave-active {
  transform: translate3d(0,0,0);
  opacity: 0;
}
</style>