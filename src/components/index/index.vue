<template>
    <div class="login-page">
    	<div class="login-box">
    		<ul class="module-box">
    			<li>旅行</li>
    			<li>影集</li>
    			<li>约定</li>
    			<li>密码</li>
    			<li>账单</li>
    			<li>设置</li>
    		</ul>
    	</div>
	</div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
        }
    }
}
</script>

<style lang="css" scoped>
.login-page{
	position: fixed;
	width: 100%;
	height: 100%;
	background: url(../../assets/img/login_bg.jpg) no-repeat 50% 50%;	
}
.login-box{
	position: absolute;
	width: 680px;
	height: 320px;
	top: 50%;
	left: 50%;
	margin-left: -350px;
	margin-top: -160px;
}
.module-box{
	display: block;
	position: relative;
	width: 100%;
}
.module-box li{
	width: 220px;
	height: 150px;
	float: left;
	box-shadow: 0px 0px 5px #999;
	-moz-box-shadow: 0px 0px 5px #999;
	-webkit-box-shadow: 0px 0px 5px #999;
	opacity: 0.8;
	margin:5px 10px 5px 0;
	cursor: pointer;
	text-align: center;
	line-height: 150px;
	color: #fff;
	font-size: 28px;
	letter-spacing: 10px;
}
.module-box li:nth-child(1){
	background: #eacb20;
}
.module-box li:nth-child(2){
	background: #c9cc29;
}
.module-box li:nth-child(3){
	background: #e06380;
}
.module-box li:nth-child(4){
	background: #cc6600;
}
.module-box li:nth-child(5){
	background: #f09396;
}
.module-box li:nth-child(6){
	background: #ffcc99;
}
.module-box li:nth-child(3n){
	margin-right: 0px;
}
.module-box li:hover{
	background: #333;
	color: #eacb20;
	transform: translate3d(0,-2px,0);
	-webkit-transform: translate3d(0,-2px,0);
	transition: all .3s ease;
}
</style>
