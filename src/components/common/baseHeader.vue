<template>
	<!--header-->
	<el-col :span="24" class="header-height panel-top">
		<el-col :span="20" class="header-height">
			<i v-if="titleIcon" class="iconfont" :class="titleIcon"></i>
			<span v-if="titleText">{{titleText}}</span>
		</el-col>
		<el-col :span="4" v-if="titleActionIcon">
			<div class="tip-logout">
                <el-tooltip class="item" effect="light" content="返回主页" placement="bottom-end">
                    <i class="iconfont icon-zhuye" :class="titleActionIcon" @click="goBack"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="退出登陆" placement="bottom-end">
                    <i class="iconfont icon-tuichudenglu" :class="titleActionIcon" @click="logout"></i>
                </el-tooltip>
			</div>
		</el-col>
	</el-col>
</template>

<script>
import auth from '../../assets/js/auth';

export default {
  	name: 'baseHeader',
  	props: ["titleIcon", "titleText", "titleActionIcon"],
  	data () {
    	return {

    	}
    },
    methods:{
    	goBack(){
			this.$router.replace('/');
        },
        logout(){
            //确认提示
            this.$confirm('此操作将退出当前账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                auth.logout(this);
            }).catch(err=>{})
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
.panel-top i.iconfont{
    font-size: 25px;
    padding: 0 5px 0 20px;
}
.tip-logout {
	float: right;
	margin: 0 20px;
	cursor: pointer;
}
.title-action-icon{
	font-size: 24px;
}
</style>