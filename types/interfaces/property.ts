export interface Property {
    id: string
    index: number
    price: number
    picture: string
    city: string
    address: string
    latitude: number
    longitude: number
    bedrooms: number
    bathrooms: number
    sqft: string
    carSpaces: number
    status: string
    type: string
    daysposted: number
    yearbuilt: number
}

export type Properties = Property[]

export interface PropertyData {
    _id: number
    name: string
    price: string
    streetAddress: string
    zipcode: string
    latitude: string
    longitude: string
}