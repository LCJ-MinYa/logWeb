<template>
	<el-row class="panel">
		<!--header-->
		<base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>
		
		<!--content-->
		<el-col class="panel-center">
		    <base-left-Menu :leftMenuArray="leftMenuArray" :activeMenu="activeMenu" @menuIndex="menuIndex"></base-left-Menu>
		    <section class="panel-c-c">
		    	<password-list v-show="showMenuIndex == '密码列表'"></password-list>
				<creat-password @menuIndex="menuIndex" v-show="showMenuIndex == '新建密码'"></creat-password>
		    </section>
		</el-col>

	</el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'
import baseLeftMenu from '../common/baseLeftMenu'
import creatPassword from './creatPassword'
import passwordList from './passwordList'
import { mapGetters, mapActions } from 'vuex'

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
    		}],
    		activeMenu: '密码列表',
    		showMenuIndex: '密码列表'
    	}
  	},
  	components:{
  		'baseHeader': baseHeader,
  		'baseLeftMenu': baseLeftMenu,
  		'creatPassword': creatPassword,
  		'passwordList': passwordList
  	},
  	mounted(){
  		console.log(this.$store.state);
  	},
  	watch: {
  		showMenuIndex: function(){
  			if(this.showMenuIndex == "新建密码"){
  				this.activeMenu = "新建密码";
  			}else{
  				this.activeMenu = "密码列表";
  			}
  		}
  	},
  	methods:{
  		menuIndex(index){
  			this.showMenuIndex = index;
  		},
  	}
}
</script>

<style lang="css" scoped>
/*单页全局*/
.panel {
	position: fixed;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

/*左侧导航栏*/
.panel-center {
	width: 100%;
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