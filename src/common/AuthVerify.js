import moment from "moment";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ServiceAlert from "./ServiceAlert";

// const parseJwt = (token) => {
//     try {
//         return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//         return null;
//     }
// };

class AuthVerify extends Component {
    constructor(props) {
        super(props);

        props.history.listen(() => {
            const token = JSON.parse(sessionStorage.getItem("token"));

            if (token && token.expireAt) {
                // const decodedJwt = jwt.decode(user.accessToken, { complete: true });
                // const decodedJwt = parseJwt(user.accessToken);

                const currentTime = Date.now();
                const expireAt = Number(moment(token.expireAt).format('X')) * 1000;
                if (expireAt < currentTime) {
                    ServiceAlert.success('Thông báo', 'Phiên đăng nhập hết hạn');
                    props.logOut();
                }
            }
        });
    }

    render() {
        return <div></div>;
    }
}

export default withRouter(AuthVerify);