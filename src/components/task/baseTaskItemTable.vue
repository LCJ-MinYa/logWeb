<template></template>

<script>
import {
    importanceArray
} from '../../config/taskConfig';
import taskController from '../../controller/task';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: 'baseTaskItemTable',
    props: ["tableData"],
    data () {
        return {
            multipleSelection: [],
            importanceArray: importanceArray
        }
    },
    computed: {
        ...mapGetters({
            tagArray: 'tagArray',
            activeTaskListType: 'activeTaskListType',
        })
    },
    methods: {
        handleBegin(index, row){
            const status = this.taskStatus(row);
            if(status){
                taskController.beginTask(this, row).then(result =>{
                    this.$store.dispatch('UpdateTaskItem', result);
                })
            }else{
                taskController.endTask(this, row).then(result =>{
                    this.$store.dispatch('UpdateTaskItem', result);
                })
            }
        },
        handleEdit(index, row){
            let data = {
                index: index,
                data: row
            }
            this.$store.dispatch('EditTaskItem', data);
            this.$emit('handleEdit');
        },
        handleDelete(index, row){
            //确认提示
            this.$confirm('此操作将删除当前任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                taskController.deleteTask(this, row).then(result =>{
                    let taskItemArrayData = [];
                    taskItemArrayData.push(row);
                    this.$store.dispatch("DeleteTaskItem", taskItemArrayData);
                })
            }).catch(err=>{})
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleSelectionSelect(val){
            //确认提示
            this.$confirm('此操作将完成当前所有勾选任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.dealCompleteTask(val);
            }).catch(err=>{
                this.$refs.taskItemTable.clearSelection();
            })
        },
        dealCompleteTask(taskItemArrayData){
            taskController.completeTask(this, taskItemArrayData).then(result =>{
                this.$store.dispatch("DeleteTaskItem", result);
                //完成任务时不更改tab导航 => 未请求过的通过点击tab事件自动触发获取数据
                if(this.$store.state.task.taskItem[this.activeTaskListType]['complete'].isRequest){
                    //该任务类型请求过数据,直接update
                    this.$store.dispatch("UpdateCompleteTaskItem", result);
                }
            })
        },
        filterImportance(value, row){
            return row.importance === value;
        },
        importanceTagType: function(importance){
            switch(importance){
                case '普通':
                    return 'info';
                case '优先':
                    return 'warning';
                case '紧急':
                    return 'danger';
                default:
                    return 'success';
            }
        },
        taskTimeText(data){
            return data.date ? data.date + ' ' + data.time : '无';
        },
        taskIsTimeOut(data, isComplete){
            let isOutTimeObj = {};
            let outTime = 0;
            if(isComplete){
                if(data.date && data.time && data.completeDate){
                    outTime = moment(data.date + ' ' + data.time).diff(moment(data.completeDate), 'minutes');
                }
            }else{
                if(data.date && data.time){
                    outTime = moment(data.date + ' ' + data.time).diff(moment(), 'minutes');
                }
            }
            const isTimeout = outTime < 0 ? true : false;
            isOutTimeObj.timeout = isTimeout;
            isOutTimeObj.text = isTimeout ? '＋' : '';
            if(isTimeout){
                isOutTimeObj.text += (- outTime / 60 / 24).toFixed(2) + '天';
            }
            return isOutTimeObj;
        },
        tagText(tagData){
            let tagText = '';
            for (let i = 0; i < tagData.length; i++) {
                for (let j = 0; j < this.tagArray.length; j++) {
                    if(tagData[i] == this.tagArray[j]._id){
                        if(i == tagData.length - 1){
                            tagText += this.tagArray[j].name;
                        }else{
                            tagText += this.tagArray[j].name + '，';
                        }
                    }
                }
            }
            return tagText || '无';
        },
        notesText(notes){
            let newNotesText = notes.replace(/\n/g, '<br/>');
            return newNotesText;
        },
        taskStatus(data){
            return data.beginDate.length === data.endDate.length ? true : false;
        },
        taskTypeStatus(data){
            const status = this.taskStatus(data);
            return status ? 'success' : 'warning';
        },
        taskTextStatus(data){
            const status = this.taskStatus(data);
            return status ? '开始' : '停止';
        }
    }
}
</script>

<style lang="css" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand .el-form-item {
    margin-bottom: 0;
    margin-left: 60px;
    width: 40%;
}
.task-detail{
    width: 95%!important;
}
</style>