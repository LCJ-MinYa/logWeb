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
	[ADD_TO_PASSWORD](state, passwordList) {
		switch (passwordList.type) {
			case "1":
				state.passwordList.social = {
					isRequest: true,
					data: passwordList.data
				}
				break;
			case "2":
				this.dealRequestResult('shopping', result);
				break;
			case "3":
				this.dealRequestResult('life', result);
				break;
			case "4":
				this.dealRequestResult('work', result);
				break;
			case "5":
				this.dealRequestResult('other', result);
				break;
		}
	}
}

export default {
	state,
	mutations
}