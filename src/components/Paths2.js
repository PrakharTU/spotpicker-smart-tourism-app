import React, { Component } from  'react';
import { StyleSheet,View,Button } from  'react-native';
import MapView, {Marker, Polyline  } from  'react-native-maps';
import {regionChange,markerChange} from '../actions';
import { connect } from 'react-redux';
import RetroMapStyle from '../styles/Retrostyle.json';
import { Actions } from 'react-native-router-flux';

class Path2 extends Component {
 render() {
        return (
          <MapView style = {styles.map}
              region={this.props.region}
              customMapStyle={RetroMapStyle}
            >
            {
              this.props.places.map((marker,i)=>
                <Marker
                  key={i}
                  onLoad={() => this.forceUpdate()}
                  coordinate={marker.latlng}
                  title={marker.name}
                  description={marker.categories}
                />
              )
            }
            <Marker
                onLoad={() => this.forceUpdate()}
                coordinate={this.props.coordinates}
                title={"Start Position"}
                pinColor="#1c313a"
                description={"You selected this place as start place"}
            />
            <Polyline
              coordinates={[this.props.coordinates,...this.props.places.map((marker)=>marker.latlng)]}
              strokeColor="#1c313a"
              strokeWidth={3}

            />
            
            </MapView>
          
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
	const {region,places,coordinates}=mapreducer;
	return {region,places,coordinates};
}
export default connect(mapStateToProps,{regionChange,markerChange})(Path2);