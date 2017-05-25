/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-02 02:39:42
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: post.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:20:24
 */

const addNumber = (state = 0, action) => { // 此处action为之后传入，首次默认只传入空对象
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'remove':
            return state - 1;
        default:
            return state;
    }
}
export default addNumber;
