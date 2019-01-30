import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import ChatBot from 'react-native-chatbot';
import '@firebase/database';


export default class Feedback extends Component {
	handleEnd({ steps }){
		const { likeApp:{message:likeApp}, route:{message:route}, suggestion:{message:suggestion} } = steps;
		console.log({  likeApp, route, suggestion })
		firebase.database().ref(`/feedback/`)
		  .push({  likeApp, route, suggestion})
		  .then(()=>console.log('Data Submitted'));
	}
	  
    render() {
        return (
            <ChatBot
                steps={steps}
                    botDelay={500}
                    customDelay={500}
                    userDelay={0}
                    handleEnd={this.handleEnd.bind(this)}
            />
        );
  }
}

const steps = [
          {
            id: '1',
            message: 'Thanks for using this app. ',
            trigger: '2',
          },
		      {
            id: '2',
            message: 'Do you like this app? ',
            trigger: 'likeApp',
          },
		      {
            id: 'likeApp',
            options: [
              { value: 'likeAppYes', label: 'Awesome App', trigger: '3' },
              { value: 'likeAppNo', label: 'Requires Improvement', trigger: '4' },
            ],
          },
		      {
            id: '3',
            message: 'I am glad you liked it',
            trigger: '5',
          },
          {
            id: '4',
            message: 'We will surely improve this app.',
            trigger: '5',
          },
          {
            id: '5',
            message: 'Rate Routes planned by this app',
            trigger: 'route',
          },
          {
            id: 'route',
            options: [
              { value: 'route1', label: 'Terrible', trigger: '6' },
              { value: 'route2', label: 'poor', trigger: '6' },
              { value: 'route3', label: 'Average', trigger: '6' },
              { value: 'route4', label: 'Love it', trigger: '6' },
              { value: 'route5', label: 'Best', trigger: '6' },
              { value: 'route0', label: 'Skip', trigger: '6' },
            ],
          },
          {
            id: '6',
            message: 'Please write your suggestion/Feedback? ',
            trigger: 'suggestion',
          },
          {
            id: 'suggestion',
            user: true,
            trigger: '7',
          },
          {
            id: '7',
			      message: 'Thanks your your Feedback',
            trigger: 'end-message',
          },
         
          {
            id: 'end-message',
            message: 'Your feedback was submitted successfully!',
            end: true,
          },
         
        ]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
