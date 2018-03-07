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
  	data () {
	    return {
			tableData: [{
            	title: '云订货SVN',
            	url: 'https://192.168.8.234/svn/MobileProject/OnlineOrderH5',
            	userName: 'lcjun',
            	password: 'lcjun',
            	importance: '普通',
            	notes: '云订货SVN项目地址，财贸子公司项目云订货SVN项目地址，财贸子公司项目云订货SVN项目地址，财贸子公司项目云订货SVN项目地址，财贸子公司项目'
          	},{
            	title: '云订货SVN',
            	url: 'https://192.168.8.234',
            	userName: 'lcjun',
            	password: 'lcjun',
            	importance: '普通',
            	notes: '云订货SVN项目地'
          	},{
            	title: '云订货SVN',
            	url: 'https://192.168.8.234/svn/MobileProject/OnlineOrderH5',
            	userName: 'lcjun',
            	password: 'lcjun',
            	importance: '普通',
            	notes: '云订货SVN项目地址，财贸子公司项目云订货SVN项目地址，财贸子公司项目云订货SVN项目地址，财贸子公司项目云订货SVN项目地址，财贸子公司项目'
          	}]
	    }
  	},
  	mounted(){
  		this.updateListDom();
  	},
  	methods:{
  		updateListDom(){
	  		this.$nextTick(()=>{
	  			for (let i = 0; i < $(".el-table__row .cell").length; i++) {
	  				console.log(i, $(".el-table__row .cell")[i]);
	  				if(7 <= i <=13){
		  				continue;
		  			}
		  			if(this.offsetWidth < this.scrollWidth){
		  				console.log(this);
		  				$(this).css('font-weight', 'bold');
		  			}
	  			}
	  		})
  		}
  	}
}
</script>