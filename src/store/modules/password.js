import {
	ADD_TO_PASSWORD
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
	}
}

const mutations = {
	[ADD_TO_PASSWORD](state, passwordListData) {
		switch (passwordListData.type) {
			case "1":
				dealPasswordList(state, 'social', passwordListData);
				break;
			case "2":
				dealPasswordList(state, 'shopping', passwordListData);
				break;
			case "3":
				dealPasswordList(state, 'life', passwordListData);
				break;
			case "4":
				dealPasswordList(state, 'work', passwordListData);
				break;
			case "5":
				dealPasswordList(state, 'other', passwordListData);
				break;
		}
	}
}

function dealPasswordList(state, name, passwordListData) {
	state.passwordList[name].isRequest = true;
	state.passwordList[name].data = passwordListData.data;
}

export default {
	state,
	mutations
}