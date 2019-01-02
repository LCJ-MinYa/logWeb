<template>
    <el-table ref="taskItemTable" :data="tableData" slot="empty" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="开始时间" class="task-msg">
                        <span v-if="props.row.beginDate.length == 0">无</span>
                        <span v-else v-for="(item, index) in props.row.beginDate" :key="index">{{item}}</span>
                    </el-form-item>
                    <el-form-item label="停止时间" class="task-msg">
                        <span v-if="props.row.endDate.length == 0">无</span>
                        <span v-else v-for="(item, index) in props.row.endDate" :key="index">{{item}}</span>
                    </el-form-item>
                    <el-form-item label="任务标签">
                        <span>{{ tagText(props.row.tag) }}</span>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <span>{{ props.row.completeDate || '无' }}</span>
                    </el-form-item>
                    <el-form-item label="任务描述" class="task-detail">
                        <span v-html="notesText(props.row.notes) || '无'"></span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="任务名称"></el-table-column>
        <el-table-column label="任务耗时">
            <template slot-scope="scope">
                <span>{{scope.row.totalTime + '小时'}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="截止时间"
            width="280"
        >
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{taskTimeText(scope.row)}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="importance"
            label="优先级"
            width="100"
            :filters="importanceArray"
            :filter-method="filterImportance"
            filter-placement="bottom-end"
        >
            <template slot-scope="scope">
                <el-tag :type="importanceTagType(scope.row.importance)" disable-transitions>{{scope.row.importance || '无'}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
            <template slot-scope="scope">
                <el-button size="mini" :type="taskTypeStatus(scope.row)" @click="handleBegin(scope.$index, scope.row)">{{ taskTextStatus(scope.row) }}</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {
    importanceArray
} from '../../config/taskConfig';
import taskController from '../../controller/task';
import { mapGetters } from 'vuex';

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
            console.log(this);
        },
        handleDelete(index, row){

        },
        handleSelectionChange(val){
            this.multipleSelection = val;
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