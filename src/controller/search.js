import httpRequest from '../assets/utils/httpRequest'
import auth from '../assets/js/auth'
import api from '../api/apiPath'
import {
    message
} from '../assets/utils/utils'

export default {
    getSearchSuggestion(_this, queryString) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'GET',
                url: api.SEARCH_SUGGESTION,
                data: {
                    wd: queryString
                },
                notShowLoading: true,
                success: (result) => {
                    resolve(result.data);
                }
            }, _this, '修改中...');
        })
    },
    doCheckOutSearchValue(_this) {
        if (!_this.searchContent) {
            message(_this, '搜索内容不能为空!', 'warning');
            return false;
        }
        return true;
    }
}