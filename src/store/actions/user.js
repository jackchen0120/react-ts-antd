import * as types from '../actionTypes';

export const saveUserInfo = (data) => {
    return {
        type: types.SET_USER_INFO,
        data
    }
}

export const clearUserInfo = () => {
    return {
        type: types.CLEAR_USER_INFO
    }
}