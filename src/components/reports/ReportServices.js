import axios from 'axios'
import authHeader from '../../services/auth-header';
import { Spinner } from 'reactstrap';

class ReportServices {

    get(apiUrl, paging, filtersInput) {
        return axios.get(`${apiUrl}search?${new URLSearchParams(paging).toString()}&${new URLSearchParams(filtersInput).toString()}`, { headers: authHeader() })
    }

    getWithoutPaginating(apiUrl) {
        return axios.get(`${apiUrl}`, { headers: authHeader() })
    }

    formatStringToNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    formatNumberToString(s) {
        return s.toString().replace(/,/g, '')
    }

    exportExcel(inputFilter) {
        const { merchantId, branchId, cashierId, status, dateTimeBegin, dateTimeEnd, fromAmount, toAmount, cardNo, merchantName, branchName, cashierName, type } = inputFilter
        const url = `/merchantweb/api/reports/exportdetail?merchantId=${merchantId}&branchId=${branchId}&cashierId=${cashierId}&status=${status}&dateTimeBegin=${dateTimeBegin}&dateTimeEnd=${dateTimeEnd}&type=${type}&merchantName=${merchantName}&branchName=${branchName}&cashierName=${cashierName}&fromAmount=${fromAmount}&toAmount=${toAmount}&cardNo=${cardNo}`
        return axios({
            url: url, //your url
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        });
    }

    genQRCode(url) {
        // axios.get(url, {headers: })
        return axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        })
    }

    formatTransferDescription(content) {
        return content.replace(/[^\w]|_/g, '');
    }
}

export default new ReportServices();

export const DefaultSpinner = () => {
    return (
        <Spinner size="lg" color="info">
            Loading...
        </Spinner>
    )
}
