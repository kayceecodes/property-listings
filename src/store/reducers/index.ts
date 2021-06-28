//  export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import property_reducer from './property_reducer';

export {initialState} from './property_reducer';

const rootReducer = combineReducers({
    property: property_reducer
}); 

export default rootReducer;