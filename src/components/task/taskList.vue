<template>
    <el-main>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in taskArray" :key="index">
                <div
                    class="list-box"
                    :style="{'font-size': !item.id ? '48px' : '18px'}"
                    @click="doAddTaskList"
                >{{item.label}}</div>
            </el-col>

        </el-row>
    </el-main>
</template>

<script>
import taskController from '../../controller/task'

export default {
    name: 'taskList',
    data () {
        return {
            input10: '',
            taskArray: [{
                label: '+',
                id: 0
            }]
        }
    },
    mounted(){
        this.getTaskList();
    },
    methods:{
        getTaskList(){
            taskController.getTaskListData(this).then(result=>{
                console.log(result);
            })
        },
        doAddTaskList(){
            console.log(12);
        }
    },
}
</script>

<style lang="css" scoped>
.list-box{
    margin-bottom: 20px;
    border-radius: 5px;
    height: 120px;
    line-height: 120px;
    color: #324057;
    text-align: center;
    font-weight: bold;
    border: 1px solid #e1e1e1;
    background: #f1f1f1;
    cursor: pointer;
}
</style>