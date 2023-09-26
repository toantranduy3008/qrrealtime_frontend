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

    formatTransferDescription(string) {
        var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
        // return this.removeAscent(string).replace(/^[a-zA-Z0-9 ]*$/, '')
        return this.removeAscent(string).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    }

    removeAscent(str) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
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
