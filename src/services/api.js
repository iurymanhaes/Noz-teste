import axios from 'axios';

const url = 'http://books.appnoz.com.br/api/v1';

const api = axios.create({
    baseURL:url,
})

export default api;