import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from '@firebase/app';
import '@firebase/auth';
import ReduxThunk from 'redux-thunk';
import Routes from './Routes';
import { StatusBar, View } from 'react-native';



export default class App extends Component{
	componentWillMount(){
		const config = {
			apiKey: "AIzaSyCIS-UR1xt4YNAJqVxXuwrmfyzvXb781ug",
			authDomain: "smart-tourism-1542034796219.firebaseapp.com",
			databaseURL: "https://smart-tourism-1542034796219.firebaseio.com",
			projectId: "smart-tourism-1542034796219",
			storageBucket: "smart-tourism-1542034796219.appspot.com",
			messagingSenderId: "221024425505"

		};
		firebase.initializeApp(config);
	}
	
	render() {
		console.log('render App.js');
		const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
		return (
			
			<Provider store={store} >
				<View style={styles.container}>
					<StatusBar
					backgroundColor="#1c313a"
					barStyle="light-content"
					/>
					<Routes/>
				</View>
			</Provider>
			
		);
	}
}

const styles = {
	container:{
		flex: 1
	}
};
