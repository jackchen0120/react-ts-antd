import { saveUserInfo, clearUserInfo } from './user';
import { loginUser, registerUser } from '@/utils/api';

export const login = (username, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        loginUser({ username: username.trim(), password: password })
        .then(res => {
            console.log('登录===', res)
            if (res.code === 0) {
                dispatch(saveUserInfo(res.data));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const register = (username, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        registerUser({ username: username.trim(), password: password })
        .then(res => {
            console.log('注册===', res)
            if (res.code === 0) {
                dispatch(saveUserInfo(res.data));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const logout = () => (dispatch) => {
    console.log('logout')
    dispatch(clearUserInfo());
    window.location.href = '/login';
}