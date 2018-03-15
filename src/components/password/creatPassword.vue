<template>
	<div @keyup.enter="doCheckOutPasswordMsg">
		<strong class="online-player">新建密码</strong>
		<el-form ref="passwordForm" :model="passwordForm" label-width="100px">
			<el-form-item label="密码名称" label-width="100px" prop="title">
				<el-input type="text" v-model="passwordForm.title" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品网址" label-width="100px" prop="url">
				<el-input type="text" v-model="passwordForm.url" auto-complete="off">
					<el-select v-model="passwordForm.urlProtocol" slot="prepend" placeholder="请选择" class="el-select-width">
      					<el-option
							v-for="item in urlProtocolOptions"
					      	:key="item.value"
					      	:label="item.value"
					      	:value="item.value"	
      					>
      					</el-option>
    				</el-select>
					<el-select v-model="passwordForm.urlDomain" slot="append" placeholder="请选择" class="el-select-width">
      					<el-option
							v-for="item in urlDomainOptions"
					      	:key="item.value"
					      	:label="item.label"
					      	:value="item.value"	
      					>
      					</el-option>
    				</el-select>
				</el-input>
			</el-form-item>
			<el-form-item label="登录账号" label-width="100px" prop="userName">
				<el-input type="text" v-model="passwordForm.userName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" label-width="100px" prop="password">
				<el-input type="password" v-model="passwordForm.password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类" label-width="100px" prop="type">
				<el-select v-model="passwordForm.type" placeholder="请选择">
				    <el-option
				    	v-for="item in typeOptions"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  	</el-select>
			</el-form-item>

			<el-form-item label="重要性" prop="importance">
			    <el-radio-group v-model="passwordForm.importance">
			      	<el-radio label="普通"></el-radio>
			     	<el-radio label="重要"></el-radio>
			     	<el-radio label="绝密"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="备注" label-width="100px" prop="notes">
				<el-input type="textarea" v-model="passwordForm.notes" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="resetForm('passwordForm')">重置</el-button>
			    <el-button type="primary" @click="doCheckOutPasswordMsg">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import passwordController from '../../controller/password'

export default {
  	name: 'creatPassword',
  	data() {
	    return {
	    	urlProtocolOptions: [{
	    		value: 'http://'
	    	},{
	    		value: 'https://'
	    	}],
	    	urlDomainOptions: [{
	    		value: '.com',
	    		label: '.com'
	    	},{
	    		value: '.cn',
	    		label: '.cn'
	    	},{
	    		value: '.net',
	    		label: '.net'
	    	},{
	    		value: '.org',
	    		label: '.org'
	    	},{
	    		value: '.com.cn',
	    		label: '.com.cn'
	    	},{
	    		value: '.tv',
	    		label: '.tv'
	    	},{
	    		value: '',
	    		label: '无后缀'
	    	}],
	    	typeOptions: [{
	        	value: '1',
	        	label: '社交'
	      	}, {
	        	value: '2',
	        	label: '购物'
	      	}, {
	        	value: '3',
	        	label: '生活'
	      	}, {
	        	value: '4',
	        	label: '工作'
	      	}, {
	        	value: '5',
	        	label: '其他'
	      	}],
	    	passwordForm:{
				title: '',
		    	url: '',
		    	urlProtocol: 'http://',
		    	urlDomain: '.com',
		    	userName: '',
		    	password: '',
		      	type: '',
		      	importance: '普通',
		      	notes: ''
	    	},
	    }
  	},
  	methods:{
  		doCheckOutPasswordMsg(){
            if(!passwordController.doCheckOutPasswordMsg(this)){
                return;
            }
			passwordController.doCreatPassword(this)
			.then((passwordData)=>{
				this.$emit('menuIndex', '密码列表');
				this.resetForm('passwordForm');
			})
  		},
  		resetForm(formName){
  			this.passwordForm.urlProtocol = this.urlProtocolOptions[0].value;
  			this.passwordForm.urlDomain = this.urlDomainOptions[0].label;
  			this.$refs[formName].resetFields();
  		}
  	}
}

</script>


<style lang="css" scoped>
.online-player{
	width: 100%;
    float: left;
    color: rgb(71, 86, 105);
    margin: 10px 0 20px 10px;
}
.el-form{
	width: 600px;
}
.el-select-width{
	width: 100px;
}
</style>