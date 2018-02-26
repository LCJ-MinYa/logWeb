<template>
	<div>
		<strong class="online-player">新建密码</strong>
		<el-form label-width="100px">
			<el-form-item label="密码名称" label-width="100px">
				<el-input type="text" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品网址" label-width="100px">
				<el-input type="text" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="登录账号" label-width="100px">
				<el-input type="text" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" label-width="100px">
				<el-input type="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="重要性" prop="resource">
			    <el-radio-group>
			      	<el-radio label="普通"></el-radio>
			     	<el-radio label="重要"></el-radio>
			     	<el-radio label="绝密"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="备注" label-width="100px">
				<el-input type="textarea" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button>重置</el-button>
			    <el-button type="primary">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {

  name: 'creatPassword',

  data () {
    return {

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
.el-form{
	width: 500px;
}
</style>