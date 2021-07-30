const axios = require('axios')

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('meetToken')) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem('meetToken'))
      }`;
    }
    return req;
});

const urlAuth = 'api/v1/auth'

export const googleSignIn = (data)=>API.post(`${urlAuth}/google`,data);
export const getCurrentUser = ()=>API.get(`${urlAuth}/user`);

export const createLink = ()=>API.get(`${urlAuth}/createlink`);


