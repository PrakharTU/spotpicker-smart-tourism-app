import React, { Component } from 'react';
import { View ,ActivityIndicator,StyleSheet } from 'react-native';
export default  Spinner=()=>{
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size="large" color="#1c313a"/>
        </View>
    );
}

const styles=StyleSheet.create({
    spinnerStyle:{        
		flex:1,
		justifyContent: 'center',
		alignItems:'center'
    }
});