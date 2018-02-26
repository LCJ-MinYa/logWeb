<template>
	<aside>
	    <el-menu @select="menuIndex" class="el-menu-vertical-demo" background-color="#324057" active-text-color="#eacb20" text-color="#c0ccda" :default-active="leftMenuArray[0].text">
	    	<el-menu-item v-for="(item, index) in leftMenuArray" :key="index" :index="item.text"><i class="iconfont" :class="item.icon"></i>{{item.text}}</el-menu-item>
	    </el-menu>
    </aside>
</template>

<script>
export default {
  	name: 'baseLeftMenu',
   	props: ["leftMenuArray"],
  	data () {
    	return {

    	}
  	},
  	methods:{
  		menuIndex(index){
  			console.log(index);
  		}
  	}
}
</script>

<style lang="css" scoped>
.el-menu-vertical-demo{
	border-right: solid 0px;
}
.el-menu-item.is-active{
	background: #27394E!important;
}
.el-menu-vertical-demo .iconfont{
	padding-right: 5px;
}
</style>