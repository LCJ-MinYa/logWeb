<template>
	<el-table :data="tableData" slot="empty" style="width: 100%">
      	<el-table-column prop="title" label="名称" width="120"></el-table-column>
      	<el-table-column prop="userName" label="账号" width="120"></el-table-column>
      	<el-table-column prop="password" label="密码" width="120">
            <template slot-scope="scope">
                <div v-if="scope.row.importance == '重要' || scope.row.importance == '绝密'">
                    <span v-if="!scope.row.showImportantPassword">∗∗∗∗∗∗</span><span v-else>{{scope.row.password}}</span><i v-if="!scope.row.showImportantPassword" @click="showImportantPassword(scope.row)" class="iconfont icon-chakan"></i>
                </div>
                <p v-else>{{scope.row.password}}</p>
            </template>
        </el-table-column>
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
  		showImportantPassword(data){
            data.showImportantPassword = !data.showImportantPassword;
        }
  	}
}
</script>

<style lang="css" scoped>
.icon-chakan{
    padding: 10px 10px 15px;
    font-size: 17px;
    cursor: pointer;
}
</style>