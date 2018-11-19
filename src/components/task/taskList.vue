<template>
    <el-main>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in taskArray" :key="index">
                <div class="list-box">{{item.label}}</div>
            </el-col>

        </el-row>
    </el-main>
</template>

<script>
export default {
    name: 'taskList',
    data () {
        return {
            taskArray: [{
                label: '长期任务',
                id: 1
            },{
                label: '长期任务',
                id: 1
            },{
                label: '长期任务',
                id: 1
            },{
                label: '长期任务',
                id: 1
            },{
                label: '长期任务',
                id: 1
            },{
                label: '长期任务',
                id: 1
            }]
        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style lang="css" scoped>
.list-box{
    margin-bottom: 20px;
    border-radius: 5px;
    height: 100px;
    line-height: 100px;
    color: #324057;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    border: 1px solid #e1e1e1;
    background: #f1f1f1;
}
</style>