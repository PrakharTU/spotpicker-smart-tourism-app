import React, { Component } from 'react';
import {Router, Stack, Scene,Actions} from 'react-native-router-flux';

import Login from './components/Login';
import Signup from './components/Signup';
import PasswordReset from './components/PasswordReset';
import DummyScreen from './components/DummyScreen';
import Feedback from './components/Feedback';
import Maps from './components/Maps';
import Time from './components/Time';
import Paths1 from './components/Paths1';
import Paths2 from './components/Paths2';

export default class Routes extends Component{
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar >
					<Scene key="welcome" initial hideNavBar>
						<Scene key="login" component={Login} title="Login" initial/>
						<Scene key="signup" component={Signup} title="Register"/>
						<Scene key="resetpassword" component={PasswordReset} title="Reset Password"/>
					</Scene>
					<Scene  
						key="menu" 
						titleStyle={{color:'#ffffff',alignContent:'center'}} 
						navigationBarStyle={{backgroundColor:"#1c313a"}}
						backButtonTintColor='#ffffff'
						rightTitle="Menu"
						onRight={()=>  Actions.dummyscreen()}
						rightButtonTextStyle={{color:'#ffffff'}}
						>
						<Scene key="maps" component={Maps} title="Select Start location" initial/>
						<Scene key="feedback" component={Feedback} title="Feedback" back/>
						<Scene key="time" component={Time} title="Select Timings" back/>
						<Scene key="path" 
							hideNavBar
							tabs
							activeBackgroundColor="#1c313a"
							inactiveBackgroundColor="#455a64"
							activeTintColor="#ffffff"
							>
							<Scene key="path1" component={Paths1} title="Plan 1"  initial/>
							<Scene key="path2" component={Paths2} title="Plan 2" />
							<Scene key="dummyscreen" component={DummyScreen} title="Menu" back/>
						</Scene>
					</Scene>
								      						
			    </Stack>
				
			 </Router>
			)
	}
}