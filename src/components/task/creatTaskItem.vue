<template>
	<div class="creat-password-wrap">
		<strong class="online-player" v-text="isEditPassword ? '编辑任务' : '新建任务'"></strong>
		<el-form ref="taskForm" :model="taskForm" label-width="100px" :class="isEditPassword ? 'less-width' : 'more-width' ">
			<!-- 任务名称 -->
            <el-form-item label="任务名称" label-width="100px" prop="title">
				<el-input type="text" v-model="taskForm.title" auto-complete="off"></el-input>
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

			<el-form-item label="登录账号" label-width="100px" prop="userName">
				<el-input type="text" v-model="taskForm.userName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" label-width="100px" prop="password">
				<el-input type="password" v-model="taskForm.password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类" label-width="100px" prop="type">
				<el-select v-model="taskForm.type" placeholder="请选择">
				    <el-option
				    	v-for="item in []"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  	</el-select>
			</el-form-item>

			<el-form-item label="重要性" prop="importance">
			    <el-radio-group v-model="taskForm.importance">
			      	<el-radio label="普通"></el-radio>
			     	<el-radio label="重要"></el-radio>
			     	<el-radio label="绝密"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="备注" label-width="100px" prop="notes">
				<el-input type="textarea" v-model="taskForm.notes" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="closeRightDrawer" v-if="isEditPassword">关闭</el-button>
				<el-button @click="resetForm('taskForm')" v-else>重置</el-button>
			    <el-button type="primary" @click="doCheckOutPasswordMsg(true)" v-if="isEditPassword">修改密码</el-button>
                <el-button type="primary" @click="doCheckOutPasswordMsg" v-else>立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import passwordController from '../../controller/password'
import { parseUrl, message } from '../../assets/utils/utils'
import { mapGetters } from 'vuex'

export default {
  	name: 'creatPassword',
  	props: ['isEditPassword'],
  	data() {
	    return {
	    	taskForm:{
				title: '',
                date: '',
                time: '',
		    	userName: '',
		    	password: '',
		      	type: '',
		      	importance: '普通',
		      	notes: '',
                _id: ''
	    	},
	    }
  	},
    computed: {
        ...mapGetters({
            editPasswordData: 'editPasswordData',
        })
    },
    watch:{
        editPasswordData: function(editData){
            if(!this.isEditPassword){
                return;
            }
            this.taskForm._id = editData.data._id;
            this.taskForm.title = editData.data.title;
            this.taskForm.userName = editData.data.userName;
            this.taskForm.password = editData.data.password;
            this.taskForm.type = editData.data.type;
            this.taskForm.importance = editData.data.importance;
            this.taskForm.notes = editData.data.notes;
            let urlObj = parseUrl(editData.data.url, this.urlDomainOptions);
            this.taskForm.urlProtocol = urlObj.urlProtocol;
            this.taskForm.url = urlObj.url;
            this.taskForm.urlDomain = urlObj.urlDomain;
        }
    },
  	methods:{
  		doCheckOutPasswordMsg(isChangePwd){
            if(!passwordController.doCheckOutPasswordMsg(this)){
                return;
            }
			if(isChangePwd === true){
                this.doCheckIsNeedChange();
            }else{
                this.doCreatPassword();
            }
  		},
        doCreatPassword(){
            passwordController.doCreatPassword(this)
            .then((passwordData)=>{
                this.$emit('menuIndex', '密码列表', passwordData);
                this.resetForm('taskForm');
            })
        },
        doCheckIsNeedChange(){
            let shouldUpdate = false;
            for (let i in this.editPasswordData.data) {
                if (i == '_id' || i == 'showImportantPassword' || i == 'timestamp' || i == 'uid') {
                    continue;
                }
                if(i == 'url'){
                    let url = this.taskForm.urlProtocol + this.taskForm.url + this.taskForm.urlDomain;
                    if(this.editPasswordData.data[i] !== url){
                        shouldUpdate = true;
                    }
                }else if (this.editPasswordData.data[i] !== this.taskForm[i]) {
                    shouldUpdate = true;
                }
            }
            if(shouldUpdate){
                this.doChangePassword();
            }else{
                message(this, '密码信息相同,不需要修改!', 'warning');
            }
        },
        doChangePassword(){
            passwordController.doChangePassword(this)
            .then((passwordData)=>{
                //如果类型改变，首先删除旧类型内的该条数据
                if(passwordData.type != this.editPasswordData.data.type){
                    this.$store.dispatch("DeleteOldPassword", passwordData);
                }
                setTimeout(()=>{
                    //更改tab导航
                    this.$store.dispatch("UpdateToPasswordType", passwordData.type);
                    if(this.$store.state.password.passwordList[passwordData.type].isRequest){
                        //该密码类型请求过数据,直接update
                        this.$store.dispatch("UpdateToPassword", passwordData);
                    }else{
                        //该密码类型未请求过数据,调用祖先组件方法请求数据，不需要update
                        this.$parent.$parent.getPasswordList();
                    }
                    this.closeRightDrawer();
                    this.resetForm('taskForm');
                }, 10);
            })
        },
  		resetForm(formName){
  			this.taskForm.urlProtocol = this.urlProtocolOptions[0].value;
  			this.taskForm.urlDomain = this.urlDomainOptions[0].label;
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