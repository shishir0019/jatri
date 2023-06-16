import { IArrayParinatedResponse } from "../type/response"
import axios from '../util/axios'

export const GET_PRODUCTS = (params?: any) => {
    return axios<IArrayParinatedResponse>('/products', { params })
}
