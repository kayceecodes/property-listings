interface ContentfulImages {
  fields: {
    file: {
      url: string
    }
  }
}

type PetFriendly = "No Pets" | "no pets" | "Cats Only" | "cats only" | "Yes" | "yes"
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

  petFriendly: PetFriendly
}

// export interface PropertyData {
//   fields: Property
// }

// export type PropertiesData = PropertyData[]
