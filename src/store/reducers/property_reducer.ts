import { Property } from '../../../types/interfaces/property'
import { SelectPropertyAction } from '../actions/actionCreators'
import { ActionTypes } from '../actions/actionTypes'

export interface PropertyState {
  selectedProperty: Property
}
const fields = {file: {url: ''}}
export const initialState: PropertyState = {
  selectedProperty: {
    id: '',

    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    state: '',

    latitude: 0,
    longitude: -0,

    images: [{fields}],

    price: '$0.00',

    datePosted: '',

    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    carSpaces: 0,
    
    type: '',
    
    
    petFriendly: 'No Pets',
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
