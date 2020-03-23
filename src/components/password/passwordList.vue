<template>
    <div class="password-list-box">
    	<el-tabs :value="activeType" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tableArray" :label="item.label" :key="index" :name="item.name">
                <base-password-table :tableData="tableData[item.name].data" @handleEdit="handleEdit" @handleDelete="handleDelete"></base-password-table>
            </el-tab-pane>
      	</el-tabs>
        <right-drawer :showRightDrawer="showRightDrawer" @closeRightDrawer="closeRightDrawer"></right-drawer>
    </div>
</template>

<script>
import basePasswordTable from './basePasswordTable'
import passwordController from '../../controller/password'
import rightDrawer from './rightDrawer'
import { mapGetters } from 'vuex'

export default {
  	name: 'passwordList',
  	data () {
    	return {
            showRightDrawer: false,
            tableArray: [{
                label: '社交',
                name: 'social',
            },{
                label: '购物',
                name: 'shopping',
                data: []
            },{
                label: '生活',
                name: 'life',
                data: []
            },{
                label: '工作',
                name: 'work',
                data: []
            },{
                label: '其他',
                name: 'other',
                data: []
            }],
    	}
  	},
  	components:{
  		'basePasswordTable': basePasswordTable,
        'rightDrawer': rightDrawer
  	},
    computed: {
        ...mapGetters({
            tableData: 'passwordList',
            activeType: 'activeType'
        })
    },
    mounted(){
        // this.getPasswordList();
    },
    activated(){
        this.getPasswordList();
    },
  	methods:{
  		handleClick(tab){
            this.$store.dispatch('UpdateToPasswordType', tab.name);
            this.getPasswordList();
  		},
        getPasswordList(){
            if(this.tableData[this.activeType].isRequest){
                return;
            }
            passwordController.getPasswordListData(this)
            .then((result)=>{
                this.$store.dispatch('AddToPasswordList', result);
            })
        },
        handleEdit(index, row){
            this.showRightDrawer = true;
        },
        handleDelete(index, row){
            
        },
        closeRightDrawer(){
            this.showRightDrawer = false;
        }
  	}
}
</script>

<style lang="css" scoped>
.password-list-box{
    overflow: hidden;
}
</style>