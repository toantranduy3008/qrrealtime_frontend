import axios from 'axios'
import authHeader from '../../services/auth-header';

class ReportServices {
    get(apiUrl, paging, filtersInput) {
        return axios.get(`${apiUrl}search?${new URLSearchParams(paging).toString()}&${new URLSearchParams(filtersInput).toString()}`, { headers: authHeader() })
    }

    formatStringToNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    formatNumberToString(s) {
        return s.replace(/,/g, '')
    }
}

export default new ReportServices();
