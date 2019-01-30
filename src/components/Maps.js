import React, { Component } from  'react';
import { StyleSheet,View,Button } from  'react-native';
import MapView, {Marker} from  'react-native-maps';
import {
  regionChange,
  markerChange,
  fetchScenicLookout,
  fetchPointOfInterest
} from '../actions';
import { connect } from 'react-redux';
import RetroMapStyle from '../styles/Retrostyle.json';
import { Actions } from 'react-native-router-flux';
class Maps extends Component {

	onRegionChange(region){
		this.props.regionChange(region);
	}

  render() {
      console.log(this.props.coordinates)
        return (
          <View style={{flex:1}}>
            <MapView style = {styles.map}
              region={this.props.region}
              customMapStyle={RetroMapStyle}
            >
              <Marker draggable
                coordinate={this.props.coordinates}
                onDragEnd={(e)=>this.props.markerChange(e.nativeEvent.coordinate)}
                title="Start Position"              
              />
            </MapView>
            <View
              style={{
              position: 'absolute',
              top: '1%', 
              alignSelf: 'flex-end'
              }}
            >
             <Button 
              onPress={()=>{
                this.props.fetchScenicLookout(this.props.coordinates,20000)
                this.props.fetchPointOfInterest('Patiala')
                Actions.time();
              }}
              title="Continue"  
              color="#1c313a"        
             />
            </View>
          </View>
          
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: 100,
        flex: 1
        }
});

const mapStateToProps = ({mapreducer})=>{
	const {region,coordinates}=mapreducer;
	return {region,coordinates};
}
export default connect(mapStateToProps,{regionChange,markerChange,fetchScenicLookout,fetchPointOfInterest})(Maps);