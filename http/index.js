import axios from "axios"

//_без авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//.вставляю токен
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}


//_будет отробат перед каждым запросом и подстовлять токен 
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
