<template>
    <transition name="bg-fade">
        <div class="right-drawer-wrap" @click.self="closeRightDrawer" v-show="showRightDrawer">
            <transition name="slide-fade">
                <div class="right-drawer-box" v-show="showRightDrawer">
                    <creat-password @closeRightDrawer="closeRightDrawer" :isEdit="isEdit"></creat-password>
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
            isEdit: true,
        }
    },
    methods: {
        closeRightDrawer(){
            this.$emit('closeRightDrawer');
        }
    }
}
</script>

<style lang="css" scoped src="../../assets/css/rightDrawer.css"></style>