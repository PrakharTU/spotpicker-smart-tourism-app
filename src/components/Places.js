import React, { Component } from  'react';
import { StyleSheet,View,Button } from  'react-native';
import MapView, {Marker} from  'react-native-maps';
import {regionChange,markerChange} from '../actions';
import { connect } from 'react-redux';
import RetroMapStyle from '../styles/Retrostyle.json';
import axios from 'axios';

class Places extends Component {
    componentWillMount(){
        CLIENT_ID='VCMNMY5JM4UBE4T0M5ZIRO1XYLX5GFFKZWTTRNKS0B2S0ZCS';
        CLIENT_SECRET='CYCXQVKMN5PBHRHWFSY2KFGX0WYVOMBYRV0RRX2IENYWF5PL';

        axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=20&section=topPicks&time=any&sortByDistance=1&intent=browse&sw=30.0831,76.0611&ne=30.62,76.66`)
			.then(response =>console.log(response.data));
    }
  render() {
      console.log(this.props.coordinates)
        return (
          <View style={{flex:1}}>
            <MapView style = {styles.map}
              region={this.props.region}
              customMapStyle={RetroMapStyle}
            >              

            </MapView>
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
export default connect(mapStateToProps,{regionChange,markerChange})(Places);