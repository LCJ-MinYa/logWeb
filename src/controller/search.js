import httpRequest from '../assets/utils/httpRequest'
import auth from '../assets/js/auth'
import api from '../api/apiPath'

export default {
    getSearchSuggestion(_this, queryString) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'GET',
                url: api.SEARCH_SUGGESTION,
                data: {
                    wd: queryString
                },
                success: (result) => {
                    console.log(result);
                    resolve(result);
                }
            }, _this, '修改中...');
        })
    }
}