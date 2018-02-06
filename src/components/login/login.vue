<template>
    <div class="login-page">
		<div class="login-box">
			<div class="left-box">
				<i class="iconfont icon-mimajiesuo01"></i>
				<h1>密码管家</h1>
				<ul class="list">
					<li><i class="iconfont icon-lingxing"></i>随时随地，随手可记录</li>
					<li><i class="iconfont icon-lingxing"></i>生活小助手，不再遗忘密码</li>
					<li><i class="iconfont icon-lingxing"></i>自定义编辑和推荐记录结合</li>
				</ul>
			</div>

			<div class="right-box">
				<div class="input-box">
					<el-input
					    placeholder="请输入账号"
					    v-model="username">
					    <i slot="prefix" class="iconfont icon-1"></i>
				  	</el-input>
				</div>

				<div class="input-box">
					<el-input
					    placeholder="请输入密码"
					    v-model="password">
					    <i slot="prefix" class="iconfont icon-password"></i>
				  	</el-input>
				</div>
				
				<div class="input-box">
			  		<el-button type="primary" @click="checkOutMsg">提交</el-button>
			  	</div>
			</div>
		</div>
    </div>
</template>

<style lang="css" scoped>
.login-page{
	position: fixed;
	width: 100%;
	height: 100%;
	background: url(../../assets/img/login_bg.jpg) no-repeat 50% 50%;	
}
.login-box{
	position: absolute;
	width: 700px;
	height: 400px;
	background: #fff;
	top: 50%;
	left: 50%;
	margin-left: -350px;
	margin-top: -200px;
	box-shadow: 0px 0px 10px #999;
	-moz-box-shadow: 0px 0px 10px #999;
	-webkit-box-shadow: 0px 0px 10px #999;
}
.left-box{
	position: relative;
	width: 40%;
	height: 400px;
	background: #eacb20;
	float: left;
}
.icon-mimajiesuo01{
	display: block;
	font-size: 60px;
	color: #fff;
	text-align: center;
	padding: 50px 0 20px;
}
.left-box h1{
	text-align: center;
	color: #fff;
	font-size: 32px;
}
.list{
	margin-top: 30px; 
}
.list li{
	color: #fff;
	font-size: 16px;
	padding-left: 20px;
	line-height: 250%;
	overflow: hidden;
}
.list li i{
	padding: 0 10px;
}
.right-box{
	float: right;
	width: 60%;
	height: 400px;
	padding-top: 90px;
}
.icon-1{
	line-height: 40px;
	font-size: 20px;
}
.icon-password{
	line-height: 40px;
	font-size: 16px;
	padding-left: 2px;
}
.input-box{
	width: 60%;
	margin: 30px 0 0 10%;
}
</style>

<script>
import LoginController from '../../controller/login'

export default {
    name: 'Login',
    data () {
        return {
        	username: '',
        	password: '',
        }
    },
    methods:{
    	checkOutMsg: function(){
    		if(LoginController.doCheckOutMsg(this)){
    			LoginController.doLogin(this);
    		}
    	}
    }
}
</script>