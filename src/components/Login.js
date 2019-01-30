import React, { Component } from 'react';
import { screenChange,autometicLogin } from '../actions';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import Logo from './Logo';
import Form from './Form';

import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

class Login extends Component{

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=> {
			if (user) {
				this.props.autometicLogin(user);
				console.log('user already logged in----> Inside Login.js');
			}
		});
  }
	signup() {
		this.props.screenChange('Login');
		Actions.signup()
	}

	render() {
    console.log('render Login.js');
		return(
			<View style={styles.container}>
				<Logo/>
				<Form type="Login"/>
				<View style={styles.signupTextCont}>
					<TouchableOpacity
						style={[styles.button,{marginHorizontal:10 }]}
						onPress={()=>Actions.resetpassword()}
					>
						<Text style={styles.buttonText}>Forgot Password</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
            onPress={()=>Actions.menu()}
					>
						<Text style={styles.buttonText}>Guest Login</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.signup.bind(this)}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
	},
	button: {
    width:150,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'100',
    color:'#ffffff',
    textAlign:'center'
  },
});
export default connect(null,{screenChange,autometicLogin})(Login);