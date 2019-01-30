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
} from './types'
import firebase from '@firebase/app'
import '@firebase/auth' 
import {  Actions } from 'react-native-router-flux';

export const emailChanged  = (text) =>{
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged  = (text) =>{
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const confirmPasswordChanged  = (text) =>{
	return {
		type: CONFIRM_PASSWORD_CHANGED,
		payload: text
	};
};

export const screenChange = (text) =>{
	return {
		type:SCREEN_CHANGE,
		payload:text
	};
};
export const loginUser=({email,password})=>{
	return (dispatch) =>{
		dispatch({type:LOGIN_USER});
		
		firebase.auth().signInWithEmailAndPassword(email,password)
			.then(user => loginUserSuccess(dispatch,user))
			.catch(error => loginUserFail(dispatch,error));
	};
};

export const signinUser=({email,password,confirmPassword})=>{
	
	if (password !== confirmPassword){
		return {
			type:SIGNIN_USER_FAIL,
			payload:'Password do not match'
		};
	}
	return (dispatch) =>{
		dispatch({type:SIGNIN_USER});
		
		firebase.auth().createUserWithEmailAndPassword(email,password)
			.then(user => signinUserSuccess(dispatch,user))
			.catch(error=> signinUserFail(dispatch,error));
	};
};

export const forgotPassword= (email)=>{
	return (dispatch) =>{
		dispatch({type:FORGOT_PASSWORD});
		
		firebase.auth().sendPasswordResetEmail(email)
			.then( ()=> forgotPasswordSuccess(dispatch))
			.catch(error=> forgotPasswordFail(dispatch,error));
	};
}

export const removeError=()=>{
	return {
		type:REMOVE_ERROR
	}
}

export const logout=()=>{
	return (dispatch) =>{
		dispatch({type:LOGOUT_USER});
		firebase.auth().signOut()
			.then(()=>logoutSuccess(dispatch))
			.catch((error)=> logoutFail(dispatch,error));
	};
	
}

export const autometicLogin=(user)=>{
	Actions.menu();
	return{
		type:AUTOMETIC_LOGIN,
		payload:user
	}

}
const logoutSuccess = (dispatch) => {
	dispatch({
		type:LOGOUT_USER_SUCCESS
	});
	Actions.welcome();
}

const logoutFail = (dispatch,error)=>{
	dispatch({
		type:LOGOUT_USER_FAIL,
		payload:error.message
	});
}
const loginUserFail = (dispatch,error) => {
	var errorCode = error.code;
	var errorMessage = error.message;
	if (errorCode === 'auth/wrong-password'){
		errorMessage='Wrong Password'
	}
	if (errorCode === 'auth/invalid-email'){
		errorMessage='Invalid Email'
	}
	if (errorCode === 'auth/user-not-found'){
		errorMessage='This user is not registered'
	}
	
	
	dispatch({
		type:LOGIN_USER_FAIL,
		payload:errorMessage
	});
};
const loginUserSuccess = (dispatch,user)=>{
	console.log('Inside AuthActions.js loginUserSuccess');
	console.log(user);
	dispatch({ 
		type:LOGIN_USER_SUCCESS,
		payload:user 
	});
	
	Actions.menu();
};


const signinUserSuccess = (dispatch,user)=>{
	
	dispatch({ 
		type:SIGNIN_USER_SUCCESS
	});
	
	Actions.pop();
};

const signinUserFail = (dispatch,error) => {
	var errorCode = error.code;
	var errorMessage = error.message;
	if (errorCode === 'auth/email-already-in-use'){
		errorMessage='Email already registered'
	}
	if (errorCode === 'auth/invalid-email'){
		errorMessage='Invalid Email'
	}
	if (errorCode === 'auth/weak-password'){
		errorMessage='Weak Password'
	}
	dispatch({
		type:SIGNIN_USER_FAIL,
		payload:errorMessage
	});
};

const forgotPasswordSuccess = (dispatch)=>{
	dispatch({
		type:FORGOT_PASSWORD_SUCCESS
	});
	Actions.login()
};

const forgotPasswordFail = (dispatch,error)=>{
	var errorCode = error.code;
	var errorMessage = error.code;

	if (errorCode === 'auth/invalid-email'){
		errorMessage='Invalid Email'
	}
	if (errorCode === 'auth/user-not-found'){
		errorMessage='User is not registered'
	}
	dispatch({
		type:FORGOT_PASSWORD_FAIL,
		payload:errorMessage
	});
}