import {
	setCookie,
	getCookie,
    removeCookie
} from '../utils/cookie'

export default {
	setAuthUid(uid) {
		setCookie('uid', uid, {
			expires: 720
		})
	},
	getAuthUid() {
		let uid = getCookie('uid');
		return uid;
	},
	checkIsAuth() {
		let uid = getCookie('uid');
		if (uid && uid != 'undefined') {
			return true;
		} else {
			return false;
		}
    },
    logout(_this){
        removeCookie('uid');
        _this.$store.dispatch("LogoutPassword");
        _this.$store.dispatch("LogoutTask");
        _this.$router.replace('/login');
        // window.location.reload();
    }
}
