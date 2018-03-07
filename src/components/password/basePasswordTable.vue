<template>
	<el-table :data="tableData" slot="empty" style="width: 100%">
      	<el-table-column prop="title" label="名称" width="100"></el-table-column>
      	<el-table-column prop="userName" label="账号" width="120"></el-table-column>
      	<el-table-column prop="password" label="密码" width="120"></el-table-column>
      	<el-table-column prop="importance" label="重要性" width="100"></el-table-column>
      	<el-table-column prop="url" label="网址"></el-table-column>
      	<el-table-column prop="notes" label="备注"></el-table-column>
		<el-table-column fixed="right" label="操作" width="150">
      		<template slot-scope="scope">
				<el-button size="mini">编辑</el-button>
      			<el-button size="mini" type="danger">删除</el-button>
      		</template>
		</el-table-column>
    </el-table>
</template>

<script>
export default {
  	name: 'basePasswordTable',
    props: ["tableData"],
  	data () {
	    return {

	    }
  	},
  	mounted(){

  	},
  	methods:{
  		
  	}
}
</script>