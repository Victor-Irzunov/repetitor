import {  $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (email, password, isAdmin, name, lastName, group) => {
    const { data } = await $host.post('/api/register', { email, password, isAdmin, name, lastName, group })  //., role: 'ADMIN'
    localStorage.setItem('token', data.token)
    return data.userDB
}

export const login = async (email, password) => {
    const { data } = await $host.post('/api/login', { email, password })
    localStorage.setItem('token', data.token)
    return data.user
}

export const dataUser = async () => {
    const dataToken = await jwt_decode(localStorage.getItem('token'))
    const { data } = await $host.get('/api/data-user', {
        params: {
            id: dataToken.id
        }
    })
    return data
}