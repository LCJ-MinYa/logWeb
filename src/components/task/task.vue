<template>
    <el-row class="panel">
        <!--header-->
        <base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>

        <!--content-->
        <el-col class="panel-center">
            <base-left-Menu :leftMenuArray="taskListData" :activeMenu="activeMenu" @menuIndex="menuIndex"></base-left-Menu>
            <section class="panel-c-c">
                <task-list v-show="activeMenu == '任务列表'" @menuIndex="menuIndex" :taskListData="taskListData"></task-list>
                <creat-task-item @menuIndex="menuIndex" v-show="activeMenu == '新建任务'"></creat-task-item>
                <task-item ref="taskItemRef" v-show="activeMenu != '任务列表' && activeMenu != '新建任务'" @menuIndex="menuIndex"></task-item>
            </section>
        </el-col>

    </el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'
import baseLeftMenu from '../common/baseLeftMenu'
import taskList from './taskList'
import taskItem from './taskItem'
import creatTaskItem from './creatTaskItem'
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
        'taskItem': taskItem,
        'creatTaskItem': creatTaskItem
    },
    mounted(){
        this.getTaskList();
    },
    computed: {
        ...mapGetters({
            taskListData: 'taskList',
            activeTaskItemType: 'activeTaskItemType',
            activeTaskListType: 'activeTaskListType',
        })
    },
    methods:{
        menuIndex(index, taskItemData){
            this.activeMenu = index;
            if(!taskItemData){
                //新建任务项目和点击左侧列表后的切换
                for (let i = 0; i < this.taskListData.length; i++) {
                    if(this.taskListData[i].text == index){
                        this.$store.dispatch('UpdateActiveTaskListType', this.taskListData[i]._id);
                        if(this.activeTaskListType != 'default' && !this.$store.state.task.taskItem[this.activeTaskListType][this.activeTaskItemType].isRequest){
                            this.$refs['taskItemRef'].getTaskItem();
                        }
                        return;
                    }
                }
            }else{
                //创建任务item成功后的切换
                this.$store.dispatch('UpdateAllActiveTaskType', taskItemData);
                if(this.$store.state.task.taskItem[this.activeTaskListType][this.activeTaskItemType].isRequest){
                    //该任务类型请求过数据,直接push
                    this.$store.dispatch('AddTaskItem', taskItemData);
                }else{
                    //该任务类型未请求过数据,调用子组件方法请求数据，不需要push
                    this.$refs['taskItemRef'].getTaskItem();
                }
            }
        },
        getTaskList(){
            taskController.getTaskListData(this).then(result=>{
                this.$store.dispatch('AddTaskList', result);
            })
        }
    }
}
</script>

<style lang="css" scoped src="../../assets/css/modulePage.css"></style>