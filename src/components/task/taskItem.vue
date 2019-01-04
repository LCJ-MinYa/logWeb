<template>
    <div class="password-list-box">
        <el-tabs :value="activeTaskItemType" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in taskItemData" :label="item.label" :key="item.text" :name="item.name">
                <un-complete-task-item-table v-if="activeTaskItemType == 'uncomplete'" :tableData="taskItemData[item.name].data" @handleEdit="handleEdit"></un-complete-task-item-table>
                <complete-task-item-table v-else :tableData="taskItemData[item.name].data" @handleEdit="handleEdit"></complete-task-item-table>
            </el-tab-pane>
        </el-tabs>
        <task-right-drawer :showRightDrawer="showRightDrawer" @closeRightDrawer="closeRightDrawer"></task-right-drawer>
    </div>
</template>

<script>
import completeTaskItemTable from './completeTaskItemTable';
import unCompleteTaskItemTable from './unCompleteTaskItemTable';
import taskController from '../../controller/task';
import { mapGetters } from 'vuex';
import taskRightDrawer from './taskRightDrawer';

export default {
    name: 'taskItem',
    data () {
        return {
            showRightDrawer: false,
        }
    },
    components:{
        'completeTaskItemTable': completeTaskItemTable,
        'unCompleteTaskItemTable': unCompleteTaskItemTable,
        'taskRightDrawer': taskRightDrawer,
    },
    computed: {
        ...mapGetters({
            taskItemData: 'taskItemData',
            activeTaskItemType: 'activeTaskItemType',
            activeTaskListType: 'activeTaskListType',
        })
    },
    methods:{
        handleClick(tab){
            this.$store.dispatch('UpdateActiveTaskItemType', tab.name);
            this.isNeedToRequest(tab.name);
        },
        isNeedToRequest(name){
            if(!this.taskItemData[name].isRequest){
                this.getTaskItem();
            }
        },
        handleEdit(){
            this.showRightDrawer = true;
        },
        getTaskItem(){
            taskController.getTaskItemData(this)
            .then(result =>{
                this.$store.dispatch('AddTaskItem', result);
            })
        },
        closeRightDrawer(){
            this.showRightDrawer = false;
        }
    }
}
</script>

<style lang="css" scoped>
.password-list-box{
    overflow: hidden;
}
</style>