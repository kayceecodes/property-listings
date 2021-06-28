import { ActionTypes } from "./actionTypes"
import { Property } from '../../../types/interfaces/property'


export interface SelectPropertyAction {
    type: typeof ActionTypes.SELECT_PROPERTY,
    property: Property
}

export function selectProperty(property: Property) {
    const action: SelectPropertyAction = {
        type: ActionTypes.SELECT_PROPERTY,
        property 
    }

    return action
}