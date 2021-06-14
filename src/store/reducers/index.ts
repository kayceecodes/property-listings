//  export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import _reducer from './_reducer';

export {initialState} from './_reducer';

const rootReducer = combineReducers({
    reducer: _reducer
}); 

export default rootReducer;