export const formData: FormData[] = [
  { name: 'streetAddress', label: 'Street Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'zipcode', label: 'Zipcode', type: 'text' },
  { name: 'state', label: 'State', type: 'select' },
  { name: 'latitude', label: 'Latitude', type: 'text' },
  { name: 'longitude', label: 'Longitude', type: 'text' },
  { name: 'propertyOwnerName', label: 'Property Owner Name', type: 'text' },
  { name: 'images', label: 'Images', type: 'attatchment' },
  { name: 'price', label: 'Price', type: 'text' },
  { name: 'bedrooms', label: 'Bedrooms', type: 'select' },
  { name: 'bathrooms', label: 'Bathrooms', type: 'select' },
  { name: 'sqft', label: 'Sqft', type: 'text' },
  { name: 'carSpaces', label: 'Car Spaces', type: 'select' },
  { name: 'type', label: 'Property Type', type: 'select' },
  // { name: 'daysSpotted', label: "Days Spotted", type: "text",},
  { name: 'yearBuilt', label: 'Year Built', type: 'text' },
  { name: 'petFriendly', label: 'Pet Friendly', type: 'select' },
]

export interface FormData {
  name: string
  label: string
  type: string
}
