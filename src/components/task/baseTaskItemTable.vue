<template>
    <el-table ref="taskItemTable" :data="tableData" slot="empty" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="url" label="网址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

export default {
    name: 'baseTaskItemTable',
    props: ["tableData"],
    data () {
        return {
            multipleSelection: []
        }
    },
    methods: {
        handleEdit(index, row){

        },
        handleDelete(index, row){

        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        }
    }
}

</script>