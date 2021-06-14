import * as actionTypes from "../actions/actionTypes";

export interface State {
 
}

export const initialState: State = {
 
};

const _reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,       
      };  
    default:
      return state;
  }
};

export default _reducer;
