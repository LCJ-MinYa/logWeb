<template>
    <div class="global-page" @keyup.enter="goSearch">
        <div class="search-box">
            <el-autocomplete
                :fetch-suggestions="querySearchAsync"
                v-model="searchContent"
                class="search-input"
                size="large"
                @select="handleSelect"
                clearable
            >
                <el-select v-model="searchSource" slot="prepend" placeholder="请选择">
                    <el-option label="百度" value="baidu"></el-option>
                    <el-option label="谷歌" value="google"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
            </el-autocomplete>
        </div>
    </div>
</template>

<script>
import SearchController from '../../controller/search'

export default {
    name: 'search',
    data () {
        return {
            searchContent: '',
            searchSource: 'baidu'
        }
    },
    methods:{
        querySearchAsync(queryString, cb){
            if(!queryString){
                cb([]);
                return;
            }
            SearchController.getSearchSuggestion(this, queryString)
            .then((result)=>{
                cb(result);
            })
        },
        handleSelect(item){
            console.log(item);
        },
        goSearch(){
            if(SearchController.doCheckOutSearchValue(this)){
                switch(this.searchSource){
                    case 'baidu':
                        window.open('https://www.baidu.com/s?wd=' + this.searchContent);
                        break;
                    case 'google':
                        window.open('https://www.google.com/search?q=' + this.searchContent);
                        break;
                }
            }
        }
    }
}
</script>

<style lang="css" scoped>
.search-box{
    position: fixed;
    width: 700px;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    text-align: center;
}
.el-select{
    width: 100px;
}
.search-input{
    width: 100%;
    height: 50px;
}
</style>