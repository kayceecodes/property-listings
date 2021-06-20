export interface PropertyData {
  fields: {
    id: string

    streetAddress: string
    city: string
    state: string
    zipcode: string

    latitude: number
    longitude: number

    propertyOwnerName: string
    price: string
    bedrooms: number
    bathrooms: number
    sqft: number
    carSpaces: number

    type: string

    daysSpotted: number
    yearBuilt: number

    petFriendly: string
  }
}

export type PropertiesData = PropertyData[]
