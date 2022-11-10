export const ADD_DISTANCE_DATA = 'ADD_DISTANCE_DATA';
export const ADD_POLYLINE_DATA = 'ADD_POLYLINE_DATA';
export const ADD_ELEVATION_DATA = 'ADD_ELEVATION_DATA';

const addDistanceData = (distance) => ({
  type: ADD_DISTANCE_DATA,
  distance
})

const getAllData = (state = {}) => {
  if (!state.mapData) return [];
  return state.mapData
};



const mapDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DISTANCE_DATA:      
      return {...state, ['distance']: action.distance};
  
    default:
      return state;
  }
};


export default mapDataReducer;