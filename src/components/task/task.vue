<template>
    <el-row class="panel">
        <!--header-->
        <base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>

        <!--content-->
        <el-col class="panel-center">
            <base-left-Menu :leftMenuArray="taskListData" :activeMenu="activeMenu" @menuIndex="menuIndex"></base-left-Menu>
            <section class="panel-c-c">
                <task-list v-show="activeMenu == '任务列表'" @menuIndex="menuIndex" :taskListData="taskListData"></task-list>
                <task-item v-show="activeMenu != '任务列表' && activeMenu != '新建任务'" @menuIndex="menuIndex"></task-item>
            </section>
        </el-col>

    </el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'
import baseLeftMenu from '../common/baseLeftMenu'
import taskList from './taskList'
import taskItem from './taskItem'
import taskController from '../../controller/task'
import { mapGetters } from 'vuex'

export default {
    name: 'task',
    data () {
        return {
            titleIcon: 'icon-iconfonttask1',
            titleText: '任务管理',
            titleActionIcon: 'icon-1',
            activeMenu: '任务列表',
        }
    },
    components:{
        'baseHeader': baseHeader,
        'baseLeftMenu': baseLeftMenu,
        'taskList': taskList,
        'taskItem': taskItem
    },
    mounted(){
        this.getTaskList();
    },
    computed: {
        ...mapGetters({
            taskListData: 'taskList',
        })
    },
    methods:{
        menuIndex(index){
            this.activeMenu = index;
            for (let i = 0; i < this.taskListData.length; i++) {
                if(this.taskListData[i].text == index){
                    this.$store.dispatch('UpdateActiveTaskListType', this.taskListData[i]._id);
                    return;
                }
            }
        },
        getTaskList(){
            taskController.getTaskListData(this).then(result=>{
                console.log(result);
                this.$store.dispatch('AddTaskList', result);
            })
        }
    }
}
</script>

<style lang="css" scoped src="../../assets/css/modulePage.css"></style>