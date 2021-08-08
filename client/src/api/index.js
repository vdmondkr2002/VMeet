const axios = require('axios')

const API = axios.create({ baseURL: 'http://localhost:5000/' });
// const API = axios.create({ baseURL: 'https://meetv-v1.herokuapp.com/' });

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


const urlCall = '/api/v1/call'
export const createLink = ()=>API.get(`${urlCall}/createlink`);
export const joinCall1 = (code)=>API.post(`${urlCall}/checkjoincall`,{code:code})


