import {
    ADD_TO_PASSWORD
} from './types'

const AddToPasswordList = ({
    commit
}, passwordListData) => {
    commit(ADD_TO_PASSWORD, passwordListData);
}

export default {
    AddToPasswordList
}