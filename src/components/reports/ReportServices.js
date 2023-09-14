import axios from 'axios'
import authHeader from '../../services/auth-header';

class ReportServices {
    get(apiUrl, paging, filtersInput) {
        return axios.get(`${apiUrl}search?${new URLSearchParams(paging).toString()}&${new URLSearchParams(filtersInput).toString()}`, { headers: authHeader() })
    }
}

export default new ReportServices();
