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
        return n.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
        return this.removeVietnameseTones(string).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        // return this.removeAscent(string).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
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

    removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        // str = str.replace(/ + /g, " ");
        // str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
        return str;
    }

    generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    cutString(string, expectLength) {
        // return string
        if ((string && string.length <= expectLength) || string === null) return string
        return string.substring(0, expectLength).concat('...')
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
