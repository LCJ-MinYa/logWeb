<template>
    <el-main>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in taskListData" :key="index">
                <div
                    class="list-box"
                    @click="goTaskListDetail(item.text)"
                >{{item.text}}</div>
            </el-col>
            <el-col :span="6">
                <div
                    class="list-box"
                    :style="{'font-size': '48px'}"
                    @click="doAddTaskList"
                >+</div>
            </el-col>

        </el-row>
    </el-main>
</template>

<script>
import taskController from '../../controller/task'

export default {
    name: 'taskList',
    props: ["taskListData"],
    data () {
        return {

        }
    },
    methods:{
        doAddTaskList(){
            console.log(12);
        },
        goTaskListDetail(text){
            this.$emit('menuIndex', text);
        }
    },
}
</script>

<style lang="css" scoped>
.el-breadcrumb{
    height: 50px;
    line-height: 50px;
    border: 1px solid #f1f1f1;
}
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
    font-size: 18px;
}
</style>