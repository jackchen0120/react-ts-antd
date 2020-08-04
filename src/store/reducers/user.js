import * as types from '../actionTypes';

const initUserInfo = {
    data: {},
    isLogined: false
}

export default function user(state = initUserInfo, action) {
    switch (action.type) {
        case types.SET_USER_INFO:
            return {
                ...state,
                data: action.data,
                isLogined: true
            };
        case types.MODIFY_USER_INFO:
            return {
                ...state,
                data: Object.assign(state.data, action.data)
            };
        case types.CLEAR_USER_INFO:
            return {
                data: {},
                isLogined: false
            };
        default:
            return state;
    }
}

// export default (state = defaultState, action) => {
//     if (action.type === types.CHANGE_INPUT_VALUE) {
//         const newState = JSON.parse(JSON.stringify(state));
//         newState.inputValue = action.value;
//         return newState;
//     }

//     if (action.type === types.ADD_TODO_ITEM) {
//         const newState = JSON.parse(JSON.stringify(state));
//         newState.list.push(newState.inputValue);
//         newState.inputValue = '';
//         return newState;
//     }

//     if (action.type === types.DELETE_TODO_ITEM) {
//         const newState = JSON.parse(JSON.stringify(state));
//         newState.list.splice(action.index, 1);
//         return newState;
//     }

//     return state;
// }