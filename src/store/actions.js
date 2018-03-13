import {
    ADD_TO_PASSWORD
} from './types'

const AddToPasswordList = ({
    commit
}, passwordList, type) => {
    commit(ADD_TO_PASSWORD, passwordList, type);
}

export default {
    AddToPasswordList
}