<template>
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
	    <el-tab-pane label="社交" name="social">
	    	<base-password-table></base-password-table>
	    </el-tab-pane>
	    <el-tab-pane label="购物" name="shopping">配置管理</el-tab-pane>
	    <el-tab-pane label="生活" name="life">角色管理</el-tab-pane>
	    <el-tab-pane label="工作" name="work">定时任务补偿</el-tab-pane>
	    <el-tab-pane label="其他" name="other">定时任务补偿</el-tab-pane>
  	</el-tabs>
</template>

<script>
import basePasswordTable from './basePasswordTable'

export default {
  	name: 'passwordList',
  	data () {
    	return {
    		activeName: 'social'
    	}
  	},
  	components:{
  		'basePasswordTable': basePasswordTable,
  	},
  	methods:{
  		handleClick(tab, event){
  			console.log(tab, event);
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
</style>