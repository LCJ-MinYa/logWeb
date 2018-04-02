<template>
    <div class="search-box">
        <el-input v-model="searchContent" class="search-input" size="large" clearable>
            <el-select v-model="searchSource" slot="prepend" placeholder="请选择">
                <el-option label="百度" value="baidu"></el-option>
                <el-option label="谷歌" value="google"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'search',
    data () {
        return {
            searchContent: '',
            searchSource: 'baidu'
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
    height: 50px;
}
</style>