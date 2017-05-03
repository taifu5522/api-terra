import {
	combineReducers
} from 'redux';
import login from './login';
import post from './post';

export default combineReducers({
	login,
	post
});