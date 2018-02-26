<template>
	<!--header-->
	<el-col :span="24" class="header-height panel-top">
		<el-col :span="20" class="header-height">
			<i v-if="titleIcon" class="iconfont" :class="titleIcon"></i>
			<span v-if="titleText">{{titleText}}</span>
		</el-col>
		<el-col :span="4" v-if="titleActionIcon">
			<div class="tip-logout">
				<i class="iconfont" :class="titleActionIcon"></i>
			</div>
		</el-col>
	</el-col>
</template>

<script>
export default {
  	name: 'baseHeader',
  	props: ["titleIcon", "titleText", "titleActionIcon"],
  	data () {
    	return {

    	}
  	}
}
</script>

<style lang="css" scoped>
/*顶部展示栏*/
.header-height{
	height: 60px;
	line-height: 60px;
}
.panel-top {
	background: #1f2d3d;
	color: #eacb20;
}
.icon-mimajiesuo01{
	font-size: 25px;
	padding: 0 5px 0 20px;
}
.tip-logout {
	float: right;
	margin: 0 20px;
	cursor: pointer;
}
.icon-1{
	font-size: 26px;
}
</style>