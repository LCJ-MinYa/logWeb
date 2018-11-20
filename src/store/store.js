import Vue from 'vue'
import Vuex from 'vuex'

import password from './modules/password/password'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        password: password
    }
})