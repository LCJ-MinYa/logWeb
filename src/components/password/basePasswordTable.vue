<template>
	<el-table :data="tableData" slot="empty" style="width: 100%">
      	<el-table-column prop="title" label="名称" width="150"></el-table-column>
      	<el-table-column prop="userName" label="账号" width="160"></el-table-column>
      	<el-table-column prop="password" label="密码" width="160">
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
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      			<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      		</template>
		</el-table-column>
    </el-table>
</template>

<script>
import passwordController from '../../controller/password'

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
        },
        handleEdit(index, row){
            let data = {
                index: index,
                data: row
            }
            this.$store.dispatch('EditToPasswordData', data);
            this.$emit('handleEdit');
        },
        handleDelete(index, row){
            //确认提示
            this.$confirm('此操作将永久删除该条密码信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                passwordController.deletePassword(this, row._id)
                .then((result)=>{
                    this.$store.dispatch('DeleteToPassword', row);
                })
            }).catch(err=>{})
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