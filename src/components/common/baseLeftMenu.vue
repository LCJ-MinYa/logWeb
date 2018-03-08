<template>
	<aside class="left-content">
	    <el-menu @select="menuIndex" class="el-menu-vertical-demo" background-color="#324057" active-text-color="#eacb20" text-color="#c0ccda" :default-active="activeMenu" :active="activeMenu">
	    	<el-menu-item v-for="(item, index) in leftMenuArray" :key="index" :index="item.text"><i class="iconfont" :class="item.icon"></i>{{item.text}}</el-menu-item>
	    </el-menu>
    </aside>
</template>

<script>
export default {
  	name: 'baseLeftMenu',
   	props: ["leftMenuArray", "activeMenu"],
  	data () {
    	return {

    	}
  	},
  	methods:{
  		menuIndex(index){
            this.$emit('menuIndex', index);
  		}
  	}
}
</script>

<style lang="css" scoped>
.left-content{
    width: 230px;
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
</style>