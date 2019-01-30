import {
    REGION_CHANGE,
    MARKER_CHANGE,
    SCENIC_LOOKOUT,
    SET_TIME,
    POINT_OF_INTEREST
} from './types';
import axios from 'axios';
import preLoadedData from '../data/patialaPOI.json';
export const regionChange=(region)=>{
    return {
        type:REGION_CHANGE,
        payload:region
    };
};

export const markerChange=(coordinate)=>{
    return {
        type:MARKER_CHANGE,
        payload:coordinate
    };
};

export const setTime=(start,end)=>{
    let time={}
    time.start=start;
    time.end=end;
    console.log("This time will be set"+start+","+end)
    return {
        type:SET_TIME,
        payload:time
    };
}
export const fetchScenicLookout=(coordinates,radius)=>{
    let ll=""
    ll=ll+coordinates.latitude+","+coordinates.longitude;
    console.log("--position--")
    console.log(ll);
    return(dispatch)=>{
        CLIENT_ID='VCMNMY5JM4UBE4T0M5ZIRO1XYLX5GFFKZWTTRNKS0B2S0ZCS';
        CLIENT_SECRET='CYCXQVKMN5PBHRHWFSY2KFGX0WYVOMBYRV0RRX2IENYWF5PL';
        axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&categoryId=4bf58dd8d48988d165941735&ll=${ll}&radius=${radius}`)
            .then(response =>{
                
                dispatch({
                    type:SCENIC_LOOKOUT,
                    payload:modifyScenicLookout(response.data)
                });
                console.log("This will be set in scenic lookout");
                console.log(modifyScenicLookout(response.data));
            });
    }
}

export const fetchPointOfInterest=(city)=>{
    let query=city.replace(/ /g, "+")+"+point+of+interest";
    console.log("--query--")
    console.log(query);
    return(dispatch)=>{
        city=city.toLowerCase();
        if(city!='patiala'){
            //API_KEY='AIzaSyD9geQBrp258XvYue28GQesE3TEB7m6XEY'; 
            API_KEY='AIzaSyA1RUtorEoxS2kLBQvmpYtTDVZL8sZtoL4';     
            axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=en&key=${API_KEY}`)
                .then(response =>{                
                    dispatch({
                        type:POINT_OF_INTEREST,
                        payload:modifyPointOfInterest(response.data)
                    });
                    console.log("This will be set in point of interest");
                    console.log(modifyPointOfInterest(response.data));
                });
        }
        else{
            dispatch({
                type:POINT_OF_INTEREST,
                payload:modifyPointOfInterest(preLoadedData)
            });
            console.log("This will be set in point of interest");
            console.log(modifyPointOfInterest(preLoadedData));
        }
        
    }
}

const modifyScenicLookout=(a)=>{
    let arr=[];    
    for (let i=0;i<a.response.venues.length;i++){
        let place={}
        place["name"]=a.response.venues[i].name;
        let location={}
        location.latitude=a.response.venues[i].location.lat;
        location.longitude=a.response.venues[i].location.lng;  
        place["latlng"]=location;
        place["id"]=a.response.venues[i].id;
        place["categories"]=a.response.venues[i].categories[0].name;
        arr.push(place)
    }
    return arr;
}

const modifyPointOfInterest=(a)=>{
    let arr=[]
    for (let i=0;i<a.results.length;i++){  
        let place={}
        place["name"]=a.results[i].name;
        let location={}
        location.latitude=a.results[i].geometry.location.lat;
        location.longitude=a.results[i].geometry.location.lng;
        
        place["latlng"]=location;
        place["id"]=a.results[i].place_id;
        place["categories"]="Tourist Spot";
        arr.push(place);  
    }
    return arr;
}
