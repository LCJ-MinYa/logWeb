<template>
    <el-main>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in taskListData" :key="index">
                <el-tooltip effect="dark" placement="bottom" open-delay="300" v-if="item.details && item._id">
                    <div slot="content">{{item.details}}</div>
                    <div
                        v-if="item._id"
                        class="list-box"
                        @click="goTaskListDetail(item.text)"
                    >{{item.text}}</div>
                </el-tooltip>
                <div
                    v-if="item._id && !item.details"
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
            this.$prompt('请输入项目名称', '项目名称', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '项目名称不能为空'
            }).then(({ value }) => {
                taskController.doAddTaskListData(this, value).then(data =>{
                    let addTaskListArray = [{
                        text: value,
                        _id: data._id
                    }]
                    this.$store.dispatch('UpdateTaskList', addTaskListArray);
                })
            }).catch((err) => {});
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
    color: #777;
    text-align: center;
    font-weight: bold;
    border: 1px solid #e1e1e1;
    background: #f1f1f1;
    cursor: pointer;
    font-size: 18px;
}
</style>