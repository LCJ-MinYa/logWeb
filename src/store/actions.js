import {
    ADD_TO_PASSWORD,
    UPDATE_TO_PASSWORD,
    UPDATE_TO_PASSWORD_TYPE,
    EDIT_TO_PASSWORD,
    DELETE_OLD_PASSWORD,
    DELETE_TO_PASSWORD
} from './types'

const AddToPasswordList = ({
    commit
}, passwordListData) => {
    commit(ADD_TO_PASSWORD, passwordListData);
}

const UpdateToPassword = ({
    commit
}, passwordData) => {
    commit(UPDATE_TO_PASSWORD, passwordData);
}

const UpdateToPasswordType = ({
    commit
}, type) => {
    commit(UPDATE_TO_PASSWORD_TYPE, type);
}

const EditToPasswordData = ({
    commit
}, passwordData) => {
    commit(EDIT_TO_PASSWORD, passwordData);
}

const DeleteToPassword = ({
    commit
}, passwordData) => {
    commit(DELETE_TO_PASSWORD, passwordData);
}

const DeleteOldPassword = ({
    commit
}, passwordData) => {
    commit(DELETE_OLD_PASSWORD, passwordData);
}

export default {
    AddToPasswordList,
    UpdateToPassword,
    UpdateToPasswordType,
    EditToPasswordData,
    DeleteOldPassword,
    DeleteToPassword
}