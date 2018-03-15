import {
    ADD_TO_PASSWORD,
    UPDATE_TO_PASSWORD,
    UPDATE_TO_PASSWORD_TYPE
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

export default {
    AddToPasswordList,
    UpdateToPasswordList,
    UpdateToPasswordType
}