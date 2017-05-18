interface TopUpPayment {

}

export function createTopUpReqData(payment_service_id : string, currency : string,
                                   number : number, amount :  number) {
    return {
        payment_service_id: payment_service_id,
        currency: currency,
        bundle: false,
        number: number,
        amount: amount
    }
}