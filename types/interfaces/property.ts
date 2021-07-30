interface ContentfulImages {
  fields: {
    file: {
      url: string
    }
  }
}

export type PetFriendly =
  | 'No Pets'
  | 'no pets'
  | 'Cats Only'
  | 'cats only'
  | 'Yes'
  | 'yes'

export type PropertyTypes = 'Apartment' | 'Condominium' | 'House'
export interface Property {
  id: string

  firstName: string
  lastName: string
  email: string
  phone: string

  streetAddress: string
  city: string
  state: string
  zipcode: string

  latitude: number
  longitude: number

  images: any

  price: string

  bedrooms: number
  bathrooms: number

  sqft: number
  carSpaces: number

  type: PropertyTypes

  datePosted: string
  yearBuilt: number

  petFriendly: PetFriendly
}

export interface PropertyPost extends Property {}
// export interface PropertyData {
//   fields: Property
// }

// export type PropertiesData = PropertyData[]
