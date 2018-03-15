<template>
	<el-tabs :value="activeType" type="card" @tab-click="handleClick">
	    <el-tab-pane label="社交" name="social">
	    	<base-password-table :tableData="tableData.social.data"></base-password-table>
	    </el-tab-pane>
	    <el-tab-pane label="购物" name="shopping">
            <base-password-table :tableData="tableData.shopping.data"></base-password-table>
        </el-tab-pane>
	    <el-tab-pane label="生活" name="life">
            <base-password-table :tableData="tableData.life.data"></base-password-table>
        </el-tab-pane>
	    <el-tab-pane label="工作" name="work">
            <base-password-table :tableData="tableData.work.data"></base-password-table>
        </el-tab-pane>
	    <el-tab-pane label="其他" name="other">
            <base-password-table :tableData="tableData.other.data"></base-password-table>
        </el-tab-pane>
  	</el-tabs>
</template>

<script>
import basePasswordTable from './basePasswordTable'
import passwordController from '../../controller/password'
import { mapGetters } from 'vuex'

export default {
  	name: 'passwordList',
  	data () {
    	return {

    	}
  	},
  	components:{
  		'basePasswordTable': basePasswordTable,
  	},
    computed: {
        ...mapGetters({
            tableData: 'passwordList',
            activeType: 'activeType'
        })
    },
    mounted(){
        this.getPasswordList();
    },
  	methods:{
  		handleClick(tab){
            this.$store.dispatch('UpdateToPasswordType', tab.name);
            this.isNeedToRequest(tab.name);
  		},
        isNeedToRequest(name){
            if(!this.tableData[name].isRequest){
                this.getPasswordList();
            }
        },
        getPasswordList(){
            passwordController.getPasswordListData(this)
            .then((result)=>{
                this.$store.dispatch('AddToPasswordList', result);
            })
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