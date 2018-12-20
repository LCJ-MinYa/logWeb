<template>
    <el-table ref="taskItemTable" :data="taskItemArrayData" slot="empty" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'baseTaskItemTable',
    props: ["tableData"],
    data () {
        return {
            multipleSelection: []
        }
    },
    computed: {
        ...mapGetters({
            taskItemArrayData: 'taskItemArrayData',
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
        }
    }
}

</script>