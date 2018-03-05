<template>
	<div @keyup.enter="doCheckOutPasswordMsg">
		<strong class="online-player">新建密码</strong>
		<el-form label-width="100px">
			<el-form-item label="密码名称" label-width="100px">
				<el-input type="text" v-model="name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品网址" label-width="100px">
				<el-input type="text" v-model="url" auto-complete="off">
					<el-select v-model="urlProtocol" slot="prepend" placeholder="请选择" class="el-select-width">
      					<el-option label="http://" value="http://"></el-option>
      					<el-option label="https://" value="https://"></el-option>
    				</el-select>
					<el-select v-model="urlDomain" slot="append" placeholder="请选择" class="el-select-width">
      					<el-option label=".com" value=".com"></el-option>
      					<el-option label=".cn" value=".cn"></el-option>
      					<el-option label=".net" value=".net"></el-option>
      					<el-option label=".org" value=".org"></el-option>
      					<el-option label=".com.cn" value=".com.cn"></el-option>
      					<el-option label=".tv" value=".tv"></el-option>
    				</el-select>
				</el-input>
			</el-form-item>
			<el-form-item label="登录账号" label-width="100px">
				<el-input type="text" v-model="userName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" label-width="100px">
				<el-input type="password" v-model="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类" label-width="100px">
				<el-select v-model="type" placeholder="请选择">
				    <el-option
				    	v-for="item in options"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  	</el-select>
			</el-form-item>

			<el-form-item label="重要性" >
			    <el-radio-group v-model="importance">
			      	<el-radio label="普通"></el-radio>
			     	<el-radio label="重要"></el-radio>
			     	<el-radio label="绝密"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="备注" label-width="100px">
				<el-input type="textarea" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button>重置</el-button>
			    <el-button type="primary">立即创建</el-button>
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
	    	name: '',
	    	url: '',
	    	urlProtocol: 'http://',
	    	urlDomain: '.com',
	    	userName: '',
	    	password: '',
	      	options: [{
	        	value: 0,
	        	label: '服务器'
	      	}, {
	        	value: 1,
	        	label: '数据库'
	      	}, {
	        	value: 2,
	        	label: '生活'
	      	}, {
	        	value: 3,
	        	label: '网站'
	      	}, {
	        	value: 4,
	        	label: '其他'
	      	}],
	      	type: '',
	      	importance: '普通',
	    }
  	},
  	methods:{
  		doCheckOutPasswordMsg(){
  			if(passwordController.doCheckOutPasswordMsg(this)){
  				passwordController.doCreatPassword(this);
  			}
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