<template>
    <el-row class="panel">
        <!--header-->
        <base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>

        <!--content-->
        <el-col class="panel-center">
            <base-left-Menu :leftMenuArray="leftMenuArray" :activeMenu="activeMenu" @menuIndex="menuIndex"></base-left-Menu>
            <section class="panel-c-c">
                <task-list v-show="activeMenu == '任务列表'" @menuIndex="menuIndex" :taskListData="taskListData"></task-list>
            </section>
        </el-col>

    </el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'
import baseLeftMenu from '../common/baseLeftMenu'
import taskList from './taskList'
import taskController from '../../controller/task'

export default {
    name: 'task',
    data () {
        return {
            titleIcon: 'icon-iconfonttask1',
            titleText: '任务管理',
            titleActionIcon: 'icon-1',
            leftMenuArray:[{
                icon: 'icon-liebiao',
                text: '任务列表'
            },{
                icon: 'icon-plus-creat',
                text: '新建任务'
            }],
            activeMenu: '任务列表',
            taskListData: []
        }
    },
    components:{
        'baseHeader': baseHeader,
        'baseLeftMenu': baseLeftMenu,
        'taskList': taskList
    },
    mounted(){
        this.getTaskList();
    },
    methods:{
        menuIndex(index){
            this.activeMenu = index;
        },
        getTaskList(){
            taskController.getTaskListData(this).then(result=>{
                console.log(result);
                let array = [{
                    text: '近期任务',
                    icon: 'icon-yuandian'
                }]
                this.taskListData = array;
                this.leftMenuArray = this.leftMenuArray.concat(array);
            })
        }
    }
}
</script>

<style lang="css" scoped src="../../assets/css/modulePage.css"></style>