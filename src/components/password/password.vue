<template>
	<el-row class="panel">
		<!--header-->
		<base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>

		<el-col :span="24" class="panel-center">
			<aside>
			    <el-menu @select="menuIndex" class="el-menu-vertical-demo" background-color="#324057" active-text-color="#eacb20" text-color="#c0ccda" default-active="1">
			    	<el-menu-item index="1"><i class="iconfont icon-liebiao"></i>密码列表</el-menu-item>
			      	<el-menu-item index="2"><i class="iconfont icon-plus-creat"></i>新建密码</el-menu-item>
			    </el-menu>
		    </aside>
		    <section class="panel-c-c">
		    </section>
		</el-col>

	</el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'

export default {
  	name: 'Password',
  	data () {
    	return {
    		titleIcon: 'icon-mimajiesuo01',
    		titleText: '密码管理',
    		titleActionIcon: 'icon-1'
    	}
  	},
  	components:{
  		'baseHeader': baseHeader,
  	},
  	methods:{
  		menuIndex(index){
  			console.log(index);
  		}
  	}
}
</script>

<style lang="css" scoped>
/*单页全局*/
.panel {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}


/*左侧导航栏*/
.panel-center {
	width: 230px;
	background: #324057;
	position: absolute;
	top: 60px;
	bottom: 0px;
	overflow: hidden;
}
.el-menu-vertical-demo{
	border-right: solid 0px;
}
.el-menu-item.is-active{
	background: #27394E!important;
}
.el-menu-vertical-demo .iconfont{
	padding-right: 5px;
}

/*内容*/
.panel-c-c {
	background: #fff;
	position: absolute;
	right: 0px;
	top: 0px;
	bottom: 0px;
	left: 230px;
	overflow-y: scroll;
	padding: 20px;
}
</style>