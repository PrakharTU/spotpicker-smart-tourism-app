import { 
    REGION_CHANGE,
    MARKER_CHANGE,
    SCENIC_LOOKOUT,
    SET_TIME,
    POINT_OF_INTEREST
} from '../actions/types';
const INITIAL_STATE = {
	region:{
        latitude: 30.3531,
        longitude: 76.3611,
        latitudeDelta: 0.3,
		longitudeDelta: 0.3
    },
    coordinates:{
        latitude: 30.3531,
        longitude: 76.3611,
    },
    timing:{
        start:"12:00:00",
        end:"12:00:00"
    },
    places:[]
};

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case REGION_CHANGE:
            return {...state,region:action.payload};
        case MARKER_CHANGE:
            return {...state,coordinates:action.payload};
        case SCENIC_LOOKOUT:
        case POINT_OF_INTEREST:
            console.log("oldPlaces are")
            console.log(newPlaces);
            let oldPlaces=state.places
            let newPlaces=[...oldPlaces,...action.payload]
            
            return {...state,places:newPlaces}
        case SET_TIME:
            return {...state,timing:action.payload}
        default:
            return state;
    }
}

