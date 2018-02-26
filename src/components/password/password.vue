<template>
	<el-row class="panel">
		<!--header-->
		<base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>

		<el-col :span="24" class="panel-center">
		    <base-left-Menu :leftMenuArray="leftMenuArray"></base-left-Menu>
		    <section class="panel-c-c">
		    </section>
		</el-col>

	</el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'
import baseLeftMenu from '../common/baseLeftMenu'

export default {
  	name: 'Password',
  	data () {
    	return {
    		titleIcon: 'icon-mimajiesuo01',
    		titleText: '密码管理',
    		titleActionIcon: 'icon-1',
    		leftMenuArray:[{
    			icon: 'icon-liebiao',
    			text: '密码列表'
    		},{
    			icon: 'icon-plus-creat',
    			text: '新建密码'
    		}]
    	}
  	},
  	components:{
  		'baseHeader': baseHeader,
  		'baseLeftMenu': baseLeftMenu
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