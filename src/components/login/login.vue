<template>
	<div class="global-page" @keyup.enter="checkOutMsg">
		<div class="login-box">
			<div class="left-box">
				<i class="iconfont icon-zhandian"></i>
				<h1>恣意游</h1>
				<ul class="list">
					<li><i class="iconfont icon-lingxing"></i>常用搜索网址导航</li>
					<li><i class="iconfont icon-lingxing"></i>不再遗忘非常用密码</li>
					<li><i class="iconfont icon-lingxing"></i>自定义任务编辑和完成</li>
                    <li><i class="iconfont icon-lingxing"></i>更多添加中...</li>
				</ul>
			</div>

			<div class="right-box">
				<div class="input-box">
					<el-input
					    placeholder="请输入账号"
					    v-model="email">
					    <i slot="prefix" class="iconfont icon-1"></i>
				  	</el-input>
				</div>

				<div class="input-box">
					<el-input
						type="password"
					    placeholder="请输入密码"
					    v-model="password">
					    <i slot="prefix" class="iconfont icon-password"></i>
				  	</el-input>
				</div>

				<div class="input-box">
                    <el-tooltip class="item" effect="dark" content="暂不开放注册，请使用一键登陆" placement="top">
                        <div class="disabled-box">
                            <el-button type="info" disabled>注册</el-button>
                        </div>
                    </el-tooltip>
			  		<el-button type="primary" @click="checkOutMsg">登录</el-button>
                    <el-button type="success" @click="oneKeyLogin">一键登录</el-button>
			  	</div>
			</div>
		</div>
	</div>
</template>

<script>
import LoginController from '../../controller/login'

export default {
    name: 'Login',
    data () {
        return {
        	email: '',
            password: '',
        }
    },
    methods:{
    	checkOutMsg: function(){
    		if(LoginController.doCheckOutMsg(this)){
    			LoginController.doLogin(this);
    		}
        },
        oneKeyLogin(){
            this.email = 'ceshi@ziyiu.com';
            this.password = '123456';
            this.checkOutMsg();
        }
    }
}
</script>

<style lang="css" scoped>
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
.icon-zhandian{
	display: block;
	font-size: 60px;
	color: #fff;
	text-align: center;
	padding: 40px 0 20px;
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
	width: 80%;
	margin: 30px 0 0 10%;
    text-align: right;
}
.disabled-box{
    display: inline-block;
    margin-right: 10px;
}
</style>