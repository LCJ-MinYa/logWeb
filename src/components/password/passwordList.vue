<template>
	<el-tabs v-model="activeType" type="card" @tab-click="handleClick">
	    <el-tab-pane label="社交" name="1">
	    	<base-password-table :tableData="tableData.social.data"></base-password-table>
	    </el-tab-pane>
	    <el-tab-pane label="购物" name="2">
            <base-password-table :tableData="tableData.shopping.data"></base-password-table>   
        </el-tab-pane>
	    <el-tab-pane label="生活" name="3">
            <base-password-table :tableData="tableData.life.data"></base-password-table>   
        </el-tab-pane>
	    <el-tab-pane label="工作" name="4">
            <base-password-table :tableData="tableData.work.data"></base-password-table>   
        </el-tab-pane>
	    <el-tab-pane label="其他" name="5">
            <base-password-table :tableData="tableData.other.data"></base-password-table>   
        </el-tab-pane>
  	</el-tabs>
</template>

<script>
import basePasswordTable from './basePasswordTable'
import passwordController from '../../controller/password'

export default {
  	name: 'passwordList',
  	data () {
    	return {
    		activeType: '1',
            tableData: {
                social: {
                    isRequest: false,
                    data: []
                },
                shopping:{
                    isRequest: false,
                    data: [] 
                },
                life: {
                    isRequest: false,
                    data: []                    
                },
                work: {
                    isRequest: false,
                    data: []                    
                },
                other: {
                    isRequest: false,
                    data: []                    
                }
            }
    	}
  	},
  	components:{
  		'basePasswordTable': basePasswordTable,
  	},
    mounted(){
        this.getPasswordList();
    },
  	methods:{
  		handleClick(tab){
            switch(tab.name){
                case "1":
                    this.isNeedToRequest('social');
                    break;
                case "2":
                    this.isNeedToRequest('shopping');
                    break;
                case "3":
                    this.isNeedToRequest('life');
                    break;
                case "4":
                    this.isNeedToRequest('work');
                    break;
                case "5":
                    this.isNeedToRequest('other');
                    break;
            }	
  		},
        isNeedToRequest(name){
            if(!this.tableData[name].isRequest){
                this.getPasswordList();
            }   
        },
        getPasswordList(){
            passwordController.getPasswordListData(this)
            .then((result)=>{
                switch(this.activeType){
                    case "1":
                        this.dealRequestResult('social', result);
                        break;
                    case "2":
                        this.dealRequestResult('shopping', result);
                        break;
                    case "3":
                        this.dealRequestResult('life', result);
                        break;
                    case "4":
                        this.dealRequestResult('work', result);
                        break;
                    case "5":
                        this.dealRequestResult('other', result);
                        break;
                }
            })    
        },
        dealRequestResult(name, result){
            this.tableData[name].isRequest = true;
            this.tableData[name].data = result;
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