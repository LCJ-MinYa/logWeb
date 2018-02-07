import {
	setCookie,
	getCookie
} from '../utils/cookie'

export default {
	setAuthUid(uid) {
		setCookie('uid', uid, {
			expires: 24
		})
	},
	checkIsAuth() {
		let uid = getCookie('uid');
		if (uid && uid != 'undefined') {
			return true;
		} else {
			return false;
		}
	}
}