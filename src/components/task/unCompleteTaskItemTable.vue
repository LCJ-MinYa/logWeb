<template>
    <el-table
        ref="taskItemTable"
        :data="tableData"
        slot="empty"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="handleSelectionSelect"
        @select-all="handleSelectionSelect"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="开始时间" class="task-msg">
                        <span v-if="props.row.beginDate.length == 0"><i class="el-icon-time"></i>无</span>
                        <span v-else v-for="(item, index) in props.row.beginDate" :key="index"><i class="el-icon-time"></i>{{item}}</span>
                    </el-form-item>
                    <el-form-item label="停止时间" class="task-msg">
                        <span v-if="props.row.endDate.length == 0"><i class="el-icon-time"></i>无</span>
                        <span v-else v-for="(item, index) in props.row.endDate" :key="index"><i class="el-icon-time"></i>{{item}}</span>
                    </el-form-item>
                    <el-form-item label="任务标签">
                        <span>{{ tagText(props.row.tag) }}</span>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <span><i class="el-icon-time"></i>{{ props.row.completeDate || '无' }}</span>
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
import baseTaskItemTable from './baseTaskItemTable';

export default {
    name: 'unCompleteTaskItemTable',
    extends: baseTaskItemTable,
}
</script>