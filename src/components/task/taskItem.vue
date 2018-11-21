<template>
    <div class="password-list-box">
        <el-tabs :value="activeTaskItem" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tableArray" :label="item.label" :key="index" :name="item.name">
                <base-task-item-table :tableData="tableData[item.name].data" @handleEdit="handleEdit"></base-task-item-table>
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
            tableArray: [{
                label: '未完成',
                name: 'uncomplete',
                data: []
            },{
                label: '已完成',
                name: 'complete',
                data: []
            }]
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
            activeTaskItem: 'activeTaskItem'
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