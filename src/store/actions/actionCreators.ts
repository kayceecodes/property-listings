import { ActionTypes } from "./actionTypes"
import { Property } from '../../../types/interfaces/property'


export interface SelectPropertyAction {
    type: typeof ActionTypes.SELECT_PROPERTY,
    selectedProperty: Property
}

export function selectProperty(selectedProperty: Property) {
    const action: SelectPropertyAction = {
        type: ActionTypes.SELECT_PROPERTY,
        selectedProperty 
    }

    return action
}
