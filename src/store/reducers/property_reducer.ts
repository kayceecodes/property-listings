import { Property } from '../../../types/interfaces/property'
import { SelectPropertyAction } from '../actions/actionCreators'
import { ActionTypes } from '../actions/actionTypes'

export interface PropertyState {
  selectedProperty: Property
}

export const initialState: PropertyState = {
  selectedProperty: {
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
        selectedProperty: action.selectedProperty
      }
    default:
      return state
  }
}

export default property_reducer
