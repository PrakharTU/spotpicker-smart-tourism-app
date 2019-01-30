import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged,forgotPassword,removeError } from '../actions';
import Logo from './Logo';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class PasswordReset extends Component {
  componentWillUnmount(){
    console.log('PasswordReset.js componentWillUnmount');
    this.props.removeError();
	}
    onEmailChange(text){
		this.props.emailChanged(text);
    }
    
    onPasswordSubmit(){
		this.props.forgotPassword(this.props.email);
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
    

	render() {
    console.log('render PasswordReset.js');
		return(
			<View style={styles.container}>
				<Logo/>				
				<View style={styles.signupTextCont}>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Email"
                        placeholderTextColor = "#ffffff"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                    {this.renderError()}
				</View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPasswordSubmit.bind(this)} >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
                
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
    alignItems:'flex-start',
    justifyContent :'center',
    paddingVertical:16,
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
	}
});


const mapStateToProps= ({ auth }) =>{
	const { email,loading,error } = auth;
	return { email,loading,error };
};
export default connect(mapStateToProps,{emailChanged,forgotPassword,removeError})(PasswordReset);