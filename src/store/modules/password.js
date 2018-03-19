import {
	ADD_TO_PASSWORD,
	UPDATE_TO_PASSWORD,
	UPDATE_TO_PASSWORD_TYPE,
	EDIT_TO_PASSWORD,
	DELETE_OLD_PASSWORD
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
	activeType: "social",
	editPasswordData: {
		index: 0,
		data: {}
	}
}

const mutations = {
	[ADD_TO_PASSWORD](state, passwordListData) {
		addToPassword(state, passwordListData);
	},
	[UPDATE_TO_PASSWORD](state, passwordData) {
		updateToPassword(state, passwordData);
	},
	[DELETE_OLD_PASSWORD](state, passwordData) {
		let oldTypeName = state.editPasswordData.data.type;
		let oldData = state.passwordList[oldTypeName].data;
		for (let i = 0; i < oldData.length; i++) {
			if (oldData[i]._id == passwordData._id) {
				oldData.splice(i, 1);
				break;
			}
		}
	},
	[UPDATE_TO_PASSWORD_TYPE](state, type) {
		state.activeType = type;
	},
	[EDIT_TO_PASSWORD](state, passwordData) {
		state.editPasswordData = passwordData;
	}
}

/**
 * [updateToPassword 更新某条密码数据]
 * @param  {[object]} state        [vuex中state状态]
 * @param  {[object]} passwordData [密码数据]
 */
function updateToPassword(state, passwordData) {
	AddShowImportantPassword(passwordData);
	let oldTypeName = state.editPasswordData.data.type;
	let newTypeName = passwordData.type;
	let oldData = state.passwordList[oldTypeName].data;
	let newData = state.passwordList[newTypeName].data;
	if (oldTypeName == newTypeName) {
		//未改动类型处理方式
		for (let i = 0; i < newData.length; i++) {
			if (newData[i]._id == passwordData._id) {
				newData.splice(i, 1, passwordData);
				break;
			}
		}
	} else {
		//改动类型处理方式(旧类型已删除，直接添加新类型数据即可)
		newData.push(passwordData);
	}
}

/**
 * [addToPassword 判断密码类型]
 * @param {[object]} state            [vuex中state状态]
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