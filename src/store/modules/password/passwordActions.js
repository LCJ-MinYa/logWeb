import {
    ADD_TO_PASSWORD,
    UPDATE_TO_PASSWORD,
    UPDATE_TO_PASSWORD_TYPE,
    EDIT_TO_PASSWORD,
    DELETE_OLD_PASSWORD,
    DELETE_TO_PASSWORD,
    LOGOUT_PASSWORD
} from './passwordTypes';

const passwordActions = {
    AddToPasswordList({
        commit
    }, passwordListData) {
        commit(ADD_TO_PASSWORD, passwordListData);
    },

    UpdateToPassword({
        commit
    }, passwordData) {
        commit(UPDATE_TO_PASSWORD, passwordData);
    },

    UpdateToPasswordType({
        commit
    }, type) {
        commit(UPDATE_TO_PASSWORD_TYPE, type);
    },

    EditToPasswordData({
        commit
    }, passwordData) {
        commit(EDIT_TO_PASSWORD, passwordData);
    },

    DeleteToPassword({
        commit
    }, passwordData) {
        commit(DELETE_TO_PASSWORD, passwordData);
    },

    DeleteOldPassword({
        commit
    }, passwordData) {
        commit(DELETE_OLD_PASSWORD, passwordData);
    },

    LogoutPassword({
        commit
    }) {
        commit(LOGOUT_PASSWORD);
    }
}

export default passwordActions;