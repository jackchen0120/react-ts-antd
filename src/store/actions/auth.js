import { saveUserInfo, clearUserInfo } from './user';
import { loginUser } from '../../utils/api';

export const login = (username, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        loginUser({ username: username.trim(), password: password })
        .then(res => {
            console.log('登录===', res)
            if (res.code === 0) {
                // const token = data.token;
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
    // location.href = '/login';
}