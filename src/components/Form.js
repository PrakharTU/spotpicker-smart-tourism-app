import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { 
	emailChanged, 
	passwordChanged,
	loginUser,
	confirmPasswordChanged,
	signinUser,
	removeError
	
} from '../actions';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

class Form extends Component{
	componentWillUnmount(){
		console.log('Form.js componentWillUnmount')
		this.props.removeError();
	}
	onEmailChange(text){
		this.props.emailChanged(text);
	}
	onPasswordChange(text){
		this.props.passwordChanged(text);
	}
	
	onConfirmPasswordChange(text){
		this.props.confirmPasswordChanged(text);
	}
	onButtonPress(){
		const { email,password,confirmPassword } = this.props;
		if (this.props.type=='Login')
			this.props.loginUser({ email,password });
		else
			this.props.signinUser({ email,password,confirmPassword });
			
	}
		
	renderError(){
		if(this.props.error){
			return (
				<View>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		};
	};
	
	renderConfirmPassword(){
		if (this.props.type=='Signup'){
			return(
				<TextInput style={styles.inputBox} 
				  underlineColorAndroid='rgba(0,0,0,0)' 
				  placeholder="Confirm Password"
				  secureTextEntry={true}
				  placeholderTextColor = "#ffffff"
				  onChangeText={this.onConfirmPasswordChange.bind(this)}
				  value={this.props.confirmPassword}
				/>
			);
		};
	};
	
	render(){
		console.log('render Form.js');
		return(
			<View style={styles.container}>
				<TextInput style={styles.inputBox}
				  underlineColorAndroid='rgba(0,0,0,0)' 
				  placeholder="Email"
				  placeholderTextColor = "#ffffff"
				  selectionColor="#fff"
				  keyboardType="email-address"
				  onSubmitEditing={()=> this.password.focus()}
				  onChangeText={this.onEmailChange.bind(this)}
				  value={this.props.email}
				/>
				<TextInput style={styles.inputBox} 
				  underlineColorAndroid='rgba(0,0,0,0)' 
				  placeholder="Password"
				  secureTextEntry={true}
				  placeholderTextColor = "#ffffff"
				  onChangeText={this.onPasswordChange.bind(this)}
				  value={this.props.password}
				  ref={(input) => this.password = input}
				/>
				{this.renderConfirmPassword()}
				{this.renderError()}
				<TouchableOpacity
					style={styles.button}
					onPress={this.onButtonPress.bind(this)}
				>
					<Text style={styles.buttonText}>{this.props.type}</Text>
				</TouchableOpacity>
				<Spinner
					visible={this.props.loading}
					textContent={'Loading...'}
					textStyle={styles.spinnerTextStyle}
				/>
			</View>
		);
	};
};

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
		alignItems: 'center',
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
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
	errorTextStyle:{
		color:'red',
	},
	spinnerTextStyle: {
    color: '#FFF'
	},
  
});

const mapStateToProps= ({ auth }) =>{
	const { email,password,error,loading,confirmPassword } = auth;
	return { email,password,error,loading,confirmPassword };
};

export default connect(
	mapStateToProps,
	{
		emailChanged,
		passwordChanged,
		loginUser,
		confirmPasswordChanged,
		signinUser,
		removeError
	}
)(Form);