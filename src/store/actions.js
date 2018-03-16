import {
    ADD_TO_PASSWORD,
    UPDATE_TO_PASSWORD,
    UPDATE_TO_PASSWORD_TYPE,
    EDIT_TO_PASSWORD
} from './types'

const AddToPasswordList = ({
    commit
}, passwordListData) => {
    commit(ADD_TO_PASSWORD, passwordListData);
}

const UpdateToPasswordList = ({
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

export default {
    AddToPasswordList,
    UpdateToPasswordList,
    UpdateToPasswordType,
    EditToPasswordData
}