<template>
	<div class="creat-password-wrap">
		<strong class="online-player" v-text="isEdit ? '编辑任务' : '新建任务'"></strong>
		<el-form ref="taskForm" :rules="taskRules" :model="taskForm" label-width="100px" :class="isEdit ? 'less-width' : 'more-width' ">
			<!-- 任务名称 -->
            <el-form-item label="任务名称" label-width="100px" prop="title">
				<el-input type="text" v-model="taskForm.title" auto-complete="off"></el-input>
			</el-form-item>

            <!-- 所属项目 -->
            <el-form-item label="所属项目" label-width="100px" prop="type">
                <el-select v-model="taskForm.type" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in taskListData"
                        :key="index"
                        v-if="item._id != 'default'"
                        :label="item.text"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- 任务标签 -->
            <el-form-item label="任务标签">
                <el-checkbox-group v-model="taskForm.tag">
                    <el-checkbox v-for="item in tagArray" :key="item._id" :label="item._id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!-- 任务截止时间 -->
            <el-form-item label="截止时间">
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        id="taskFormDate"
                        v-model="taskForm.date"
                        style="width: 100%;"
                    >
                    </el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-select
                        placeholder="选择时间"
                        id="taskFormTime"
                        v-model="taskForm.time"
                        style="width: 100%;"
                        :picker-options="{
                            start: '00:30',
                            step: '00:30',
                            end: '24:00'
                        }"
                    >
                    </el-time-select>
                </el-col>
            </el-form-item>

            <!-- 是否完成 -->
            <el-form-item label="是否完成" label-width="100px" prop="isComplete">
                <el-switch v-model="taskForm.isComplete"></el-switch>
            </el-form-item>

            <!-- 优先级 -->
			<el-form-item label="优先级" prop="importance">
			    <el-radio-group v-model="taskForm.importance">
                    <el-radio v-for="item in importanceArray" :key="item.text" :label="item.text"></el-radio>
			    </el-radio-group>
			</el-form-item>

            <!-- 任务描述 -->
			<el-form-item label="任务描述" label-width="100px" prop="notes">
				<el-input type="textarea" :rows="4" v-model="taskForm.notes" auto-complete="off"></el-input>
			</el-form-item>

            <!-- 操作按钮 -->
			<el-form-item>
				<el-button @click="closeRightDrawer" v-if="isEdit">关闭</el-button>
				<el-button @click="resetForm('taskForm')" v-else>重置</el-button>
			    <el-button type="primary" @click="doClickTaskItemBtn(true)" v-if="isEdit">修改任务</el-button>
                <el-button type="primary" @click="doClickTaskItemBtn" v-else>立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import taskController from '../../controller/task';
import { message } from '../../assets/utils/utils';
import { mapGetters } from 'vuex';
import {
    importanceArray
} from '../../config/taskConfig';

export default {
  	name: 'creatTaskItem',
  	props: ['isEdit'],
  	data() {
	    return {
            importanceArray: importanceArray,
	    	taskForm:{
				title: '',
                date: '',
                time: '',
                tag: [],
                isComplete: false,
		      	type: '',
		      	importance: importanceArray[0].text,
		      	notes: '',
                _id: ''
	    	},
            taskRules: {
                title: {
                    required: true,
                    message: '请输入任务名称！',
                    trigger: 'blur'
                },
                type: {
                    required: true,
                    message: '请选择所属项目',
                    trigger: 'change'
                }
            }
	    }
  	},
    computed: {
        ...mapGetters({
            taskListData: 'taskList',
            tagArray: 'tagArray',
            editTaskItemData: 'editTaskItemData',
            taskItemData: 'taskItemData',
        })
    },
    watch:{
        editTaskItemData: function(editData){
            if(!this.isEdit){
                return;
            }
            this.taskForm = JSON.parse(JSON.stringify(editData.data));
        }
    },
  	methods:{
        doClickTaskItemBtn(isModify){
            if(!taskController.doCheckOutTaskMsg(this)){
                return;
            }
            if(isModify == true){
                this.doCheckIsNeedChange();
            }else{
                this.doCreatTaskItem();
            }
        },
        doCreatTaskItem(){
            taskController.doCreatTaskItemData(this).then(taskItemData => {
                for (let i = 0; i < this.taskListData.length; i++) {
                    if(this.taskListData[i]._id == taskItemData.type){
                        this.$emit('menuIndex', this.taskListData[i].text, taskItemData);
                        this.resetTaskForm();
                        return;
                    }
                }
            })
        },
        doCheckIsNeedChange(){
            let shouldUpdate = false;
            for (let i in this.editTaskItemData.data) {
                if(this.editTaskItemData.data[i] !== this.taskForm[i]){
                    shouldUpdate = true;
                }
            }
            if(shouldUpdate){
                this.doChangeTaskItem();
            }else{
                message(this, '任务信息相同,不需要修改!', 'warning');
            }
        },
        doChangeTaskItem(){
            const {
                data
            } = this.editTaskItemData;
            const taskItemData = JSON.parse(JSON.stringify(this.taskForm));
            taskController.updateTask(this).then(result =>{
                if(taskItemData.isComplete !== data.isComplete || taskItemData.type !== data.type){
                    //类型有改变的处理方式
                    let taskItemArrayData = [];
                    taskItemArrayData.push(taskItemData);
                    this.$store.dispatch("DeleteTaskItem", taskItemArrayData);
                    if(taskItemData.isComplete !== data.isComplete && taskItemData.type === data.type){
                        //只有tab改变的处理方式
                        const type = taskItemData.isComplete ? 'complete' : 'uncomplete';
                        this.$store.dispatch("UpdateActiveTaskItemType", type);
                        if(this.taskItemData[type].isRequest){
                            this.$store.dispatch('AddTaskItem', taskItemData);
                        }else{
                            this.$parent.$parent.getTaskItem();
                        }
                    }else{
                        //凡是有taskListType改变的处理方式
                        for (let i = 0; i < this.taskListData.length; i++) {
                            if(this.taskListData[i]._id == taskItemData.type){
                                this.$parent.$parent.$parent.$parent.$parent.menuIndex(this.taskListData[i].text, taskItemData);
                                break;
                            }
                        }
                    }
                }else{
                    //类型无改变的处理方式
                    this.$store.dispatch("UpdateTaskItem", taskItemData);
                }
                this.closeRightDrawer();
                this.resetTaskForm();
            })
        },
  		resetTaskForm(){
            this.taskForm.date = '';
            this.taskForm.time = '';
            this.taskForm.tag = [];
  			this.$refs['taskForm'].resetFields();
  		},
  		closeRightDrawer(){
            console.log(this.$root);
  			this.$emit('closeRightDrawer');
  		}
  	}
}

</script>


<style lang="css" scoped>
.creat-password-wrap{
    margin-bottom: 80px;
}
.online-player{
	width: 100%;
    float: left;
    color: rgb(71, 86, 105);
    margin: 20px 0 20px 20px;
}
.more-width{
	width: 600px;
}
.less-width{
	width: 600px;
}
.el-select-width{
	width: 100px;
}
.line{
    text-align: center;
}
</style>