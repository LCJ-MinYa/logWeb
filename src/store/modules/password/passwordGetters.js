const passwordGetters = {
    passwordList(state) {
        return state.passwordList;
    },
    activeType(state) {
        return state.activeType;
    },
    editPasswordData(state) {
        return state.editPasswordData;
    }
}

export default passwordGetters;