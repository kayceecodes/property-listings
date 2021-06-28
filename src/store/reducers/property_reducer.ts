import { Property } from 'types/interfaces/property'
import { SelectPropertyAction } from '../actions/actionCreators'
import { ActionTypes } from '../actions/actionTypes'

export interface State {
  property: Property
}

export const initialState: State = {
  property: {
    id: '',

    streetAddress: '',
    city: '',
    zipcode: '',
    state: '',

    latitude: 0,
    longitude: -0,

    images: '',

    propertyOwnerName: '',
    price: '$0.00',

    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    carSpaces: 0,
    
    type: '',
    
    daysSpotted: 0,
    yearBuilt: 0,
    
    petFriendly: '',
  },
}

const property_reducer = (state = initialState, action: SelectPropertyAction) => {
  switch (action.type) {
    case ActionTypes.SELECT_PROPERTY:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default property_reducer
