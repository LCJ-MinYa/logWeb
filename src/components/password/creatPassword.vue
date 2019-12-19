<template>
	<div class="creat-password-wrap">
		<strong class="online-player" v-text="isEdit ? '编辑密码' : '新建密码'"></strong>
		<el-form ref="passwordForm" :model="passwordForm" label-width="100px" :class="isEdit ? 'less-width' : 'more-width' ">
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
				<el-button @click="closeRightDrawer" v-if="isEdit">关闭</el-button>
				<el-button @click="resetForm('passwordForm')" v-else>重置</el-button>
			    <el-button type="primary" @click="doCheckOutPasswordMsg(true)" v-if="isEdit">修改密码</el-button>
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
  	props: ['isEdit'],
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
	        	value: 'social',
	        	label: '社交'
	      	}, {
	        	value: 'shopping',
	        	label: '购物'
	      	}, {
	        	value: 'life',
	        	label: '生活'
	      	}, {
	        	value: 'work',
	        	label: '工作'
	      	}, {
	        	value: 'other',
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
            if(!editData.data.hasOwnProperty('_id')){
                return;
            }
            if(!this.isEdit){
                return;
            }
            this.passwordForm._id = editData.data._id;
            this.passwordForm.title = editData.data.title;
            this.passwordForm.userName = editData.data.userName;
            this.passwordForm.password = editData.data.password;
            this.passwordForm.type = editData.data.type;
            this.passwordForm.importance = editData.data.importance;
            this.passwordForm.notes = editData.data.notes;
            let urlObj = parseUrl(editData.data.url, this.urlDomainOptions);
            this.passwordForm.urlProtocol = urlObj.urlProtocol;
            this.passwordForm.url = urlObj.url;
            this.passwordForm.urlDomain = urlObj.urlDomain;
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
                this.resetForm('passwordForm');
            })
        },
        doCheckIsNeedChange(){
            let shouldUpdate = false;
            for (let i in this.editPasswordData.data) {
                if (i == '_id' || i == 'showImportantPassword' || i == 'timestamp' || i == 'uid') {
                    continue;
                }
                if(i == 'url'){
                    let url = this.passwordForm.urlProtocol + this.passwordForm.url + this.passwordForm.urlDomain;
                    if(this.editPasswordData.data[i] !== url){
                        shouldUpdate = true;
                    }
                }else if (this.editPasswordData.data[i] !== this.passwordForm[i]) {
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
                    this.resetForm('passwordForm');
                }, 10);
            })
        },
  		resetForm(formName){
  			this.passwordForm.urlProtocol = this.urlProtocolOptions[0].value;
  			this.passwordForm.urlDomain = this.urlDomainOptions[0].label;
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
</style>