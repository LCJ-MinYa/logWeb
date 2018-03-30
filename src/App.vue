<template>
    <transition :name="transitionName">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            transitionName: 'go-page'
        }
    },
    watch: {
        '$route' (to, from) {
            console.log(to, from);
            const toDepth = to.path;
            const fromDepth = from.path;
            this.transitionName = this.judgeUrlDepth(fromDepth) <= this.judgeUrlDepth(toDepth)  ? 'go-page' : 'back-page';
        }
    },
    methods: {
        judgeUrlDepth(string){
            let reg = new RegExp('/','g');
            let times = string.match(reg).length;
            if(times === 1){
                if(string.length === 1){
                    times = 0;
                }
            }
            return times;
        }
    }
}
</script>

<style>
/*page动画*/
.go-page-enter{
    transform: translateX(100%);
    opacity: 0;
}
.go-page-enter-active {
    transition: all .5s ease;
}
.go-page-leave-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all .5s ease;
}

/*page动画*/
.back-page-enter{
    transform: translateX(-100%);
    opacity: 0;
}
.back-page-enter-active {
    transition: all .5s ease;
}
.back-page-leave-active {
    transform: translateX(100%);
    opacity: 0;
    transition: all .5s ease;
}
</style>
