<template>
    <el-table ref="taskItemTable" :data="tableData" slot="empty" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="任务标签">
                        <span>{{ tagText(props.row.tag) }}</span>
                    </el-form-item>
                    <el-form-item label="任务描述">
                        <span>{{ props.row.notes || '无' }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="任务名称"></el-table-column>
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
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
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
import { mapGetters } from 'vuex'

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
            if(data.date){
                return data.date + ' ' + data.time;
            }else{
                return '无';
            }
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
        }
    }
}
</script>

<style lang="css" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand .el-form-item {
    margin-right: 60px;
    margin-bottom: 0;
    margin-left: 60px;
    width: 100%;
}
</style>