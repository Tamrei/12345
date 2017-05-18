export let prevRouteIndex = -1;
export let currentRouteIndex;

export function setActiveRouteIndex(index) {
    currentRouteIndex = index;
}

export function setLeavingRouteIndex(index) {
    prevRouteIndex = index;
}



export const INITIAL_WALLET_MODEL = {
    "iNum": {
        "account_id": "",
        "name": "",
        "amount": '',
        "currency": "",
        "blocked": false
    }, "sim": {
        "account_id": "",
        "name": "",
        "serial_number": "",
        "imsi": "",
        "amount": '',
        "currency": "",
        "blocked": false
    }
};

export const PAYMENT_STYLE = `
    .payment-header {
    background-color: #303440;
}

.payment-header .description {
    color: #bec1c8;
    font-size: 18px;
    width: 90%;
    padding: 15px auto 15px auto;
    margin: 20px auto;
    text-align: center;
}

@media (max-width: 558px) {
.payment-header .description {
        width: 90%;
        font-size: 15px;
    }
}

@media (max-width: 558px) {
.row .card-description {
        padding-left: 10px;
        font-size: 12px;
    }
}

.row .card-description {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    color: white;
    font-style: oblique;
}

@media (max-width: 558px) {
.row .card-name {
        /* float: right; */
        padding-left: 10px;
        font-size: 17px !important;
    }
}

.row .card-name {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1px;
    text-align: left;
    color: white;
}

.page {
    bottom: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: #e1e1ec;
}

.payment-form-box {
    margin-top: 20px;
    background-color: white;
}`;