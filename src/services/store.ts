import alovaInstance from './api'
import type { BaseResponse } from './api'

export const recharge = async (amount: number, pay_type: string) => {
    const res = await alovaInstance.Post<BaseResponse>('/orders/recharge', {
        amount,
        pay_type: pay_type || 'alipay'
    })
    return res.data
}

export const getOrderList = async () => {
    const res = await alovaInstance.Get<BaseResponse>('/orders/list', {
        params: {
            page: 1,
            pageSize: 10
        },
        cacheFor: 0
    })
    return res.data
}

export const queryOrder = async (order_no: string) => {
    const res = await alovaInstance.Get<BaseResponse>('/orders/query', {
        params: {
            trade_no: order_no
        },
        cacheFor: 0
    })
    return res.message
}
