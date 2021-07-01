interface ContentfulImages {
  fields: {
    file: {
      url: string
    }
  }
}

export interface Property {
  id: string

  streetAddress: string
  city: string
  state: string
  zipcode: string

  latitude: number
  longitude: number

  images: any

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

// export interface PropertyData {
//   fields: Property
// }

// export type PropertiesData = PropertyData[]
