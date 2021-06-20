import React from 'react'
// import { render } from '../tests/test-utils'
import { render } from '@testing-library/react'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { trimNumber } from '../utils/Parse'
import MyMap from '../src/components/map/MyMap';

// jest.mock('react-map-gl', () => ({children, ReactMapGL}) => <ReactMapGL>{children}</ReactMapGL>)

// jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//   GeolocateControl: jest.fn(),
//   Map: jest.fn(() => ({
//     addControl: jest.fn(),
//     on: jest.fn(),
//     remove: jest.fn()
//   })),
//   NavigationControl: jest.fn()
// }));

export type MyMapType = React.ComponentProps<typeof MyMap>

const baseProps: MyMapType = {
  setSelectedProperty: () => {},
  selectedProperty: {
    _id: 0,
    propertyownername: 'Ruth King',
    price: '$12910.00',
    streetaddress: '4470 Stefanie Flat Apt. 014',
    zipcode: '70269',
    latitude: 39.92248275098166,
    longitude: -75.21264357559222,
    bedrooms: 1,
    bathrooms: 3,
    sqft: 919,
    carSpaces: 2,
    type: 'Apartment',
    daysspotted: 56,
    yearbuilt: 1993,
    petFriendly: 'cats only',
  },
  properties: [
    {
      _id: 0,
      propertyownername: 'Ruth King',
      price: '$12910.00',
      streetaddress: '4470 Stefanie Flat Apt. 014',
      zipcode: '70269',
      latitude: 39.92248275098166,
      longitude: -75.21264357559222,
      bedrooms: 1,
      bathrooms: 3,
      sqft: 919,
      carSpaces: 2,
      type: 'Apartment',
      daysspotted: 56,
      yearbuilt: 1993,
      petFriendly: 'cats only',
    },
    {
      _id: 1,
      propertyownername: 'Rachel James',
      price: '$1189830.00',
      streetaddress: '66667 Dan Springs Suite 983',
      zipcode: '70269',
      latitude: 40.01262749366766,
      longitude: -75.2253948861866,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 339,
      carSpaces: 2,
      type: 'House',
      daysspotted: 6,
      yearbuilt: 1993,
      petFriendly: 'yes',
    },
  ],
}

// const renderUI = (props?: MapType) =>
//   render(<Map {...baseProps} {...props} />, {})

test('check if multiple markers are showing', async () => {
  render(<MyMap {...baseProps} />, {})
  // renderUI()

  await waitFor(() => {
    // expect(screen.findByRole('textbox')).toBeInTheDocument()
  })
})
