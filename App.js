import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Maps from './components/Maps';

export default class App extends Component{
		render() {
		console.log('render App.js');
		const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
		return (
			
			<Provider store={store} >
        		<Maps/>
			</Provider>
			
		);
	}
}

const styles = {
	container:{
		flex: 1
	}
};
