<template>
    <el-table ref="taskItemTable" :data="tableData" slot="empty" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="任务标签">
                        <span>{{ props.row.tag }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="任务名称"></el-table-column>
        <el-table-column
            prop="importance"
            label="优先级"
            width="100"
            :filters="importanceArray"
            :filter-method="filterImportance"
            filter-placement="bottom-end"
        >
            <template slot-scope="scope">
                <el-tag :type="importanceTagType(scope.row.importance)" disable-transitions>{{scope.row.importance}}</el-tag>
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
        }
    }
}

</script>