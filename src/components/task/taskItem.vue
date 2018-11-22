<template>
    <div class="password-list-box">
        <el-tabs :value="activeTaskItemType" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tableData[activeTaskListType]" :label="item.label" :key="index" :name="item.name">
                <base-task-item-table :tableData="tableData[activeTaskListType][item.name].data" @handleEdit="handleEdit"></base-task-item-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import baseTaskItemTable from './baseTaskItemTable'
import taskController from '../../controller/task'
import { mapGetters } from 'vuex'

export default {
    name: 'taskItem',
    data () {
        return {

        }
    },
    components:{
        'baseTaskItemTable': baseTaskItemTable,
    },
    mounted(){

    },
    computed: {
        ...mapGetters({
            tableData: 'taskItem',
            activeTaskItemType: 'activeTaskItemType',
            activeTaskListType: 'activeTaskListType',
        })
    },
    methods:{
        handleClick(tab){

        },
        handleEdit(){

        }
    }
}
</script>

<style lang="css" scoped>
.password-list-box{
    overflow: hidden;
}
</style>