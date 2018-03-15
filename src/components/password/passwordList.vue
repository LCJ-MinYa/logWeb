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
        <div @click="aaa">aa</div>
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
            activeType: this.$store.state.password.activeType
    	}
  	},
  	components:{
  		'basePasswordTable': basePasswordTable,
  	},
    computed: {
        ...mapGetters({
            tableData: 'passwordList',
        })
    },
    mounted(){
        this.getPasswordList();
    },
  	methods:{
  		handleClick(tab){
            this.$store.dispatch('UpdateToPasswordType', tab.name);
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
            console.log(3);
            if(!this.tableData[name].isRequest){
                console.log(4);
                this.getPasswordList();
            }
        },
        getPasswordList(){
            passwordController.getPasswordListData(this)
            .then((result)=>{
                this.$store.dispatch('AddToPasswordList', result);
            })
        },
        aaa(){
            this.activeType = "3";
            let a = {
                _id:"5aaa1bf29a351d06390dd45b",
                importance:"普通",
                notes:"",
                password:"aaa",
                showImportantPassword:true,
                timestamp:"1521097714394",
                title:"aaa",
                type:"3",
                uid:"27d00dd7-89ac-4c5d-cc34-4642b79b7414",
                url:"http://aaa.com",
                userName:"aaa",
            }

            this.$store.dispatch("AddToPasswordList", a);
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