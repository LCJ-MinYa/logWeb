<template>
	<el-row class="panel">
		<!--header-->
		<base-header :titleIcon="titleIcon" :titleText="titleText" :titleActionIcon="titleActionIcon"></base-header>

		<!--content-->
		<el-col class="panel-center">
		    <base-left-Menu :leftMenuArray="leftMenuArray" :activeMenu="activeMenu" @menuIndex="menuIndex"></base-left-Menu>
		    <section class="panel-c-c">
		    	<password-list ref="passwordList" v-show="activeMenu == '密码列表'"></password-list>
				<creat-password @menuIndex="menuIndex" v-show="activeMenu == '新建密码'"></creat-password>
            </section>
		</el-col>

	</el-row>
</template>

<script>
import baseHeader from '../common/baseHeader'
import baseLeftMenu from '../common/baseLeftMenu'
import creatPassword from './creatPassword'
import passwordList from './passwordList'

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
    	}
  	},
  	components:{
  		'baseHeader': baseHeader,
  		'baseLeftMenu': baseLeftMenu,
  		'creatPassword': creatPassword,
  		'passwordList': passwordList
  	},
  	methods:{
  		menuIndex(index, passwordData){
  			this.activeMenu = index;
            if(passwordData){
                this.$store.dispatch("UpdateToPasswordType", passwordData.type);
                if(this.$store.state.password.passwordList[passwordData.type].isRequest){
                    //该密码类型请求过数据,直接push
                    this.$store.dispatch("AddToPasswordList", passwordData);
                }else{
                    //该密码类型未请求过数据,调用子组件方法请求数据，不需要push
                    this.$refs['passwordList'].getPasswordList();
                }
            }
  		},
  	}
}
</script>

<style lang="css" scoped src="../../assets/css/modulePage.css"></style>