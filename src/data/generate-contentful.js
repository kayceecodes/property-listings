// https://egghead.io/lessons/javascript-creating-demo-apis-with-json-server
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
module.exports = function() {
    var faker = require('faker');
    var _ = require('lodash')
    
    return {
        properties:_.times(40, function (num) {
            
            /* Check contenty types */
            /* Check id above Entry */
            /* Check spelling */
            return  {
                "metadata": {
                  "tags": [
                  ]
                },
                "sys": {
                  "space": {
                    "sys": {
                      "type": "Link",
                      "linkType": "Space",
                      "id": "dx4qvrmnbbvs"
                    }
                  },
                  "id": "8cSbnnkYC1lDvsSIgHwx9D",
                  "type": "Entry",
                  "createdAt": "2021-06-18T03:08:33.321Z",
                  "updatedAt": "2021-06-18T16:28:19.443Z",
                  "environment": {
                    "sys": {
                      "id": "master",
                      "type": "Link",
                      "linkType": "Environment"
                    }
                  },
                  "publishedVersion": num,
                  "publishedAt": "2021-06-18T16:28:19.443Z",
                  "firstPublishedAt": "2021-06-18T03:08:33.744Z",
                  "createdBy": {
                    "sys": {
                      "type": "Link",
                      "linkType": "User",
                      "id": "2AoEpDCv4zPt3MIzD5w0D2"
                    }
                  },
                  "updatedBy": {
                    "sys": {
                      "type": "Link",
                      "linkType": "User",
                      "id": "2AoEpDCv4zPt3MIzD5w0D2"
                    }
                  },
                  "publishedCounter": 47 + num,
                  "version": (num + 1),
                  "publishedBy": {
                    "sys": {
                      "type": "Link",
                      "linkType": "User",
                      "id": "2AoEpDCv4zPt3MIzD5w0D2"
                    }
                  },
                  "contentType": {
                    "sys": {
                      "type": "Link",
                      "linkType": "ContentType",
                      "id": "propertyListings"
                    }
                  }
                },

                "fields": {
                    "id": {
                      "en-US":faker.datatype.string(9),
                    },
                    "streetAddress": {
                      "en-US": faker.address.streetAddress(true),
                    },
                    "city": {
                      "en-US": faker.address.city(),
                    },
                    "state": {
                      "en-US":faker.address.state(),
                    },
                    "zipcode": {
                      "en-US": faker.address.zipCode(),
                    },
                    "latitude": {
                      "en-US": parseFloat(faker.address.latitude(39.91007, 40.04473, 14)),
                    },
                    "longitude": {
                      "en-US": parseFloat(faker.address.longitude(-75.13988, -75.23764, 14)),
                    },
                    "propertyOwnerName": {
                      "en-US": faker.name.findName(),
                    },
                    "price": {
                      "en-US": faker.commerce.price(699, 1200000, 2, '$'),
                    },
                    "bedrooms": {
                      "en-US": faker.datatype.number(3),
                    },
                    "bathrooms": {
                      "en-US": faker.datatype.number(3),
                    },
                    "sqft": {
                      "en-US": faker.datatype.number(1800) + 300,
                    },
                    "carSpaces": {
                      "en-US": faker.datatype.number(4),   
                    },
                    "type": {
                      "en-US": faker.datatype.boolean() ? (faker.datatype.boolean() ? "House" : "Condo") : "Apartment",
                    },
                    "daysSpotted": {
                      "en-US": faker.datatype.number(90),
                    },
                    "yearBuilt": {
                      "en-US": faker.datatype.number(45) + 1975,
                    },
                    "petFriendly": {
                      "en-US": faker.datatype.boolean() ? "yes" : ( faker.datatype.boolean()?"cats only": "no" )
                    }
                  }
            }
        })
    }
}