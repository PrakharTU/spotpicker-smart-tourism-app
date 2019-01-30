import React, { Component } from 'react';
import { Text, TouchableOpacity, View,StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setTime } from '../actions';

class Time extends Component {
    constructor(){
        super();
        this.state={
            isStartVisible:false,
            isEndVisible:false,
            startTime:false,
            endTime:false
        }
    }

    showStartTimePicker = () => this.setState({ isStartVisible: true });
    showEndTimePicker = () => this.setState({ isEndVisible: true });

    hideStartTimePicker = () => this.setState({ isStartVisible: false });
    hideEndTimePicker = () => this.setState({ isEndVisible: false });

    handleStartPicked = (startTime) => {
        this.setState({startTime})
        let arr=String(startTime).split(" ");
        console.log('Start time has been picked: ', arr[4]);
        this.hideStartTimePicker();
    };
    handleEndPicked = (endTime) => {
        this.setState({endTime})
        console.log('End time has been picked: ', endTime);
        this.hideEndTimePicker();
    };

    onSubmit(){
      this.props.setTime(String(this.state.startTime).split(" ")[4],String(this.state.endTime).split(" ")[4]);
      Actions.path();
    }
    
  render () {
    console.log(this.state.endTime!==false && this.state.startTime!==false)
    return (
      <View style={styles.container}>
      <Text style={[styles.buttonText,{fontSize:20,fontWeight:'200',marginBottom:40}]}>Select Start And End Time</Text>
        <TouchableOpacity 
            onPress={this.showStartTimePicker.bind(this)}
            style={styles.button}
            >
          <Text style={styles.buttonText}>Start Time</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={this.showEndTimePicker}
            style={styles.button}
            >
          <Text style={styles.buttonText}>End Time</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={this.onSubmit.bind(this)}
            style={styles.button}
            disabled={!(this.state.endTime!==false && this.state.startTime!==false)}
            >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isStartVisible}
          onConfirm={this.handleStartPicked}
          onCancel={this.hideStartTimePicker}
          mode={'time'} 
          is24Hour={false}
        />
        <DateTimePicker
          isVisible={this.state.isEndVisible}
          onConfirm={this.handleEndPicked}
          onCancel={this.hideEndTimePicker}
          mode={'time'} 
          is24Hour={false}
        />
      </View>
    );
  }

}
const styles =StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#455a64'
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

export default connect(null,{setTime})(Time);