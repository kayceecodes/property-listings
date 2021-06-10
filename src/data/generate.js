// https://egghead.io/lessons/javascript-creating-demo-apis-with-json-server

module.exports = function() {
    var faker = require('faker');
    var _ = require('lodash')
    return {
        properties:_.times(700, function (num) {

            return {
                _id: num,
                propertyownername: faker.name.findName(),
                price: faker.commerce.price(699, 1200000, 2, '$'),
                streetaddress: faker.address.streetAddress(true),
                zipcode: faker.address.zipCode(),
                latitude: faker.address.latitude(-39.91007, -40.05473200000000),
                longitude: faker.address.longitude(-75.15144, -75.16871200000000),
                bedrooms: faker.datatype.number(3),
                bathrooms: faker.datatype.number(3),
                sqft: faker.datatype.number(1800) + 300,
                carSpaces: faker.datatype.number(4),                
                type: faker.datatype.boolean() ? (faker.datatype.boolean() ? "House" : "Condo") : "Apartment",
                daysspotted: faker.datatype.number(90),
                yearbuilt: faker.datatype.number(45) + 1975,
                petFriendly: faker.datatype.boolean() ? "yes" : ( faker.datatype.boolean()?"cats only": "no" )
                
            }
        })
    }
}

// "bedrooms": 2,
// "bathrooms": 2,
// "sqft": "500",
// "carSpaces": 2,
// "status": "Sale",
// "type": "House",
// "daysposted": 15,
// "yearbuilt": 1989