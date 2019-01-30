import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	CONFIRM_PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	SIGNIN_USER,
	SIGNIN_USER_SUCCESS,
	SIGNIN_USER_FAIL,
	SCREEN_CHANGE,
	FORGOT_PASSWORD,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	REMOVE_ERROR,
	LOGOUT_USER,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAIL,
	AUTOMETIC_LOGIN
	
} from '../actions/types';
const INITIAL_STATE = {
	email: '',
	password:'',
	confirmPassword:'',
	user:null,
	error:'',
	loading:false
};


export default(state=INITIAL_STATE,action) => {
	switch(action.type){
		case EMAIL_CHANGED:
			return { ...state,email:action.payload};
		case PASSWORD_CHANGED:
			return { ...state,password:action.payload};
		case CONFIRM_PASSWORD_CHANGED:
			return { ...state,confirmPassword:action.payload};
		case LOGIN_USER:
		case SIGNIN_USER:
		case FORGOT_PASSWORD:
		case LOGOUT_USER:
			return { ...state,loading:true, error:''};
		case LOGIN_USER_SUCCESS:
			return { ...state,...INITIAL_STATE, user: action.payload};
		case LOGIN_USER_FAIL:
			return { ...state,error:action.payload,password:'',loading:false};
		case SIGNIN_USER_FAIL:
			return { ...state,error:action.payload,confirmPassword:'',loading:false};
		case SCREEN_CHANGE:
			return {...state,password:'',confirmPassword:'',error:''};
		case FORGOT_PASSWORD_SUCCESS:
			return {...state,loading:false};
		case FORGOT_PASSWORD_FAIL:
			return {...state,error:action.payload,loading:false};
		case REMOVE_ERROR:
			return {...state,error:''};
		case LOGOUT_USER_SUCCESS:
		case SIGNIN_USER_SUCCESS:
			return INITIAL_STATE;
		case LOGOUT_USER_FAIL:
			return {...state,error:action.payload,loading:false};
		case AUTOMETIC_LOGIN:
			return {...state,user:action.payload};
		default:
			return state;
	}
}