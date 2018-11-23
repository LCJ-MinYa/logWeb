<template>
	<div class="creat-password-wrap">
		<strong class="online-player" v-text="isEditTask ? '编辑任务' : '新建任务'"></strong>
		<el-form ref="taskForm" :rules="taskRules" :model="taskForm" label-width="100px" :class="isEditTask ? 'less-width' : 'more-width' ">
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
                    <el-date-picker type="date" placeholder="选择日期" id="taskFormDate" v-model="taskForm.date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" id="taskFormTime" v-model="taskForm.time" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>

            <!-- 是否完成 -->
            <el-form-item label="是否完成" label-width="100px" prop="isComplete">
                <el-switch v-model="taskForm.isComplete"></el-switch>
            </el-form-item>

            <!-- 优先级 -->
			<el-form-item label="优先级" prop="importance">
			    <el-radio-group v-model="taskForm.importance">
			      	<el-radio label="普通"></el-radio>
			     	<el-radio label="优先"></el-radio>
			     	<el-radio label="紧急"></el-radio>
			    </el-radio-group>
			</el-form-item>

            <!-- 任务描述 -->
			<el-form-item label="任务描述" label-width="100px" prop="notes">
				<el-input type="textarea" v-model="taskForm.notes" auto-complete="off"></el-input>
			</el-form-item>

            <!-- 操作按钮 -->
			<el-form-item>
				<el-button @click="closeRightDrawer" v-if="isEditTask">关闭</el-button>
				<el-button @click="resetForm('taskForm')" v-else>重置</el-button>
			    <el-button type="primary" @click="doCreatTaskItem(true)" v-if="isEditTask">修改任务</el-button>
                <el-button type="primary" @click="doCreatTaskItem" v-else>立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import taskController from '../../controller/task'
import { parseUrl, message } from '../../assets/utils/utils'
import { mapGetters } from 'vuex'

export default {
  	name: 'creatPassword',
  	props: ['isEditTask'],
  	data() {
	    return {
            tagArray: [{
                name: '个人',
                _id: 0,
            }, {
                name: '公司',
                _id: 1,
            }, {
                name: '前端',
                _id: 2,
            }, {
                name: '后端',
                _id: 3,
            }, {
                name: 'React Native',
                _id: 4,
            }, {
                name: 'Node',
                _id: 5,
            }, {
                name: 'Vue',
                _id: 6,
            }, {
                name: 'iOS',
                _id: 7,
            }, {
                name: 'Android',
                _id: 8,
            }],
	    	taskForm:{
				title: '',
                date: '',
                time: '',
                tag: [],
                isComplete: false,
		      	type: '',
		      	importance: '普通',
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
                    message: '请选择活动区域',
                    trigger: 'change'
                }
            }
	    }
  	},
    computed: {
        ...mapGetters({
            taskListData: 'taskList',
        })
    },
  	methods:{
        doCreatTaskItem(isModify){
            if(!taskController.doCheckOutTaskMsg(this)){
                return;
            }
            if(isModify == true){

            }else{
                taskController.doCreatTaskItemData(this).then(result => {
                    console.log(result);
                })
            }
        },
  		resetForm(formName){
            this.taskForm.date = '';
            this.taskForm.time = '';
            this.taskForm.tag = [];
  			this.$refs[formName].resetFields();
  		},
  		closeRightDrawer(){
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
	width: 400px;
}
.el-select-width{
	width: 100px;
}
.line{
    text-align: center;
}
</style>