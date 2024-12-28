import alovaInstance from "./api";
import type { BaseResponse } from "./api";

export interface Group {
    id: number
    name: string
}

export const createGroup = async(groupname: string) => {
    const response = await alovaInstance.Post<BaseResponse>('/group/create', {
        "name": groupname
    })
    return response.data
}

export const getGroupList = async () => {
    const response = await alovaInstance.Get<BaseResponse>('/group/list', {
        cacheFor: 0
    })
    return response.data
}

export const deleteGroup = async (id: number) => {
    const response = await alovaInstance.Delete<BaseResponse>('/group/delete/' + id)
    return response.data
}

export const updateGroup = async (id: number, name: string) => {
    const response = await alovaInstance.Put<BaseResponse>('/group/' + id, {
        "name": name
    })
    return response.data
}
