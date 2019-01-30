import React, { Component } from 'react';
import { screenChange,logout } from '../actions';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Logo from './Logo';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

class DummyScreen extends Component{
    logout(){
        this.props.logout();
    }
    componentWillUnmount(){
        this.props.screenChange()
    }
    renderLogout(){
        if(this.props.user){
            return (
                <TouchableOpacity
                    style={[styles.button,{marginHorizontal:10 }]}
                    onPress={this.logout.bind(this)}
                    >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            );
        }
       
    }
	render() {
    console.log('render DummyScreen.js');
		return(
			<View style={styles.container}>
				<Logo/>
				
				<View style={styles.signupTextCont}>
					<TouchableOpacity
						style={[styles.button,{marginHorizontal:10 }]}
						onPress={()=>Actions.feedback()}
					>
						<Text style={styles.buttonText}>Feedback</Text>
					</TouchableOpacity>	
                    {this.renderLogout()}					
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

const mapStateToProps= ({ auth }) =>{
	const { user } = auth;
	return { user };
};

export default connect(mapStateToProps,{screenChange,logout})(DummyScreen);