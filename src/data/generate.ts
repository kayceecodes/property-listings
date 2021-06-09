import faker from 'faker'
import _ from 'lodash'

export function generate() {

    
    return {
        properties:_.times(5, function (num) {

            return {
                id: num,
                name: faker.name.findName(),
                streetAddress: faker.address.streetAddress(true),
                zipcode: faker.address.zipCode(),
            }
        })
    }
}