export const listMonLevels = [
    {
        monLevel: "1",
        desc: "Cao"
    },
    {
        monLevel: "2",
        desc: "Trung bình"
    },
    {
        monLevel: "3",
        desc: "Thấp"
    },
    
];

export const mapMonLevels = listMonLevels.reduce(function (map, obj) {
    map[obj.monLevel] = obj.desc;
    return map;
}, {});

export const listChannels = [
    {
        channelId: "01",
        channelName: "ATM"
    },
    {
        channelId: "02",
        channelName: "Counter"
    },
    {
        channelId: "03",
        channelName: "POS"
    },
    {
        channelId: "04",
        channelName: "Internet Banking"
    },
    {
        channelId: "05",
        channelName: "Mobile application"
    },
    {
        channelId: "06",
        channelName: "SMS banking"
    },
    {
        channelId: "07",
        channelName: "Khác"
    },
    {
        channelId: "15",
        channelName: "Mobile application"
    },
    {
        channelId: "95",
        channelName: "Mobile IBFT"
    },
    {
        channelId: "96",
        channelName: "Cash In"
    },
    {
        channelId: "97",
        channelName: "Cash Out"
    },
    {
        channelId: "98",
        channelName: "Hỗ trợ chuyển tiền"
    },
    {
        channelId: "99",
        channelName: "QR Code"
    }
];

export const mapChannels = new Map(listChannels.map(obj => [obj.channelId, obj.channelName]));

export const listSpecialChannels = listChannels.filter(function (el) {return parseInt(el.channelId) > 50});
export const mapSpecialChannels = new Map(listSpecialChannels.map(obj => [obj.channelId, obj.channelName]));

export const mapPaymentSvcCode = new Map([['IF_DEP', 'Chuyển tiền liên ngân hàng nội địa'],
['TF_DEP', 'Chuyển tiền từ TGTT'],
['CF_DEP', 'Chuyển tiền xuyên biên giới']]);

export const mapPaymentType = new Map([['91', 'Chuyển tiền'],
    ['06', 'Thanh toán hóa đơn']]);

export const mapAchSystemService = [
    ['DAS', 'Truy vấn tên thụ hưởng'],
    ['NRT', 'Chuyển tiền thời gian thực'],
    ['DNS', 'Chuyển tiền theo lô'],
    ['NRT_RTP', 'RTP'],
    ['DNS_RTP', 'RTP theo lô']
];

export const QTBS_MSG_TYPE_LIST = [
    {
        type: "RETURN",
        desc: "Hoàn trả"
    },
    {
        type: "PAYMENT",
        desc: "Chuyển tiền"
    },
    {
        type: "VOID",
        desc: "Đảo"
    },
];

export const QTBS_MSG_TYPE_MAP = new Map(QTBS_MSG_TYPE_LIST.map(obj => [obj.type, obj.desc]));

export const listChannelTypes = [
    {
        code: "NORMAL",
        name: "Kênh thông thường"
    },
    {
        code: "SPECIAL",
        name: "Kênh đặc biệt"
    }
];

export const mapChannelTypes = new Map(listChannelTypes.map(obj => [obj.code, obj.name]));

export const listReturnPaymentFeeTypes = [
    {
        code: "FREE",
        name: "Không tính phí"
    },
    {
        code: "BY_ORIGINAL_PAYMENT",
        name: "Hoàn lại phí của GD chuyển tiền"
    }
];

export const mapReturnPaymentFeeTypes = new Map(listReturnPaymentFeeTypes.map(obj => [obj.code, obj.name]));

export const SPECIAL_DAY_TYPE_LIST = [
    {
        type: "HOLIDAY",
        desc: "Nghỉ lễ"
    },
    {
        type: "SWAP",
        desc: "Làm bù"
    }
];

export const SPECIAL_DAY_TYPE_MAP = new Map(SPECIAL_DAY_TYPE_LIST.map(obj => [obj.type, obj.desc]));