import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";

class serviceAlert {
    success(title, message) {
        confirmAlert({
            title: title || 'Thông báo',
            message: message || 'Thành công',
            buttons: [
                {
                    label: 'Đóng'
                }
            ],
            overlayClassName: "overlay-custom-class-name"
        });
    };
    error(title, message) {
        confirmAlert({
            title: title || 'Lỗi',
            message: message || 'Thất bại',
            buttons: [
                {
                    label: 'Đóng'
                }
            ],
            overlayClassName: "overlay-custom-class-name"
        });
    };
}

export default new serviceAlert();