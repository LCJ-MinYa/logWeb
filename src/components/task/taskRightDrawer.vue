<template>
    <transition name="bg-fade">
        <div class="right-drawer-wrap" @click.self="closeRightDrawer" v-show="showRightDrawer">
            <transition name="slide-fade">
                <div class="right-drawer-box task-right-drawer-box" v-show="showRightDrawer">
                    <creat-task-item @closeRightDrawer="closeRightDrawer" :isEdit="isEdit"></creat-task-item>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import rightDrawer from '../password/rightDrawer';
import creatTaskItem from './creatTaskItem';

export default {
    name: 'taskRightDrawer',
    extends: rightDrawer,
    components:{
        'creatTaskItem': creatTaskItem,
    }
}
</script>


<style lang="css" scoped src="../../assets/css/rightDrawer.css"></style>