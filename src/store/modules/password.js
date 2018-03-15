import {
	ADD_TO_PASSWORD,
	UPDATE_TO_PASSWORD,
	UPDATE_TO_PASSWORD_TYPE
} from '../types'

const state = {
	passwordList: {
		social: {
			isRequest: false,
			data: []
		},
		shopping: {
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
	},
	activeType: "social"
}

const mutations = {
	[ADD_TO_PASSWORD](state, passwordListData) {
		addToPassword(state, passwordListData);
	},
	[UPDATE_TO_PASSWORD](state, passwordData) {

	},
	[UPDATE_TO_PASSWORD_TYPE](state, type) {
		state.activeType = type;
	}
}

/**
 * [addToPassword 判断密码类型]
 * @param {[type]} state            [vuex中state状态]
 * @param {[type]} passwordListData [需要添加的密码数据，可能是多个数组形式，也可能是单个object形式]
 */
function addToPassword(state, passwordListData) {
	let typeName = passwordListData.type;
	AddShowImportantPassword(passwordListData);
	state.passwordList[typeName].isRequest = true;
	if (passwordListData.hasOwnProperty('data')) {
		state.passwordList[typeName].data = state.passwordList[typeName].data.concat(passwordListData.data);
	} else {
		state.passwordList[typeName].data.push(passwordListData);
	}
}

/**
 * [AddShowImportantPassword 密码数据新增是否显示密码选项]
 * @param {[type]} passwordListData [密码数据，可能是多个数组形式，也可能是单个object形式]
 */
function AddShowImportantPassword(passwordListData) {
	if (passwordListData.hasOwnProperty('data')) {
		passwordListData.data.map(function(item) {
			judgeImportance(item);
		})
	} else {
		judgeImportance(passwordListData);
	}
}

/**
 * [judgeImportance 判断密码属于重要绝密还是普通,设置showImportantPassword字段]
 * @param  {[type]} item [密码数据]
 */
function judgeImportance(item) {
	if (item.importance == "重要" || item.importance == "绝密") {
		item.showImportantPassword = false;
	} else {
		item.showImportantPassword = true;
	}
}

export default {
	state,
	mutations
}