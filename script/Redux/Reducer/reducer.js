import { createStore } from 'redux';

// 首次加载需要的Action
// import { ADD_TODO } from '../Action/action';

export const addNumber = (state = 0, action) => { // 此处action为之后传入，首次默认只传入空对象
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'remove':
            return state - 1;
        default:
            return state;
    }
}